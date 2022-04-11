import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { actions } from '@storybook/addon-actions'

import Form, { Input } from '../src'
import { formControlArgs, formControlArgTypes}  from './formControlArgs'

Input.displayName = 'Input'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Inputs/Input',
  component: Input,
  argTypes: {
    placeholder: {
      description: 'Displayed when value is empty',
    },
    prefix: {
      description: 'Decorates left side of a field with symbol, unit etc.',
    },
    suffix: {
      description: 'Decorates right side of a field with symbol, unit etc.',
    },
    narrow: {
      description: 'Decreases input width',
    },
    large: {
      description: 'Increases input height',
    },
    initialValue: {
      description: 'Default value of a field',
    },
    type: {
      description: 'Type of input',
    },
    min: {
      description: 'Minimal amount of input characters',
    },
    ...formControlArgTypes,
  },
} as ComponentMeta<typeof Input>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Input> = args =>
  <Form
    fields={[args.name]}
    {...args.debounceTime ? { onChange: fields => actions('onChange', fields) } : {}}
    {...args.activateEnterPress ? { onEnterPress: fields => actions('onEnterPress', fields) } : {}}
  >
    <Input {...args} />
  </Form>

export const BasicUsage = Template.bind({})
BasicUsage.args = {
  name: 'example',
  label: 'Input label',
  type: 'text',
  placeholder: 'Placeholder',
  prefix: '$',
  suffix: '$',
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
  name: 'debounce-example',
  label: 'Debounce example',
  debounceTime: 500,
  help: 'Add onChange prop to parent Form component to see how build-in debounce updates the form state with debounce.',
}

export const OnEnter = Template.bind({})
OnEnter.args = {
  name: 'enter-example',
  label: 'Type something and press Enter key',
  activateEnterPress: true,
  help: 'Set activateEnterPress to true and set onEnterPress prop on a parent Form component to submit whole form when pressing Enter inside an input.',
}

