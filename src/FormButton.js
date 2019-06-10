import React from 'react'
import PropTypes from 'prop-types'
import ReactLoading from 'react-loading'
import { toast } from 'react-toastify'
import { withTheme } from 'react-jss'
import DefaultButton from './DefaultButton'
import { FormConsumer } from './Form'
import { getValues, formIsInvalid } from './helpers'


/**
 * A button component to handle form actions, like submit or reset.
 */
const FormButton = ({
  callback,
  component,
  reset,
  loading,
  theme,
  children,
  ...otherProps
}) =>
  <FormConsumer>
    {({ fieldsData, setValue }) => {
      const ComponentProp = component
      return (
        <ComponentProp
          {...otherProps}
          onClick={e => {
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
          disabled={loading}
        >
          {loading &&
            <React.Fragment>
              <ReactLoading
                type='spinningBubbles'
                width={18}
                height={18}
                color='#ffffff'
              />&nbsp;
            </React.Fragment>
          }
          {children}
        </ComponentProp>
      )
    }}
  </FormConsumer>

FormButton.propTypes = {
  callback: PropTypes.func,
  component: PropTypes.elementType,
  loading: PropTypes.bool,
  reset: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

FormButton.defaultProps = {
  component: DefaultButton,
}

export default withTheme(FormButton)
