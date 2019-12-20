const express = require('express');
const bodyParser = require('body-parser');
const api = require('./serverfiles/routes/api');
const cors = require('cors');
const path = require('path');
const PORT = 8080;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve only the static files form the docs directory
app.use(express.static(__dirname + '/docs'));

app.get('/', function(req,res){
    res.send('hello from server')
});

app.get('/api/test', function(req,res){
    res.send('hi from test')
});

app.use('/api', api);

//cloud hosting

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/docs/index.html'));
});
app.listen(process.env.PORT || PORT);



//local testing

// app.listen(PORT, function(){
//     console.log('Server running on localhost: ' + PORT)
// });
