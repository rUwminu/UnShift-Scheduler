import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

// Redux Action
import { addEventFilterType } from '../../../../redux/action/eventAction'

const EventFilterCheckBox = () => {
  const dispatch = useDispatch()

  const eventInfo = useSelector((state) => state.eventInfo)
  const { eventFilterType } = eventInfo

  const handleAddFilterType = (type) => {
    dispatch(addEventFilterType(type))
  }

  return (
    <BoxContainer>
      <div className="header-container">
        <h3>My Calender</h3>
      </div>
      <div className="body-container">
        <div
          className="check-item"
          onClick={() => handleAddFilterType('Completed')}
        >
          <div
            className={`check-box comp-check-box ${
              eventFilterType.includes('Completed') && 'in-active'
            }`}
          />
          <span>Completed</span>
        </div>
        <div
          className="check-item"
          onClick={() => handleAddFilterType('Forecast')}
        >
          <div
            className={`check-box fore-check-box ${
              eventFilterType.includes('Forecast') && 'in-active'
            }`}
          />
          <span>Forecast</span>
        </div>
        <div
          className="check-item"
          onClick={() => handleAddFilterType('Cancelled')}
        >
          <div
            className={`check-box cancel-check-box ${
              eventFilterType.includes('Cancelled') && 'in-active'
            }`}
          />
          <span>Cancelled</span>
        </div>
        <div
          className="check-item"
          onClick={() => handleAddFilterType('Rescheduled')}
        >
          <div
            className={`check-box resc-check-box ${
              eventFilterType.includes('Rescheduled') && 'in-active'
            }`}
          />
          <span>Rescheduled</span>
        </div>
      </div>
    </BoxContainer>
  )
}

const BoxContainer = styled.div`
  ${tw`
    mb-4
    w-full
  `}

  .header-container {
    ${tw`
        w-full
    `}

    h3 {
      ${tw`
        pl-[0.7rem]
        text-base
        font-semibold
        text-gray-600
      `}
    }
  }

  .body-container {
    ${tw`
        flex
        flex-col
        w-full
    `}

    .check-item {
      ${tw`
        flex
        items-center
        justify-start
        w-full
        py-1
        pl-[0.7rem]
        cursor-pointer

        transition-all
        duration-200
        ease-in-out
      `}

      .check-box {
        ${tw`
            h-5
            w-5
            border-2
            rounded-md

            transition
            duration-200
            ease-in-out
        `}
      }

      .comp-check-box {
        ${tw`
            bg-green-500
            border-green-500
        `}
      }

      .fore-check-box {
        ${tw`
            bg-purple-500
            border-purple-500
        `}
      }

      .cancel-check-box {
        ${tw`
          bg-red-500
          border-red-500
        `}
      }

      .resc-check-box {
        ${tw`
          bg-yellow-500
          border-yellow-500
        `}
      }

      .check-box.in-active {
        ${tw`
            bg-transparent
        `}
      }

      span {
        ${tw`
          ml-3
          font-semibold
          text-gray-700
          pointer-events-none

          transition-all
          duration-200
          ease-in-out
        `}
      }

      &:hover {
        span {
          ${tw`
            text-lg
            text-gray-900
          `}
        }
      }
    }
  }
`

export default EventFilterCheckBox
