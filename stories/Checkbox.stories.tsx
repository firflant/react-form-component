import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { actions } from '@storybook/addon-actions'

import Form, { Checkbox, CheckboxList } from '../src'
import { formControlArgs, formControlArgTypes } from './formControlArgs'

Checkbox.displayName = 'Checkbox'
CheckboxList.displayName = 'CheckboxList'


export default {
  title: 'Components/Inputs/Checkbox',
  parameters: {
    docs: {
      description: {
        component: 'A single checkbox that operates on a boolean value, or a list of checkboxes, where user can pick multiple options.',
      },
    },
  },
  argTypes: {
    text: {
      description: 'Text near the single checkbox `ReactNode`',
    },
    options: {
      description: 'Available options of multiple checkboxes `{ label: string, value: ReactNode }[]` or `string[]`',
    },
    ...formControlArgTypes,
    label: {
      description: 'Input label displayed before it',
    },
  },
} as ComponentMeta<typeof Checkbox>

export const Single: ComponentStory<typeof Checkbox> = args =>
  <Form fields={[args.name]} {...actions('onChange')}>
    <Checkbox {...args} />
  </Form>

Single.args = {
  name: 'singleCheckbox',
  label: 'Optional input label',
  text: 'Single checkbox',
  initialValue: false,
  small: false,
  ...formControlArgs,
  help: '',
}

export const Multiple: ComponentStory<typeof CheckboxList> = args =>
  <Form fields={[args.name]} {...actions('onChange')}>
    <CheckboxList {...args} />
  </Form>

Multiple.args = {
  name: 'checkboxList',
  label: 'Multiple checkboxes:',
  options: [
    'Option one',
    {
      label: 'Option two with a different label and value',
      value: 'Option two',
    },
  ],
  initialValue: [],
  small: false,
  ...formControlArgs,
}