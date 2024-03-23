import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Apps } from "./Apps"
import ArticleForm from "./components/ArticleForm"


const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Apps/>}/>
        <Route path="/article" element={<ArticleForm/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App