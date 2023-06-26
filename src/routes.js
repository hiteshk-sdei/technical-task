import React from 'react'

const Purchase = React.lazy(() => import('./views/pages/purchase/Purchase'))
const List = React.lazy(() => import('./views/pages/list/FileList'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/purchase', name: 'Purchase Page', element: Purchase },
  { path: '/list', name: 'List Page', element: List },
]

export default routes
