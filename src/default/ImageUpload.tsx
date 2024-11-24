import React from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import { lighten, darken } from 'polished'
import { withFormControl, maxRows } from '../.'
import { type value, type setValue, type fullTheme } from '../typings'


/**
 * Single image upload. Displays current image as a thumbnail.
 */
const ImageUpload = ({
  name,
  value,
  placeholder,
  mandatory,
  setValue,
}: ImageUploadProps) =>  {
  const classes = useStyles()
  const theme = useTheme() as fullTheme

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
              }, mandatory, { touched: true })
            }
          }}
        />
        <label htmlFor={name}>
          <div className={classes.upload}>
            + {theme.textLabels.upload} {placeholder || 'image'}
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
          onClick={() => setValue(name, '', mandatory, { touched: true })}
        >{theme.textLabels.delete} {placeholder || 'image'}</button>
      </div>
  )
}

export interface ImageUploadProps {
  name: string,
  value: value,
  placeholder: React.ReactNode,
  mandatory: boolean,
  setValue: setValue,
}

const useStyles = createUseStyles((theme: fullTheme) => ({
  root: {
    textAlign: 'center',
    padding: 24,
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
    padding: '32px 24px',
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
    padding: '4px 8px',
    border: 'none',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: lighten(0.02, theme.colors.accent),
    },
  },
  image: {
    display: 'block',
    backgroundColor: 'white',
    padding: 4,
    margin: '0 auto 8px',
    maxWidth: '100%',
    boxSizing: 'border-box',
  },
  filename: {
    maxWidth: '100%',
    textOverflow: 'ellipsis',
    marginBottom: 8,
    fontSize: 11,
    color: theme.colors.inputText,
    lineHeight: 'normal',
    textAlign: 'center',
    ...maxRows(),
  },
}))

export default withFormControl(ImageUpload)
