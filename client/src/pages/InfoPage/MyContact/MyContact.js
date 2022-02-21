import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import tw from 'twin.macro'
import styled from 'styled-components'
import { gql, useMutation } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'

// Redux Action
import {
  createSelfContactBook,
  updateSelfContactBook,
  deleteSelfContactBook,
} from '../../../redux/action/userAction'
import { toggleNotifyTagOpen } from '../../../redux/action/notifyAction'

// mui icons
import {
  Add,
  Edit,
  Close,
  PinDrop,
  MoreVert,
  PersonAdd,
  PlaylistAdd,
  PhoneIphone,
  AccessTime,
  Apartment,
} from '@mui/icons-material'

const MyContact = () => {
  const dispatch = useDispatch()
  const [isAddOpen, setIsAddOpen] = useState(false)

  const userSignIn = useSelector((state) => state.userSignIn)
  const { user } = userSignIn

  const contactBook = useSelector((state) => state.contactBook)
  const { allCustomerContact } = contactBook

  const [updateCustomerDetail] = useMutation(UPDATE_CUSTOMER_DETAIL, {
    context: {
      headers: {
        Authorization: `Bearer${' '}${user.token}`,
      },
    },
    update(_, { data: updatedData }) {
      dispatch(
        toggleNotifyTagOpen({ isSuccess: true, info: 'Contact Updated' })
      )
      dispatch(updateSelfContactBook(updatedData.updateExistCustomer))
    },
    onError(err) {
      dispatch(toggleNotifyTagOpen({ isSuccess: false, info: 'Error Update' }))
    },
  })

  const [deleteCustomerDetail] = useMutation(DELETE_CUSTOMER_CONTACT, {
    context: {
      headers: {
        Authorization: `Bearer${' '}${user.token}`,
      },
    },
    update(_, { data: deletedData }) {
      dispatch(deleteSelfContactBook(deletedData.id))
    },
    onError(err) {
      dispatch(toggleNotifyTagOpen({ isSuccess: false, info: 'Error Delete' }))
    },
  })

  return (
    <MainContainer>
      <div className="form-header">
        <h1 className="form-title">My Contact</h1>
        <div className="relative">
          <div
            className="icon-box add-icon-box"
            onClick={() => setIsAddOpen(!isAddOpen)}
          >
            <Add className="icon" />
          </div>
          <ContactAddCard
            setIsAddOpen={setIsAddOpen}
            isAddOpen={isAddOpen}
            user={user}
          />
        </div>
      </div>
      <div className="form-contact-container">
        {allCustomerContact && allCustomerContact.length > 0 ? (
          allCustomerContact.map((ct) => (
            <ContactCard
              key={ct.id}
              contact={ct}
              updateCustomerDetail={updateCustomerDetail}
              deleteCustomerDetail={deleteCustomerDetail}
            />
          ))
        ) : (
          <div className="form-empty-container">
            <h2>Seem Empty Here...</h2>
          </div>
        )}
      </div>
    </MainContainer>
  )
}

