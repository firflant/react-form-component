import React from 'react'
import withStyles from 'react-jss'
import classNames from 'classnames'
import { lighten } from 'polished'
import { withFormControl, breakpoint } from '../.'


const MultiImageUpload = ({
  name,
  value,
  required,
  setValue,
  classes,
}) =>
  <div className={classes.root}>
    {value &&
      value.map((item, index) =>
        <div className={classes.item} key={index}>
          <div className={classes.imageWrapper}>
            <img
              src={item.data || item}
              className={classes.image}
              alt={`Uploaded file ${index}`}
            />
            <div
              className={classes.delete}
              onClick={() => setValue(
                name,
                value.filter((subItem, subIndex) => subIndex !== index),
                required
              )}
            >x</div>
          </div>
        </div>
      )
    }
    <div className={classes.item}>
      <input
        accept='image/*'
        className={classes.input}
        id={name}
        multiple
        type='file'
        onChange={e => {
          let oldValue = value || []
          Object.values(e.target.files).forEach(value => {
            const fileReader = new FileReader()
            const { name: fileName, type: fileType } = value
            const dataFile = value
            fileReader.readAsDataURL(value)
            fileReader.onload = () => {
              const data = fileReader.result
              setValue(
                name,
                [...oldValue, {
                  fileName,
                  type: fileType.split('/')[0],
                  data,
                  dataFile,
                }],
                required
              )
              oldValue = [...oldValue, {
                fileName,
                type: fileType.split('/')[0],
                data,
                dataFile,
              }]
            }
          })
        }}
      />
      <label htmlFor={name} className={classNames(classes.imageWrapper, classes.label)}>
        Add more
      </label>
    </div>
  </div>

export default withFormControl(withStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: -10,
  },
  item: {
    maxWidth: '50%',
    minWidth: '50%',
    padding: 10,
    boxSizing: 'border-box',
    [breakpoint(theme.breakpoints.md)]: {
      maxWidth: '25%',
      minWidth: '25%',
    },
  },
  imageWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.fill,
    padding: 15,
    height: '33vw',
    position: 'relative',
    [breakpoint(theme.breakpoints.md)]: {
      height: '20vw',
    },
    [breakpoint(theme.breakpoints.lg)]: {
      height: '12vw',
      maxHeight: 300,
    },
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  delete: {
    position: 'absolute',
    top: 0,
    right: 0,
    lineHeight: 'normal',
    fontSize: 16,
    padding: 5,
    cursor: 'pointer',
    '&:hover': {
      color: theme.colors.inputBorder,
    },
  },
  input: {
    display: 'none',
  },
  label: {
    display: 'flex',
    flexDrection: 'column',
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colors.inputText,
    '&:hover': {
      backgroundColor: lighten(0.04, theme.colors.fill),
    },
  },
}))(MultiImageUpload))
