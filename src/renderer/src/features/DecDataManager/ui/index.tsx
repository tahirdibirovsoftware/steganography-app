import { FileImageOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons'
import { Button, Input, Space, Form } from 'antd'
import style from './decDataManager.module.scss'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { formikDataConfigDec } from '../model'

export const DecDataManager = (): JSX.Element => {
  const navigate = useNavigate()
  const formik = useFormik(formikDataConfigDec)
  const isError: boolean = Boolean(
    formik.errors.secretKey?.length
  )

  return (
    <Space>
      <Form onFinish={formik.handleSubmit} className={style.Manager}>
        <UnlockOutlined style={{ color: 'white', fontSize: '3rem' }} />
        <Input
          onChange={formik.handleChange}
          value={formik.values.secretKey}
          name="secretKey"
          type="password"
          className={style.Input}
          placeholder="Gizli şifrə"
        />
        <Button disabled={isError}
          htmlType="submit"
          className={style.imageSelector}
          style={isError ?{color: 'gray', border: '1px solid gray'}:{}}
          icon={<FileImageOutlined style={{ fontSize: '40px' }} />}
        >
          Şəkli seç
        </Button>
        <Button 
          onClick={() => navigate('/encoder')}
          icon={<LockOutlined />}
          style={{ background: 'red', color: 'white', border: 'unset' }}
        >
          Şifrələ
        </Button>
      </Form>
    </Space>
  )
}
