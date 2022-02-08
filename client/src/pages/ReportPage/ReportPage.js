import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'

// Child components
import ReportHeader from './ReportHeader/ReportHeader'
import ReportSidebar from './ReportSidebar/ReportSidebar'
import ReportLister from './ReportLister/ReportLister'

const ReportPage = () => {
  return (
    <ReportSection>
      <ReportHeader />
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

export default ReportPage
