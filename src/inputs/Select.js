import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import classNames from 'classnames'
import withFormControl from '../FormControl'


const Select = ({
  name,
  value,
  placeholder,
  required,
  setValue,
  options,
  classes,
}) =>
  <select
    className={classNames(classes.select, 'form-input form-select')}
    name={name}
    value={value}
    onChange={e => setValue(name, e.target.value, required)}
  >
    {(!value || !required) && <option value='' disabled={required}>
      {placeholder || (required ? 'Select' : 'All')}
    </option>}
    {options.map((item, index) =>
      <option
        key={index}
        value={(typeof item === 'string') ? item : item.value}
      >{(typeof item === 'string') ? item : item.label}</option>
    )}
  </select>

Select.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.node,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
  ])),
}

export const selectTheme = theme => ({
  select: {
    paddingRight: `35px !important`,
    cursor: 'pointer',
    // Remove default caret
    '-webkit-appearance': 'none',
    '&::-ms-expand': {
      display: 'none',
    },
    // Custom caret
    '&:not([multiple])': {
      backgroundImage: `linear-gradient(45deg,transparent 50%,${theme.colors.inputText} 0),linear-gradient(135deg,${theme.colors.inputText} 50%,transparent 0)`,
      backgroundSize: '5px 5px, 5px 5px',
      backgroundRepeat: 'no-repeat',
    },
    '&[multiple]': {
      height: 'auto',
    },
    '&:-webkit-autofill': {
      backgroundColor: `${theme.colors.inputBg} !important`,
      transition: 'background-color 5000s ease-in-out 0s',
    },
  },
})

export default withFormControl(withStyles(selectTheme)(Select))
