// deploy code will go here
const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const {abi, evm} = require("./compile");

const provider = new HDWalletProvider(
	'password',
	'https://rinkeby.infura.io/v3/e808584de3e34bf69ca2363f7ae3017e'
);
const web3 = new Web3(provider);

const deploy = async () =>{
	accounts = await web3.eth.getAccounts();
	
	console.log("Attempting to deploy from the account",accounts[0]);
	
	const result = await new web3.eth.Contract(abi)
		.deploy({data:evm.bytecode.object,arguments:['Hi there!']})
		.send({from:accounts[0],gas:'1000000'});
		
	console.log("Contract deploy to",result.options.address);
	provider.engine.stop();
};

deploy();