import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import classNames from 'classnames'
import { breakpoint } from '../.'


const FormRow = ({ children, mobile, classes, className, noBottomGutter }) =>
  <div className={classNames({
    [classes.formRow]: !mobile,
    [classes.formRowMobile]: mobile,
    [classes.noBottomGutter]: noBottomGutter,
    [className]: className,
  })}>
    {children}
  </div>

FormRow.propTypes = {
  mobile: PropTypes.bool,
}

export default withStyles(theme => {
  const commonStyling = {
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
      [breakpoint(theme.breakpoints.sm)]: commonStyling,
    },
    formRowMobile: commonStyling,
    noBottomGutter: {
      marginBottom: 0,
    },
  }
})(FormRow)
