import theme from './theme'

export function inputHeight(height: number) {
  return {
    '& *.form-input': {
      height: height,
      lineHeight: `${height - (height / 3)}px`,
      paddingTop: height / 6,
      paddingBottom: height / 6,
      '&[type=file]': {
        lineHeight: `${height * 0.45}px`,
      },
    },
    '& textarea.form-input': {
      minHeight: height,
      height: 'auto',
    },
    '& .form-select:not([multiple])': {
      backgroundPosition: `calc(100% - 15px) ${height / 2 - 2}px, calc(100% - 10px) ${height / 2 - 2}px`,
    },
    '& $addon': {
      height,
      lineHeight: `${height}px`,
    },
    '&$inlineLabel > $label': {
      [breakpoint(theme.breakpoints.sm)]: {
        lineHeight: `${height}px`,
        marginBottom: 0,
      },
    },
    '&$inlineLabel .form-checkitem': {
      marginTop: height / 4,
    },
  }
}

export function breakpoint(width: string) {
  return `@media (min-width: ${width})`
}

export function clearfix() {
  return {
    '&:after': {
      content: '',
      display: 'table',
      clear: 'both',
    },
  }
}

export function overlay() {
  return {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 100,
  }
}

export function maxRows(amount: number) {
  return {
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': amount,
    '-webkit-box-orient': 'vertical',
  }
}

export function placeholder(styles: React.CSSProperties) {
  return {
    '&::-moz-placeholder': {
      ...styles,
    },
    '&:-ms-input-placeholder': {
      ...styles,
    },
    '&::-webkit-input-placeholder': {
      ...styles,
    },
  }
}
