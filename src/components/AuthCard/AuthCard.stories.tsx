import AuthCard from './AuthCard'
import {Meta, StoryObj} from "@storybook/react"
import ApplicationLogo from "@/components/ApplicationLogo"
import Label from "@/components/Label"
import Input from "@/components/Input/Input"
import InputError from "@/components/InputError"
import Button from "@/components/Button/Button"

const meta: Meta<typeof AuthCard> = {
    component: AuthCard,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        logo: {control: 'text'},
        children: {control: 'text'},
    },
}

export default meta;

type Story = StoryObj<typeof AuthCard>;

export const LoginForm: Story = {
    args: {
        logo: (
            <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
        ),
        children: (
            <form>
                {/* Email Address */}
                <div>
                    <Label htmlFor="email">Email</Label>

                    <Input
                        id="email"
                        type="email"
                        className="block mt-1 w-full"
                        required
                        autoFocus
                        defaultValue="user@example.com"
                    />

                    <Input
                        id="password"
                        type="password"
                        className="block mt-1 w-full"
                        required
                        autoFocus
                        defaultValue="password"
                    />
                    <div className="flex items-center justify-end mt-4">
                        <Button>Log in</Button>
                    </div>
                </div>
            </form>
        )
    },
    render: (args) => (
        <div className="h-screen flex flex-grow">
            <AuthCard {...args}>
                {args.children}
            </AuthCard>
        </div>
    )
}

export const Empty: Story = {
    args: {
        logo: 'Logo',
        children: 'Form'
    },
    render: (args) => (
        <div className="h-screen flex flex-grow">
            <AuthCard {...args}>
                {args.children}
            </AuthCard>
        </div>
    )
}
