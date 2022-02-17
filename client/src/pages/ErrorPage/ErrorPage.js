import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'

import ErrorSvg from './ErrorSvg'

const ErrorPage = () => {
  return (
    <BoxContainer>
      <div className="error-svg-box">
        <ErrorSvg />
      </div>
    </BoxContainer>
  )
}

const BoxContainer = styled.div`
  ${tw`
    flex
    items-center
    justify-center
    w-screen
    h-screen
  `}

  .error-svg-box {
    ${tw`
      w-full
      max-w-xl
    `}
  }
`

export default ErrorPage
