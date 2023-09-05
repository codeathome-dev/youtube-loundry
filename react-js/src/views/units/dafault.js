import * as yup from 'yup'
export const unitSchema = yup.object().shape({
  name: yup.string().required(),
  code: yup.string().required()
})

export const defaultValue = {
  name: '',
  code: ''
}

export const defaultFilter = { keyword: '', page: 1, size: 10 }
