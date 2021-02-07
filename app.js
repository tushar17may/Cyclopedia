const express = require("express");
const path = require('path');
const app = express();
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactdance', {useNewUrlParser: true});
const port = 8000;

//Define mongoose schema for user contact info
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String ,
    email: String,
    address: String,
    desc: String
  });

const contact = mongoose.model('contact', contactSchema);

//Define mongoose schema for employee info
const employeeSchema = new mongoose.Schema({
    name: String,
    phone: String ,
    email: String,
    address: String,
    desc: String
  });

const employee = mongoose.model('employee', employeeSchema);
//a new collection with name 'employees' is made in contactdance database

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

app.get('/employee',(req,res)=>{
    const params = { };
    res.status(200).render('employee.pug',params);
})

// post request on /contact for new user
app.post('/contact',(req,res)=>{
    var mydata = new contact(req.body);
    mydata.save().then(()=>{
        res.send("this item has been saved to the db")
    }).catch(()=>{
            res.status(400).send("item was not saved to the database")
    });
})

// check if post request for insert or update
app.post('/employee', (req, res) => {
    if (req.body._id == undefined)
        insertRecord(req, res);
        else
        updateRecord(req, res);
});

//insert new employee
function insertRecord(req, res) {
    var mydata = new employee(req.body);
    mydata.save().then(()=>{
        // console.log("insert is running");
        res.redirect('/employee/list');

        // res.send("this item has been saved to the db")
        }).catch(()=>{
            res.status(400).send("item was not saved to the database")
    });
}

// update employee 
function updateRecord(req, res) {
    employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            // console.log(req.body._id)
            // console.log('update is running') 
            res.redirect('/employee/list'); }
        else {
            console.log('Error during record update : ' + err);
        }
    });
}

// to get all employees in list form
app.get('/employee/list', (req, res) => {
    employee.find((err, docs) => {
        if (!err) {
            // console.log(docs);
            res.render("employeelist.pug", {
                lists: docs
            })}
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});

//to delete an employee
app.get('/employee/delete/:id', (req, res) => {
    employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

//get request to update an employee information
app.get('/employee/:id', (req, res) => {
    employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employeeupd.pug", {
               viewTitle: "Update Employee",
               employee: doc
            });
        }
    });
});


//START THE SERVER
app.listen(port,()=>{
    console.log(`the application started successfully on port ${port}`);
})


















