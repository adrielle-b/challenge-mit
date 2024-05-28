"use client";
import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function ModalDel({ show, onClose, onConfirm, postId }: { show: boolean, onClose: () => void, onConfirm: (postId: string) => void, postId: string }) {
    if (show) {
        MySwal.fire({
            title: 'Tem certeza?',
            text: 'Você não poderá reverter isso!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Não, cancelar',
        }).then((result: { isConfirmed: any; }) => {
            if (result.isConfirmed) {
                onConfirm(postId);
            } else {
                onClose();
            }
        });
    }

    return null;
}