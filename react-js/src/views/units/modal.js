import React, { useEffect, useState } from 'react'
import { Col, Form, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { postData, putData, getData } from '@src/utility/fetch'
import LButton from '@src/@core/components/button'
import { TextInputWithLabelR } from '@src/@core/components/react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { defaultValue, unitSchema } from './dafault'

const ModalUnits = ({ open, toggle, id, retryFetch }) => {
  const [isLoading, setIsLoading] = useState(false)
  const formHook = useForm({
    defaultValues: defaultValue,
    mode: 'all',
    resolver: yupResolver(unitSchema)
  })

  const handleReset = () => {
    formHook.reset(defaultValue)
  }

  const onSubmit = async (data) => {
    setIsLoading(true)
    let res
    if (!id) {
      res = await postData('/v1/cms/units', { ...data })
    } else {
      res = await putData(`/v1/cms/units/${id}`, { ...data })
    }
    if (res.status === 200) {
      setIsLoading(false)
      handleReset()
      toggle()
      retryFetch()
    }
  }

  const getOneUnit = async () => {
    if (id) {
      const res = await getData(`/v1/cms/units/${id}`)
      for (const [key, value] of Object.entries(res.data.data)) {
        formHook.setValue(key, value)
      }
    }
  }

  useEffect(() => {
    getOneUnit()
  }, [id])

  return (
    <Modal centered isOpen={open} toggle={toggle} className='modal-md'>
      <ModalHeader toggle={toggle}>{id ? 'Edit' : 'Add'}</ModalHeader>
      <FormProvider {...formHook}>
        <Form onSubmit={formHook.handleSubmit(onSubmit)}>
          <ModalBody>
            <Row>
              <Col md={12}>
                <TextInputWithLabelR label='Code' name='code' />
              </Col>
              <Col md={12}>
                <TextInputWithLabelR label='Name' name='name' />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <LButton type='submit' loading={isLoading} color='primary'>
              Save
            </LButton>
          </ModalFooter>
        </Form>
      </FormProvider>
    </Modal>
  )
}

export default ModalUnits
