import { FailManager } from '@renderer/features/FailManager/ui'
import { SuccessManager } from '@renderer/features/SuccessManager'

export const Result = (): JSX.Element => {
  const success = false

  return <>{success ? <SuccessManager /> : <FailManager message='Xəta baş verdi!'/>}</>
}
