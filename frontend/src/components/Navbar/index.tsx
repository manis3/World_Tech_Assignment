import React, { useState } from 'react'
import SearchComponent from '../SearchBar'
import Image from 'next/image'
import blogImage from '../../assets/Blog_Image.png'
import RouteMap from './routes'
import { routes } from '../consts/routes'
import useLogin from '@/hooks/login/useLogin'
import LoginModal from '../loginModal/loginModal'
import Button from '../ui/Button/ButtonWithLoadingState'
import SignupModal from '../signupModal/signupModal'

const NavBar = ({ pathname }: { pathname: string }) => {

  const { handleOpenModal, handleCloseModal, showModal, handleLoginUser, isLoggingIn, showSignupModal, handleShowSignupModal, handleCloseSignupModal, handleSignupUser } = useLogin();

  return (
    <div className='flex item-center justify-between bg-white px-4 py-3'>
      <div className="flex items-center justify-between gap-12 pl-24">
        <div className="relative w-[40px] h-[40px]">
          <Image
            src={blogImage}
            layout="fill"
            objectFit="cover"
            alt="Picture of the author"
          />
        </div>
        <div className="flex items-center gap-8">
          <SearchComponent />
        </div>
      </div>
      <div className='flex items-center justify-center gap-52 pr-24'>
        <div className='flex gap-20 '>
          <RouteMap pathname={pathname} routes={routes} />
        </div>
        <div className='flex gap-4'>
          <Button onClick={handleOpenModal} loading={false} className="capitalize w-[calc(100%/2)] lg:w-full px-3 lg:px-8">Login</Button>
          <Button variant={'link'} onClick={
            handleShowSignupModal
          }>Signup</Button>
        </div>


      </div>
      <LoginModal
        show={showModal}
        closeModal={handleCloseModal}
        handleloginUser={handleLoginUser}
        isLoggingIn={isLoggingIn}
        title={"Login"}
        showCloseIcon={true}
        className='w-[450px]'

      />
      <SignupModal
        show={showSignupModal}
        closeModal={handleCloseSignupModal}
        handleSignupUser={handleSignupUser}
        isLoggingIn={isLoggingIn}
        title={"SignUp"}
        showCloseIcon={true}
        className='w-[450px]'

      />

    </div >
  )
}

export default NavBar
