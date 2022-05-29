"use strict";
let currentAccount = "";
let isConnected = false;
const PROPER_CHAIN = 4;
const rpcurl = "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";

let mintQty = 1;
let web3Modal;
let provider;
let web3;
let contr;
let chainId;
const w3 = new Web3(rpcurl);

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
                      4: rpcurl,
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
      // Send GET request with connected set to TRUE
      window.location.replace(`/capeclasp/form?connected=True&wallet=${currentAccount}`);//.then(window.location.reload());
      // xhr.send();
    } else {
      alert('Error connecting to account.');
      window.location.replace(`/capeclasp/form?connected=False`);
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

  document.addEventListener('DOMContentLoaded', () => {
    init();
});