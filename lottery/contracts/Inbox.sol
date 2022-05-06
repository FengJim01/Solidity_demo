// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Lottery{
	address public manager;
	address[] public players;

	constructor() {
		manager = msg.sender;
	}

	function enter() public payable{
		require(msg.value > .01 ether);
		players.push(msg.sender);
	}

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

	function pickWinner() public restricts{
        uint index = random() % players.length;
        
		(bool sent, bytes memory data) = payable(players[index]).call{value: address(this).balance}("");
		require(sent, "Something went wrong!");

		players = new address[](0);
    }

	modifier restricts(){
		require(msg.sender == manager);
		_;
	}

	function getPlayers() public view returns (address[] memory) {
		return players;
	}
}