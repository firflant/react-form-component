import React from 'react'
import withStyles from 'react-jss'
import { breakpoint } from './themeHelpers'
import theme from './theme'


const FormRow = ({ children, classes }) =>
  <div className={classes.formRow}>{children}</div>

export default withStyles({
  formRow: {
    [breakpoint(theme.breakpoints.sm)]: {
      display: 'flex',
      alignItems: 'flex-end',
      marginBottom: theme.formItemMargin,
      '& .form-control': {
        marginBottom: 0,
      },
      '& > * + *': {
        marginLeft: 50,
      },
    },
  },
})(FormRow)
