import useLoginUser from '@/query/userLogin/useLoginUser';
import { useHandleModalAction } from '../useHandleModalAction'
import { LoginRequest } from '@/types/loginType';
import { useState } from 'react';
import useUserSignUp from '@/query/userSignup/useUserSignUp';
import { SignupRequest } from '@/types/ssignUpTypes';

export default function useLogin() {
    const [showSignupModal, setShowSignupModal] = useState(false)

    const { openModal, closeModal, showModal } = useHandleModalAction()
    const { createUser, isUserBeingCreated } = useUserSignUp();
    const { loginUser, isLoggingIn } = useLoginUser();
    const handleShowSignupModal = () => {
        setShowSignupModal(true);
    }
    const handleCloseSignupModal = () => {

        setShowSignupModal(false);
    }
    const handleOpenModal = () => {
        openModal()
    }

    const handleCloseModal = () => {
        closeModal();
    }

    const handleLoginUser = async (data: LoginRequest) => {
        try {
            await loginUser(data)
        }
        catch (err) {
            console.log(err);
        }
    }
    const handleSignupUser = async (data: SignupRequest) => {
        try {
            await createUser(data)
        }
        catch (err) {
            console.log(err);
        }
    }
    return {
        handleOpenModal,
        handleCloseModal,
        showModal,
        handleLoginUser,
        isLoggingIn,
        handleShowSignupModal,
        handleCloseSignupModal,
        showSignupModal,
        handleSignupUser
    }
}
