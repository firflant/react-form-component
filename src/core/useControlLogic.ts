import React from 'react'
import { FieldsContext, SetValueContext } from '../.'
import {
  fieldsData,
  setValue,
  ControlLogicProps,
  ControlLogicHook,
} from '../typings'

const useControlLogic = (
  InputComponent: React.ComponentType,
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