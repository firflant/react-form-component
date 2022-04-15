import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Form, { Select as SelectComponent } from '../src'
import { formControlArgs, formControlArgTypes } from './formControlArgs'

SelectComponent.displayName = 'Select'


export default {
  title: 'Components/Inputs/Select',
  component: SelectComponent,
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
    type: {
      description: 'Type of input',
    },
    min: {
      description: 'Minimal amount of input characters',
    },
    placeholder: {
      description: 'Text displayed when value is empty',
    },
    ...formControlArgTypes,
  },
} as ComponentMeta<typeof SelectComponent>

const Template: ComponentStory<typeof SelectComponent> = args =>
  <Form fields={[args.name]}>
    <SelectComponent {...args} />
  </Form>

export const Select = Template.bind({})
