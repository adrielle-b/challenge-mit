'use client';

import React, { useState } from 'react';

type PostEdit = {
  title: string;
  content: string;
  id: string;
};

export default function EditModal({ post, show, onClose, onSave }:
{ post: PostEdit, show: boolean,
  onClose: () => void, onSave: (post: PostEdit) => void }) {
  const [editedPost, setEditedPost] = useState(post);
  const [invalidPost, setInvalidPost] = useState(false);

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setEditedPost({ ...editedPost, [name]: value });
  };

  const handleSave = () => {
    if (!editedPost.title || !editedPost.content) {
      setInvalidPost(true);
    } else {
      setInvalidPost(false);
      onSave(editedPost);
      onClose();
    }
  };

  if (show) {
    return (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div
          className="flex items-center justify-center min-h-screen
            pt-4 px-4 pb-20 text-center"
        >
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-black opacity-50" />
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" />
          &#8203;
          <div
            className="inline-block align-bottom bg-white rounded-lg text-left
            overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle
            sm:max-w-lg sm:w-full"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900 mb-2"
                  >
                    Editar Post
                  </h3>
                  <div>
                    <input
                      type="text"
                      name="title"
                      value={ editedPost.title }
                      onChange={ handleChange }
                      className="mb-2 px-3 py-2 border rounded-md w-full text-black"
                    />
                  </div>
                  <div>
                    <textarea
                      name="content"
                      value={ editedPost.content }
                      onChange={ handleChange }
                      className="mb-2 px-3 py-2 border rounded-md w-full text-black"
                    />
                  </div>
                  {invalidPost
                  && <p className="text-red-500 mb-2">Preencha todos os campos</p>}
                </div>
              </div>
            </div>
            <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={ handleSave }
                className="w-full inline-flex justify-center rounded-md border
                border-transparent shadow-sm px-4 py-2 bg-green-600 text-base
                font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto
              sm:text-sm"
              >
                Salvar
              </button>
              <button
                onClick={ onClose }
                className="mt-3 w-full inline-flex justify-center rounded-md border
                border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium
                text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3
                sm:w-auto sm:text-sm"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
