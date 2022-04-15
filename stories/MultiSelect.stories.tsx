import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Form, { MultiSelect as MultiSelectComponent } from '../src'
import { formControlArgs, formControlArgTypes } from './formControlArgs'

MultiSelectComponent.displayName = 'Multi Select'


export default {
  title: 'Components/Inputs/Multi Select',
  component: MultiSelectComponent,
  args: {
    name: 'example',
    label: 'Multi Select',
    options: [
      'Culture',
      'Travel',
      { label: 'Music', value: '54078' },
      { label: 'Nature', value: '74956' },
      { label: 'Tech', value: '24956' },
    ],
    placeholder: '',
    prefix: '',
    suffix: '',
    narrow: false,
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
    placeholder: {
      description: 'Text displayed when value is empty',
    },
    ...formControlArgTypes,
  },
} as ComponentMeta<typeof MultiSelectComponent>

const Template: ComponentStory<typeof MultiSelectComponent> = args =>
  <Form fields={[args.name]}>
    <MultiSelectComponent {...args} />
  </Form>

export const MultiSelect = Template.bind({})
