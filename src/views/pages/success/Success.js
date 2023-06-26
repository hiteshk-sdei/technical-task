import React, { useEffect } from 'react'
import {
  CCol,
  CContainer,
  CInputGroup,
  CRow,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
} from '@coreui/react'
import { Link } from 'react-router-dom/dist'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/functions'
import 'firebase/compat/auth'

const Success = () => {
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

  firebase.initializeApp(firebaseConfig)
  useEffect(() => {
    const handleSuccessCallback = async () => {
      const valueF = await firebase.firestore().collection('users').doc('current_user').get()
      const fileCount = valueF.data()
      const inputValue = await firebase.firestore().collection('onChange').doc('onChangeId').get()
      const userData = inputValue.data()

      const sum = Number(userData?.onchangId) + fileCount?.fileCount
      firebase.firestore().collection('users').doc('current_user').set({
        fileCount: sum,
      })
    }

    const currentUrl = window.location.href
    if (currentUrl.includes('/#/success')) {
      handleSuccessCallback()
    } else if (currentUrl.includes('/#/cancel')) {
      handleCancellationCallback()
    }
  }, [])
  return (
    <div className="bg-white min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCard color="success" textColor="white" className="mb-3 shadow">
              <CCardBody className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  width={'50px'}
                  height={'50px'}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                </svg>
                <CCardTitle>Success</CCardTitle>

                <CCardText>
                  You have successfully purchased file now go back to create file.
                </CCardText>
                <CInputGroup className="btn btn-primary">
                  <Link to="/purchase" className="text-white text-decoration-none">
                    {' '}
                    Create Page
                  </Link>
                </CInputGroup>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Success
