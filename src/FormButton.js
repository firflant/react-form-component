import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import ReactLoading from 'react-loading'
import { NotificationManager } from 'react-notifications'
import { FormConsumer } from './Form'
import { getValues, formIsInvalid } from './helpers'


/**
 * A button component to handle form actions, like submit or reset.
 */
const FormButton = ({
  callback,
  component,
  size,
  variant,
  reset,
  loading,
  className,
  children,
  ...otherProps
}) =>
  <FormConsumer>
    {({ fieldsData, setValue }) => {
      const ComponentProp = component
      return (
        <ComponentProp
          size={size}
          variant={variant}
          {...otherProps}
          onClick={() => {
            if (formIsInvalid(fieldsData)) {
              // Trigger valdiation check of all fields.
              Object.keys(fieldsData).forEach(key => {
                setValue(key, fieldsData[key].value, fieldsData[key].required, fieldsData[key].type)
              })
              NotificationManager.error('Form contains errors. Check all fields.')
            } else {
              callback && callback(getValues(fieldsData))
              reset && setValue()
            }
          }}
          disabled={loading}
          className={className}
        >
          {loading &&
            <Fragment>
              <ReactLoading
                type='spinningBubbles'
                width={18}
                height={18}
                color='#ffffff'
              />&nbsp;
            </Fragment>
          }
          {children}
        </ComponentProp>
      )
    }}
  </FormConsumer>

FormButton.propTypes = {
  callback: PropTypes.func,
  component: PropTypes.elementType,
  size: PropTypes.string,
  variant: PropTypes.string,
  loading: PropTypes.bool,
  reset: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

FormButton.defaultProps = {
  component: 'button',
}

export default FormButton
