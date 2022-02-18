import React, { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'
import dayjs from 'dayjs'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

// Redux action
import { closeSelectedEvent } from '../../../redux/action/eventAction'

import { ArrowDropDown } from '@mui/icons-material'

// Child components
import { SmallCalender } from '../../../components/index'
import UserLister from './UserLister/UserLister'
import ManagerLister from './ManagerLister/ManagerLister'

const ReportLister = () => {
  const dispatch = useDispatch()

  const userSignIn = useSelector((state) => state.userSignIn)
  const { user } = userSignIn

  const eventInfo = useSelector((state) => state.eventInfo)
  const { isViewOpen } = eventInfo

  const [pickedDate, setPickedDate] = useState({
    startDate: dayjs().format('YYYY-MM-DD'),
    endDate: 'All',
  })
  const [pickerControl, setPickerControl] = useState({
    isStartCalenderDrop: false,
    isEndCalenderDrop: false,
  })
  const [reportList, setReportList] = useState([])

  const handleGetDate = (type, date) => {
    if (date !== 'All') {
      if (type) {
        setPickedDate({
          ...pickedDate,
          startDate: dayjs(date).format('YYYY-MM-DD'),
        })
      } else if (!type) {
        setPickedDate({
          ...pickedDate,
          endDate: dayjs(date).format('YYYY-MM-DD'),
        })
      }
    } else {
      if (type) {
        setPickedDate({
          ...pickedDate,
          startDate: 'All',
        })
      } else if (!type) {
        setPickedDate({
          ...pickedDate,
          endDate: 'All',
        })
      }
    }
  }

  const handleToggleCalenderOpen = (type) => {
    if (type) {
      setPickerControl({
        ...pickerControl,
        isStartCalenderDrop: !pickerControl.isStartCalenderDrop,
      })
    } else if (!type) {
      setPickerControl({
        ...pickerControl,
        isEndCalenderDrop: !pickerControl.isEndCalenderDrop,
      })
    }
  }

  const handleGenerateReport = () => {
    const exportDateTime = dayjs().format().toString()

    const newData = reportList.map((evt) => {
      const {
        user: docUser,
        customer,
        title,
        description,
        planDate,
        compDate,
        remark,
        isCancelled,
        isCompleted,
        isRescheduled,
      } = evt

      return {
        aSaleman: docUser ? docUser.username : user.username,
        bCustomer: customer.company,
        cPersonal: customer.personal,
        dTitle: title,
        eDescription: description,
        'fPlan Date': dayjs(planDate).format('DD/MM/YYYY'),
        'gLast Update':
          compDate !== '' ? dayjs(compDate).format('DD/MM/YYYY') : '',
        hStatus: isCancelled
          ? 'Cancel'
          : isRescheduled
          ? 'Reschedule'
          : isCompleted
          ? 'Complete'
          : 'Forecast',
        'iCancel Remark': remark,
      }
    })

    var wscols = [
      { wch: 16 },
      { wch: 40 },
      { wch: 20 },
      { wch: 20 },
      { wch: 40 },
      { wch: 12 },
      { wch: 12 },
      { wch: 12 },
      { wch: 40 },
    ]

    const workSheet = XLSX.utils.json_to_sheet(newData)
    const workBook = XLSX.utils.book_new()

    workSheet['!cols'] = wscols

    XLSX.utils.book_append_sheet(workBook, workSheet, 'Events Report')

    //Buffer
    let buf = XLSX.write(workBook, { bookType: 'xlsx', type: 'buffer' })
    //Binary string
    XLSX.write(workBook, { bookType: 'xlsx', type: 'binary' })
    //Download
    XLSX.writeFile(workBook, `EventReport${exportDateTime}.xlsx`)
  }

  useEffect(() => {
    if (isViewOpen)
      setPickerControl({ isStartCalenderDrop: false, isEndCalenderDrop: false })
  }, [isViewOpen])

  return (
    <BoxContainer>
      <div className="list-header">
        <h1>Scheduled Event</h1>
        <div className="list-control-box">
          <div className="datetime-picker-container">
            <div
              className="date-picker"
              onClick={() => {
                setPickerControl({
                  isStartCalenderDrop: !pickedDate.isStartCalenderDrop,
                  isEndCalenderDrop: false,
                })

                if (isViewOpen) dispatch(closeSelectedEvent())
              }}
            >
              <h2>From</h2>
              <p>{pickedDate.startDate}</p>
              <ArrowDropDown className="icon" />
              <SmallCalender
                isOpen={pickerControl.isStartCalenderDrop}
                handleToggleCalenderOpen={handleToggleCalenderOpen}
                handleGetDate={handleGetDate}
                isStartEnd={true}
                isStart={true}
              />
            </div>
            <span className="date-spacer" />
            <div
              className="date-picker"
              onClick={() => {
                setPickerControl({
                  isStartCalenderDrop: false,
                  isEndCalenderDrop: !pickedDate.isEndCalenderDrop,
                })

                if (isViewOpen) dispatch(closeSelectedEvent())
              }}
            >
              <h2>To</h2>
              <p>{pickedDate.endDate}</p>
              <ArrowDropDown className="icon" />
              <SmallCalender
                isOpen={pickerControl.isEndCalenderDrop}
                handleToggleCalenderOpen={handleToggleCalenderOpen}
                handleGetDate={handleGetDate}
                isStartEnd={true}
                isStart={false}
              />
            </div>
          </div>
          <div className="generate-btn" onClick={() => handleGenerateReport()}>
            Get Report
          </div>
        </div>
      </div>
      <div className="list-body">
        {user && user.isManager ? (
          <ManagerLister
            pickedDate={pickedDate}
            setReportList={setReportList}
          />
        ) : (
          <UserLister pickedDate={pickedDate} setReportList={setReportList} />
        )}
      </div>
    </BoxContainer>
  )
}

const BoxContainer = styled.div`
  ${tw`
    flex-grow
    flex
    flex-col
    items-start
    justify-start
    h-full
  `}

  .list-header {
    ${tw`
      flex
      flex-col
      h-auto
      w-full
    `}

    h1 {
      ${tw`
        text-2xl
        font-semibold
        text-gray-900
      `}
    }

    .list-control-box {
      ${tw`
        flex
        items-center
        justify-start
        mb-1
      `}

      .generate-btn {
        ${tw`
          ml-6
          py-1
          px-4
          font-semibold
          bg-blue-500
          text-gray-50
          cursor-pointer
          rounded-md

          transition
          duration-200
          ease-in-out
        `}

        &:hover {
          ${tw`
            bg-blue-600
          `}
        }
      }
    }

    .datetime-picker-container {
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
          rounded-md
          cursor-pointer

          transition
          duration-200
          ease-in-out
        `}

        h2 {
          ${tw`
            mr-3
            text-gray-700
          `}
        }

        p {
          ${tw`
            min-w-[4.5rem]
            text-gray-600
          `}
        }

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

      .date-spacer {
        ${tw`
          mx-6
          h-[2px]
          w-10
          bg-gray-600
          rounded-xl
        `}
      }
    }
  }

  .list-body {
    ${tw`
      h-full
      w-full
      border
    border-gray-400
      overflow-y-scroll
      scrollbar-hide
    `}
  }
`

export default ReportLister
