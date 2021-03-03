import headerlogo from '../images/header__logo.svg';

function Header() {
  return (
    <>
      <header className="header">
        <div className="header__block">
          <img className="header__logo" src={headerlogo} alt="логотип" />
        </div>
      </header>
    </>
  )
}

export default Header;