"use client"
import React, { useState, useEffect } from 'react';
import { requestLogin, setToken } from './services/requests';

export default function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [failedLogin, setFailedLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = '/home';
    }
  }, []);

  const login = async () => {
    try {
    const { token } = await requestLogin('/auth', { login: user, password });
    localStorage.setItem('token', token);
    window.location.href = '/home';
    } catch (error) {
      setFailedLogin(true);
    }
  }

    return (
      <main className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white shadow-lg shadow-blue-500/50 p-8 rounded-lg max-w-md w-full">
      <h1 className="text-center text-black text-2xl mb-6">Blog</h1>
        <h2 className="text-black text-xl mb-4">Login</h2>
        <label htmlFor="user" className="block text-black mb-2">
          Usuário
          <input
            name="user"
            type="text"
            placeholder="Usuário"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="block w-full p-2 mt-2 mb-4 bg-gray-200 text-black rounded"
          />
        </label>
        <label htmlFor="password" className="block text-black mb-2">
          Senha
          <input
            name='password'
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-2 mt-2 mb-4 bg-gray-200 text-black rounded"
          />
        </label>
        <button
          type='button'
          onClick={login}
          className="w-full p-2 bg-black text-white rounded transition duration-300 ease-in-out hover:bg-gray-800"
        >
          Entrar
        </button>
        {failedLogin && <p className="text-red-500 mt-4">Login incorreto</p>}
        <p className="text-black mt-4">Não tem uma conta?</p>
        <button
          type='button'
          onClick={() => window.location.href = '/register'}
          className="w-full p-2 mt-2 bg-blue-500 text-white rounded transition duration-300 ease-in-out hover:bg-blue-400"
        >
          Clique para se cadastrar
        </button>
        </div>
      </main>
    );
  }