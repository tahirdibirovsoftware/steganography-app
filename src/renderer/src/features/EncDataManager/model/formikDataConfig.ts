import { FormikConfig } from 'formik'
import { dataSchema } from './dataScheme'

interface IDataEnc {
  secretKey: string
  privateMessage: string
}

const formikDataConfigEnc: FormikConfig<IDataEnc> = {
  initialValues: {
    secretKey: '',
    privateMessage: ''
  },
  validateOnMount: true,
  validationSchema: dataSchema,
  onSubmit: (values) => window.api.sendDataToMainEnc(values)
}

export { formikDataConfigEnc }
