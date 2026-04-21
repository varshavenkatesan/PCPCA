import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#e2e8f0', display: 'flex', gap: '1rem' }}>
      <Link to="/activities">Activities</Link>
      <Link to="/filter">Filter</Link>
      <Link to="/stats">Stats</Link>
    </nav>
  );
}

export default Navbar;
