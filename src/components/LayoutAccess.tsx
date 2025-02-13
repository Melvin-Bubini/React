import Header from "./Header"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"


const LayoutAccess = () => {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>


      <Footer />
    </>
  )
}

export default LayoutAccess