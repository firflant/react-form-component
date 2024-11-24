import React from 'react'
import { createUseStyles } from 'react-jss'
import classNames from 'classnames'
import { withFormControl } from '../.'
import {
  type value,
  type setValue,
} from '../typings'


/**
 * Multiple rows input for entering longer paragraphs of text.
 */
const TextArea = ({
  name,
  value,
  placeholder,
  mandatory,
  setValue,
  rows = 5,
  min,
}: TextAreaProps) => {
  const classes = useStyles()
  return (
    <textarea
      className={classNames(classes.textArea, 'rfc-input')}
      name={name}
      rows={rows}
      placeholder={placeholder}
      onChange={e =>
        setValue(name, e.target.value, mandatory, { touched: true, min })
      }
      value={value}
    />
  )
}

export interface TextAreaProps {
  name: string,
  value: value,
  placeholder: string,
  mandatory: boolean,
  setValue: setValue,
  rows: number,
  min: number,
}

const useStyles = createUseStyles({
  textArea: {
    display: 'block',
    resize: 'vertical',
  },
})

export default withFormControl(TextArea)
