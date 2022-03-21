import React from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import Form, { withFormControl, FormButton, breakpoint } from '../.'
import {
  value as valueT,
  setValue as setValueT,
  anyObject,
  fullTheme,
} from '../typings'


const DefaultDeleteIcon =
  <div style={{ fontSize: '2em', transform: 'translateY(-0.14em)' }}>⨯</div>


const Fieldgroup = ({
  value: valueProp,
  setValue: setValueProp,
  name,
  mandatory,
  fields,
  moreComponent,
  moreComponentProps,
  customMoreLabel,
  deleteIcon = DefaultDeleteIcon,
  children: Children,
}: FieldgroupProps) => {
  const classes = useStyles()
  const theme = useTheme() as fullTheme
  const MoreComponent = moreComponent || FormButton
  const moreLabel = customMoreLabel || theme.textLabels.addMore
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
    setValueProp(name, value, mandatory)
  }, [value])

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault()
    // Force rerender to prevent bugs when deleting any item.
    await setRenderItems(false)
    await setValue((prevState: valueT) =>
      prevState.filter((_item: anyObject, prevIndex: number) => prevIndex !== index),
    )
    setRenderItems(true)
  }

  return (
    <div>
      {renderItems
        ? value.map((fieldgroupValues: anyObject, index: number) =>
          <div className={classes.fieldgroup} key={index}>
            <Form
              onChange={(updatedFields: anyObject) => setValue((prevState: valueT) =>
                prevState.map((item: valueT, subIndex: number) =>
                  index !== subIndex ? item : updatedFields,
                ),
              )}
              fields={fields}
              fieldGroup
            >
              <Children values={fieldgroupValues} />
            </Form>
            <button
              className={classes.delete}
              onClick={e => handleDelete(e, index)}
              title='Delete'
            >{deleteIcon}</button>
          </div>
        )
        : null
      }
      <MoreComponent
        onClick={() => setValue((prevState: valueT) => ([...prevState, {}]))}
        {...moreComponentProps}
      >{moreLabel}</MoreComponent>
    </div>
  )
}

interface FieldgroupProps {
  value: valueT,
  setValue: setValueT,
  name: string,
  mandatory: boolean,
  fields: string[],
  formProps: React.ComponentProps<any>,
  moreComponent?: React.ComponentType<{ onClick: any }>,
  moreComponentProps?: React.ComponentProps<any>,
  customMoreLabel?: string,
  deleteIcon: React.ReactNode,
  children: React.ComponentType<{ values: anyObject }>
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
