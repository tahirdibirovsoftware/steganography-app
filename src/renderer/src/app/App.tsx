import { Button, Image, Space } from 'antd'
import style from './App.module.scss'
import { Copyright } from '@renderer/shared/ui/Copy'
import { SHBCNLogo } from '@renderer/shared/ui/Logo'
import glitch from '../../../../resources/animations/glitch.gif'
import { Router } from '@renderer/pages'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { resetTheState } from './store/appSlice'


const App = (): JSX.Element => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isProcessing } = useAppSelector((state) => state.app)

  useEffect(() => {
    if (isProcessing === 'processing') navigate('/processor')
    if (isProcessing === 'done') navigate('/result')
  }, [isProcessing])

  return (
    <Space className={style.App}>
      <Button
        onClick={() => {
          navigate('/encoder')
          dispatch(resetTheState())
        }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '40%',
          background: 'unset',
          width: '15rem',
          height: '5rem',
          border: 'unset'
        }}
      >
        <SHBCNLogo height={50} width={150} />
      </Button>
      <Image
        preview={false}
        src={glitch}
        style={{ width: '500px', height: '5px', borderRadius: '30%' }}
      />
      <Router />
      <Copyright color="grey" text="DBRV Software, Tahir Dibirov II" />
    </Space>
  )
}

export default App
