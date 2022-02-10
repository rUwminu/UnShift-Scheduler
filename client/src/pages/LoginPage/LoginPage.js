import React, { useEffect, useState } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'

// Redux Action
import { signin } from '../../redux/action/userAction'

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const InputState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  const [inputValue, setInputValue] = useState(InputState)
  const [isRegister, setIsRegister] = useState(true)
  const [isError, setIsError] = useState()

  const userSignIn = useSelector((state) => state.userSignIn)
  const { user } = userSignIn

  const [loginUser] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      dispatch(signin(userData))
    },
    onError(err) {
      setIsError(err.graphQLErrors[0].extensions.errors)
    },
    variables: inputValue,
  })

  const [registerUser] = useMutation(REGISTER_NEW_USER, {
    update(_, { data: { register: userEmail } }) {
      if (userEmail) {
        setIsRegister(true)
      }
    },
    onError(err) {
      setIsError(err.graphQLErrors[0].extensions.errors)
    },
    variables: inputValue,
  })

  useEffect(() => {
    if (user) navigate('/')
  }, [user, navigate])

  const handleSubmitForm = () => {
    setIsError({})

    if (isRegister) {
      if (inputValue.email.trim() !== '' && inputValue.password.trim() !== '') {
        loginUser()
      } else {
        setIsError({ fieldErr: 'Please fill all required fields' })
      }
    } else {
      if (
        inputValue.email.trim() !== '' &&
        inputValue.username.trim() !== '' &&
        inputValue.password.trim() !== '' &&
        inputValue.confirmPassword.trim() !== ''
      ) {
        registerUser()
      } else {
        setIsError({ fieldErr: 'Please fill all required fields' })
      }
      setIsRegister(true)
    }
  }

  return (
    <BoxContainer>
      <div className="form-container">
        <h2 className="form-sm-title">START SCHEDULE YOUR MASTER PLAN</h2>
        <h1 className="form-title">
          {isRegister ? 'Login to your account' : 'Create new account'}
          <span>.</span>
        </h1>

        <h3 className="form-direct">
          {isRegister ? "Don't Have Account? " : 'Already Have Account? '}
          <span
            onClick={() => {
              setIsError({})
              setIsRegister(!isRegister)
            }}
          >
            {isRegister ? 'Register' : 'Log In'}
          </span>
        </h3>

        <div className="login-box">
          <div className={`input-item input-active`}>
            <input
              type="email"
              value={inputValue.email}
              onChange={(e) =>
                setInputValue({ ...inputValue, email: e.target.value })
              }
              required
            />
            <span>Email</span>
          </div>
          {isError && isError.email && (
            <div className="err-box">{isError.email}</div>
          )}
          <div className={`input-item ${!isRegister && 'input-active'}`}>
            <input
              type="text"
              value={inputValue.username}
              onChange={(e) =>
                setInputValue({ ...inputValue, username: e.target.value })
              }
              required
            />
            <span>Username</span>
          </div>
          <div className={`input-item input-active`}>
            <input
              type="password"
              value={inputValue.password}
              onChange={(e) =>
                setInputValue({ ...inputValue, password: e.target.value })
              }
              required
            />
            <span>Password</span>
          </div>
          {isError && isError.password && (
            <div className="err-box">{isError.password}</div>
          )}
          <div className={`input-item ${!isRegister && 'input-active'}`}>
            <input
              type="password"
              value={inputValue.confirmPassword}
              onChange={(e) =>
                setInputValue({
                  ...inputValue,
                  confirmPassword: e.target.value,
                })
              }
              required
            />
            <span>Confirm Password</span>
          </div>
          {isError && isError.confirmPassword && (
            <div className="err-box">{isError.confirmPassword}</div>
          )}
          {isError && isError.fieldErr && (
            <div className={`err-box`}>! {isError.fieldErr}</div>
          )}
          <div className={`btn`} onClick={() => handleSubmitForm()}>
            {isRegister ? 'Login' : 'Register'}
          </div>
        </div>
      </div>
      <div className="banner-container">
        <AnimaCard
          size="lg"
          position={{ left: 50, top: 40 }}
          color={'green'}
          zIdx={5}
        >
          <div className={`title-ph title-smp`}>Group Meeting</div>
          <div className={`desc-ph`}>&nbsp;</div>
          <div className={`desc-ph`}>&nbsp;</div>
          <div className={`desc-ph`}>&nbsp;</div>
        </AnimaCard>
        <AnimaCard
          size="md"
          position={{ left: 15, top: 56 }}
          color={'purple'}
          zIdx={4}
        >
          <div className={`title-ph`}>&nbsp;</div>
          <div className={`desc-ph`}>&nbsp;</div>
          <div className={`desc-ph`}>&nbsp;</div>
        </AnimaCard>
        <AnimaCard
          size="md"
          position={{ left: 34, top: 63 }}
          color={'red'}
          zIdx={3}
        >
          <div className={`title-ph`}>&nbsp;</div>
          <div className={`desc-ph`}>&nbsp;</div>
          <div className={`desc-ph`}>&nbsp;</div>
          <div className={`desc-ph`}>&nbsp;</div>
        </AnimaCard>
        <AnimaCard
          size="md"
          position={{ left: 70, top: 25 }}
          color={'green'}
          zIdx={3}
        >
          <div className={`title-ph`}>&nbsp;</div>
          <div className={`desc-ph`}>&nbsp;</div>
          <div className={`desc-ph`}>&nbsp;</div>
          <div className={`desc-ph`}>&nbsp;</div>
        </AnimaCard>
        <AnimaCard
          size="sm"
          position={{ left: 50, top: 90 }}
          color={'purple'}
          zIdx={4}
        >
          <div className={`title-ph`}>&nbsp;</div>
          <div className={`desc-ph`}>&nbsp;</div>
          <div className={`desc-ph`}>&nbsp;</div>
        </AnimaCard>
        <AnimaCard
          size="sm"
          position={{ left: 74, top: 76 }}
          color={'red'}
          zIdx={4}
        >
          <div className={`title-ph`}>&nbsp;</div>
          <div className={`desc-ph`}>&nbsp;</div>
          <div className={`desc-ph`}>&nbsp;</div>
        </AnimaCard>
        <AnimaCard
          size="sm"
          position={{ left: 25, top: 20 }}
          color={'red'}
          zIdx={4}
        >
          <div className={`title-ph`}>&nbsp;</div>
          <div className={`desc-ph`}>&nbsp;</div>
          <div className={`desc-ph`}>&nbsp;</div>
        </AnimaCard>
      </div>
    </BoxContainer>
  )
}

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      username
      isManager
      token
      createdAt
    }
  }
