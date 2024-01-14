import { object, string } from "yup"

const dataSchema = object({
    secretKey: string().required('Gizli şifrə boş ola bilməz'),
    privateMessage: string().required('Məxfi mesajı daxil edin')
  })

export { dataSchema }  