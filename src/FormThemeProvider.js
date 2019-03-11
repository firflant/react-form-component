import React from 'react'
import { ThemeProvider } from 'react-jss'
import defautTheme from './theme'

const FormThemeProvider = ({ theme, children }) =>
  <ThemeProvider theme={theme ? { ...defautTheme, ...theme } : defautTheme}>
    {children}
  </ThemeProvider>

export default FormThemeProvider
