import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Form, { ImageUpload as ImageUploadComponent } from '../src'
import { formControlArgs, formControlArgTypes } from './formControlArgs'

ImageUploadComponent.displayName = 'ImageUpload'


export default {
  title: 'Components/Inputs/Image Upload',
  component: ImageUploadComponent,
  args: {
    name: 'example',
    label: 'Image upload',
    placeholder: '',
    ...formControlArgs,
  },
  argTypes: {
    placeholder: {
      description: 'Replaces the "image" word on labels',
    },
    ...formControlArgTypes,
  },
} as ComponentMeta<typeof ImageUploadComponent>

const Template: ComponentStory<typeof ImageUploadComponent> = args =>
  <Form fields={[args.name]}>
    <ImageUploadComponent {...args} />
  </Form>

export const ImageUpload = Template.bind({})
