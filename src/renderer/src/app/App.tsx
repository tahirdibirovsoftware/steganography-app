import { Image, Space } from 'antd'
import style from './App.module.scss'
import { Copyright } from '@renderer/shared/ui/Copy'
import { SHBCNLogo } from '@renderer/shared/ui/Logo'
import glitch from '../../../../resources/animations/glitch.gif'
import { Router } from '@renderer/pages'
import { useNavigate } from 'react-router-dom'
import { store } from './store'
import { useEffect } from 'react'
import { useAppSelector } from './store/hooks'


const App = (): JSX.Element => {

  const navigate = useNavigate()
  const {isProcessing} = useAppSelector(state=>state.app)
  
  useEffect(()=>{
    if(isProcessing === 'processing')navigate('/processor')
    if(isProcessing === 'done')navigate('/result')
  }, [isProcessing])

  return (
    <Space className={style.App}>
      <SHBCNLogo height={50} width={150}/>
      <Image preview={false} src={glitch} style={{width: '500px', height: '5px', borderRadius: '30%'}}/>
      <Router/>
      <Copyright color='grey' text='DBRV Software, Tahir Dibirov II'/>
    </Space>
  )
}

export default App
