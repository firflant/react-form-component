import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Form, { Slider as SliderComponent } from '../src'
import { formControlArgs, formControlArgTypes } from './formControlArgs'

SliderComponent.displayName = 'Slider'


export default {
  title: 'Components/Inputs/Slider',
  component: SliderComponent,
  parameters: {
    docs: {
      description: {
        component: 'A range input, where user chooses a value by moving a dot on a trail.',
      },
    },
  },
  args: {
    name: 'example',
    label: 'Range',
    min: 0,
    max: 500,
    unit: 'km',
    ...formControlArgs,
  },
  argTypes: {
    min: {
      description: 'Minimal value `number`',
    },
    max: {
      description: 'Maximal value `number`',
    },
    step: {
      description: 'Interval between available values `number`',
    },
    unit: {
      description: 'Display unit `string`',
    },
    ...formControlArgTypes,
  },
} as ComponentMeta<typeof SliderComponent>

const Template: ComponentStory<typeof SliderComponent> = args =>
  <Form fields={[args.name]}>
    <SliderComponent {...args} />
  </Form>

export const Slider = Template.bind({})
