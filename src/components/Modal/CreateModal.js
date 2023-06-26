import React, { useEffect, useRef, useState } from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CRow,
  CCol,
  CButtonGroup,
  CFormCheck,
} from '@coreui/react'
import { Formik, Field, ErrorMessage, Form } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/functions'

const CreateModal = ({ open, handleClose }) => {
  const dispatch = useDispatch()
  const GOOGLE_API_KEY = 'AIzaSyAlFVM_HSpYnjyUfATfRvWFx6YTTzHaS70'
  const [fileCount, setFileCount] = useState()
  const [selectedAddress, setSelectedAddress] = useState('')
  const searchBoxRef = useRef(null)
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

  const initialValues = {
    fileType: typeof open === 'object' ? open.fileType : '',
    fileName: typeof open === 'object' ? open.fileName : '',
    closingDate: typeof open === 'object' ? open.closingDate : '',
    fileNo: typeof open === 'object' ? open.fileNo : '',
    address: typeof open === 'object' ? open.address : '',
  }

  const validationSchema = Yup.object().shape({
    fileType: Yup.string().required('Type of file is required'),
    fileName: Yup.string().required('Name of file is required'),
    closingDate: Yup.string().required('Closing date is required'),
    fileNo: Yup.string().required('File no. is required'),
    address: Yup.string().required('Adress is required'),
  })

  useEffect(() => {
    // Fetch the current file count from Firestore
    const fetchFileCount = async () => {
      const snapshot = await firebase.firestore().collection('users').doc('current_user').get()
      const userData = snapshot.data()
      setFileCount(userData?.fileCount || 0)
    }

    fetchFileCount()
  }, [])

  const handleSubmit = async (values, { setSubmitting }) => {
    // Handle form submission logic here
    if (typeof open === 'object') {
      values.id = open.id

      try {
        const docRef = firebase.firestore().collection('fileList').doc('listData')
        const doc = await docRef.get()

        if (doc.exists) {
          const { dataArray } = doc.data()
          const updatedArray = dataArray.map((item) => {
            if (item.id === open.id) {
              return values // Replace the matching object with the updated values
            }
            return item
          })

          await docRef.update({ dataArray: updatedArray })

          setSubmitting(false)
          handleClose()
        }
      } catch (error) {
        console.error('Error updating object in Firestore:', error)
      }
    } else {
      firebase
        .firestore()
        .collection('users')
        .doc('current_user')
        .set({
          fileCount: fileCount - 1,
        })
      values.id = Math.floor(Math.random() * 900) + 100
      values.creationDate = new Date().toLocaleDateString('en-US').split('/').reverse().join('-')
      console.log(values)

      firebase
        .firestore()
        .collection('fileList')
        .doc('listData')
        .update({
          dataArray: firebase.firestore.FieldValue.arrayUnion(values),
        })

      setSubmitting(false)
      handleClose()
    }
  }
  const handleRadioClick = (e) => {
    e.stopPropagation()
  }
  const handleRadioChange = (e, field, form) => {
    const { value } = e.target
    form.setFieldValue(field.name, value)
  }

  return (
    <CModal alignment="center" visible={open} onClose={handleClose} size="lg">
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle>{typeof open === 'object' ? 'Update file' : 'Create new file'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {/* {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => ( */}
          <Form>
            <CModalBody>
              <CRow className="mb-3">
                <CCol lg={3}>
                  <label htmlFor="fileType" className="form-label">
                    Type of file
                  </label>
                </CCol>
                <CCol lg={9}>
                  <CButtonGroup role="group" aria-label="Basic checkbox toggle button group">
                    <Field name="fileType">
                      {({ field, form }) => (
                        <>
                          <CFormCheck
                            type="radio"
                            button={{ color: 'primary', variant: 'outline' }}
                            id="sale"
                            autoComplete="off"
                            label="Sale"
                            value="Sale"
                            checked={field.value === 'Sale'}
                            onChange={(e) => handleRadioChange(e, field, form)}
                            onClick={handleRadioClick}
                          />
                          <CFormCheck
                            type="radio"
                            button={{ color: 'primary', variant: 'outline' }}
                            id="purchase"
                            autoComplete="off"
                            label="Purchase"
                            value="Purchase"
                            checked={field.value === 'Purchase'}
                            onClick={handleRadioClick}
                            onChange={(e) => handleRadioChange(e, field, form)}
                          />
                          <CFormCheck
                            type="radio"
                            button={{ color: 'primary', variant: 'outline' }}
                            id="mortgage"
                            autoComplete="off"
                            label="Mortgage"
                            value="Mortgage"
                            checked={field.value === 'Mortgage'}
                            onClick={handleRadioClick}
                            onChange={(e) => handleRadioChange(e, field, form)}
                          />
                        </>
                      )}
                    </Field>
                  </CButtonGroup>
                  <ErrorMessage name="fileType" component="div" className="text-danger" />
                  {/* <Field type="text" className="form-control" id="fileType" name="fileType" />
                  <ErrorMessage name="fileType" component="div" className="text-danger" /> */}
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol lg={3}>
                  <label htmlFor="fileName" className="form-label">
                    Name of file
                  </label>
                </CCol>
                <CCol lg={9}>
                  <Field
                    type="text"
                    className="form-control"
                    id="fileName"
                    name="fileName"
                    placeholder="ex. Fazio, issa, Four Rivers International"
                  />
                  <ErrorMessage name="fileName" component="div" className="text-danger" />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol lg={3}>
                  <label htmlFor="closingDate" className="form-label">
                    Closing date
                  </label>
                </CCol>
                <CCol lg={9}>
                  <Field type="date" className="form-control" id="closingDate" name="closingDate" />
                  <ErrorMessage name="closingDate" component="div" className="text-danger" />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol lg={3}>
                  <label htmlFor="fileNo" className="form-label">
                    File no.
                  </label>
                </CCol>

                <CCol lg={9}>
                  <Field
                    type="text"
                    className="form-control"
                    id="fileNo"
                    name="fileNo"
                    placeholder="ex. 21-0001"
                  />
                  <ErrorMessage name="fileNo" component="div" className="text-danger" />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol lg={3}>
                  <label htmlFor="Address" className="form-label">
                    Adress
                  </label>
                </CCol>

                <CCol lg={9}>
                  <Field
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    placeholder="address"
                  />
                  <ErrorMessage name="address" component="div" className="text-danger" />
                </CCol>
              </CRow>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={handleClose}>
                Cancel
              </CButton>
              <CButton type="submit" color="primary">
                {typeof open === 'object' ? 'Update' : 'Create'}
              </CButton>
            </CModalFooter>
          </Form>
          {/* )} */}
        </Formik>
      </CModalBody>
    </CModal>
  )
}

export default CreateModal
