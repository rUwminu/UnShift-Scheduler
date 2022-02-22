import React, { useState, useEffect } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

// Child components
import CalenderHeader from './CalenderHeader/CalenderHeader'
import CalenderMonth from './CalenderMonth/CalenderMonth'
import CalenderSidebar from './CalenderSidebar/CalenderSidebar'

// Utils
import { getMonth } from '../../utils/GlobalUtils'

// Global Components
import { EventAdd } from '../../components/index'

const CalenderMain = () => {
  const calenderInfo = useSelector((state) => state.calenderInfo)
  const { monthIndex } = calenderInfo

  const eventInfo = useSelector((state) => state.eventInfo)
  const { isAddOpen } = eventInfo

  const [currentMonth, setCurrentMonth] = useState(
    getMonth(monthIndex, monthIndex)
  )

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex))
  }, [monthIndex])

  return (
    <CalenderSection>
      {isAddOpen && <EventAdd />}
      <CalenderHeader />
      <div className="body-container">
        <CalenderSidebar />
        <CalenderMonth month={currentMonth} view={'base'} />
      </div>
    </CalenderSection>
  )
}

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
