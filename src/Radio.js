import React from 'react'
import PropTypes from 'prop-types'
import withFormControl from './FormControl'

const Radio = ({
  name,
  value,
  required,
  setValue,
  options,
}) => (
  options.map((option, index) => (
    <label className='form__radio' key={index} htmlFor={`${name}${index}`}>
      <input
        type='radio'
        name={name}
        value={option.value}
        id={`${name}${index}`}
        checked={option.value === value}
        className={option.value === value ? 'is-checked' : ''} // Better IE support
        onChange={e => setValue(name, e.target.value, required)}
      /> {option.label}
    </label>
  ))
)

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
  ])),
}

export default withFormControl(Radio)
