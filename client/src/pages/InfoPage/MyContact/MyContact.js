import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import tw from 'twin.macro'
import styled from 'styled-components'
import { gql, useMutation } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'

// Redux Action
import {
  updateSelfContactBook,
  deleteSelfContactBook,
} from '../../../redux/action/userAction'
import { toggleNotifyTagOpen } from '../../../redux/action/notifyAction'

// mui icons
import { Edit, MoreVert } from '@mui/icons-material'

const MyContact = () => {
  const dispatch = useDispatch()

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
      <h1 className="form-title">My Contact</h1>
      <div className="form-contact-container">
        {allCustomerContact &&
          allCustomerContact.length > 0 &&
          allCustomerContact.map((ct) => (
            <ContactCard
              key={ct.id}
              contact={ct}
              updateCustomerDetail={updateCustomerDetail}
              deleteCustomerDetail={deleteCustomerDetail}
            />
          ))}
      </div>
    </MainContainer>
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
    updateCustomerDetail({
      variables: { ...mutContact },
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
          <div className="contact-number-box">
            <div className="contact-number-input-box">
              <span>P:</span>
              <input
                className="input-box contact-input"
                type="text"
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
              />
            </div>
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

const UPDATE_CUSTOMER_DETAIL = gql`
  mutation updateExistCustomer(
    $id: ID!
    $personal: String
    $company: String
    $personalcontact: String
    $companycontact: String
    $address: String
  ) {
    updateExistCustomer(
      updateCustomerInput: {
        id: $id
        personal: $personal
        company: $company
        personalcontact: $personalcontact
        companycontact: $companycontact
        address: $address
      }
    ) {
      id
      personal
      company
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

  .form-title {
    ${tw`
      mb-6
      text-xl
      md:text-2xl
      font-semibold
    `}
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
          max-w-md
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
`

export default MyContact
