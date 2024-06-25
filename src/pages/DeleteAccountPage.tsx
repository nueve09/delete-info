import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { InputField } from '@/components'
import { useState } from 'react'

interface AccountForm {
    email: string
    phoneNumber: string
    privacyPolicy: boolean
}

const accountFormSchema: yup.ObjectSchema<AccountForm> = yup.object({
    email: yup.string().required('El correo electrónico es requerido').email('Ingresa un correo electrónico válido'),
    phoneNumber: yup.string().required('El teléfono es requerido').matches(/^(?:\+\d{1,3})?(\d{10})$/, 'Ingresa un teléfono válido'),
    privacyPolicy: yup.boolean().required().oneOf([true], 'Debes aceptar el aviso de privacidad y los términos y condiciones'),
})

const defaultValues: AccountForm = {
    email: '',
    phoneNumber: '',
    privacyPolicy: false,
}

export const DeleteAccountPage = () => {
    const { control, handleSubmit, reset } = useForm<AccountForm>({ defaultValues, resolver: yupResolver(accountFormSchema) })
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit: SubmitHandler<AccountForm> = async (data) => {
        const { value } = await Swal.fire({
            title: '¿Solicitar baja?',
            html: `<p class="text-muted">Te recordamos que si decides continuar con el proceso de baja no podrás acceder a la aplicación y deberas registrarte nuevamente</p>`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Entendido, Enviar',
            confirmButtonColor: 'var(--bs-danger)',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: 'var(--bs-gray)',
            reverseButtons: true,
        })

        if (!value) return

        console.log(data)

        setIsLoading(true)

        setTimeout(() => {
            Swal.fire({
                title: 'Enviada',
                html: `<p class="text-muted">Tu solicitud de baja Nueve09 ha sido enviada, en breve un asesor se pondrá en contacto contigo</p>`,
                icon: 'success',
                confirmButtonText: 'Entendido',
                confirmButtonColor: 'var(--bs-success)',
            })

            reset({
                email: '',
                phoneNumber: '',
                privacyPolicy: false,
            })
            setIsLoading(false)
        }, 2000)
    }

    return (
        <Container fluid="xxl">
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <Card className="w-100" style={{ maxWidth: '25rem' }}>
                    <Card.Body>
                        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col md="12" className="mb-3">
                                    <InputField<AccountForm, 'text'>
                                        type="text"
                                        controller={{ control, name: 'email' }}
                                        label="Correo electrónico"
                                        icon="fa-user"
                                        additionals={{
                                            type: 'email',
                                        }}
                                    />
                                </Col>
                                <Col md="12" className="mb-3">
                                    <InputField<AccountForm, 'text'>
                                        type="text"
                                        controller={{ control, name: 'phoneNumber' }}
                                        label="Teléfono"
                                        icon="fa-phone"
                                    />
                                </Col>
                                <Col md="12" className="mb-3">
                                    <InputField<AccountForm, 'switch'>
                                        type="switch"
                                        controller={{ control, name: 'privacyPolicy' }}
                                        label={(
                                            <span>
                                                <span className="me-1">Acepto el</span>
                                                <a href="https://nueve09.mx/aviso-de-privacidad.html" target="_blank" className="text-info">Aviso de Privacidad</a>
                                                <span className="mx-1">y los</span>
                                                <a href="https://nueve09.mx/terminos-y-condiciones.html" target="_blank" className="text-info">Términos y Condiciones</a>
                                            </span>
                                        )}
                                        icon="fa-user"
                                    />
                                </Col>
                                <Col md="12" className="d-grid">
                                    <Button type="submit" disabled={isLoading}>
                                        {
                                            isLoading ? (
                                                <>
                                                    <i className="fa-solid fa-spin fa-spinner me-2 fa-lg"></i>
                                                    Enviando...
                                                </>
                                            ) : (
                                                <>
                                                    Solicitar baja
                                                    <i className="fa-solid fa-person-through-window ms-2 fa-lg"></i>
                                                </>
                                            )
                                        }
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    )
}