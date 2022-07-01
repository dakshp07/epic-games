import React, {useState, useEffect } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import SelectCharacter from './Components/SelectCharacter';
import { CONTRACT_ADDRESS, transformCharacterData} from './constants';
import myEpicGame from './utils/MyEpicGame.json';
import {ethers} from 'ethers';
import Arena from './Components/Arena';
import LoadingIndicator from './Components/LoadingIndicator';

// Constants
const TWITTER_HANDLE = 'dakshp07';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  // state variables for checking user accounts
  const[currentAccount, setCurrentAccount] = useState(null);

  // state variable for setting up character nft
  const [characterNFT, setCharacterNFT] = useState(null);

  // state variable for loading
  const [isLoading, setIsLoading] = useState(false);

  // now we will check if the wallet is connected or not
  const checkIfWalletIsConnected=async()=>{
    // ethereum object provided by metamask
    try{
      const {ethereum} = window;
      if(!ethereum) // if we dont have metamask in browser
      {
        console.log("make sure you have metamask!");
        // We set isLoading here because we use return in the next line
        setIsLoading(false);
      }
      else{
        console.log("here is the ethereum object", ethereum);
        // since we have metamask we grab the acocunts
        const accounts=await ethereum.request({method: 'eth_accounts'});

        // in case of multiple accounts we pick first one
        if(accounts.length!==0)
        {
          const account=accounts[0];
          console.log('Found an authorized account:', account);
          setCurrentAccount(account);
        }
        else{
          console.log('No authorized account found');
        }
      }
    }
    catch(error)
    {
      console.log(error);
    }
    // We release the state property after all the function logic
    setIsLoading(false);
  };

  // render methods
  const renderContent=()=>{
    // If the app is currently loading, just render out LoadingIndicator
    if (isLoading) {
      return <LoadingIndicator />;
    }
    // Scenario #1: If user has has not connected to your app - Show Connect To Wallet Button
    if(!currentAccount)
    {
      return(
        <div className="connect-wallet-container">
            <img
              src="https://media0.giphy.com/media/Lsm8Kg1KoZiaQ/giphy.gif?cid=ecf05e47m00pebmosnybrjnrb3ig7wb6v3133xo3zx4mybiq&rid=giphy.gif"
              alt="Monty Python Gif"
            />
            {/*
            * Button that we will use to trigger wallet connect
            * Don't forget to add the onClick event to call your method!
            */}
            <button className="cta-button connect-wallet-button" onClick={connectWalletAction}>Connect Wallet To Get Started</button>
          </div>
      );
    }
    // Scenario #2: If user has connected to your app AND does not have a character NFT - Show SelectCharacter Component
    else if (currentAccount && !characterNFT) {
      return <SelectCharacter setCharacterNFT={setCharacterNFT} />;
    }
    // Scenario #3: If there is a connected wallet and characterNFT, it's time to battle!
    else if (currentAccount && characterNFT) {
      return <Arena characterNFT={characterNFT} setCharacterNFT={setCharacterNFT} />
    }
  };

  // method for connecting wallet through button
  const connectWalletAction=async()=>{
    try{
      const {ethereum} = window;
      if(!ethereum)
      {
        alert('get metamask');
        return;
      }
      const accounts=await ethereum.request({method: 'eth_requestAccounts'});
      // Boom! This should print out public address once we authorize Metamask.
      console.log('connetected', accounts[0]);
      setCurrentAccount(accounts[0]);
    }
    catch(error)
    {
      console.log(error);
    }
  }

  useEffect(()=>{
    checkIfWalletIsConnected();
    // Anytime our component mounts, make sure to immiediately set our loading state
    setIsLoading(true);
    // check the network
    const checkNetwork=async()=>{
      try{
        if(window.ethereum.networkVersion!=='4')
        {
          alert("Please connect to Rinkeby!")
        }
      }
      catch(error)
      {
        console.log(error);
      }
    }
  }, []);

  useEffect(()=>{
    // this function will interact with our contract
    const fetchNFTMetadata=async()=>{
      console.log("checking for character NFT on address:", currentAccount);
      // we will now take help of our events we made in our contract to check
      const provider=new ethers.providers.Web3Provider(window.ethereum);
      const signer=provider.getSigner();
      const gameContract=new ethers.Contract(CONTRACT_ADDRESS, myEpicGame.abi, signer);
      const txn=await gameContract.checkIfUserHasNFT(); // calling our function from contract
      if(txn.name) // if we have the name of nft then we know that this address has an character nft
      {
        console.log('User has character NFT');
        setCharacterNFT(transformCharacterData(txn));

        // once everything loades we set loading to false
        setIsLoading(false);
      }
      else {
        console.log('No character NFT found');
      }
    };
    // We only want to run this, if we have a connected wallet
    if (currentAccount) {
      console.log('CurrentAccount:', currentAccount);
      fetchNFTMetadata();
    }
  }, [currentAccount]); // Anytime the value of currentAccount changes, this useffect will get fired! For example, when currentAccount changes from null to a new wallet address, this logic will run.

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Epic ⚔️ Game ⚔️ Slayer</p>
          <p className="sub-text">Team up to protect the Epic Metaverse!</p>
          {/* This is where our button and image code used to be!
           *	Remember we moved it into the render method.
          */}
          {renderContent()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built with @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
