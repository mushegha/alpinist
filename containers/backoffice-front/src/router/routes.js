import TheDashboard from '~/views/the-dashboard'

const routes = [
  { path: '*', redirect: '/dashboard' },
  {
    path: '/dashboard',
    component: TheDashboard,
    props: true
  }
]

export default routes
