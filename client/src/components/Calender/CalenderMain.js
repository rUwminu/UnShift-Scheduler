import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { gql, useLazyQuery, useSubscription } from '@apollo/client'

// Redux Action
import {
  getSelfEventList,
  getOtherEventList,
  getPubSubEventNew,
  getPubSubSelfEventNew,
} from '../../redux/action/eventAction'

// Child components
import CalenderHeader from './CalenderHeader/CalenderHeader'
import CalenderMonth from './CalenderMonth/CalenderMonth'
import CalenderSidebar from './CalenderSidebar/CalenderSidebar'

// Utils
import { getMonth } from '../../utils/GlobalUtils'

// Global Components
import { EventAdd, EventCard } from '../index'

const CalenderMain = () => {
  const dispatch = useDispatch()

  const userSignIn = useSelector((state) => state.userSignIn)
  const { user } = userSignIn

  const calenderInfo = useSelector((state) => state.calenderInfo)
  const { monthIndex } = calenderInfo

  const eventInfo = useSelector((state) => state.eventInfo)
  const { isAddOpen } = eventInfo

  const [currentMonth, setCurrentMonth] = useState(getMonth(monthIndex))

  const [getSelfEventListItem, { error: selfListError, data: selfListData }] =
    useLazyQuery(GET_SELF_EVENT_LIST, {
      context: {
        headers: {
          Authorization: `Bearer${' '}${user.token}`,
        },
      },
    })

  const [getAllEventListItem, { data: allListData }] = useLazyQuery(
    GET_ALL_EVENT_LIST,
    {
      context: {
        headers: {
          Authorization: `Bearer${' '}${user.token}`,
        },
      },
    }
  )

  const { data: subNewEvent } = useSubscription(CREATED_EVENT_SUBSCRIPTION)

  const { data: subUpdateEvent } = useSubscription(UPDATED_EVENT_SUBSCRIPTION)

  const handleGetSelectedMonthEvent = () => {
    const selectedMonth = dayjs(new Date(dayjs().year(), monthIndex))
      .format('MM YYYY')
      .split(' ')

    if (user.isManager) {
      getAllEventListItem({
        variables: {
          month: parseInt(selectedMonth[0]),
          year: parseInt(selectedMonth[1]),
        },
      })
    }

    getSelfEventListItem({
      variables: {
        month: parseInt(selectedMonth[0]),
        year: parseInt(selectedMonth[1]),
      },
    })
  }

  const handleGetSubscriptionNewEvent = () => {
    if (subNewEvent && subNewEvent.eventCreated) {
      const TempArr = { ...subNewEvent.eventCreated }

      // If user Not manager, check subscription event is created by him
      if (TempArr.user.id === user.id) {
        dispatch(getPubSubSelfEventNew(TempArr))
      }
      // If user is manager, get and push to all other user event list
      else if (user.isManager) {
        dispatch(getPubSubEventNew(TempArr))
      }
      // Else user not manager, ignore the event add by other
    }
  }

  useEffect(() => {
    handleGetSelectedMonthEvent()
    setCurrentMonth(getMonth(monthIndex))
  }, [monthIndex])

  useEffect(() => {
    if (selfListData) {
      dispatch(getSelfEventList(selfListData.getSelfEvent))
    }
  }, [selfListData])

  useEffect(() => {
    if (allListData) {
      dispatch(getOtherEventList(allListData.getAllEvent))
    }
  }, [allListData])

  useEffect(() => {
    handleGetSubscriptionNewEvent()
  }, [subNewEvent])

  return (
    <CalenderSection>
      {isAddOpen && <EventAdd />}
      <EventCard />
      <CalenderHeader />
      <div className="body-container">
        <CalenderSidebar />
        <CalenderMonth month={currentMonth} view={'base'} />
      </div>
    </CalenderSection>
  )
}

const GET_SELF_EVENT_LIST = gql`
  query getSelfEvent($month: Int!, $year: Int!) {
    getSelfEvent(month: $month, year: $year) {
      id
      title
      description
      planDate
      compDate
      isCompleted
      isRescheduled
      isCancelled
    }
  }
`

const GET_ALL_EVENT_LIST = gql`
  query getAllEvent($month: Int!, $year: Int!) {
    getAllEvent(month: $month, year: $year) {
      id
      user {
        id
        username
      }
      title
      description
      planDate
      compDate
      isCompleted
      isRescheduled
      isCancelled
    }
  }
`

const CREATED_EVENT_SUBSCRIPTION = gql`
  subscription {
    eventCreated {
      id
      user {
        id
        username
      }
      title
      description
      planDate
      compDate
      isCompleted
      isRescheduled
      isCancelled
    }
  }
`

const UPDATED_EVENT_SUBSCRIPTION = gql`
  subscription {
    eventUpdated {
      id
      user {
        id
        username
      }
      title
      description
      planDate
      compDate
      isCompleted
      isRescheduled
      isCancelled
    }
  }
`

const CalenderSection = styled.div`
  ${tw`
    relative
    flex
    flex-col
    w-full
    h-screen
  `}

  .body-container {
    ${tw`
        flex
        flex-grow
    `}
  }
`

export default CalenderMain
