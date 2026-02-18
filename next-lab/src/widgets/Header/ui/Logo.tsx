import {PagesLinkConfig} from "@/shared/config/pages-url.config";
import {metaData} from "@/shared/config/seo.config";
import { IconWolf } from "@/shared/icons";
import Image from "next/image";
import Link from "next/link";
import React from 'react';


export const Logo = () => {
  return (
      <Link href={PagesLinkConfig.HOME}>
        <Image src={IconWolf} alt={"Logo wolf"} width={46}/>
        <p>{metaData.title}</p>
      </Link>
  );
}

export default Logo;
