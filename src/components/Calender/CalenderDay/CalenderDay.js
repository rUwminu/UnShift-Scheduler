import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedDate } from '../../../redux/action/monthAction'
import { setSelectEvent } from '../../../redux/action/eventAction'

const CalenderDay = ({ day, rowIdx }) => {
  const dispatch = useDispatch()

  const [todayEvt, setTodayEvt] = useState([])

  const eventInfo = useSelector((state) => state.eventInfo)
  const { eventList } = eventInfo

  const getCurrentDay = () => {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') && 'active'
  }

  const handleSelectDateAndCreateEvent = () => {
    dispatch(setSelectedDate(day))
  }

  const handleSelectedEventAndShowModel = (data) => {
    dispatch(setSelectEvent(data))
  }

  const filterThisDayEvent = () => {
    const event = eventList.filter(
      (evt) => dayjs(evt.day).format('DD-MM-YY') === day.format('DD-MM-YY')
    )

    setTodayEvt(event)
  }

  useEffect(() => {
    if (eventList && eventList.length > 0) {
      filterThisDayEvent()
    }
  }, [eventList, day])

  return (
    <BoxContainer>
      <div className="header-container">
        {rowIdx === 0 && (
          <p className={`date-weekday`}>{day.format('ddd').toUpperCase()}</p>
        )}
        <p
          className={`date-day ${getCurrentDay()}`}
          onClick={() => handleSelectDateAndCreateEvent()}
        >
          {day.format('DD')}
        </p>
        <div className="evt-container">
          {todayEvt &&
            todayEvt.map((x, idx) => (
              <div
                key={idx}
                className="evt-dot"
                onClick={() => handleSelectedEventAndShowModel(x)}
              >
                <div className="evt-note-box">{x.title}</div>
              </div>
            ))}
        </div>
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
        h-full
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

      &:hover {
        ${tw`
          bg-gray-300
        `}
      }
    }

    .date-day.active {
      ${tw`
        bg-blue-500
        text-gray-50
      `}
    }
  }

  .evt-container {
    ${tw`
      flex
      items-center
      justify-start
      w-full
      px-2
      pt-2
      pb-4
      mt-auto
    `}

    .evt-dot {
      ${tw`
        relative
        w-4
        h-4
        mr-1
        bg-green-400
        rounded-full
        cursor-pointer

        transition-all
        duration-200
        ease-in-out
      `}

      .evt-note-box {
        ${tw`
          absolute
          bottom-0
          left-0
          py-1
          px-2
          min-w-[6rem]
          max-w-[8rem]
          text-sm
          opacity-0
          bg-green-600
          text-gray-50
          pointer-events-none
          rounded-md

          transition-all
          duration-200
          ease-in-out
        `}
      }

      &:hover {
        ${tw`
          bg-green-500
          z-10
        `}
        transform: scale(1.4);

        .evt-note-box {
          ${tw`
            opacity-100
            z-30
          `}
          transform: translateX(18px);
        }
      }
    }
  }
`

export default CalenderDay
