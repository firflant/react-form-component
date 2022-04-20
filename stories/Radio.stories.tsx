import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Form, { Radio as RadioComponent } from '../src'
import { formControlArgs, formControlArgTypes } from './formControlArgs'

RadioComponent.displayName = 'Radio'


export default {
  title: 'Components/Inputs/Radio',
  component: RadioComponent,
  parameters: {
    docs: {
      description: {
        component: 'A list of options, where user can pick only one.',
      },
    },
  },
  args: {
    name: 'example',
    label: 'Radio',
    options: [
      'Sparkling water',
      'Cola',
      { label: 'Lemonade', value: 'lemonade' },
      { label: 'Beer', value: 'beer' },
      { label: 'Kompot', value: 'kompot' },
    ],
    small: false,
    inline: false,
    ...formControlArgs,
  },
  argTypes: {
    options: {
      description: 'Available options `{ label, value }[]` or `string[]`',
    },
    small: {
      description: 'Decrease radio text size `bool`',
    },
    inline: {
      description: 'Displays all options in one row `bool`',
    },
    ...formControlArgTypes,
  },
} as ComponentMeta<typeof RadioComponent>

const Template: ComponentStory<typeof RadioComponent> = args =>
  <Form fields={[args.name]}>
    <RadioComponent {...args} />
  </Form>

export const Radio = Template.bind({})
