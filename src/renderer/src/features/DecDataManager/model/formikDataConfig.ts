import { FormikConfig } from 'formik'
import { dataSchema } from './dataScheme'

interface IDataDec {
  secretKey: string
}

const formikDataConfigDec: FormikConfig<IDataDec> = {
  initialValues: {
    secretKey: '',
  },
  validateOnMount: true,
  validationSchema: dataSchema,
  onSubmit: (values) => window.api.sendDataToMainDec(values)
}

export { formikDataConfigDec }
