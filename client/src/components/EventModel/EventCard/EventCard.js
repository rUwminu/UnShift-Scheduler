import React, { useState, useEffect } from 'react'
import moment from 'moment'
import tw from 'twin.macro'
import styled from 'styled-components'
import { gql, useMutation } from '@apollo/client'
import dayjs from 'dayjs'

import { useSelector, useDispatch } from 'react-redux'
import { closeSelectedEvent } from '../../../redux/action/eventAction'
import { toggleNotifyTagOpen } from '../../../redux/action/notifyAction'

import { SmallCalender } from '../../index'

// MUi icons
import {
  Close,
  Notes,
  Event,
  AddTask,
  MoreVert,
  NoteAlt,
  EventBusy,
  PeopleAlt,
  ArrowDropDown,
} from '@mui/icons-material'

const EventCard = () => {
  const dispatch = useDispatch()

  const userSignIn = useSelector((state) => state.userSignIn)
  const { user } = userSignIn

  const eventInfo = useSelector((state) => state.eventInfo)
  const { isViewOpen, position, selectedEvent } = eventInfo

  const [isShow, setIsShow] = useState(false)
  const [isDropActive, setIsDropActive] = useState(false)
  const [isRescheduled, setIsRescheduled] = useState({
    isReschedule: false,
    isDrop: false,
    planDate: '',
  })
  const [isCancelClick, setIsCancelClick] = useState({
    isCancel: false,
    remark: '',
  })
  const [rePosition, setRePosition] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    isTooLeft: false,
    isTooBottom: false,
  })

  const [updateEventComplete] = useMutation(UPDATE_EVENT_COMPLETE, {
    context: {
      headers: {
        Authorization: `Bearer${' '}${user && user.token}`,
      },
    },
    update() {
      dispatch(
        toggleNotifyTagOpen({
          isSuccess: true,
          info: 'Schedule Updated',
        })
      )
    },
    onError(err) {
      console.log(err)
    },
  })

  const [updateEventForecast] = useMutation(UPDATE_EVENT_FORECAST, {
    context: {
      headers: {
        Authorization: `Bearer${' '}${user && user.token}`,
      },
    },
    update(_, { data }) {
      dispatch(
        toggleNotifyTagOpen({
          isSuccess: true,
          info: 'Schedule Updated',
        })
      )
    },
    onError(err) {
      console.log(err)
    },
  })

  const [updateEventReschedule] = useMutation(UPDATE_EVENT_RESCHEDULE, {
    context: {
      headers: {
        Authorization: `Bearer${' '}${user && user.token}`,
      },
    },
    update() {
      setIsRescheduled({ ...isRescheduled, isDrop: false, isReschedule: false })
      toggleNotifyTagOpen({
        isSuccess: true,
        info: 'Plan Rescheduled',
      })
    },
    onError(err) {
      console.log(err)
    },
  })

  const [updateEventCancel] = useMutation(UPDATE_EVENT_CANCEL, {
    context: {
      headers: {
        Authorization: `Bearer${' '}${user && user.token}`,
      },
    },
    update() {
      setIsCancelClick({
        isCancel: false,
        remark: '',
      })
      dispatch(
        toggleNotifyTagOpen({
          isSuccess: true,
          info: 'Schedule Cancelled',
        })
      )
    },
    onError(err) {
      console.log(err)
    },
  })

  const [updateDeleteEvent] = useMutation(UPDATE_EVENT_DELETE, {
    context: {
      headers: {
        Authorization: `Bearer${' '}${user && user.token}`,
      },
    },
    update() {
      dispatch(
        toggleNotifyTagOpen({
          isSuccess: true,
          info: 'Schedule Deleted',
        })
      )
    },
    onError(err) {
      console.log(err)
    },
  })

  // Handles control component view/show -----------------------------------------------
  const handleCloseWindow = () => {
    setIsDropActive(false)
    setIsCancelClick({ isCancel: false, remark: '' })
    setIsRescheduled({
      isReschedule: false,
      isDrop: false,
      planDate: '',
    })

    dispatch(closeSelectedEvent())
  }

  const handleToggleRescheduleOpen = () => {
    // Reset Other open events
    if (isCancelClick.isCancel) {
      setIsCancelClick({
        isCancel: false,
        remark: '',
      })
    }

    setIsRescheduled({
      ...isRescheduled,
      isReschedule: !isRescheduled.isReschedule,
    })
  }

  const handleToggleCancelOpen = () => {
    // Reset Other open events
    if (isRescheduled.isReschedule) {
      setIsRescheduled({ ...isRescheduled, isReschedule: false })
    }

    setIsCancelClick({
      isCancel: !isCancelClick.isCancel,
      remark: '',
    })
  }

  const handleToggleCalenderOpen = () => {
    setIsRescheduled({ ...isRescheduled, isDrop: !isRescheduled.isDrop })
  }

  // Handles perform save and get data ----------------------------------------------
  const handleGetDate = (type, date) => {
    if (date !== 'All') {
      setIsRescheduled({
        ...isRescheduled,
        planDate: dayjs(date).format('YYYY-MM-DDTHH:mm:ss'),
      })
    }
  }

  const handleCancelEvent = () => {
    if (isCancelClick.remark.trim() !== '') {
      updateEventCancel({
        variables: {
          evtId: selectedEvent.id,
          remark: isCancelClick.remark,
        },
      })
    }
  }

  const handleRescheduleEvent = () => {
    if (
      selectedEvent.planDate !==
      dayjs(isRescheduled.planDate).format('YYYY-MM-DDTHH:mm:ss')
    ) {
      updateEventReschedule({
        variables: {
          evtId: selectedEvent.id,
          planDate: isRescheduled.planDate,
        },
      })
    } else {
      dispatch(
        toggleNotifyTagOpen({
          isSuccess: false,
          info: 'Reschedule To Same Date',
        })
      )
    }
  }

  const handleDeleteEvent = () => {
    updateDeleteEvent({
      variables: {
        evtId: selectedEvent.id,
      },
    })
  }

  // Handles control components position and style changes --------------------------
  const handleResize = async () => {
    setIsDropActive(false)
    setIsCancelClick({ isCancel: false, remark: '' })

    if (isViewOpen) {
      await setRePosition({ ...position })

      setIsShow(true)
    } else {
      setIsShow(false)
    }
  }

  const autoGrowHeight = (e) => {
    //setInputValue({ ...inputValue, description: e.target.value })
    e.target.style.height = '0px'
    e.target.style.height = e.target.scrollHeight + 'px'
  }

  useEffect(() => {
    if (position) {
      handleResize()
    }
  }, [position, isViewOpen])

  useEffect(() => {
    if (selectedEvent)
      setIsRescheduled({
        ...isRescheduled,
        planDate: dayjs(selectedEvent.planDate).add(1, 'day'),
      })
  }, [selectedEvent])

  return (
    <BoxContainer rePosition={rePosition} className={`${isShow && 'active'}`}>
      {isShow && isViewOpen && selectedEvent && (
        <>
          <div className="card-header">
            {!selectedEvent.isCancelled && !selectedEvent.isRescheduled && (
              <div
                className="icon-box btn"
                onClick={() => setIsDropActive(!isDropActive)}
              >
                <MoreVert className="icon" />
                <div
                  className={`drop-list ${isDropActive && 'active'}`}
                  onMouseLeave={() => setIsDropActive(false)}
                >
                  {!selectedEvent.isCompleted && (
                    <div
                      className="drop-item"
                      onClick={() => handleToggleRescheduleOpen()}
                    >
                      Reschedule Plan
                    </div>
                  )}
                  {selectedEvent.isCompleted ? (
                    <div
                      className="drop-item"
                      onClick={() =>
                        updateEventForecast({
                          variables: { evtId: selectedEvent.id },
                        })
                      }
                    >
                      Mark as forecast
                    </div>
                  ) : (
                    <div
                      className="drop-item"
                      onClick={() =>
                        updateEventComplete({
                          variables: { evtId: selectedEvent.id },
                        })
                      }
                    >
                      Mark as done
                    </div>
                  )}
                  <div
                    className="drop-item"
                    onClick={() => handleDeleteEvent()}
                  >
                    Delete Event
                  </div>
                  {!selectedEvent.isCompleted && (
                    <div
                      className="drop-item"
                      onClick={() => handleToggleCancelOpen()}
                    >
                      Cancel
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="icon-box btn" onClick={() => handleCloseWindow()}>
              <Close className="icon" />
            </div>
          </div>
          <div className="card-body">
            <div className="card-item">
              <Event className="icon mt-2" />
              <div className="info-box">
                <h1>{selectedEvent.title}</h1>
                <div className="info-date-picker-box">
                  <span className="span-sm">
                    {moment(selectedEvent.planDate).format('dddd, MMMM D')}
                  </span>
                  {isRescheduled.isReschedule && (
                    <div
                      className="date-picker"
                      onClick={() => handleToggleCalenderOpen()}
                    >
                      <span className="span-sm mr-2">To</span>
                      <span className="span-sm">
                        {dayjs(isRescheduled.planDate).format('dddd, MMMM D')}
                      </span>
                      <ArrowDropDown className="icon" />
                      <SmallCalender
                        isOpen={isRescheduled.isDrop}
                        handleToggleCalenderOpen={handleToggleCalenderOpen}
                        handleGetDate={handleGetDate}
                        isStartEnd={false}
                        isStart={false}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="card-item">
              <PeopleAlt className="icon mt-1" />
              <div className="info-box">
                <span className="span-lg">
                  {selectedEvent.customer.company}
                </span>
                <span className="span-sm">
                  Meet with {selectedEvent.customer.personal}
                  {', '}
                  {selectedEvent.customer.position}
                </span>
              </div>
            </div>
            {selectedEvent.description !== '' &&
              selectedEvent.description !== null && (
                <div className="card-item">
                  <Notes className="icon mt-[0.15rem]" />
                  <div className="info-box">
                    <span className="span-base">
                      {selectedEvent.description}
                    </span>
                  </div>
                </div>
              )}
            {selectedEvent.isCancelled && selectedEvent.remark !== '' && (
              <div className="card-item card-item-cancel items-start">
                <EventBusy className="icon" />
                <div className="info-box">
                  <span className="span-base">{selectedEvent.remark}</span>
                </div>
              </div>
            )}
            <div className="card-item items-center">
              <AddTask className="icon" />
              <div
                className={`status-tag ${
                  selectedEvent.isCancelled
                    ? 'cancel-tag'
                    : selectedEvent.isRescheduled
                    ? 'resc-tag'
                    : selectedEvent.isCompleted
                    ? 'comp-tag'
                    : 'fore-tag'
                }`}
              >
                {selectedEvent.isCancelled
                  ? 'Cancelled'
                  : selectedEvent.isRescheduled
                  ? 'Reshcduled'
                  : selectedEvent.isCompleted
                  ? 'Completed'
                  : 'Forecast'}
              </div>
            </div>
            {!selectedEvent.isCompleted && isCancelClick.isCancel && (
              <>
                <div className="card-item items-start">
                  <NoteAlt className="icon" />
                  <div className="input-box">
                    <textarea
                      type="text"
                      className="card-desc"
                      value={isCancelClick.remark}
                      onInput={(e) => autoGrowHeight(e)}
                      onChange={(e) =>
                        setIsCancelClick({
                          ...isCancelClick,
                          remark: e.target.value,
                        })
                      }
                      placeholder="So, why is cancel?"
                    />
                  </div>
                </div>
                <div className="card-item items-center">
                  <AddTask className="icon hide" />
                  <div className="btn-box">
                    <div
                      className="cancel-btn btn"
                      onClick={() => handleCancelEvent()}
                    >
                      Cancel Plan
                    </div>
                    <div
                      className="discard-btn btn"
                      onClick={() => handleToggleCancelOpen()}
                    >
                      Discard Change
                    </div>
                  </div>
                </div>
              </>
            )}
            {isRescheduled.isReschedule && (
              <div className="card-item items-center">
                <AddTask className="icon hide" />
                <div className="btn-box">
                  <div
                    className="resc-btn btn"
                    onClick={() => handleRescheduleEvent()}
                  >
                    Reschedule Plan
                  </div>
                  <div
                    className="discard-btn btn"
                    onClick={() =>
                      setIsRescheduled({
                        ...isRescheduled,
                        isReschedule: false,
                      })
                    }
                  >
                    Discard Change
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </BoxContainer>
  )
}

const UPDATE_EVENT_COMPLETE = gql`
  mutation updateCompEvent($evtId: ID!) {
    updateCompEvent(evtId: $evtId) {
      id
      isCompleted
      isRescheduled
      isCancelled
      remark
    }
  }
`

const UPDATE_EVENT_FORECAST = gql`
  mutation updateForeEvent($evtId: ID!) {
    updateForeEvent(evtId: $evtId) {
      id
      isCompleted
    }
  }
`

const UPDATE_EVENT_RESCHEDULE = gql`
  mutation updateRescEvent($evtId: ID!, $planDate: String!) {
    updateRescEvent(evtId: $evtId, planDate: $planDate) {
      id
      planDate
    }
  }
`

const UPDATE_EVENT_CANCEL = gql`
  mutation updateCancelEvent($evtId: ID!, $remark: String!) {
    updateCancelEvent(evtId: $evtId, remark: $remark) {
      id
      remark
      isCancelled
    }
  }
`

const UPDATE_EVENT_DELETE = gql`
  mutation updateDeleteEvent($evtId: ID!) {
    deleteEvent(evtId: $evtId)
  }
`

const BoxContainer = styled.div`
  ${tw`
    fixed
    p-4
    w-full
    max-w-md
    min-h-[14rem]
    max-h-[24rem]
    bg-white
    opacity-0
    rounded-md
    pointer-events-none
    overflow-y-scroll
    scrollbar-hide
    z-[100]

    transition-all
    duration-500
    ease-in-out
  `}
  top: ${(props) =>
    props.rePosition && props.rePosition.isTooBottom
      ? `${props.rePosition.bottom}px`
      : `${props.rePosition.top}px`};
  left: ${(props) => (props.rePosition ? `${props.rePosition.left}px` : '0')};
  transform: ${(props) =>
    props.rePosition &&
    `translate(${props.rePosition.isTooLeft ? '7%' : '-101%'}, ${
      props.rePosition.isTooBottom ? `calc(-100% - 1rem)` : '0%'
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
          z-10

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
          flex
          flex-col
          font-semibold
          text-gray-600
        `}

        h1 {
          ${tw`
            text-2xl
            font-semibold
            text-gray-900
          `}
        }

        .info-date-picker-box {
          ${tw`
              flex
              items-center
              justify-start
            `}

          .date-picker {
            ${tw`
              relative
              flex
              items-center
              font-semibold
              py-1
              px-2
              min-w-[14rem]
              rounded-md
              cursor-pointer

              transition
              duration-200
              ease-in-out
            `}

            .icon {
              ${tw`
                ml-1
              `}
            }

            &:hover {
              ${tw`
                  bg-gray-200
                `}
            }
          }
        }

        .span-base {
          ${tw`
            text-base
            text-gray-700
          `}
        }

        .span-lg {
          ${tw`
            text-lg
            text-gray-700
          `}
        }

        .span-sm {
          ${tw`
            text-sm
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

      .resc-tag {
        ${tw`
          text-yellow-600
          border-yellow-500
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

      .btn-box {
        ${tw`
          flex
          items-center
          justify-start
          w-full
        `}

        .btn {
          ${tw`
            py-1
            px-3
            text-sm
            font-semibold
            rounded-md
            cursor-pointer

            transition
            duration-200
            ease-in-out
          `}
        }

        .cancel-btn {
          ${tw`
            bg-red-500
            text-gray-50
          `}

          &:hover {
            ${tw`
              bg-red-600
            `}
          }
        }

        .resc-btn {
          ${tw`
            bg-yellow-500
            text-gray-50
          `}

          &:hover {
            ${tw`
              bg-yellow-600
            `}
          }
        }

        .discard-btn {
          ${tw`
            ml-2
            text-gray-600
          `}

          &:hover {
            ${tw`
              text-gray-800
              bg-gray-200
            `}
          }
        }
      }
    }

    .card-item-cancel {
      .icon {
        ${tw`
          text-red-500
        `}
      }

      .info-box {
        span {
          ${tw`
            text-red-500
          `}
        }
      }
    }
  }

  &.active {
    ${tw`
      opacity-100
      pointer-events-auto
    `}
  }
`

export default EventCard
