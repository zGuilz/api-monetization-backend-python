import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useGlobalState, setGlobalState, latestPrice } from './store'
import { loadWeb3 } from './shared/ApiMonetization'
import Home from './views/Home'

function App() {
  const [user, setUser] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [alert] = useGlobalState('alert')

  useEffect(() => {
    loadWeb3()
  }, [])

  return (
    <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
    </div>
  )
}

export default App