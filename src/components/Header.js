import headerlogo from '../images/header__logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <>
      <header className="header">
        <div className="header__block">
          <img className="header__logo" src={headerlogo} alt="логотип" />

          {props.state && (<div className='header__nav'>
            <span className='header__username'>{props.userName}</span>
            <Link className='header__link' to="/" onClick={props.handleLogout}>Выйти</Link>
          </div>)}
          {!props.state && props.registerState && (<Link className='header__link' onClick={props.handleRegisterState} to='/sign-in'>Войти</Link>)}
          {!props.state && !props.registerState && (<Link className='header__link' onClick={props.handleRegisterState} to='/sign-up'>Регистрация</Link>)}
        </div>
      </header>
    </>
  )
}

export default Header;