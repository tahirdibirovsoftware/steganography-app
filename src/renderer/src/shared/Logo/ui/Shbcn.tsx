import { Image } from "antd"
import logo from '../../../../../../resources/brand/shbcn.jpg'
import { FC } from "react"
import { ILogo } from "@renderer/shared/types/logo.types"


const SHBCNLogo:FC<ILogo> = ({width, height}):JSX.Element => {
    return(
        <Image width={width} height={height} preview={false} src={logo}></Image>
    )
}

export { SHBCNLogo }