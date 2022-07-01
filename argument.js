// file for verifying contract on etherscan, since our contract requires some constructors we declare our construtors here
// and then run this command: npx hardhat verify --constructor-args argument.js CONTRACT_ADDRESS --network rinkeby
module.exports=[
    ["Erwin", "Armin", "Eren", "Levi", "Connie"], // names
    ["https://i.imgur.com/jfhF002.gif", "https://i.imgur.com/2ewbUNs.gif", "https://i.imgur.com/le5ob6m.gif", "https://i.imgur.com/uqQHiOG.gif", "https://i.imgur.com/xKH14Ii.gif"], // Images
    [1000, 2000, 3000, 4000, 8000], // HP values
    [500, 600, 700, 800, 1000], // Attack damage values
        // lets declare our boss now
    "Beast Titan",
    "https://c.tenor.com/t9sl-qJPgAYAAAAC/beast-titan-zeke-yeager.gif",
    10000, // HP values
    400 // Attack damage values
];