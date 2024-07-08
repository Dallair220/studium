'use client';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function ToastProvider({ children }) {
  return (
    <>
      {children}
      <ToastContainer autoClose={2000} theme="dark" />
    </>
  );
}
