import React from 'react'
import { value, setValue } from '../typings'


class FormControlLogic extends React.Component {
  componentDidUpdate(prevProps: FormControlLogicProps) {
    // If default field value has changed, change the current value.
    const { name, initialValue, required, setValue } = this.props as FormControlLogicProps
    if (((initialValue || initialValue === '') && initialValue !== prevProps.initialValue) ||
    (prevProps.initialValue && !initialValue)) {
      setValue(name, initialValue, required)
    }
  }

  componentDidMount() {
    // Appply default field value.
    const { name, initialValue, required, setValue } = this.props as FormControlLogicProps
    if (initialValue) {
      setValue(name, initialValue, required)
    }
  }

  render() {
    return this.props.children
  }
}

export interface FormControlLogicProps {
  name: string,
  initialValue: value,
  required?: boolean,
  setValue: setValue,
  children: React.ReactNode,
}

export default FormControlLogic
