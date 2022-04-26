import React from 'react'
import { debounce } from 'throttle-debounce'
import { setValue, value } from '../typings'
import { withFormControl } from '../.'

/**
 * A basic input field.
 */
const Input = ({
  name,
  type = 'text',
  value,
  placeholder,
  min,
  debounceTime = 500,
  accept,
  activateEnterPress,
  mandatory,
  setValue,
  ...otherProps
}: InputProps) => {
  const [internalValue, setInternalValue] = React.useState('')

  // Apply initial value and react on initialValue change.
  React.useEffect(() => {
    setInternalValue(value)
  }, [value])

  const handleSetValue = (val: value) => {
    if (val !== value) {
      setValue(name, val, mandatory, { type, min })
    }
  }

  const debouncedSetValue = React.useCallback(
    debounce(debounceTime, nextValue => handleSetValue(nextValue)),
    [],
  )

  return (
    <input
      className='rfc-input'
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
            }, mandatory)
          }
        } else {
          setInternalValue(e.target.value)
          debouncedSetValue(e.target.value)
        }
      }}
      onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
        if (activateEnterPress && e.code === 'Enter') {
          e.preventDefault()
          setValue(name, internalValue, mandatory, { type, min, forceSubmit: true })
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
  type?: 'text' | 'email' | 'password' | 'url' | 'tel' | 'number' | 'search' | 'file' | 'date' | 'datetime-local' | 'month' | 'week' | 'time' | 'postcode' | 'password-novalidation',
  value: value,
  placeholder: string | undefined,
  min: number,
  debounceTime: number,
  accept: string,
  activateEnterPress?: boolean,
  mandatory: boolean,
  setValue: setValue,
}

export default withFormControl(Input)
