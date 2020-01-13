import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import classNames from 'classnames'
import { withFormControl } from '../.'


const TextArea = ({
  name,
  value,
  placeholder,
  required,
  setValue,
  rows,
  min,
  classes,
}) =>
  <textarea
    className={classNames(classes.textArea, 'form-input')}
    name={name}
    rows={rows}
    placeholder={placeholder}
    onChange={e => setValue(name, e.target.value, required, { min })}
    value={value}
  />

TextArea.defaultProps = {
  rows: 5,
}

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.node,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  rows: PropTypes.number,
  min: PropTypes.number,
}

export default withFormControl(withStyles({
  textArea: {
    display: 'block',
    resize: 'vertical',
  },
})(TextArea))
