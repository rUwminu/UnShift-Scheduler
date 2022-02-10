import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'

// Child components
import ReportSidebar from './ReportSidebar/ReportSidebar'
import ReportLister from './ReportLister/ReportLister'

const ReportPage = () => {
  return (
    <ReportSection>
      <div className="body-container">
        <ReportSidebar />
        <ReportLister />
      </div>
    </ReportSection>
  )
}

const ReportSection = styled.div`
  ${tw`
    relative
    pt-20
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

export default ReportPage
