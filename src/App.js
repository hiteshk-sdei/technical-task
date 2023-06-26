import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import Success from './views/pages/success/Success'
import Purchase from './views/pages/purchase/Purchase'
import FileList from './views/pages/list/FileList'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route path="*" name="Home" element={<DefaultLayout />} />
            <Route path="/success" name="Success" element={<Success />} />
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
