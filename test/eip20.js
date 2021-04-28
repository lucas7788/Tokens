const BigNumber = require('bignumber.js');
const EIP20 = artifacts.require('EIP20');
const {expectRevert, expectEvent, constants, BN} = require('@openzeppelin/test-helpers');


contract('deploy EIP20', (accounts) => {
    beforeEach(async function () {
        this.token = await EIP20.new(BigNumber(500000e9), 'WING TOKEN', 9, 'WING', {
            from: accounts[0],
            value: web3.utils.toWei('0', 'ether'),
            gas: 10000000,
            gasPrice: 50
        });
    });

    it('check init parameter', async function () {
        const name = await this.token.name();
        assert.equal(name, 'WING TOKEN');

        const decimals = await this.token.decimals();
        assert.equal(decimals.toNumber(), 9);

        const symbol = await this.token.symbol();
        assert.equal(symbol, 'WING');

        const balance = await this.token.balanceOf(accounts[0]);
        assert.equal(balance.toNumber(), BigNumber(500000e9));
    });


    it('transfers', async function () {
        const balanceBefore = await this.token.balanceOf(accounts[1]);
        assert.equal(balanceBefore.toNumber(), 0);
        let transferAmt = BigNumber(100e9);
        const result = await this.token.transfer(accounts[1], transferAmt);
        expectEvent.inLogs(result.logs, 'Transfer', {
          _from:accounts[0],
          _to:accounts[1],
          _value:new web3.utils.BN(transferAmt.toString()),
        });
        const balanceAfter = await this.token.balanceOf(accounts[1]);
        assert.equal(balanceAfter.toNumber(), transferAmt);

        //异常测试
        // await this.token.transfer(accounts[2], transferAmt+1, {from:accounts[1]});
        // const balanceBefore2 = await this.token.balanceOf(accounts[2]);
        // assert.equal(balanceBefore.toNumber(), 0);
    });

    it('approve', async function () {
        const allowanceBefore = await this.token.allowance(accounts[0], accounts[3]);
        assert.equal(allowanceBefore.toNumber(), 0);
        let approveAmt = BigNumber(100e9);
        const result = await this.token.approve(accounts[3], approveAmt);
        expectEvent.inLogs(result.logs, 'Approval', {
          _owner:accounts[0],
          _spender:accounts[3],
          _value:new web3.utils.BN(approveAmt.toString()),
        });

        const allowanceAfter = await this.token.allowance(accounts[0], accounts[3]);
        assert.equal(allowanceAfter.toNumber(), approveAmt);

        await this.token.transferFrom(accounts[0], accounts[4], approveAmt - 1, {from: accounts[3]});
        const allowanceAfter2 = await this.token.allowance(accounts[0], accounts[3]);
        assert.equal(BigNumber(1), allowanceAfter2.toNumber());

        const balanceAfter = await this.token.balanceOf(accounts[4]);
        assert.equal(approveAmt - 1, balanceAfter);
    });

  it('mint', async function () {
    const totalSupply = await this.token.totalSupply();
    let mintAmt = BigNumber(10000e9);
    const result = await this.token.mint(mintAmt);
    expectEvent.inLogs(result.logs, 'Transfer', {
      _from:"0x0000000000000000000000000000000000000000",
      _to:accounts[0],
      _value:new web3.utils.BN(mintAmt.toString()),
    });
    const totalSupply2 = await this.token.totalSupply();
    assert.equal(mintAmt, totalSupply2 - totalSupply);
  });
});
