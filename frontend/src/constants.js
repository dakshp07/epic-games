const CONTRACT_ADDRESS="0xcd22a5Ee85ACa288cc59504fe4c623a833dcaEf9";
// This puts the data from our smart contract into a nice object that we can easily use in our UI code!
const transformCharacterData = (characterData) => {
    return {
      name: characterData.name,
      imageURI: characterData.imageURI,
      hp: characterData.hp.toNumber(),
      maxHp: characterData.maxHp.toNumber(),
      attackDamage: characterData.attackDamage.toNumber(),
    };
  };
export {CONTRACT_ADDRESS, transformCharacterData};