"use client";
import React from 'react';
import { decodeJWTFromLocalStorage } from '../services/decodeJwt';
import { useState } from 'react';
import { requestCreatePost, requestGetPosts, setToken, requestDeletePost, requestEditPost } from '../services/requests';
import { useEffect } from 'react';
import ModalDel from './ModalDelete';
import ModalEdit from './ModalEdit';

export default function Posts () {
    const [post, setPost] = useState({
        title: '',
        content: '',
        authorId: ''
    });
    const [posts, setPosts] = useState([]);
    const [idLoggedUser, setIdLoggedUser] = useState('');
    const [invalidPost, setInvalidPost] = useState(false);
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
            if (!post.title || !post.content) {
                setInvalidPost(true);
            } else {
                setInvalidPost(false);
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
            }

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
    <main className="bg-black text-gray-300 p-8">
      <section className="max-w-4xl mx-auto">
        <p className="text-blue-300 mb-4">Adicione um post:</p>
        <input type="text" 
            name="title"
            className="w-full bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 border border-gray-700 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring focus:border-blue-300"
            value={post.title}
            placeholder="Título"
            onChange={(e) => setPost({...post, title: e.target.value})}
        />
        <textarea 
            name="content"
            className="w-full bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 border border-gray-700 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring focus:border-blue-300"
            value={post.content}
            placeholder="Digite seu post"
            onChange={(e) => setPost({...post, content: e.target.value})}
        ></textarea>
        {invalidPost && <p className="text-red-500 mb-2">Preencha todos os campos</p>}
        <button type="button" 
            className="bg-blue-500 bg-opacity-70 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={addPost}
        >Adicionar</button>
      </section>
            {loading && <p className="text-blue-400 text-center">Carregando...</p>} 
      <section className="mt-12 max-w-7xl mx-auto grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {posts && posts.map(({authorId, title, content, id}) => (
                <div key={id} id={id} className="bg-black rounded-lg border border-blue-400 text-white shadow-lg overflow-hidden">
                    <div className="p-4">
                        <h1 className="text-xl font-bold mb-2">{title}</h1>
                        <p className="mb-4">{content}</p>
                    {idLoggedUser === authorId && (
                        <div className="flex justify-end p-3">
                            <button
                            type="button"
                            onClick={() => openModalEdit(title, content, id)}
                            className="text-sm bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2"
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
                            className="text-sm bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
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
                    </div>
                ))}
            </section>
        </main>
    );
}
