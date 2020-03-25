pragma solidity >=0.4.21 <0.7.0;

contract MobileDealership
{
    struct Mobile{
        address userId;
        string ownerName;
        string seller;
        uint price;
        int password;
        string purchaseDate;
        string warranty;
        uint altNumber;
    }
    mapping(address => Mobile) public m;
    
    modifier isVerifiedOwner(address uid,int pwd)
    {
        require(m[uid].password == pwd);
        _;
    }
    
    
    function createOwnership(string memory ownerName,string memory _seller,uint price,int pwd,
    string memory purchaseDate,string memory warranty,
    uint altNumber) public
    {
        m[msg.sender] = Mobile(msg.sender, ownerName,_seller,price,pwd,purchaseDate,warranty,altNumber);
    }
    
    
    function displayDetails(int pwd) view  isVerifiedOwner(msg.sender,pwd) public
     returns(address,string memory,string memory,uint,string memory,string memory,uint)
    {
        return (m[msg.sender].userId,m[msg.sender].ownerName,m[msg.sender].seller,m[msg.sender].price,
        m[msg.sender].purchaseDate,m[msg.sender].warranty,m[msg.sender].altNumber);
    }


    function update(int pwd,uint num) isVerifiedOwner(msg.sender,pwd) public
    {
        m[msg.sender].altNumber = num; 
    }
    
    function transact(int pwd,string memory _newOwner,string memory _purchaseDate,uint _price,
    int _newPassword) isVerifiedOwner(msg.sender,pwd) public 
    {
        m[msg.sender].seller = m[msg.sender].ownerName;
        m[msg.sender].ownerName = _newOwner;
        m[msg.sender].price = _price;
        m[msg.sender].purchaseDate = _purchaseDate;
        m[msg.sender].password = _newPassword;
    }
    
}