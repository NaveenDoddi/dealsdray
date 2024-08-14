import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import LoginPage from './components/login';
import Signup from './components/signup'
import Edit from './components/update';
import Dashboard from './components/dashboard';
import EmployeeList from './components/employeeList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={LoginPage}></Route>
        <Route path='login' Component={LoginPage}></Route>
        <Route path='dashboard' Component={Dashboard}></Route>
        <Route path='employee-list' Component={EmployeeList}></Route>
        <Route path='signup' Component={Signup}></Route>
        <Route path='edit-employee' Component={Edit}></Route>
      </Routes>
    
    </BrowserRouter>
      
    
    
  );
}

export default App;
