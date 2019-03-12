import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import classNames from 'classnames'
import withFormControl from '../FormControl'


const Checkbox = ({
  name,
  value,
  content,
  required,
  setValue,
  small,
  classes,
}) =>
  <label
    className={classNames(classes.label, 'form-checkitem', { [classes.small]: small })}
    htmlFor={name}
  >
    <input
      type='checkbox'
      name={name}
      className={classes.input}
      id={name}
      checked={value}
      onChange={e => setValue(name, e.target.checked, required)}
    /> {content}
  </label>

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  required: PropTypes.bool,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  small: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
}

export const checkboxTheme = theme => ({
  label: {
    display: 'flex',
    position: 'relative',
    textAlign: 'left',
    alignItems: 'flex-start',
    cursor: 'pointer',
  },
  input: {
    width: 16,
    margin: '.1em 10px 0 0',
    position: 'relative',
    outline: 'none',
    '-webkit-appearance': 'none',
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: 14,
      height: 14,
      top: 0,
      left: 0,
      backgroundColor: theme.colors.inputBg,
      cursor: 'pointer',
      border: `2px solid ${theme.colors.inputBorder}`,
      borderRadius: 2,
    },
    '&:checked': {
      '&::before': {
        backgroundColor: theme.colors.accent,
        border: `2px solid ${theme.colors.accent}`,
      },
      '&::after': {
        content: '"✓"',
        display: 'block',
        fontFamily: 'monospace',
        position: 'absolute',
        width: 16,
        height: 16,
        lineHeight: '16px',
        top: 1,
        left: 1,
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
        cursor: 'pointer',
      },
    },
  },
  small: {
    fontSize: theme.typography.inputFontSize - 4,
    lineHeight: '18px',
    '& $input': {
      transform: 'translateY(-2px)',
    },
  },
})

export default withFormControl(withStyles(checkboxTheme)(Checkbox))
