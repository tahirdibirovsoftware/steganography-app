import { Space } from 'antd'
import { DataManager } from '../features/DataManager'
import style from './App.module.scss'
import { Copyright, SHBCNLogo } from '@renderer/shared'


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
