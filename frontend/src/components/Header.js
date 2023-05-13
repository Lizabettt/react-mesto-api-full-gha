import logo from "../images/logo.svg";
import { Link, useLocation } from "react-router-dom";

export default function Header({ onExit, email }) {
  const location = useLocation();

  return (
    <header className="header">
      <Link className="header__logo" to="/sign-in">
        <img className="header__logo-pic" src={logo} alt="Логотип" />
      </Link>
      <div className="header__box">
        {location.pathname === "/sign-in" && (
          <Link className="header__link" to="/sign-up">
            Регистрация
          </Link>
        )}
        {location.pathname === "/sign-up" && (
          <Link className="header__link" to="/sign-in">
            Войти
          </Link>
        )}

        {location.pathname === "/" && (
          <>
            <p className="header__email">{email}</p>
            <Link
              className="header__link"
              to="/sign-in"
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
