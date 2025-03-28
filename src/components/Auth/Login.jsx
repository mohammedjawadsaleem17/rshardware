import React, { useState } from 'react'
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (login(username, password)) {
      alert('Login Successful');
      navigate('/');
    } else {
      alert('Invalid Credentials');
    }
  }

  return (
    <div id="loginform">
      <h2 id="headerTitle">Login</h2>
      <div>
        <div className="row">
          <label>Username</label>
          <input type="text" placeholder="Enter your username" />
        </div>
        <div className="row">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" />
        </div>
        <div id="button" className="row m-6">
          <button>Log in</button>
        </div>
      </div>
    </div>
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