const express = require("express");
const app = express();
const cors = require("cors");
const {
  MongoClient,
  ServerApiVersion,
  ObjectId,
  ObjectID,
} = require("mongodb");
const port = process.env.PORT || 5000;

require("dotenv").config();

app.use(cors());
app.use(express.json());

const { json } = require("express");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ct9it9z.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const personalCollection = client.db("loan-app").collection("personal");

    app.get("/saveInfo", async (req, res) => {
      const query = {};
      const result = await personalCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/saveInfo", async (req, res) => {
      const info = req.body;
      const result = await personalCollection.insertOne(info);
      res.send(result);
    });

    app.delete('/deleteProfile/:id', async(req, res)=> {
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const result = await personalCollection.deleteOne(query);
        res.send(result);
    })

  } finally {
  }
}
run().catch((err) => console.log("Error: ", err));

app.listen(port, () => {
  console.log(`mongodb db server is running, ${port}`);
});
