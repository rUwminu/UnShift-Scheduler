import React from 'react'
import dayjs from 'dayjs'
import tw from 'twin.macro'
import styled from 'styled-components'

const CalenderDay = ({ day, rowIdx }) => {
  const getCurrentDay = () => {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') && 'active'
  }

  return (
    <BoxContainer>
      <div className="header-container">
        {rowIdx === 0 && (
          <p className={`date-weekday`}>{day.format('ddd').toUpperCase()}</p>
        )}
        <p className={`date-day ${getCurrentDay()}`}>{day.format('DD')}</p>
      </div>
    </BoxContainer>
  )
}

const BoxContainer = styled.div`
  ${tw`
    border
    cursor-pointer

    transition
    duration-200
    ease-in-out
  `}

  &:hover {
    ${tw`
        border-gray-400
    `}
  }

  .header-container {
    ${tw`
        flex
        flex-col
        items-center
    `}

    .date-weekday {
      ${tw`
        text-sm
        font-semibold
        text-gray-700
      `}
    }

    .date-day {
      ${tw`
        flex
        items-center
        justify-center
        w-6
        h-6
        my-1
        text-sm
        text-center
        font-semibold
        rounded-full
      `}
    }

    .date-day.active {
      ${tw`
        bg-blue-500
        text-gray-50
      `}
    }
  }
`

export default CalenderDay
