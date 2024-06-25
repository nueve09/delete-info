import React, { useMemo } from 'react'
import { v4 as generateUUID } from 'uuid'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { Form, FormCheckProps } from 'react-bootstrap'

export interface SwitchInputProps extends Omit<FormCheckProps, 'value' | 'onChange' | 'label'> {

}

interface Props<TFieldValues extends FieldValues> extends SwitchInputProps {
    controller: UseControllerProps<TFieldValues>
    label: React.ReactNode
}

export const SwitchInput = <TFieldValues extends FieldValues>({ controller, label, ...props }: Props<TFieldValues>) => {
    const { field, fieldState, formState: { isSubmitted } } = useController(controller)
    const id = useMemo(() => generateUUID(), [])
    const isValid = isSubmitted && !fieldState.error
    const isInvalid = !!fieldState.error

    return (
        <>
            <Form.Check
                type="switch"
                id={id}
                label={label}
                {...field}
                isValid={isValid}
                isInvalid={isInvalid}
                feedback={isValid ? 'Válido' : fieldState.error?.message}
                feedbackType={isValid ? 'valid' : 'invalid'}
                {...props}
            />
            {props.title && (<small className="text-info" style={{ whiteSpace: 'break-spaces' }}>{props.title}</small>)}
        </>
    )
}