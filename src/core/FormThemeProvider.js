import React from 'react'
import { ThemeProvider } from 'react-jss'
import { ToastContainer } from 'react-toastify'
import defautTheme from './theme'
import 'react-toastify/dist/ReactToastify.css'


const FormThemeProvider = ({ theme, children }) => {
  const [isRoot, setIsRoot] = React.useState(false)
  return (
    <ThemeProvider theme={outerTheme => {
      if (!outerTheme && !isRoot) {
        setIsRoot(true)
      }
      const parentTheme = outerTheme || defautTheme
      const currentTheme = {
        sizes: { ...parentTheme.sizes, ...theme.sizes },
        colors: { ...parentTheme.colors, ...theme.colors },
        typography: { ...parentTheme.typography, ...theme.typography },
        breakpoints: { ...parentTheme.breakpoints, ...theme.breakpoints },
        textLabels: { ...parentTheme.textLabels, ...theme.textLabels },
        ...parentTheme.customValidationFunction,
        ...theme.customValidationFunction,
      }
      return currentTheme
    }}>
      <React.Fragment>
        {children}
        {isRoot && <ToastContainer hideProgressBar autoClose={5000} />}
      </React.Fragment>
    </ThemeProvider>
  )
}

export default FormThemeProvider
