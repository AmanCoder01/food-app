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

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
        element: <Restaurant />
      },
      {
        path: "/admin/menu",
        element: <AddMenu />
      },
      {
        path: "/admin/orders",
        element: <Orders />
      },
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
  },
  {
    path: "/reset-password",
    element: <ResetPassword />
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />
  },
])

function App() {

  return (
    <RouterProvider router={appRouter}>

    </RouterProvider>
  )
}

export default App
