import React, { useState, useEffect } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { Link, useSearchParams } from 'react-router-dom'

// Redux
import { useSelector } from 'react-redux'
//import { removeItemFromCart } from "../../redux/actions/orderAction";

// Form Components
import MyProfile from './MyProfile/MyProfile'
import MyContact from './MyContact/MyContact'

// Material ui icons
import { AssignmentInd, Bookmarks } from '@mui/icons-material'

const InfoPage = () => {
  const [isMobile, setIsMobile] = useState()
  const [searchParams, setSearchParams] = useSearchParams()
  const name = searchParams.get('name')

  const [optionType, setOptionType] = useState('profile')

  const userSignIn = useSelector((state) => state.userSignIn)
  const { user } = userSignIn

  const handleResize = () => {
    if (window.innerWidth < 624) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  useEffect(() => {
    let isMounted = true
    if (isMounted && user && name) setOptionType(name)

    return () => {
      isMounted = false
    }
  }, [name, user])

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      handleResize()
      window.addEventListener('resize', handleResize)
    }

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <MainContainer>
      <div className="inner-container">
        <SideBarContainer
          className={`${isMobile ? 'w-20' : 'w-48 min-w-[12rem]'}`}
        >
          <div className="sticky-container">
            <Link
              to="/info/type?name=profile"
              className={`option-item ${optionType === 'profile' && 'active'} ${
                isMobile && 'icon-box'
              }`}
            >
              <AssignmentInd className="option-icon" />
              <h2 className={`${isMobile ? 'hidden' : 'inline-flex'}`}>
                My Profile
              </h2>
            </Link>

            <Link
              to="/info/type?name=contact"
              className={`option-item ${optionType === 'contact' && 'active'} ${
                isMobile && 'icon-box'
              }`}
            >
              <Bookmarks className="option-icon" />
              <h2 className={`${isMobile ? 'hidden' : 'inline-flex'}`}>
                My Contact Book
              </h2>
            </Link>
          </div>
        </SideBarContainer>
        <FormContainer>
          {optionType === 'profile' && <MyProfile />}
          {optionType === 'contact' && <MyContact />}
        </FormContainer>
      </div>
    </MainContainer>
  )
}

const MainContainer = styled.div`
  ${tw`
    pt-24
    pb-20
    px-4
    lg:px-0
    h-screen
    w-full
    overflow-y-scroll
    overflow-x-hidden

  `}

  .inner-container {
    ${tw`
        flex
        items-start
        justify-start
        mx-auto
        h-full
        w-full
        max-w-6xl
    `}
  }
`

const SideBarContainer = styled.div`
  ${tw`
    relative
    mr-4
    md:mr-8
    h-screen

    transition-all
    duration-500
    ease-in-out
  `}

  .sticky-container {
    ${tw`
      sticky
      top-0
      left-0
      w-full
    `}
  }

  .option-item {
    ${tw`
        mb-2
        py-2
        px-3
        flex
        items-center
        justify-start
        text-gray-600
        rounded-md
        cursor-pointer

        transition-all
        duration-200
        ease-in-out
    `}

    .option-icon {
      ${tw`
        mr-2
      `}
    }

    h2 {
      ${tw`
        font-semibold
      `}
    }

    :hover {
      ${tw`
        bg-opacity-20
        bg-gray-200
      `}
    }
  }

  .option-item.active {
    ${tw`
        bg-gray-200
        text-gray-700
    `}
  }

  .option-item.icon-box {
    ${tw`
        w-14
        h-14
        justify-center
    `}

    .option-icon {
      ${tw`
        mr-0
      `}
    }
  }
`

const FormContainer = styled.div`
  ${tw`
    w-full
    flex
    flex-col
    items-start
    justify-start
    py-5
    sm:py-10
    px-4
    sm:px-8
    bg-white
    rounded-md

    transition-all
    duration-500
    ease-in-out

    overflow-hidden
  `}
  box-shadow: 2px 3px 15px 3px rgba(0, 0, 0, 0.2);
`

export default InfoPage
