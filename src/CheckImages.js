import React from 'react'
import PropTypes from 'prop-types'
import withFormControl from './FormControl'
import { checkboxHandler } from './helpers'

const CheckImages = ({
  name,
  value,
  required,
  setValue,
  options,
  multiple,
}) =>
  <div className='form__checkimages'>
    {options.map((option, index) => {
      const optionLabel = option.label ? option.label : option.value
      const checked = (value && multiple ? value.includes(option.value) : value === option.value)
      return (
        <div
          key={index}
          className={`form__checkimages-input${checked ? ' is-checked' : ''}`}
          onClick={() => {
            const finalValue = multiple ? checkboxHandler(!checked, option.value, value) : option.value
            setValue(name, finalValue, required)
          }}>
          <img src={option.image} />
          {optionLabel}
        </div>
      )
    })}
  </div>

CheckImages.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  multiple: PropTypes.bool,
}

export default withFormControl(CheckImages)
