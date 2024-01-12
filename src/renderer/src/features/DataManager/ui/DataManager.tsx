import { Input, Space } from 'antd'
import style from './DataManager.module.scss'

const DataManager = (): JSX.Element => {
  return (
    <Space className={style.Manager}>
      <Input placeholder="Secret key" />
    </Space>
  )
}

export { DataManager }
