
const Wing = artifacts.require('./WingToken.sol');

module.exports = function (deployer, network, accounts) {
  deployer.deploy(Wing);
};
