import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Form from '../src'


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Form',
  component: Form,
} as ComponentMeta<typeof Form>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Form> = args =>
  <Form {...args}>
    This component does not provide any display.
  </Form>

export const Example = Template.bind({})
Example.args = {
  fields: [],
  mandatory: [],
}

