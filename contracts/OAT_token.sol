pragma solidity ^0.5.0; 

contract OAT_token{
	string public name = "OAT_token"; //name
	string public symbol = "OAT"; 	  //symbol
	string public standard = "OAT Token v1.0"; //Version of token 
	uint256 public totalSupply;
	// Constructor (sets value for # of tokens we will have)
	// Set the total number of tokens
	// Read the total number of tokens
	event Transfer(
		address indexed _from, 
		address indexed _to, 
		uint256 _value

	); 

	// approve 
	event Approval(
		address indexed _owner, 
		address indexed _spender, 
		uint256 _value
	); 

	// transfer event


	mapping(address => unint256)public balanceOf;
	// balanceOf gives us a reader function that takes 
	// in the address of the owner and returns an unsigned int 
	// which is the balance of this particular address. 
	// Tells us where each token lives

	// allowance
	mapping(address => mapping(address => unint256)) public allowance; // account a approving account b; keeps track of all approvals for transfering tokens. 

	function OAT_token(uint256 _initialSupply) public{
		// store number of tokens that will exist, set to a variable
		balanceOf[msg.sender] = _initialSupply; 
		totalSupply = _initialSupply; //tokens that are minted into the ecosystem
		// allocate the initial supply

	}

	// Transfer
	// Exception if account doesn't have enough
	// Return a boolean
	// Transfer Event
	function transfer(address _to, uint256 _value)public returns (bool success){
		// Exception if account doesn't have enough
		require(balanceOf[msg.sender] >= _value); 
		balanceOf[msg.sender] -= _value; 
		balanceOf[_to] -= _value; 
		// deducts balance from one account and puts it into another

		Transfer(msg.sender, _to, _value);
		// Return a boolean
		return true; 
	}

	// Delegated Transfer 

	// 9/17: Transfer from, approve, allowance.

	// approve
	function approve(address _spender, uint256 _value) public returns(bool success)
		// sets the allowance
		allowance[msg.sender][_spender] = _value; 
		// triggers approve event for any successful call 
		Approval(msg.sender, _spender, _value); 

		return true; 
	}

	// transfer from




}