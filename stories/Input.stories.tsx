import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { actions } from '@storybook/addon-actions'

import Form, { Input } from '../src'
import { formControlArgs, formControlArgTypes } from './formControlArgs'

Input.displayName = 'Input'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Inputs/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component: 'Basic text input with built-in _debounce_ feature, which prevents too many updates while typing.',
      },
    },
  },
  argTypes: {
    placeholder: {
      description: 'Displayed when value is empty',
    },
    prefix: {
      description: 'Decorates left side of a field with symbol, unit etc. `ReactNode`',
    },
    suffix: {
      description: 'Decorates right side of a field with symbol, unit etc. `ReactNode`',
    },
    narrow: {
      description: 'Decreases input width',
    },
    large: {
      description: 'Increases input height',
    },
    type: {
      description: 'Type of input',
      table: {
        defaultValue: { summary: 'text' },
      },
    },
    min: {
      description: 'Minimal amount of input characters `number`',
    },
    activateEnterPress: {
      description: 'Turns on the submit on enter function, which is declared on a parent `Form` component, via `onEnterPress` prop. See *On Enter Press* example.',
    },
    ...formControlArgTypes,
  },
} as ComponentMeta<typeof Input>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Input> = args =>
  <Form
    fields={[args.name]}
    {...args.debounceTime ? actions('onChange') : {}}
    {...args.activateEnterPress ? actions('onEnterPress') : {}}
  >
    <Input {...args} />
  </Form>

export const BasicUsage = Template.bind({})
BasicUsage.args = {
  name: 'example',
  label: 'Basic input',
  type: 'text',
  placeholder: 'Placeholder text',
  prefix: '✨',
  suffix: '€',
  min: 5,
  narrow: false,
  large: false,
  initialValue: '',
  activateEnterPress: false,
  ...formControlArgs,
}

export const Debounce = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Debounce.args = {
  name: 'debouncedInput',
  label: 'Debounce example',
  debounceTime: 500,
  help: 'Add onChange prop to parent Form component to see how build-in debounce updates the form state with debounce.',
}

export const OnEnterPress = Template.bind({})
OnEnterPress.args = {
  name: 'enterInput',
  label: 'ActivateEnterPress prop example',
  activateEnterPress: true,
  help: 'Type something, press Enter key. See the actions log in a canvas mode.',
}

