// This directory will hold the core logic for our SelectCharacter component as well as it's styling! You should already see a SelectCharacter.css file in there with a bunch of styling!
import React, { useEffect, useState } from "react";
import './SelectCharacter.css';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, transformCharacterData } from '../../constants';
import myEpicGame from '../../utils/MyEpicGame.json';
import LoadingIndicator from "../../Components/LoadingIndicator";

// Don't worry about setCharacterNFT just yet, we will talk about it soon!

const SelectCharacter = ({ setCharacterNFT }) => {
    /* 
    characters - This will hold all the character metadata we get back from our contract

    gameContract - This one is cool! Since we are going to be using our contract in multiple spots, let's just initialize it once and store it in state to use throughout our contract:
    */
    const [characters, setCharacters]=useState([]);
    const [gameContract, setGameContract]=useState(null);

    // state variable for loading
    const [mintingCharacter, setMintingCharacter]=useState(false);

    // lets mint our characters
    const mintCharacterNFTAction=async(characterId)=>{
        try{
            if(gameContract)
            {
                // Show our loading indicator
                setMintingCharacter(true);
                console.log("minting in progress..");
                const minTxn=await gameContract.mintCharacterNFT(characterId); // calling out function in contract
                await minTxn.wait();
                console.log('mintTxn:', minTxn);
                // Hide our loading indicator when minting is finished
                setMintingCharacter(false);
            }
        }
        catch(error)
        {
            console.warn('MintCharacterAction Error:', error);
            // If there is a problem, hide the loading indicator as well
            setMintingCharacter(false);
        }
    };

    useEffect(()=>{
        const {ethereum} = window;
        if(ethereum){
            const provider=new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const gameContract = new ethers.Contract(
                CONTRACT_ADDRESS,
                myEpicGame.abi,
                signer
            );
            setGameContract(gameContract);
        }
        else{
            console.log('Ethereum object not found');
        }
    }, []);

    // since we need all the data asap we write another use effect which will listen to all changes in the game contract and revert back
    useEffect(()=>{
        const getCharacters=async()=>{
            try{
                console.log('getting characters to mint');
                // call contract to get all mintable characters
                const characterTxn=await gameContract.getAllDefaultCharacters(); // calling our function from contract
                console.log('characterTxn:', characterTxn);
                // go through all the data and transform it for us 
                const characters=characterTxn.map((characterData)=>transformCharacterData(characterData));
                // set all mintable character in state
                setCharacters(characters);
            }
            catch(error)
            {
                console.error('Something went wrong fetching characters:', error);
            }
        };

        // Add a callback method that will fire when this event is received
        const onCharacterMint = async (sender, tokenId, characterIndex) => {
            console.log(
              `CharacterNFTMinted - sender: ${sender} tokenId: ${tokenId.toNumber()} characterIndex: ${characterIndex.toNumber()}`
            );
            alert(`Your NFT is all done -- see it here: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`); // laert the user which displays the link to nft
            // Once our character NFT is minted we can fetch the metadata from our contract and set it in state to move onto the Arena
            if (gameContract) {
                const characterNFT = await gameContract.checkIfUserHasNFT(); // again calling out contract function
                console.log('CharacterNFT: ', characterNFT);
                setCharacterNFT(transformCharacterData(characterNFT));
            }
        };

        // if our game contact is ready then lets get character data
        if(gameContract)
        {
            getCharacters();
            // Setup NFT Minted Listener
            gameContract.on('CharacterNFTMinted', onCharacterMint);
        }
        return()=>{
            // When your component unmounts, let's make sure to clean up this listener
            if (gameContract) {
                gameContract.off('CharacterNFTMinted', onCharacterMint);
            }
        };
    }, [gameContract]);

    // render methods to display our character in frontend
    const renderCharacters=()=>
        characters.map((character, index)=>(
            <div className="character-item" key={character.name}>
      <div className="name-container">
        <p>{character.name}</p>
      </div>
      <img src={character.imageURI} alt={character.name} />
      <button type="button" className="character-mint-button" onClick={()=> mintCharacterNFTAction(index)}>{`Mint ${character.name}`}</button>
    </div>
        ));

    // Add a callback method that will fire when this event is received
    

    return (
      <div className="select-character-container">
        <h2>Mint Your Hero. Choose wisely.</h2>
        {/* Only show this when there are characters in state */}
        {characters.length > 0 && (
        <div className="character-grid">{renderCharacters()}</div>
        )}
        {/* Only show our loading state if mintingCharacter is true */}
    {mintingCharacter && (
      <div className="loading">
        <div className="indicator">
          <LoadingIndicator />
          <p>Minting In Progress...</p>
        </div>
        <img
          src="https://media2.giphy.com/media/61tYloUgq1eOk/giphy.gif?cid=ecf05e47dg95zbpabxhmhaksvoy8h526f96k4em0ndvx078s&rid=giphy.gif&ct=g"
          alt="Minting loading indicator"
        />
      </div>
    )}
      </div>
    );
  };
  
  export default SelectCharacter;