import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'

// Component
import CalenderDay from '../CalenderDay/CalenderDay'

const CalenderMonth = ({ month }) => {
  return (
    <BoxContainer rowNums={month.length}>
      {month.map((row, idx) => (
        <React.Fragment key={idx}>
          {row.map((day, i) => (
            <CalenderDay key={i} day={day} rowIdx={idx} />
          ))}
        </React.Fragment>
      ))}
    </BoxContainer>
  )
}

const BoxContainer = styled.div`
  ${tw`
    flex-grow
    grid
    grid-cols-7
  `}
  grid-template-rows: ${(p) => `repeat(${p.rowNums}, minmax(0, 1fr))`};
`

export default CalenderMonth
