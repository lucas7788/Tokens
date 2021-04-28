
const Wing = artifacts.require('./Wing.sol');

module.exports = function (deployer, network, accounts) {
  deployer.deploy(Wing);
};
