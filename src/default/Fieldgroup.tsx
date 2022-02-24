import React from 'react'
import { createUseStyles } from 'react-jss'
import { withFormControl, DefaultButton, breakpoint } from '../.'
import {
  value as valueT,
  setValue as setValueT,
  anyObject,
  fullTheme,
} from '../typings'


interface FieldgroupProps {
  value: valueT,
  setValue: setValueT,
  name: string,
  required: boolean,
  form: React.ComponentType<{ fields: anyObject }>,
  formProps: React.ComponentProps<any>,
  moreComponent: React.ComponentType<{ onClick: any }>,
  moreLabel: string,
  moreComponentProps: React.ComponentProps<any>,
  deleteIcon: React.ReactNode,
}

const DefaultDeleteIcon =
  <div style={{ fontSize: '2em', transform: 'translateY(-0.14em)' }}>⨯</div>


const Fieldgroup = ({
  value: valueProp,
  setValue: setValueProp,
  name,
  required,
  form: FormComponentProp,
  formProps,
  moreComponent,
  moreLabel = 'Add more',
  moreComponentProps,
  deleteIcon = DefaultDeleteIcon,
}: FieldgroupProps) => {
  const classes = useStyles()
  const MoreComponentProp = moreComponent || DefaultButton
  const [value, setValue] = React.useState<anyObject[]>([{}])
  const [renderItems, setRenderItems] = React.useState(true)

  React.useEffect(() => {
    // Apply initial Value.
    if (valueProp) {
      setValue(valueProp)
    }
  }, [])

  React.useEffect(() => {
    // Bind component state to Form's field state.
    setValueProp(name, value, required)
  }, [value])

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault()
    await setRenderItems(false)
    await setValue((prevState: valueT) =>
      prevState.filter((_item: anyObject, prevIndex: number) => prevIndex !== index),
    )
    setRenderItems(true)
  }

  return (
    <div>
      {renderItems
        ? value.map((fields: anyObject, index: number) =>
          <div className={classes.fieldgroup} key={index}>
            <FormComponentProp
              values={fields}
              onChange={(updatedFields: anyObject) => setValue((prevState: valueT) =>
                prevState.map((item: valueT, subIndex: number) =>
                  index !== subIndex ? item : updatedFields,
                ),
              )}
              {...formProps}
            />
            <button
              className={classes.delete}
              onClick={e => handleDelete(e, index)}
              title='Delete'
            >{deleteIcon}</button>
          </div>
        )
        : null
      }
      <MoreComponentProp
        onClick={() => setValue((prevState: valueT) => ([...prevState, {}]))}
        {...moreComponentProps}
      >{moreLabel}</MoreComponentProp>
    </div>
  )
}

const useStyles = createUseStyles((theme: fullTheme) => ({
  fieldgroup: {
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
    padding: theme.sizes.inputSidePaddings,
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
}))

export default withFormControl(Fieldgroup)
