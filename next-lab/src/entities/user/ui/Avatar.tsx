import {IconWolf} from "@/shared/ui"
import {DefaultUser} from "@auth/core/types"
import Image from "next/image"
import React from 'react'
import style from './Avatar.module.scss'

export const Avatar = ({image}: DefaultUser) => {
  return (
    image
      ? <Image src={image} alt={"Avatar"} className={style.avatar} width={46} height={46}/>
      : <div className={style.emptyAvatar}>
        <IconWolf width={36} height={36}/>
      </div>
  )
}
