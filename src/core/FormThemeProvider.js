import React from 'react'
import { ThemeProvider, useTheme } from 'react-jss'
import { ToastContainer, toast } from 'react-toastify'
import defautTheme from './theme'
import 'react-toastify/dist/ReactToastify.css'


const FormThemeProvider = ({ theme, children }) => {
  const [currentTheme, setCurrentTheme] = React.useState()
  const [toastContainerProps, setToastContainerProps] = React.useState({})
  const outerTheme = useTheme()
  const isRoot = !outerTheme

  React.useEffect(() => {
    const parentTheme = outerTheme || defautTheme
    // Use build in react-toastify plugin only if errorNotificationFunc is not defined.
    const usesToastifyPlugin = !parentTheme?.errorNotificationFunc && !theme.errorNotificationFunc

    const parsedTheme = {
      sizes: { ...parentTheme.sizes, ...theme.sizes },
      colors: { ...parentTheme.colors, ...theme.colors },
      typography: { ...parentTheme.typography, ...theme.typography },
      breakpoints: { ...parentTheme.breakpoints, ...theme.breakpoints },
      textLabels: { ...parentTheme.textLabels, ...theme.textLabels },
      errorNotificationFunc: message => usesToastifyPlugin
        ? toast.error(message)
        : parentTheme.errorNotificationFunc
          ? parentTheme.errorNotificationFunc(message)
          : theme.errorNotificationFunc(message),
      ...usesToastifyPlugin ? { toastContainerProps: {
        ...parentTheme.toastContainerProps, ...theme.toastContainerProps,
      } } : {},
      customValidationFunction: parentTheme.customValidationFunction || theme.customValidationFunction,
    }
    setCurrentTheme(parsedTheme)
    if (usesToastifyPlugin) {
      setToastContainerProps(parsedTheme.toastContainerProps)
    }
  }, [])

  return (
    currentTheme
      ? <ThemeProvider theme={currentTheme}>
        <React.Fragment>
          {children}
          {isRoot && toastContainerProps &&
            <ToastContainer {...toastContainerProps} />
          }
        </React.Fragment>
      </ThemeProvider>
      : null
  )
}

export default FormThemeProvider
