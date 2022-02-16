import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'

// Child components
import ReportSidebar from './ReportSidebar/ReportSidebar'
import ReportLister from './ReportLister/ReportLister'

const ReportPage = () => {
  return (
    <ReportSection>
      <ReportSidebar />
      <ReportLister />
    </ReportSection>
  )
}

const ReportSection = styled.div`
  ${tw`
    relative
    flex
    pt-20
    w-full
    h-screen
    max-h-screen
  `}
`

export default ReportPage
