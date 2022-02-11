import React from 'react'
import { setValue } from '../typings'
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
}: InputProps) =>
  <input
    className='form-input'
    name={name}
    type={type === 'password-novalidation' ? 'password' : type}
    // This allows to add a custom validation rule for password field, while still
    // being able to skip the check where it is not neccessary, eg. on login forms.
    placeholder={placeholder}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === 'file' && e.target.files?.length) {
        const fileReader = new FileReader()
        const dataFile = e.target.files[0]
        const { name: fileName, type: fileType } = dataFile
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

export interface InputProps {
  name: string,
  type?: string,
  value: any,
  placeholder: React.ReactNode,
  min: number,
  accept: string,
  required: boolean,
  setValue: setValue,
}

export default withFormControl(Input)
