"use client"

import React, { useEffect } from 'react';
import Header from '../_components/Header';
import Posts from '../_components/Posts';

export default function Blog() {

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/';
        }
      }, []);

    return (
        <div>
            <Header />
            <Posts />
        </div>
    )
}