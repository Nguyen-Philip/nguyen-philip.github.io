var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var axios = require('axios').default

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/static', express.static('public'));

app.set('view engine', 'ejs')

let num =Math.floor(Math.random()*2832)+1;
let text1='https://xkcd.com/'
let text2=num.toString();
let text3='/info.0.json'
let result1=text1.concat("",text2);
let result2=result1.concat("",text3);

app.get('/', function(req, res){
    axios.get(result2).then(function(response){
        res.render('home.ejs', {name: null, xkcdData: response.data})
    })
})

app.get('/nasa', function(req, res){
    axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY').then(function(response){
        res.render('nasa.ejs', {name: null, nasaData: response.data})
    })
})

app.post('/create', (req, res) => {
    console.log(req.body)
    res.redirect('/')
})

app.listen(3000, () => {
    console.log('Started on port 3000')
})