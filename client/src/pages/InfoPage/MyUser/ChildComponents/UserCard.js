import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { v4 } from 'uuid'
import { useDispatch } from 'react-redux'
import { gql, useMutation } from '@apollo/client'

import { addNotifications } from '../../../../redux/action/notifyAction'

const UserCard = ({ info, token }) => {
  const dispatch = useDispatch()
  const { id, email, username, isManager } = info

  const [updateUserLevel] = useMutation(UPDATE_USER_LEVEL, {
    context: {
      headers: {
        Authorization: `Bearer${' '}${token && token}`,
      },
    },
    update() {
      dispatch(
        addNotifications({
          id: v4().toString(),
          type: 'success',
          message: 'User Updated',
        })
      )
    },
    onError(err) {
      dispatch(
        addNotifications({
          id: v4().toString(),
          type: 'danger',
          message: 'Error Update',
        })
      )
    },
  })

  const handleToggleUserLevel = () => {
    updateUserLevel({
      variables: {
        userId: id,
      },
    })
  }

  return (
    <UserCardContainer>
      <div className="left-box">
        <h2>{username}</h2>
        <h3>{email}</h3>
      </div>
      <div className="right-box">
        <div
          className={`toggle-btn-box ${
            isManager ? 'active-green' : 'active-gray'
          } `}
          onClick={() => handleToggleUserLevel()}
        >
          <div className={`toggle-btn ${isManager && 'active'}`} />
        </div>
      </div>
    </UserCardContainer>
  )
}

const UPDATE_USER_LEVEL = gql`
  mutation changeUserLevel($userId: ID!) {
    changeUserLevel(userId: $userId) {
      id
    }
  }
`

const UserCardContainer = styled.div`
  ${tw`
    flex
    items-center
    justify-start
    px-3
    py-1
    rounded-2xl
    cursor-pointer

    transition
    duration-200
    ease-out
  `}

  &:hover {
    ${tw`
        ring-1
        ring-gray-400
    `}
  }

  .left-box {
    ${tw`
        flex-grow
        flex
        items-center
        justify-between
    `}

    h2 {
      ${tw`
        w-full
        font-semibold
      `}
    }

    h3 {
      ${tw`
        w-full
        font-semibold
        text-gray-600
      `}
    }
  }

  .right-box {
    ${tw`
      flex
      items-center
      justify-center
      w-28
    `}

    .toggle-btn-box {
      ${tw`
        relative
        p-1
        w-12
        h-6
        ring-1
        ring-gray-600
        rounded-2xl
      `}

      .toggle-btn {
        ${tw`
            absolute
            top-1/2
            h-4
            w-4
            bg-white
            ring-1
            ring-gray-600
            rounded-full
            shadow-md

            transition-all
            duration-200
            ease-in-out
        `}
        left: 0.25rem;
        transform: translateY(-50%);

        &.active {
          left: calc(100% - 1.25rem);
        }
      }

      &.active-gray {
        ${tw`
            bg-gray-200
        `}
      }

      &.active-green {
        ${tw`
            bg-green-400
        `}
      }
    }
  }
`

export default UserCard
