import React, { useRef } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import dayjs from 'dayjs'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import {
  setSelectEvent,
  setEventBoxPosition,
} from '../../../redux/action/eventAction'

// Svg
import { EmptyAmico } from '../../../assets/index'

const UserList = () => {
  const calenderInfo = useSelector((state) => state.calenderInfo)
  const { monthIndex } = calenderInfo

  const eventInfo = useSelector((state) => state.eventInfo)
  const {
    eventList,
    listListener: { isSelectedDate },
  } = eventInfo

  var tempArr = []
  var selectedDay
  const currentMonth = dayjs().month(monthIndex).format('MM')
  const currentYear = dayjs().month(monthIndex).format('YYYY')

  if (isSelectedDate !== '' && isSelectedDate !== null) {
    selectedDay = isSelectedDate.split('T')[0].slice(-2)

    tempArr = eventList.filter((e) => {
      var [year, month, day] = e.planDate.split('-')

      return (
        currentMonth === month &&
        currentYear === year &&
        selectedDay === day.slice(0, 2)
      )
    })
  } else {
    tempArr = eventList.filter((e) => {
      var [year, month] = e.planDate.split('-')

      return currentMonth === month && currentYear === year
    })
  }

  const cancelEvt = tempArr.filter((x) => x.isCancelled !== false)
  const compEvt = tempArr.filter((x) => x.isCompleted !== false)

  return (
    <>
      {tempArr.length > 0 ? (
        <ListContainer>
          <h2>All Schedule</h2>
          <div className="card-container">
            {tempArr.map((allEvt) => (
              <EventCard key={allEvt.id} allEvt={allEvt} />
            ))}
          </div>
        </ListContainer>
      ) : (
        <ListContainer>
          <h2>Seem Empty</h2>
          <div className="card-container">
            <img src={EmptyAmico} alt="empty-placeholder" />
          </div>
        </ListContainer>
      )}

      {compEvt.length > 0 && (
        <ListContainer>
          <h2>Completed Schedule</h2>
          <div className="card-container">
            {compEvt.map((allEvt) => (
              <EventCard key={allEvt.id} allEvt={allEvt} />
            ))}
          </div>
        </ListContainer>
      )}

      {cancelEvt.length > 0 && (
        <ListContainer>
          <h2>Cancelled Schedule</h2>
          <div className="card-container">
            {cancelEvt.map((allEvt) => (
              <EventCard key={allEvt.id} allEvt={allEvt} />
            ))}
          </div>
        </ListContainer>
      )}
    </>
  )
}

const EventCard = ({ allEvt }) => {
  const elementRef = useRef()
  const dispatch = useDispatch()

  const handleClick = (e) => {
    e.stopPropagation()

    const bounding = elementRef.current.getBoundingClientRect()

    const { innerWidth: width, innerHeight: height } = window

    let leftWidth = width - bounding.left
    let leftHeight = height - bounding.top

    const fixPosition = {
      top: bounding.top,
      bottom: bounding.bottom,
      left: bounding.left,
      right: bounding.right,
      isTooLeft: leftWidth > 850 ? true : false,
      isTooBottom: leftHeight <= 350 ? true : false,
    }

    dispatch(setEventBoxPosition(fixPosition))
    dispatch(setSelectEvent(allEvt))
  }

  return (
    <div
      ref={elementRef}
      className="card-evt card-comp-evt"
      onClick={(e) => handleClick(e)}
    >
      <div className="card-left">
        <h3>{allEvt.title}</h3>
        <span>{moment(allEvt.planDate).format('dddd, MMMM D')}</span>
      </div>
      <div className="card-right">
        <div
          className={`card-tag ${
            allEvt.isCancelled
              ? 'cancel-tag'
              : allEvt.isRescheduled
              ? 'resc-tag'
              : allEvt.isCompleted
              ? 'comp-tag'
              : 'fore-tag'
          } `}
        >
          {allEvt.isCancelled
            ? 'Cancelled'
            : allEvt.isRescheduled
            ? 'Rescheduled'
            : allEvt.isCompleted
            ? 'Completed'
            : 'Forecast'}
        </div>
      </div>
    </div>
  )
}

const ListContainer = styled.div`
  ${tw`
    flex
    flex-col
    items-center
    justify-center
    h-full
    min-w-[21rem]
    max-w-[21rem]

    font-semibold
  `}

  h2 {
    ${tw`
      self-start
      pb-2
      text-lg
    `}
  }

  .card-container {
    ${tw`
      flex
      flex-col
      items-start
      justify-start
      h-full
      max-h-[85vh]
      w-full
      pr-3
      pb-20

      overflow-y-scroll
      scrollbar-hide
    `}

    img {
      ${tw`
        py-14
        w-full
      `}
    }

    .card-evt {
      ${tw`
        flex
        items-center
        justify-between
        w-full
        mb-3
        py-2
        px-3
        border-l-4
        rounded-r-md
        cursor-pointer

        transition-all
        duration-[300ms]
        ease-in-out
      `}
      box-shadow: 5px 5px 12px 0px rgba(0,0,0,0.3);

      &:hover {
        box-shadow: 5px 5px 12px 0px rgba(0, 0, 0, 0.5);
      }

      .card-left {
        ${tw`
          ml-2
        `}

        h3 {
          ${tw``}
        }

        span {
          ${tw`
            text-sm
            text-gray-600
          `}
        }
      }

      .card-right {
        ${tw``}

        .card-tag {
          ${tw`
            w-28
            py-1
            text-center
            border-2
            rounded-md
          `}
        }

        .cancel-tag {
          ${tw`
            text-red-500
            border-red-500
          `}
        }

        .resc-tag {
          ${tw`
            text-yellow-500
            border-yellow-500
          `}
        }

        .comp-tag {
          ${tw`
            text-green-500
            border-green-500
          `}
        }

        .fore-tag {
          ${tw`
            text-purple-500
            border-purple-500
          `}
        }
      }
    }

    .card-all-evt {
      ${tw`
        border-blue-500
      `}
    }

    .card-resc-evt {
      ${tw`
        border-yellow-500
      `}
    }

    .card-comp-evt {
      ${tw`
        border-green-500
      `}
    }

    .card-cancel-evt {
      ${tw`
        border-red-500
      `}
    }
  }
`

export default UserList
