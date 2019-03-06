import React from 'react'
import PropTypes from 'prop-types'
import withFormControl from './FormControl'
import { checkboxHandler } from './helpers'

const Checkboxes = ({
  name,
  value,
  required,
  setValue,
  options,
}) => (
  options.map((option, index) => {
    const optionLabel = (typeof option === 'string') ? option : option.label
    const optionValue = (typeof option === 'string') ? option : option.value
    const checked = (value && value.includes(optionValue))
    return (
      <label className='form__checkbox' key={index} htmlFor={`${name}${index}`}>
        <input
          type='checkbox'
          name={`${name}${index}`}
          id={`${name}${index}`}
          checked={checked}
          onChange={() => {
            const finalValue = checkboxHandler(!checked, optionValue, value)
            setValue(name, finalValue, required, 'array')
          }}
        /> {optionLabel}
      </label>
    )
  })
)

Checkboxes.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      label: PropTypes.node,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ])),
}

export default withFormControl(Checkboxes)
