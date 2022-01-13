import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'

// Child Components
import CreateEventButton from './CreateEventButton/CreateEventButton'
import SmallCalender from './SmallCalender/SmallCalender'

const CalenderSidebar = () => {
  return (
    <BoxContainer>
      <CreateEventButton />
      <div className="scroll-container">
        <SmallCalender />
      </div>
    </BoxContainer>
  )
}

const BoxContainer = styled.div`
  ${tw`
    flex-grow
    w-full
    max-w-[16.5rem]
  `}

  .scroll-container {
    ${tw`
      px-4
      w-full
      overflow-y-scroll
      scrollbar-hide
    `}
  }
`

export default CalenderSidebar
