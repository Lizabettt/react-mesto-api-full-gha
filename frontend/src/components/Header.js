import logo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ onExit, email }) {
  const location = useLocation();

  return (
    <header className='header'>
      <Link className='header__logo' to='/signin'>
        <img className='header__logo-pic' src={logo} alt='Логотип' />
      </Link>
      <div className='header__box'>
        {location.pathname === '/signin' && (
          <Link className='header__link' to='/signup'>
            Регистрация
          </Link>
        )}
        {location.pathname === '/signup' && (
          <Link className='header__link' to='/signin'>
            Войти
          </Link>
        )}

        {location.pathname === '/' && (
          <>
            <p className='header__email'>{email}</p>
            <Link
              className='header__link'
              to='/signin'
              onClick={() => onExit()}
            >
              Выйти
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
