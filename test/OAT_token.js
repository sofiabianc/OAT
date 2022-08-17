var OAT_token = artifacts.require("./OAT_token.sol"); 

contract('OAT_token', function(accounts){
	var tokenInstance; 

	it('initializes a contract with the correct values', function(){
		return OAT_token.deployed().then(function(instance){
			tokenInstance = instance; 
			return tokenInstance.name();  
		}).then(function(name){
			assert.equal(name,'OAT_token', 'has the correct name'); 
			return tokenInstance.symbol(); 
		}).then(function(symbol){
			assert.equal(symbol, 'OAT', 'has the correct symbol'); 
		}).then(function(standard){
			assert.equal(standard, "OAT Token v1.0", 'has the correct standard')
		});
	})

	it('allocates the total supply upon deployment', function(){
		return OAT_token.deployed().then(function(instance){
			tokenInstance = instance; 
			return tokenInstance.totalSupply();
		}).then(function(totalSupply){
			assert.equal(totalSupply.toNumber(), 500000, 'sets total supply to 500,000'); 
			return tokenInstance.balanceOf(accounts[0]); 
		}).then(function(adminBalance){
			assert.equal(adminBalance.toNumber(), 500000, 'it allocates initial supply to admin account.'); 
		}); 
	})

	it('transfers token ownership', function(){
		return OAT_token.deployed().then(function(instance){
			tokenInstance = instance;
			// Test 'require' statement first by transferring something larger than sender's balance
			return tokenInstance transfer call(accounts[1],99999999999999999); 
		}) then(assert fail) catch(function(error){
			assert(error message indexOf('revert') >= 0, 'error message must contain revert'); 
			return tokenInstance.transfer.call(accounts[1], 250000, {from: accounts[0]}); 
		}).then(function(success){
			assert.equal(success, true, 'it returns true'); 
			return tokenInstance.transfer(accounts[1], 250000, {from: account[0]}); 
		}).then(function(receipt){
			return tokenInstance.balanceOf(account[1]); 
			assert.equal(receipt.logs.length, 1, 'triggers 1 event'); 
			assert.equal(receipt.logs.[0].event, 'Transfer', 'should be "Transfer" event');
			assert.equal(receipt.logs.[0].args._from, accounts[0], 'logs the account tokens are transfered from');
			assert.equal(receipt.logs.[0].args._to, accounts[1], 'logs the account tokens transfer to'); 
			assert.equal(receipt.logs.[0].args._value, 250000, 'logs the transfer amount'); 
		}).then(function(balance){
			assert.equal(balance.toNumber(), 250000, 'adds the amount to the recieving account'); 
			return tokenInstance.balanceOf(accounts[0]); 
		}).then(function(balance){
			assert.equal(balance.toNumber(), 250000, 'deducts the amount from sending account'); 
		}); 
	});

	it('approves tokens for delegated transfer', function(){
		return DappToken.deployed().then(function(instance){
			tokenInstance = instance; 
			return tokenInstance.approve.call(accounts[1], 100); 
		}).then(function(success){
			assert.equal(success, true, 'it returns true'); 
			return tokenInstance.approve(account[1], 100, {from: accounts[0]}); 
		}).then(function(receipt){
			assert.equal(receipt.logs.length, 1, 'triggers 1 event'); 
			assert.equal(receipt.logs.[0].event, 'Approval', 'should be "Transfer" event');
			assert.equal(receipt.logs.[0].args._from, accounts[0], 'logs the account tokens are transfered from');
			assert.equal(receipt.logs.[0].args._to, accounts[1], 'logs the account tokens transfer to'); 
			assert.equal(receipt.logs.[0].args._value, 100, 'logs the transfer amount'); 
			return tokenInstance.allowance(accounts[0], accounts[1]); 
		}).then(function(allowance){
			assert.equal(allowance toNumber(), 100, 'stores the allowance delegated for transfer'); 
		});   
	}); 
}); 