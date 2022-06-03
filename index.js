const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const { MongoClient } = require("mongodb");
const uri = "mongodb://Supattra:testwork@localhost:27017";

// Add data to mangodb
app.post('/drugs/create', async(req, res) => {
  const drug = req.body;
  const client = new MongoClient(uri);
  await client.connect();
  await client.db('druginfromation').collection('drug').insertOne({
    id: parseInt(drug.id),
    drugcode: parseInt(drug.drugcode),
    drugname: drug.drugname,
    lotno: drug.lotno,
    max: drug.max,
    min: drug.min
  });
  await client.close();
  res.status(200).send({
    "status": "ok",
    "message": "Add drug code : = "+drug.drugcode+" is created",
    "drugname": drug.drugname
  });
})

// Select data
app.get('/drugs', async(req, res) => {
    const drugcode = parseInt(req.params.drugcode);
    const client = new MongoClient(uri);
    await client.connect();
    const drug = await client.db('druginfromation').collection('drug').find({}).toArray();
    await client.close();
    res.status(200).send(drug);
})

// Select data where drugcode
app.get('/drugs/:drugcode', async(req, res) => {
    const drugcode = parseInt(req.params.drugcode);
    const client = new MongoClient(uri);
    await client.connect();
    const drug = await client.db('druginfromation').collection('drug').findOne({"drugcode": drugcode});
    await client.close();
    res.status(200).send({
      "status": "ok",
      "drugcode": drug
      
    });
  })

  // Update data to mangodb
  app.put('/drugs/update', async(req, res) => {
    const drug = req.body;
    const drugcode = parseInt(drug.drugcode);
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('druginfromation').collection('drug').updateOne({'drugcode': drugcode}, {"$set": {
      id: parseInt(drug.id),
      drugcode: parseInt(drug.drugcode),
      drugname: drug.drugname,
      lotno: drug.lotno,
      max: drug.max,
      min: drug.min
    }});
    await client.close();
    res.status(200).send({
      "status": "ok",
      "message": "Drug with ID = "+drugcode+" is updated",
      "drugcode": drug
    });
  })

   // Delete data where drugcode
  app.delete('/drugs/delete', async(req, res) => {
    const drugcode = parseInt(req.body.drugcode);
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('druginfromation').collection('drug').deleteOne({'drugcode': drugcode});
    await client.close();
    res.status(200).send({
      "status": "ok",
      "message": "Drug with ID = "+drugcode+" is deleted"
    });
  })