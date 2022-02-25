import React from 'react'
import { createUseStyles } from 'react-jss'
import { lighten, darken } from 'polished'
import { withFormControl, maxRows } from '../.'
import { value, setValue, fullTheme } from '../typings'


const ImageUpload = ({
  name,
  value,
  placeholder,
  required,
  setValue,
}: ImageUploadProps) =>  {
  const classes = useStyles()
  return (
    !value
      ? <div className={classes.root}>
        <input
          accept='image/*'
          className={classes.input}
          id={name}
          type='file'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const fileReader = new FileReader()
            const files = e.target.files as FileList
            const { name: fileName, type: fileType } = files[0]
            const dataFile = files[0]
            fileReader.readAsDataURL(files[0])
            fileReader.onload = () => {
              const data = fileReader.result
              setValue(name, {
                name: fileName,
                type: fileType.split('/')[0],
                data,
                dataFile,
              }, required)
            }
          }}
        />
        <label htmlFor={name}>
          <div className={classes.upload}>
            + Upload {placeholder || 'image'}
          </div>
        </label>
      </div>
      : <div className={classes.root}>
        <img
          src={typeof value === 'string' && value.includes('http')
            ? value
            : value.data
          }
          className={classes.image}
          alt='Uploaded file'
        />
        <div className={classes.filename}>{typeof value === 'string'
          ? value
          : value.name || value.data.split('/').pop()
        }</div>
        <button
          className={classes.delete}
          onClick={() => setValue(name, '', required)}
        >Delete {placeholder || 'image'}</button>
      </div>
  )
}

export interface ImageUploadProps {
  name: string,
  value: value,
  placeholder: React.ReactNode,
  required: boolean,
  setValue: setValue,
}

const useStyles = createUseStyles((theme: fullTheme) => ({
  root: {
    textAlign: 'center',
    padding: 20,
    backgroundColor: theme.colors.fill,
    maxWidth: 300,
    borderRadius: theme.sizes.borderRadius,
  },
  input: {
    display: 'none',
  },
  upload: {
    border: `2px dashed ${darken(0.2, theme.colors.inputBorder)}`,
    color: darken(0.3, theme.colors.inputBorder),
    padding: '30px 20px',
    cursor: 'pointer',
    fontSize: theme.typography.labelFontSize,
    lineHeight: 'normal',
    '&:hover': {
      backgroundColor: lighten(0.02, theme.colors.fill),
    },
  },
  delete: {
    backgroundColor: theme.colors.accent,
    color: theme.colors.inputBg !== 'transparent' ? theme.colors.inputBg : 'white',
    fontSize: theme.typography.labelFontSize,
    lineHeight: 'normal',
    padding: '5px 8px',
    border: 'none',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: lighten(0.02, theme.colors.accent),
    },
  },
  image: {
    display: 'block',
    backgroundColor: 'white',
    padding: 5,
    margin: '0 auto 10px',
    maxWidth: '100%',
    boxSizing: 'border-box',
  },
  filename: {
    maxWidth: '100%',
    textOverflow: 'ellipsis',
    marginBottom: 10,
    fontSize: 11,
    color: theme.colors.inputText,
    lineHeight: 'normal',
    textAlign: 'center',
    ...maxRows(),
  },
}))

export default withFormControl(ImageUpload)
