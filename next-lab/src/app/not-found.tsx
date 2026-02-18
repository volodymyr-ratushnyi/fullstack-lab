import {PagesLinkConfig} from "@/shared/config/pages-url.config";
import Link from "next/link";

const NotFoundPage = () => {
    return (
      <Link href={PagesLinkConfig.HOME}>Go Home</Link>
    )
};

export default NotFoundPage;
