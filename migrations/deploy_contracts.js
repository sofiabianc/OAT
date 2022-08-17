var OAT_token = artifacts.require("./OAT_token.sol"); 
var Upvote = artifacts.require("./Upvote.sol"); 

module.exports = function(deployer){
	deployer.deploy(OAT_token); 
	deployer.deploy(Upvote); 
};  


