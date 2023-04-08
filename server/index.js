const express = require('express');
const MerkleTree = require('../utils/MerkleTree');
const verifyProof = require('../utils/verifyProof');
const niceList = require('../utils/niceList.json');

const port = 1225;

const app = express();
app.use(express.json());

const merkleTree = new MerkleTree(niceList);
const root = merkleTree.getRoot();

app.post('/gift', (req, res) => {
  const { name, proof } = req.body;

  const isInTheList = verifyProof(proof, name, root);

  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
