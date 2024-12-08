import Sidebar from "../sidebar/sidebar";

import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Sidebar />
      <div className="ml-[240px] text-[#3E3E3E] bg-[#f4f4f4] min-h-[100vh]">
        {children}
      </div>
    </>
  );
}
