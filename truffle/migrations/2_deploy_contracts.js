var Recorder = artifacts.require("./Recorder.sol");
module.exports = function(deployer) {
  deployer.deploy(Recorder);
};
