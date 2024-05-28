"use client";
import React from 'react';
import { decodeJWTFromLocalStorage } from '../services/decodeJwt';
import { useState } from 'react';
import { requestCreatePost, requestGetPosts, setToken, requestDeletePost, requestEditPost } from '../services/requests';
import { useEffect } from 'react';
import ModalDel from './ModalDelete';
import { bodyCreatePost } from '../services/types';
import ModalEdit from './ModalEdit';

export default function Posts () {
    const [post, setPost] = useState({
        title: '',
        content: '',
        authorId: ''
    });
    const [posts, setPosts] = useState([]);
    const [idLoggedUser, setIdLoggedUser] = useState('');
    const [loading, setLoading] = useState(true);
    const [showModalDel, setShowModalDel] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [postIdDelete, setPostIdDelete] = useState('');
    const [postEdit, setPostEdit] = useState({
        title: '',
        content: '',
        id: ''
    });

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

    const openModalDelete = (id: string) => {
        setShowModalDel(true);
        setPostIdDelete(id);
    };

    const closeModalDel = () => {
        setShowModalDel(false);
        setPostIdDelete('');
    };

    const confirmDelete = async (id: string) => {
        try {
            const token = localStorage.getItem('token');
            setToken(token);
            await requestDeletePost(`/posts/delete/${id}`);
            const response = await requestGetPosts('/posts/list');
            setPosts(response);
            closeModalDel();
        } catch (error) {
            console.log(error);
        }
    };

    const openModalEdit = (title: string, content: string, id: string) => {
        setShowModalEdit(true);
        setPostEdit({title, content, id});
    };

    const closeModalEdit = () => {
        setShowModalEdit(false);
        setPostEdit({
            title: '',
            content: '',
            id: ''
        });
    }
    
    const saveEditedPost = async (id: string, postEdit: {title : string, content: string}) => {
        try {
            const token = localStorage.getItem('token');
            setToken(token);
            await requestEditPost(`/posts/edit/${id}`, postEdit);
            const response = await requestGetPosts('/posts/list');
            setPosts(response);
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
                            <button
                            type="button"
                            onClick={() => openModalEdit(title, content, id)}
                            >
                                Editar
                            </button>
                            <ModalEdit
                            show={showModalEdit}
                            post={postEdit}
                            onClose={closeModalEdit}
                            onSave={(editedPost) => saveEditedPost(id, editedPost)}
                            />
                            <button
                            type="button"
                            onClick={() => openModalDelete(id)}
                            >
                                Excluir
                            </button>
                            <ModalDel
                            show={showModalDel} 
                            onClose={closeModalDel} 
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
