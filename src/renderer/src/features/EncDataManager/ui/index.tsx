import { Button, Form, Input, Space, Upload } from 'antd'
import style from './DataManager.module.scss'
import { LockOutlined, UnlockOutlined, UploadOutlined } from '@ant-design/icons'
import TextArea from 'antd/es/input/TextArea'
import { useFormik } from 'formik'
import { formikDataConfig } from '../model'

const EncDataManager = (): JSX.Element => {
  const formik = useFormik(formikDataConfig)
  const isError:boolean = Boolean(formik.errors.privateMessage?.length || formik.errors.secretKey?.length)

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
        <Upload disabled={isError}>
          <Button
            disabled={isError}
            htmlType="submit"
            color="primary"
            className={style.Input}
            style={{
              width: '10rem',
              background: !isError ? '#1890ff' : '#636363',
              border: 'unset'
            }}
            icon={<UploadOutlined />}
          >
            Şəkli daxil edin
          </Button>
        </Upload>
        <Button
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
