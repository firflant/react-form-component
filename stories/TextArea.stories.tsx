import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Form, { TextArea as TextAreaComponent } from '../src'
import { formControlArgs, formControlArgTypes } from './formControlArgs'

TextAreaComponent.displayName = 'Text Area'


export default {
  title: 'Components/Inputs/Text Area',
  component: TextAreaComponent,
  args: {
    name: 'example',
    label: 'Select',
    rows: 5,
    placeholder: 'Placeholder text',
    prefix: '',
    suffix: '',
    min: 5,
    narrow: false,
    large: false,
    initialValue: '',
    ...formControlArgs,
  },
  argTypes: {
    rows: {
      description: 'Initial amount of rows',
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

const Template: ComponentStory<typeof TextAreaComponent> = args =>
  <Form fields={[args.name]}>
    <TextAreaComponent {...args} />
  </Form>

export const TextArea = Template.bind({})
