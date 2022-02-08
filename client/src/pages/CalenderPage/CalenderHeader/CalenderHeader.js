import React, { useState } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'

// Utils
import { getFirstCharaterOfUsername } from '../../../utils/GlobalUtils'

// Redux Action
import { signout } from '../../../redux/action/userAction'
import {
  resetCurrentMonth,
  toggleNextPrevMonth,
} from '../../../redux/action/monthAction'
import {
  toggleEventListOpen,
  toggleEventListClose,
} from '../../../redux/action/eventAction'

import { EventList } from '../../../components/index.js'

import {
  EventNote,
  ChevronLeft,
  ChevronRight,
  AssignmentInd,
  Logout,
} from '@mui/icons-material'

const CalenderHeader = () => {
  const dispatch = useDispatch()

  const [isDropActive, setIsDropActive] = useState(false)

  const userSignIn = useSelector((state) => state.userSignIn)
  const { user } = userSignIn

  const calenderInfo = useSelector((state) => state.calenderInfo)
  const { monthIndex } = calenderInfo

  const eventInfo = useSelector((state) => state.eventInfo)
  const { listListener } = eventInfo

  const handleResetMonth = () => {
    dispatch(resetCurrentMonth())
  }

  const handlePrevMonth = () => {
    dispatch(toggleNextPrevMonth(monthIndex - 1))
  }

  const handleNextMonth = () => {
    dispatch(toggleNextPrevMonth(monthIndex + 1))
  }

  const handleUserLogout = () => {
    dispatch(signout())
  }

  const handleToggleListOpenNCose = () => {
    if (!listListener.isListOpen) {
      dispatch(toggleEventListOpen(null))
    } else {
      dispatch(toggleEventListClose())
    }
  }

  return (
    <BoxContainer>
      <EventList />
      <div className="left-container">
        <div className="logo-box">
          <EventNote className="logo-icon" />
          <h1 className="logo-title">
            <span>Un</span>Shift
          </h1>
        </div>
        <div className="date-control-box">
          <div className="today-btn" onClick={() => handleResetMonth()}>
            Today
          </div>
          <div className="mth-btn">
            <div className="prev-btn btn" onClick={() => handlePrevMonth()}>
              <ChevronLeft className="icon" />
            </div>
            <div className="next-btn btn" onClick={() => handleNextMonth()}>
              <ChevronRight className="icon" />
            </div>
          </div>
          <h1 className="cur-month">
            {dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}
          </h1>
        </div>
      </div>
      <div
        className={`right-container ${
          listListener && listListener.isListOpen && 'active'
        }`}
      >
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
            <div className="option-item">
              <span>Profile</span>
              <AssignmentInd className="icon" />
            </div>
            <div className="option-item" onClick={() => handleUserLogout()}>
              <span>Logout</span>
              <Logout className="icon" />
            </div>
          </div>
        </UserIcon>

        <Burger
          className={`menu ${
            listListener && listListener.isListOpen && 'line-active'
          }`}
          onClick={() => handleToggleListOpenNCose()}
        >
          <div className={`line-1`} />
          <div className={`line-2`} />
          <div className={`line-3`} />
        </Burger>
      </div>
    </BoxContainer>
  )
}

const BoxContainer = styled.div`
  ${tw`
    flex
    items-center
    justify-between
    px-4
    py-3
  `}

  .left-container {
    ${tw`
      flex
      items-center
      justify-center

      text-gray-700
    `}

    .logo-box {
      ${tw`
      flex
      items-center
      justify-center
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

    .date-control-box {
      ${tw`
        flex
        items-center
        justify-center
        mx-12
      `}

      .today-btn {
        ${tw`
          py-[5px]
          px-4
          text-sm
          md:text-base
          font-semibold
          border
          border-gray-200
          rounded-md
          cursor-pointer

          transition
          duration-200
          ease-in-out
        `}

        &:hover {
          ${tw`
            shadow-md
            border-gray-400
          `}
        }
      }

      .mth-btn {
        ${tw`
          flex
          items-center
          justify-center
          mx-4
        `}

        .btn {
          ${tw`
            flex
            items-center
            justify-center
            h-8
            w-8
            p-1
            rounded-full
            cursor-pointer

            transition
            duration-200
            ease-in-out
          `}

          &:hover {
            ${tw`
              bg-gray-200
            `}
          }

          .icon {
            ${tw`
              w-full
              h-full
              text-gray-600
              pointer-events-none
            `}
          }
        }
      }
    }

    .cur-month {
      ${tw`
        text-lg
        md:text-xl
        font-semibold
      `}
    }
  }

  .right-container {
    ${tw`
      flex
      items-center
      justify-center
      z-10
    `}

    .line-active {
      .line-1 {
        transform: rotate(-45deg) translate(-6px, 6px);
      }

      .line-2 {
        opacity: 0;
        transform: translate(100%);
      }

      .line-3 {
        width: 1.5rem;
        transform: rotate(45deg) translate(-5px, -5px);
      }
    }
  }

  .right-container.active {
    ${tw`
      z-30
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
      w-36
      h-[8.5rem]
      opacity-100
      pointer-events-auto
    `}
  }
`

const Burger = styled.div`
  ${tw`
    ml-2
    h-10
    w-10
    p-2
    flex
    flex-col
    items-start
    justify-around
    cursor-pointer
    bg-opacity-90
    hover:bg-gray-200
    rounded-full
    transition
    duration-200
    ease-in-out
    z-30
  `}

  div {
    ${tw`
      w-6
      h-[2px]
      bg-gray-900
      transition
      duration-200
      ease-in-out
    `}
  }

  div:nth-child(3) {
    ${tw`
      w-4
    `}
  }
`

export default CalenderHeader
