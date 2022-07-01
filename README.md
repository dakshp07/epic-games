# Epic Game
In our last [repo](https://github.com/dakshp07/epic-DAO) we learnt how to create a DAO on your own and how to use governance tokens and NFTs for voting purposes. Now we will be stepping into the world of games with NFTs where a user has to play games with their character being an NFT which has unique powers, unique traits etc etc.

# Gaming and Crypto
It's worth briefly talking about why gaming + crypto is so interesting. I feel like when most people talk about this topic they throw out really big numbers like, "Blah game did $1.2 billion in revenue this quarter" or something like that. But, it's more than that! It helps to explain why this stuff is cool.

For example, Axie Infinity is an NFT-based game that has done [$2.6 billion dollars](https://dappradar.com/ethereum/games/axie-infinity?utm_source=buildspace.so&utm_medium=buildspace_project) in NFT trades so far. But... what the f does that even mean?! lol.

Why are people losing their minds over things like this?

<img src="https://i.imgur.com/wkPSIjR.png">

**Note: this is an "Axie" NFT — which is the character you play as in Axie Infinity! Players buy Axie NFTs first, and then go play the game. Pretty weird, right? Buying the characters before you even play the game!**

# An Example with Nintendo
**Let's say you're Nintendo** and you made Super Mario Bros. Mario is now **your** IP. **You're** the creator. No one is allowed to create more games with Mario except **you**. You also want to control who makes % from your characters/universe.

Let's imagine a world instead, where we bring NFTs into the mix.

Let's say Nintendo comes out and says "Hey players! Here are 1,000,000 Mario NFTs. Go buy one for $10. We (Nintendo) are going to be making games that require players to own the Mario NFT in their crypto wallet to play them."

For example, players would be able to take their Mario NFT to play as Mario in Super Smash Bros, then maybe they could take their Mario NFT to play Super Mario Galaxy, etc.

The most important thing here is that the Mario NFTs smart contract code would have something special implemented by Nintendo around **royalties**.

For example, players would be able to sell their Mario NFTs on a marketplace.

In this case, Nintendo could say: "every time this NFT sells, we take 10% of whatever it sells for" and they can code that into the NFT contract itself. That means the original creators (Nintendo) can always get in on the profits in a variety of ways that don't require trusting anyone other than the blockchain.

That means as Mario rises in popularity, the NFT needed to play Mario games also rise in value. Nintendo could sell more Mario NFTs as well once the original 1,000,000 are gone. Up to them!

Coolest part? **Players retain a ton of the value**. Players can always hold/sell the original NFTs that would increase in value as the games/characters get more popular. It incentivizes players to help make the game huge as well. Everyone wins :).

**This may sounds crazy but this is pretty much exactly how Axie Infinity works. It's doing billions of dollars in revenue every year**. You can buy some Axie NFTs [here](https://marketplace.axieinfinity.com/?__cf_chl_jschl_tk__=pmd_ybIeMQm0TAMzOvPj1DcoPlIZeWIcL5r4nwefM60mDTM-1634675045-0-gqNtZGzNAjujcnBszQoR?utm_source=buildspace.so&utm_medium=buildspace_project) and start playing. As the Axie universe grows more popular, the NFTs increase in value as well!


## Issue: Inflation 
You'll notice the Axies cost like [$300+](https://marketplace.axieinfinity.com/?__cf_chl_jschl_tk__=pmd_ybIeMQm0TAMzOvPj1DcoPlIZeWIcL5r4nwefM60mDTM-1634675045-0-gqNtZGzNAjujcnBszQoR?utm_source=buildspace.so&utm_medium=buildspace_project)!!! That's insane and a major turn off for new players. You need three of them to even start playing, so, thats $1K right there.

This is basically caused by inflation in the marketplace. Only a certain # of Axies are being created today but the player base is growing far faster. The result? Crazy prices. There are solutions here that are being explored, but this is definitely a concern when it comes to NFT games. From the official Axie [whitepaper](https://whitepaper.axieinfinity.com/gameplay/axie-population-and-long-term-sustainability?utm_source=buildspace.so&utm_medium=buildspace_project):

```
"Axie population growth is a major factor within the Axie ecosystem. At any given moment, there exists some ideal inflation rate that allows us to grow to our maximum potential. Too slow and Axie prices are too high for everyday people to join; especially competitive Axies. Too fast and you get unhealthy inflation."
```

## Bulding open games
I want to go over another benefit. Easily making games and universes that anyone else can build on via NFTs.

Imagine trying to get a deal with Nintendo to make a game with Mario in it. It would be near impossible unless you were a massive gaming company!! Nintendo would want to do a ton of paperwork detailing how royalties would work.

**But, a cool aspect of NFT games is that anyone would be able to build on top of the Mario NFTs and the original creators can retain value.**

For example, random game devs would be able to make games that required players to **connect their wallet and verify they have the Mario NFT**. If they did, then the game would start and the player's game would be able to access various Mario assets! But, what's in it for Nintendo? Well, as these games made by random devs get more popular it means the original Mario NFTs would rise in value which is good for Nintendo. Let's say you think all this stuff around "selling the NFT" is nonsense.

Well, Nintendo could even code the Mario NFT to say, "every time the Mario NFT is used in a new game, ask player to pay $10 from their Ethereum wallet."

$5 would go right to Nintendo's wallet. $5 would go right to the dev's wallet.

The possibilities are literally endless because we can program the royalty system to work however we want.

# Get local env up
et's head to the terminal. Go ahead and `cd` to the directory you want to work in. Once you're there run these commands:

``` shell
mkdir epic-game
cd epic-game
npm init -y
npm install --save-dev hardhat
```
Cool, now we should have hardhat. Let's get a sample project going.
```
npx hardhat
```
You'll also want to install something called **OpenZeppelin** which is another library that's used a lot to develop secure smart contracts. We'll learn more about it later. For now, just install it :).

```
npm install @openzeppelin/contracts
```

Then run:
```
npx hardhat run scripts/sample-script.js
```

# Setup data for character NFTs.
## How we're going to use playable NFTs
We already know what is an NFT. The goal of our game will be to destroy a boss. Let's say that boss has 1,000,000 HP. What players do is when they start the game, they mint a **character NFT** that has a certain amount of **Attack Damage** and **HP**. Players can order their **character NFT** to attack the boss and deal damage to it. Kinda like a Pokemon!

The goal? Players need to work together to attack the boss and bring its HP down to 0. The catch? Every time a player hit the boss, the boss hits the player back! If the NFT's HP goes below 0, the player's NFT **dies** and they can't hit the boss anymore. Players **can only have one character NFT in their wallet**. Once the character's NFT dies, it's game over. That means many players need to join forces to attack the boss and kill it.

**Note: If you want your player to be able to hold multiple character in their wallet (like Pokemon) feel free to make the modifications on your own!**

The important thing to know here is that the characters themselves are **NFTs**.

So, when a player goes to play the game:

- They'll connect their wallet.
- Our game will detect they don't have a character NFT in their wallet.
- We'll let them choose a character and mint their own character NFT to play the game. Each character NFT has its own attributes stored on the NFT directly like: HP, Attack Damage, the image of the character, etc. So, when the character's HP hits 0, it would say hp: 0 on the NFT itself.

**This is exactly how the world's most popular NFT games work :)**. We're going to build it ourselves! What we need to do first is basically set up our minting NFT code because, without that, players can't even get into our game to play!

## Setup the data for your NFTs
Time for the fun part, setting up our character NFTs. Each character will have a few attributes: an image, a name, HP value, and attack damage value. **These attributes will live directly on the NFT itself**. We may add some more attributes later on.

The way our character NFTs will work is there will only be a set # of characters (ex. 3). **But, an unlimited # of NFTs of each character can be minted**. Again, you can change this if you want — for example if you want only a small # of a certain character to be minted.

So that means if five people mint character #1, that means all five people will have the exact same character but each person will have a unique NFT and **each NFT holds its own state**. For example, if Player #245's NFT gets hit and loses HP, only their NFT should lose HP!

If that doesn't make sense, don't worry! Let's just jump in the code — it'll slowly make more sense.

The first thing we need to do is actually have a way to initialize a character's **default attributes** (ex. their default HP, default attack damage, default image, etc). For example, if we have a character named "Pikachu", then we need to set Pikachu's base HP, base attack damage, etc.

**Check comments in `MyEpicGame.sol`!!!**

Next in `run.js` I will define my characters and their attributes

**Check comments in `run.js`!!!**

**don't copy my characters. Come up with you own before moving on.**

Maybe your characters can be from your fav anime or video game.

Maybe you don't even want characters. Maybe instead you want people to mint **"weapons"** that players using in the game like a **sword, machine gun, or a laser cannon**.

Maybe you want your characters to have things like "mana", "energy", or "chakra" where your character can cast certain "spells" using these attributes.

**Customize your characters. It's what makes this fun + your own**. For example, I added Leonardo DiCaprio and Pikachu as characters because I thought it'd be funny as hell lol — and I chuckle every time I see it haha.

Changing around little things like the character will make you feel more like it's your own thing and you'll be a little more motivated to build this thing all the way :).

