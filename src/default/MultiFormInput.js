import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import { withFormControl, DefaultButton, breakpoint } from '../.'


class MultiFormInput extends React.Component {
  state = {
    value: this.props.value,
    cachedValue: null,
  }
  componentDidMount() {
    if (!this.props.value || !this.props.value.length) {
      this.setState({ value: [{}] })
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { setValue, name, required } = this.props
    const { value, cachedValue } = this.state

    // Bind component state to Form's field state.
    if (prevState.value !== value) {
      setValue(name, value, required)
    }

    // Apply initial Value.
    if (!prevProps.value && this.props.value) {
      this.setState(prevState => ({
        value: this.props.value,
        cachedValue: this.props.value,
      }))
    }

    // To prevent unwanted behaviors after deleting an item, force rerender by
    // emptying value, then loading it up again.
    if (prevState.value && prevState.value.length > value.length && value.length) {
      this.setState(prevState => ({ value: [], cachedValue: value }))
    }
    if (cachedValue) {
      this.setState(prevState => ({ value: cachedValue, cachedValue: null }))
    }
  }
  render() {
    const {
      form: FormComponentProp,
      formProps,
      moreComponent: MoreComponentProp,
      moreLabel,
      moreComponentProps,
      deleteIcon,
      classes,
    } = this.props
    const { value, cachedValue } = this.state
    return (
      <div>
        {value && value.length && !cachedValue
          ? value.map((fields, index) =>
            <div className={classes.multiFormInput} key={index}>
              <FormComponentProp
                fields={Object.keys(fields).length ? fields : []}
                onChange={updatedFields => this.setState(prevState => ({
                  value: prevState.value.map((item, subIndex) =>
                    index !== subIndex ? item : updatedFields
                  ),
                }))}
                {...formProps}
              />
              <button
                className={classes.delete}
                onClick={() => this.setState(prevState => ({
                  value: prevState.value.filter((item, prevIndex) => prevIndex !== index),
                }))}
                title='Delete'
              >{deleteIcon}</button>
            </div>
          )
          : null
        }
        <MoreComponentProp
          onClick={() => this.setState(prevState => ({
            value: [...prevState.value, {}],
          }))}
          {...moreComponentProps}
        >{moreLabel}</MoreComponentProp>
      </div>
    )
  }
}

MultiFormInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  form: PropTypes.elementType,
  formProps: PropTypes.object,
  moreLabel: PropTypes.string,
  moreComponent: PropTypes.elementType,
  moreComponentProps: PropTypes.object,
  deleteIcon: PropTypes.node,
}

MultiFormInput.defaultProps = {
  moreLabel: 'Add more',
  moreComponent: DefaultButton,
  deleteIcon: 'X',
}

export default withFormControl(withStyles(theme => ({
  multiFormInput: {
    display: 'flex',
    '& + &': {
      marginTop: theme.sizes.inputGutterBottom,
    },
    '& > *:first-child': {
      flexGrow: 1,
    },
  },
  delete: {
    backgroundImage: 'none',
    backgroundColor: theme.colors.inputBorder, // lighen
    color: 'white',
    fontSize: theme.typography.inputFontSize,
    padding: 5,
    marginLeft: 15,
    border: 'none',
    borderTopRightRadius: theme.sizes.borderRadius,
    borderBottomRightRadius: theme.sizes.borderRadius,
    cursor: 'pointer',
    [breakpoint(theme.breakpoints.sm)]: {
      marginLeft: 30,
    },
    '&:hover': {
      backgroundColor: theme.colors.inputBorder,
    },
  },
}))(MultiFormInput))
