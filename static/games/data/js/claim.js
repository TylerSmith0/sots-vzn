"use strict";
let currentAccount = "";
let isConnected = false;
/* PRODUCTION VALUES */
const PROPER_CHAIN = 1;
const rpcurl = "https://eth-mainnet.alchemyapi.io/v2/bb7Kr5VLAIXytW2JeUWaevWW7MCgz-mQ";
const abi = [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"PaymentReleased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"uint256","name":"list","type":"uint256"},{"internalType":"address[]","name":"addrs","type":"address[]"}],"name":"addToList","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"entry","type":"uint256"}],"name":"flipSaleState","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"freelistMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"freelistPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"freelistSale","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"freelistTokensClaimed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"mintQty","type":"uint256"}],"name":"greenlistMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"greenlistPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"greenlistSale","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"greenlistTokensClaimed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"isOperator","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxFreelistSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxGreenlistSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxTokenSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"mintQty","type":"uint256"}],"name":"publicMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"publicSale","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"reservedAmount","type":"uint256"},{"internalType":"address","name":"mintAddress","type":"address"}],"name":"reserveMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newBaseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pr","type":"uint256"}],"name":"setGreenlistPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"setMaxFreelistSupply","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"setMaxGreenlistSupply","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"setMaxTokenSupply","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pr","type":"uint256"}],"name":"setMintPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_WITHDRAW_ADDR","type":"address"}],"name":"setWithdrawAddr","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const contrAdd = "0xfc7168147658Dd170F4B5D908F21DB2675744cBB";

/* DEBUG VALUES */
// const PROPER_CHAIN = 3;
// const rpcurl = "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
// const abi = [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"PaymentReleased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"uint256","name":"list","type":"uint256"},{"internalType":"address[]","name":"addrs","type":"address[]"}],"name":"addToList","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"entry","type":"uint256"}],"name":"flipSaleState","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"freelistMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"freelistPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"freelistSale","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"freelistTokensClaimed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"mintQty","type":"uint256"}],"name":"greenlistMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"greenlistPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"greenlistSale","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"greenlistTokensClaimed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"isOperator","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxFreelistSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxGreenlistSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxTokenSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"mintQty","type":"uint256"}],"name":"publicMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"publicSale","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"reservedAmount","type":"uint256"},{"internalType":"address","name":"mintAddress","type":"address"}],"name":"reserveMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newBaseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pr","type":"uint256"}],"name":"setGreenlistPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"setMaxFreelistSupply","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"setMaxGreenlistSupply","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"setMaxTokenSupply","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pr","type":"uint256"}],"name":"setMintPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_WITHDRAW_ADDR","type":"address"}],"name":"setWithdrawAddr","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];
// const contrAdd = "0x189bBDf306D3d86e202D2742B0EC4B4AD10ebA17";


let mintQty = 1;
let web3Modal;
let provider;
let web3;
let contr;
let chainId;
const w3 = new Web3(rpcurl);

async function mint() {
  let liveSale = false;
  if (!(isConnected)) {
    alert('You must connect your account first!\n\nPress the CONNECT button to link your wallet.');
    return;
  } else {

    if (chainId !== PROPER_CHAIN && chainId !== 0){
      alert("Please switch your chain to Ethereum before minting!");
      return;
    }

    if (chainId == 0){
      alert("Error reading the network ID -- Please try switching to another network, then back to Ethereum and try again.");
      return;
    }

    web3 = new Web3(provider);
    contr = await new web3.eth.Contract(abi, contrAdd);
    console.log(contr.defaultAccount)
    console.log(web3.defaultChain)
    liveSale = await contr.methods.freelistSale().call({from: currentAccount});
  
    // Check if Freelist Sale is LIVE
    if (!(liveSale)){ // If sale is NOT active:
      alert('Sorry! The freelist sale isn\'t active yet. Please wait to mint once the sale is active -- otherwise you\'ll waste money on gas!');
      return;
    } else {
     
      await contr.methods.freelistMint().send({
        from: currentAccount})
          .on('transactionHash', function(hash){
            console.log(`transactionHash received: ${hash}`);
            // Disable the mint button:
            // document.getElementById('mintButton').removeEventListener('click', mint);
            alert("The Transaction Hash was received... Awaiting a receipt... Don't keep pressing the 'Claim' button!");
          })
          .on('receipt', function(receipt){
              console.log(`receipt of function: ${receipt}`);
              // document.getElementById('mintButton').addEventListener('click', mint);
              alert("Alright! You claimed your Savior! Check out OpenSea to view your new NFT! :]");
          })
          .on('error', function(error, receipt) {
              console.log(error);
              alert('An error occurred. Please make sure you have sufficient funds and try again.');
              onDisconnect();
          })

          onDisconnect();
        }
    }
    onDisconnect();
  }

