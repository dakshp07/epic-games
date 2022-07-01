// this script is basically going to deploy our contract on an local blockchain created specifically for the time being
const main=async()=>{
    const gameContractFactory=await hre.ethers.getContractFactory("MyEpicGame"); // contract name should be called
    const gameContract=await gameContractFactory.deploy(
        ["Erwin", "Armin", "Eren", "Levi", "Connie"], // names
        ["https://i.imgur.com/jfhF002.gif", "https://i.imgur.com/2ewbUNs.gif", "https://i.imgur.com/le5ob6m.gif", "https://i.imgur.com/uqQHiOG.gif", "https://i.imgur.com/xKH14Ii.gif"], // Images
        [1000, 2000, 3000, 4000, 8000], // HP values
        [500, 600, 700, 800, 1000], // Attack damage values
        // lets declare our boss now
        "Beast Titan",
        "https://c.tenor.com/t9sl-qJPgAYAAAAC/beast-titan-zeke-yeager.gif",
        10000, // HP values
        400 // Attack damage values
    ); // deploy the contract
    await gameContract.deployed(); // wait till the contract is deployed
    // Our constructor runs when we actually are fully deployed!
    console.log("contract deployed at: ", gameContract.address); // log the address

    // now lets talk to the mint function in our contract
    let txn; // declaring our variable
    // We only have three characters.
    // an NFT w/ the character at index 0 of our array.
    txn = await gameContract.mintCharacterNFT(0);
    await txn.wait();
    console.log("Minted NFT #1");

    txn = await gameContract.mintCharacterNFT(1);
    await txn.wait();
    console.log("Minted NFT #2");

    txn = await gameContract.mintCharacterNFT(2);
    await txn.wait();
    console.log("Minted NFT #3");

    // mint boss
    txn = await gameContract.attackBoss();
    await txn.wait();

    txn = await gameContract.attackBoss();
    await txn.wait();

  console.log("Done deploying and minting!");
    // get the value of nft's URI
    // asically, tokenUri is a function on every NFT that returns the actual data attached to the NFT. 
    // So when I call gameContract.tokenURI(1) it's basically saying, "go get me the data inside the NFT with tokenId 1", which would be the first NFT minted.
    // let returnedTokenURI=await gameContract.tokenURI(1);
    // console.log("Token URI:", returnedTokenURI);
};

const runMain=async()=>{
    try{
        await main();
        process.exit(0);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
};

runMain();