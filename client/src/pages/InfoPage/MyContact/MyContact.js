import React, { useState, useEffect } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import moment from 'moment'

const MyContact = () => {
  return (
    <MainContainer>
      <h1 className="form-title">My Contact</h1>
    </MainContainer>
  )
}

const MainContainer = styled.div`
  ${tw`
    w-full
    flex
    flex-col
    items-start
    justify-start
  `}
  animation: slideInFromRight 0.5s ease alternate forwards;

  @keyframes slideInFromRight {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0%);
    }
  }

  .form-title {
    ${tw`
      mb-6
      text-xl
      md:text-2xl
      font-semibold
    `}
  }
`

export default MyContact
