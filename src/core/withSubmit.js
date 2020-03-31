import React from 'react'
import { toast } from 'react-toastify'
import { FormConsumer, getValues, formIsInvalid } from '../.'

const withSubmit = Component => props =>
  <FormConsumer>
    {({ fieldsData, setValue }) =>
      <Component
        {...props}
        submit={(e, callback, reset) => {
          e.preventDefault()
          if (formIsInvalid(fieldsData)) {
            // Trigger valdiation check of all fields.
            Object.entries(fieldsData).forEach(([key, data]) => {
              const { value, required, type } = data
              setValue(key, value, required, { type })
            })
            props.theme.errorNotificationFunc(props.theme.textLabels.formInvalid)
          } else {
            callback && callback(getValues(fieldsData))
            reset && setValue()
          }
        }}
      />
    }
  </FormConsumer>

export default withSubmit
