var express = require('express');
var formidable = require('express-formidable');
var fs = require('fs');

var app = express();

app.use(express.static('public'));  

app.use(formidable());

// app.get('/', function (req,res){
//     res.send('<h1>Hola chicas!!</h1>');
// });

// fs.readFile(__dirname+'/data/posts.json', function(error,file){
//     console.log(JSON.parse(file));
// })
app.get('/get-posts', function (req,res) {
    fs.readFile(__dirname+'/data/posts.json', function(error,file){

        var posts = JSON.parse(file);
        res.send(JSON.stringify(posts));
        })
    })



app.post('/create-post', function (req,res){
    var blogpost = req.fields.blogpost;
    fs.readFile(__dirname+'/data/posts.json', function(error,file){

        var posts = JSON.parse(file);
        posts[Date.now()] = blogpost;
        
        fs.writeFile(__dirname+'/data/posts.json', JSON.stringify(posts), function(error){
            res.send('post añadido!!');
        })
      

       
        })
});

app.listen(3000, function(){
    console.log('Genial!! nuesto servidor está en marcha en el puerto 3000');
});