# Actually mint your NFTs locally.
## Mint the NFTs
Now that we have all the data nicely set up for our characters, the next thing to do is actually mint the NFT. Let's go through that process.

**Check comments in `MyEpicGame.sol`!!!**

Remember, every player has their own character NFT. And, every single NFT has their own state like `HP`, `Attack Damage`, etc! So if Player #172 owns a "Pikachu" NFT and their Pikachu NFT loses health in a battle **then only Player 172's Pikachu NFT should be changed** everyone else's Pikachu should stay the same! So, we store this player character level data in a map.

Next, I have `nftHolders` which basically lets me easily map the address of a user to the ID of the NFT they own. For example, I would be able to do `nftHolders[INSERT_PUBLIC_ADDRESS_HERE]` and instantly know what NFT that address owns. It's just helpful to keep this data on the contract so it's easily accessible.

We have also inhertied `ERC721` from OpenZepplin. The NFT standard is known as `ERC721` which you can read a bit about [here](https://eips.ethereum.org/EIPS/eip-721?utm_source=buildspace.so&utm_medium=buildspace_project). OpenZeppelin essentially implements the NFT standard for us and then lets us write our own logic on top of it to customize it. That means we don't need to write boilerplate code.

## Holding dynamic data on an NFT
So, as players play the game, certain values on their character will change, right? For example, If I have my character attack the boss, the boss will hit back! **In that case, my NFT's HP would need to go down**. We need a way to store this data per player:

``` js
nftHolderAttributes[newItemId] = CharacterAttributes({
  characterIndex: _characterIndex,
  name: defaultCharacters[_characterIndex].name,
  imageURI: defaultCharacters[_characterIndex].imageURI,
  hp: defaultCharacters[_characterIndex].hp,
  maxHp:defaultCharacters[_characterIndex].maxHp,
  attackDamage: defaultCharacters[_characterIndex].attackDamage
});
```

A lot happening here! Basically, **our NFT holds data related to our player's NFT. But, this data is dynamic. For example**, let's say I create an NFT. By default my NFT starts with default stats like:

``` json
{
  characterIndex: 1,
  name: "Aang",
  imageURI: "https://i.imgur.com/xVu4vFL.png",
  hp: 200,
  maxHp: 200,
  attackDamage: 50
} 
```

**Remember, every player has their own character NFT and the NFT itself holds data on the state of the character.**

Let's say my character is attacked and loses 50 HP, well then HP would go from 200 → 150, right? That value would need to change on the NFT!

Or maybe we want our game to have **upgradeable** characters, where you can give your character a sword and add +10 attack damage from 50 → 60. Then, `attackDamage` would need to change on the NFT!

People often think that NFTs metadata isn't allowed to change, but, that's not true. It's actually up to the creator!!!

In this case, our character name and character image **never** change, but it's HP value definitely does! **Our NFTs** must be able to maintain the state of our specific player's character.

## Running Locally
We run using `run.js` to test locally.

**Check comments in `run.js`!!!**

**`nftHolderAttributes` hasn't actually attached to our NFT in any way. It's just a mapping that lives on the contract right now. What we're going to do next is basically attach `nftHolderAttributes` to the `tokenURI` by overriding it :).**

## Setup tokenURI
The `tokenURI` actually has a specific format! It's actually expecting the NFT data in JSON.

Let's go over how to do this :).

Create a new folder under `contracts` called `libraries`. We will use Base64 from OpenZepplin. This basically provides us with some helper functions to let us encode any data into a Base64 string — which is a standard way to encode some piece of data into a string. Don't worry, you'll see how it works in a bit!

We'll need to import that library into our contract. For that, add the following snippet near the top of your file, with the other imports.

**Check comments in `MyEpicGame.sol`!!!**

# Deploy to Rinkeby, see on OpenSea.
## Getting our NFTs online
When we use `run.js`, it's just us working locally.

The next step is a testnet which you can think of as like a "staging" environment. When we deploy to a testnet we'll actually be able to to `view our NFT online` and we are a step closer to getting this to `real users`.

## Setup a deploy.js file
It's good practice to separate your deploy script from your `run.js` script. `run.js` is where we mess around a lot, we want to keep it separate. Go ahead and create a file named `deploy.js` under the `scripts` folder. Copy-paste all of `run.js` into `deploy.js`. It's going to be exactly the same right now.

I added a few extra calls to `mintCharacterNFT` as well just to test stuff out!

**Check comments in `deploy.js`!!!**

## Deploy to Rinkeby testnet
We'll need to change our `hardhat.config.js` file. You can find this in the root directory of your smart contract project.

``` js
require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    rinkeby: {
      url: 'YOUR ALCHEMY_API_URL',
      accounts: ['YOUR_PRIVATE_RINKEBY_ACCOUNT_KEY'],
    },
  },
};
```

You can grab your API URL from the Alchemy dashboard and paste that in. Then, you'll need your **private** rinkeby key (not your public address!) which you can grab from metamask and paste that in there as well.

Run this command from the root directory of `epic-game`.

```
npx hardhat run scripts/deploy.js --network rinkeby
```

Check out your contract on Etherscan and OpenSea.

Here's my contract on Rinkeby Testnet: https://rinkeby.etherscan.io/address/0xcd22a5Ee85ACa288cc59504fe4c623a833dcaEf9

Here's my NFT Collection on OpenSea: https://testnets.opensea.io/collection/heroes-foeitungc0

## Why is this epic?
It’s worth talking about why what you just did is a big deal.

Basically, you made an NFT. So, that’s already cool. People can own a character from your game in their wallet, yay!

But, these NFTs actually have attributes as well! Like attack damage, health, mana, or whatever else you added. So, that means the NFT itself is more than just a JPG — it has other elements that make it more interactive.

The biggest NFT game in the world, Axie Infinity, functions just like this as well. It's a turn-based, Pokemon style game where you fight against other players 1v1.

<img src="https://i.imgur.com/xCXnwtz.png">

**Check out all the different attributes it has on properties, levels, etc**. Get inspired :). All these attributes they have actually affect how this character actually plays in the game itself!

