import { FormikConfig } from 'formik'
import { dataSchema } from './dataScheme'

interface IData {
  secretKey: string
  privateMessage: string
}

const formikDataConfig: FormikConfig<IData> = {
  initialValues: {
    secretKey: '',
    privateMessage: ''
  },
  validateOnMount: true,
  validationSchema: dataSchema,
  onSubmit: (values) => window.api.sendDataToMainEnc(values)
}

export { formikDataConfig }
