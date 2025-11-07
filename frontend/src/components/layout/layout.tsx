// src/components/layout/Layout.tsx
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

// src/components/layout/Layout.tsx - Emergency fix
const Layout = () => {
    return (
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar with fixed width */}
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>
        
        {/* Main Content - Takes ALL remaining space */}
        <div className="flex-1 flex flex-col w-[calc(100vw-16rem)]">
          <main className="flex-1 p-6 w-full">
            <Outlet />
          </main>
        </div>
      </div>
    );
  };

export default Layout;