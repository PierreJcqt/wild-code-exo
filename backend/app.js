const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Post = require('./models/post');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({origin: "http://localhost:4200"}));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


  mongoose.connect('mongodb+srv://pierrej:jawaher@equipage.htixmmt.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


  app.post('/api/posts', (req, res, next) => {
    const post = new Post({
      name: req.body.name
    });
    post.save();
    res.status(201).json({
      message: 'Membre ajouté'
    });
  });

  
  app.get('/api/posts', (req, res, next) => {
    Post.find().then(documents => {
      res.status(200).json({
        message: 'Membre affiché',
        posts: documents
    });
    });    
});
  
module.exports = app;