import React, { useState, useEffect } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import _ from 'lodash'
import moment from 'moment'
import { gql, useMutation } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'

// Redux Action
import { updateProfile } from '../../../redux/action/userAction'
import { toggleNotifyTagOpen } from '../../../redux/action/notifyAction'

import { Visibility } from '@mui/icons-material'

const MyProfile = () => {
  const dispatch = useDispatch()

  const [curView, setCurView] = useState(0)
  const [errControl, setErrControl] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [mutUserDetail, setMutUserDetail] = useState()
  const [oriUserDetail, setOriUserDetail] = useState()

  const userSignIn = useSelector((state) => state.userSignIn)
  const { user } = userSignIn

  const [updateUserContact] = useMutation(UPDATE_USER_DETAIL, {
    context: {
      headers: {
        Authorization: `Bearer${' '}${user.token}`,
      },
    },
    update(_, { data: updatedData }) {
      dispatch(updateProfile(updatedData.updateProfile))
      dispatch(
        toggleNotifyTagOpen({ isSuccess: true, info: 'Profile Updated' })
      )
    },
    onError(err) {
      dispatch(
        toggleNotifyTagOpen({ isSuccess: false, info: 'Error Create Contact' })
      )
    },
  })

  const handleViewPassword = (selected) => {
    if (selected === 1 && selected !== curView) {
      setCurView(selected)
    } else if (selected === 2 && selected !== curView) {
      setCurView(selected)
    } else if (selected === 3 && selected !== curView) {
      setCurView(selected)
    } else {
      setCurView(0)
    }
  }

  const handleToggleEdit = () => {
    setIsEdit(false)
    setMutUserDetail(oriUserDetail)
  }

  const handleSaveChange = () => {
    // Reset Error array
    setErrControl([])

    let errArr = []
    const { username, email, password, confirmPassword } = mutUserDetail

    errArr =
      username.trim() === ''
        ? email.trim() === ''
          ? password.trim() === confirmPassword.trim()
            ? ['username', 'email']
            : ['username', 'email', 'password']
          : password.trim() === confirmPassword.trim()
          ? ['username']
          : ['username', 'password']
        : email.trim() === ''
        ? password.trim() === confirmPassword.trim()
          ? ['email']
          : ['email', 'password']
        : password.trim() !== confirmPassword.trim()
        ? ['password']
        : []

    if (errArr.length > 0) {
      setErrControl([...errArr])
      return
    }

    updateUserContact({
      variables: mutUserDetail,
    })
  }

  useEffect(() => {
    if (user) {
      const { id, ...restUser } = user
      setMutUserDetail({
        userId: id,
        ...restUser,
        password: '',
        confirmPassword: '',
      })
      setOriUserDetail({
        userId: id,
        ...restUser,
        password: '',
        confirmPassword: '',
      })
    }
  }, [user])

  useEffect(() => {
    if (!_.isEqual(mutUserDetail, oriUserDetail)) {
      setIsEdit(true)
    } else {
      setIsEdit(false)
    }
  }, [mutUserDetail])

  return (
    <>
      {user && mutUserDetail && (
        <MainContainer>
          <h1 className="form-title">My Profile</h1>
          <div className="detail-box user-detail">
            <h2>Personal information</h2>
            <div className="span-box">
              <p>
                *Only your username can be change by yourself. For user change
                privileges, please let your EDP personal know.
              </p>
              <div className="input-span">
                <div className="input-box">
                  <div className="input-items">
                    <input
                      className={`${
                        errControl.includes('username') && 'err-active'
                      }`}
                      type="text"
                      onChange={(e) => {
                        setMutUserDetail({
                          ...mutUserDetail,
                          username: e.target.value,
                        })
                      }}
                      value={
                        isEdit ? mutUserDetail.username : oriUserDetail.username
                      }
                      required
                    />
                    <span>USERNAME</span>
                  </div>
                  <div className="input-items inactive">
                    <input
                      type="text"
                      value={mutUserDetail.isManager ? 'Manager' : 'User'}
                      readOnly
                    />
                    <span>PRIVILEGES</span>
                  </div>
                </div>
                <div className="input-box">
                  <div className="input-items inactive">
                    <input
                      type="text"
                      value={moment(user.createdAt).format('LL')}
                      readOnly
                    />
                    <span>JOINED ON</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="detail-box user-email">
            <h2>E-mail address</h2>
            <div className="span-box">
              <p>
                Change to your latest using email and please don't put your
                personal email. *Email should be provided by company.'
              </p>
              <div className="input-span">
                <div className="input-box">
                  <div className="input-items">
                    <input
                      className={`${
                        errControl.includes('email') && 'err-active'
                      }`}
                      type="email"
                      onChange={(e) => {
                        setMutUserDetail({
                          ...mutUserDetail,
                          email: e.target.value,
                        })
                      }}
                      value={isEdit ? mutUserDetail.email : oriUserDetail.email}
                      required
                    />
                    <span>E-MAIL ADDRESS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="detail-box user-pass">
            <h2>Password</h2>
            <div className="span-box">
              <p>
                Any case of word and symbol is allowed to use as password. But
                be sure to remember it.
              </p>
              <div className="input-span">
                <div className="input-box">
                  <div className="input-items">
                    <input
                      type={`${curView === 2 ? 'text' : 'password'}`}
                      onChange={(e) => {
                        setMutUserDetail({
                          ...mutUserDetail,
                          password: e.target.value,
                        })
                      }}
                      value={
                        isEdit ? mutUserDetail.password : oriUserDetail.password
                      }
                      required
                    />
                    <span>NEW PASSWORD</span>

                    <Visibility
                      onClick={() => handleViewPassword(2)}
                      className="visi-btn"
                    />
                  </div>
                  <div className="input-items">
                    <input
                      className={`${
                        errControl.includes('password') && 'err-active'
                      }`}
                      type={`${curView === 3 ? 'text' : 'password'}`}
                      onChange={(e) => {
                        setMutUserDetail({
                          ...mutUserDetail,
                          confirmPassword: e.target.value,
                        })
                      }}
                      value={
                        isEdit
                          ? mutUserDetail.confirmPassword
                          : oriUserDetail.confirmPassword
                      }
                      required
                    />
                    <span>CONFIRM PASSWORD</span>
                    <Visibility
                      onClick={() => handleViewPassword(3)}
                      className="visi-btn"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isEdit && (
            <div className="card-footer">
              <div
                className={`btn save-btn active`}
                onClick={() => handleSaveChange()}
              >
                <span>Save Change</span>
              </div>
              <div
                className="btn discard-btn"
                onClick={() => handleToggleEdit()}
              >
                <span>Discard Change</span>
              </div>
            </div>
          )}
        </MainContainer>
      )}
    </>
  )
}

