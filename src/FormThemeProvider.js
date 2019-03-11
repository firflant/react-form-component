import React from 'react'
import { ThemeProvider } from 'react-jss'
import defautTheme from './theme'

const FormThemeProvider = ({ theme, children }) =>
  <ThemeProvider theme={theme
    ? {
      sizes: { ...defautTheme.sizes, ...theme.sizes },
      colors: { ...defautTheme.colors, ...theme.colors },
      typography: { ...defautTheme.typography, ...theme.typography },
      breakpoints: { ...defautTheme.breakpoints, ...theme.breakpoints },
    }
    : defautTheme
  }>
    {children}
  </ThemeProvider>

export default FormThemeProvider
