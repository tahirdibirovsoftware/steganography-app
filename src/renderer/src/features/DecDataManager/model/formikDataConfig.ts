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
  onSubmit: async (values) => { 
   const message = await window.api.sendDataToMainDec(values)
   console.log(message)
}
}

export { formikDataConfigDec }
