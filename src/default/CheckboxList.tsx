import React from 'react'
import classNames from 'classnames'
import {
  parseOption,
  checkboxHandler,
  useCheckboxStyles,
  withFormControl,
} from '../.'
import { value, setValue, options, option } from '../typings'

/**
 * A list of checkboxes, where user can pick multiple options.
 */
const CheckboxList = ({
  name,
  value,
  mandatory,
  setValue,
  options,
  small,
}: CheckboxListProps) => {
  const classes = useCheckboxStyles()
  return (
    <div>
      {options.map((option: option, index: number) => {
        const { optionLabel, optionValue} = parseOption(option)
        const checked = (value && value.includes(optionValue))
        return (
          <label
            className={classNames(classes.label, 'rfc-checkitem', { [classes.small]: small })}
            htmlFor={`${name}${index}`}
            key={index}
          >
            <input
              type='checkbox'
              name={`${name}${index}`}
              className={classes.input}
              id={`${name}${index}`}
              checked={checked}
              onChange={() => {
                const finalValue = checkboxHandler(!checked, optionValue, value)
                setValue(name, finalValue, mandatory)
              }}
            /> {optionLabel}
          </label>
        )
      })}
    </div>
  )
}

export interface CheckboxListProps {
  name: string,
  value: value,
  mandatory: boolean,
  setValue: setValue,
  options: options,
  small?: boolean,
}

export default withFormControl(CheckboxList)
