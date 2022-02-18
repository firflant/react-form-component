import React from 'react'
import { debounce } from 'throttle-debounce'
import { setValue, value } from '../typings'
import { withFormControl } from '../.'

const Input = ({
  name,
  type= 'text',
  value,
  placeholder,
  min,
  debounceTime = 500,
  accept,
  required,
  setValue,
  ...otherProps
}: InputProps) => {
  const [internalValue, setInternalValue] = React.useState('')

  // Apply initial value.
  React.useEffect(() => {
    setInternalValue(value)
  }, [])

  const handleSetValue = (val: value) => {
    setValue(name, val, required, { type, min })
  }

  const debouncedSetValue = React.useCallback(
    debounce(debounceTime, nextValue => handleSetValue(nextValue)),
    [],
  )

  return (
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
          setInternalValue(e.target.value)
          debouncedSetValue(e.target.value)
        }
      }}
      accept={accept}
      value={type !== 'file' ? internalValue : undefined}
      onBlur={e => handleSetValue(e.target.value)}
      {...otherProps}
    />
  )
}

export interface InputProps {
  name: string,
  type?: string,
  value: value,
  placeholder: string | undefined,
  min: number,
  debounceTime: number,
  accept: string,
  required: boolean,
  setValue: setValue,
}

export default withFormControl(Input)
