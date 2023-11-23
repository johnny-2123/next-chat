import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);
  return <div className="dashboard-layout">{children}</div>;
};

export default Layout;
