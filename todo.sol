// specify the version of solidity
pragma solidity ^0.8.1;


//contract
contract Todo{
    string task;
    
    //function that writes task to the smart contract
    function setTask(string memory _task) public{
        task = _task;
    }
    
    //function that reads the task from the smart contract
    function getTask() public view returns(string memory){
        return task;
    }
}