import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { Form, FormControlProps } from 'react-bootstrap'

export interface TextInputProps extends Omit<FormControlProps, 'value' | 'onChange'> {

}

interface Props<TFieldValues extends FieldValues> extends TextInputProps {
    controller: UseControllerProps<TFieldValues>
}

export const TextInput = <TFieldValues extends FieldValues>({ controller, ...props }: Props<TFieldValues>) => {
    const { field, fieldState, formState: { isSubmitted } } = useController(controller)
    const isValid = isSubmitted && !fieldState.error
    const isInvalid = !!fieldState.error

    return (
        <>
            <Form.Control
                {...field}
                placeholder=""
                isValid={isValid}
                isInvalid={isInvalid}
                {...props}
            />
            {props.title && (<small className="text-info" style={{ whiteSpace: 'break-spaces' }}>{props.title}</small>)}
        </>
    )
}