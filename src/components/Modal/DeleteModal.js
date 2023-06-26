import React from 'react'
import { CButton, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle } from '@coreui/react'

const DeleteModal = ({ open, handleClose, handleDelete }) => {
  return (
    <CModal visible={open} onClose={handleClose}>
      <CModalHeader>
        <CModalTitle>Delete Confirmation</CModalTitle>
      </CModalHeader>
      <CModalBody>Are you sure, You want to delete this row!</CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={handleClose}>
          Close
        </CButton>
        <CButton onClick={() => handleDelete()} color="danger" className="text-white">
          Delete
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default DeleteModal
