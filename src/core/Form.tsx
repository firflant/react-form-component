import React from 'react'
import { debounce } from 'throttle-debounce'
import { createUseStyles, useTheme } from 'react-jss'
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


const FieldsContext = React.createContext({})
// eslint-disable-next-line @typescript-eslint/no-empty-function
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
  className = '',
  children,
}: FormProps) => {
  const [fieldsData, setFieldsData] = React.useState({})
  const classes = useStyles()
  const theme = useTheme() as {
    textLabels: textLabels,
    customValidationFunction: customValidationFunction
  }

  React.useEffect(() => {
    setFieldsData(initiateFormFields(fields, requiredFields))
  }, [])

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
  fields: string[],
  required?: string[],
  allRequired?: boolean,
  component?: React.ComponentType,
  onChange?: (fieldsData: fieldsData, fieldName?: string) => void,
  runOnChangeInitially?: boolean,
  className?: string,
  children: React.ReactNode,
}

const useStyles = createUseStyles({
  form: {
    margin: 0,
  },
})

export default Form
