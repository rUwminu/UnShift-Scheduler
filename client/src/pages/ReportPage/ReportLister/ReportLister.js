import React, { useState } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'

import { ArrowDropDown } from '@mui/icons-material'

// Child components
import SmallCalender from './SmallCalender/SmallCalender'

const ReportLister = () => {
  const [pickedDate, setPickedDate] = useState({
    startDate: '',
    endDate: '',
    isStartCalenderDrop: false,
    isEndCalenderDrop: false,
  })

  return (
    <BoxContainer>
      <div className="list-header">
        <h1>Scheduled Event</h1>
        <div className="datetime-picker-container">
          <div className="date-picker">
            <h2>From</h2>
            <p>01-01-2022</p>
            <ArrowDropDown className="icon" />
            <SmallCalender />
          </div>
          <span className="date-spacer" />
          <div className="date-picker">
            <h2>To</h2>
            <p>01-01-2022</p>
            <ArrowDropDown className="icon" />
          </div>
        </div>
      </div>
      <div className="list-body"></div>
    </BoxContainer>
  )
}

const BoxContainer = styled.div`
  ${tw`
    flex-grow
    flex
    flex-col
    items-start
    justify-start
    h-full
  `}

  .list-header {
    ${tw`
      flex
      flex-col
    `}

    h1 {
      ${tw`
        text-2xl
        font-semibold
        text-gray-900
      `}
    }

    .datetime-picker-container {
      ${tw`
        flex
        items-center
        justify-start
      `}

      .date-picker {
        ${tw`
          relative
          flex
          items-center
          font-semibold
          py-1
          px-2
          rounded-md
          cursor-pointer

          transition
          duration-200
          ease-in-out
        `}

        h2 {
          ${tw`
            mr-3
            text-gray-700
          `}
        }

        p {
          ${tw`
            text-gray-600
          `}
        }

        .icon {
          ${tw`
            ml-1
          `}
        }

        &:hover {
          ${tw`
            bg-gray-200
          `}
        }
      }

      .date-spacer {
        ${tw`
          mx-6
          h-[2px]
          w-10
          bg-gray-600
          rounded-xl
        `}
      }
    }
  }
`

export default ReportLister
