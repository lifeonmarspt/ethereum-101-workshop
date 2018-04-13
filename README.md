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
    1. Ganache: Deploying to a local testnet
    1. Infura: Deploying to the Ropsten testnet
    1. MetaMask: Building a web interface

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

## Useful truffle snippets

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
