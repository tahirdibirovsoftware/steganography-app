import { Navigate, Route, Routes } from "react-router-dom"
import { Encoder } from "./Encoder"
import { Decoder } from "./Decoder"
import { Result } from "./Result"
import { Processor } from "./Processor"


export const Router = ():JSX.Element => {
    return(
        <Routes>
            <Route path="/encoder" element={<Encoder/>}/>
            <Route path="/decoder" element={<Decoder/>}/>
            <Route path="result" element={<Result/>}/>
            <Route path="/processor" element={<Processor/>}/>
            <Route path="*" element={<Navigate replace to="/result" />} />
        </Routes>
    )
}