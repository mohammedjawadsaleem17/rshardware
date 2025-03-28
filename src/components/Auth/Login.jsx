import React, { useState } from 'react'
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Footer from '../Footer';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const notifySuccess = () => toast.success('Login Success!');
  const notifyFailed = () => toast.error('Wrong Credentials!');

  function handleSubmit(e) {
    e.preventDefault();
    if (username === '' || password === '') {
      toast.error('Please fill in all fields!');
      return;
    }
    if (login(username, password)) {
      navigate('/');
      notifySuccess();
    } else {
      notifyFailed();
    }
  }

  return (
    <form id="loginform" onSubmit={handleSubmit}>
      <ToastContainer />

      <h2 id="headerTitle" className="monomaniac-one-regular">
        Login
      </h2>
      <div>
        <div className="row">
          <label className="text-white opacity-100">USERNAME</label>
          <input
            type="text"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="row">
          <label className="text-white opacity-100">PASSWORD</label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div id="button" className="row m-6">
          <button onClick={handleSubmit}>Log in</button>
        </div>
      </div>
      <div className="mt-12">
        <Footer />
      </div>
    </form>
  );
}


/*return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <label className="block mb-2">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <label className="block mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <button className="bg-blue-500 text-white p-2 w-full">Login</button>
      </form>
    </div>*/