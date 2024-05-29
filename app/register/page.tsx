'use client';

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { requestRegister } from '../services/requests';

export default function Register() {
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [inputError, setInputError] = useState(false);

  const register = async () => {
    try {
      await requestRegister('/users/create', { name, login: user, password });

      Swal.fire({
        icon: 'success',
        title: 'Cadastro realizado com sucesso!',
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch (error) {
      setInputError(true);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black">
      <div
        className="bg-white shadow-lg shadow-blue-500/50 p-8 rounded-lg max-w-md w-full"
      >
        <h1 className="text-center text-black text-2xl mb-6">Blog</h1>
        <h2 className="text-black text-xl mb-4">Cadastre-se</h2>
        <label htmlFor="name" className="block text-black mb-2">
          Nome
          <input
            name="name"
            type="text"
            placeholder="Nome"
            onChange={ (e) => setName(e.target.value) }
            className="block w-full p-2 mt-2 mb-4 bg-gray-200 text-black rounded"
          />
        </label>
        <label htmlFor="user" className="block text-black mb-2">
          Usuário
          <input
            name="user"
            type="text"
            placeholder="Usuário"
            onChange={ (e) => setUser(e.target.value) }
            className="block w-full p-2 mt-2 mb-4 bg-gray-200 text-black rounded"
          />
        </label>
        <label htmlFor="password" className="block text-black mb-2">
          Senha
          <input
            name="password"
            type="password"
            placeholder="Senha"
            onChange={ (e) => setPassword(e.target.value) }
            className="block w-full p-2 mt-2 mb-4 bg-gray-200 text-black rounded"
          />
        </label>
        <button
          type="button"
          onClick={ register }
          className="w-full p-2 bg-black text-white rounded transition duration-300
          ease-in-out hover:bg-gray-800"
        >
          Cadastrar
        </button>
        {inputError && (
          <p className="text-red-500 mt-4">
            Preencha todos os campos ou digite uma senha válida.
          </p>
        )}
        <p className="text-black mt-4">Já tem uma conta?</p>
        <button
          type="button"
          onClick={ () => { window.location.href = '/'; } }
          className="w-full p-2 mt-2 bg-blue-500 text-white rounded
          transition duration-300 ease-in-out hover:bg-blue-600"
        >
          Clique para fazer login
        </button>
      </div>
    </main>
  );
}
