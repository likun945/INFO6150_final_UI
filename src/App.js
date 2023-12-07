import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/aboutUs';
import Jobs from './pages/jobs';
import Layout from './components/layout';
import Login from './pages/login';
import Home from './pages/home';
import UserManagement from './pages/userManagement';
import UserComments from './pages/userComments';
import SignUp from './pages/signUp';
import EditUser from './pages/editUser';
import './index.css';
import Detail from "./pages/detail";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/detail" element={<Detail />}/>
          <Route path="/users" element={<UserManagement />} />
          <Route path="/comments" element={<UserComments />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/editUser" element={<EditUser />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;