What we’re going to do next is we’re going to actually program in logic to our NFT to “fight” a “boss” in our game. So, that means players will be able to take their NFT to the arena and collaborate with other players to “attack” a big boss you’ll create! When an NFT attacks this boss, the boss can attack the NFT back and the player's NFT will lose health. The HP value on OpenSea would change :).

Sorta like Pokemon!

That means our NFT will have utility outside of just being cool to look at.

This is pretty awesome. In normal games today, you’d buy a game and then pick your character (ex. like in Super Smash Brothers).

**In this case, players pick their character NFT, then can play their NFT in-game, and own that character in their wallet forever or until they want to sell it to another player**. The selling aspect is extremely interesting, because it means as the player you get something back for playing the game or helping it increase in popularity.

Another interesting thing is that players would be able to take their character NFT to other games that support it.

This is a pretty wild thing to think about. It’s one of the biggest reasons crypto + gaming is so cool.

Remember that Mario NFT example earlier, where others could build on top of Mario? Same deal here with our character NFTs!

For example, let’s say I have 100,000 people mint my “Pikachu” NFT for my game. Now, there are 100,000 unique players who own this NFT.

Another developer could come in and build another game on top of the Pikachu NFT and allow any player who has the NFT to enter their game and play it! They could make it where anyone w/ the Pikachu NFT would be able to play as Pikachu in their game. It’s totally up to them.

