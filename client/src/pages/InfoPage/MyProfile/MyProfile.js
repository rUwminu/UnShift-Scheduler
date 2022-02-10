import React, { useState, useEffect } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import moment from 'moment'

// Redux
import { useDispatch, useSelector } from 'react-redux'

import { Visibility } from '@mui/icons-material'

const MyProfile = () => {
  const [curView, setCurView] = useState(0)
  const [userDetail, setUserDetail] = useState({})

  const userSignIn = useSelector((state) => state.userSignIn)
  const { user } = userSignIn

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

  useEffect(() => {
    if (user) setUserDetail(user)
  }, [user])

  return (
    <MainContainer>
      <h1 className="form-title">My Profile</h1>
      <div className="detail-box user-detail">
        <h2>Personal information</h2>
        <div className="span-box">
          <p>
            Assertively utilize adaptive customer services for future proof
            palforms. Completely drive optimal markets.
          </p>
          <div className="input-span">
            <div className="input-box">
              <div className="input-items">
                <input type="text" value={userDetail.username} required />
                <span>USERNAME</span>
              </div>
              <div className="input-items">
                <input
                  type="text"
                  value={userDetail.isManager ? 'Manager' : 'User'}
                  required
                />
                <span>PRIVILEGES</span>
              </div>
            </div>
            <div className="input-box">
              <div className="input-items inactive">
                <input
                  type="text"
                  value={moment(user.createdAt).format('LL')}
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
            Assertively utilize adaptive customer services for future proof
            palforms. Completely drive optimal markets.
          </p>
          <div className="input-span">
            <div className="input-box">
              <div className="input-items">
                <input type="email" value={userDetail.email} required />
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
            Assertively utilize adaptive customer services for future proof
            palforms. Completely drive optimal markets.
          </p>
          <div className="input-span">
            <div className="input-box">
              <div className="input-items">
                <input
                  type={`${curView === 2 ? 'text' : 'password'}`}
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
                  type={`${curView === 3 ? 'text' : 'password'}`}
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

          span {
            ${tw`
              absolute
              left-0
              px-3
              py-[14px]
              font-bold
              text-gray-500

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
