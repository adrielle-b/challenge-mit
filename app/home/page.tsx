"use client"

import React from 'react';
import Header from '../_components/Header';
import Posts from '../_components/Posts';

export default function Blog() {

    if (!localStorage.getItem('token')) {
        window.location.href = '/';
    }

    return (
        <div>
            <Header />
            <Posts />
        </div>
    )
}