const ContactAddCard = ({ setIsAddOpen, isAddOpen, user }) => {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState({
    company: '',
    personal: '',
    position: '',
    companycontact: '',
    personalcontact: '',
    address: '',
  })
  const [inputError, setInputError] = useState({
    isError: false,
    errType: '',
  })

  const [createCustomerContact] = useMutation(CREATE_CUSTOMER_CONTACT, {
    context: {
      headers: {
        Authorization: `Bearer${' '}${user.token}`,
      },
    },
    update(_, { data: createdData }) {
      setInputValue({
        company: '',
        personal: '',
        position: '',
        companycontact: '',
        personalcontact: '',
        address: '',
      })
      dispatch(toggleNotifyTagOpen({ isSuccess: true, info: 'Contact Added' }))
      dispatch(createSelfContactBook(createdData.createNewCustomer))

      setIsAddOpen(false)
    },
    onError(err) {
      dispatch(
        toggleNotifyTagOpen({ isSuccess: false, info: 'Error Create Contact' })
      )
    },
  })

  const handleCreateContact = () => {
    setInputError({
      isError: false,
      errType: '',
    })

    const { personalcontact, ...restInputValue } = inputValue
    let isEmpty = Object.values(restInputValue).some(
      (x) => x === null || x.trim() === ''
    )

    if (isEmpty) {
      setInputError({
        isError: true,
        errType: 'Please fill up every field',
      })
    } else {
      const pContact = inputValue.personalcontact
      const cContact = inputValue.companycontact

      const addDashToPContact =
        pContact && pContact.substring(0, 3) + '-' + pContact.substring(3)
      const addSpaceToPContact = pContact
        ? addDashToPContact.substring(0, addDashToPContact.length - 4) +
          ' ' +
          addDashToPContact.substring(addDashToPContact.length - 4)
        : ''

      const addSpaceToCContact =
        cContact.substring(0, 2) + ' ' + cContact.substring(2)

      createCustomerContact({
        variables: {
          ...inputValue,
          personalcontact: addSpaceToPContact,
          companycontact: addSpaceToCContact,
        },
      })
    }
  }

  const autoGrowHeight = (e) => {
    //setInputValue({ ...inputValue, description: e.target.value })
    e.target.style.height = '0px'
    e.target.style.height = e.target.scrollHeight + 'px'
  }

  return (
    <ContactAddCardContainer isAddOpen={isAddOpen}>
      <div className="card-header">
        <PlaylistAdd className="card-icon" />
        <div className="icon-box btn" onClick={() => setIsAddOpen(false)}>
          <Close className="icon" />
        </div>
      </div>
      <div className="card-body">
        <div className="card-item items-center">
          <AccessTime className="icon hide" />
          <div className="input-box">
            <input
              type="text"
              className="input title-input"
              value={inputValue.company}
              onChange={(e) =>
                setInputValue({ ...inputValue, company: e.target.value })
              }
              placeholder="Company Name"
              required
            />
          </div>
        </div>
        <div className="card-item items-center">
          <PersonAdd className="icon" />
          <div className="input-box">
            <input
              type="text"
              className="input"
              value={inputValue.personal}
              onChange={(e) =>
                setInputValue({ ...inputValue, personal: e.target.value })
              }
              placeholder="Personal Name"
              required
            />
          </div>
        </div>
        <div className="card-item items-center">
          <PersonAdd className="icon hide" />
          <div className="input-box">
            <input
              type="text"
              className="input"
              value={inputValue.position}
              onChange={(e) =>
                setInputValue({ ...inputValue, position: e.target.value })
              }
              placeholder="Personal Position"
              required
            />
          </div>
        </div>
        <div className="card-item items-center">
          <PhoneIphone className="icon" />
          <div className="input-box input-box-short">
            <input
              type="tel"
              className="input"
              value={inputValue.personalcontact}
              onChange={(e) =>
                setInputValue({
                  ...inputValue,
                  personalcontact: e.target.value,
                })
              }
              placeholder="Personal Contact"
              pattern="(\01)[0-9]{9,10}"
            />
          </div>
        </div>
        <div className="card-item items-center">
          <Apartment className="icon" />
          <div className="input-box input-box-short">
            <input
              type="tel"
              className="input"
              value={inputValue.companycontact}
              onChange={(e) =>
                setInputValue({
                  ...inputValue,
                  companycontact: e.target.value,
                })
              }
              placeholder="Company Contact"
              pattern="(0)[0-9]{8}"
              required
            />
          </div>
        </div>
        <div className="card-item items-start">
          <PinDrop className="icon" />
          <div className="input-box">
            <textarea
              type="text"
              className="card-desc"
              value={inputValue.address}
              onChange={(e) =>
                setInputValue({
                  ...inputValue,
                  address: e.target.value,
                })
              }
              onInput={(e) => autoGrowHeight(e)}
              placeholder="Company Address"
            />
          </div>
        </div>
      </div>
      <div className="card-footer">
        {inputError.isError && (
          <span className="err-info">{inputError.errType}</span>
        )}
        <div className="save-btn" onClick={() => handleCreateContact()}>
          Save
        </div>
      </div>
    </ContactAddCardContainer>
  )
}

