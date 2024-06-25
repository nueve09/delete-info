import React from 'react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { FloatingLabel, Form } from 'react-bootstrap'
import { SwitchInput, SwitchInputProps, TextInput, TextInputProps } from '@/components/inputs'

type InputPropTypes = {
    text: TextInputProps,
    switch: SwitchInputProps,
}

interface InputFieldProps<TFieldValues extends FieldValues, T extends keyof InputPropTypes> {
    type: T
    controller: UseControllerProps<TFieldValues>
    label: React.ReactNode
    icon?: string
    additionals?: InputPropTypes[T]
}

export const InputField = <TFieldValues extends FieldValues, T extends keyof InputPropTypes>({ type, controller, label, icon = 'fa-circle', additionals }: InputFieldProps<TFieldValues, T>) => {
    const { fieldState } = useController(controller)

    const getInput = (): React.ReactNode => {
        switch (type) {
            case 'text': return (
                <FloatingLabel
                    label={(
                        <>
                            {icon && (<i className={`fa-solid me-2 ${icon}`}></i>)}
                            {label}
                        </>
                    )}
                    className="w-auto"
                >
                    <TextInput
                        controller={controller}
                        {...additionals as TextInputProps}
                    />
                    <Form.Control.Feedback type="valid">Válido</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{fieldState.error?.message}</Form.Control.Feedback>
                </FloatingLabel>
            )

            case 'switch': return (
                <Form.Group>
                    <SwitchInput
                        label={label}
                        controller={controller}
                        {...additionals as SwitchInputProps}
                    />
                </Form.Group>
            )

            default: return null
        }
    }

    return getInput()
}