import { FormikConfig } from 'formik'
import { dataSchema } from './dataScheme'
import { store } from '@renderer/app/store'
import { setError, setMessage, setProcessState } from '@renderer/app/store/appSlice'

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
  try{
    store.dispatch(setProcessState('processing')) 
    const message = await window.api.sendDataToMainDec(values) || ''
    store.dispatch(setMessage(message))
  }catch(err){
    store.dispatch(setError(true))
  }finally{
    store.dispatch(setProcessState('done'))
  }
   
}
}

export { formikDataConfigDec }
