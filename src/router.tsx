import { createBrowserRouter } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import App from './App'

export function lazyWithRetry(componentImport: any) {
  return lazy(async () => {
    const pageHasAlreadyBeenForceRefreshed = JSON.parse(window.localStorage.getItem('page-has-been-force-refreshed') || 'false')
    try {
      const component = await componentImport()
      window.localStorage.setItem('page-has-been-force-refreshed', 'false')
      return component
    } catch (error) {
      const err = error as Error
      if (err.name === 'ChunkLoadError' && !pageHasAlreadyBeenForceRefreshed) {
        window.localStorage.setItem('page-has-been-force-refreshed', 'true')
        return window.location.reload()
      }
      throw error
    }
  })
}

const Home = lazyWithRetry(() => import('./views/home'))
const Order = lazyWithRetry(() => import('./views/order'))
const Submit = lazyWithRetry(() => import('./views/submit'))
const Complete = lazyWithRetry(() => import('./views/complete'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'home',
        element: (
          <Suspense>
            <Home />
          </Suspense>
        )
      },
      {
        path: 'order',
        element: (
          <Suspense>
            <Order />
          </Suspense>
        )
      },
      {
        path: 'submit',
        element: (
          <Suspense>
            <Submit />
          </Suspense>
        )
      },
      {
        path: 'complete',
        element: (
          <Suspense>
            <Complete />
          </Suspense>
        )
      }
    ]
  }
])

export default router
