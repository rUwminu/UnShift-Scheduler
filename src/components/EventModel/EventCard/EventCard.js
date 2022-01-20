import React, { useState, useEffect } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import moment from 'moment'

import { useSelector, useDispatch } from 'react-redux'
import { closeSelectedEvent } from '../../../redux/action/eventAction'

// MUi icons
import { Close, Notes, Event, AddTask, MoreVert } from '@mui/icons-material'

const EventCard = () => {
  const dispatch = useDispatch()

  const [isDropActive, setIsDropActive] = useState(false)
  const [rePosition, setRePosition] = useState({
    isTooLeft: false,
    isTooBottom: false,
  })

  const eventInfo = useSelector((state) => state.eventInfo)
  const { isViewOpen, position, selectedEvent } = eventInfo

  const handleCloseWindow = () => {
    dispatch(closeSelectedEvent())
  }

  const handleResize = () => {
    const { innerWidth: width, innerHeight: height } = window

    let leftWidth = width - position.left
    let leftHeight = height - position.top

    if (leftWidth > 850) {
      if (leftHeight <= 350) {
        setRePosition({ isTooLeft: true, isTooBottom: true })
      } else {
        setRePosition({ isTooLeft: true, isTooBottom: false })
      }
    } else {
      if (leftHeight <= 350) {
        setRePosition({ isTooLeft: false, isTooBottom: true })
      } else {
        setRePosition({ isTooLeft: false, isTooBottom: false })
      }
    }
  }

  useEffect(() => {
    if (position) {
      handleResize()
    }
  }, [position])

  return (
    <>
      {isViewOpen && selectedEvent && (
        <BoxContainer position={position} rePosition={rePosition}>
          <div className="card-header">
            <div
              className="icon-box btn"
              onClick={() => setIsDropActive(!isDropActive)}
            >
              <MoreVert className="icon" />
              <div
                className={`drop-list ${isDropActive && 'active'}`}
                onMouseLeave={() => setIsDropActive(false)}
              >
                {selectedEvent.isCompleted ? (
                  <div className="drop-item">Mark as forecast</div>
                ) : (
                  <div className="drop-item">Mark as done</div>
                )}
                <div className="drop-item">Cancel</div>
              </div>
            </div>
            <div className="icon-box btn" onClick={() => handleCloseWindow()}>
              <Close className="icon" />
            </div>
          </div>
          <div className="card-body">
            <div className="card-item items-start">
              <Event className="icon" />
              <div className="info-box">
                <h1>{selectedEvent.title}</h1>
                <span className="date">
                  {moment(selectedEvent.planDate).format('dddd, MMMM D')}
                </span>
              </div>
            </div>
            {selectedEvent.description !== '' &&
              selectedEvent.description !== null && (
                <div className="card-item items-start">
                  <Notes className="icon" />
                  <span className="info-box">{selectedEvent.description}</span>
                </div>
              )}
            <div className="card-item items-center">
              <AddTask className="icon" />
              <span
                className={`status-tag ${
                  selectedEvent.isCancelled
                    ? 'cancel-tag'
                    : selectedEvent.isCompleted
                    ? 'comp-tag'
                    : 'fore-tag'
                }`}
              >
                {selectedEvent.isCancelled
                  ? 'Cancelled'
                  : selectedEvent.isCompleted
                  ? 'Completed'
                  : 'Forecast'}
              </span>
            </div>
          </div>
        </BoxContainer>
      )}
    </>
  )
}

const BoxContainer = styled.div`
  ${tw`
    fixed
    p-4
    w-full
    max-w-sm
    h-auto
    max-h-[22rem]
    bg-white
    rounded-md
    overflow-y-scroll
    scrollbar-hide
    z-[100]

    transition-all
    duration-500
    ease-in-out
  `}
  top: ${(props) => (props.position ? `${props.position.top}px` : '0')};
  left: ${(props) => (props.position ? `${props.position.left}px` : '0')};
  transform: ${(props) =>
    props.rePosition &&
    `translate(${props.rePosition.isTooLeft ? '7%' : '-101%'}, ${
      props.rePosition.isTooBottom ? '-100%' : '0%'
    })`};
  box-shadow: 2px 3px 15px 3px rgba(0, 0, 0, 0.25);

  .card-header {
    ${tw`
      flex
      items-center
      justify-end
      mb-3
    `}

    .card-icon {
      ${tw`
        w-7
        h-7
        text-gray-500
      `}
    }

    .icon-box {
      ${tw`
        relative
        flex
        items-center
        justify-center
        p-2
        w-8
        h-8
        text-gray-600
        rounded-full

        transition
        duration-200
        ease-in-out
      `}

      .drop-list {
        ${tw`
          absolute
          bottom-0
          right-0
          w-0
          h-0
          bg-white
          opacity-0
          rounded-md
          overflow-hidden
          pointer-events-none

          transition-all
          duration-200
          ease-in-out
        `}
        transform: translateY(100%);

        .drop-item {
          ${tw`
            w-full
            py-2
            px-3
            text-sm
            font-semibold
            text-gray-700
            rounded-md

            transition-all
            duration-200
            ease-in-out
          `}

          &:hover {
            ${tw`
              bg-gray-200
            `}
          }
        }
      }

      .drop-list.active {
        ${tw`
          h-auto
          w-auto
          min-w-[9rem]
          p-1
          opacity-100
          pointer-events-auto
        `}
        box-shadow: 2px 3px 15px 3px rgba(0, 0, 0, 0.25);
      }
    }

    .btn {
      ${tw`
        cursor-pointer
      `}

      &:hover {
        ${tw`
          bg-gray-200
          text-gray-800
        `}
      }
    }
  }

  .card-body {
    ${tw`
      flex-grow
      flex
      flex-col
      items-center
      w-full
    `}

    .card-item {
      ${tw`
        flex
        justify-start
        w-full
        mb-5
      `}

      .icon {
        ${tw`
          w-5
          h-5
          mr-4
          text-gray-500
          pointer-events-none
        `}
      }

      .icon.hide {
        ${tw`
          opacity-0
        `}
      }

      .info-box {
        ${tw`
          -mt-1
        `}

        h1 {
          ${tw`
            text-2xl
            font-semibold
          `}
        }

        .date {
          ${tw`
            text-sm
            font-semibold
            text-gray-600
          `}
        }
      }

      .status-tag {
        ${tw`
          py-1
          px-3
          border-2
          font-semibold
          rounded-md
        `}
      }

      .cancel-tag {
        ${tw`
          text-red-600
          border-red-500
        `}
      }

      .comp-tag {
        ${tw`
          text-green-600
          border-green-500
        `}
      }

      .fore-tag {
        ${tw`
          text-purple-600
          border-purple-500
        `}
      }
    }
  }
`

export default EventCard
