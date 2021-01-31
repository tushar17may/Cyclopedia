const express = require("express");
const path = require('path');
const app = express();
const bodyparser = require("body-parser");// we are not using bodyparser

const mongoose = require('mongoose');
const { stringify } = require("querystring");
mongoose.connect('mongodb://localhost/contactdance', {useNewUrlParser: true});
const port = 8000;

//Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String ,
    email: String,
    address: String,
    desc: String
  });

const contact = mongoose.model('contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));//for serving static files using express
//'urlencoded' is a middleware that helps the html data to come to express 
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); //set the template engine as pug

app.set('views', path.join(__dirname, 'views'))//set the views directory


//ENDPOINTS
app.get('/',(req,res)=>{
    const params = { };
    res.status(200).render('home.pug',params);
})

app.get('/about',(req,res)=>{
    const params = { };
    res.status(200).render('about.pug',params);
})


app.get('/contact',(req,res)=>{
    const params = { };
    res.status(200).render('contact.pug',params);
})

//jaise hhi contact pe koi post request maarega tab main ek naya contact object banaunga ...main kahunga ki jo post req aa rhi hai usmein se content extract krke conatact object mein daal do
app.post('/contact',(req,res)=>{
    var mydata = new contact(req.body);
    mydata.save().then(()=>{
        res.send("this item has been saved to the db")
    }).catch(()=>{
            res.status(400).send("item was not saved to the database")
    });
    
    
    // res.status(200).render('contact.pug');
})
// .catch() error ke liye hota hai agar error hoga to ye function run hoga


//START THE SERVER
app.listen(port,()=>{
    console.log(`the application started successfully on port ${port}`);
})



//agar aap app.post use krna chahte hain, matlab express ki madad se post krna chahte hain,matlab post request maar kr data ko database mein store krna chahte hai to hmein ek module install krna pdega jo hai ----->

// npm install body parser

// uske baad top par likhna hoga 
// const bodyparser = require("body-parser");
















