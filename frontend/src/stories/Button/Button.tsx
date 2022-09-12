import React, { CSSProperties } from 'react'
import buttonStoriesStyles from './button.styles'
import './button.styles.ts'

interface ButtonProps {
  primary?: boolean
  size?: 'small' | 'medium' | 'large'
  label: string
  type?: 'button' | 'submit' | 'reset' | undefined
  onClick?: () => void
  style?: CSSProperties
}

const Button = ({
  primary = false,
  size = 'medium',
  label,
  type = 'button',
  style,
  ...props
}: ButtonProps): any => {
  const mode = primary
    ? buttonStoriesStyles.storybookButtonPrimary
    : buttonStoriesStyles.storybookButtonSecondary

  return (
    <button
      type={ type }
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      style={{
        ...buttonStoriesStyles.storybookButton,
        ...buttonStoriesStyles[size],
        ...mode,
        ...style
      } as CSSProperties}
      {...props}
    >
      {label}
    </button>
  )
}

export default Button
