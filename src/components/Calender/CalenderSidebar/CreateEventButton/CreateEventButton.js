import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'

// mui icons
import { Add } from '@mui/icons-material'

const CreateEventButton = () => {
  return (
    <BoxContainer>
      <div className="create-btn">
        <Add className="icon" />
        <span>Create</span>
      </div>
    </BoxContainer>
  )
}

const BoxContainer = styled.div`
  ${tw`
    flex
    items-center
    py-3
    px-2
    w-full
  `}

  .create-btn {
    ${tw`
        flex
        items-center
        justify-start
        py-2
        pl-4
        pr-8
        rounded-3xl
        cursor-pointer

        transition
        duration-200
        ease-in-out
    `}
    box-shadow: -0px 1.5px 2px 0px rgba(0,0,0,0.26);

    &:hover {
      box-shadow: -0px 6px 10px 0px rgba(0, 0, 0, 0.26);
    }

    .icon {
      ${tw`
        h-8
        w-8
        text-blue-600
      `}
    }

    span {
      ${tw`
        pl-3
        font-semibold
        text-gray-600
      `}
    }
  }
`

export default CreateEventButton
