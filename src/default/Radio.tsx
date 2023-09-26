import React from 'react'
import classNames from 'classnames'
import { createUseStyles } from 'react-jss'
import { parseOption, withFormControl, calculateInputTranslation } from '../.'
import { value, setValue, options, option, fullTheme } from '../typings'


/**
 * A list of options, where user can pick only one.
 */
const Radio = ({
  name,
  value,
  mandatory,
  small,
  onChange,
  setValue,
  options,
}: RadioProps) => {
  const classes = useStyles()
  return (
    <div>
      {options.map((option: option, index: number) => {
        const { optionLabel, optionValue} = parseOption(option)
        return (
          <label
            className={classNames(classes.label, 'rfc-checkitem', { [classes.small]: small })}
            key={index}
            htmlFor={`${name}${index}`}
          >
            <input
              type='radio'
              name={name}
              value={optionValue}
              className={classes.input}
              id={`${name}${index}`}
              checked={optionValue === value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue(name, e.target.value, mandatory, { touched: true })
                onChange && onChange(e.target.value)
              }}
            /> {optionLabel}
          </label>
        )
      })}
    </div>
  )
}

export interface RadioProps {
  name: string,
  value: value,
  mandatory: boolean,
  small?: boolean,
  onChange: (value: value) => void,
  setValue: setValue,
  options: options,
}

const useStyles = createUseStyles((theme: fullTheme) => {
  const inputSize = 18

  return {
    label: {
      display: 'flex',
      cursor: 'pointer',
      minHeight: inputSize + 2,
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
        borderRadius: '50%',
      },
      '&:checked': {
        '&::before': {
          borderColor: theme.colors.accent,
        },
        '&::after': {
          content: '""',
          display: 'block',
          position: 'absolute',
          width: inputSize - 8,
          height: inputSize - 8,
          top: 4,
          left: 4,
          backgroundColor: theme.colors.accent,
          cursor: 'pointer',
          borderRadius: '50%',
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

export default withFormControl(Radio)
