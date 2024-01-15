import { Button, Form, Input, Space } from 'antd'
import style from './DataManager.module.scss'
import { LockOutlined, UnlockOutlined, UploadOutlined } from '@ant-design/icons'
import TextArea from 'antd/es/input/TextArea'
import { useFormik } from 'formik'
import { formikDataConfigEnc } from '../model'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const EncDataManager = (): JSX.Element => {
  const formik = useFormik(formikDataConfigEnc)
  const isError: boolean = Boolean(
    formik.errors.privateMessage?.length || formik.errors.secretKey?.length
  )


  const navigate = useNavigate()


  return (
    <Space>
      <Form onFinish={formik.handleSubmit} className={style.Manager}>
        <LockOutlined style={{ fontSize: '2.5rem', color: 'white' }} />

        <Input
          onChange={formik.handleChange}
          value={formik.values.secretKey}
          name="secretKey"
          type="password"
          className={style.Input}
          placeholder="Gizli şifrə"
        />
        <TextArea
          onChange={formik.handleChange}
          value={formik.values.privateMessage}
          name="privateMessage"
          rows={6}
          style={{ resize: 'none' }}
          placeholder="Sizin məxfi mesajınız"
          className={style.Input}
        />
        <Button
          disabled={isError}
          htmlType="submit"
          color="primary"
          className={style.Input}
          style={{
            width: '10rem',
            background: !isError ? '#1890ff' : 'unset',
            border: !isError? 'unset' : '1px solid gray',
            color: isError ? 'gray': 'white'
          }}
          icon={<UploadOutlined />}
        >
          Şəkli daxil edin
        </Button>
        <Button
          onClick={() => navigate('/decoder')}
          icon={<UnlockOutlined />}
          style={{ background: 'green', color: 'white', border: 'unset' }}
        >
          Deşifrələmə
        </Button>
      </Form>
    </Space>
  )
}

export { EncDataManager }
