import React from 'react'
import withStyles from 'react-jss'
import PropTypes from 'prop-types'


const FormActions = ({ children, classes, align }) =>
  <div
    className={classes.formActions}
    style={{ justifyContent: align === 'left'
      ? 'flex-start'
      : align === 'right'
        ? 'flex-end'
        : 'center',
    }}
  >{children}</div>

FormActions.propTypes = {
  align: PropTypes.oneOf(['left', 'right']),
}

export default withStyles(theme => ({
  formActions: {
    marginTop: theme.sizes.formActionsDistance,
    lineHeight: 'normal',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: -10,
    '& > *': {
      margin: 10,
    },
  },
}))(FormActions)
