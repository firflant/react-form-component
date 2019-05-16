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

export const switchTheme = theme => ({
  label: {
    display: 'flex',
    position: 'relative',
    textAlign: 'left',
    alignItems: 'flex-start',
    cursor: 'pointer',
  },
  input: {
    position: 'relative',
    minWidth: theme.sizes.inputHeight * 7 / 8,
    height: theme.sizes.inputHeight / 2,
    display: 'inline-block',
    backgroundColor: theme.colors.inputBg,
    marginRight: 10,
    padding: 0,
    borderRadius: theme.sizes.inputHeight / 4,
    '-webkit-appearance': 'none',
    border: `1px solid ${darken(0.2, theme.colors.inputBorder)}`,
    outline: 0,
    verticalAlign: 'middle',
    transform: 'translateY(0.3em)',
    cursor: 'pointer',
    transition: 'background-color 100ms ease-in',
    '&::after': {
      content: '""',
      display: 'block',
      width: theme.sizes.inputHeight / 2 + 2,
      height: theme.sizes.inputHeight / 2 + 2,
      position: 'absolute',
      left: -1,
      top: -2,
      backgroundColor: theme.colors.inputBorder,
      border: `1px solid ${darken(0.2, theme.colors.inputBorder)}`,
      borderRadius: '50%',
      boxSizing: 'border-box',
      transition: 'left 200ms ease-in',
    },
    '&:checked': {
      backgroundColor: theme.colors.success,
      '&::after': {
        left: 'calc(100% - 19px)',
      },
    },
  },
})

export default withFormControl(withStyles(switchTheme)(Switch))
