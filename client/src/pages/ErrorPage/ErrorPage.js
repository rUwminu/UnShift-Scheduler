import React, { useState } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'

const ErrorPage = () => {
  const tempArr = [1, 2, 3, 4, 5]

  return (
    <BoxContainer>
      <div className="inner-container">
        {tempArr.map((x, idx) => (
          <ListBox key={idx} />
        ))}
      </div>
    </BoxContainer>
  )
}

const ListBox = () => {
  const [isHide, setIsHide] = useState(false)

  return (
    <div className={`list-box ${isHide && 'hide'}`}>
      <h2 className="list-title" onClick={() => setIsHide(!isHide)}>
        Title Name
      </h2>
      <div className="list-items" />
    </div>
  )
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

    .list-box {
      ${tw`
        border-2
        border-red-500
        flex
        flex-col
        justify-start
        items-center
        h-full
        min-w-[18rem]

        transition-all
        duration-500
        ease-in-out
      `}

      .list-title {
        ${tw`
            flex
            items-center
            justify-start
            border-2
            border-blue-500
            px-4
            py-3
            w-full
            text-xl
            font-semibold
            cursor-pointer

            transition-all
            duration-500
            ease-in-out
        `}
      }

      .list-items {
        ${tw`
            w-full
            h-full
            bg-gray-300
        `}
      }
    }

    .list-box.hide {
      ${tw`
        max-w-[3rem]
        min-w-[3rem] 
      `}

      .list-title {
        ${tw`
            py-0
            text-base
        `}
        width: 10rem;
        height: 3rem;
        transform: translateY(80px) rotate(90deg);
      }

      .list-items {
        ${tw`
            opacity-0
            pointer-events-none
        `}
      }
    }
  }
`

export default ErrorPage
