const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const Poster = require('../models/poster');
const Image = require('../models/image');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
const image = require('../models/image');

//const db = "mongodb://Minghui:Appie12345@ds211875.mlab.com:11875/heroku_7mt753c8";
const db = "mongodb://Minghui:Abc123@ds253388.mlab.com:53388/heroku_d469pw2t";
//const db = "mongodb+srv://Minghui:Appie12345@cluster0-ayo02.mongodb.net/eventsdb?retryWrites=true&w=majority";

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true}, err => {
    if (err) {
        console.error('Error!' + err);
    } else {
        console.log('Connected to mongodb');
    }
});
mongoose.set('useFindAndModify', false);

//config cloudinary
cloudinary.config({
  cloud_name: 'di8upirgz',
  api_key: '367457436592477',
  api_secret: 'pQxBbAkOUNDJDKueMhMpU-EUo1I'
});
const storage = cloudinaryStorage ({
  cloudinary: cloudinary,
  folder: "smallposter",
  allowedFormats: ["jpg", "png", "jpeg", "ico"],
  transformation: [{ width:1024, height:1024, crop: "limit" }]
});
const parser = multer({ storage: storage });


function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request');
  }
  let token = req.headers.authorization.split(' ')[1];
  if (token === 'null') {
    return res.status(401).send('Unauthorized request');
  }
  try {
    let payload = jwt.verify(token, 'secretKey');
    if (!payload) {
      return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    next();
  } 
  catch {
    return res.status(401).send('Unauthorized request');
  }
}

router.get('/', (req, res) => {
    res.send('from api route')
});

router.get('/test', (req, res) => {
  res.send('from test route')
});

router.post('/register', (req,res) => {
    let userData = req.body;
    let user = new User(userData);
    let hashedPassword = user.generateHash(user.password);
    user.password = hashedPassword;
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error);
        } else {
            let payload = { subject: registeredUser._id};
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({token});
        }
    });
});

router.post('/userEmailCheck', function(req, res) {
  let userEmail = req.body;
  User.findOne(userEmail, function(err, user){
      if(err) {
        console.log(err);
      } else {
          var message;
          if(user) {
              message = {exist: true};
          } else {
              message = {};
          }
          res.json(message);
      }
  });
});

router.post('/userIdCheck', function(req, res) {
  let userId = req.body;
  User.findOne(userId, function(err, user){
      if(err) {
        console.log(err);
      } else {
          var message;
          if(user) {
              message = {exist: true};
          } else {
              message = {};
          }
          res.json(message);
      }
  });
});

router.post('/login', (req,res) => {
    let userData = req.body;
    User.findOne({email: userData.email}, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            if (!user) {
                res.status(401).send('Invalid email/password');
            } else {
                //if ( user.password !== userData.password) {
                if (!user.validatePassword(userData.password, user.password)) {
                    res.status(401).send('Invalid email/password');
                } else {
                  let payload = { subject: user._id};
                  let token = jwt.sign(payload, 'secretKey');
                  res.status(200).send({"token": token, id: user._id});
                }
            }
        }
    });
});

router.get('/posters', (req,res) => {
    Poster.find((error, posters) => {
        if (error) {
          res.status(500).send(err);
        } else {
          res.status(200).send(posters);
        }
    });
});

router.post('/posters', (req,res) => {
  let posterData = req.body;
  let poster = new Poster(posterData);
  poster.save((error, recordedPoster) => {
      if (error) {
          console.log(error);
      } else {
          res.status(200).send(recordedPoster);
      }
  });
});

router.get('/posters/:id', (req, res) => {
  id = req.params.id;
  Poster.findById(id, function (error, poster) {
    if (error) {
      console.log(error);
    } else {
      res.status(200).send(poster);
    }
  });
});


const upload = parser.single('image');
router.post('/images', (req,res) => {
  upload(req,res,(err)=> {
      if (err) {
        console.log(err);
      } else {
        let posterData = req.body;
        let image = new Image({imgUrl: req.file.url, publicId:req.file.public_id,
          posterId: posterData.posterId});

        image.save((error, recordedImage) => {
          if (error) {
              console.log("this image cannot be saved to database");
              res.status(401).send('this image cannot be saved to database');
          } else {
              res.status(200).send(recordedImage);
          }
        });
      }
  });
});

router.delete('/images/:id', (req,res) => {
  imageId = req.params.id;
  publicId = "";
  Image.findById(imageId, (err,image) => {
    if (err) {
      console.log(err);
    } else {
      publicId = image.publicId;
      cloudinary.v2.uploader.destroy(publicId, (err,result) => {
        if (err) {
          console.log(err);
        } 
      });
      Image.findByIdAndDelete(imageId, (err, deletedImage) => {
        if (err) {
            console.log("Something wrong when deleting data!");
        } else {
          res.status(200).send(deletedImage);
        }
      });
    }
  });
});

router.put('/posters/:id', (req, res) => {
  id = req.params.id;
  poster = req.body;
  Poster.findByIdAndUpdate(id, poster, {new: true}, (err, updatedPoster) => {
    if (err) {
        console.log("Something wrong when updating data!");
    } else {
      res.status(200).send(updatedPoster);
    }
  });
});

router.delete('/posters/:id', (req, res) => {
  id = req.params.id;
  poster = req.body;
  Poster.findByIdAndDelete(id, (err, deletedPoster) => {
    if (err) {
        console.log("Something wrong when updating data!");
    } else {
      res.status(200).send(deletedPoster);
    }
  });
});


router.post('/ownposters', verifyToken, (req,res) => {
  //let identity = req.headers.authorization.split('.')[0];
  //let identityToken = identity.split(' ')[1];
  let userId = req.body;
  Poster.find(userId, (error, posters) => {
      if (error) {
        res.status(500).send(err);
      } else {
        res.status(200).send(posters);
      }
  });
});

module.exports = router;