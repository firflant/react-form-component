import React from 'react'
import classNames from 'classnames'
import { lighten } from 'polished'
import { createUseStyles } from 'react-jss'
import {
  breakpoint,
  inputHeight,
  placeholder,
} from '../.'
import { validation, fullTheme } from '../typings'


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
  addon,
  className = '',
  children,
}: FormControlProps) => {
  const classes = useStyles()

  return (
    <div
      className={classNames(classes.formControl, 'form-control', {
        [classes.inlineLabel]: inlineLabel,
        [classes.inline]: inline,
        [classes.narrow]: narrow,
        [classes.large]: large,
        [classes.noBottomGutter]: noBottomGutter,
        [classes[validation || '']]: validation,
        [classes.disabled]: disabled,
        [className]: className,
      })}
    >
      {label
        ? displayName && ['Checkbox', 'Checkboxes', 'Radio', 'Switch'].find(item => displayName.includes(item))
          ? <span className={classes.label}>{label}</span>
          : <label className={classes.label} htmlFor={name}>{label}</label>
        : null
      }
      {children}
      {addon && <div className={classes.addon}>{addon}</div>}
      {help && <span className={classes.help}>{help}</span>}
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
    '& .form-input[type=number]': {
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

    // States
    '& .form-input:focus': {
      borderColor: theme.colors.accent,
      boxShadow: theme.colors.inputFocusShadow,
      outlineWidth: 0,
      outline: 'none',
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
  addon: {
    position: 'absolute',
    bottom: 0,
    right: !theme.sizes.moveAddonToLeft ? theme.sizes.addonSpacing : 'auto',
    left: theme.sizes.moveAddonToLeft ? theme.sizes.addonSpacing : 'auto',
  },

  // Modifiers
  large: {
    ...inputHeight(theme.sizes.inputHeight + 4),
    '& $label': {
      marginBottom: 2,
    },
    '& + &': {
      marginTop: -theme.sizes.inputGutterBottom + 14,
    },
    '& $label ~ textarea ~ $addon': {
      top: Math.floor(theme.typography.labelFontSize * 1.4 + 2),
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
    '& $help': {
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
    '& .form-checkitem': {
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

export interface FormControlProps {
  name: string,
  inlineLabel?: boolean,
  inline?: boolean,
  narrow?: boolean,
  large?: boolean,
  noBottomGutter?: boolean,
  validation: validation,
  disabled?: boolean,
  displayName: string,
  label?: React.ReactNode,
  help?: React.ReactNode,
  addon?: React.ReactNode,
  className?: string,
  children: React.ReactNode,
}

export default FormControl
