import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import classNames from 'classnames'
import withFormControl from './FormControl'
import theme from './theme'


const Switch = ({
  name,
  value,
  label,
  required,
  setValue,
  classes,
}) =>
  <label
    className={classNames(classes.label, 'form-checkitem')}
    htmlFor={name}
  >
    <input
      type='checkbox'
      name={name}
      className={classes.input}
      id={name}
      checked={value}
      onChange={e => setValue(name, e.target.checked, required)}
    /> {label}
  </label>

Switch.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
}

export default withFormControl(withStyles({
  label: {
    display: 'flex',
    position: 'relative',
    textAlign: 'left',
    alignItems: 'flex-start',
    cursor: 'pointer',
  },
  input: {
    position: 'relative',
    width: 36,
    height: 14,
    display: 'inline-block',
    backgroundColor: theme.error,
    marginRight: 10,
    padding: 0,
    borderRadius: 7,
    '-webkit-appearance': 'none',
    border: 'none',
    outline: 0,
    verticalAlign: 'middle',
    transform: 'translateY(0.3em)',
    cursor: 'pointer',
    '&::after': {
      content: '""',
      display: 'block',
      width: 20,
      height: 20,
      position: 'absolute',
      left: 0,
      top: -3,
      backgroundColor: theme.formItemBorderColor,
      border: `1px solid ${theme.formItemBorderColor}`,
      borderRadius: 10,
      boxSizing: 'border-box',
    },
    '&:checked': {
      backgroundColor: theme.success,
      '&::after': {
        left: 'auto',
        right: 0,
      },
    },
  },
})(Switch))
