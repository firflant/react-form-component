import React from 'react'
import withStyles from 'react-jss'
import withFormControl from './FormControl'
import { breakpoint } from './themeHelpers'
import theme from './theme'


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
    const { form, moreLabel, classes } = this.props
    const { value } = this.state
    return (
      <div>
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
            <div className={classes.multiFormInput} key={index}>
              {formWithProps}
              <button
                className={classes.delete}
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
      </div>
    )
  }
}

MultiFormInput.defaultProps = {
  moreLabel: 'Add more',
}

export default withFormControl(withStyles({
  multiFormInput: {
    display: 'flex',
    '& + &': {
      marginTop: theme.formItemMargin,
    },
    '& > *:first-child': {
      flexGrow: 1,
    },
  },
  delete: {
    backgroundImage: 'none',
    backgroundColor: theme.formItemBorderColor,
    color: 'white',
    fontSize: theme.formItemFontSize,
    padding: 5,
    marginLeft: 15,
    border: 'none',
    cursor: 'pointer',
    [breakpoint(theme.breakpoints.sm)]: {
      marginLeft: 30,
    },
    '&:hover': {
      backgroundColor: theme.formItemBorderColor,
    },
  },
})(MultiFormInput))
