import React, { useState } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'

const ErrorPage = () => {
  const tempArr = [1, 2, 3, 4, 5]

  return <BoxContainer>hello</BoxContainer>
}

const BoxContainer = styled.div`
  ${tw`
    w-full
    h-full
  `}

  .inner-container {
    ${tw`
        border-2
        border-black
        flex
        items-center
        justify-start
        mx-auto
        h-full
        w-full
        max-w-6xl
        overflow-x-scroll
        scrollbar-hide
    `}
  }
`

export default ErrorPage
