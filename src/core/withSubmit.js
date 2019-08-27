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
            Object.keys(fieldsData).forEach(key => {
              setValue(key, fieldsData[key].value, fieldsData[key].required, fieldsData[key].type)
            })
            toast.error(theme.textLabels.formInvalid)
          } else {
            callback && callback(getValues(fieldsData))
            reset && setValue()
          }
        }}
      />
    }
  </FormConsumer>

export default withSubmit
