import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Form, { GalleryUpload as GalleryUploadComponent } from '../src'
import { formControlArgs, formControlArgTypes } from './formControlArgs'

GalleryUploadComponent.displayName = 'GalleryUpload'


export default {
  title: 'Components/Inputs/Gallery Upload',
  component: GalleryUploadComponent,
  parameters: {
    docs: {
      description: {
        component: 'Allows to upload multiple images at once.',
      },
    },
  },
  args: {
    name: 'example',
    label: 'Gallery upload',
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
} as ComponentMeta<typeof GalleryUploadComponent>

const Template: ComponentStory<typeof GalleryUploadComponent> = args =>
  <Form fields={[args.name]}>
    <GalleryUploadComponent {...args} />
  </Form>

export const GalleryUpload = Template.bind({})
