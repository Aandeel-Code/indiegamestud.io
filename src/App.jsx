import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import SiteLayout from './components/SiteLayout'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import ANormalQuizGamePage from './pages/ANormalQuizGamePage'
import VoidloopPage from './pages/VoidloopPage'

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="voidloop" element={<VoidloopPage />} />
        <Route path="a-normal-quiz-game" element={<ANormalQuizGamePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="releases" element={<Navigate replace to="/voidloop" />} />
        <Route path="releases/:slug" element={<Navigate replace to="/voidloop" />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>
    </Routes>
  )
}

export default App
