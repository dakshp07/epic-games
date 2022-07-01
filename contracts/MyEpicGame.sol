// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// now for NFT lets import ERC721 contract of open zepplin
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// Helper functions OpenZeppelin provides.
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
// here we will use OpenZeppelin Contracts to make our json metadata (containing svg) into base64
import "@openzeppelin/contracts/utils/Base64.sol";
// import hadrdhat console sol to log the output
import "hardhat/console.sol";

// Our contract inherits from ERC721, which is the standard NFT contract!
contract MyEpicGame is ERC721{
    // no we will create some attributes for each characters which lives with the NFTs
    // the attributes will be HP, max HP, attack damage etc 

    // we need to create tokenid which will identify each NFT as unique
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // We'll hold our character's attributes in a struct. Feel free to add
    // whatever you'd like as an attribute! (ex. defense, crit chance, etc).
    struct CharacterAttributes{
        uint characterIndex;
        string name;
        string imageURI;
        uint hp;
        uint maxHp;
        uint attackDamage;
    }
    // lets create a struct for our boss
    struct BigBoss{
        string name;
        string imageURI;
        uint hp;
        uint maxHp;
        uint attackDamage;
    }
    // we just have one boss (atleast in this game)
    BigBoss public bigBoss;

    // A lil array to help us hold the default data for our characters.
    // This will be helpful when we mint new characters and need to know
    // things like their HP, AD, etc.
    CharacterAttributes[] defaultCharacters;

    // we will create a mapping from nft token ids to nft character attributes
    mapping(uint256=>CharacterAttributes) public nftHolderAttributes;

    // we wil create another mapping from address to token ids of their holders
    mapping(address=>uint256) public nftHolders;

    // our events that can be used to display messages in frontend
    event CharacterNFTMinted(address sender, uint256 tokenId, uint256 characterIndex);
    event AttackComplete(address sender, uint newBossHp, uint newPlayerHp);

    // Data passed in to the contract when it's first created initializing the characters.
    // We're going to actually pass these values in from run.js.
    constructor(
        string[] memory characterNames,
        string[] memory characterImageURIs,
        uint[] memory characterHp,
        uint[] memory characterAttackDmg,
        // we will also add our boss attrbutes
        string memory bossName,
        string memory bossImageURI,
        uint bossHp,
        uint bossAttackDamage
        // we will now add some special identifier for our nft like $BAYC is for bored ape nfts
    )
    ERC721("Heroes", "HERO")
    {
        // Initialize the boss. Save it to our global "bigBoss" state variable.
        bigBoss = BigBoss({
            name: bossName,
            imageURI: bossImageURI,
            hp: bossHp,
            maxHp: bossHp,
            attackDamage: bossAttackDamage
        });
        console.log("Done initializing boss %s w/ HP %s, img %s", bigBoss.name, bigBoss.hp, bigBoss.imageURI);
        // Loop through all the characters, and save their values in our contract so
        // we can use them later when we mint our NFTs.
        for(uint i=0; i<characterNames.length; i++)
        {
            defaultCharacters.push(CharacterAttributes({
                characterIndex: i,
                name: characterNames[i],
                imageURI: characterImageURIs[i],
                hp: characterHp[i],
                maxHp: characterHp[i],
                attackDamage: characterAttackDmg[i]
            }));
            CharacterAttributes memory c=defaultCharacters[i];
            console.log("Done initializing %s w/ HP %s, img %s", c.name, c.hp, c.imageURI);
        }
        // In the constructor I increment token id to 1. Why? 
        // Basically because I don't like dealing w/ 0s in my code. In Solidity, 0 is a default value and I try to stay away from default values. 
        // Just trust me on it for now.
        // increment the tokenids
        _tokenIds.increment();
    }
    // now we will create the mint function for users to mint the nfts
    function mintCharacterNFT(uint _characterIndex) external {
        // get the current token id
        uint256 newId=_tokenIds.current();
        // now we will call the safe mint function provided to us by open zeplin contract for ERC721
        _safeMint(msg.sender, newId);
        // we will now map this tokenId with the our character attributes
        nftHolderAttributes[newId]=CharacterAttributes({
            characterIndex: _characterIndex,
            name: defaultCharacters[_characterIndex].name,
            imageURI: defaultCharacters[_characterIndex].imageURI,
            hp: defaultCharacters[_characterIndex].hp,
            maxHp: defaultCharacters[_characterIndex].maxHp,
            attackDamage: defaultCharacters[_characterIndex].attackDamage
        });
        console.log("Minted NFT w/ tokenId %s and characterIndex %s", newId, _characterIndex);
        // now lets update nft holder for this address as well
        nftHolders[msg.sender]=newId;
        // increment tokenId
        _tokenIds.increment();
        // emit event
        emit CharacterNFTMinted(msg.sender, newId, _characterIndex);
    }

    // nftHolderAttributes hasn't actually attached to our NFT in any way. 
    // It's just a mapping that lives on the contract right now. 
    // What we're going to do next is basically attach nftHolderAttributes to the tokenURI by overriding it :).
    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        CharacterAttributes memory charAttributes = nftHolderAttributes[_tokenId];
        string memory strHp = Strings.toString(charAttributes.hp);
        string memory strMaxHp = Strings.toString(charAttributes.maxHp);
        string memory strAttackDamage = Strings.toString(charAttributes.attackDamage);

        string memory json = Base64.encode(
            abi.encodePacked(
                '{"name": "',
                charAttributes.name,
                ' -- NFT #: ',
                Strings.toString(_tokenId),
                '", "description": "This is an NFT that lets people play in the game Metaverse Slayer!", "image": "',
                charAttributes.imageURI,
                '", "attributes": [ { "trait_type": "Health Points", "value": ',strHp,', "max_value":',strMaxHp,'}, { "trait_type": "Attack Damage", "value": ',
                strAttackDamage,'} ]}'
            )
        );
        string memory output = string(
            abi.encodePacked("data:application/json;base64,", json)
        );
        return output;
    }
    // boss attack function
    function attackBoss() public {
        // Get the state of the player's NFT.
        // Make sure the player has more than 0 HP.
        // Make sure the boss has more than 0 HP.
        // Allow player to attack boss.
        // Allow boss to attack player.

        // in order to get state of player's nft we need the player's nft id
        uint256 nftTokenIdOfPlayer=nftHolders[msg.sender];
        CharacterAttributes storage player=nftHolderAttributes[nftTokenIdOfPlayer]; // getting the state values
        console.log("\nPlayer w/ character %s about to attack. Has %s HP and %s AD", player.name, player.hp, player.attackDamage);
        console.log("Boss %s has %s HP and %s AD", bigBoss.name, bigBoss.hp, bigBoss.attackDamage);

        // now we need the checks
        require(player.hp>0, "Error: character must have HP to attack boss.");
        require(bigBoss.hp>0, "Error: boss must have HP to attack character.");

        // allow player to attack boss
        if(bigBoss.hp<player.attackDamage)
        {
            bigBoss.hp=0;
        }
        else
        {
            bigBoss.hp=bigBoss.hp-player.attackDamage;
        }

        // allow boss to attack player
        if (player.hp < bigBoss.attackDamage) 
        {
            player.hp = 0;
        } 
        else 
        {
            player.hp = player.hp - bigBoss.attackDamage;
        }
        // Console for ease.
        console.log("Player attacked boss. New boss hp: %s", bigBoss.hp);
        console.log("Boss attacked player. New player hp: %s\n", player.hp);

        // emit event
        emit AttackComplete(msg.sender, bigBoss.hp, player.hp);
    }
    // now lets write a function to check if user has an nft already
    // if yes then we return the nft values ie hp, ad etc
    function checkIfUserHasNFT() public view returns(CharacterAttributes memory)
    {
        // get the token id of the user
        uint256 userNftTokenId=nftHolders[msg.sender];
        // check if this token id exists in our mappings
        if(userNftTokenId>0)
        // Why do we do userNftTokenId > 0? 
        // Well, basically there's no way to check if a key in a map exists. 
        // We set up our map like this: mapping(address => uint256) public nftHolders. 
        // No matter what key we look for, there will be a default value of 0.
        {
            return nftHolderAttributes[userNftTokenId];
        }
        else
        {
            CharacterAttributes memory emptyStruct;
            return emptyStruct;
        }
    }
    // since we have multiple heroes, we let users decide which one to choose
    function getAllDefaultCharacters() public view returns(CharacterAttributes[] memory)
    {
        return defaultCharacters;
    }
    // get the details of boss as well
    function getBigBoss() public view returns(BigBoss memory)
    {
        return bigBoss;
    }
    // You may be asking yourself, "Why are we building functions to get single variables? Can't we somehow access these variables directly from the contract?". 
    // Yes, you can! But, it's just best practice to create get functions :). 
    // Makes everything nice and organized.
}