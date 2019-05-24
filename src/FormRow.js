import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import { breakpoint } from './themeHelpers'


const FormRow = ({ children, mobile, classes }) =>
  <div className={mobile ? classes.formRowMobile : classes.formRow}>
    {children}
  </div>

FormRow.propTypes = {
  mobile: PropTypes.bool,
}

export default withStyles(theme => {
  const styling = {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: theme.sizes.inputGutterBottom,
    '& .form-control': {
      marginBottom: 0,
    },
    '& > div + *': {
      marginLeft: theme.sizes.formRowGutter,
    },
  }
  return {
    formRow: {
      [breakpoint(theme.breakpoints.sm)]: styling,
    },
    formRowMobile: styling,
  }
})(FormRow)
