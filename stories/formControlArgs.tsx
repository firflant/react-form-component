export const formControlArgs = {
  help: 'This is a basic help text',
  noBottomGutter: false,
  inlineLabel: false,
  disabled: false,
  className: '',
}

export const formControlArgTypes = {
  name: {
    description: 'Unique field identifier for a Form',
  },
  label: {
    description: 'Field label',
  },
  help: {
    description: 'Text displayed under a field',
  },
  noBottomGutter: {
    description: 'Disables the bottom margin',
  },
  inlineLabel: {
    description: 'Move label from top to left',
  },
  disabled: {
    description: 'Turns off the interaction with a field',
  },
  className: {
    description: 'Gives input control wrapper a class',
  },
}
