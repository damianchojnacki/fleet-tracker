import Button from './Button'
import {Meta, StoryObj} from "@storybook/react"

const meta: Meta<typeof Button> = {
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        children: {control: 'text'},
        className: {control: 'text'},
        props: {control: 'object'},
    },
}

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        children: 'Click me',
    },
}

export const Secondary: Story = {
    args: {
        children: 'Click me',
        className: '!bg-white hover:!bg-gray-100 !text-black !border-black border-2',
    },
}
