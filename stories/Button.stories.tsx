import {Button} from '@/components/ui/button'
import {Meta, StoryObj} from "@storybook/react"

const meta: Meta<typeof Button> = {
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
}

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        children: 'Primary',
    },
}

export const Secondary: Story = {
    args: {
        children: 'Secondary',
        variant: 'secondary',
    },
}

export const Destructive: Story = {
    args: {
        children: 'Destructive',
        variant: 'destructive',
    },
}

export const Outline: Story = {
    args: {
        children: 'Outline',
        variant: 'outline',
    },
}

export const Ghost: Story = {
    args: {
        children: 'Ghost',
        variant: 'ghost',
    },
}

export const WithIcon: Story = {
      args: {
            children: (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>

                    Contact
                </>
            ),
          variant: 'secondary',
      }
}

export const Small: Story = {
    args: {
        children: 'Small',
        size: 'sm',
    },
}

export const Large: Story = {
    args: {
        children: 'Large',
        size: 'lg',
    },
}
