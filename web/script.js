var web3 = new Web3(web3.currentProvider);

web3.eth.getAccounts().then(function (accounts) {
  var account = accounts[0];

  var contractABI = JSON.parse('[ { "anonymous": false, "inputs": [ { "indexed": false, "name": "_from", "type": "address" }, { "indexed": false, "name": "_message", "type": "string" } ], "name": "Record", "type": "event" }, { "constant": false, "inputs": [ { "name": "message", "type": "string" } ], "name": "record", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" } ]');
  var contractAddress = "0x271a247f671eeeb21f7c1d53e46fdb87509e6936";
  var contract = new web3.eth.Contract(contractABI, contractAddress);

  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();

    var message = document.querySelector("input[type=text]").value;

    contract.methods.record(message).send({
      from: account,
      gas: 100000,
    }, function(error, result){
      console.log("error", error);
      console.log("result", result);
    })
  });

  var logDiv = document.querySelector("#log-div");
  contract.getPastEvents("Record", {fromBlock: 0, toBlock: "latest"}, function (error, events) {
    events.forEach(function (event) {
      var p = document.createElement("p");
      p.textContent = event.returnValues._message;
      logDiv.prepend(p);
    });
  });
});
