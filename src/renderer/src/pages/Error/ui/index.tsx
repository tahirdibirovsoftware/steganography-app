import { FailManager } from "@renderer/features/FailManager"


const ErrorPage = (): JSX.Element => {
  return (
    <FailManager message='Xəta baş verdi !'/>
  )
}

export { ErrorPage }
