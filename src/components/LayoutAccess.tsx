import AuthedHeader from "./AuthedHeader"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"


const LayoutAccess = () => {
  return (
    <>
      <AuthedHeader />

      <main>
        <Outlet />
      </main>


      <Footer />
    </>
  )
}

export default LayoutAccess