import React from 'react'
import withStyles from 'react-jss'
import { breakpoint } from './themeHelpers'


const FormRow = ({ children, classes }) =>
  <div className={classes.formRow}>{children}</div>

export default withStyles(theme => ({
  formRow: {
    [breakpoint(theme.breakpoints.sm)]: {
      display: 'flex',
      alignItems: 'flex-end',
      marginBottom: theme.sizes.inputGutterBottom,
      '& .form-control': {
        marginBottom: 0,
      },
      '& > div + *': {
        marginLeft: 50,
      },
    },
  },
}))(FormRow)