Note: In this case, the Pokemon creators might get mad lol. But, imagine Pikachu was your own original character!

Maybe stuff like HP and attack damage is even shared between games, meaning different games could build on top of the original attributes we created.

For example, let’s say we have other devs start building “items” on top of our NFT characters — like swords, shields, potions, etc. Maybe a dev builds something where an NFT character could “equip” a shield in and gain +50 defense. This can all be done in an open, permission-less way :).

On top of that, as the creator of the original Pikachu NFTs — I can charge a royalty fee every time someone buys/sells the original NFTs and that means as my NFTs gain popularity I would make money on every sale.

Okay — lets get to actually programming our game logic now :).

# Build boss + attack logic.
## Building our boss
So, in our game our character NFT will be able to attack a boss.

The whole goal of the game is to attack the boss and bring its HP to 0! But, the catch is that the boss has a lot of HP and every time we hit the boss it will hit us back and bring our HP down. If our character's HP falls below 0, then our character will no longer be able to hit the boss and it'll be “dead”.

Maybe in the future, someone else would be able to build a “revive” function that allows our dead NFTs to regain 100% health points ;). But for now, if our character dies it’s game over. And we can rest easy knowing our character did its best and took one for the team. That means we need other players to attack the boss as well, we can't do this alone.

Let’s first just build a basic boss struct and initialize its data, similar to how we did for our characters. The boss will basically have a name, an image, attack damage, and HP. The boss will not be an NFT. The boss’s data will just live on our smart contract.

