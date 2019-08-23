import React from 'react'
import { ThemeProvider } from 'react-jss'
import { ToastContainer } from 'react-toastify'
import defautTheme from './theme'
import 'react-toastify/dist/ReactToastify.css'


const FormThemeProvider = ({ theme, children }) =>
  <ThemeProvider theme={theme
    ? {
      sizes: { ...defautTheme.sizes, ...theme.sizes },
      colors: { ...defautTheme.colors, ...theme.colors },
      typography: { ...defautTheme.typography, ...theme.typography },
      breakpoints: { ...defautTheme.breakpoints, ...theme.breakpoints },
      textLabels: { ...defautTheme.textLabels, ...theme.textLabels },
    }
    : defautTheme
  }>
    <React.Fragment>
      {children}
      <ToastContainer hideProgressBar autoClose={5000} />
    </React.Fragment>
  </ThemeProvider>

export default FormThemeProvider
