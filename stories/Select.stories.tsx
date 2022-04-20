import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Form, { Select as SelectComponent } from '../src'
import { formControlArgs, formControlArgTypes } from './formControlArgs'

SelectComponent.displayName = 'Select'


export default {
  title: 'Components/Inputs/Select',
  component: SelectComponent,
  parameters: {
    docs: {
      description: {
        component: 'A dropdown, where user can pick only one option.',
      },
    },
  },
  args: {
    name: 'example',
    label: 'Select',
    options: [
      'Sparkling water',
      'Cola',
      { label: 'Lemonade', value: 'lemonade' },
      { label: 'Beer', value: 'beer' },
      { label: 'Kompot', value: 'kompot' },
    ],
    placeholder: '',
    prefix: '',
    suffix: '',
    narrow: false,
    large: false,
    ...formControlArgs,
  },
  argTypes: {
    options: {
      description: 'Available options: `{ label, value }[]` or `string[]`',
    },
    prefix: {
      description: 'Decorates left side of a field with symbol, unit etc. `ReactNode`',
    },
    suffix: {
      description: 'Decorates right side of a field with symbol, unit etc. `ReactNode`',
    },
    narrow: {
      description: 'Decreases input width `bool`',
    },
    large: {
      description: 'Increases input height `bool`',
    },
    ...formControlArgTypes,
  },
} as ComponentMeta<typeof SelectComponent>

const Template: ComponentStory<typeof SelectComponent> = args =>
  <Form fields={[args.name]}>
    <SelectComponent {...args} />
  </Form>

export const Select = Template.bind({})
