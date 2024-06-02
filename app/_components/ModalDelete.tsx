'use client';

import React from 'react';

export default function ModalDel({
  show, onClose, onConfirm, postId }:
{
  show: boolean, onClose: () => void,
  onConfirm: (postId: string) => void, postId: string
}) {
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
                    Tem certeza?
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Você não poderá reverter isso!
                  </p>
                  <div className="flex justify-center">
                    <button
                      onClick={ () => { onConfirm(postId); onClose(); } }
                      className="bg-red-600 hover:bg-red-700 text-white font-bold
                    py-2 px-4 rounded mr-2"
                    >
                      Sim, excluir!
                    </button>
                    <button
                      onClick={ onClose }
                      className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2
                    px-4 rounded"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
