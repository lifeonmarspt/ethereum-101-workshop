var HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  networks: {
    development: {
      provider: function () {
        return new HDWalletProvider("seed words", "https://ropsten.infura.io/API_KEY")
      },
      network_id: "*",
      gas: 4712387,
    }
  }
};
