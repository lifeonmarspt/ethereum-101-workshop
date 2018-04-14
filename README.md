# Forever On The Chain — Ethereum 101

**Writing, testing and deploying an Ethereum smart contract and its web interface**

![](https://cdn-images-1.medium.com/max/2000/1*4GNg30Shnxd3JZysM75dFQ.jpeg)

Picture a digital tattoo: a smart contract that anyone can use for free to leave a permanent message on the Ethereum blockchain.

That's what we'll be building during this workshop: a simple application that's great as an introduction to this new technology. Think Hello World but on the blockchain.

You'll learn some core concepts of blockchain and Ethereum such as smart contracts, transactions, and gas. Then, we'll build and test the contract and create a web interface to interact with it.

*(an outdated version of my introductory tutorial, which covers some stuff we'll skip during the workshop, can be found [here](https://hackernoon.com/full-stack-smart-contract-development-fccdfe5176ce))*

## Structure

1. Introduction
    1. Blockchain and the data structure
    1. Bitcoin and the incentive layer
    1. Ethereum and cryptoeconomics
    1. Ethereum 101
1. Hands-on 
    1. Setup
    1. The Recorder smart contract: overview and testing
        1. Contract code walkthrough
        1. Testing code walkthrough
    1. Ganache: Deploying to a local testnet
        1. Setting up truffle and ganache
        1. Deploying the contract and interacting with it
        1. Running tests
    1. Infura: Deploying to the Ropsten testnet
        1. Testnets
        1. Block explorers
    1. MetaMask: Building a web interface
        1. Web-based contract interaction
        1. Setting up MetaMask and using a faucet
        1. Building a simple web app using MetaMask

## Setup

This setup targets Ubuntu 16.04.4 LTS (GNU/Linux 4.4.0-1052-aws x86_64).

Install [build-essential](https://packages.ubuntu.com/trusty/build-essential).

```bash
sudo apt-get install build-essential
```

Install [npm](https://www.npmjs.com).

```bash
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Install [truffle](http://truffleframework.com).

```bash
npm install -g truffle
```

Install [ganache-cli](https://github.com/trufflesuite/ganache-cli).

```bash
npm install -g ganache-cli
```

Install [truffle-hdwallet-provider](https://github.com/trufflesuite/truffle-hdwallet-provider).

```bash
sudo npm install truffle-hdwallet-provider
```

Install the [MetaMask browser extension](https://metamask.io/).

## The Recorder smart contact

[The Recorder smart contract](https://github.com/lifeonmarspt/ethereum-101-workshop/blob/master/Solidity.sol) is as simple as they come. Its only functionality is to log a message into the blockchain. This is achieved through the use of Events, as explained below.

### Overview

The smart contract is written in Solidity. This is a statically typed language to write Ethereum smart contracts. From [the documentation](http://solidity.readthedocs.io/en/develop/index.html):

> Solidity is a contract-oriented, high-level language whose syntax is similar to that of JavaScript and it is designed to target the Ethereum Virtual Machine (EVM).

Let’s start by walking slowly through the code.

```solidity
pragma solidity 0.4.21;
```

As per [the documentation](http://solidity.readthedocs.io/en/develop/layout-of-source-files.html#version-pragma):

> Source files can (and should) be annotated with a so-called version pragma to reject being compiled with future compiler versions that might introduce incompatible changes.

This line ensures that your source file won’t be compiled by a compiler with a version different from 0.4.21.

```solidity
contract Recorder {}
```

`contract` is, as the name implies, the keyword one uses to define a contract. A contract is defined with a name written in [PascalCase](https://en.wikipedia.org/wiki/PascalCase).

```solidity
event Record(
  address _from,
  string _message
);
```

Here, we’re defining an event. Events allow you write access to the Ethereum logging facilities. When called, the arguments they were invoked with get stored in the transaction’s log, which is a special data structure in the blockchain [[docs](http://solidity.readthedocs.io/en/develop/contracts.html#events)]. These transaction logs can be used for storing information.

Compared to using contract storage (writing to a variable in a contract), using logs is much cheaper with regards to gas costs. However, this comes with a trade-off: contracts aren’t able to read from log data ([see this great post by Consensys for more details](https://media.consensys.net/technical-introduction-to-events-and-logs-in-ethereum-a074d65dd61e)).

Since, for our use case, we don’t need contracts to read from these logs, we’re using events instead of storing an array of strings.

```solidity
function record(string message) {
  emit Record(msg.sender, message);
}
```

The `record` method is as simple as they come. It takes a `string` argument named `message`, and all it does is `emit` the `Record` event with two parameters:

* `msg.sender` holds the address of the account which invoked the record function [[docs](http://solidity.readthedocs.io/en/develop/units-and-global-variables.html#block-and-transaction-properties)];
* `message` is just the argument record was invoked with.

Interaction with this particular smart contract is possible in only one way: sending a transaction at it, along with a `message` parameter, which invokes the `record` method. When an account `A` invokes the `record` method, the `Record` event is called, which causes the tuple `{A's address, message}` to be stored in the respective transaction’s log.

### Testing

Truffle uses the [Mocha](https://mochajs.org/) testing framework, and [Chai](http://chaijs.com/) for assertions. We’ll be using [this test](https://github.com/lifeonmarspt/ethereum-101-workshop/blob/master/recorder.js).

It’s pretty simple as far as tests go:

* `Recorder.deployed()` resolves when it gets a hold of the deployed `Recorder` instance
* we use `instance.Record(...).get()` first, to get the list of messages written to it
* we check that it has no messages, with `assert.equal(0, events.length)`
* we then write one message with `instance.record("pokemon")`
* and finally, we ensure the message was written, with `assert.equal(1, events.length)`

## Truffle instructions

Initialize truffle:
```bash
truffle init
```
This will create a directory structure with truffle defaults and examples.
* the config file stays in the root directory
* smart contracts go into the `contracts` folder
* migrations go into the `migrations` folder
* tests go into the `tests` folders

Deploy contracts:
```bash
truffle migrate --reset
```

Test contracts:
```bash
truffle test
```

Obtain contract instance:
```js
recorder = Recorder.at(Recorder.address)
```

Call the record method with a message:
```js
recorder.record("i dont even")
```

Read all contract events:
```js
var filters = {}
var options = {fromBlock: 0, toBlock: "latest"}
var callback = (error,result) => (console.log(result.map((result) => (result.args._message))))
recorder.Record(filters, options).get(callback)
```

## Browser console snippets

Initializing web3 for Infura:
```js
var infuraHost = "https://ropsten.infura.io/API_KEY";
var web3 = new Web3(new HDWalletProvider("seed words", host));
```

Initializing web3 for MetaMask:
```js
var web3 = new Web3(web3.currentProvider);
```

Obtaining a contract instance:
```js
var contractABI = JSON.parse('[ { "anonymous": false, "inputs": [ { "indexed": false, "name": "_from", "type": "address" }, { "indexed": false, "name": "_message", "type": "string" } ], "name": "Record", "type": "event" }, { "constant": false, "inputs": [ { "name": "message", "type": "string" } ], "name": "record", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" } ]');
var contractAddress = "0x271a247f671eeeb21f7c1d53e46fdb87509e6936";
var contract = new web3.eth.Contract(contractABI, contractAddress);
```

Writing to the contract:
```js
contract.methods.record(message).send({
  from: "0x3543f41a7e75162434dbebf6c3592abbf3432f04",
  gas: 100000,
}, function(error, result){
  console.log("error", error);
  console.log("result", result);
});
```

Reading contract events:
```js
contract.getPastEvents("Record", {fromBlock: 0, toBlock: "latest"}, console.log);
```