We can add the following code right under where we declared `nftHolderAttributes`.

**Check comments in `MyEpicGame.sol`!!!**

**We made good amount functions like attack boss where the player attacks boss and boss attacks the player back, we also coded some more function to get the reterival of all data from the contract and display it in frontend.**

# Getting the frontend
Now that we have access to a wallet address we can start minting character NFTs from our contract!

This section is going to help you understand how we will be rendering each state of our app. Why don't we just break down the logic real quick:

- Scenario #1: If user has not connected to your app - Show Connect To Wallet Button
- Scenario #2: If user has connected to your app AND does not have a character NFT - Show SelectCharacter Component
- Scenario #3: If user has connected to your app AND does have a character NFT - Show Arena Component. The Arena is where users will be able to attack our boss!

Nice. So it looks like we have three different views we need to create! We are going to be getting into some pretty cool React.js that may be new to you. If you don't fully understand it - don't worry! Remember, Google is your friend :).

## Getting started with React.js
Now this is where the fun REALLY starts. Writing and deploying your smart contract is one thing, but building a portal where anyone in the world can interact with the blockchain is just pure magic ✨.

We are going to be using react.js to build our web app. If you are already familiar with React, this will be a breeze. If you haven't done much React, don't worry! You can still make it through this project, but it may feel a bit more difficult. Don't give up! The more you struggle the more you learn 🧠.

Create a basic react app and then we start coding.

# Building a connect to wallet button.
We will be doing this in the same manner as we have done in all the other projects.

**Check comments in `app.js`!!!**

## Setting up the SelectCharacter Component
Let's start off with creating our `SelectCharacter` Component! Head to the `src/Components/SelectCharacter` folder and create a new file named `index.js`. This directory will hold the core logic for our `SelectCharacter` component as well as it's styling! You should already see a `SelectCharacter.css` file in there with a bunch of styling!

Oh, one thing to note - you probably see the `LoadingIndicator` component in the Components folder. Don't worry about that just yet, we will get to it later 🤘.

Go ahead and add the following code to the index.js.

**Check comments in `src/Components/SelectCharacter/index.js`!!!**

## Showing the SelectCharacter Component
We are going to need to go back to the `App.j`s file and import our newly created component. Right under where you import your `App.css` file add this line:
``` js
import SelectCharacter from './Components/SelectCharacter';
```

You now have access to your new component! We need to add just a tad bit of fanciness here to get our component to render, though.

**Check comments in `app.js`!!!**

# Checking for a Character NFT.
The cool part about our game? We mint actual NFTs that are used to play and all the game logic happens on-chain. Earlier in this project, we set up all of our smart contract logic. Now it's time to actually interact with it.

## The flow
The first thing we are going to start with is to check whether the wallet address connected to our app has a character NFT already. If it does, we can go ahead and grab the metadata from the wallet's NFT and use it to battle a boss in the metaverse ⚔️.

