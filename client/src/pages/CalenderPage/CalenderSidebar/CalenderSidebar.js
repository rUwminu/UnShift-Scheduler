import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'

// Child Components
import CreateEventButton from './CreateEventButton/CreateEventButton'
import SmallCalender from './SmallCalender/SmallCalender'
import EventFilterCheckBox from './EventFilterCheckbox/EventFilterCheckBox'

const CalenderSidebar = () => {
  return (
    <BoxContainer>
      <CreateEventButton />
      <div className="scroll-container">
        <SmallCalender />
        <EventFilterCheckBox />
      </div>
    </BoxContainer>
  )
}

const BoxContainer = styled.div`
  ${tw`
    flex-grow
    h-full
    w-full
    max-w-[16.5rem]
  `}

  .scroll-container {
    ${tw`
      px-4
      w-full
    `}
  }
`

export default CalenderSidebar
