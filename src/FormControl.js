import React from 'react'
import PropTypes from 'prop-types'
import bemCx from 'bem-modifiers'
import { FormConsumer } from './Form'


class FormControl extends React.Component {
  componentDidUpdate(prevProps) {
    // If default field value has changed, change the current value.
    if ((this.props.initialValue && this.props.initialValue !== prevProps.initialValue) ||
    (prevProps.initialValue && !this.props.initialValue)) {
      const { name, initialValue, required, type, setValue } = this.props
      setValue(name, initialValue, required, type)
    }
  }

  componentDidMount() {
    // Appply default field value.
    if (this.props.initialValue) {
      const { name, initialValue, required, type, setValue } = this.props
      setValue(name, initialValue, required, type)
    }
  }

  render() {
    const {
      name,
      label,
      className,
      addon,
      help,
      disabled,
      validation,
      inlineLabel,
      tiny,
      large,
      children,
    } = this.props
    return (
      <div
        className={bemCx('form__item', {
          'inline-label': inlineLabel,
          'tiny': tiny,
          'lg': large,
        }, {
          [`has-${validation}`]: validation,
          className: className,
        })}
        disabled={disabled}
      >
        { label && ['Checkboxes', 'Radio'].includes(children.type.name)
          ? <span className='form__label'>{label}</span>
          : (label && children.type.name !== 'Checkbox') &&
          <label className='form__label' htmlFor={name}>{label}</label>
        }
        {children}
        { addon &&
          <div className='form__addon'>{addon}</div>
        }
        { help &&
          <span className='form__help'>{help}</span>
        }
      </div>
    )
  }
}

FormControl.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  addon: PropTypes.string,
  help: PropTypes.string,
  disabled: PropTypes.bool,
  validation: PropTypes.oneOf(['success', 'error']),
  inlineLabel: PropTypes.bool,
  tiny: PropTypes.bool,
  large: PropTypes.bool,
  initialValue: PropTypes.any,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}


const withFormControl = (Component) => {
  return ({
    type,
    label,
    addon,
    className,
    initialValue,
    initialHelp,
    name,
    tiny,
    large,
    ...otherProps
  }) =>
    <FormConsumer>
      {({ fieldsData, setValue }) => {
        if (!fieldsData[name]) {
          return null
        }
        const { value, validation, required, help } = fieldsData[name]
        const commonProps = {
          label,
          required,
          setValue,
        }
        const formControlProps = {
          name,
          validation,
          className,
          addon,
          help: help || initialHelp,
          tiny,
          large,
          initialValue,
          ...commonProps,
        }
        const inputProps = {
          name,
          value: value !== null ? value : initialValue || '',
          ...commonProps,
          ...otherProps,
        }
        return (
          <FormControl {...formControlProps}>
            <Component {...inputProps} />
          </FormControl>
        )
      }}
    </FormConsumer>
}

export default withFormControl
