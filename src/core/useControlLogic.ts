import React from 'react'
import { FieldsContext, SetValueContext } from '../.'
import {
  type fieldsData,
  type setValue,
  type ControlLogicProps,
  type ControlLogicHook,
  type InputProps,
} from '../typings'

const useControlLogic = <T>(
  InputComponent: React.ComponentType<T | InputProps>,
  {
    name,
    label,
    initialValue,
    type,
    help,
    className,
    prefix,
    suffix,
    narrow,
    large,
    inlineLabel,
    inline,
    noBottomGutter,
    disabled,
    ...otherProps
  }: ControlLogicProps,
) => {
  const fieldsData = React.useContext(FieldsContext) as fieldsData
  const setValue = React.useContext(SetValueContext) as setValue

  const fieldData = fieldsData[name] || {}

  const {
    value,
    touched,
    validation,
    mandatory,
    help: fieldsDataHelp,
  } = fieldData

  React.useEffect(() => {
    // Appply default field value on init and when it changes.
    if (initialValue && !touched) {
      setValue(name, initialValue, mandatory)
    }
  }, [initialValue])

  const inputProps = {
    ...otherProps,
    name,
    value: value !== null ? value : initialValue,
    mandatory,
    type,
    setValue,
    // Props below are typical for FormControl, but some design systems, like
    // MUI for example, sets them on an input level. Puting them there makes
    // this library more universal.
    label,
    validation: validation || '',
    help: fieldsDataHelp || help,
    disabled,
    prefix,
    suffix,
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
    prefix,
    suffix,
    className,
  }

  return {
    inputProps,
    formControlProps,
  } as ControlLogicHook
}

export default useControlLogic