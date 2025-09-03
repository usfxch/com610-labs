import express from "express";
import {MongoClient, ObjectId } from "mongodb";

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

// const mongoURI = "mongodb+srv://marcelo:By7hhJzf2f4OqoTO@clusterunivalle.unxia72.mongodb.net/library?retryWrites=true&w=majority&appName=ClusterUnivalle";
const mongoURI = "mongodb://marcelo:secret@db:27017";
app.use(express.json());

app.get('/authors', async (req, res) => {
    try {
        const client = await MongoClient.connect(mongoURI);
        const db = client.db();
        // const db = client.db('library');
    
        const authors = await db.collection('authors').find().toArray();
        client.close();
        console.log('Listar Authors!');
        res.json(authors);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el Servidor");
    }
});

app.get('/authors/:id', async (req, res) => {
  try {
      const client = await MongoClient.connect(mongoURI);
      const db = client.db();
  
      const author = await db.collection('authors').findOne({ _id: new ObjectId(req.params.id)});
      client.close();
      console.log('Obtener Author!');
      res.json(author);
  } catch (error) {
      console.error(error);
      res.status(500).send("Error en el Servidor");
  }
});

app.post('/authors', async (req, res) => {
  try {
      const client = await MongoClient.connect(mongoURI);
      const db = client.db();
  
      // obtener datos
      const {name, nationality} = req.body;
      if (!name) {
        res.status(400).send('Se require el campo name');
        return;
      }

      const newAuthor = { name, nationality };
      await db.collection('authors').insertOne(newAuthor);

      client.close();
      console.log('Author creado!');
      res.json(newAuthor);
  } catch (error) {
      console.error(error);
      res.status(500).send("Error en el Servidor");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});