const ContactCard = ({
  contact,
  updateCustomerDetail,
  deleteCustomerDetail,
}) => {
  const [editControl, setEditControl] = useState({
    isEdit: false,
    isChange: false,
  })
  const [isDropActive, setIsDropActive] = useState(false)
  const [oriContact, setOriContact] = useState()
  const [mutContact, setMutContact] = useState()

  const handleToggleEdit = (e) => {
    e.stopPropagation()

    if (editControl.isEdit) {
      setEditControl({ isEdit: false, isChange: false })
      setMutContact({ ...oriContact })
    } else {
      setEditControl({ ...editControl, isEdit: true })
    }
  }

  const handleDeleteContact = (e) => {
    e.stopPropagation()

    deleteCustomerDetail({ variables: { cusId: oriContact.id } })
  }

  const handleSaveChange = () => {
    const pContact = mutContact.personalcontact
    const cContact = mutContact.companycontact.replace(/\s/g, '')

    const addDashToPContact =
      pContact && pContact.substring(0, 3) + '-' + pContact.substring(3)
    const addSpaceToPContact = pContact
      ? addDashToPContact.substring(0, addDashToPContact.length - 4) +
        ' ' +
        addDashToPContact.substring(addDashToPContact.length - 4)
      : ''

    const addSpaceToCContact =
      cContact.substring(0, 2) + ' ' + cContact.substring(2)

    updateCustomerDetail({
      variables: {
        ...mutContact,
        personalcontact: addSpaceToPContact,
        companycontact: addSpaceToCContact,
      },
    })

    setEditControl({ isEdit: false, isChange: false })
  }

  const autoGrowHeight = (e) => {
    e.target.style.height = '0px'
    e.target.style.height = e.target.scrollHeight + 'px'

    setMutContact({ ...mutContact, address: e.target.value })
  }

  useEffect(() => {
    if (contact) {
      setOriContact(contact)
      setMutContact(contact)
    }
  }, [contact])

  useEffect(() => {
    if (!_.isEqual(mutContact, oriContact)) {
      setEditControl({ ...editControl, isChange: true })
    } else {
      setEditControl({ ...editControl, isChange: false })
    }
  }, [mutContact])

  return (
    <>
      {oriContact && mutContact && (
        <div
          className={`contact-card ${
            editControl.isEdit ? 'active' : 'inactive'
          }`}
        >
          <div className="card-header">
            <input
              className="input-box title-input"
              type="text"
              value={
                editControl.isEdit ? mutContact.company : oriContact.company
              }
              onChange={(e) =>
                setMutContact({ ...mutContact, company: e.target.value })
              }
            />
            <div className="icon-container">
              <div
                className={`icon-box edit-icon-box`}
                onClick={() => setIsDropActive(!isDropActive)}
              >
                <MoreVert className="icon edit-icon" />
                <div
                  className={`drop-list ${isDropActive && 'active'}`}
                  onMouseLeave={() => setIsDropActive(false)}
                >
                  <div
                    className="drop-item"
                    onClick={(e) => handleDeleteContact(e)}
                  >
                    Delete Contact
                  </div>
                  <div className="drop-item">Cancel</div>
                </div>
              </div>
              <div
                className={`icon-box edit-icon-box`}
                onClick={(e) => handleToggleEdit(e)}
              >
                <Edit className="icon edit-icon" />
              </div>
            </div>
          </div>
          <div className="personal-info-box">
            <input
              className="input-box personal-input"
              type="text"
              value={
                editControl.isEdit ? mutContact.personal : oriContact.personal
              }
              onChange={(e) =>
                setMutContact({ ...mutContact, personal: e.target.value })
              }
            />
            <input
              className="input-box personal-input"
              type="text"
              value={
                editControl.isEdit ? mutContact.position : oriContact.position
              }
              onChange={(e) =>
                setMutContact({ ...mutContact, position: e.target.value })
              }
            />
          </div>

          <div className="contact-number-box">
            {oriContact.personalcontact !== '' ? (
              <div className="contact-number-input-box">
                <span>P:</span>
                <input
                  className="input-box contact-input"
                  type="tel"
                  value={
                    editControl.isEdit
                      ? mutContact.personalcontact
                      : oriContact.personalcontact
                  }
                  onChange={(e) =>
                    setMutContact({
                      ...mutContact,
                      personalcontact: e.target.value,
                    })
                  }
                  pattern="(\01)[0-9]{9,10}"
                />
              </div>
            ) : (
              editControl.isEdit && (
                <div className="contact-number-input-box">
                  <span>P:</span>
                  <input
                    className="input-box contact-input"
                    type="tel"
                    value={
                      editControl.isEdit
                        ? mutContact.personalcontact
                        : oriContact.personalcontact
                    }
                    onChange={(e) =>
                      setMutContact({
                        ...mutContact,
                        personalcontact: e.target.value,
                      })
                    }
                    pattern="(\01)[0-9]{9,10}"
                  />
                </div>
              )
            )}
            <div className="contact-number-input-box">
              <span>C:</span>
              <input
                className="input-box contact-input"
                type="text"
                value={
                  editControl.isEdit
                    ? mutContact.companycontact
                    : oriContact.companycontact
                }
                onChange={(e) =>
                  setMutContact({
                    ...mutContact,
                    companycontact: e.target.value,
                  })
                }
                pattern="(0)[0-9]{8}"
                required
              />
            </div>
          </div>
          <textarea
            type="text"
            className="input-box address-input"
            value={editControl.isEdit ? mutContact.address : oriContact.address}
            onInput={(e) => autoGrowHeight(e)}
          />
          {editControl.isEdit && (
            <div className="card-footer">
              <div
                className={`btn save-btn ${editControl.isChange && 'active'}`}
                onClick={() => handleSaveChange()}
              >
                <span>Save Change</span>
              </div>
              <div
                className="btn discard-btn"
                onClick={(e) => handleToggleEdit(e)}
              >
                <span>Discard Change</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

const CREATE_CUSTOMER_CONTACT = gql`
  mutation createNewCustomer(
    $personal: String!
    $company: String!
    $position: String!
    $personalcontact: String
    $companycontact: String!
    $address: String!
  ) {
    createNewCustomer(
      createCustomerInput: {
        personal: $personal
        company: $company
        position: $position
        personalcontact: $personalcontact
        companycontact: $companycontact
        address: $address
      }
    ) {
      id
      personal
      company
      position
      personalcontact
      companycontact
      address
    }
  }
`

const UPDATE_CUSTOMER_DETAIL = gql`
  mutation updateExistCustomer(
    $id: ID!
    $personal: String!
    $company: String!
    $position: String!
    $personalcontact: String
    $companycontact: String!
    $address: String!
  ) {
    updateExistCustomer(
      updateCustomerInput: {
        id: $id
        personal: $personal
        company: $company
        position: $position
        personalcontact: $personalcontact
        companycontact: $companycontact
        address: $address
      }
    ) {
      id
      personal
      company
      position
      personalcontact
      companycontact
      address
    }
  }
`

const DELETE_CUSTOMER_CONTACT = gql`
  mutation deleteExistCustomer($cusId: ID!) {
    deleteExistCustomer(cusId: $cusId) {
      id
    }
  }
`

const MainContainer = styled.div`
  ${tw`
    w-full
    min-h-[50vh]
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

  .icon-box {
    ${tw`
        relative
        flex
        items-center
        justify-center
        w-9
        h-9
        p-2
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

  .add-icon-box {
    ${tw`
      bg-white
    `}
    box-shadow: 2px 3px 15px 3px rgba(0, 0, 0, 0.25);

    &::after {
      content: 'Add Contact';
      ${tw`
        absolute
        top-1/2
        left-0
        py-1
        w-20
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
      transform: translate(-50%, -50%);
    }

    &:hover {
      &::after {
        opacity: 1;
        transform: translate(calc(-100% - 5px), -50%);
      }
    }
  }

  .form-header {
    ${tw`
      flex
      items-end
      justify-between
      mb-6
      w-full
    `}

    .form-title {
      ${tw`
        text-xl
        md:text-2xl
        font-semibold
      `}
    }
  }

  .form-contact-container {
    ${tw`
      flex
      flex-col
      w-full
    `}

    .contact-card {
      ${tw`
        flex
        flex-col
        p-3
        mb-3
        border-l-4
        border-blue-600
        rounded-r-md

        transition-all
      `}
      box-shadow: 2px 3px 15px 3px rgba(0,0,0,0.2);

      .card-header {
        ${tw`
          flex
          items-center
          justify-between
        `}

        .icon-container {
          ${tw`
            self-start
            flex
            items-center
          `}
        }

        .edit-icon-box {
          ${tw`
            
          `}
        }
      }

      .personal-info-box {
        ${tw`
          flex
          items-center
          justify-start
          w-full
          max-w-md
        `}
      }

      .contact-number-box {
        ${tw`
          flex
          items-center
          justify-start
        `}

        span {
          ${tw`
            mr-2
            font-semibold
          `}
        }
      }

      .input-box {
        ${tw`
          rounded-lg
          font-semibold
          outline-none

          transition-all
          duration-[350ms]
          ease-in-out
        `}
      }

      .title-input {
        ${tw`
          w-full
          max-w-md
          text-lg
          md:text-xl
        `}
      }

      .personal-input {
        ${tw`
          w-full
          text-xs
          md:text-sm
        `}
      }

      .address-input {
        margin-top: -2.5px;
        overflow-y: scroll;
        min-height: 2.5rem;
        max-height: 13rem;
        ${tw`
          mt-2
          w-full
          max-w-2xl
          scrollbar-hide
        `}
      }

      .contact-input {
        ${tw`
          mr-2
          w-40
        `}
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
          py-1
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
          bg-red-600
          text-gray-50
        `}

        &:hover {
          ${tw`
            bg-red-500
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

    .contact-card.inactive {
      .input-box {
        ${tw` 
          pointer-events-none
        `}
      }

      .personal-input {
        ${tw`
          mb-1
          text-gray-700
        `}
      }
    }

    .contact-card.active {
      .input-box {
        ${tw`
          p-2
          border-2
          border-gray-300
        `}
      }

      .title-input {
        ${tw`
          mb-2
        `}
      }

      .personal-input {
        ${tw`
          mb-2
        `}
      }
    }
  }

  .form-empty-container {
    h2 {
      ${tw`
        text-lg
        text-gray-700
        font-semibold
      `}
    }
  }
`

const ContactAddCardContainer = styled.div`
  ${tw`
    absolute
    bottom-0
    left-0
    p-4
    w-screen
    max-w-sm
    bg-white
    rounded-md
    z-30

    transition-all
    duration-500
    ease-in-out
  `}
  opacity: ${(props) => (props.isAddOpen ? '1' : '0')};
  box-shadow: 2px 3px 15px 3px rgba(0, 0, 0, 0.25);
  transform: ${(props) =>
    props.isAddOpen ? 'translate(-100%, 100%)' : 'translate(-80%, 80%)'};
  pointer-events: ${(props) => (props.isAddOpen ? 'auto' : 'none')};

  .card-header {
    ${tw`
      flex
      items-center
      justify-between
      mb-3
    `}

    .card-icon {
      ${tw`
        w-7
        h-7
        text-gray-500
      `}
    }

    .icon-box {
      ${tw`
        flex
        items-center
        justify-center
        p-2
        w-10
        h-10
        text-gray-600
        rounded-full

        transition
        duration-200
        ease-in-out
      `}
    }

    .btn {
      ${tw`
        cursor-pointer
      `}

      &:hover {
        ${tw`
          bg-gray-200
          text-gray-800
        `}
      }
    }
  }

  .card-body {
    ${tw`
      flex-grow
      flex
      flex-col
      items-center
      w-full
    `}

    .card-item {
      ${tw`
        flex
        justify-start
        w-full
        mb-5
      `}

      .icon {
        ${tw`
          w-5
          h-5
          mr-4
          text-gray-500
          pointer-events-none
        `}
      }

      .icon.hide {
        ${tw`
          opacity-0
        `}
      }

      .input-box {
        ${tw`
          relative
          w-full
          border-b
          border-gray-400
        `}

        &::after {
          content: '';
          ${tw`
            absolute
            left-0
            bottom-0
            h-[2px]
            w-0
            bg-blue-600

            transition-all
            duration-200
            ease-in-out
            z-[1]
          `};
        }

        &:focus-within {
          &::after {
            ${tw`
              w-full
            `}
          }
        }

        .input {
          ${tw`
            w-full
            py-[3px]
            outline-none
            font-semibold
          `}
        }

        .title-input {
          ${tw`
            text-2xl  
            font-normal    
          `}
        }
      }

      .input-box-short {
        ${tw`
          max-w-[65%]
        `}
      }

      span {
        ${tw`
          font-semibold
          text-gray-600
        `}
      }

      textarea {
        resize: none;
        margin-top: -2.5px;
        overflow-y: scroll;
        min-height: 2.5rem;
        max-height: 13rem;
        ${tw`
          w-full
          font-semibold
          outline-none

          scrollbar-hide
        `}
      }
    }
  }

  .card-footer {
    ${tw`
      flex
      items-center
      justify-end
    `}

    .err-info {
      ${tw`
        mr-3
        text-sm
        text-red-500
        font-semibold
      `}
    }

    .save-btn {
      ${tw`
        py-1
        px-4
        bg-blue-600
        text-gray-50
        font-semibold
        rounded-md
        cursor-pointer

        transition
        duration-200
        ease-in-out
      `}

      &:hover {
        ${tw`
          bg-blue-500
          shadow-md
        `}
      }
    }
  }
`

export default MyContact
