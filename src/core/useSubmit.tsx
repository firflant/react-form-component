import React from 'react'
import { useTheme } from 'react-jss'
import { FieldsContext, SetValueContext, getValues, formHasErrors } from '..'
import {
  type fieldsData,
  type fieldData,
  type setValue,
  type fullTheme,
} from '../typings'


function useSubmit(suppressErrorMessage?: boolean) {
  const theme = useTheme() as fullTheme
  const fieldsData = React.useContext(FieldsContext) as fieldsData
  const setValue = React.useContext(SetValueContext) as setValue

  const submit = (
    e:React.MouseEvent<HTMLButtonElement>,
    callback: (fieldsData: fieldsData) => void,
    reset?: boolean,
  ) => {
    e.preventDefault()
    if (formHasErrors(fieldsData)) {
      // Trigger valdiation check of all fields to prevent submitting before debounce etc.
      Object.entries(fieldsData).forEach(([key, data]) => {
        const { value, mandatory, type } = data as fieldData
        setValue(key, value, mandatory, { type })
      })
      // TODO: Turn back the suppressErrorMessage prop support on TS.
      if (!suppressErrorMessage && theme?.errorNotificationFunc && theme.textLabels?.formInvalid) {
        theme.errorNotificationFunc(theme.textLabels.formInvalid)
      }
    } else {
      if (callback) callback(getValues(fieldsData))
      if (reset) setValue()
    }
  }

  return submit
}

export default useSubmit
