import React from 'react'
import { debounce } from 'throttle-debounce'
import withStyles from 'react-jss'
import classNames from 'classnames'
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
  textLabels,
  customValidationFunction,
} from '../typings'

/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-did-update-set-state */

const FieldsContext = React.createContext({})
const SetValueContext = React.createContext(() => {})

export const FormConsumer = ({ children }: FormConsumerProps) => (
  <FieldsContext.Consumer>
    {fieldsData =>
      <SetValueContext.Consumer>
        {setValue => children({ fieldsData, setValue })}
      </SetValueContext.Consumer>
    }
  </FieldsContext.Consumer>
)

export interface FormConsumerProps {
  children: ({}) => React.ReactNode,
}

const Form = ({
  fields,
  required: requiredFields,
  allRequired,
  component,
  onChange,
  runOnChangeInitially,
  className,
  classes,
  theme,
  children,
}: FormProps) => {
  const [fieldsData, setFieldsData] = React.useState({})

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
        return { fieldsData }
      })
    }
  }

  // Prevent puting <form> tag into a <form> tag when using form in mutlivalue inputs.
  const Component = runOnChangeInitially ? 'div' : component || 'form'
  return (
    <Component className={classNames(classes.form, { [className]: className })}>
      <FieldsContext.Provider value={fieldsData}>
        <SetValueContext.Provider value={setValue}>
          {children}
        </SetValueContext.Provider>
      </FieldsContext.Provider>
    </Component>
  )
}

export interface FormProps {
  fields: [string],
  required?: [string],
  allRequired: boolean | undefined,
  component?: React.ComponentType,
  children: React.ReactNode,
  onChange?: (fieldsData: fieldsData, fieldName?: string) => void,
  runOnChangeInitially?: boolean,
  className: string,
  classes: { form: object },
  theme: {
    textLabels: textLabels,
    customValidationFunction: customValidationFunction
  },
}

export default withStyles(() => ({
  form: {
    margin: 0,
  },
}), { injectTheme: true })(Form)
