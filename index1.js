const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Employee = require('../models/Employee');
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
});

router.post('/', async (req, res) => {
      const { name, email, mobile, designation, gender, course, image } = req.body;
      try {
          const newEmployee = new Employee({ name, email, mobile, designation, gender, course, image });
          await newEmployee.save();
          res.status(201).json(newEmployee);
      } catch (err) {
          res.status(400).json({ error: err.message });
      }
  });
  
  // Get All Employees
  router.get('/', async (req, res) => {
      try {
          const employees = await Employee.find();
          res.json(employees);
      } catch (err) {
          res.status(500).json({ error: err.message });
      }
  });
  
  // Get Single Employee
  router.get('/:id', async (req, res) => {
      try {
          const employee = await Employee.findById(req.params.id);
          if (!employee) return res.status(404).json({ message: 'Employee not found' });
          res.json(employee);
      } catch (err) {
          res.status(500).json({ error: err.message });
      }
  });
  
  // Update Employee
  router.put('/:id', async (req, res) => {
      try {
          const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
          res.json(employee);
      } catch (err) {
          res.status(400).json({ error: err.message });
      }
  });
  
  // Delete Employee
  router.delete('/:id', async (req, res) => {
      try {
          await Employee.findByIdAndDelete(req.params.id);
          res.json({ message: 'Employee deleted' });
      } catch (err) {
          res.status(500).json({ error: err.message });
      }
  });
  

module.exports = router;
