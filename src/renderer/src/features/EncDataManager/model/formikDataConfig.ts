import { FormikConfig } from 'formik'
import { dataSchema } from './dataScheme'
import { store } from '@renderer/app/store'
import { setFilePath, setProcessState } from '@renderer/app/store/appSlice'

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
  onSubmit: async (values) => {
    store.dispatch(setProcessState('processing'))
    const filePath = await window.api.sendDataToMainEnc(values) || ''
    store.dispatch(setFilePath(filePath))
    store.dispatch(setProcessState('done'))
  }
}

export { formikDataConfigEnc }
