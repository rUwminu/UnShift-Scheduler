import React, { useState, useEffect, useRef } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import dayjs from 'dayjs'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import {
  setSelectEvent,
  setEventBoxPosition,
} from '../../../redux/action/eventAction'

const ManagerList = () => {
  const [selfEvt, setSelfEvt] = useState([])
  const [otherEvt, setOtherEvt] = useState([])

  const calenderInfo = useSelector((state) => state.calenderInfo)
  const { monthIndex } = calenderInfo

  const eventInfo = useSelector((state) => state.eventInfo)
  const {
    eventList,
    eventOtherList,
    listListener: { isListOpen, isSelectedDate },
  } = eventInfo

  const handleFilterSelfEvent = () => {
    var event = []
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

    if (eventOtherList && eventOtherList.length > 0) {
      if (isSelectedDate !== null) {
        event = eventOtherList
          .filter(
            (evt) =>
              moment(evt.planDate).format('DD-MM-YY') ===
              moment(isSelectedDate).format('DD-MM-YY')
          )
          .reduce((acc, obj) => {
            const {
              user: { username },
            } = obj

            if (!acc[username]) {
              acc[username] = []
            }

            acc[username].push(obj)

            return acc
          }, {})
      } else {
        event = eventOtherList.reduce((acc, obj) => {
          const {
            user: { username },
          } = obj

          if (!acc[username]) {
            acc[username] = []
          }

          acc[username].push(obj)

          return acc
        }, {})
      }

      const objToArr = Object.keys(event).map((key) => {
        return { username: key, eventList: event[key] }
      })

      setOtherEvt(objToArr)
    }
    setSelfEvt(tempArr)
  }

  useEffect(() => {
    handleFilterSelfEvent()
  }, [isListOpen, eventList, eventOtherList, isSelectedDate])

  return (
    <BoxContainer>
      <div className="inner-container">
        {selfEvt && <ListBox title={'My Schedule'} eventList={selfEvt} />}
        {otherEvt &&
          otherEvt.map((evt, idx) => (
            <ListBox key={idx} title={evt.username} eventList={evt.eventList} />
          ))}
      </div>
    </BoxContainer>
  )
}

const ListBox = ({ title, eventList }) => {
  const [isHide, setIsHide] = useState(false)

  return (
    <div className={`list-box ${isHide && 'hide'}`}>
      <h2 className="list-title" onClick={() => setIsHide(!isHide)}>
        {title}
      </h2>
      <div className="list-item-box">
        {eventList && eventList.length > 0 && (
          <>
            <ListContainer>
              <h2>All Plan</h2>
              <div className="card-container">
                {eventList.map((allEvt) => (
                  <EventCard key={allEvt.id} allEvt={allEvt} cardType={'All'} />
                ))}
              </div>
            </ListContainer>
            <ListContainer>
              <h2>Completed Plan</h2>
              <div className="card-container">
                {eventList
                  .filter((x) => x.isCompleted !== false)
                  .map((allEvt) => (
                    <EventCard
                      key={allEvt.id}
                      allEvt={allEvt}
                      cardType={'Completed'}
                    />
                  ))}
              </div>
            </ListContainer>
          </>
        )}
      </div>
    </div>
  )
}

const EventCard = ({ allEvt, cardType }) => {
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
      className={`card-evt ${
        cardType === 'All' ? 'card-all-evt' : 'card-comp-evt'
      }`}
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
              : allEvt.isCompleted
              ? 'comp-tag'
              : 'fore-tag'
          } `}
        >
          {allEvt.isCancelled
            ? 'Cancelled'
            : allEvt.isCompleted
            ? 'Completed'
            : 'Forecast'}
        </div>
      </div>
    </div>
  )
}

const BoxContainer = styled.div`
  ${tw`
      w-full
      h-full
    `}

  .inner-container {
    ${tw`
        flex
        items-center
        justify-start
        mx-auto
        h-full
        w-full
        max-w-6xl
        overflow-x-scroll
        scrollbar-hide
      `}

    .list-box {
      ${tw`
        relative
        flex
        flex-col
        justify-start
        items-center
        mr-3
        h-full
        min-w-[20rem]
        max-w-[20rem]
        border-r
        border-gray-400
        overflow-hidden

        transition-all
        duration-500
        ease-in-out
    `}

      .list-title {
        ${tw`
            flex
            items-center
            justify-start
            border-gray-400
            py-3
            w-full
            text-xl
            font-semibold
            cursor-pointer

            transition-all
            duration-500
            ease-in-out
          `}
      }

      .list-item-box {
        ${tw`
            flex
            items-start
            justify-between
            w-full
            h-full
        `}
      }
    }

    .list-box.hide {
      ${tw`
          h-full
          max-w-[3rem]
          min-w-[3rem] 
        `}

      .list-title {
        ${tw`
            py-0
            text-base
        `}
        width: 8rem;
        height: 3rem;
        transform: translateY(70px) rotate(90deg);
      }

      .list-item-box {
        ${tw`
            opacity-0
            pointer-events-none
        `}
      }
    }
  }
`

const ListContainer = styled.div`
  ${tw`
    flex
    flex-col
    items-center
    justify-center
    h-full
    w-full

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
      pb-28
      pr-3

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
        flex-col
        items-start
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
          ml-0
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
            mt-1
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

export default ManagerList
