import { Home, FileText } from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    id: 'unit',
    title: 'Units',
    icon: <FileText size={20} />,
    navLink: '/units'
  }
]
