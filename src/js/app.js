App = {
  web3Provider: null,
  contracts: {},
  account:'0x0',


  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if(typeof web3 !== 'undefined')
    {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    }
    else{
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function() {

    $.getJSON("MobileDealership.json", function(MobileDealerShip){
      App.contracts.MobileDealership = TruffleContract(MobileDealerShip);
      App.contracts.MobileDealership.setProvider(App.web3Provider);
      console.log(App.contracts.MobileDealership);
    });
    return App.render();
  },

  render: function(){
    web3.eth.getCoinbase(function (err,account){
      if(err == null)
      {
        console.log(account);
        console.log(web3.eth.accounts);
      }
    });
  },
  createAccount: function()
  {
    var mobile_instance;
    App.contracts.MobileDealership.deployed().then(function(instance){
      mobile_instance = instance;
      var userId = document.getElementById("userId").value;
      var ownerName = document.getElementById("ownerName").value; 
      var seller = document.getElementById("seller").value; 
      var price = document.getElementById("price").value; 
     // var password = document.getElementById("pwd").value; 
      var purchaseDate = document.getElementById("purchaseDate").value; 
      var warranty = document.getElementById("warranty").value; 
      var altNumber = document.getElementById("altNumber").value; 
      return mobile_instance.createOwnership(userId,ownerName,seller,price,"123",
        purchaseDate, warranty,altNumber)
    }).then(function(txn){
      console.log("Transaction :",txn);
      if(txn.receipt.status == '0x1')
      {
        alert("Account Created...");
      }
      else{
        alert("failed");
      }
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
