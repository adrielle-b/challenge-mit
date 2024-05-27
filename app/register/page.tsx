"use client"

import React from 'react';
import { useState } from 'react';
import { requestRegister } from '../services/requests';
import Swal from 'sweetalert2';

export default function Register() {
    const [name, setName] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [inputError, setInputError] = useState(false);

    const register = async () => {

        try {
            await requestRegister('/users/create', { name, login: user, password});

            Swal.fire({
                icon: 'success',
                title: 'Cadastro realizado com sucesso!',
                showConfirmButton: false,
                timer: 1500
              });
          
              setTimeout(() => {
                window.location.href = '/';
              }, 1500);

        } catch (error) {
            setInputError(true);
        }
    }

    return (
      <div>
        <h1>Cadastre-se</h1>
        <label htmlFor="name">
            Nome
            <input 
            name="name"
            type="text" 
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
            />
        </label>
        <label htmlFor="user">
            Usuário
            <input 
            name="user"
            type="text" 
            placeholder="Usuário"
            onChange={(e) => setUser(e.target.value)}
            />
        </label>
        <label htmlFor="password">
            Senha
            <input
            type="password" 
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            />
        </label>
        <button type='button' onClick={register}>Cadastrar</button>
        {inputError && <p>Preencha todos os campos ou digite uma senha válida.</p>}
        <p>Já tem uma conta?</p>
        <button onClick={() => window.location.href = '/'} type ='button'>Clique para fazer login</button>
      </div>
    );
}