import { object, string } from 'yup'

const dataSchema = object({
  secretKey: string().required('Gizli şifrə boş ola bilməz')
})

export { dataSchema }
