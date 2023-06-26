import React, { useEffect, useState } from 'react'
import {
  CButton,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CFormInput,
  CRow,
  CCol,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CCard,
  CCardBody,
  CCardHeader,
} from '@coreui/react'

import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/functions'
import 'firebase/compat/auth'
import CreateModal from '../../../components/Modal/CreateModal'
import DeleteModal from '../../../components/Modal/DeleteModal'

const FileList = () => {
  const [files, setFiles] = useState()
  const [deleteTrigger, setdeleteTrigger] = useState(1)
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const Items = [2, 5, 10, 15, 20]
  const [itemPP, setItemPP] = useState(20)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const handleDelete = async () => {
    firebase
      .firestore()
      .collection('fileList')
      .doc('listData')
      .update({
        dataArray: files.filter((el) => el.id !== deleteOpen),
      })
    setdeleteTrigger(deleteTrigger + 1)
    setDeleteOpen(false)
  }

  const handleEdit = async (file) => {
    setOpen(file)
  }

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
    const fetchFileCount = async () => {
      const snapshot = await firebase.firestore().collection('fileList').doc('listData').get()
      const userData = snapshot.data()
      setFiles(userData?.dataArray)
    }

    fetchFileCount()
  }, [])

  useEffect(() => {
    const fetchFileCount = async () => {
      const snapshot = await firebase.firestore().collection('fileList').doc('listData').get()
      const userData = snapshot.data()
      setFiles(userData?.dataArray)
    }

    fetchFileCount()
  }, [deleteTrigger, open])
  return (
    <>
      <CCard>
        <CCardHeader className="bg-primary text-white">List of Created files</CCardHeader>
        <CCardBody className="px-0">
          <CRow className="align-items-center px-4">
            <CCol lg={2} className="d-flex">
              <label htmlFor="searchInput">Search File :</label>
            </CCol>
            <CCol lg={3} className="d-flex">
              <CFormInput
                type="text"
                placeholder="Search by file name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </CCol>
            <CCol lg={7} className="d-flex gap-2 align-items-center justify-content-end">
              <p className="mb-0">Items per page:</p>
              <CDropdown className="border">
                <CDropdownToggle color="" size="sm">
                  {itemPP}
                </CDropdownToggle>
                <CDropdownMenu>
                  {Items.map((el) => (
                    <CDropdownItem onClick={() => setItemPP(el)}>{el}</CDropdownItem>
                  ))}
                </CDropdownMenu>
              </CDropdown>
            </CCol>
          </CRow>
          <CTable responsive striped bordered hover className="mt-3">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell className="bg-secondary text-white">File Name</CTableHeaderCell>
                <CTableHeaderCell className="bg-secondary text-white">Property</CTableHeaderCell>
                <CTableHeaderCell className="bg-secondary text-white">File Type</CTableHeaderCell>
                <CTableHeaderCell className="bg-secondary text-white">
                  Closing Date
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-secondary text-white">File No.</CTableHeaderCell>
                <CTableHeaderCell className="bg-secondary text-white">
                  File Creation Date
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-secondary text-white">Lawyer</CTableHeaderCell>
                <CTableHeaderCell className="bg-secondary text-white">Law Clerk</CTableHeaderCell>
                <CTableHeaderCell className="bg-secondary text-white">Status</CTableHeaderCell>
                <CTableHeaderCell className="bg-secondary text-white">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {files
                ?.slice(0, itemPP)
                ?.filter((file) => file.fileName.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((file) => (
                  <CTableRow key={file.id}>
                    <CTableDataCell>{file.fileName}</CTableDataCell>
                    <CTableDataCell>{file.address}</CTableDataCell>
                    <CTableDataCell>{file.fileType}</CTableDataCell>
                    <CTableDataCell>{file.closingDate}</CTableDataCell>
                    <CTableDataCell>{file.fileNo}</CTableDataCell>
                    <CTableDataCell>
                      {file.creationDate
                        ? file.creationDate
                        : new Date().toLocaleDateString('en-US').split('/').reverse().join('-')}
                    </CTableDataCell>
                    <CTableDataCell>john-Doe</CTableDataCell>
                    <CTableDataCell>Thanos</CTableDataCell>
                    <CTableDataCell>
                      <label className="badge bg-success py-1 px-2 text-white">Active</label>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        size="sm"
                        variant="primary"
                        className="bg-primary text-white me-2"
                        onClick={() => handleEdit(file)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          width={'15px'}
                          height={'15px'}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </CButton>
                      <CButton
                        size="sm"
                        variant="danger"
                        className="bg-danger text-white"
                        onClick={() => {
                          setDeleteOpen(file.id)
                          // handleDelete(file.id)
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          width={'15px'}
                          height={'15px'}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
            </CTableBody>
            <CreateModal open={open} handleClose={() => setOpen(false)} />
            <DeleteModal
              open={deleteOpen}
              handleClose={() => setDeleteOpen(false)}
              handleDelete={handleDelete}
            />
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default FileList
