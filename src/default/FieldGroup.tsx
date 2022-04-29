import React from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import Form, { withFormControl, Button, breakpoint } from '../.'
import {
  fieldGroupValue,
  setValue as setValueT,
  anyObject,
  fullTheme,
} from '../typings'


const DefaultDeleteIcon =
  <div style={{ fontSize: '2em', transform: 'translateY(-0.14em)' }}>⨯</div>


const FieldGroup = ({
  value = [{}],
  setValue,
  name,
  mandatory,
  fields,
  moreComponent,
  moreComponentProps,
  customMoreLabel,
  deleteIcon = DefaultDeleteIcon,
  children: Children,
}: FieldGroupProps) => {
  const classes = useStyles()
  const theme = useTheme() as fullTheme
  const MoreComponent = moreComponent || Button
  const moreLabel = customMoreLabel || theme.textLabels.addMore
  const [renderItems, setRenderItems] = React.useState(true)

  const handleChange = (updatedFields: anyObject, hasErrors: boolean, rowIndex: number) => {
    setValue(
      name,
      value.map((item: fieldGroupValue, subIndex: number) =>
        rowIndex !== subIndex ? item : updatedFields,
      ),
      mandatory,
      {
        forceErrorMessage: hasErrors
          ? 'Some rows are not filled correctly.'
          : false,
      },
    )
  }

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>, rowIndex: number) => {
    e.preventDefault()
    // Force rerender to prevent bugs when deleting any item.
    await setRenderItems(false)
    await setValue(
      name,
      value.filter((_item: anyObject, prevIndex: number) => prevIndex !== rowIndex),
      mandatory,
    )
    setRenderItems(true)
  }

  return (
    <div className={classes.root}>
      {renderItems
        ? value.map((fieldgroupValues: anyObject, rowIndex: number) =>
          <div className={classes.row} key={rowIndex}>
            <Form
              onChange={(updatedFields, hasErrors) => handleChange(updatedFields, hasErrors, rowIndex)}
              fields={fields}
              allMandatory
              isFieldGroup
            >
              <Children values={fieldgroupValues} />
            </Form>
            <button
              className={classes.delete}
              onClick={e => handleDelete(e, rowIndex)}
              title='Delete'
            >{deleteIcon}</button>
          </div>,
        )
        : null
      }
      <MoreComponent
        onClick={() => setValue(name, [...value, {}], mandatory)}
        {...moreComponentProps}
      >{moreLabel}</MoreComponent>
    </div>
  )
}

interface FieldGroupProps {
  value: fieldGroupValue,
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
  root: {
    marginBottom: 10,
  },
  row: {
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

export default withFormControl(FieldGroup)
