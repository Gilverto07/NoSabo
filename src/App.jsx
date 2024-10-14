import React from "react"
import Search from "./components/Search"
import Footer from "./components/Footer"
import Home from "./pages/Home"

function App() {
  
  return (
    <>
      <div className="site-wrapper">
        <Search />
        <main>
          <Home /> { /* empty */ }
        </main>
        <Footer />
      </div>
    </>
  )
}


export default App
