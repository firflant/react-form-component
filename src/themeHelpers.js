import theme from './theme'

export function inputHeight(height) {
  return {
    '& *.form-input': {
      height: height,
      lineHeight: `${height - height / 3}px`,
      paddingTop: height / 6,
      paddingBottom: height / 6,
      '&[type=file]': {
        lineHeight: `${height * 0.45}px`,
      },
    },
    '& .form-select:not([multiple])': {
      backgroundPosition: `calc(100% - 15px) ${height / 2 - 2}px, calc(100% - 10px) ${height / 2 - 2}px`,
    },
    '& $addon': {
      height,
      lineHeight: `${height}px`,
    },
    '&$inlineLabel $label': {
      [breakpoint(theme.breakpoints.sm)]: {
        lineHeight: `${height}px`,
      },
    },
    '&$inlineLabel .form-checkitem': {
      marginTop: height / 4,
    },
  }
}

export function breakpoint(height) {
  return `@media (min-width: ${height})`
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

export function maxRows(amount) {
  return {
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': amount,
    '-webkit-box-orient': 'vertical',
  }
}
