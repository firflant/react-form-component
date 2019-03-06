import React from 'react'
import withFormControl from './FormControl'


class MultiFormInput extends React.Component {
  state = {
    value: this.props.value,
    cachedValue: null,
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.value !== this.state.value) {
      this.props.setValue(this.props.name, this.state.value, this.props.required)
    }
    // To prevent strange behaviors after deleting an item, force rerender of
    // everything by setting value to null, then loading it up again.
    if (snapshot !== null) {
      this.setState({ value: [], cachedValue: snapshot })
    }
    if (!this.state.value.length && this.state.cachedValue) {
      console.log('this.state.cachedValue: ', this.state.cachedValue)

      this.setState({ value: this.state.cachedValue })
    }
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.value.length > this.state.value.length && this.state.value.length) {
      return this.state.value
    }
    return null
  }
  render() {
    const { form, moreLabel } = this.props
    const { value } = this.state
    return (
      <React.Fragment>
        {value && value.map((fields, index) => {
          const checkedFields = Object.keys(fields).length ? { fields } : {}
          const formWithProps = {
            ...form,
            props: {
              ...checkedFields,
              onChange: updatedFields => {
                // Prevent splice directly on value, because it should stay immutable.
                let mutableValue = [...value]
                mutableValue.splice(index, 1, updatedFields)
                this.setState({ value: mutableValue })
              },
            },
          }
          return (
            <div className='form__multi-form-input' key={index}>
              {formWithProps}
              <button
                className='form__multi-form-delete'
                onClick={() => {
                  this.setState({ value: value.filter((item, newIndex) => newIndex !== index) })
                }}
                title='Delete'
              >X</button>
            </div>
          )
        })}
        <button
          variant='link'
          onClick={() => this.setState({ value: [...value, {}] })}
        >{moreLabel}</button>
      </React.Fragment>
    )
  }
}

MultiFormInput.defaultProps = {
  moreLabel: 'Add more',
}

export default withFormControl(MultiFormInput)
