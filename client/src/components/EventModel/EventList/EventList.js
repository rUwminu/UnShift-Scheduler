import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import dayjs from 'dayjs'
import moment from 'moment'
import { useSelector } from 'react-redux'

// Svg
import { EmptyAmico } from '../../../assets/index'

const EventList = () => {
  const calenderInfo = useSelector((state) => state.calenderInfo)
  const { monthIndex } = calenderInfo

  const eventInfo = useSelector((state) => state.eventInfo)
  const {
    eventList,
    listListener: { isListOpen, isSelectedDate },
  } = eventInfo

  const FilterEventAndRender = () => {
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
                <div key={allEvt.id} className="card-evt card-all-evt">
                  <div className="card-left">
                    <h3>{allEvt.title}</h3>
                    <span>
                      {moment(allEvt.planDate).format('dddd, MMMM D')}
                    </span>
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
                <div key={allEvt.id} className="card-evt card-comp-evt">
                  <div className="card-left">
                    <h3>{allEvt.title}</h3>
                    <span>
                      {moment(allEvt.planDate).format('dddd, MMMM D')}
                    </span>
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
              ))}
            </div>
          </ListContainer>
        )}

        {cancelEvt.length > 0 && (
          <ListContainer>
            <h2>Cancelled Schedule</h2>
            <div className="card-container">
              {cancelEvt.map((allEvt) => (
                <div key={allEvt.id} className="card-evt card-cancel-evt">
                  <div className="card-left">
                    <h3>{allEvt.title}</h3>
                    <span>
                      {moment(allEvt.planDate).format('dddd, MMMM D')}
                    </span>
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
              ))}
            </div>
          </ListContainer>
        )}
      </>
    )
  }

  return (
    <BoxContainer isListOpen={isListOpen}>
      <div className="header-box">
        {isSelectedDate === null ? (
          <h1>
            All Scheduled Plan
            <span>For {dayjs().month(monthIndex).format('MMMM YYYY')}</span>
          </h1>
        ) : (
          <h1>
            Plan Scheduled On
            <span>{moment(isSelectedDate).format('dddd, MMMM D')}</span>
          </h1>
        )}
      </div>
      <div className={`body-box ${!isListOpen && 'opacity-0'}`}>
        {FilterEventAndRender()}
      </div>
    </BoxContainer>
  )
}

const BoxContainer = styled.div`
  ${tw`
    fixed
    top-0
    right-0
    flex
    flex-col
    py-4
    px-6
    h-screen
    bg-white

    transition-all
    duration-700
    ease-in-out

    z-10
  `}
  max-Width: calc(100% - 16.5rem);
  box-shadow: -4px 0px 32px -3px rgba(0, 0, 0, 0.3);
  opacity: ${(props) => (props.isListOpen ? `100%` : `0`)};
  transform: ${(props) =>
    props.isListOpen ? `translateX(0%)` : `translateX(100%)`};

  .header-box {
    ${tw``}

    h1 {
      ${tw`
        flex
        flex-col
        pb-4
        text-2xl
        text-gray-700
        font-semibold
      `}

      span {
        ${tw`
          text-lg
          text-gray-600
        `}
      }
    }
  }

  .body-box {
    ${tw`
      flex
      items-start
      justify-between

      h-full
      w-full
    `}
  }
`

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
      `}
      box-shadow: 5px 5px 12px 0px rgba(0,0,0,0.3);

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

export default EventList
