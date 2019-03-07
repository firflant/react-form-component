export function inputHeight(height) {
  return {
    '& *.form__input': {
      height: height,
      lineHeight: height - height / 3,
      paddingTop: height / 6,
      paddingBottom: height / 6,
      '&[type=file]': {
        lineHeight: height * 0.45,
      },
    },
    '& select.form__input:not([multiple])': {
      backgroundPosition: `calc(100% - 15px) ${height / 2 - 2}px, calc(100% - 10px) ${height / 2 - 2}px`,
      // calc(100% - 15px) $height / 2 - 2px, calc(100% - 10px) $height / 2 - 2px
    },
    '& $addon': {
      height,
      lineHeight: `${height}px`,
    },
  }
}

export function breakpoint(height) {
  return `@media (min-width: ${height})`
}
