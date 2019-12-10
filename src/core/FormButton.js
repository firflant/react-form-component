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
  component,
  reset,
  loading,
  loadingComponent,
  children,
  submit,
  ...otherProps
}) => {
  const Component = component
  const LoadingComponent = loadingComponent
  return (
    <Component
      {...otherProps}
      onClick={e => submit(e, callback, reset)}
      disabled={loading}
    >
      {loading &&
        <React.Fragment>
          <LoadingComponent />&nbsp;
        </React.Fragment>
      }
      {children}
    </Component>
  )
}

FormButton.propTypes = {
  callback: PropTypes.func,
  component: PropTypes.elementType,
  loading: PropTypes.bool,
  loadingComponent: PropTypes.elementType,
  reset: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

FormButton.defaultProps = {
  component: DefaultButton,
  loadingComponent: Loader,
}

export default withTheme(withSubmit(FormButton))
