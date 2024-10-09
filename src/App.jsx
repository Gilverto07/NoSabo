import React, { useState } from "react"
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import GuestHome from "./pages/GuestHome"
import LandingPage from "./pages/LandingPage"

const router = createBrowserRouter(createRoutesFromElements(

  // <Route path="/" element={<Layout />}>
  //   <Route 
  //   index 
  //   element={<Home />} 
  //   loader={dataLoader}/>
  // </Route>
  <>
    <Route index element={<LandingPage/>}/>
    <Route path="/" element={<Layout />}>
      <Route path="guest" element={<GuestHome/>}/>
      <Route path="account" element={<Home/>}/>
    </Route>
  </>
))

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}


export default App
