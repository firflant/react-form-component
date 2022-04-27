import React from 'react'
import { createUseStyles } from 'react-jss'
import classNames from 'classnames'
import { withFormControl, parseOption } from '../.'
import { value, setValue, options, fullTheme } from '../typings'


/**
 * A select dropdown, where user can pick only one option.
 */
const Select = ({
  name,
  value,
  placeholder,
  mandatory,
  setValue,
  options,
}: SelectProps) => {
  const classes = useSelectStyles()

  return (
    <select
      className={classNames(classes.select, 'rfc-input rfc-select')}
      name={name}
      value={value}
      onChange={e =>
        setValue(name, e.target.value, mandatory, { touched: true })
      }
    >
      {(!value || !mandatory) && <option value='' disabled={mandatory}>
        {placeholder || (mandatory ? 'Select' : 'All')}
      </option>}
      {options.map((option, index) => {
        const { optionLabel, optionValue} = parseOption(option)
        return (
          <option key={index} value={optionValue}>{optionLabel}</option>
        )
      })}
    </select>
  )
}

export interface SelectProps {
  name: string,
  value: value,
  placeholder: React.ReactNode,
  mandatory?: boolean,
  setValue: setValue,
  options: options,
}

export const useSelectStyles = createUseStyles((theme: fullTheme) => ({
  select: {
    paddingRight: `35px !important`,
    cursor: 'pointer',
    // Remove default caret
    '-webkit-appearance': 'none',
    '&::-ms-expand': {
      display: 'none',
    },
    // Custom caret
    '&:not([multiple])': {
      backgroundImage: `linear-gradient(45deg,transparent 50%,${theme.colors.inputText} 0),linear-gradient(135deg,${theme.colors.inputText} 50%,transparent 0)`,
      backgroundSize: '5px 5px, 5px 5px',
      backgroundRepeat: 'no-repeat',
    },
    '&[multiple]': {
      height: 'auto',
    },
    '&:-webkit-autofill': {
      backgroundColor: `${theme.colors.inputBg} !important`,
      transition: 'background-color 5000s ease-in-out 0s',
    },
  },
}))

export default withFormControl(Select)
