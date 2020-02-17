import React from 'react'
import { ThemeProvider } from 'react-jss'
import { ToastContainer } from 'react-toastify'
import defautTheme from './theme'
import 'react-toastify/dist/ReactToastify.css'


const FormThemeProvider = ({ theme, children }) => {
  const [isRoot, setIsRoot] = React.useState(false)
  const [toastContainerProps, setToastContainerProps] = React.useState()
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
        toastContainerProps: { ...parentTheme.toastContainerProps, ...theme.toastContainerProps },
        ...parentTheme.customValidationFunction,
        ...theme.customValidationFunction,
      }
      if (!toastContainerProps) {
        setToastContainerProps(currentTheme.toastContainerProps)
      }
      return currentTheme
    }}>
      <React.Fragment>
        {children}
        {isRoot && toastContainerProps && <ToastContainer {...toastContainerProps} />}
      </React.Fragment>
    </ThemeProvider>
  )
}

export default FormThemeProvider
