/*
Implements EIP20 token standard: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
.*/


pragma solidity ^0.5.16;

import "./EIP20Interface.sol";


contract EIP20 is EIP20Interface {

    mapping(address => uint) public balances;
    mapping(address => mapping(address => uint256)) public allowed;
    /*
    NOTE:
    The following variables are OPTIONAL vanities. One does not have to include them.
    They allow one to customise the token contract & in no way influences the core functionality.
    Some wallets/interfaces might not even bother to look at this information.
    */
    string public name;                   //fancy name: eg Simon Bucks
    uint8 public decimals;                //How many decimals to show.
    string public symbol;                 //An identifier: eg SBX
    address public admin;

    constructor(
        uint _initialAmount,
        string memory _tokenName,
        uint8 _decimalUnits,
        string memory _tokenSymbol
    ) public {
        // Give the creator all initial tokens
        balances[msg.sender] = _initialAmount;
        // Set the name for display purposes
        name = _tokenName;
        // Amount of decimals for display purposes
        decimals = _decimalUnits;
        // Set the symbol for display purposes
        symbol = _tokenSymbol;
        admin = msg.sender;
        emit Transfer(address(0), msg.sender, _initialAmount);
    }

    function transfer(address _to, uint _value) public returns (bool success) {
        require(balances[msg.sender] >= _value, "transfer amount is bigger than balance");
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint _value) public returns (bool success) {
        require(_from != address(0), "ERC20: transfer from the zero address");
        uint256 allowance = allowed[_from][msg.sender];
        require(balances[_from] >= _value && allowance >= _value, "transferFrom value is too big");
        balances[_to] += _value;
        balances[_from] -= _value;
        allowed[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    function balanceOf(address _owner) public view returns (uint) {
        return balances[_owner];
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        require(_spender != address(0), "ERC20: approve _spender is zero address");
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256) {
        return allowed[_owner][_spender];
    }

    function mint(uint amount) public returns (bool) {
        require(msg.sender == admin, "only admin can invoke this method");
        balances[msg.sender] = balances[msg.sender] + amount;
        totalSupply = totalSupply + amount;
        emit Transfer(address(0), msg.sender, amount);
        return true;
    }
}
