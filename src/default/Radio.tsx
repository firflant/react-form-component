import React from 'react'
import classNames from 'classnames'
import { createUseStyles } from 'react-jss'
import { parseOption, withFormControl } from '../.'
import { value, setValue, options, option } from '../typings'


const Radio = ({
  name,
  value,
  mandatory,
  small,
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
            className={classNames(classes.label, 'form-checkitem', { [classes.small]: small })}
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(name, e.target.value, mandatory)}
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
  setValue: setValue,
  options: options,
}

const useStyles = createUseStyles({
  label: {
    display: 'flex',
    cursor: 'pointer',
  },
  input: {
    marginRight: 10,
    transform: 'translateY(0.3em)',
  },
  small: {
    fontSize: 12,
    lineHeight: '18px',
    '& $input': {
      marginRight: 5,
    },
  },
})

export default withFormControl(Radio)
