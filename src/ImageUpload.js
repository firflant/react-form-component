import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import withFormControl from './FormControl'
import { maxRows } from './themeHelpers'
import theme from './theme'


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
        <div size='sm' variant='primary'>
          Upload {placeholder || 'image'}
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
      <div className={classes.filename}>{ value.name || value.data.split('/').pop() }</div>
      <div
        size='sm'
        variant='primary'
        onClick={() => setValue(name, '', required)}
      >Delete {placeholder || 'image'}</div>
    </div>
)

ImageUpload.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
}

export default withFormControl(withStyles({
  root: {
    textAlign: 'center',
    padding: 20,
    backgroundColor: theme.formItemBorderColor,
    maxWidth: 300,
  },
  input: {
    display: 'none',
  },
  image: {
    display: 'block',
    backgroundColor: 'white',
    padding: 5,
    margin: '0 auto 10px',
    maxWidth: '100%',
  },
  filename: {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginBottom: 10,
    fontSize: 11,
    color: theme.formItemColor,
    lineHeight: 'normal',
    textAlign: 'center',
    ...maxRows(),
  },
})(ImageUpload))
