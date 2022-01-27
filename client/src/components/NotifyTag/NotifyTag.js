import React, { useEffect } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { toggleNotifyTagOpen } from '../../redux/action/notifyAction'

const NotifyTag = () => {
  const dispatch = useDispatch()

  const notifyInfo = useSelector((state) => state.notifyInfo)
  const { isShow, isSuccess, info } = notifyInfo

  useEffect(() => {
    if (isShow) {
      setTimeout(() => {
        dispatch(
          toggleNotifyTagOpen({
            isSuccess: null,
            info: '',
          })
        )
      }, 5000)
    }
  }, [isShow])

  return (
    <BoxContainer isShow={isShow} isSuccess={isSuccess}>
      <span className={`${isSuccess ? 'text-green' : 'text-red'}`}>{info}</span>
    </BoxContainer>
  )
}

const BoxContainer = styled.div`
  ${tw`
    absolute
    top-0
    left-1/2
    flex
    items-center
    justify-center
    w-[80%]
    max-w-xs
    shadow-xl
    rounded-md
    z-30

    transition-all
    duration-500
    ease-in-out
  `}
  height: ${(props) => (props.isShow ? `3.5rem` : `0rem`)};
  opacity: ${(props) => (props.isShow ? `100%` : `0%`)};
  transform: ${(props) =>
    props.isShow ? `translate(-50%, 10%)` : `translate(-50%, -100%)`};
  background-color: ${(props) =>
    props.isSuccess ? `rgba(52, 211, 153, 0.8)` : `rgba(248, 113, 113, 0.8)`};

  .text-green {
    ${tw`
        font-semibold
        text-green-700
    `}
  }

  .text-red {
    ${tw`
        font-semibold
        text-red-700
    `}
  }
`

export default NotifyTag
