import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCol, CFormInput, CRow } from '@coreui/react'
import firebase from 'firebase/compat/app'
import getStripe from '../../../lib/getStripe'
import CreateModal from '../../../components/Modal/CreateModal'

const Purchase = () => {
  const [inputValue, setInputValue] = useState()
  const [open, setOpen] = useState(false)
  const [fileCount, setFileCount] = useState()

  // Initialize Firebase
  const firebaseConfig = {
    apiKey: 'AIzaSyDPOks_BF_bqEGDhtbUc0cvCPpZhyw8Sko',
    authDomain: 'test-task-c12c4.firebaseapp.com',
    projectId: 'test-task-c12c4',
    storageBucket: 'test-task-c12c4.appspot.com',
    messagingSenderId: '1087317805441',
    appId: '1:1087317805441:web:80893a22cbf1a5c25e8080',
    measurementId: 'G-KF8H3MQ16V',
  }

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)

  async function handleButtonClick() {
    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: 'price_1NM3tpSJBi2Pph3i7j1cs29G',
          quantity: Number(inputValue),
        },
      ],
      mode: 'subscription',
      successUrl: `http://localhost:3000/#/success`,
      cancelUrl: `http://localhost:3000/cancel`,

      // customerEmail: 'hitesh.coder786@gmail.com',
    })
    console.warn(error.message)
  }

  useEffect(() => {
    const fetchFileCount = async () => {
      const snapshot = await firebase.firestore().collection('users').doc('current_user').get()
      const userData = snapshot.data()
      setFileCount(userData?.fileCount)
    }

    fetchFileCount()
  }, [])

  useEffect(() => {
    const fetchFileCount = async () => {
      const snapshot = await firebase.firestore().collection('users').doc('current_user').get()
      const userData = snapshot.data()
      setFileCount(userData?.fileCount)
    }

    fetchFileCount()
  }, [open])

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
    firebase.firestore().collection('onChange').doc('onChangeId').set({
      onchangId: e.target.value,
    })
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCreateClick = () => {
    setOpen(true)
  }

  return (
    <>
      <CRow className="d-flex justify-content-center">
        <CCol lg={9}>
          <CCard className="p-4">
            <h4 className="mb-0">You can create {fileCount && fileCount} file</h4>
            <p> Create new file to get started or buy more files</p>
            <CCardBody>
              <CRow className="align-items-center">
                <CCol lg={8}>
                  <CFormInput
                    type="text"
                    placeholder="Enter your text"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                </CCol>
                <CCol lg={4}>
                  <CButton className="w-100 py-2 fs-5" color="primary" onClick={handleButtonClick}>
                    Buy
                  </CButton>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
          <CRow>
            <CCol>
              <CButton
                disabled={fileCount <= 0}
                className="w-100 mt-3 py-2 fs-5"
                color="primary"
                onClick={handleCreateClick}
              >
                Create a new file
              </CButton>
            </CCol>
          </CRow>
          <CreateModal open={open} handleClose={handleClose} />
        </CCol>
      </CRow>
    </>
  )
}

export default Purchase
