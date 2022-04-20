import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Form, { MultiImageUpload as MultiImageUploadComponent } from '../src'
import { formControlArgs, formControlArgTypes } from './formControlArgs'

MultiImageUploadComponent.displayName = 'MultiImageUpload'


export default {
  title: 'Components/Inputs/Multi Image Upload',
  component: MultiImageUploadComponent,
  parameters: {
    docs: {
      description: {
        component: 'Allows to upload a whole gallery of images at once.',
      },
    },
  },
  args: {
    name: 'example',
    label: 'Multi image upload',
    columns: '4',
    ...formControlArgs,
  },
  argTypes: {
    columns: {
      description: 'Amount of columns in a grid',
      table: {
        defaultValue: { summary: 4 },
      },
    },
    ...formControlArgTypes,
  },
} as ComponentMeta<typeof MultiImageUploadComponent>

const Template: ComponentStory<typeof MultiImageUploadComponent> = args =>
  <Form fields={[args.name]}>
    <MultiImageUploadComponent {...args} />
  </Form>

export const MultiImageUpload = Template.bind({})
