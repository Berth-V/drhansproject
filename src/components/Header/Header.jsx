import './Header.css';
import logo from '../../assets/medical logo.avif';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <>
      <header className="header">
        <nav className="nav">
          <img className="logo" src={logo} />
          <span className="toggle__btn">X</span>
          {/* ul For Desktop Mode */}
          <ul className="nav__ul">
            <li className="nav__li">
              <NavLink className="nav__link" to="/">
                <span className="nav__span">
                  <b>Home</b>
                </span>
              </NavLink>
            </li>
            <li className="nav__li">
              <NavLink className="nav__link" to="/procedures">
                <span className="nav__span">
                  <b>Procedures</b>
                </span>
              </NavLink>
            </li>
            <li className="nav__li">
              <NavLink className="nav__link" to="/about">
                <span className="nav__span">
                  <b>About</b>
                </span>
              </NavLink>
            </li>
            <button className="nav__appoint__btn">Get your Appointment</button>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
