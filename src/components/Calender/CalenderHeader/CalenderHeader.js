import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import {
  resetCurrentMonth,
  toggleNextPrevMonth,
} from '../../../redux/action/monthAction'

import EventList from '../../EventModel/EventList/EventList'

import { EventNote, ChevronLeft, ChevronRight } from '@mui/icons-material'
import dayjs from 'dayjs'

const CalenderHeader = () => {
  const dispatch = useDispatch()

  const calenderInfo = useSelector((state) => state.calenderInfo)
  const { monthIndex } = calenderInfo

  const handleResetMonth = () => {
    dispatch(resetCurrentMonth())
  }

  const handlePrevMonth = () => {
    dispatch(toggleNextPrevMonth(monthIndex - 1))
  }

  const handleNextMonth = () => {
    dispatch(toggleNextPrevMonth(monthIndex + 1))
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
    </BoxContainer>
  )
}

const BoxContainer = styled.div`
  ${tw`
    flex
    items-center
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
`

export default CalenderHeader