const UPDATE_USER_DETAIL = gql`
  mutation updateProfile(
    $userId: ID!
    $email: String
    $username: String
    $password: String
    $confirmPassword: String
  ) {
    updateProfile(
      userId: $userId
      email: $email
      username: $username
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      username
      isManager
      createdAt
      token
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

  .form-title {
    ${tw`
      mb-6
      text-xl
      md:text-2xl
      font-semibold
    `}
  }

  .detail-box {
    ${tw`
      w-full
      flex
      flex-col
      items-start
      justify-start
    `}

    h2 {
      ${tw`
        py-1
        w-full
        font-semibold
        border-b
        border-gray-300
      `}
    }

    .span-box {
      ${tw`
        mt-4
        mb-6
        w-full
        flex
        flex-col
        lg:flex-row
        items-start
        justify-between
      `}

      p {
        ${tw`
          w-full
          lg:max-w-[14.5rem]
          text-sm
          font-semibold
          text-gray-600
        `}
      }

      .input-span {
        ${tw`
          mt-4
          lg:mt-0
          lg:ml-4
          w-full
          flex
          flex-wrap
          items-start
          justify-between
        `}
      }

      .input-box {
        ${tw`
          w-full
          lg:max-w-[16.5rem]
          flex
          flex-col
          items-start
          justify-start
        `}

        .input-items {
          ${tw`
            relative
            w-full
            mb-4
          `}

          input {
            ${tw`
              w-full
              pl-3
              pr-10
              py-3
              bg-gray-50
              border-2
              border-gray-300
              rounded-md
            `}

            :focus {
              ${tw`
                outline-none
                border-gray-600
              `}
            }
          }

          .err-active {
            ${tw`
              border-red-500
            `}
          }

          span {
            ${tw`
              absolute
              left-0
              px-3
              py-[14px]
              font-bold
              text-gray-500
              pointer-events-none

              transition-all
              duration-200
              ease-in-out
            `}
          }

          .visi-btn {
            ${tw`
              absolute
              right-3
              my-[13px]
              text-gray-400
              cursor-pointer

              transition
              duration-200
              ease-in-out
            `}

            :hover {
              ${tw`
                text-gray-500
              `}
            }
          }

          input:read-only ~ span,
          input:focus ~ span,
          input:valid ~ span {
            ${tw`
              py-0
              top-0
              text-xs
            `}
          }
        }

        .input-items.inactive {
          ${tw`
            pointer-events-none
          `}
        }
      }
    }
  }

  .card-footer {
    ${tw`
      flex
      items-center
      mt-2
    `}

    .btn {
      ${tw`
        flex
        items-center
        justify-center
        py-2
        w-32
        text-sm
        font-semibold        
        rounded-md
        cursor-pointer
        overflow-hidden

        transition-all
        duration-200
        ease-in-out
      `}

      span {
        ${tw`
          min-w-[7rem]
          text-center
        `}
      }
    }

    .save-btn {
      ${tw`
          h-0
          w-0
          bg-blue-600
          text-gray-50
        `}

      &:hover {
        ${tw`
          bg-blue-500
        `}
      }
    }

    .save-btn.active {
      ${tw`
        mr-2
        h-auto
        w-32
      `}
    }

    .discard-btn {
      ${tw`
        bg-gray-200
        text-gray-600
      `}

      &:hover {
        ${tw`
          bg-gray-300
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

export default MyProfile
