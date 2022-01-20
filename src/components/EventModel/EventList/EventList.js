import React from 'react'
import dayjs from 'dayjs'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

const EventList = () => {
  return <BoxContainer>Hello</BoxContainer>
}

const BoxContainer = styled.div`
  ${tw`
    fixed
    top-0
    right-0
    w-full
    max-w-md
    h-screen
    bg-white

    transition-all
    duration-500
    ease-in-out

    z-10
  `}
  box-shadow: -4px 0px 32px -3px rgba(0,0,0,0.40);
  transform: translateX(100%);
`

export default EventList
