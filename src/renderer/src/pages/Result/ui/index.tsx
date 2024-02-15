import { FailManager } from '@renderer/features/FailManager'
import { SuccessManager } from '@renderer/features/SuccessManager'

export const Result = (): JSX.Element => {
  const success = true

  return <>{success ? <SuccessManager message='Əməliyyət uğurla başa vuruldu!'/> : <FailManager message='Xəta baş verdi!'/>}</>
}
