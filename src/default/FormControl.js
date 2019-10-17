import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import classNames from 'classnames'
import { lighten } from 'polished'
import {
  FormConsumer,
  FormControlLogic,
  breakpoint,
  inputHeight,
  placeholder,
} from '../.'


const withFormControl = InputComponent => {
  const FormControl = ({
    name,
    label,
    initialValue,
    type,
    help,
    className,
    addon,
    narrow,
    large,
    inlineLabel,
    inline,
    noBottomGutter,
    disabled,
    classes,
    ...otherProps
  }) =>
    <FormConsumer>
      {({ fieldsData, setValue }) => {
        if (!fieldsData[name]) return null

        const { value, validation, required, help: fieldsDataHelp } = fieldsData[name]
        const logicProps = {
          name,
          initialValue,
          required,
          type,
          setValue,
        }
        const inputProps = {
          name,
          value: (value !== null ? value : initialValue) || '',
          required,
          type,
          setValue,
          ...otherProps,
        }

        return (
          <FormControlLogic {...logicProps}>
            <div
              className={classNames(classes.formControl, 'form-control', {
                [classes.inlineLabel]: inlineLabel,
                [classes.inline]: inline,
                [classes.narrow]: narrow,
                [classes.large]: large,
                [classes.noBottomGutter]: noBottomGutter,
                [classes[validation]]: validation,
                [classes.disabled]: disabled,
                [className]: className,
              })}
            >
              {label && InputComponent.displayName
                ? ['Checkbox', 'Checkboxes', 'Radio', 'Switch'].find(item => InputComponent.displayName.includes(item))
                  ? <span className={classes.label}>{label}</span>
                  : <label className={classes.label} htmlFor={name}>{label}</label>
                : null
              }
              <InputComponent {...inputProps} />
              {addon && <div className={classes.addon}>{addon}</div>}
              {(fieldsDataHelp || help) &&
                <span className={classes.help}>{fieldsDataHelp || help}</span>
              }
            </div>
          </FormControlLogic>
        )
      }}
    </FormConsumer>

  return withStyles(theme => ({
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
        borderStyle: 'solid',
        borderColor: theme.colors.inputBorder,
        borderRadius: theme.sizes.borderRadius,
        borderWidth: theme.sizes.onlyBottomBorder ? 0 : theme.sizes.borderWidth,
        ...theme.sizes.onlyBottomBorder
          ? { borderBottomWidth: theme.sizes.borderWidth }
          : {},
        boxSizing: 'border-box',
        fontSize: theme.typography.inputFontSize,
        transition: 'all 200ms ease-in',
        backgroundColor: theme.colors.inputBg,
        paddingLeft: theme.sizes.inputSidePaddings,
        paddingRight: theme.sizes.inputSidePaddings,
        color: theme.colors.inputText,
        '-webkit-appearance': 'none',
        ...placeholder({
          color: theme.colors.placeholder,
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
        borderColor: theme.colors.accent,
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
      marginBottom: theme.sizes.labelGutterBottom,
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
    noBottomGutter: {
      marginBottom: 0,
    },
  }))(FormControl)
}


withFormControl.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.node,
  className: PropTypes.string,
  addon: PropTypes.node,
  help: PropTypes.string,
  disabled: PropTypes.bool,
  validation: PropTypes.oneOf(['success', 'error']),
  inlineLabel: PropTypes.bool,
  inline: PropTypes.bool,
  narrow: PropTypes.bool,
  large: PropTypes.bool,
  noBottomGutter: PropTypes.bool,
  initialValue: PropTypes.any,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}


export default withFormControl
