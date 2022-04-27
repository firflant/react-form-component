import React from 'react'
import { debounce } from 'throttle-debounce'
import { useTheme } from 'react-jss'
import {
  initiateFormFields,
  processField,
  updateMandatory,
  getValues,
} from './utils'
import {
  fieldsData,
  fieldData,
  setValue,
  fullTheme,
} from '../typings'


export const FieldsContext = React.createContext({})
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const SetValueContext = React.createContext(() => {})

/**
 * Initiates a scope of new form.
 */
const Form = ({
  fields,
  mandatory: mandatoryFields,
  allMandatory,
  component,
  onChange,
  isFieldGroup,
  runOnChangeInitially,
  onEnterPress,
  className = '',
  children,
}: FormProps) => {
  const [fieldsData, setFieldsData] = React.useState(
    initiateFormFields(fields, allMandatory ? fields : mandatoryFields),
  )
  const theme = useTheme() as fullTheme

  React.useEffect(() => {
    setFieldsData(prevState => updateMandatory(
      prevState,
      allMandatory ? fields : mandatoryFields,
    ))
  }, [mandatoryFields])

  const debouncedOnChange = React.useCallback(
    debounce(500, (nextValue, name) => onChange && onChange(nextValue, name)),
    [],
  )

  const setValue:setValue = (name, value, mandatory, options) => {
    if (onEnterPress && options?.forceSubmit) {
      onEnterPress(getValues(fieldsData))
    }
    if (!name) {
      // Not providing field name - a method to reset the whole form.
      setFieldsData(initiateFormFields(fields, allMandatory ? fields : mandatoryFields))
    } else {
      setFieldsData((prevState: fieldsData) => {
        const fieldsData = {
          ...prevState,
          ...processField(
            name,
            value,
            mandatory || false,
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
  const Component = isFieldGroup ? 'div' : component || 'form'
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
  /**
   * Names of all fields prescribed for a form
   */
  fields: string[],
  /**
   * Names of fields that should be mandatory
   */
  mandatory?: string[],
  /**
   * Sets all fields as mandatory
   */
  allMandatory?: boolean,
  /**
   * Replace `<form>` with another HTML tag or component
   */
  component?: React.ComponentType,
  /**
   * Function to run on each fields change
   */
  onChange?: (fieldsData: fieldsData, fieldName?: string) => void,
  /**
   * Prop used by Fieldgroup component.
   */
  isFieldGroup?: boolean,
  /**
   * Runs onChange function also on initial render
   */
  runOnChangeInitially?: boolean,
  /**
   * Submit function called when pressing enter within input
   */
  onEnterPress?: (fieldsData: fieldsData) => void,
  /**
   * Give form element a class
   */
  className?: string,
  children: React.ReactNode,
}

export default Form
