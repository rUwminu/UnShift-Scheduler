import React, { useState } from 'react'
import dayjs from 'dayjs'
import tw from 'twin.macro'
import styled from 'styled-components'

import { ArrowDropDown } from '@mui/icons-material'

// Child components
import SmallCalender from './SmallCalender/SmallCalender'
import UserLister from './UserLister/UserLister'
import ManagerLister from './ManagerLister/ManagerLister'

const ReportLister = () => {
  const [pickedDate, setPickedDate] = useState({
    startDate: dayjs().format('DD-MM-YY'),
    endDate: 'All',
  })
  const [pickerControl, setPickerControl] = useState({
    isStartCalenderDrop: false,
    isEndCalenderDrop: false,
  })

  return (
    <BoxContainer>
      <div className="list-header">
        <h1>Scheduled Event</h1>
        <div className="datetime-picker-container">
          <div
            className="date-picker"
            onClick={() =>
              setPickerControl({
                isStartCalenderDrop: !pickedDate.isStartCalenderDrop,
                isEndCalenderDrop: false,
              })
            }
          >
            <h2>From</h2>
            <p>{pickedDate.startDate}</p>
            <ArrowDropDown className="icon" />
            <SmallCalender
              isOpen={pickerControl.isStartCalenderDrop}
              setPickedDate={setPickedDate}
              pickedDate={pickedDate}
              setPickerControl={setPickerControl}
              isStart={true}
              isEnd={false}
            />
          </div>
          <span className="date-spacer" />
          <div
            className="date-picker"
            onClick={() =>
              setPickerControl({
                isStartCalenderDrop: false,
                isEndCalenderDrop: !pickedDate.isEndCalenderDrop,
              })
            }
          >
            <h2>To</h2>
            <p>{pickedDate.endDate}</p>
            <ArrowDropDown className="icon" />
            <SmallCalender
              isOpen={pickerControl.isEndCalenderDrop}
              setPickedDate={setPickedDate}
              pickedDate={pickedDate}
              setPickerControl={setPickerControl}
              pickerControl={pickerControl}
              isStart={false}
              isEnd={true}
            />
          </div>
        </div>
      </div>
      <div className="list-body">
        <UserLister pickedDate={pickedDate} />
      </div>
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
            min-w-[4.5rem]
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

  .list-body {
    ${tw`
      w-full
      h-full
    `}
  }
`

export default ReportLister
