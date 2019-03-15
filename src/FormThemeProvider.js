import React from 'react'
import { ThemeProvider } from 'react-jss'
import { NotificationContainer } from 'react-notifications'
import defautTheme from './theme'
import 'react-notifications/lib/notifications.css'


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
      <NotificationContainer />
    </React.Fragment>
  </ThemeProvider>

export default FormThemeProvider
