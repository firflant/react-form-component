import React from 'react'
import PropTypes from 'prop-types'


class FormControlLogic extends React.Component {
  componentDidUpdate(prevProps) {
    // If default field value has changed, change the current value.
    if ((this.props.initialValue && this.props.initialValue !== prevProps.initialValue) ||
    (prevProps.initialValue && !this.props.initialValue)) {
      const { name, initialValue, required, setValue } = this.props
      setValue(name, initialValue, required)
    }
  }

  componentDidMount() {
    // Appply default field value.
    if (this.props.initialValue) {
      const { name, initialValue, required, setValue } = this.props
      setValue(name, initialValue, required)
    }
  }

  render() {
    return this.props.children
  }
}

FormControlLogic.propTypes = {
  name: PropTypes.string.isRequired,
  initialValue: PropTypes.any,
  required: PropTypes.bool,
  type: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default FormControlLogic
