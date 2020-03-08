var MobileDealership = artifacts.require("MobileDealerShip.sol");

module.exports = function(deployer) {
  deployer.deploy(MobileDealership);
};
