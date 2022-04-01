import React, { useState, useEffect } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

// Action
import { removeNotifications } from '../../redux/action/notifyAction'

// Mui Icon
import {
  CheckCircleOutline,
  ErrorOutline,
  HelpOutline,
} from '@mui/icons-material'

const NotifyWraper = ({ children }) => {
  const notifyInfo = useSelector((state) => state.notifyInfo)
  const { notifyList } = notifyInfo

  return (
    <MainContainer>
      {children}
      <div className="notify-container">
        {notifyList.length > 0 &&
          notifyList.map((x) => <NotifyCard key={x.id} notify={x} />)}
      </div>
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
        type === 'success' ? 'green' : type === 'danger' ? 'red' : 'yellow'
      } ${isExit && 'inactive'}`}
      onMouseEnter={() => handleRemoveTimer()}
      onMouseLeave={() => handleStartTimer()}
      onClick={() => handleCloseNotification()}
    >
      <p>{message}</p>
      {type === 'success' ? (
        <CheckCircleOutline className={`icon`} />
      ) : type === 'danger' ? (
        <ErrorOutline className={`icon`} />
      ) : (
        <HelpOutline className={`icon`} />
      )}
      <div style={{ width: `${barWidth}%` }} className="timer-bar" />
    </CardContainer>
  )
}

const MainContainer = styled.div`
  ${tw`
    relative
    flex
    items-center
    justify-center
    w-screen
    h-screen
  `}

  .notify-container {
    ${tw`
      fixed
      top-24
      right-6
      w-full
      max-w-xs
      z-[100]
    `}
  }
`

const CardContainer = styled.div`
  ${tw`
    relative
    flex
    items-center
    justify-between
    mb-4
    py-4
    px-4
    w-full
    max-w-xs
    bg-white
    rounded-sm
  `}
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  animation: Slideleft 0.25s linear forwards;

  p {
    ${tw`
      font-semibold
      text-gray-700
    `}
  }

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

    .icon {
      ${tw`
        text-green-500
      `}
    }
  }

  &.yellow {
    .timer-bar {
      ${tw`
        bg-yellow-500
      `}
    }

    .icon {
      ${tw`
        text-yellow-500
      `}
    }
  }

  &.red {
    .timer-bar {
      ${tw`
        bg-red-500
      `}
    }

    .icon {
      ${tw`
        text-red-500
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

export default NotifyWraper
