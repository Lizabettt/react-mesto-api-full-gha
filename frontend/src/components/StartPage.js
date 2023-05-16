import PopupWithForm from './PopupWithForm';

export default function StartPage({
  name,
  title,
  onSubmit,
  children,
  btnText,
  onChange,
  valuesEmail,
  valuesPassword,
}) {
  return (
    <PopupWithForm
      name={name}
      nameColor='dark'
      title={title}
      btnText={btnText}
      onSubmit={onSubmit}
    >
      <fieldset className='popup__form-input'>
        <input
          className='popup__input popup__input_type-dark'
          id='popupEmail'
          type='email'
          placeholder='Email'
          name='email'
          minLength='5'
          maxLength='20'
          required
          autoComplete='off'
          value={valuesEmail}
          onChange={onChange}
        />
        <span className='popup__help popupEmail-error'></span>
        <input
          className='popup__input popup__input_type-dark'
          id='popupPassword'
          type='password'
          placeholder='Пароль'
          name='password'
          minLength='5'
          maxLength='20'
          required
          autoComplete='off'
          value={valuesPassword}
          onChange={onChange}
        />
        <span className='popup__help popupPassword-error'></span>

        {children}
      </fieldset>
    </PopupWithForm>
  );
}
