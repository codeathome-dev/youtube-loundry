import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { FormFeedback, Input } from 'reactstrap'

export const TextInputR = ({
  name,
  rules = {},
  placeholder,
  type,
  disabled,
  className,
  ...rest
}) => {
  const formHook = useFormContext()
  const {
    control,
    formState: { errors }
  } = formHook

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          return (
            <Input
              {...field}
              type={type}
              className={className}
              disabled={disabled}
              placeholder={placeholder}
              invalid={!!errors[name]?.message}
              {...rest}
            />
          )
        }}
      />
      {errors[name]?.message && <FormFeedback>{errors[name]?.message}</FormFeedback>}
    </>
  )
}
