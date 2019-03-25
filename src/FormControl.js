import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import classNames from 'classnames'
import { lighten, darken } from 'polished'
import { FormConsumer } from './Form'
import { breakpoint, inputHeight, placeholder } from './themeHelpers'


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
      classes,
      className,
      addon,
      help,
      disabled,
      validation,
      inlineLabel,
      inline,
      narrow,
      large,
      children,
    } = this.props
    return (
      <div
        className={classNames(classes.formControl, 'form-control', {
          [classes.inlineLabel]: inlineLabel,
          [classes.inline]: inline,
          [classes.narrow]: narrow,
          [classes.large]: large,
          [classes[validation]]: validation,
          [classes.disabled]: disabled,
          [className]: className,
        })}
      >
        {label && ['Checkbox', 'Checkboxes', 'Radio', 'Switch'].includes(children.type.name)
          ? <span className={classes.label}>{label}</span>
          : <label className={classes.label} htmlFor={name}>{label}</label>
        }
        {children}
        {addon &&
          <div className={classes.addon}>{addon}</div>
        }
        {help &&
          <span className={classes.help}>{help}</span>
        }
      </div>
    )
  }
}

FormControl.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  addon: PropTypes.node,
  help: PropTypes.string,
  disabled: PropTypes.bool,
  validation: PropTypes.oneOf(['success', 'error']),
  inlineLabel: PropTypes.bool,
  inline: PropTypes.bool,
  narrow: PropTypes.bool,
  large: PropTypes.bool,
  initialValue: PropTypes.any,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

const StyledFormControl = withStyles(theme => ({
  formControl: {
    margin: 0,
    marginBottom: theme.sizes.inputGutterBottom,
    position: 'relative',
    width: theme.sizes.inputWidth,
    overflow: 'visible',
    boxSizing: 'border-box',
    maxWidth: '100%',
    textAlign: 'left',
    ...inputHeight(theme.sizes.inputHeight),
    '& .form-input': {
      width: '100%',
      margin: 0,
      border: `1px solid ${theme.colors.inputBorder}`,
      borderRadius: theme.sizes.borderRadius,
      boxSizing: 'border-box',
      fontSize: theme.typography.inputFontSize,
      transition: 'all 200ms ease-in',
      backgroundColor: theme.colors.inputBg,
      paddingLeft: 10,
      paddingRight: 10,
      color: theme.colors.inputText,
      '-webkit-appearance': 'none',
      ...placeholder({
        color: darken(0.1, theme.colors.inputBorder),
      }),
    },
    '& .form-input[type=number]': {
      '-moz-appearance': 'textfield',
      appearance: 'textfield',
      '&::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
      },
    },

    // States
    '& .form-input:focus': {
      border: `1px solid ${theme.colors.accent}`,
      boxShadow: 'none',
      outlineWidth: 0,
    },
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    '& .form-input, & .form-checkitem': {
      pointerEvents: 'none',
    },
  },
  success: {
    '& $label, & $addon, & $help': {
      color: theme.colors.success,
    },
    '& .form-input:not(:focus)': {
      borderColor: theme.colors.success,
    },
  },
  error: {
    '& $label, & $addon, & $help, & .form-checkitem': {
      color: theme.colors.error,
    },
    '& .form-input:not(:focus)': {
      borderColor: theme.colors.error,
      backgroundColor: lighten(0.54, theme.colors.error),
    },
  },
  label: {
    display: 'block',
    margin: 0,
    marginBottom: 10,
    fontSize: theme.typography.labelFontSize,
    lineHeight: 'normal',
    textTransform: 'none',
    textAlign: 'left',
    fontWeight: theme.typography.labelFontWeight,
  },
  help: {
    position: 'absolute',
    top: '100%',
    display: 'block',
    margin: 0,
    fontSize: theme.typography.helpFontSize,
    lineHeight: 'normal',
    color: theme.colors.inputText,
  },
  addon: {
    position: 'absolute',
    bottom: 0,
    right: 10,
  },

  // Modifiers
  inlineLabel: {
    [breakpoint(theme.breakpoints.sm)]: {
      display: 'flex',
      width: '100%',
    },
    '& $label': {
      [breakpoint(theme.breakpoints.sm)]: {
        marginBottom: 0,
        marginRight: 10,
        minWidth: theme.sizes.inlineLabelWidth,
        maxWidth: theme.sizes.inlineLabelWidth,
        whiteSpace: 'nowrap',
      },
      '& + *': {
        [breakpoint(theme.breakpoints.sm)]: {
          flexGrow: 1,
        },
      },
    },
    '& $help': {
      [breakpoint(theme.breakpoints.sm)]: {
        left: theme.sizes.inlineLabelWidth + 10,
      },
    },
  },
  inline: {
    width: '100%',
    '& .form-checkitem': {
      display: 'inline-block',
      whiteSpace: 'nowrap',
      marginRight: 20,
      '&:last-of-type': {
        marginLeft: 0,
      },
    },
  },
  narrow: {
    '& .form-input, & $help': {
      [breakpoint(theme.breakpoints.sm)]: {
        maxWidth: theme.sizes.narrowInputWidth,
      },
    },
  },
  large: {
    ...inputHeight(theme.sizes.inputHeight + 4),
    '& $label': {
      marginBottom: 2,
    },
    '& + &': {
      marginTop: -theme.sizes.inputGutterBottom + 14,
    },
  },
}))(FormControl)


const withFormControl = (Component) => {
  return ({
    label,
    addon,
    className,
    initialValue,
    help,
    name,
    narrow,
    large,
    inlineLabel,
    inline,
    disabled,
    ...otherProps
  }) =>
    <FormConsumer>
      {({ fieldsData, setValue }) => {
        if (!fieldsData[name]) {
          return null
        }
        const { value, validation, required, help: fieldsDataHelp } = fieldsData[name]
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
          help: fieldsDataHelp || help,
          narrow,
          large,
          inlineLabel,
          inline,
          initialValue,
          disabled,
          ...commonProps,
        }
        const inputProps = {
          name,
          value: value !== null ? value : initialValue || '',
          ...commonProps,
          ...otherProps,
        }
        return (
          <StyledFormControl {...formControlProps}>
            <Component {...inputProps} />
          </StyledFormControl>
        )
      }}
    </FormConsumer>
}

export default withFormControl
