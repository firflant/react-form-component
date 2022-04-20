import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { actions } from '@storybook/addon-actions'

import Form, { Switch, Switches } from '../src'
import { formControlArgs, formControlArgTypes } from './formControlArgs'

Switch.displayName = 'Switch'
Switches.displayName = 'Switches'


export default {
  title: 'Components/Inputs/Switch',
  parameters: {
    docs: {
      description: {
        component: 'A nice, non-default looking, single switch that operates on a boolean value, or a list of switches, where user can pick multiple options.',
      },
    },
  },
  argTypes: {
    text: {
      description: 'Text near the single switch `ReactNode`',
    },
    options: {
      description: 'Available options of multiple switches `{ label, value }[]` or `string[]`',
    },
    ...formControlArgTypes,
  },
} as ComponentMeta<typeof Switch>

export const Single: ComponentStory<typeof Switch> = args =>
  <Form fields={[args.name]} >
    <Switch {...args} />
  </Form>

Single.component = Switch
Single.args = {
  name: 'switch',
  label: 'Optional input label',
  text: 'Single switch that returns a boolean value',
  initialValue: false,
  ...formControlArgs,
  help: '',
}

export const Multiple: ComponentStory<typeof Switch> = args =>
  <Form fields={[args.name]} {...actions('onChange')}>
    <Switches {...args} />
  </Form>

Multiple.component = Switches
Multiple.args = {
  name: 'switches',
  label: 'Multiple switches:',
  options: [
    'Notify me about new threads',
    { label: 'Notify me about mentions', value: 'mentions' },
    { label: 'Notify me about updates', value: 'updates' },
  ],
  initialValue: [],
  ...formControlArgs,
}