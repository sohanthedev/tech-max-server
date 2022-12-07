const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
app.use(cors())
app.use(express.json())
const Port = process.env.Port || 5000;

const data = require('./Data/Data.json');





const uri = "mongodb+srv://hamidthedev:hamidthedev@cluster0.srwkfcj.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const collections = client.db('techmax').collection('services');
const cartsCollections = client.db('techmax').collection('carts');
const reviewsCollections = client.db('techmax').collection('reviews');


let result;
app.get('/services', async (req, res) => {
    const query = {};
    const cursor = collections.find(query);
    result = await cursor.toArray();
    res.send(result);
})


// app.get('/services', (req, res) => {
//     res.send(data);
// })

app.get("/services/:id", (req, res) => {
    id = req.params.id
    singleItem = result?.find((p) => p.id == id);
    res.send(singleItem);
    if (!singleItem) {
        res.send("No Data Found");
    }
})


app.post("/carts", async (req, res) => {
    const carts = req.body;
    const all = await cartsCollections.insertOne(carts)
    res.send(all)
})

app.get("/cart", async (req, res) => {
    let query = {};
    if (req.query.email) {
        query = {
            email: req.query.email
        }
    }

    const cursor = cartsCollections.find(query);
    const carts = await cursor.toArray();
    res.send(carts)
})



app.get("/reviews/:id", async (req, res) => {
    id = req.params.id
    const cursor = reviewsCollections.find({});
    const all = await cursor.toArray()
    res.send(all)  
})


app.get("/myreviews", async (req, res) => {
    let query = {};
    if (req.query.email) {
        query = {
            email: req.query.email
        }
    }
    const cursor = reviewsCollections.find(query);
    const myreviews = await cursor.toArray();
    res.send(myreviews)
})


app.post("/doreview", async (req, res) => {
    const review = req.body;
    const all = await reviewsCollections.insertOne(review)
    res.send(all)
})



app.listen(Port, () => {
    console.log('Listenin on port', Port);
})