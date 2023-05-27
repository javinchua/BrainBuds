import React from 'react'
import { twMerge } from 'tailwind-merge'

export const CONFIRM_BUTTON_CLASSES = 'h-10 rounded-3xl text-white bg-primary'

export const CANCEL_BUTTON_CLASSES = 'h-10 rounded-3xl text-white bg-neutral-500'

export const DELETE_BUTTON_CLASSES = 'h-10 rounded-3xl text-white bg-pink'

interface IButtonProps {
  className?: string
  children?: React.ReactNode
  type?: 'submit' | 'reset' | 'button'
  onClick?: (any: any) => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  disabled?: boolean
}

export const ButtonComponent: React.FC<IButtonProps> = (props) => {
  return (
    <button
      type={props.type}
      className={twMerge(
        'w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800',
        props.className,
        props.disabled ? 'cursor-not-allowed' : 'hover:bg-slate-700'
      )}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}
