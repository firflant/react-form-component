import classNames from 'classnames'
import { withFormControl, checkboxHandler, useSwitchStyles } from '../.'
import {
  type value,
  type setValue,
  type options,
} from '../typings'


/**
 * A list of switches, where user can pick multiple options.
 */
const SwitchList = ({
  name,
  value = [],
  mandatory,
  setValue,
  options,
}: SwitchListProps) => {
  const classes = useSwitchStyles()
  return (
    <div>
      {options.map((option, index) => {
        const optionLabel = (typeof option === 'string') ? option : option.label
        const optionValue = (typeof option === 'string') ? option : option.value
        const checked = (value && value.includes(optionValue))
        return (
          <label
            className={classNames(classes.label, 'rfc-checkitem')}
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
                setValue(name, finalValue, mandatory, { touched: true })
              }}
            /> {optionLabel}
          </label>
        )
      })}
    </div>
  )
}

export interface SwitchListProps {
  name: string,
  value: value,
  mandatory: boolean,
  setValue: setValue,
  options: options,
}

export default withFormControl(SwitchList)
