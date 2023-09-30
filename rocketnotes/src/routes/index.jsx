import { BrowserRouter } from "react-router-dom"
import { useAuth } from '../hooks/auth'

import { AppRoutes } from "./app.routes"
import { AuthRoutes } from "./auth.routes"
import { ToastContainer, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export function Routes() {
  const { user } = useAuth()

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        transition={Slide}
        theme={"colored"}
        limit={1}
      />
      {user ? <AppRoutes /> : <AuthRoutes />}
    </BrowserRouter>
  )
}


