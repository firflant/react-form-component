import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import classNames from 'classnames'
import { withFormControl, checkboxHandler, switchTheme } from '../.'


const Switches = ({
  name,
  value,
  required,
  setValue,
  options,
  classes,
}) =>
  <div>
    {options.map((option, index) => {
      const optionLabel = (typeof option === 'string') ? option : option.label
      const optionValue = (typeof option === 'string') ? option : option.value
      const checked = (value && value.includes(optionValue))
      return (
        <label
          className={classNames(classes.label, 'form-checkitem')}
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

Switches.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      label: PropTypes.node,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ])),
}

export default withFormControl(withStyles(switchTheme)(Switches))
