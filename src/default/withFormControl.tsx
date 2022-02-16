import { FormControl, FieldsContext, SetValueContext } from '../.'

import React from 'react'
import { fieldsData, setValue, value, validation } from '../typings'

type ExtraInputProps = {
  name: string,
  value: value,
  type?: string,
  validation?: validation,
  setValue: setValue,
}

export function withFormControl<T>(
  InputComponent: React.ComponentType<T | ExtraInputProps>,
) {
  const FormControlWrapped = ({
    name,
    label,
    initialValue,
    type,
    help,
    className,
    addon,
    narrow,
    large,
    inlineLabel,
    inline,
    noBottomGutter,
    disabled,
    ...otherProps
  }: FormControlWrappedProps) => {
    const fieldsData = React.useContext(FieldsContext) as fieldsData
    const setValue = React.useContext(SetValueContext) as setValue

    React.useEffect(() => {
      // Appply default field value on init and when it changes.
      if (initialValue) {
        setValue(name, initialValue, required)
      }
    }, [initialValue])

    if (!fieldsData[name]) return null

    const { value, validation, required, help: fieldsDataHelp } = fieldsData[name]

    const inputProps = {
      ...otherProps,
      name,
      value: (value !== null ? value : initialValue) || '',
      required,
      type,
      setValue,
    }

    const formControlProps = {
      name,
      inlineLabel,
      inline,
      narrow,
      large,
      noBottomGutter,
      validation: validation || '',
      disabled,
      displayName: InputComponent.displayName || '',
      label,
      help: fieldsDataHelp || help,
      addon,
      className,
    }

    return (
      <FormControl { ...formControlProps}>
        <InputComponent {...inputProps} />
      </FormControl>
    )
  }
  return FormControlWrapped
}

export interface FormControlWrappedProps {
  addon?: React.ReactNode,
  children?: React.ReactNode,
  className?: string,
  disabled?: boolean,
  help?: React.ReactNode,
  initialValue?: any,
  inline?: boolean,
  inlineLabel?: boolean,
  label?: React.ReactNode,
  large?: boolean,
  name: string,
  narrow?: boolean,
  noBottomGutter?: boolean,
  required?: boolean,
  type?: string,
  validation?: validation,
  [key: string]: any,
}

export default withFormControl


