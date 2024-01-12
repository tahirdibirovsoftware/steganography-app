import { Space } from 'antd'
import { DataManager } from '../features/DataManager'
import style from './App.module.scss'
import { Copyright } from '@renderer/shared/ui/Copy'
import { SHBCNLogo } from '@renderer/shared/ui/Logo'


const App = (): JSX.Element => {
  return (
    <Space className={style.App}>
      <SHBCNLogo height={50} width={150}/>
      <DataManager />
      <Copyright color='grey' text='DBRV Software'/>
    </Space>
  )
}

export default App
