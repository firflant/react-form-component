import React from 'react'
import PropTypes from 'prop-types'
import withFormControl from './FormControl'

const Input = ({
  name,
  type,
  value,
  placeholder,
  required,
  setValue,
}) =>
  <input
    className='form-input'
    name={name}
    type={type}
    placeholder={placeholder}
    onChange={e => setValue(name, e.target.value, required, type)}
    value={value}
  />

Input.defaultProps = {
  type: 'text',
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'text',
    'name',
    'email',
    'password',
    'url',
    'tel',
    'number',
    'search',
    'file',
    'date',
    'datetime-local',
    'month',
    'week',
    'time',
    'postcode',
  ]),
  value: PropTypes.any,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
}

export default withFormControl(Input)