Here's the flow of getting our web app connected to our deployed smart contract on the Rinkeby Testnet:

- Copy latest deployed contract address, paste it in to our web app.
- Copy the latest ABI file, paste it into our web app's directory. (Later, we will delve more into what an ABI is).
- Import ethers.js to help us talk to our smart contract from the client.
- Call a function on our contract to make it do something!

Pretty straight forward, right? Let's dive in!

## Get smart contract address
We are going to be using this address in multiple components, so, let's make it ezpz to get to! At the root of your project under `src` go ahead and create a `constants.js` file and add the following code:

```js
const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS_GOES_HERE';
export { CONTRACT_ADDRESS };
```

Then head back to your `App.js` file and import this at the top of your file to get access to it, like so:
```js
import { CONTRACT_ADDRESS } from './constants';
```
We get the abi from the artifacts folder as we did before in other projects.

## ome notes on updating your Smart Contract.
Deployed contracts are permanent. You can't change them. The only way to update a contract is to actually re-deploy it.

Let's say you wanted to randomly change your contract right now. Here's what we'd need to do:

- Deploy it again.

- Update the contract address on our frontend (copy/paste from console log).

- Update the abi file on our frontend (copy/paste from `artifacts` folder).

**People constantly forget to do these 3 steps when they change their contract. Don't forget lol.**

Why do we need to do all this? Because smart contracts are **immutable**. They can't change. They're permanent. That means changing a contract requires a full redeploy. Redeploying will also reset all the variables since it'd be treated as a brand new contract. **That means we lose all our NFT data when we update the contract's code.**

So, what you'll need to do is:

- Deploy again using npx hardhat run `scripts/deploy.js --network rinkeby`

- Change `contractAddress` in `constants.js` to be the new contract address we got from the step above in the terminal (just like we did before the first time we deployed).

Get the updated abi file from `artifacts` and copy-paste it into your web app just like we did above.

**Again -- you need to do this every time you change your contract's code or else you'll get errors :).**

# Building the Character Select page.
We setup a resuable contract obj in `src/Components/SelectCharacter/index.js` to get the rendering of all available characters on the frontend.

**Check comments in `src/Components/SelectCharacter/index.js`!!!**

# Building the Arena page.

At this point, we have been introduced to pretty much everything we need to know to build our React app. Let's jump right into setting up our `Arena` Component:

Just like with the `SelectCharacter` Component, let's create a new file in the `Components/Arena` folder called `index.js`. Again, you should already see an `Arena.css` file in this folder! Once you setup your base don't forget to get fancy with your styling 💅.

**Check comments in `src/Components/Arena/index.js`!!!**

# Finishing touches on the UI.
## Finishing touches on the UI
You've probably noticed quite a few spots where it wasn't indicated to the user that something was happening - when you did things like minted a character NFT or fetched big boss data. I wanted to go through and show you the loading indicators I thought could be cool to add!

We are going to setup a few loading indicators:

- `App.js` - Waiting to see if the user has a minted NFT
- `SelectCharacter` Component - Waiting for our character NFT to mint
- `Arena Component` - Waiting for an attack action to finish

Remember that one `LoadingIndicator` component that was given to you? We are finally going to be able to use it!

Just like with the `SelectCharacter` Component, let's create a new file in the `Components/LoadingIndicator` folder called `index.js`. Again, you should already see an `LoadingIndicator.css` file in this folder! Once you setup your base don't forget to get fancy with your styling 💅.

**Check comments in `src/Components/LoadingIndicator/index.js`!!!**

# Images
<img src="https://i.imgur.com/18uKuco.png">

<img src="https://i.imgur.com/7G8nNsR.png">

<img src="https://i.imgur.com/nzyX34O.png">

<img src="https://i.imgur.com/Jdlffzr.png">

<img src="https://i.imgur.com/Xbu7rDq.png">

<img src="https://i.imgur.com/Iq0ULbi.png">

<img src="https://i.imgur.com/p3Pu3VY.png">

Contract link on Etherscan deployed on Rinkeby Testnet: https://rinkeby.etherscan.io/address/0xcd22a5Ee85ACa288cc59504fe4c623a833dcaEf9

NFT Collection on OpenSea: https://testnets.opensea.io/collection/heroes-foeitungc0
