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
      setToken(token);
      window.location.href = '/home';
    }
  }, []);

  const login = async () => {
    try {
    const { token } = await requestLogin('/auth', { login: user, password });
    setToken(token);
    localStorage.setItem('token', token);
    window.location.href = '/home';
    } catch (error) {
      setFailedLogin(true);
    }
  }

    return (
      <div>
        <h1>Blog</h1>
        <h2>Login</h2>
        <label htmlFor="user">
            Usuário
            <input
            name="user"
            type="text" 
            placeholder="Usuário"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            />
        </label>
        <label htmlFor="password">
            Senha
            <input
            name='password'
            type="password" 
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </label> 
        <button type='button' onClick={login}>Entrar</button>
        {failedLogin && <p>Login incorreto.</p>}
        <p>Não tem uma conta?</p>
        <button type ='button' 
        onClick={() => window.location.href = '/register'}
        >
          Clique para se cadastrar
        </button>
      </div>
    );
  }