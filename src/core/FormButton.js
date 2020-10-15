import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'react-jss'
import DefaultButton from '../default/DefaultButton'
import withSubmit from './withSubmit'
import Loader from '../default/Loader'


/**
 * A button component to handle form actions, like submit or reset.
 */
const FormButton = ({
  callback,
  component: Component,
  reset,
  loading,
  loadingComponent: LoadingComponent,
  suppressErrorMessage,
  children,
  submit,
  ...otherProps
}) =>
  <Component
    {...otherProps}
    onClick={e => submit(e, callback, reset)}
    disabled={loading}
  >
    {loading && <><LoadingComponent />&nbsp;</>}
    {children}
  </Component>

FormButton.propTypes = {
  callback: PropTypes.func,
  loading: PropTypes.bool,
  reset: PropTypes.bool,
  suppressErrorMessage: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

FormButton.defaultProps = {
  component: DefaultButton,
  loadingComponent: Loader,
}

export default withTheme(withSubmit(FormButton))
