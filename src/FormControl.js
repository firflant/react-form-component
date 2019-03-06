import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import classNames from 'classnames'
import { FormConsumer } from './Form'
import { breakpoint, inputHeight } from './themeHelpers'


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
      tiny,
      large,
      children,
    } = this.props
    return (
      <div
        className={classNames(classes.formControl, {
          [classes.inlineLabel]: inlineLabel,
          [classes.tiny]: tiny,
          [classes.lg]: large,
          [classes[validation]]: validation,
          className: className,
        })}
        disabled={disabled}
      >
        { label && ['Checkboxes', 'Radio'].includes(children.type.name)
          ? <span className={classes.label}>{label}</span>
          : (label && children.type.name !== 'Checkbox') &&
          <label className={classes.label} htmlFor={name}>{label}</label>
        }
        {children}
        { addon &&
          <div className='form__addon'>{addon}</div>
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
  tiny: PropTypes.bool,
  large: PropTypes.bool,
  initialValue: PropTypes.any,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

const theme = {
  formItemHeight: 40,
  formItemWidth: '100%',
  formItemMargin: 30,
  formItemTinyInputWidth: 140,
  formItemInlineLabelWidth: 130,
  formItemBgColor: 'white',
  formItemBorderColor: '#e6edf4',
  formItemColor: '#3d4348',
  bodyBg: 'white',
  brandPrimary: '#1fc59c',
  regular: 300,
  fontSizeXsmall: 12,
  breakpoints: {
    xs: 0, // Extra small screen / phone
    sm: '768px', // Small screen / tablet
    md: '1000px', // Medium screen / desktop
    lg: '1400px', // Large screen / wide desktop
  },
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
    '& .form__input': {
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
    '& textarea.form__input': { // TODO: Move textarea to textarea
      resize: 'vertical',
    },
    '& .form__input[type=number]': {
      '-moz-appearance': 'textfield',
      appearance: 'textfield',
      '&::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
      },
    },
    '& select.form__input, & .form__input--multiselect': {
      paddingRight: 30,
      cursor: 'pointer',
      // Remove default caret
      '-webkit-appearance': 'none',
      '&::-ms-expand': {
        display: 'none',
      },
      // Custom caret
      '&:not([multiple])': {
        backgroundImage: `linear-gradient(45deg, transparent 50%, ${theme.formItemBorderColor}), linear-gradient(135deg, ${theme.formItemBorderColor} 50%, transparent 50%)`,
        backgroundSize: '5px 5px, 5px 5px',
        backgroundRepeat: 'no-repeat',
      },
      '&[multiple]': {
        height: 'auto',
      },
      '&:-webkit-autofill': {
        backgroundColor: `${theme.bodyBg} !important`,
        transition: 'background-color 5000s ease-in-out 0s',
      },
    },
    // States
    '& .form__input:focus': {
      border: `1px solid ${theme.brandPrimary}`,
      boxShadow: 'none',
      outlineWidth: 0,
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

  // Modifiers
  inlineLabel: {
    [breakpoint(theme.breakpoints.sm)]: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      '.form__label': {
        order: -1,
        margin: 0,
      },
      [breakpoint(theme.breakpoints.sm)]: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        '.form__label': {
          marginRight: 10,
          minWidth: theme.formItemInlineLabelWidth,
          maxWidth: theme.formItemInlineLabelWidth,
          whiteSpace: 'nowrap',
        },
        '.form__input, .form__checkbox, .form__radio, .form__checkimages': {
          flexBasis: `calc(100% - ${theme.formItemInlineLabelWidth + 10})`,
        },
        '.form__checkimages': {
          justifyContent: 'space-between',
        },
        '.form__help': {
          left: theme.formItemInlineLabelWidth + 10,
        },
      },
    },
  },
  tiny: {
    '.form__checkbox': {
      fontSize: 12,
      lineHeight: 17,
    },
    [breakpoint(theme.breakpoints.sm)]: {
      '.form__input': {
        maxWidth: theme.formItemTinyInputWidth,
      },
      '.form__help': {
        left: 'auto',
        right: 0,
        width: theme.formItemTinyInputWidth,
      },
      '&.form__item--inline-label': {
        '.form__label': {
          minWidth: `calc(100% - ${theme.formItemTinyInputWidth} - 10px)`,
          maxWidth: `calc(100% - ${theme.formItemTinyInputWidth} - 10px)`,
        },
      },
    },
  },
  lg: {
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
          <StyledFormControl {...formControlProps}>
            <Component {...inputProps} />
          </StyledFormControl>
        )
      }}
    </FormConsumer>
}

export default withFormControl
