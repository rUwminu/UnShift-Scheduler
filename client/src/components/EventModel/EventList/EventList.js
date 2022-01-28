import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import dayjs from 'dayjs'
import moment from 'moment'
import { useSelector } from 'react-redux'

// Child components
import UserList from './UserList'
import ManagerList from './ManagerList'

// Svg
import { EmptyAmico } from '../../../assets/index'

const EventList = () => {
  const userSignIn = useSelector((state) => state.userSignIn)
  const { user } = userSignIn

  const calenderInfo = useSelector((state) => state.calenderInfo)
  const { monthIndex } = calenderInfo

  const eventInfo = useSelector((state) => state.eventInfo)
  const {
    eventList,
    listListener: { isListOpen, isSelectedDate },
  } = eventInfo

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
        {user.isManager ? <ManagerList /> : <UserList />}
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
    min-w-[26rem]
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
