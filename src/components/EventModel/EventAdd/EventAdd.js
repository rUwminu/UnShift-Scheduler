import React, { useState } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import {
  toggleEventCardClose,
  createEvent,
} from '../../../redux/action/eventAction'

// MUi icons
import {
  PlaylistAdd,
  Close,
  AccessTime,
  Notes,
  PinDrop,
  AddTask,
  ArrowDropDown,
} from '@mui/icons-material'

const EventAdd = () => {
  const dispatch = useDispatch()

  const [isDropOpen, setIsDropOpen] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [inputValue, setInputValue] = useState({
    title: '',
    location: '',
    description: '',
    isCompleted: false,
  })

  const calenderInfo = useSelector((state) => state.calenderInfo)
  const { daySelected } = calenderInfo

  const handleCloseWindow = () => {
    dispatch(toggleEventCardClose())
  }

  const handleCreateEvent = () => {
    if (inputValue.title !== '' && inputValue.description !== '') {
      const randomId = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
        /[018]/g,
        (c) =>
          (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
          ).toString(16)
      )
      dispatch(createEvent({ id: randomId, ...inputValue, day: daySelected }))
    }
  }

  const autoGrowHeight = (e) => {
    //setInputValue({ ...inputValue, description: e.target.value })
    e.target.style.height = '0px'
    e.target.style.height = e.target.scrollHeight + 'px'
  }

  return (
    <BoxContainer>
      <div className="card-header">
        <PlaylistAdd className="card-icon" />
        <div className="icon-box btn" onClick={() => handleCloseWindow()}>
          <Close className="icon" />
        </div>
      </div>
      <div className="card-body">
        <div className="card-item">
          <AccessTime className="icon hide" />
          <div className="input-box">
            <input
              type="text"
              className="title-input"
              value={inputValue.title}
              onChange={(e) =>
                setInputValue({ ...inputValue, title: e.target.value })
              }
              placeholder="Add title"
              required
            />
          </div>
        </div>
        <div className="card-item items-center">
          <AccessTime className="icon" />
          <span>{daySelected.format('MMM DD, YYYY')}</span>
        </div>
        <div className="card-item items-start">
          <PinDrop className="icon" />
          <div className="input-box">
            <textarea
              type="text"
              className="card-desc"
              value={inputValue.location}
              onInput={(e) => autoGrowHeight(e)}
              onChange={(e) =>
                setInputValue({ ...inputValue, location: e.target.value })
              }
              placeholder="Location"
              required
            />
          </div>
        </div>
        <div className="card-item items-start">
          <Notes className="icon" />
          <div className="input-box">
            <textarea
              type="text"
              className="card-desc"
              value={inputValue.description}
              onInput={(e) => autoGrowHeight(e)}
              onChange={(e) =>
                setInputValue({ ...inputValue, description: e.target.value })
              }
              placeholder="What about?"
              required
            />
          </div>
        </div>
        <div className="card-item items-center">
          <AddTask className="icon" />
          <div className="drop-info">
            <span>{isCompleted ? 'Completed' : 'Forecast'}</span>
            <div
              className="drop-icon-box"
              onClick={() => setIsDropOpen(!isDropOpen)}
            >
              <ArrowDropDown className="drop-icon" />
            </div>
            <div
              className={`drop-box ${isDropOpen && 'active'}`}
              onMouseLeave={() => setIsDropOpen(false)}
            >
              <div
                className="drop-option"
                onClick={() => {
                  setIsCompleted(false)
                  setInputValue({ ...inputValue, isCompleted: false })
                  setIsDropOpen(false)
                }}
              >
                Forecast
              </div>
              <div
                className="drop-option"
                onClick={() => {
                  setIsCompleted(true)
                  setInputValue({ ...inputValue, isCompleted: true })
                  setIsDropOpen(false)
                }}
              >
                Completed
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <div className="save-btn" onClick={() => handleCreateEvent()}>
          Save
        </div>
      </div>
    </BoxContainer>
  )
}

