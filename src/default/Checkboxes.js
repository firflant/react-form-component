import { checkboxHandler, checkboxTheme, withFormControl } from '../.'

import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import withStyles from 'react-jss'

const Checkboxes = ({
  name,
  value,
  required,
  setValue,
  options,
  small,
  classes,
}) =>
  <div>
    {options.map((option, index) => {
      const optionLabel = (typeof option === 'string') ? option : option.label
      const optionValue = (typeof option === 'string') ? option : option.value
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
          /> {optionLabel}asdasd
        </label>
      )
    })}
  </div>

Checkboxes.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  required: PropTypes.bool,
  small: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      label: PropTypes.node,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ])),
}

export default withFormControl(withStyles(checkboxTheme)(Checkboxes))
