import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { handleLogin } from '@src/redux/authentication'
import { AbilityContext } from '@src/utility/context/Can'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, Form, Input, Label, Button } from 'reactstrap'

import '@styles/react/pages/page-authentication.scss'
import { postData } from '@src/utility/fetch'
import { toast } from 'react-hot-toast'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ability = useContext(AbilityContext)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const onSubmit = async (data) => {
    try {
      const res = await postData(`/v1/cms/auth/sign-in`, data)

      const temp = {
        ability: [
          {
            action: 'manage',
            subject: 'all'
          }
        ],

        username: 'admin',
        accessToken: res.data.data.token
      }

      dispatch(handleLogin(temp))
      ability.update(temp.ability)
      navigate('/')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Bad credentials')
    }
  }

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' sm='12'>
          <Col className='px-xl-2 px-2 py-2 mx-auto shadow position-relative' sm='6'>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Username
                </Label>
                <Controller
                  id='username'
                  name='username'
                  control={control}
                  render={({ field }) => (
                    <Input autoFocus type='text' invalid={errors.username && true} {...field} />
                  )}
                />
              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                </div>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      className='input-group-merge'
                      invalid={errors.password && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <Button type='submit' color='primary' block>
                Signin
              </Button>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
