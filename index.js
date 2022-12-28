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
    const businessCollection = client.db("loan-app").collection("business");
    const loanCollection = client.db("loan-app").collection("loan");

    app.get("/", async (req, res) => {
      res.send("server is running well");
    });

    app.get('/getProfile', async(req, res)=>{
        
    })

    app.post("/saveInfo", async (req, res) => {
      const category = req.query.category;
      const info = req.body;
      if (category === "personal") {
        const result = await personalCollection.insertOne(info);
        res.send(result);
      }
      else if (category === "business") {
        const result = await businessCollection.insertOne(info);
        res.send(result);
      } else {
        const result = await loanCollection.insertOne(info);
        res.send(result);
      }
      
    });
  } finally {
  }
}
run().catch((err) => console.log("Error: ", err));

app.listen(port, () => {
  console.log(`mongodb db server is running, ${port}`);
});
