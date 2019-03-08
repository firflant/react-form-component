import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import classNames from 'classnames'
import withFormControl from './FormControl'


const Radio = ({
  name,
  value,
  required,
  setValue,
  options,
  classes,
}) =>
  <div>
    {options.map((option, index) =>
      <label className={classNames(classes.label, 'radio')} key={index} htmlFor={`${name}${index}`}>
        <input
          type='radio'
          name={name}
          value={option.value}
          className={classes.input}
          id={`${name}${index}`}
          checked={option.value === value}
          onChange={e => setValue(name, e.target.value, required)}
        /> {option.label}
      </label>
    )}
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
})(Radio))
