import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

// Utils
import { getFirstCharaterOfUsername } from '../../utils/GlobalUtils'

// Redux Action
import { signout } from '../../redux/action/userAction'

import {
  EventNote,
  AssignmentInd,
  Summarize,
  Logout,
} from '@mui/icons-material'

const Header = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  const [isDropActive, setIsDropActive] = useState(false)

  const userSignIn = useSelector((state) => state.userSignIn)
  const { user } = userSignIn

  const handleUserLogout = () => {
    dispatch(signout())
  }

  return (
    <>
      {user && location.pathname !== '/' && (
        <BoxContainer>
          <div className="left-container">
            <Link to={`/`} className="logo-box">
              <EventNote className="logo-icon" />
              <h1 className="logo-title">
                <span>Un</span>Shift
              </h1>
            </Link>
            <div className="nav-links">
              <Link to={`/`} className="link-item">
                Back To Schedule
              </Link>
              <Link to={`/report`} className="link-item">
                View Report
              </Link>
              <Link to={`/info/type?name=contact`} className="link-item">
                Customer Contact
              </Link>
            </div>
          </div>
          <div className={`right-container`}>
            <UserIcon>
              <span
                className="user-name"
                onClick={() => setIsDropActive(!isDropActive)}
              >
                {getFirstCharaterOfUsername(user.username)}
              </span>
              <div
                className={`drop-option ${isDropActive && 'active'}`}
                onMouseLeave={() => setIsDropActive(false)}
              >
                <h2>Option</h2>
                <Link to={`/profile`} className="option-item">
                  <span>Profile</span>
                  <AssignmentInd className="icon" />
                </Link>
                <Link to={`/report`} className="option-item">
                  <span>Report</span>
                  <Summarize className="icon" />
                </Link>
                <div className="option-item" onClick={() => handleUserLogout()}>
                  <span>Logout</span>
                  <Logout className="icon" />
                </div>
              </div>
            </UserIcon>
          </div>
        </BoxContainer>
      )}
    </>
  )
}

const BoxContainer = styled.div`
  ${tw`
    fixed
    top-0
    left-0
    flex
    items-center
    justify-between
    w-full
    px-4
    py-3
    bg-white
    shadow-md
    z-30
  `}

  .left-container {
    ${tw`
      flex
      items-center
      justify-start
      w-full
      text-gray-700
    `}

    .logo-box {
      ${tw`
        flex
        items-center
        justify-start
        w-full
        max-w-[12rem]
      `}

      .logo-icon {
        ${tw`
        w-10
        h-10
        p-1
        text-blue-600
      `}
      }

      .logo-title {
        ${tw`
        text-xl
        md:text-2xl
        font-semibold
      `}

        span {
          ${tw`
          text-blue-600
        `}
        }
      }
    }

    .nav-links {
      ${tw`
        flex
        items-center
        justify-start
      `}

      .link-item {
        ${tw`
          relative
          mr-6
          pr-2
          py-1
          font-semibold
          text-gray-600

          transition-all
          duration-200
          ease-in-out
        `}

        &::after {
          content: '';
          ${tw`
            absolute
            left-0
            bottom-0
            h-[2.6px]
            w-0
            bg-blue-600

            transition-all
            duration-200
            ease-in-out
          `}
        }

        &:hover {
          ${tw`
            text-gray-900
          `}

          &::after {
            ${tw`
              w-full
            `}
          }
        }
      }
    }
  }

  .right-container {
    ${tw`
      flex
      items-center
      justify-center
      z-10
    `}
  }
`

const UserIcon = styled.div`
  ${tw`
    relative
    flex
    items-center
    justify-center
    w-11
    h-11
    rounded-full
  `}

  &:hover {
    .user-name {
      ${tw`
        border-gray-300
      `}
    }
  }

  .user-name {
    ${tw`
      flex
      items-center
      justify-center
      w-full
      h-full
      border-4
      font-semibold
      bg-purple-600
      text-gray-50
      rounded-full
      cursor-pointer

      transition
      duration-200
      ease-in-out
    `}
  }

  .drop-option {
    ${tw`
      absolute
      bottom-0
      right-0
      p-2
      h-0
      w-0
      opacity-0
      font-semibold
      bg-white
      rounded-md
      overflow-hidden
      pointer-events-none

      transition-all
      duration-200
      ease-in-out
    `}
    box-shadow: 2px 3px 15px 3px rgba(0,0,0,0.2);
    transform: translateY(103%);

    h2 {
      ${tw`
        mb-1
        text-lg
        text-gray-900
      `}
    }

    .option-item {
      ${tw`
        flex
        items-center
        justify-between
        py-2
        px-2
        w-full
        bg-gray-50
        text-gray-600
        rounded-md
        cursor-pointer

        transition
        duration-200
        ease-in-out
      `}

      .icon {
        ${tw`
          h-5
          w-5
        `}
      }

      &:hover {
        ${tw`
          bg-gray-200
          text-gray-800
        `}
      }
    }
  }

  .drop-option.active {
    ${tw`
      w-40
      h-[10.5rem]
      opacity-100
      pointer-events-auto
    `}
  }
`

export default Header