async function init() {
  
    // Ensure secure connection
    // if(location.protocol !== 'https:') {
    //   alert('You need to be connected to a secure HTTPS connection to connect to Web3.');
    //   window.location.reload();
    //   return;
    // }
  
    const providerOptions = {
          walletconnect: {
            package: WalletConnectProvider.default,
            options: {
              pollingInterval: 10000,
              rpc:{
                      1: rpcurl,
                    //   137: `https://polygon-rpc.com/`
                    },
            }
          }
        };
  
    //   Initialize web3modal object
      try {
          web3Modal = new window.Web3Modal.default({
          cacheProvider: false, // optional
          providerOptions, // required
          disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
          theme: "dark",
        });
      } catch (e){
        console.log(e);
      }
  }

  async function onConnect() {

    try {
      provider = await web3Modal.connect();
      await provider.enable();
      
    } catch(e) {
      console.log("", e);
      return;
    }
  
    // Subscribe to accounts change
    provider.on("accountsChanged", async (accounts) => {
      await refreshAccountData();
    });
  
    // Subscribe to chainId change
    provider.on("chainChanged", async (ch) => {
      // console.log(Number(ch))
      await refreshAccountData();
    });
  
    await refreshAccountData();
    // console.log("About to test...");
    if (provider.isMetaMask && chainId !== 0 && chainId !== PROPER_CHAIN){
      let val = await provider.request({ method: 'wallet_switchEthereumChain', params:[{chainId: "0x" + PROPER_CHAIN.toString(16)}]});
      chainId = Number(await provider.request({method: 'eth_chainId'}));
    }
  
    // var xhr = new XMLHttpRequest();

    if (currentAccount !== null) {
      isConnected = true;
      
      await showConnectedButton();
      // // Send GET request with connected set to TRUE
      // window.location.replace(`/capeclasp/form?connected=True&wallet=${currentAccount}`);//.then(window.location.reload());
      // xhr.send();
    } else {
      alert('Error connecting to account. Please try again.');
      window.location.reload();
      // window.location.replace(`/capeclasp/form?connected=False`);
      // xhr.send();
      // window.location.reload();
    }
  }

  async function fetchAccountData(provider) {

    // Get a Web3 instance for the wallet
    web3 = new Web3(provider);
  
    // Get connected chain id from Ethereum node
    // TS -- adjusted 2/10/2022 from web3.eth.getChainId() not resolving on mobile browser
    chainId = Number(await provider.request({method: 'eth_chainId'}));
    console.log(`Connected to: ${chainId}`);
    
      // Get list of accounts of the connected wallet
    const accounts = await web3.eth.getAccounts();
    currentAccount = accounts[0];
    if (currentAccount !== null) {
      console.log(`Account connected: ${currentAccount}`);
      
    } else {
      alert("Looks like we couldn't find any accounts... Try again.");
      window.location.reload();
    }
      return;
  }
  
  async function refreshAccountData() {
    await fetchAccountData(provider);
  }

  async function onDisconnect() {

    if(provider.close) {
      await provider.close();
      await web3Modal.clearCachedProvider();
      provider = null;
    } else if (provider.disconnect) {
      await provider.disconnect();
      await web3Modal.clearCachedProvider();
      provider = null;
    }
    isConnected = false;
    currentAccount = null;
    window.location.reload();
  }

  async function showConnectedButton(){

    document.getElementById("connect-wrapper").innerHTML = `<div id="conn" onclick="mint();"><p id="connect-text">Claim Your Savior!</p></div>`;

  }

  // async function claimSavior(){
  //   let liveSale = false;
  //   if (!(isConnected)) {
  //     alert('You must connect your account first!\n\nPress the CONNECT button to link your wallet.');
  //     return;
  //   } else {

  //     if (chainId !== PROPER_CHAIN && chainId !== 0){
  //       alert("Please switch your chain to Ethereum before claiming!");
  //       return;
  //     }

  //     if (chainId == 0){
  //       alert("Error reading the network ID -- Please try switching to another network, then back to Ethereum and try again.");
  //       return;
  //     }

  //   web3 = new Web3(provider);
  //   contr = await new web3.eth.Contract(abi, contrAdd);
  //   console.log(contr.defaultAccount)
  //   console.log(web3.defaultChain)
  //   liveSale = await contr.methods.freelistSale().call({from: currentAccount});
  
  //   // Check if Sale is LIVE
  //   if (!(liveSale)){ // If sale is NOT active:
  //     alert('Sorry! The sale isn\'t active yet. Please wait to mint once the sale is active -- otherwise you\'ll waste money on gas!');
  //     return;
  //   } else {
  //     // Get mint price
  //     console.log('before mint price');
  //     let mintPrice = await contr.methods.mintPrice().call({from: currentAccount});
  //     console.log(mintPrice);
  //     mintPrice = mintPrice * mintQty;
  //     await contr.methods.createSavior(Number(mintQty)).send({
  //       from: currentAccount,
  //       value: mintPrice})
  //         .on('transactionHash', function(hash){
  //           console.log(`transactionHash received: ${hash}`);
  //           // Disable the mint button:
  //           document.getElementById('mintButton').removeEventListener('click', mint);
  //           alert("The Transaction Hash was received... Awaiting a receipt... Don't keep pressing the 'Mint' button!");
  //         })
  //         .on('receipt', function(receipt){
  //             console.log(`receipt of function: ${receipt}`);
  //             document.getElementById('mintButton').addEventListener('click', mint);
  //             alert("Alright! Looks like you minted successfully! Check out OpenSea to view your new NFTs! :]");
  //         })
  //         .on('error', function(error, receipt) {
  //             console.log(error);
  //             alert('An error occurred. Please make sure you have sufficient funds and try again.');
  //             onDisconnect();
  //         })

  //         onDisconnect();
  //       }
  //   }
  //   onDisconnect();
  // }

  document.addEventListener('DOMContentLoaded', () => {
    init();
});