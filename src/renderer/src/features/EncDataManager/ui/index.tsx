import { Button, Input, Space, Upload } from 'antd'
import style from './DataManager.module.scss'
import { LockOutlined, UploadOutlined } from '@ant-design/icons'
import TextArea from 'antd/es/input/TextArea'

const EncDataManager = (): JSX.Element => {
  return (
    <Space className={style.Manager}>
      <LockOutlined style={{fontSize: '2.5rem', color: 'white'}} />
      <Input type='password' className={style.Input} placeholder="Gizli şifrə" />
      <TextArea rows={6} style={{resize: 'none'}} placeholder='Sizin məxfi mesajınız' className={style.Input}/>
      <Upload>
        <Button color='primary' className={style.Input} style={{ width: '10rem', background: '#1890ff', border: 'unset'}} icon={<UploadOutlined/>}>Şəkli daxil edin</Button>
      </Upload>
      <Button style={{background: 'red', color: 'white', border: 'unset'}}>Deşifrələmə</Button>
    </Space>
  )
}

export { EncDataManager }
