import React from 'react'
import { createUseStyles } from 'react-jss'
import classNames from 'classnames'
import { withFormControl } from '../.'
import { value, setValue } from '../typings'


const TextArea = ({
  name,
  value,
  placeholder,
  required,
  setValue,
  rows = 5,
  min,
}: TextAreaProps) => {
  const classes = useStyles()
  return (
    <textarea
      className={classNames(classes.textArea, 'form-input')}
      name={name}
      rows={rows}
      placeholder={placeholder}
      onChange={e => setValue(name, e.target.value, required, { min })}
      value={value}
    />
  )
}

export interface TextAreaProps {
  name: string,
  value: value,
  placeholder: string,
  required: boolean,
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
