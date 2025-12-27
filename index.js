require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.on3ghb8.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
//DB_USER=creatorBd_User
// DB_PASSWORD=A4xEC1iYVmVucem5
async function run() {
  try {
    await client.connect();
    const creatorCollection = client.db("CreatorDB").collection("users");

    app.post("/users", async (req, res) => {
      try {
        const user = req.body;

        if (!user?.email) {
          return res.status(400).send({ message: "Email is required" });
        }
        const existingUser = await usersCollection.findOne({
          email: user.email,
        });

        if (existingUser) {
          return res.send({ message: "User already exists" });
        }

        const result = await usersCollection.insertOne(user);

        res.status(201).send(result);
      } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

// test route
app.get("/", (req, res) => {
  res.send("CreatorBD Server is running 🚀");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
