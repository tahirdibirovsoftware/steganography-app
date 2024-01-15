import { FailManager } from '@renderer/features/FailManager/ui'

const ErrorPage = (): JSX.Element => {
  return (
    // <Space
    //   style={{
    //     display: 'flex',
    //     flexDirection: 'column',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     gap: '1rem'
    //   }}
    // >
    //   <CloseCircleOutlined style={{ color: 'red', width: '10rem' }} />
    //   <Typography style={{ color: 'red' }}>Xəta baş verdi!</Typography>
    // </Space>
    <FailManager/>
  )
}

export { ErrorPage }
