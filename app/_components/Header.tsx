"use client"

import React from 'react';

export default function Header () {

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    return (
        <header className="bg-blue-300 py-4 px-8 flex justify-between items-center">
            <h1 className="text-xl font-bold">Blog</h1>
            <button
            type="button"
            onClick={logout}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
            Logout
            </button>
        </header>

    );
}