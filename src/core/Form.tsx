import React from 'react'
import { debounce } from 'throttle-debounce'
import { useTheme } from 'react-jss'
import {
  initiateFormFields,
  processField,
  updateFieldsRequirements,
  getValues,
} from './helpers'
import {
  fieldsData,
  fieldData,
  setValue,
  fullTheme,
} from '../typings'


export const FieldsContext = React.createContext({})
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const SetValueContext = React.createContext(() => {})


const Form = ({
  fields,
  required: requiredFields,
  allRequired,
  component,
  onChange,
  fieldGroup,
  runOnChangeInitially,
  className = '',
  children,
}: FormProps) => {
  const [fieldsData, setFieldsData] = React.useState(
    initiateFormFields(fields, requiredFields),
  )
  const theme = useTheme() as fullTheme

  React.useEffect(() => {
    setFieldsData(prevState => updateFieldsRequirements(
      prevState,
      allRequired ? fields : requiredFields,
    ))
  }, [requiredFields])

  const debouncedOnChange = React.useCallback(
    debounce(500, (nextValue, name) => onChange && onChange(nextValue, name)),
    [],
  )

  const setValue:setValue = (name, value, required, options) => {
    if (!name) {
      // If no field name is provided, reset whole form
      setFieldsData(initiateFormFields(fields, allRequired ? fields : requiredFields))
    } else {
      setFieldsData((prevState: fieldsData) => {
        const fieldsData = {
          ...prevState,
          ...processField(
            name,
            value,
            required || false,
            options,
            theme.textLabels,
            theme.customValidationFunction,
          ),
        }
        if (onChange) {
          // If onChange prop is present, run it on every form change,
          // except the initial load. When runOnChangeInitially prop is present,
          // run it also on Initial load.
          const formIsInitiated = Object.values(prevState)
            .every((item: fieldData) => typeof item.value === 'undefined')
          if (!formIsInitiated || runOnChangeInitially) {
            debouncedOnChange(getValues(fieldsData), name)
          }
        }
        return fieldsData
      })
    }
  }

  // Prevent nesting <form> tags when using form as a Fieldgroup.
  const Component = fieldGroup ? 'div' : component || 'form'
  return (
    <Component className={className || undefined}>
      <FieldsContext.Provider value={fieldsData}>
        <SetValueContext.Provider value={setValue}>
          {children}
        </SetValueContext.Provider>
      </FieldsContext.Provider>
    </Component>
  )
}

export interface FormProps {
  fields: string[],
  required?: string[],
  allRequired?: boolean,
  component?: React.ComponentType,
  onChange?: (fieldsData: fieldsData, fieldName?: string) => void,
  fieldGroup?: boolean,
  runOnChangeInitially?: boolean,
  className?: string,
  children: React.ReactNode,
}

export default Form
