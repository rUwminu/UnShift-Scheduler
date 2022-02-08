import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'

const ReportSidebar = () => {
  return <BoxContainer>Sidebar</BoxContainer>
}

const BoxContainer = styled.div`
  ${tw`
    px-4
    h-full
    w-full
    md:max-w-[16.5rem]
  `}
`

export default ReportSidebar
