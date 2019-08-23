import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import { lighten, darken } from 'polished'
import { withFormControl, maxRows } from '../.'


const ImageUpload = ({
  name,
  value,
  placeholder,
  required,
  setValue,
  classes,
}) => (
  !value
    ? <div className={classes.root}>
      <input
        accept='image/*'
        className={classes.input}
        id={name}
        type='file'
        onChange={e => {
          const fileReader = new FileReader()
          const { name: fileName, type: fileType } = e.target.files[0]
          const dataFile = e.target.files[0]
          fileReader.readAsDataURL(e.target.files[0])
          fileReader.onload = () => {
            const data = fileReader.result
            setValue(name, {
              name: fileName,
              type: fileType.split('/')[0],
              data,
              dataFile,
            }, required, 'image')
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

ImageUpload.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  placeholder: PropTypes.node,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
}

export default withFormControl(withStyles(theme => ({
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
    color: theme.colors.inputBg,
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
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginBottom: 10,
    fontSize: 11,
    color: theme.colors.inputText,
    lineHeight: 'normal',
    textAlign: 'center',
    ...maxRows(),
  },
}))(ImageUpload))
