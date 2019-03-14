import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import classNames from 'classnames'
import { darken } from 'polished'
import withFormControl from '../FormControl'


const Switch = ({
  name,
  value,
  text,
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
    /> {text}
  </label>

Switch.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  text: PropTypes.node,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
}

export default withFormControl(withStyles(theme => ({
  label: {
    display: 'flex',
    position: 'relative',
    textAlign: 'left',
    alignItems: 'flex-start',
    cursor: 'pointer',
  },
  input: {
    position: 'relative',
    width: 34,
    height: 14,
    display: 'inline-block',
    backgroundColor: darken(0.1, theme.colors.inputBorder),
    marginRight: 10,
    padding: 0,
    borderRadius: 7,
    '-webkit-appearance': 'none',
    border: 'none',
    outline: 0,
    verticalAlign: 'middle',
    transform: 'translateY(0.3em)',
    cursor: 'pointer',
    transition: 'background-color 100ms ease-in',
    '&::after': {
      content: '""',
      display: 'block',
      width: 20,
      height: 20,
      position: 'absolute',
      left: 0,
      top: -3,
      backgroundColor: theme.colors.inputBorder,
      border: `1px solid ${darken(0.2, theme.colors.inputBorder)}`,
      borderRadius: 10,
      boxSizing: 'border-box',
      transition: 'left 200ms ease-in',
    },
    '&:checked': {
      backgroundColor: theme.colors.success,
      '&::after': {
        left: 'calc(100% - 20px)',
      },
    },
  },
}))(Switch))
