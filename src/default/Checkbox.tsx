import React from 'react'
import classNames from 'classnames'
import { createUseStyles } from 'react-jss'
import { withFormControl, calculateInputTranslation } from '../.'
import { type value, type setValue, type fullTheme } from '../typings'

/**
 * A single checkbox that operates on a boolean value.
 */
const Checkbox = ({
  name,
  value,
  text,
  mandatory,
  setValue,
  small,
}: CheckboxProps) => {
  const classes = useCheckboxStyles()
  return (
    <div>
      <label
        className={classNames(classes.label, 'rfc-checkitem', { [classes.small]: small })}
        htmlFor={name}
      >
        <input
          type='checkbox'
          name={name}
          className={classes.input}
          id={name}
          checked={value}
          onChange={e => setValue(name, e.target.checked, mandatory, { touched: true })}
        /> {text}
      </label>
    </div>
  )
}

export interface CheckboxProps {
  name: string,
  value: value,
  text: React.ReactNode,
  mandatory?: boolean,
  setValue: setValue,
  small?: boolean,
}

export const useCheckboxStyles = createUseStyles((theme: fullTheme) => {
  const inputSize = 18

  return {
    label: {
      display: 'flex',
      position: 'relative',
      textAlign: 'left',
      alignItems: 'flex-start',
      cursor: 'pointer',
      minHeight: inputSize,
    },
    input: {
      margin: '0 10px 0 0',
      position: 'relative',
      outline: 'none',
      transform: calculateInputTranslation(theme.typography.inputFontSize, inputSize),
      minWidth: inputSize,
      '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        boxSizing: 'border-box',
        width: inputSize,
        height: inputSize,
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
          width: inputSize - 2,
          height: inputSize - 2,
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
      fontSize: `${theme.typography.inputFontSize - 4}px !important`,
      '& $input': {
        transform: calculateInputTranslation(theme.typography.inputFontSize - 4, inputSize),
      },
    },
  }
})

export default withFormControl(Checkbox)
