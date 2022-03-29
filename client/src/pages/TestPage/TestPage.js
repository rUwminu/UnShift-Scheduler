import React, { useState, useEffect } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { v4 } from 'uuid'
import { useSelector, useDispatch } from 'react-redux'

// Action
import {
  addNotifications,
  removeNotifications,
} from '../../redux/action/notifyAction'

const TestPage = () => {
  const dispatch = useDispatch()

  const handleAddNotifications = () => {
    const newNotify = {
      id: v4().toString(),
      type: 'success',
      message: 'Test Adding',
    }

    dispatch(addNotifications(newNotify))
  }

  return (
    <MainContainer>
      <div onClick={() => handleAddNotifications()}>Add Notify</div>
    </MainContainer>
  )
}

const NotifyCard = ({ notify }) => {
  const { id, type, message } = notify

  const dispatch = useDispatch()

  const [isExit, setIsExit] = useState(false)
  const [barWidth, setBarWidth] = useState(0)
  const [intervalID, setIntervalID] = useState(null)

  const handleStartTimer = () => {
    const iid = setInterval(() => {
      setBarWidth((prev) => {
        if (prev < 100) {
          return prev + 0.5
        }

        clearInterval(iid)
        return prev
      })
    }, 20)
    // 200 * 20 = 4000ms
    setIntervalID(iid)
  }

  const handleRemoveTimer = () => {
    clearInterval(intervalID)
  }

  const handleCloseNotification = () => {
    handleRemoveTimer() // Cleanup Interval

    setIsExit(true)
    setTimeout(() => {
      dispatch(removeNotifications(id))
    }, 400)
  }

  useEffect(() => {
    handleStartTimer()
  }, [])

  useEffect(() => {
    if (barWidth === 100) {
      handleCloseNotification()
    }
  }, [barWidth])

  return (
    <CardContainer
      className={`${
        type === 'success' ? 'green' : type === 'warning' ? 'red' : 'yellow'
      } ${isExit && 'inactive'}`}
      onMouseEnter={() => handleRemoveTimer()}
      onMouseLeave={() => handleStartTimer()}
    >
      <p>{message}</p>
      <div style={{ width: `${barWidth}%` }} className="timer-bar" />
    </CardContainer>
  )
}

const MainContainer = styled.div`
  ${tw`
    flex
    items-start
    justify-center
    py-28
    w-screen
    h-screen
  `}

  .notify-container {
    ${tw`
      fixed
      top-40
      right-6
      w-full
      max-w-xs
    `}
  }
`

const CardContainer = styled.div`
  ${tw`
    relative
    mb-4
    py-3
    px-4
    w-full
    max-w-xs
    text-lg
    font-semibold
    rounded-sm
  `}
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  animation: Slideleft 0.25s linear forwards;

  .timer-bar {
    ${tw`
        absolute
        bottom-0
        left-0
        h-[6px]
        rounded-b-sm
    `}
  }

  &.green {
    .timer-bar {
      ${tw`
        bg-green-500
      `}
    }
  }

  &.yellow {
    .timer-bar {
      ${tw`
        bg-yellow-500
      `}
    }
  }

  &.red {
    .timer-bar {
      ${tw`
        bg-red-500
      `}
    }
  }

  &.inactive {
    animation: SlideRight 0.25s linear forwards;
  }

  @keyframes Slideleft {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0%);
    }
  }

  @keyframes SlideRight {
    from {
      opacity: 1;
      transform: translateX(0%);
    }
    to {
      opacity: 0;
      transform: translateX(100%);
    }
  }
`

export default TestPage
