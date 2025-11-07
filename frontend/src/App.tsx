import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Toaster } from "./components/ui/sonner";
import { SidebarProvider } from "./components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full h-full">
        <SidebarProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" />
        </SidebarProvider>
      </div>
    </QueryClientProvider>
  );
}

export default App;
