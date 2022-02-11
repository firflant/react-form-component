import 'react-toastify/dist/ReactToastify.css'

import { ThemeProvider, useTheme } from 'react-jss'
import { ToastContainer, toast } from 'react-toastify'

import React from 'react'
import defautTheme from './theme'
import { theme } from '../typings'

const FormThemeProvider = ({ theme = {}, children }: FormThemeProviderProps) => {
  const [customizedTheme, setCustomizedTheme] = React.useState<theme | null>(null)
  const [toastContainerProps, setToastContainerProps] = React.useState({})
  const outerTheme = useTheme()
  const isRoot = !outerTheme

  React.useEffect(() => {
    const parentTheme: theme = outerTheme || defautTheme
    // Use build in react-toastify plugin only if errorNotificationFunc is not defined.
    const usesToastifyPlugin = !parentTheme?.errorNotificationFunc && !theme.errorNotificationFunc

    const parsedTheme = {
      sizes: { ...parentTheme.sizes, ...theme.sizes },
      colors: { ...parentTheme.colors, ...theme.colors },
      typography: { ...parentTheme.typography, ...theme.typography },
      breakpoints: { ...parentTheme.breakpoints, ...theme.breakpoints },
      textLabels: { ...parentTheme.textLabels, ...theme.textLabels },
      errorNotificationFunc: (message: string) => usesToastifyPlugin
        ? toast.error(message)
        : parentTheme.errorNotificationFunc
          ? parentTheme.errorNotificationFunc(message)
          : theme.errorNotificationFunc
            ? theme.errorNotificationFunc(message)
            : () => {},
      ...usesToastifyPlugin ? { toastContainerProps: {
        ...parentTheme.toastContainerProps, ...theme.toastContainerProps,
      } } : {},
      customValidationFunction: parentTheme.customValidationFunction || theme.customValidationFunction,
    }
    setCustomizedTheme(parsedTheme)
    if (parsedTheme.toastContainerProps) {
      setToastContainerProps(parsedTheme.toastContainerProps)
    }
  }, [])


  // SSR support - customizedTheme is construted via useEffect hook, which is
  // triggered only on a client, after the render. So for the purpose of
  // Server Side Rendering, if customizedTheme is not set yet, use defautTheme.
  // To prevent ugly initial jump between customized/default look of forms
  // that appears on initial view area of a page (for example in a hero section),
  // set page opacity to 0.
  return (
    <ThemeProvider theme={customizedTheme || defautTheme}>
      <React.Fragment>
        {customizedTheme
          ? children
          : <div style={{ opacity: 0 }}>{children}</div>
        }
        {isRoot && toastContainerProps &&
          <ToastContainer {...toastContainerProps} />
        }
      </React.Fragment>
    </ThemeProvider>
  )
}

export interface FormThemeProviderProps {
  theme?: theme,
  children: React.ReactNode,
}

export default FormThemeProvider
