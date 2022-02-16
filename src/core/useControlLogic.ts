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
    addon,
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

  React.useEffect(() => {
    // Appply default field value on init and when it changes.
    if (initialValue) {
      setValue(name, initialValue, required)
    }
  }, [initialValue])

  const fieldData = fieldsData[name] || {}

  const {
    value,
    validation,
    required,
    help: fieldsDataHelp,
  } = fieldData

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

  return {
    inputProps,
    formControlProps,
  } as ControlLogicHook
}

export default useControlLogic