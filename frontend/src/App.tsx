import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Signin } from "./pages/Signin"
import { Blog } from "./pages/Blog"
import { Signup } from "./pages/Signup"
import { Blogs } from "./pages/Blogs"
import { RecoilRoot } from "recoil"
import { Publish } from "./pages/Publish"
import AuthProvider from "./components/AuthProvider"
import { Appbar } from "./components/Appbar"





function App() {

  return <div>
    <RecoilRoot >
      <AuthProvider >
        <BrowserRouter>
          <Appbar />
          <Routes>
            <Route path="/" element={<Navigate to="/blogs" />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/publish" element={<Publish />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </RecoilRoot>
  </div>
}

export default App