`

const REGISTER_NEW_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
    }
  }
`

const BoxContainer = styled.div`
  ${tw`
    flex
    items-center
    justify-center
    w-full
    max-w-5xl
    min-h-[24rem]
  `}

  .form-container {
    ${tw`
      h-full
      w-full
      font-semibold
    `}

    .form-sm-title {
      ${tw`
        text-[13.5px]
        text-gray-800
      `}
    }

    .form-title {
      ${tw`
        mb-3
        text-3xl
      `}

      span {
        ${tw`
          text-4xl
          text-blue-600 
        `}
      }
    }

    .form-direct {
      ${tw`
        text-gray-700
      `}

      span {
        ${tw`
          text-blue-700
          cursor-pointer
        `}
      }
    }

    .login-box {
      ${tw``}

      .input-item {
        ${tw`
          relative
          w-full
          md:max-w-sm
          overflow-hidden

          transition-all
          duration-500
          ease-in-out
        `}
        opacity: 0;
        height: 0;
        transform: translateX(50%);
        pointer-events: none;

        input {
          ${tw`
            w-full
            p-3
            border-2
            border-gray-400
            rounded-xl

            transition-all
            duration-200
            ease-in-out
          `}

          :focus {
            ${tw`
              outline-none
              border-blue-700
            `}
          }
        }

        span {
          ${tw`
            absolute
            left-0
            p-3
            text-lg
            font-semibold
            text-gray-600

            transition-all
            duration-200
            ease-in-out
          `}
        }

        input:focus ~ span,
        input:valid ~ span {
          ${tw`
            py-0
            top-0
            text-sm
            text-blue-600
          `}
        }
      }

      .input-item.input-active {
        ${tw`
          mt-4
        `}
        height: 3.5rem;
        opacity: 1;
        transform: translateX(0%);
        pointer-events: auto;
      }

      .err-box {
        ${tw`
          text-red-600
        `}
      }

      .btn {
        ${tw`
          py-3
          mt-8
          w-full
          md:max-w-sm
          text-center
          bg-blue-600
          text-gray-50
          rounded-3xl
          cursor-pointer

          transition
          duration-200
          ease-in-out
        `}

        &:hover {
          ${tw`
            bg-blue-700
          `}
        }
      }
    }
  }

  .banner-container {
    ${tw`
      relative
      flex-grow
      h-full
      w-full
      min-h-[24rem]
    `}
  }
`

const AnimaCard = styled.div`
  ${tw`
    absolute
    bg-white
    border-2
    rounded-xl
  `}
  top: ${(props) => props.position.top && `${props.position.top}%`};
  left: ${(props) => props.position.left && `${props.position.left}%`};
  width: ${(props) =>
    props.size && props.size === 'lg'
      ? `13rem`
      : props.size === 'md'
      ? `8rem`
      : props.size === 'sm' && `5rem`};
  height: ${(props) =>
    props.size && props.size === 'lg'
      ? `10rem`
      : props.size === 'md'
      ? `6rem`
      : props.size === 'sm' && `3.5rem`};
  padding: ${(props) =>
    props.size && props.size === 'lg'
      ? `1rem`
      : props.size === 'md'
      ? `0.55rem`
      : props.size === 'sm' && `0.35rem`};
  border-color: ${(props) =>
    props.color === 'green'
      ? 'rgba(52, 211, 153, 1)'
      : props.color === 'purple'
      ? 'rgba(167, 139, 250, 1)'
      : props.color === 'red' && 'rgba(248, 113, 113, 1)'};
  transform: translate(-50%, -50%);
  box-shadow: 5px 5px 20px 0px rgba(0, 0, 0, 0.3);
  z-index: ${(props) => props.zIdx && props.zIdx};

  .title-ph {
    ${tw`
      w-[70%]
      rounded-3xl
      bg-gray-300
    `}
    margin-bottom: ${(props) =>
      props.size && props.size === 'lg'
        ? `1rem`
        : props.size === 'md'
        ? `0.8rem`
        : props.size === 'sm' && `0.5rem`};
    height: ${(props) =>
      props.size && props.size === 'lg'
        ? `20px`
        : props.size === 'md'
        ? `14px`
        : props.size === 'sm' && `9px`};
  }

  .title-smp {
    ${tw`
      w-full
      bg-transparent
      font-semibold
    `}
  }

  .desc-ph {
    ${tw`
      mb-2
      rounded-3xl
      bg-gray-300
    `}
    height: ${(props) =>
      props.size && props.size === 'lg'
        ? `10px`
        : props.size === 'md'
        ? `8px`
        : props.size === 'sm' && `6px`};

    &:nth-last-child(1) {
      ${tw`
        w-[80%]
      `}
    }
  }
`

export default LoginPage
