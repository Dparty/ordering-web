import React from 'react'
import './App.css'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import PageHeader from './components/PageHeder'

function App() {
  let navigate = useNavigate()

  const currentPath = useLocation().pathname

  const notShowHeaderUrls: string[] = ['/', '/home']

  React.useEffect(() => {
    if (currentPath === '/') {
      navigate('/home')
    }
  }, [navigate, currentPath])

  const getPageHeader = () => {
    if (notShowHeaderUrls.indexOf(currentPath) > -1) {
      return null
    }
    return <PageHeader />
  }

  return (
    <div className="App">
      {getPageHeader()}
      <Outlet></Outlet>
    </div>
  )
}

export default App
