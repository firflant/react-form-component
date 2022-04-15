import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Form, { Fieldgroup as FieldgroupComponent, FormButton, Row } from '../src'
import { formControlArgs, formControlArgTypes } from './formControlArgs'
import { actions } from '@storybook/addon-actions'

FieldgroupComponent.displayName = 'Fieldgroup'


export default {
  title: 'Components/Inputs/Fieldgroup',
  component: FieldgroupComponent,
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
      descripton: 'Names of inputs in a group',
    },
    moreComponent: {
      descripton: 'Replace the default more button',
    },
    moreComponentProps: {
      descripton: 'Props for custom more button component',
    },
    customMoreLabel: {
      descripton: 'Custom label for add more button',
    },
    deleteIcon: {
      descripton: 'Replace the default delete icon',
    },
    ...formControlArgTypes,
  },
} as ComponentMeta<typeof FieldgroupComponent>

const Template: ComponentStory<typeof FieldgroupComponent> = args =>
  <Form fields={[args.name]}>
    <p>Enter emails and names of a people to invite.</p>
    <p>TODO: Fix the widget preview</p>
    {/* <Fieldgroup {...args}>
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
    </Fieldgroup> */}
    <FormButton {...actions('onClick')}>
      Save
    </FormButton>
  </Form>

export const Fieldgroup = Template.bind({})
