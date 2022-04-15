import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Form, { Slider as SliderComponent } from '../src'
import { formControlArgs, formControlArgTypes } from './formControlArgs'

SliderComponent.displayName = 'Slider'


export default {
  title: 'Components/Inputs/Slider',
  component: SliderComponent,
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
      description: 'Minimal value',
    },
    max: {
      description: 'Maximal value',
    },
    step: {
      description: 'Interval between available values',
    },
    unit: {
      description: 'Display unit',
    },
    ...formControlArgTypes,
  },
} as ComponentMeta<typeof SliderComponent>

const Template: ComponentStory<typeof SliderComponent> = args =>
  <Form fields={[args.name]}>
    <SliderComponent {...args} />
  </Form>

export const Slider = Template.bind({})
