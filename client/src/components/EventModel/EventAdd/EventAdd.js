import React, { useState } from 'react'
import dayjs from 'dayjs'
import tw from 'twin.macro'
import styled from 'styled-components'
import { gql, useMutation } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import { toggleEventCardClose } from '../../../redux/action/eventAction'
import { toggleNotifyTagOpen } from '../../../redux/action/notifyAction'

// MUi icons
import {
  PlaylistAdd,
  Close,
  AccessTime,
  PersonAdd,
  Notes,
  AddTask,
  ArrowDropDown,
} from '@mui/icons-material'

const dropTitleDefaultValue = ['F&B Visit', 'Customer Meetup', 'Sample Deliver']

const EventAdd = () => {
  const dispatch = useDispatch()

  const [dropStatusControl, setDropStatusControl] = useState({
    titleDrop: false,
    personalDrop: false,
    statusDrop: false,
  })
  const [isCompleted, setIsCompleted] = useState(false)
  const [inputValue, setInputValue] = useState({
    title: '',
    customer: {
      cusId: '',
      personal: '',
    },
    description: '',
    isCompleted: false,
  })

  const userSignIn = useSelector((state) => state.userSignIn)
  const { user } = userSignIn

  const contactBook = useSelector((state) => state.contactBook)
  const { allCustomerContact } = contactBook

  const calenderInfo = useSelector((state) => state.calenderInfo)
  const { daySelected } = calenderInfo

  const [createNewEvent] = useMutation(CREATE_NEW_EVENT, {
    context: {
      headers: {
        Authorization: `Bearer${' '}${user.token}`,
      },
    },
    update() {
      dispatch(
        toggleNotifyTagOpen({ isSuccess: true, info: 'Schedule Created' })
      )
    },
    onError(err) {
      console.log(err)
    },
  })

  const handleCloseWindow = () => {
    dispatch(toggleEventCardClose())
  }

  const handleCreateEvent = () => {
    if (inputValue.title !== '' && inputValue.customer.personal !== '') {
      if (!isCompleted) {
        createNewEvent({
          variables: {
            ...inputValue,
            planDate: dayjs(daySelected).format('YYYY-MM-DDTHH:mm:ss'),
          },
        })
      } else {
        createNewEvent({
          variables: {
            ...inputValue,
            planDate: dayjs(daySelected).format('YYYY-MM-DDTHH:mm:ss'),
            compDate: dayjs(daySelected).format('YYYY-MM-DDTHH:mm:ss'),
          },
        })
      }
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
        <div className="card-item items-center">
          <AccessTime className="icon hide" />
          <div className="input-box">
            <input
              type="text"
              className="input title-input"
              value={inputValue.title}
              onChange={(e) =>
                setInputValue({ ...inputValue, title: e.target.value })
              }
              placeholder="Add title"
              required
            />
            <div
              className="drop-icon-box absolute-icon-box"
              onClick={() =>
                setDropStatusControl({
                  titleDrop: !dropStatusControl.titleDrop,
                  statusDrop: false,
                  personalDrop: false,
                })
              }
            >
              <ArrowDropDown className="drop-icon" />
            </div>
            <div
              className={`drop-box ${dropStatusControl.titleDrop && 'active'}`}
              onMouseLeave={() =>
                setDropStatusControl({
                  ...dropStatusControl,
                  titleDrop: false,
                })
              }
            >
              {dropTitleDefaultValue.map((x, idx) => (
                <div
                  key={idx}
                  className="drop-option"
                  onClick={() => {
                    setDropStatusControl({
                      ...dropStatusControl,
                      titleDrop: false,
                    })
                    setInputValue({ ...inputValue, title: x })
                  }}
                >
                  {x}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card-item items-center">
          <PersonAdd className="icon" />
          <div className="input-box">
            <input
              type="text"
              className="input"
              value={inputValue.customer.personal}
              placeholder="Who is Meeting-up?"
              required
            />

            <div
              className="drop-icon-box absolute-icon-box"
              onClick={() =>
                setDropStatusControl({
                  titleDrop: false,
                  statusDrop: false,
                  personalDrop: !dropStatusControl.personalDrop,
                })
              }
            >
              <ArrowDropDown className="drop-icon" />
            </div>
            <div
              className={`drop-box ${
                dropStatusControl.personalDrop && 'active'
              }`}
              onMouseLeave={() =>
                setDropStatusControl({
                  ...dropStatusControl,
                  personalDrop: false,
                })
              }
            >
              {allCustomerContact && allCustomerContact.length > 0 ? (
                allCustomerContact.map((x, idx) => (
                  <div
                    key={idx}
                    className="drop-option"
                    onClick={() => {
                      setDropStatusControl({
                        ...dropStatusControl,
                        personalDrop: false,
                      })
                      setInputValue({
                        ...inputValue,
                        customer: { cusId: x.id, personal: x.personal },
                      })
                    }}
                  >
                    {x.personal}
                  </div>
                ))
              ) : (
                <div className="drop-option pointer-events-none">
                  Seem Empty Here
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="card-item items-center">
          <AccessTime className="icon" />
          <span>{daySelected.format('MMM DD, YYYY')}</span>
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
                setInputValue({
                  ...inputValue,
                  description: e.target.value,
                })
              }
              placeholder="What about?"
            />
          </div>
        </div>
        <div className="card-item items-center">
          <AddTask className="icon" />
          <div className="drop-info">
            <span>{isCompleted ? 'Completed' : 'Forecast'}</span>
            <div
              className="drop-icon-box"
              onClick={() =>
                setDropStatusControl({
                  titleDrop: false,
                  statusDrop: !dropStatusControl.statusDrop,
                  personalDrop: false,
                })
              }
            >
              <ArrowDropDown className="drop-icon" />
            </div>
            <div
              className={`drop-box ${dropStatusControl.statusDrop && 'active'}`}
              onMouseLeave={() =>
                setDropStatusControl({
                  titleDrop: false,
                  statusDrop: false,
                  personalDrop: false,
                })
              }
            >
              <div
                className="drop-option"
                onClick={() => {
                  setIsCompleted(false)
                  setInputValue({ ...inputValue, isCompleted: false })
                  setDropStatusControl({
                    titleDrop: false,
                    personalDrop: false,
                    statusDrop: false,
                  })
                }}
              >
                Forecast
              </div>
              <div
                className="drop-option"
                onClick={() => {
                  setIsCompleted(true)
                  setInputValue({ ...inputValue, isCompleted: true })
                  setDropStatusControl({
                    titleDrop: false,
                    personalDrop: false,
                    statusDrop: false,
                  })
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

const CREATE_NEW_EVENT = gql`
  mutation createNewEvent(
    $title: String!
    $customer: CustomerInfoInput!
    $description: String
    $planDate: String!
    $compDate: String
    $isCompleted: Boolean!
  ) {
    createNewEvent(
      createEventInput: {
        title: $title
        customer: $customer
        description: $description
        planDate: $planDate
        compDate: $compDate
        isCompleted: $isCompleted
      }
    ) {
      id
      title
    }
  }
`

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

        .input {
          ${tw`
            w-full
            py-[2px]
            outline-none
            font-semibold
          `}
        }

        .title-input {
          ${tw`
            text-2xl  
            font-normal    
          `}
        }

        .location-input {
          ${tw`
            w-full
            py-[0.5px]
            outline-none
          `}
        }

        .drop-box {
          ${tw`
            absolute
            bottom-0
            left-0
            w-full
            bg-white
            opacity-0
            rounded-md
            overflow-y-scroll
            scrollbar-hide

            transition-all
            duration-200
            ease-in-out
          `}
          transform: translateY(calc(100% + 0.5rem));

          .drop-option {
            ${tw`
              flex
              items-center
              justify-start
              h-0
              w-full
              font-semibold
              text-gray-700
              rounded-md
              opacity-0
              cursor-pointer

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

        .drop-box.active {
          ${tw`
            p-1
            max-h-[10rem]
            opacity-100
            z-30
          `}
          box-shadow: 2px 3px 15px 3px rgba(0, 0, 0, 0.5);

          .drop-option {
            ${tw`
              px-2
              h-8
              opacity-100
            `}
          }
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

      .absolute-icon-box {
        ${tw`
          absolute
          top-1/2
          right-1
          m-0
          w-8
          h-8
        `}
        transform: translateY(-50%);
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
