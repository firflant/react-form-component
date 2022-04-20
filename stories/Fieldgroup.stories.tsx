import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Form, {
  Fieldgroup as FieldgroupComponent,
  FormButton,
  Row,
  Input,
} from '../src'
import { formControlArgs, formControlArgTypes } from './formControlArgs'
import { actions } from '@storybook/addon-actions'

FieldgroupComponent.displayName = 'Fieldgroup'


export default {
  title: 'Components/Inputs/Fieldgroup',
  component: FieldgroupComponent,
  parameters: {
    docs: {
      description: {
        component: 'Allows to build a nested form structure. The composition of fields, where every row has the same structure.',
      },
    },
  },
  args: {
    name: 'people',
    label: 'Fieldgroup',
    fields: ['name', 'email'],
    // moreComponent: undefined,
    // moreComponentProps: undefined,
    customMoreLabel: 'Add next person',
    // deleteIcon: undefined,
    ...formControlArgs,
    initialValue: undefined,
  },
  argTypes: {
    fields: {
      description: 'Names of fields in a group `string[]`',
    },
    moreComponent: {
      description: 'Replace the default _Add more_ button component',
    },
    moreComponentProps: {
      description: 'Props for custom _Add more_ button component',
    },
    customMoreLabel: {
      description: 'Custom label for _Add more_ button',
      table: {
        defaultValue: { summary: 'Comes from theme' },
      },
    },
    deleteIcon: {
      description: 'Replace the default delete icon',
    },
    ...formControlArgTypes,
  },
} as ComponentMeta<typeof FieldgroupComponent>

const Template: ComponentStory<typeof FieldgroupComponent> = args =>
  <Form fields={[args.name]}>
    <FieldgroupComponent {...args}>
      {({ values }) => (
        <Row>
          <Input name='name' label='Name' initialValue={values.name} />
          <Input
            name='email'
            type='email'
            label='E-mail'
            initialValue={values.email}
          />
        </Row>
      )}
    </FieldgroupComponent>
    <FormButton {...actions('onClick')}>
      Save
    </FormButton>
  </Form>

export const Fieldgroup = Template.bind({})
