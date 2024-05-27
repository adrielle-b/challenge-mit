"use client"

import React from 'react';

export default function Header () {

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    return (
        <header>
        <h1>Blog</h1>
        <button type="button" onClick={logout}>Logout</button>
        </header>
    );
}