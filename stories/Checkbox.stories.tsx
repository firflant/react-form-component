import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { actions } from '@storybook/addon-actions'

import Form, { Checkbox, Checkboxes } from '../src'
import { formControlArgs, formControlArgTypes } from './formControlArgs'

Checkbox.displayName = 'Checkbox'
Checkboxes.displayName = 'Checkboxes'


export default {
  title: 'Components/Inputs/Checkbox',
  argTypes: {
    text: {
      description: 'Text near the single checkbox',
    },
    options: {
      description: 'Available options of multiple checkboxes `{ label, value }[]` or `string[]`',
    },
    ...formControlArgTypes,
    label: {
      description: 'Input label displayed before it',
    },
  },
} as ComponentMeta<typeof Checkbox>

export const Single: ComponentStory<typeof Checkbox> = args =>
  <Form fields={[args.name]} >
    <Checkbox {...args} />
  </Form>

Single.component = Checkbox
Single.args = {
  name: 'checkboxes',
  label: 'Optional input label',
  text: 'Single checkbox that returns a boolean value',
  initialValue: false,
  ...formControlArgs,
  help: '',
}

export const Multiple: ComponentStory<typeof Checkboxes> = args =>
  <Form fields={[args.name]} {...actions('onChange')}>
    <Checkboxes {...args} />
  </Form>

Multiple.component = Checkboxes
Multiple.args = {
  name: 'checkbox',
  label: 'Multiple checkboxes:',
  options: [
    'Option one',
    {
      label: 'Option two with a different label and value',
      value: 'Option two',
    },
  ],
  initialValue: [],
  ...formControlArgs,
}