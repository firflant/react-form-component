import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import ReactLoading from 'react-loading'
import { NotificationManager } from 'react-notifications'
import withStyles from 'react-jss'
import classNames from 'classnames'
import { lighten } from 'polished'
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
  classes,
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
          className={classNames(className, { [classes.button]: component === 'button' })}
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

export default withStyles(theme => ({
  button: {
    padding: `0 ${theme.sizes.inputHeight / 2}px`,
    fontSize: theme.typography.inputFontSize,
    lineHeight: `${theme.sizes.inputHeight}px`,
    height: theme.sizes.inputHeight,
    borderWidth: 0,
    borderRadius: theme.sizes.borderRadius,
    whiteSpace: 'nowrap',
    color: 'white',
    backgroundColor: theme.colors.accent,
    cursor: 'pointer',
    display: 'inline-flex',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: lighten(0.1, theme.colors.accent),
    },
  },
}))(FormButton)
