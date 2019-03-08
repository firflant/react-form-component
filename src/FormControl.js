import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import classNames from 'classnames'
import { FormConsumer } from './Form'
import { breakpoint, inputHeight } from './themeHelpers'
import theme from './theme'


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
      tiny,
      large,
      children,
    } = this.props
    return (
      <div
        className={classNames(classes.formControl, 'form-control', {
          [classes.inlineLabel]: inlineLabel,
          [classes.inline]: inline,
          [classes.tiny]: tiny,
          [classes.large]: large,
          [classes[validation]]: validation,
          [classes.disabled]: disabled,
          [className]: className,
        })}
      >
        { label && ['Checkboxes', 'Radio'].includes(children.type.name)
          ? <span className={classes.label}>{label}</span>
          : (label && children.type.name !== 'Checkbox') &&
          <label className={classes.label} htmlFor={name}>{label}</label>
        }
        {children}
        { addon &&
          <div className={classes.addon}>{addon}</div>
        }
        { help &&
          <span className={classes.help}>{help}</span>
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
  inline: PropTypes.bool,
  tiny: PropTypes.bool,
  large: PropTypes.bool,
  initialValue: PropTypes.any,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

const StyledFormControl = withStyles({
  formControl: {
    margin: 0,
    marginBottom: theme.formItemMargin,
    position: 'relative',
    width: theme.formItemWidth,
    overflow: 'visible',
    boxSizing: 'border-box',
    maxWidth: '100%',
    ...inputHeight(theme.formItemHeight),
    '& .form-input': {
      width: '100%',
      margin: 0,
      border: `1px solid ${theme.formItemBorderColor}`,
      borderRadius: 0,
      boxSizing: 'border-box',
      fontSize: theme.formItemFontSize,
      transition: 'all 200ms ease-in',
      backgroundColor: theme.formItemBgColor,
      paddingLeft: 10,
      paddingRight: 10,
      color: theme.formItemColor,
      '+placeholder': {
        color: theme.formItemColor,
      },
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
      border: `1px solid ${theme.brandPrimary}`,
      boxShadow: 'none',
      outlineWidth: 0,
    },
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    '& .form-input, & .form-checkbox, & .form-radio, & .form-checkimage': {
      pointerEvents: 'none',
    },
  },
  success: {
    '& $label, & $addon, & $help': {
      color: theme.success,
    },
    '& .form-input:not(:focus)': {
      borderColor: theme.success,
    },
  },
  error: {
    '& $label, & $addon, & $help, & .form-checkbox, & .form-radio, & .form-checkimage': {
      color: theme.error,
    },
    '& .form-input:not(:focus)': {
      borderColor: theme.error,
      backgroundColor: theme.error,
    },
  },
  label: {
    display: 'block',
    margin: 0,
    marginBottom: 10,
    fontSize: 14,
    lineHeight: 'normal',
    textTransform: 'none',
    textAlign: 'left',
    fontWeight: theme.regular,
  },
  help: {
    position: 'absolute',
    top: '100%',
    display: 'block',
    margin: 0,
    fontSize: theme.fontSizeXsmall,
    lineHeight: 'normal',
    color: theme.formItemColor,
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
        minWidth: theme.formItemInlineLabelWidth,
        maxWidth: theme.formItemInlineLabelWidth,
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
        left: theme.formItemInlineLabelWidth + 10,
      },
    },
  },
  inline: {
    width: '100%',
    '& .form-checkbox, & .form-radio': {
      display: 'inline-block',
      whiteSpace: 'nowrap',
      marginRight: 20,
      '&:last-of-type': {
        marginLeft: 0,
      },
    },
  },
  tiny: {
    '.form-checkbox': {
      fontSize: 12,
      lineHeight: 17,
    },
    [breakpoint(theme.breakpoints.sm)]: {
      '.form-input': {
        maxWidth: theme.formItemTinyInputWidth,
      },
      '& $help': {
        left: 'auto',
        right: 0,
        width: theme.formItemTinyInputWidth,
      },
      // '&.form__item--inline-label': {
      //   '$label': {
      //     minWidth: `calc(100% - ${theme.formItemTinyInputWidth} - 10px)`,
      //     maxWidth: `calc(100% - ${theme.formItemTinyInputWidth} - 10px)`,
      //   },
      // },
    },
  },
  large: {
    ...inputHeight(theme.formItemHeight + 4),
    '& + &': {
      marginTop: -theme.formItemMargin + 14,
    },
  },
})(FormControl)


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
