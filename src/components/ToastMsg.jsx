import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';

const ToastMsg = () => {
  // toast.success(message);
  return (
    <React.Fragment>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"

      />
    </React.Fragment>
  )
}

export default ToastMsg