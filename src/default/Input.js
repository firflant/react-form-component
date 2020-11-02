import React from 'react'
import PropTypes from 'prop-types'
import { withFormControl } from '../.'


const Input = ({
  name,
  type,
  value,
  placeholder,
  min,
  accept,
  required,
  setValue,
  ...otherProps
}) =>
  <input
    className='form-input'
    name={name}
    type={type === 'password-novalidation' ? 'password' : type}
    // This allows to add a custom validation rule for password field, while still
    // being able to skip the check where it is not neccessary, eg. on login forms.
    placeholder={placeholder}
    onChange={e => {
      if (type === 'file') {
        const fileReader = new FileReader()
        const { name: fileName, type: fileType } = e.target.files[0]
        const dataFile = e.target.files[0]
        fileReader.readAsDataURL(e.target.files[0])
        fileReader.onload = () => {
          const data = fileReader.result
          setValue(name, {
            name: fileName,
            type: fileType.split('/')[0],
            data,
            dataFile,
          }, required)
        }
      } else {
        setValue(name, e.target.value, required, { type, min })
      }
    }}
    accept={accept}
    value={type !== 'file' ? value : undefined}
    {...otherProps}
  />

Input.defaultProps = {
  type: 'text',
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.any,
  placeholder: PropTypes.node,
  min: PropTypes.number,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
}

export default withFormControl(Input)
