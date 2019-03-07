import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import classNames from 'classnames'
import withFormControl from './FormControl'
import theme from './theme'


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
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
  ])),
}

export const selectTheme = { // TODO: reapply for form-input--multiselect
  select: {
    paddingRight: 30,
    cursor: 'pointer',
    // Remove default caret
    '-webkit-appearance': 'none',
    '&::-ms-expand': {
      display: 'none',
    },
    // Custom caret
    '&:not([multiple])': {
      backgroundImage: `linear-gradient(45deg, transparent 50%, ${theme.formItemBorderColor}), linear-gradient(135deg, ${theme.formItemBorderColor} 50%, transparent 50%)`,
      backgroundSize: '5px 5px, 5px 5px',
      backgroundRepeat: 'no-repeat',
    },
    '&[multiple]': {
      height: 'auto',
    },
    '&:-webkit-autofill': {
      backgroundColor: `${theme.bodyBg} !important`,
      transition: 'background-color 5000s ease-in-out 0s',
    },
  },
}

export default withFormControl(withStyles(selectTheme)(Select))
