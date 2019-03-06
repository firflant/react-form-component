import React from 'react'
import PropTypes from 'prop-types'
import withFormControl from './FormControl'


const Checkbox = ({
  name,
  value,
  label,
  required,
  setValue,
}) =>
  <label className='form__checkbox' htmlFor={name}>
    <input
      type='checkbox'
      name={name}
      id={name}
      checked={value}
      onChange={e => setValue(name, e.target.checked, required)}
    /> {label}
  </label>

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
}

export default withFormControl(Checkbox)
