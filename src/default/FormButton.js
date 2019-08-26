import React from 'react'
import PropTypes from 'prop-types'
import ReactLoading from 'react-loading'
import { withTheme } from 'react-jss'
import DefaultButton from './DefaultButton'
import withSubmit from '../core/withSubmit'


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
  submit,
  ...otherProps
}) => {
  const Component = component
  return (
    <Component
      {...otherProps}
      onClick={e => submit(e, callback, reset)}
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
    </Component>
  )
}

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

export default withSubmit(withTheme(FormButton))
