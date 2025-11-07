import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Toaster } from "./components/ui/sonner";
import { SidebarProvider } from "./components/ui/sidebar";

function App() {
  return (
    <div className="w-full h-full">
      <SidebarProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </SidebarProvider>
    </div>
  );
}

export default App;
