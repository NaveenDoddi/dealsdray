const express = require("express");
const cors = require('cors');
const mongoose= require('mongoose');

const employee = require('./model/model_employe_details')

const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(cors()); 
app.use(express.json())
app.use(bodyParser.json())

app.use(express.static(path.join('public')));

// Serve index.html for the root URL
// app.get('/', (req, res) => {
//     res.sendFile(path.join('public', 'index.html'));
// });


const url = "mongodb+srv://naveendoddi:zQTrjUrwyKXeIEZ2@Dealsdray.jbdpwef.mongodb.net/Dealsdray?retryWrites=true&w=majority&appName=Dealsdray";

mongoose.connect(url).then(
    ()=> console.log("DB connected...", mongoose.connection.name)
).catch(err => console.log(err))

// post emoloyee
app.post("/api/postEmployee", async (req, res)=>{ // registration process
  const { name, email, mobile, password, designation, gender, course, image, createdate } = req.body;
  try{
      const newData = new employee({ name, email, mobile, password, designation, gender, course, image, createdate });
      await newData.save();
      res.status(201).json({ message: "User registered successfully" });
  }catch(err){
    res.status(400).json({ error: "exists" });
  }
})

// login
app.get("/api/login/:email", async (req, res)=>{ 
      try{
          const email = req.params.email;
          const user = await employee.findOne({ email: email });
    
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
    
          return res.json(user);
          
      }catch(err){
          console.log(err.message)
      }
})

// display all employee on dashboard
app.get("/api/getAllEmployee", async (req, res)=>{
      try{
        const allData = await employee.find();
        return res.status(200).json(allData);
      }catch(err){
        console.log(err)
      }
})

// get employee by id for update page

app.get("/api/employee/:id", async (req, res)=>{
  try{
      const user = await employee.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
      
  }catch(err){
      console.log(err.message)
  }
})

// update
app.put("/api/updateItem/:id", async (req, res) => {
  const _id = req.params.id;
  const updateData = req.body;

  try {
    const updatedEmployee = await employee.findByIdAndUpdate(_id, updateData, { new: true });

    if (!updatedEmployee) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedEmployee);
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// delete items form the restraurant page
app.delete("/api/deleteEmployee/:id", async (req, res)=>{ 
  try{
      await employee.findByIdAndDelete(req.params.id)
      res.status(200).json({ message: "employee removed successfully" });
  }catch(err){
    res.status(400);
  }
})

const server = app.listen(3001, ()=>{
      console.log('Server running at...');
}) 
    