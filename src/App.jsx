import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Computers from "./pages/Computers";
import Bookings from "./pages/Bookings";
import Packages from "./pages/Packages";
import Members from "./pages/Members";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";

import GlobalStyles from "./styles/GlobalStyle";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="computers" element={<Computers />} />
            <Route path="packages" element={<Packages />} />
            <Route path="users" element={<Users />} />
            <Route path="members" element={<Members />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        constainerStyle={{
          margin: "12px",
        }}
        toastOptions={{
          success: { duration: 2000 },
          error: { duration: 3000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0",
            color: "var(--color-grey-700",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
