import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import classNames from 'classnames'
import { withFormControl } from '../.'


const Radio = ({
  name,
  value,
  required,
  small,
  setValue,
  options,
  classes,
}) =>
  <div>
    {options.map((option, index) => {
      const optionLabel = (typeof option === 'string') ? option : option.label
      const optionValue = (typeof option === 'string') ? option : option.value
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
            onChange={e => setValue(name, e.target.value, required)}
          /> {optionLabel}
        </label>
      )
    })}
  </div>

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
  ])),
}

export default withFormControl(withStyles({
  label: {
    display: 'block',
    cursor: 'pointer',
  },
  input: {
    marginRight: 10,
  },
  small: {
    fontSize: 12,
    lineHeight: '18px',
    '& $input': {
      marginRight: 5,
    },
  },
})(Radio))
