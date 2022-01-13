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

const CalenderMain = () => {
  const calenderInfo = useSelector((state) => state.calenderInfo)
  const { monthIndex } = calenderInfo

  const [currentMonth, setCurrentMonth] = useState(getMonth(monthIndex))

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex))
  }, [monthIndex])

  return (
    <CalenderSection>
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
