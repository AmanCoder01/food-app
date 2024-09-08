import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainLayout } from './components/layout/MainLayout'
import { Login } from './auth/Login'
import { Signup } from './auth/Signup'
import { ForgotPassword } from './auth/ForgotPassword'
import { ResetPassword } from './auth/ResetPassword'
import { VerifyEmail } from './auth/VerifyEmail'
import { HereSection } from './components/HeroSection'
import { Profile } from './components/Profile'
import { SearchPage } from './components/SearchPage'
import { RestaurantDetail } from './components/RestaurantDetail'
import { Cart } from './components/Cart'
import { OrderSuccessPage } from './components/OrderSuccessPage'
import { Restaurant } from './admin/Restaurant'
import { AddMenu } from './admin/AddMenu'
import { Orders } from './admin/Orders'
import { ProtectedRoutes } from './components/ProtectedRoutes'
import { AuthenticatedUser } from './components/AuthenticatedUser'
import { AdminRoutes } from './components/AdminRoutes'
import { useUserStore } from './store/useUserStore'
import { useEffect } from 'react'
import { Loading } from './components/Loading'
import { useThemeStore } from './store/useThemeStore'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes><MainLayout /></ProtectedRoutes>,
    children: [
      {
        path: "/",
        element: <HereSection />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/search/:text",
        element: <SearchPage />
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantDetail />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/order/status",
        element: <OrderSuccessPage />
      },
      // admin
      {
        path: "/admin/restaurant",
        element: <AdminRoutes><Restaurant /></AdminRoutes>
      },
      {
        path: "/admin/menu",
        element: <AdminRoutes> <AddMenu /></AdminRoutes>
      },
      {
        path: "/admin/orders",
        element: <AdminRoutes> <Orders /></AdminRoutes>
      },
    ]
  },
  {
    path: "/login",
    element: <AuthenticatedUser><Login /></AuthenticatedUser>
  },
  {
    path: "/signup",
    element: <AuthenticatedUser><Signup /></AuthenticatedUser>
  },
  {
    path: "/forgot-password",
    element: <AuthenticatedUser><ForgotPassword /></AuthenticatedUser>
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />
  },
])

function App() {
  const { initializeTheme } = useThemeStore();
  const { checkAuthentication, isCheckingAuth } = useUserStore();

  // checking auth every time when page is loaded
  useEffect(() => {
    checkAuthentication();
    initializeTheme();
  }, [checkAuthentication])

  if (isCheckingAuth) return <Loading />

  return (
    <RouterProvider router={appRouter}>

    </RouterProvider>
  )
}

export default App
