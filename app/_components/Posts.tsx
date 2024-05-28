"use client";
import React from 'react';
import { decodeJWTFromLocalStorage } from '../services/decodeJwt';
import { useState } from 'react';
import { requestCreatePost, requestGetPosts, setToken, requestDeletePost } from '../services/requests';
import { useEffect } from 'react';
import Modal from './ModalDelete';

export default function Posts () {
    const [post, setPost] = useState({
        title: '',
        content: '',
        authorId: ''
    });
    const [posts, setPosts] = useState([]);
    const [idLoggedUser, setIdLoggedUser] = useState('');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [postIdDelete, setPostIdDelete] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const token = localStorage.getItem('token');
                const { sign } = decodeJWTFromLocalStorage(token);
                setIdLoggedUser(sign.sub);
                setToken(token);
                const response = await requestGetPosts('/posts/list');
                setPosts(response);
                setLoading(false);
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
            const response = await requestGetPosts('/posts/list');
            setPosts(response);
            setPost({
                title: '',
                content: '',
                authorId: '',
            })

        } catch (error) {
            console.log(error);
        }      
    };

    const openModal = (id: string) => {
        setShowModal(true);
        setPostIdDelete(id);
    };

    const closeModal = () => {
        setShowModal(false);
        setPostIdDelete('');
    };

    const confirmDelete = async (id: string) => {
        try {
            const token = localStorage.getItem('token');
            setToken(token);
            await requestDeletePost(`/posts/delete/${id}`);
            const response = await requestGetPosts('/posts/list');
            setPosts(response);
            closeModal();
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
                {loading && <p>Carregando...</p>} 
                {posts && posts.map(({authorId, title, content, id}) => (
                    <div key={id} id={id}>
                        <h1>{title}</h1>
                        <p>{content}</p>
                        {idLoggedUser === authorId && (
                        <div>
                            <button>Editar</button>
                            <button
                            type="button"
                            onClick={() => openModal(id)}
                            >
                            Excluir
                            </button>
                            <Modal 
                            show={showModal} 
                            onClose={closeModal} 
                            onConfirm={confirmDelete}
                            postId={postIdDelete}
                            />
                        </div>
                        )}
                    </div>
                ))}
            </section>
        </main>
    );
}
