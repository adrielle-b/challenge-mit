"use client";
import React from 'react';
import { decodeJWTFromLocalStorage } from '../services/decodeJwt';
import { useState } from 'react';
import { requestCreatePost, requestGetPosts, setToken } from '../services/requests';
import { useEffect } from 'react';

export default function Posts () {
    const [post, setPost] = useState({
        title: '',
        content: '',
        authorId: ''
    });
    const [posts, setPosts] = useState([]);
    //const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setToken(localStorage.getItem('token'));
                const response = await requestGetPosts('/posts/list');
                setPosts(response);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const addPost = async () => {
        try {
            const token = localStorage.getItem('token');
            const { sign } = decodeJWTFromLocalStorage(token);
            setPost({...post, authorId: sign.sub});
            setToken(token);
            await requestCreatePost('/posts/create', post)
            setPost({
                title: '',
                content: '',
                authorId: '',
            })

        } catch (error) {
            console.log(error);
        }      
    };

    return (
        <main>
            <section>
                <p>Adicione um post:</p>
                <input type="text" 
                name="title"
                placeholder="Título"
                onChange={(e) => setPost({...post, title: e.target.value})}
                />
                <textarea 
                name="content"
                placeholder="Digite seu post"
                onChange={(e) => setPost({...post, content: e.target.value})}
                >
                </textarea>
                <button type="button" onClick={addPost}>Adicionar</button>
            </section>
            <section>
                {/* {loading && <p>Carregando...</p>} */}
                {posts && posts.map(({authorId, title, content}) => (
                    <div key={authorId}>
                        <h1>{title}</h1>
                        <p>{content}</p>
                    </div>
                ))}
            </section>
        </main>
    );
}
