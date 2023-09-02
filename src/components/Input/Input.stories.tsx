import Input from './Input'
import {Meta, StoryObj} from "@storybook/react"

const meta: Meta<typeof Input> = {
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        disabled: {control: 'boolean'},
        className: {control: 'text'},
        props: {control: 'object'},
    },
}

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {}

export const Disabled: Story = {
    args: {
        disabled: true,
    }
}
