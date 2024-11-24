import React from 'react'
import { createUseStyles } from 'react-jss'
import classNames from 'classnames'
import { darken } from 'polished'
import { withFormControl, calculateInputTranslation } from '../.'
import {
  type value,
  type setValue,
  type fullTheme,
} from '../typings'


/**
 * A single switcher that can be a visual alternative for checkbox.
 * Operates on a boolean value.
 */
const Switch = ({
  name,
  value,
  text,
  mandatory,
  setValue,
}: SwitchProps) => {
  const classes = useSwitchStyles()
  return (
    <div>
      <label
        className={classNames(classes.label, 'rfc-checkitem')}
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

export interface SwitchProps {
  name: string,
  value: value,
  text: React.ReactNode,
  mandatory: boolean,
  setValue: setValue,
}

export const useSwitchStyles = createUseStyles((theme: fullTheme) => {
  const inputSize = 20

  return {
    label: {
      display: 'flex',
      position: 'relative',
      textAlign: 'left',
      alignItems: 'flex-start',
      cursor: 'pointer',
      minHeight: inputSize + 4,
    },
    input: {
      position: 'relative',
      minWidth: inputSize * 1.67,
      height: inputSize,
      display: 'inline-block',
      backgroundColor: theme.colors.inputBg,
      margin: '0 10px 0 0',
      padding: 0,
      borderRadius: inputSize / 2,
      '-webkit-appearance': 'none',
      border: `1px solid ${darken(0.2, theme.colors.inputBorder)}`,
      outline: 'none',
      verticalAlign: 'middle',
      transform: calculateInputTranslation(theme.typography.inputFontSize, inputSize),
      cursor: 'pointer',
      transition: 'background-color 100ms ease-in 25ms',
      '&::after': {
        content: '""',
        display: 'block',
        boxSizing: 'border-box',
        width: inputSize,
        height: inputSize,
        position: 'absolute',
        left: -1,
        top: -1,
        backgroundColor: theme.colors.inputBorder,
        border: `1px solid ${darken(0.2, theme.colors.inputBorder)}`,
        borderRadius: '50%',
        transition: 'left 150ms ease-in',
      },
      '&:checked': {
        backgroundColor: theme.colors.success,
        '&::after': {
          left: 'calc(100% - 19px)',
        },
      },
    },
  }
})

export default withFormControl(Switch)
