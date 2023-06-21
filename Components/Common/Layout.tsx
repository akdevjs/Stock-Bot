import { ReactNode } from "react";
import Head from "next/head";
import SideMenu from "./SideMenu";

type TCommonLayoutProps = {
  children?: ReactNode;
  title?: string;
  description?: string;
};

const Layout = ({
  children,
  title = "This is the default title",
  description = "I am a default Description",
}: TCommonLayoutProps) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" type="image/x-icon" href="/remex.png"></link>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Head>
    <div className="flex">
      <div className="w-[18%]">
        <SideMenu />
      </div>
      <div className="w-[80%]">{children}</div>
    </div>
  </>
);

export default Layout;
