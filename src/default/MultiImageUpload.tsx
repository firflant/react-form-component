import React from 'react'
import { createUseStyles } from 'react-jss'
import classNames from 'classnames'
import { lighten } from 'polished'
import { withFormControl, breakpoint } from '../.'
import { value, setValue, fullTheme } from '../typings'


const MultiImageUpload = ({
  name,
  value,
  required,
  setValue,
  columns = 4,
}: MultiImageUploadProps) => {
  const classes = useStyles({ columns })
  return (
    <div className={classes.root}>
      {value &&
        value.map((item: string | { data: string }, index: number) =>
          <div className={classes.item} key={index}>
            <div className={classes.imageWrapper}>
              <img
                src={typeof item === 'object' ? item.data : item}
                className={classes.image}
                alt={`Uploaded file ${index}`}
              />
              <div
                className={classes.delete}
                onClick={() => setValue(
                  name,
                  value.filter((_subItem: string, subIndex: number) => subIndex !== index),
                  required,
                )}
              >⨯</div>
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            let oldValue = value || []
            const files = e.target.files as FileList
            Object.values(files).forEach(value => {
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
                  required,
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
  )
}

export interface MultiImageUploadProps {
  name: string
  value: value,
  required: boolean,
  setValue: setValue,
  columns?: number,
}

interface styleProps {
  columns: number
}

const useStyles = createUseStyles((theme: fullTheme) => ({
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
      maxWidth: ({ columns }: styleProps) => `${100 / columns}%`,
      minWidth: ({ columns }: styleProps) => `${100 / columns}%`,
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
    top: '-0.5em',
    right: 0,
    lineHeight: '30px',
    fontSize: 30,
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
}))

export default withFormControl(MultiImageUpload)
