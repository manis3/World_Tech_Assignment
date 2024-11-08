import { useState } from "react";

export function useHandleModalAction() {
    const [showModal, _setShowModal] = useState(false);

    const openModal = () => {
        _setShowModal(true);
    };
    const closeModal = () => {
        _setShowModal(false);
    };


    return {
        showModal,
        openModal,
        closeModal,

    };
}
