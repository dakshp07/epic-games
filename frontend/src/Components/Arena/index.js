import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, transformCharacterData } from '../../constants';
import myEpicGame from '../../utils/MyEpicGame.json';
import './Arena.css';
import LoadingIndicator from "../../Components/LoadingIndicator"; 

// We pass in our characterNFT metadata so we can show a cool card in our UI
const Arena=({characterNFT, setCharacterNFT})=>{
    // state variables for contract
    const [gameContract, setGameContract] = useState(null);

    // state variable to get boss
    const[boss, setBoss]=useState(null);

    // state variable for attacks
    const [attackState, setAttackState] = useState('');

    // state variables for toast
    const [showToast, setShowToast] = useState(false);

    // action to attack boss
    const runAttackAction = async () => {
        try {
          if (gameContract) {
            setAttackState('attacking');
            console.log('Attacking boss...');
            const attackTxn = await gameContract.attackBoss(); // calling our function from contract
            await attackTxn.wait();
            console.log('attackTxn:', attackTxn);
            setAttackState('hit');
            // set toast state to true for 5 secs and then make it false
            setShowToast(true);
            setTimeout(() => {
              setShowToast(false);
            }, 5000);
          }
        } catch (error) {
          console.error('Error attacking boss:', error);
          setAttackState('');
        }
      };

    // using effects for boss
    useEffect(()=>{
        // set up a function to get boss and put it in our state variable
        const fetchBoss=async()=>{
            const bossTxn=await gameContract.getBigBoss(); // calling our function from contract
            console.log('Boss:', bossTxn);
            setBoss(transformCharacterData(bossTxn));
        };

        // set up the logic to fire the event when boss is attack to display the diff in hp of player, boss
        const onAttackComplete = (from, newBossHp, newPlayerHp) => {
            const bossHp = newBossHp.toNumber();
            const playerHp = newPlayerHp.toNumber();
            const sender = from.toString();

            console.log(`AttackComplete: Boss Hp: ${bossHp} Player Hp: ${playerHp}`);
            // Update both player and boss Hp
            setBoss((prevState) => {
                return { ...prevState, hp: bossHp };
            });
            setCharacterNFT((prevState) => {
                return { ...prevState, hp: playerHp };
            });
        }

        if (gameContract) {
            // gameContract is ready to go! Let's fetch our boss
            fetchBoss();
            gameContract.on('AttackComplete', onAttackComplete);
        }
        // Make sure to clean up this event when this component is removed
        return () => {
            if (gameContract) {
                gameContract.off('AttackComplete', onAttackComplete);
            }
        }
    }, [gameContract]);

    // using effects
    useEffect(()=>{
        const {ethereum} = window;
        if(ethereum)
        {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const gameContract = new ethers.Contract(
                CONTRACT_ADDRESS,
                myEpicGame.abi,
                signer
            );
            setGameContract(gameContract);
        }
        else
        {
            console.log('Ethereum object not found');
        }
    }, []);
    return (
    <div className="arena-container">
      {/* Add your toast HTML right here */}
    {boss && characterNFT && (
      <div id="toast" className={showToast ? 'show' : ''}>
        <div id="desc">{`💥 ${boss.name} was hit for ${characterNFT.attackDamage}!`}</div>
      </div>
    )}
          {/* Replace your Boss UI with this */}
    {boss && (
      <div className="boss-container">
        <div className={`boss-content ${attackState}`}>
          <h2>🔥 {boss.name} 🔥</h2>
          <div className="image-content">
            <img src={boss.imageURI} alt={`Boss ${boss.name}`} />
            <div className="health-bar">
              <progress value={boss.hp} max={boss.maxHp} />
              <p>{`${boss.hp} / ${boss.maxHp} HP`}</p>
            </div>
          </div>
        </div>
        <div className="attack-container">
          <button className="cta-button" onClick={runAttackAction}>
            {`💥 Attack ${boss.name}`}
          </button>
        </div>
        {/* Add this right under your attack button */}
        {attackState === 'attacking' && (
        <div className="loading-indicator">
          <LoadingIndicator />
          <p>Attacking ⚔️</p>
        </div>
      )}
      </div>
    )}
    
    {/* Replace your Character UI with this */}
    {characterNFT && (
      <div className="players-container">
        <div className="player-container">
          <h2>Your Character</h2>
          <div className="player">
            <div className="image-content">
              <h2>{characterNFT.name}</h2>
              <img
                src={characterNFT.imageURI}
                alt={`Character ${characterNFT.name}`}
              />
              <div className="health-bar">
                <progress value={characterNFT.hp} max={characterNFT.maxHp} />
                <p>{`${characterNFT.hp} / ${characterNFT.maxHp} HP`}</p>
              </div>
            </div>
            <div className="stats">
              <h4>{`⚔️ Attack Damage: ${characterNFT.attackDamage}`}</h4>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
      );
};
export default Arena;