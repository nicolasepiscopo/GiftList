const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

const NAME = process.argv[2];

async function main() {
  const tree = new MerkleTree(niceList);
  const targetIndex = niceList.indexOf(NAME);
  const proof = tree.getProof(targetIndex);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name: NAME,
    proof,
  });

  console.log({ gift });
}

main();