
const Wing = artifacts.require("WingToken.sol");

module.exports = function (deployer, network, accounts) {
  console.log("network: ", network);
  deployer.then(async () => {
    await deployer.deploy(Wing);
  });

};
