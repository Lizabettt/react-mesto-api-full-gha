import { useEffect } from "react";
import useForm from "../hooks/useForm";
import StartPage from "./StartPage";

export default function Login({ onLogin }) {
  const { values, setValues, handleChange } = useForm({});

  useEffect(() => {
    setValues({});
  }, [setValues]);

  console.log(values);
  function handleSubmit(evt) {
    evt.preventDefault();

    onLogin(values);
    console.log(values);
  }

  return (
    <StartPage
      name="login"
      title="Вход"
      btnText="Войти"
      onSubmit={handleSubmit}
      onChange={handleChange}
      valuesEmail={values.email || ""}
      valuesPassword={values.password || ""}
    ></StartPage>
  );
}
