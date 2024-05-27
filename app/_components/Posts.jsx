"use client";
import React from 'react';
import { decodeJWTFromLocalStorage } from '../services/decodeJwt';
import { useState } from 'react';
import { requestCreatePost, requestGetPosts } from '../services/requests';
import { useEffect } from 'react';
import CardPost from './CardPost';

export default function Posts () {
    const [post, setPost] = useState({
        title: '',
        content: '',
        authorId: ''
    });
    const [posts, setPosts] = useState([]);
    //const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await requestGetPosts('/posts/list');
                setPosts(response.data);
            } catch (error) {
                console.log(error);
            }
        }
    }, []);

    const addPost = async () => {
        try {
            const token = localStorage.getItem('token');
            const { sign } = decodeJWTFromLocalStorage(token);
            setPost({...post, authorId: sign.sub});
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
                {posts.map((post) => (
                    <CardPost 
                    key={post.id} 
                    title={post.title} 
                    content={post.content} 
                    authorId={post.authorId} 
                    />
                ))}
            </section>
        </main>
    );
}
