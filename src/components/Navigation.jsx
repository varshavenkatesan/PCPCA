import { NavLink } from 'react-router-dom'

const Navigation = () => {
  const links = [
    { to: '/activities', label: 'Activities' },
    { to: '/filter', label: 'Filter' },
    { to: '/stats', label: 'Stats' },
  ]

  return (
    <nav>
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} end>
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default Navigation
