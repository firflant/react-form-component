import React from 'react'
import classNames from 'classnames'
import {
  parseOption,
  checkboxHandler,
  useCheckboxStyles,
  withFormControl,
} from '../.'
import { value, setValue, options, option } from '../typings'


const Checkboxes = ({
  name,
  value,
  required,
  setValue,
  options,
  small,
}: CheckboxesProps) => {
  const classes = useCheckboxStyles()
  return (
    <div>
      {options.map((option: option, index: number) => {
        const { optionLabel, optionValue} = parseOption(option)
        const checked = (value && value.includes(optionValue))
        return (
          <label
            className={classNames(classes.label, 'form-checkitem', { [classes.small]: small })}
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
                setValue(name, finalValue, required)
              }}
            /> {optionLabel}
          </label>
        )
      })}
    </div>
  )
}

export interface CheckboxesProps {
  name: string,
  value: value,
  required: boolean,
  setValue: setValue,
  options: options,
  small?: boolean,
}

export default withFormControl(Checkboxes)
