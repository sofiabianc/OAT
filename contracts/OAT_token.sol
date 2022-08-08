pragma solidity ^0.5.0; 

contract OAT_token{
	// Constructor (sets value for # of tokens we will have)
	// Set the total number of tokens
	// Read the total number of tokens
	uint256 public totalSupply;

	constructor() public{
		// store number of tokens that will exist, set to a variable
		totalSupply = 500000; 
	}
}