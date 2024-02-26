import { Navigate, Route, Routes } from 'react-router-dom'
import { Encoder } from './Encoder'
import { Decoder } from './Decoder'
import { Result } from './Result'
import { Processor } from './Processor'
import { ErrorPage } from './Error'
import { Login } from './Login'
import { Register } from './Register'

export const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/encoder' element={<Encoder />} />
      <Route path='/decoder' element={<Decoder />} />
      <Route path='/result' element={<Result />} />
      <Route path='/processor' element={<Processor />} />
      <Route path='/error' element={<ErrorPage />} />
      <Route path="*" element={<Navigate replace to="/encoder" />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>}/>
    </Routes>
  )
}
