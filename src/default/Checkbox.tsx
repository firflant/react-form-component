import React from 'react'
import classNames from 'classnames'
import { createUseStyles } from 'react-jss'
import { withFormControl } from '../.'
import { value, setValue, fullTheme } from '../typings'


const Checkbox = ({
  name,
  value,
  text,
  required,
  setValue,
  small,
}: CheckboxProps) => {
  const classes = useCheckboxStyles()
  return (
    <label
      className={classNames(classes.label, 'form-checkitem', { [classes.small]: small })}
      htmlFor={name}
    >
      <input
        type='checkbox'
        name={name}
        className={classes.input}
        id={name}
        checked={value}
        onChange={e => setValue(name, e.target.checked, required)}
      /> {text}
    </label>
  )
}

export interface CheckboxProps {
  name: string,
  value: value,
  text: React.ReactNode,
  required?: boolean,
  setValue: setValue,
  small?: boolean,
}

export const useCheckboxStyles = createUseStyles((theme: fullTheme) => ({
  label: {
    display: 'flex',
    position: 'relative',
    textAlign: 'left',
    alignItems: 'flex-start',
    cursor: 'pointer',
  },
  input: {
    margin: '0 10px 0 0',
    position: 'relative',
    outline: 'none',
    transform: 'translateY(0.2em)',
    minWidth: 18,
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: 14,
      height: 14,
      verticalAlign: 'baseline',
      top: 0,
      left: 0,
      backgroundColor: theme.colors.inputBg !== 'transparent' ? theme.colors.inputBg : 'white',
      cursor: 'pointer',
      border: `2px solid ${theme.colors.inputBorder}`,
      borderRadius: 2,
    },
    '&:checked': {
      '&::before': {
        backgroundColor: theme.colors.accent,
        border: `2px solid ${theme.colors.accent}`,
      },
      '&::after': {
        content: '"✓"',
        display: 'block',
        fontFamily: 'monospace',
        position: 'absolute',
        width: 16,
        height: 16,
        lineHeight: '16px',
        top: 1,
        left: 1,
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
        cursor: 'pointer',
      },
    },
  },
  small: {
    fontSize: theme.typography.inputFontSize - 4,
    lineHeight: '18px',
    '& $input': {
      transform: 'translateY(-2px)',
    },
  },
}))

export default withFormControl(Checkbox)
