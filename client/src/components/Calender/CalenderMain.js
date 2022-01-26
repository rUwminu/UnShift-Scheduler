import React, { useState, useEffect } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { gql, useQuery, useSubscription } from '@apollo/client'

// Redux Action
import {
  getSelfEventList,
  getPubSubEventUpdate,
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

  const { loading, error, data } = useQuery(GET_SELF_EVENT_LIST, {
    context: {
      headers: {
        Authorization: `Bearer${' '}${user.token}`,
      },
    },
  })

  const { data: subEvent } = useSubscription(CREATED_EVENT_SUBSCRIPTION)

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex))
  }, [monthIndex])

  useEffect(() => {
    if (data) dispatch(getSelfEventList(data.getSelfEvent))
  }, [data])

  useEffect(() => {
    if (subEvent && subEvent.eventCreated.user.id === user.id) {
      dispatch(getPubSubEventUpdate(subEvent.eventCreated))
    }
  }, [subEvent])

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
  {
    getSelfEvent {
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
