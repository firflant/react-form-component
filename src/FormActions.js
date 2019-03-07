import React from 'react'
import withStyles from 'react-jss'
import { breakpoint, clearfix } from './themeHelpers'
import theme from './theme'


const FormActions = ({ children, classes }) =>
  <div className={classes.formActions}>{children}</div>

export default withStyles({
  formActions: {
    marginTop: theme.formItemMargin * 2,
    lineHeight: 'normal',
    ...clearfix(),
    [breakpoint(theme.breakpoints.sm)]: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      '& > * + *': {
        marginLeft: 20,
        marginBottom: 0,
      },
    },
  },
})(FormActions)
