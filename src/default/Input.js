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
}) =>
  <input
    className='form-input'
    name={name}
    type={type}
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
