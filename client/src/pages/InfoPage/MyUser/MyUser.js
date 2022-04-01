import React, { useEffect, useState } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { gql, useSubscription, useApolloClient } from '@apollo/client'

import { Search, Close } from '@mui/icons-material'

// Redux Action
import { getAllUsers, updateUserList } from '../../../redux/action/userAction'

// Child Component
import UserCard from './ChildComponents/UserCard'

const MyUser = () => {
  const client = useApolloClient()
  const dispatch = useDispatch()
  const [userList, setUserList] = useState([])
  const [isSearchOpen, setIsSearchopen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [filteredSuggestions, setFilteredSuggestions] = useState([])

  const [searchParams, setSearchParams] = useSearchParams()
  const name = searchParams.get('name')

  const userSignIn = useSelector((state) => state.userSignIn)
  const { user } = userSignIn

  const contactBook = useSelector((state) => state.contactBook)
  const { allUsers } = contactBook

  // const [getAllUserListItem, { data: allUserData }] = useLazyQuery(
  //   GET_ALL_USER,
  //   {
  //     context: {
  //       headers: {
  //         Authorization: `Bearer${' '}${user && user.token}`,
  //       },
  //     },
  //   }
  // )

  const { data: subNewUser } = useSubscription(CREATED_USER_SUBSCRIPTION)

  const { data: subUpdateUser } = useSubscription(UPDATED_USER_SUBSCRIPTION)

  // Work around for useLazyQuery trigger on every re-render
  const handleGetUserList = async () => {
    const res = await client.query({
      query: GET_ALL_USER,
      fetchPolicy: 'no-cache',
      context: {
        headers: {
          Authorization: `Bearer${' '}${user && user.token}`,
        },
      },
    })

    dispatch(getAllUsers(res.data.getUsers))
  }

  const handleSearchItem = () => {
    if (searchValue === '') {
      setSearchValue('')
      setFilteredSuggestions(allUsers)
      return
    }

    const filterSearchList = userList.filter(
      (suggestion) =>
        suggestion.username.toLowerCase().indexOf(searchValue.toLowerCase()) >
        -1
    )

    setFilteredSuggestions(filterSearchList)
  }

  useEffect(() => {
    if (allUsers.length === 0 && name === 'users') handleGetUserList()

    if (allUsers.length > 0) {
      setUserList(allUsers)
      setFilteredSuggestions(allUsers)
    }
  }, [name, allUsers])

  // Subscription useEffect
  useEffect(() => {
    if (subNewUser) {
      dispatch(updateUserList(subNewUser.userCreated))
    }

    if (subUpdateUser) {
      dispatch(updateUserList(subUpdateUser.userUpdated))
    }
  }, [subNewUser, subUpdateUser])

  useEffect(() => {
    handleSearchItem()
  }, [searchValue, allUsers])

  return (
    <MainContainer>
      <div className="form-header">
        <h1 className="form-title">My Contact</h1>

        <div className="form-btn-box">
          <div className={`form-searchbar-box ${isSearchOpen && 'active'}`}>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search a user"
            />
            {!isSearchOpen ? (
              <div
                className="icon-box search-icon-box"
                onClick={() => {
                  setSearchValue('')
                  setIsSearchopen(true)
                }}
              >
                <Search className="icon" />
              </div>
            ) : (
              <div
                className="icon-box search-icon-box"
                onClick={() => {
                  setSearchValue('')
                  setIsSearchopen(false)
                }}
              >
                <Close className="icon" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="list-container">
        <div className="list-header">
          <h2>User Info</h2>
          <span>Manager Level</span>
        </div>
        {filteredSuggestions &&
          filteredSuggestions.map((usr) => (
            <UserCard key={usr.id} info={usr} token={user.token} />
          ))}
      </div>
    </MainContainer>
  )
}

const GET_ALL_USER = gql`
  query getUsers {
    getUsers {
      id
      email
      username
      isManager
    }
  }
`

const CREATED_USER_SUBSCRIPTION = gql`
  subscription {
    userCreated {
      id
      email
      username
      isManager
    }
  }
`

const UPDATED_USER_SUBSCRIPTION = gql`
  subscription {
    userUpdated {
      id
      email
      username
      isManager
    }
  }
`

const MainContainer = styled.div`
  ${tw`
    w-full
    flex
    flex-col
    items-start
    justify-start
  `}
  animation: slideInFromRight 0.5s ease alternate forwards;

  .icon-box {
    ${tw`
        relative
        flex
        items-center
        justify-center
        w-9
        h-9
        p-2
        min-w-[2.25rem]
        rounded-full
        cursor-pointer

        transition
        duration-200
        ease-in-out
      `}

    .icon {
      ${tw`
        w-full
        h-full
        text-gray-600
        pointer-events-none
      `}
    }

    .drop-list {
      ${tw`
          absolute
          bottom-0
          right-0
          w-0
          h-0
          bg-white
          opacity-0
          rounded-md
          overflow-hidden
          pointer-events-none

          transition-all
          duration-200
          ease-in-out
        `}
      transform: translateY(100%);

      .drop-item {
        ${tw`
            w-full
            py-2
            px-3
            text-sm
            font-semibold
            text-gray-700
            rounded-md

            transition-all
            duration-200
            ease-in-out
          `}

        &:hover {
          ${tw`
              bg-gray-200
            `}
        }
      }
    }

    .drop-list.active {
      ${tw`
          h-auto
          w-auto
          min-w-[9rem]
          p-1
          opacity-100
          pointer-events-auto
        `}
      box-shadow: 2px 3px 15px 3px rgba(0, 0, 0, 0.25);
    }

    &:hover {
      ${tw`
          bg-gray-200
        `}

      .icon {
        ${tw`
          text-gray-700
        `}
      }
    }
  }

  .form-header {
    ${tw`
      flex
      items-center
      justify-start
      mb-6
      w-full
    `}

    .form-btn-box {
      ${tw`
        relative
        flex
        items-center
        ml-auto
      `}
    }

    .form-searchbar-box {
      ${tw`
        relative
        flex
        items-center
        justify-center
        mr-3
        h-9
        w-9
        bg-white
        rounded-full

        transition-all
        duration-500
        ease-in-out
      `}
      box-shadow: 2px 3px 15px 3px rgba(0, 0, 0, 0.2);

      input {
        ${tw`
          hidden
          pl-3
          pr-10
          w-full
          h-full
          outline-none
          rounded-3xl
        `}
      }

      .search-icon-box {
        ${tw`
          absolute
          top-0
          right-0
        `}

        &::after {
          content: 'Search User';
          ${tw`
            absolute
            top-1/2
            right-0
            py-1
            w-24
            text-xs
            text-center
            font-semibold
            opacity-0
            bg-gray-700
            text-gray-50
            rounded-md
            pointer-events-none

            transition-all
            duration-200
            ease-in-out
          `}
          transform: translate(-70%, -50%);
        }

        &:hover {
          &::after {
            opacity: 1;
            transform: translate(calc(-45% - 5px), -50%);
          }
        }
      }

      &.active {
        ${tw`
          w-72
          rounded-3xl
        `}

        input {
          ${tw`
            inline-flex
          `}
        }

        .search-icon-box {
          box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
        }
      }
    }
  }

  .form-title {
    ${tw`
      text-xl
      md:text-2xl
      font-semibold
    `}
  }

  .list-container {
    ${tw`
        flex
        flex-col
        w-full
    `}

    .list-header {
      ${tw`
        flex
        items-center
        justify-start
        pr-3
      `}

      h2 {
        ${tw`
          flex-grow
          text-lg
          font-semibold
        `}
      }

      span {
        ${tw`
          flex
          items-center
          justify-center
          w-28
          font-semibold
        `}
      }
    }
  }

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
`

export default MyUser
