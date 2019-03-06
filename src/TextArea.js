import React from 'react'
import PropTypes from 'prop-types'
import withFormControl from './FormControl'

const TextArea = ({
  name,
  value,
  placeholder,
  required,
  setValue,
  rows,
}) =>
  <textarea
    className='form__input'
    name={name}
    type='textarea'
    rows={rows}
    placeholder={placeholder}
    onChange={e => setValue(name, e.target.value, required, 'textarea')}
    value={value}
  />

TextArea.defaultProps = {
  rows: 5,
}

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  rows: PropTypes.number,
}

export default withFormControl(TextArea)
