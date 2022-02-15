import React, { useEffect, useState, useRef } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { gql, useLazyQuery } from '@apollo/client'
import _ from 'lodash'
import dayjs from 'dayjs'

// Redux action
import {
  getSelfReportEventList,
  getOtherReportEventList,
  setSelectEvent,
  setEventBoxPosition,
} from '../../../../redux/action/eventAction'

const UserLister = ({ pickedDate }) => {
  const dispatch = useDispatch()

  const [renderList, setRenderList] = useState([])
  const [selectedEvtListState, setSelectedEvtListState] = useState([])

  const userSignIn = useSelector((state) => state.userSignIn)
  const { user } = userSignIn

  const eventInfo = useSelector((state) => state.eventInfo)
  const { eventReportList, eventReportFilterType } = eventInfo

  const [getSelfSelectedEventList, { data }] = useLazyQuery(
    GET_SELF_SELECTED_EVENT_LIST,
    {
      context: {
        headers: {
          Authorization: `Bearer${' '}${user && user.token}`,
        },
      },
    }
  )

  const handleGetEventList = () => {
    const startDate =
      pickedDate.startDate === 'All'
        ? ''
        : dayjs(pickedDate.startDate).format('YYYY-MM-DDTHH:mm:ss')
    const endDate =
      pickedDate.endDate === 'All'
        ? ''
        : dayjs(pickedDate.endDate).format('YYYY-MM-DDTHH:mm:ss')

    console.log(startDate + ' to ' + endDate)

    getSelfSelectedEventList({
      variables: {
        startDate,
        endDate,
      },
    })
  }

  const handleFormatEvtListGroupByDate = (evts) => {
    const tempArr = [...evts]

    var groupedByYear = _.groupBy(tempArr, (evt) => {
      return evt.planDate.substring(0, 4)
    })

    const EvtByYear = Object.keys(groupedByYear).map((x) => {
      var groupedByday = _.groupBy(groupedByYear[x], (evt) => {
        return evt.planDate.substring(0, 10)
      })

      const EvtByDate = Object.keys(groupedByday).map((evtDay) => {
        return {
          thisDay: evtDay,
          thisDayEvt: groupedByday[evtDay],
        }
      })

      return { year: x, evtList: EvtByDate }
    })

    // Test
    dispatch(getOtherReportEventList(EvtByYear))

    // Save a original cope
    setSelectedEvtListState(EvtByYear)

    // Trigger filter function
    handleAnyEvtFilterType(EvtByYear)
  }

  const handleAnyEvtFilterType = (allEvt) => {
    if (eventReportFilterType.length > 0) {
      // Filter the list
    } else {
      setRenderList(allEvt)
    }
  }

  const getCurrentDay = (day) => {
    const nowDate = dayjs().format('DD-MM-YY')
    const currDate = dayjs(day).format('DD-MM-YY')

    if (currDate === nowDate) {
      return 'active'
    } else {
      return null
    }
  }

  // Trigger API on picked Date
  useEffect(() => {
    handleGetEventList()
  }, [pickedDate])

  // API return data and format the data by year, month and date. then set state
  useEffect(() => {
    if (data && data.getSelfSelectedEvent) {
      dispatch(getSelfReportEventList(data.getSelfSelectedEvent))
    }
  }, [data])

  // After Redux get data pass to the function to perform event grouping by date
  useEffect(() => {
    if (eventReportList) handleFormatEvtListGroupByDate(eventReportList)
  }, [eventReportList])

  useEffect(() => {
    handleAnyEvtFilterType(selectedEvtListState)
  }, [eventReportFilterType])

  return (
    <BoxContainer>
      {renderList &&
        renderList.length > 0 &&
        renderList.map((ls, idx) => (
          <div key={idx} className="year-card">
            <h2>{ls.year}</h2>
            {ls.evtList.map((evtGroup, i) => (
              <div key={i} className="group-day-card">
                <div className="card-left">
                  <div
                    className={`date-day-icon-box ${getCurrentDay(
                      evtGroup.thisDay
                    )}`}
                  >
                    {dayjs(evtGroup.thisDay).format('DD')}
                  </div>
                  <div
                    className={`date-month-day ${getCurrentDay(
                      evtGroup.thisDay
                    )}`}
                  >
                    {dayjs(evtGroup.thisDay).format('MMM, ddd')}
                  </div>
                </div>

                <div className="evt-ls-container">
                  {evtGroup.thisDayEvt.map((evt) => (
                    <DayEventCard key={evt.id} event={evt} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
    </BoxContainer>
  )
}

const DayEventCard = ({ event }) => {
  const elementRef = useRef()
  const dispatch = useDispatch()

  const [isSelected, setIsSelected] = useState(false)

  const eventInfo = useSelector((state) => state.eventInfo)
  const { selectedEvent } = eventInfo

  const {
    customer: { personal, company },
    isCancelled,
    isCompleted,
    isRescheduled,
  } = event

  const handleSelectedEventAndShowModel = (e) => {
    e.stopPropagation()

    const bounding = elementRef.current.getBoundingClientRect()

    const { innerHeight: height } = window

    let leftHeight = height - bounding.top

    const fixPosition = {
      top: bounding.top,
      bottom: bounding.bottom,
      left: bounding.left + 260,
      right: bounding.right,
      isTooLeft: true,
      isTooBottom: leftHeight <= 350 ? true : false,
    }

    dispatch(setEventBoxPosition(fixPosition))
    dispatch(setSelectEvent(event))
  }

  useEffect(() => {
    if (selectedEvent && selectedEvent.id === event.id) {
      setIsSelected(true)
    } else {
      setIsSelected(false)
    }
  }, [selectedEvent])

  return (
    <DayCardContainer
      ref={elementRef}
      className={`${isSelected && 'active'}`}
      onClick={(e) => handleSelectedEventAndShowModel(e)}
    >
      <div className="evt-status-box">
        <div
          className={`evt-status-dot ${
            isCancelled
              ? 'cancel-dot'
              : isRescheduled
              ? 'resc-dot'
              : isCompleted
              ? 'comp-dot'
              : 'fore-dot'
          }`}
        />
        <div
          className={`evt-status-tag ${
            isCancelled
              ? 'cancel-tag'
              : isRescheduled
              ? 'resc-tag'
              : isCompleted
              ? 'comp-tag'
              : 'fore-tag'
          }`}
        >
          {isCancelled
            ? 'Cancelled'
            : isRescheduled
            ? 'Rescheduled'
            : isCompleted
            ? 'Completed'
            : 'Forecast'}
        </div>
      </div>
      <div className="evt-info-box">
        <div className="evt-info-company">{company}</div>
        <div className="evt-info-personal">{personal}</div>
      </div>
    </DayCardContainer>
  )
}

const GET_SELF_SELECTED_EVENT_LIST = gql`
  query getSelfSelectedEvent($startDate: String, $endDate: String) {
    getSelfSelectedEvent(startDate: $startDate, endDate: $endDate) {
      id
      title
      customer {
        cusId
        personal
        company
      }
      description
      planDate
      compDate
      isCompleted
      isRescheduled
      isCancelled
      remark
    }
  }
`

const BoxContainer = styled.div`
  ${tw`
    h-full
    w-full
    border
    border-gray-400
    overflow-y-scroll
    scrollbar-hide
  `}

  .year-card {
    ${tw`
        w-full
        flex
        flex-col
    `}

    h2 {
      ${tw`
        px-3
        text-lg
        text-gray-700
        font-semibold
      `}
    }

    .group-day-card {
      ${tw`
        flex
        items-start
        justify-start
        py-2
        px-3
        border-b
        border-gray-400
      `}

      .card-left {
        ${tw`
            flex
            items-center
            justify-start
            mr-6
            w-full
            max-w-[6.5rem]
        `}

        .date-day-icon-box {
          ${tw`
            flex
            items-center
            justify-center
            w-9
            h-9
            text-lg
            bg-gray-200
            rounded-full
          `}

          &.active {
            ${tw`
                font-semibold
                bg-blue-500
                text-gray-50
            `}
          }
        }

        .date-month-day {
          ${tw`
            ml-2
            text-sm
            font-semibold
            text-gray-600
          `}

          &.active {
            ${tw`
                text-blue-600
            `}
          }
        }
      }

      .evt-ls-container {
        ${tw`
            flex-grow
            flex
            flex-col
            mt-[0.05rem]
        `}
      }
    }
  }
`

const DayCardContainer = styled.div`
  ${tw`
    flex
    items-center
    justify-between
    py-1
    px-2
    rounded-3xl
    border
    border-gray-300
    cursor-pointer

    transition
    duration-200
    ease-in-out
  `}

  .evt-status-box {
    ${tw`
        flex
        items-center
        justify-start
        w-[20%]
    `}

    .evt-status-dot {
      ${tw`
        h-3
        w-3
        rounded-full
      `}

      &.cancel-dot {
        ${tw`
            bg-red-500
        `}
      }

      &.resc-dot {
        ${tw`
            bg-yellow-500
        `}
      }

      &.comp-dot {
        ${tw`
            bg-green-500
        `}
      }

      &.fore-dot {
        ${tw`
            bg-purple-500
        `}
      }
    }

    .evt-status-tag {
      ${tw`
        ml-3
        text-sm
        font-semibold
      `}

      &.cancel-tag {
        ${tw`
            text-red-500
        `}
      }

      &.resc-tag {
        ${tw`
            text-yellow-500
        `}
      }

      &.comp-tag {
        ${tw`
            text-green-500
        `}
      }

      &.fore-tag {
        ${tw`
            text-purple-500
        `}
      }
    }
  }

  .evt-info-box {
    ${tw`
        flex-grow
        flex
        items-center
        justify-between
    `}

    .evt-info-company {
      ${tw`
        flex-grow
        font-semibold
        text-gray-700
      `}
    }

    .evt-info-personal {
      ${tw`
        min-w-[12rem]
        text-sm
        font-semibold
        text-gray-600
      `}
    }
  }

  &.active {
    ${tw`
      z-10
    `}
    box-shadow: 2px 3px 15px 3px rgba(0,0,0,0.45);
  }
`

export default UserLister
