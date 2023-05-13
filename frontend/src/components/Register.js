import { Link } from "react-router-dom";
import { useEffect } from "react";
import useForm from "../hooks/useForm";
import StartPage from "./StartPage";

export default function Register({ onRegister }) {
  
  const { values, setValues, handleChange } = useForm({});

  useEffect(() => {
    setValues({});
  }, [setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values);
    console.log(values);
  }

  return (
    <>
      <StartPage
        name="register"
        title="Регистрация"
        btnText="Зарегистрироваться"
        onSubmit={handleSubmit}
        onChange={handleChange}
        valuesEmail={values.email || ""}
        valuesPassword={values.password || ""}
      ></StartPage>
      <p className="popup__question">
        Уже зарегистрированы? &nbsp;
        <Link className="popup__linkSignIn" to="/sign-in">
          Войти
        </Link>
      </p>
    </>
  );
}
