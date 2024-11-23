import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Form, { MultiSelect as MultiSelectComponent } from '../src'
import { formControlArgs, formControlArgTypes } from './formControlArgs'

MultiSelectComponent.displayName = 'MultiSelect'


export default {
  title: 'Components/Inputs/Multi Select',
  component: MultiSelectComponent,
  parameters: {
    docs: {
      description: {
        component: 'Multiple select dropdown.',
      },
    },
  },
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
      description: 'Available options `{ label: string, value: ReactNode }[]` or `string[]`',
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
    placeholder: {
      description: 'Text displayed when value is empty `string`',
    },
    ...formControlArgTypes,
  },
} as ComponentMeta<typeof MultiSelectComponent>

const Template: ComponentStory<typeof MultiSelectComponent> = args =>
  <Form fields={[args.name]}>
    <MultiSelectComponent {...args} />
  </Form>

export const MultiSelect = Template.bind({})
