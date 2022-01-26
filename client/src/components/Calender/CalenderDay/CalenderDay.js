import React, { useEffect, useState, useRef } from 'react'
import dayjs from 'dayjs'
import moment from 'moment'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedDate } from '../../../redux/action/monthAction'
import {
  setSelectEvent,
  setEventBoxPosition,
  toggleEventListOpen,
} from '../../../redux/action/eventAction'

const CalenderDay = ({ day, rowIdx }) => {
  const dispatch = useDispatch()

  const [todayEvt, setTodayEvt] = useState([])

  const eventInfo = useSelector((state) => state.eventInfo)
  const { eventList, eventFilterType } = eventInfo

  const getCurrentDay = () => {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') && 'active'
  }

  const handleSelectDateAndCreateEvent = (e) => {
    e.stopPropagation()
    dispatch(setSelectedDate(day))
  }

  const handleToggleListOpen = (e) => {
    e.stopPropagation()
    dispatch(toggleEventListOpen(day.format('YYYY-MM-DDTHH:mm:ss')))
  }

  const filterThisDayEvent = () => {
    const event = eventList.filter(
      (evt) =>
        moment(evt.planDate).format('DD-MM-YY') === day.format('DD-MM-YY')
    )

    if (eventFilterType.length === 4) {
      setTodayEvt([])
    } else if (eventFilterType.length > 0 && eventFilterType.length < 4) {
      var tempArr = event
      eventFilterType.forEach((type) => {
        if (type === 'Completed') {
          tempArr = tempArr.filter((x) =>
            x.isCancelled ? x : x.isRescheduled ? x : x.isCompleted !== true
          )
        } else if (type === 'Forecast') {
          tempArr = tempArr.filter((x) =>
            x.isCancelled ? x : x.isRescheduled ? x : x.isCompleted !== false
          )
        } else if (type === 'Cancelled') {
          tempArr = tempArr.filter((x) =>
            x.isRescheduled ? x : x.isCancelled !== true
          )
        } else if (type === 'Rescheduled') {
          tempArr = tempArr.filter((x) => x.isRescheduled !== true)
        }
      })

      setTodayEvt(tempArr)
    } else {
      setTodayEvt(event)
    }
  }

  useEffect(() => {
    if (eventList && eventList.length > 0) {
      filterThisDayEvent()
    }
  }, [eventList, day, eventFilterType])

  return (
    <BoxContainer onClick={(e) => handleToggleListOpen(e)}>
      <div className="header-container">
        {rowIdx === 0 && (
          <p className={`date-weekday`}>{day.format('ddd').toUpperCase()}</p>
        )}
        <p
          className={`date-day ${getCurrentDay()}`}
          onClick={(e) => handleSelectDateAndCreateEvent(e)}
        >
          {day.format('DD')}
        </p>
        <div className="evt-container">
          {todayEvt && todayEvt.map((x, idx) => <EvtDot key={idx} x={x} />)}
        </div>
      </div>
    </BoxContainer>
  )
}

const EvtDot = ({ x }) => {
  const elementRef = useRef()
  const dispatch = useDispatch()

  const handleSelectedEventAndShowModel = (e, evtInfo) => {
    e.stopPropagation()

    const bounding = elementRef.current.getBoundingClientRect()

    dispatch(setEventBoxPosition(bounding))
    dispatch(setSelectEvent(evtInfo))
  }

  return (
    <div
      ref={elementRef}
      className={`evt-dot ${
        x.isCancelled
          ? 'bg-red-400'
          : x.isRescheduled
          ? 'bg-amber-400'
          : x.isCompleted
          ? 'bg-green-400'
          : 'bg-purple-400'
      }`}
      onClick={(e) => handleSelectedEventAndShowModel(e, x)}
    >
      <div
        className={`evt-note-box ${
          x.isCancelled
            ? 'bg-red-600'
            : x.isRescheduled
            ? 'bg-amber-400'
            : x.isCompleted
            ? 'bg-green-400'
            : 'bg-purple-400'
        }`}
      >
        {x.title}
      </div>
    </div>
  )
}

const BoxContainer = styled.div`
  ${tw`
    relative
    border

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
        inline-block
        flex
        flex-col
        items-center
        bg-none
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
      relative
      flex
      items-center
      justify-start
      py-2
      px-3
      w-full
      mt-auto
    `}

    .evt-dot {
      ${tw`
        relative
        w-[1rem]
        h-[1rem]
        mr-1
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
          transform: translateX(calc(-100% + -3px));
        }
      }
    }
  }
`

export default CalenderDay