const BoxContainer = styled.div`
  ${tw`
    absolute
    bottom-[50%]
    right-[50%]
    p-4
    h-auto
    w-full
    max-h-[28rem]
    max-w-sm
    bg-gray-50
    rounded-md 
    overflow-y-scroll
    scrollbar-hide
    z-30 

    transition-all
    duration-500
  `}
  box-shadow: 2px 3px 15px 3px rgba(0,0,0,0.5);
  animation: popupAnimation 0.5s ease-in-out forwards;

  @keyframes popupAnimation {
    from {
      transform: scale(0.8) translate(50%, 50%);
    }
    to {
      transform: scale(1) translate(50%, 50%);
    }
  }

  .card-header {
    ${tw`
      flex
      items-center
      justify-between
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
        flex
        items-center
        justify-center
        p-2
        w-10
        h-10
        text-gray-600
        rounded-full

        transition
        duration-200
        ease-in-out
      `}
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

      .input-box {
        ${tw`
          relative
          w-full
          border-b
          border-gray-400
        `}

        &::after {
          content: '';
          ${tw`
            absolute
            left-0
            bottom-0
            h-[2px]
            w-0
            bg-blue-600

            transition-all
            duration-200
            ease-in-out
            z-[1]
          `};
        }

        &:focus-within {
          &::after {
            ${tw`
              w-full
            `}
          }
        }

        .title-input {
          ${tw`
            w-full
            py-[0.5px]
            text-2xl
            outline-none
          `}
        }

        .location-input {
          ${tw`
            w-full
            py-[0.5px]
            outline-none
          `}
        }
      }

      span {
        ${tw`
          font-semibold
          text-gray-600
        `}
      }

      textarea {
        resize: none;
        margin-top: -2.5px;
        overflow-y: scroll;
        min-height: 2.5rem;
        max-height: 13rem;
        ${tw`
          w-full
          font-semibold
          outline-none

          scrollbar-hide
        `}
      }

      .drop-info {
        ${tw`
          relative
          flex
          items-center
          justify-start
        `}

        .drop-icon-box {
          ${tw`
            flex
            items-center
            justify-center
            w-7
            h-7
            p-1
            ml-1
            rounded-full
            cursor-pointer

            transition
            duration-200
            ease-in-out
          `}

          .drop-icon {
            ${tw`
              mt-[2px]
              h-full
              w-full
              text-gray-600
              pointer-events-none
            `}
          }

          &:hover {
            ${tw`
              bg-gray-300
            `}
          }
        }

        .drop-box {
          ${tw`
            absolute
            bottom-0
            right-0
            flex
            flex-col
            items-end
            justify-start
            w-0
            bg-white
            rounded-md
            overflow-hidden
            scrollbar-hide
            pointer-events-none

            transition-all
            duration-500
            ease-in-out
          `}
          transform: translate(104%, 55%);

          .drop-option {
            ${tw`
              w-full
              py-1
              px-3
              text-gray-600
              font-semibold
              cursor-pointer
              rounded-md

              transition
              duration-200
              ease-in-out
            `}

            &:hover {
              ${tw`
                bg-gray-300
                text-gray-800
              `}
            }
          }
        }

        .drop-box.active {
          ${tw`
            p-1
            w-36
            overflow-auto
            pointer-events-auto
          `}
          box-shadow: 2px 3px 15px 3px rgba(0, 0, 0, 0.5);
        }
      }
    }
  }

  .card-footer {
    ${tw`
      flex
      items-center
      justify-end
    `}

    .save-btn {
      ${tw`
        py-1
        px-4
        bg-blue-600
        text-gray-50
        font-semibold
        rounded-md
        cursor-pointer

        transition
        duration-200
        ease-in-out
      `}

      &:hover {
        ${tw`
          bg-blue-500
          shadow-md
        `}
      }
    }
  }
`

export default EventAdd
