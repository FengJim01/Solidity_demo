// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
// import the interface & bytecode from compile.js
const {abi, evm} = require('../compile')

/* Testing
class Car {
  park() {
    return "stopped";
  }
  drive() {
    return "vroom";
  }
}

let car;

beforeEach(() => {
  car = new Car();
});

describe("Car", () => {
  it("can park", () => {
    assert.equal(car.park(), "stopped");
  });
  it("can drive", () => {
    assert.equal(car.drive(), "vroom");
  });
});
*/

let accounts;
let inbox;
const INITAL_MESSAGE = 'Hi,there!';
beforeEach(async () =>{
	// Get a list of accounts
	accounts = await web3.eth.getAccounts();
	// Use one of accounts to deploy
	// the contract
	inbox = await new web3.eth.Contract(abi)
		.deploy({ data:evm.bytecode.object, arguments:['Hi,there!']})
		.send({ from: accounts[1], gas:'1000000'})
})

describe('Inbox', () =>{
	it("deploy an contract", ()=>{
		// make sure the address is existed
		assert.ok(inbox.options.address); 
	}); 
	it("it have a default message", async () =>{
		// Calling the function
		//inbox(contract inbox).methods(there are two methods: message & setMessage)
		//.message().call(). It is clear to read in inbox.sol
		const message = await inbox.methods.message().call();
		assert.equal(message, INITAL_MESSAGE);
	});
	it("update the message", async () =>{
		// send transaction to function
		// accounts[0] pay the gas
		await inbox.methods.setMessage('Change!').send({from:accounts[0]});
		const message = await inbox.methods.message().call();
		assert.equal(message, 'Change!');
	})
})