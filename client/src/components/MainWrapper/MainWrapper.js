import React, { useEffect } from 'react'
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
  getPubSubEventUpdate,
  getPubSubSelfEventUpdate,
} from '../../redux/action/eventAction'

const MainWrapper = ({ children }) => {
  const dispatch = useDispatch()

  const userSignIn = useSelector((state) => state.userSignIn)
  const { user } = userSignIn

  const calenderInfo = useSelector((state) => state.calenderInfo)
  const { monthIndex } = calenderInfo

  const [getSelfEventListItem, { error: selfListError, data: selfListData }] =
    useLazyQuery(GET_SELF_EVENT_LIST, {
      context: {
        headers: {
          Authorization: `Bearer${' '}${user && user.token}`,
        },
      },
    })

  const [getAllEventListItem, { data: allListData }] = useLazyQuery(
    GET_ALL_EVENT_LIST,
    {
      context: {
        headers: {
          Authorization: `Bearer${' '}${user && user.token}`,
        },
      },
    }
  )

  const { data: subNewEvent } = useSubscription(CREATED_EVENT_SUBSCRIPTION)

  const { data: subUpdateEvent } = useSubscription(UPDATED_EVENT_SUBSCRIPTION)

  const handleGetSelectedMonthEvent = () => {
    console.log('is trigger?')
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

  const handleGetSubscriptionUpdateEvent = () => {
    if (subUpdateEvent && subUpdateEvent.eventUpdated) {
      const TempArr = { ...subUpdateEvent.eventUpdated }

      // If user Not manager, check subscription event is created by him
      if (TempArr.user.id === user.id) {
        dispatch(getPubSubSelfEventUpdate(TempArr))
      }
      // If user is manager, get and push to all other user event list
      else if (user.isManager) {
        dispatch(getPubSubEventUpdate(TempArr))
      }
      // Else user not manager, ignore the event add by other
    }
  }

  useEffect(() => {
    if (user) handleGetSelectedMonthEvent()
  }, [monthIndex, user])

  // Get Event UseEffect
  useEffect(() => {
    if (selfListData) {
      console.log(selfListData)
      dispatch(getSelfEventList(selfListData.getSelfEvent))
    }
  }, [selfListData])

  useEffect(() => {
    if (allListData) {
      dispatch(getOtherEventList(allListData.getAllEvent))
    }
  }, [allListData])

  // Subscription UseEffect
  useEffect(() => {
    handleGetSubscriptionNewEvent()
  }, [subNewEvent])

  useEffect(() => {
    handleGetSubscriptionUpdateEvent()
  }, [subUpdateEvent])

  return <MainContainer>{children}</MainContainer>
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
      remark
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
      remark
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
      remark
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
      remark
    }
  }
`

const MainContainer = styled.div`
  ${tw`
    relative
    flex
    items-center
    justify-center
    w-screen
    h-screen
  `}
`

export default MainWrapper
