/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core'
import styled from '@emotion/styled/macro'
import { Dialog as ReachDialog } from '@reach/dialog'
import React from 'react'
import { ImPlus, ImSpinner3 } from 'react-icons/im'
import * as colors from 'styles/colors'
import * as mq from 'styles/media-queries'
import tw from 'twin.macro'

const CircleButton = styled.button({
  borderRadius: '30px',
  padding: '0',
  width: '40px',
  height: '40px',
  lineHeight: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#f1f2f7',
  color: colors.neutral900,
  border: `1px solid #f1f1f4`,
  cursor: 'pointer',
})

const Spinner = styled(ImSpinner3)(tw`text-neutral-900 animate-spin`)
Spinner.defaultProps = {
  'aria-label': 'loading',
}

const buttonVariants = {
  primary: {
    background: colors.primary500,
    color: colors.neutral000,
  },
  secondary: {
    background: colors.neutral000,
    border: `1px solid ${colors.primary500}`,
    color: colors.neutral900,
  },
}

const Button = styled.button(
  {
    padding: '10px 15px',
    border: '0',
    lineHeight: '1',
    borderRadius: '3px',
  },
  ({ variant = 'primary' }) => buttonVariants[variant]
)

const AddButton = styled.button(
  tw`flex w-6 h-6 place-items-center bg-neutral-200 rounded-full
  focus:(outline-none shadow-outline) justify-center`
)

const AddPlus = styled(ImPlus)(tw`text-white`)

const Dialog = styled(ReachDialog)({
  maxWidth: '450px',
  borderRadius: '3px',
  paddingBottom: '3.5em',
  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
  margin: '20vh auto',
  [mq.small]: {
    width: '100%',
    margin: '10vh auto',
  },
})

const FormGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
})

function FullPageSpinner() {
  return (
    <div tw="text-6xl h-screen flex flex-col justify-center items-center">
      <Spinner />
    </div>
  )
}

function TodoInput({ value, onChange }) {
  return (
    <div
      tw="flex items-center justify-between bg-neutral-100 pl-6 pr-2
      rounded-full h-10 align-middle w-full max-w-screen-sm focus:outline-none
      hover:(border-2 border-primary-400)"
    >
      <input
        onChange={onChange}
        value={value}
        tw="bg-transparent h-full w-11/12 focus:outline-none"
      />
      <AddButton type="submit">
        <AddPlus />
      </AddButton>
    </div>
  )
}

const errorMessageVariants = {
  stacked: { display: 'block' },
  inline: { display: 'inline-block' },
}

function ErrorMessage({ errorMessage, variant = 'stacked', ...props }) {
  return (
    <div
      role="alert"
      css={[{ color: colors.red500 }, errorMessageVariants[variant]]}
      {...props}
    >
      <pre
        css={[
          { whiteSpace: 'break-spaces', margin: '0', marginBottom: -5 },
          errorMessageVariants[variant],
        ]}
      >
        {errorMessage}
      </pre>
    </div>
  )
}

export {
  AddButton,
  Button,
  CircleButton,
  Dialog,
  ErrorMessage,
  FormGroup,
  Spinner,
  FullPageSpinner,
  TodoInput,
}
