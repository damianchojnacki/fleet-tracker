import {InputHTMLAttributes, FC, ReactNode} from 'react'

export interface InputProps extends Pick<InputHTMLAttributes<HTMLInputElement>, any> {
    disabled?: boolean
}

const Input: FC<InputProps> = ({ disabled = false, className, ...props }) => (
    <input
        disabled={disabled}
        className={`${className} rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
        {...props}
    />
)

export default Input
