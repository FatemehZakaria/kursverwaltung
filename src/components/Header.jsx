import { Link } from 'react-router-dom'
import '../styles/Header.css';
import logo from '../assets/logo.png'

const Header = () => {
    return (
        <header>
            <Link to="/"><img src={logo} alt="App logo: a red blurry circle" /></Link>

            <nav>
          <Link to="/">Startseite</Link>
          <Link to="/lehrbetriebe">Lehrbetriebe</Link>
          <Link to="/laender">Länder</Link>
          <Link to="/lernende">Lernende</Link>
          <Link to="/dozenten">Dozenten</Link>
          <Link to="/lehrbetrieb-lernende">Lehrbetrieb-Lernende</Link>
          <Link to="/kurse">Kurse</Link>
          <Link to="/kurse-lernende">Kurse-Lernende</Link>
            </nav>
        </header>
    )
}

export default Header