import React from 'react'
import classNames from 'classnames'
import { lighten } from 'polished'
import { createUseStyles } from 'react-jss'
import {
  breakpoint,
  inputHeight,
  placeholder,
} from '../.'
import { fullTheme, FormControlProps } from '../typings'


const FormControl = ({
  name,
  inlineLabel,
  inline,
  narrow,
  large,
  noBottomGutter,
  validation,
  disabled,
  displayName,
  label,
  help,
  prefix,
  suffix,
  className = '',
  children,
}: FormControlProps) => {
  const classes = useStyles()

  return (
    <div
      className={classNames(classes.formControl, 'rfc-form-control', {
        [classes.inlineLabel]: inlineLabel,
        [classes.inline]: inline,
        [classes.narrow]: narrow,
        [classes.large]: large,
        [classes.noBottomGutter]: noBottomGutter,
        [classes.withPrefix]: prefix,
        [classes.withSuffix]: suffix,
        [classes[validation || '']]: validation,
        [classes.disabled]: disabled,
        [className]: className,
      })}
    >
      {label
        ? displayName && ['Checkbox', 'CheckboxList', 'Radio', 'Switch', 'SwitchList'].find(item => displayName.includes(item))
          ? <span className={classNames(classes.label, 'rfc-label')}>{label}</span>
          : <label className={classNames(classes.label, 'rfc-label')} htmlFor={name}>{label}</label>
        : null
      }
      {children}
      {prefix &&
        <div className={classNames(classes.prefix, 'rfc-prefix')}>{prefix}</div>}
      {suffix &&
        <div className={classNames(classes.suffix, 'rfc-suffix')}>{suffix}</div>}
      {help &&
        <span className={classNames(classes.help, 'rfc-help')}>{help}</span>}
    </div>
  )
}

const useStyles = createUseStyles((theme: fullTheme) => ({
  formControl: {
    margin: 0,
    marginBottom: theme.sizes.inputGutterBottom,
    position: 'relative',
    width: theme.sizes.inputWidth,
    overflow: 'visible',
    boxSizing: 'border-box',
    maxWidth: '100%',
    textAlign: 'left',
    ...inputHeight(theme.sizes.inputHeight, theme.sizes.borderWidth),
    '& .rfc-input': {
      width: '100%',
      height: 'auto',
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
      fontWeight: theme.typography.inputFontWeight,
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
    '& .rfc-input[type=number]': {
      '-moz-appearance': 'textfield',
      appearance: 'textfield',
      '&::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
      },
    },
    '& textarea ~ $addon': {
      top: 0,
      bottom: 'auto',
    },
    '& $label ~ textarea ~ $addon': {
      top: Math.floor(theme.typography.labelFontSize * 1.4 + theme.sizes.labelGutterBottom),
    },
    '& .rfc-checkitem': {
      fontSize: theme.typography.inputFontSize,
      lineHeight: 'normal',
    },

    '& .rfc-input:focus': {
      borderColor: theme.colors.accent,
      boxShadow: theme.colors.inputFocusShadow,
      outlineWidth: 0,
      outline: 'none',
    },
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    '& .rfc-input, & .rfc-checkitem': {
      pointerEvents: 'none',
    },
  },
  success: {
    '&  > $label, & > $prefix, & > $suffix, & $addon, & > $help': {
      color: theme.colors.success,
    },
    '& > .rfc-input, & > .rfc-input:focus': {
      borderColor: theme.colors.success,
    },
  },
  withPrefix: {
    '& .rfc-input': {
      paddingLeft: theme.sizes.inputSidePaddings + theme.sizes.prefixExtraSpacing,
    },
  },
  withSuffix: {
    '& .rfc-input': {
      paddingRight: theme.sizes.inputSidePaddings + theme.sizes.prefixExtraSpacing,
    },
  },
  error: {
    '& > $label, & > $prefix, & > $suffix, & > $help, & > * > .rfc-checkitem': {
      color: theme.colors.error,
    },
    '& > .rfc-input, & > .rfc-input:focus': {
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
    color: theme.colors.label,
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
  prefix: {
    position: 'absolute',
    bottom: 0,
    left: theme.sizes.inputSidePaddings,
  },
  suffix: {
    position: 'absolute',
    bottom: 0,
    right: theme.sizes.inputSidePaddings,
  },

  // Modifiers
  large: {
    ...inputHeight(theme.sizes.inputHeight + theme.sizes.largeInputExtraHeight, theme.sizes.borderWidth),
    '& $label': {
      marginBottom: 2,
    },
  },
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
    '& > $help': {
      [breakpoint(theme.breakpoints.sm)]: {
        left: theme.sizes.inlineLabelWidth + 10,
      },
    },
    '& $label ~ textarea ~ $addon': {
      [breakpoint(theme.breakpoints.sm)]: {
        top: 0,
      },
    },
  },
  inline: {
    width: '100%',
    '& .rfc-checkitem': {
      display: 'inline-flex',
      whiteSpace: 'nowrap',
      marginRight: 20,
      '&:last-of-type': {
        marginLeft: 0,
      },
    },
  },
  narrow: {
    [breakpoint(theme.breakpoints.sm)]: {
      maxWidth: theme.sizes.narrowInputWidth,
    },
  },
  noBottomGutter: {
    marginBottom: 0,
  },
}))

export default FormControl
