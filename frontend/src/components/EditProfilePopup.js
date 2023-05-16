import CurrentUserContext from '../contexts/CurrentUserContext';
import { useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useForm from '../hooks/useForm';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, setValues, handleChange } = useForm({});

  useEffect(() => {
    if (currentUser) {
      setValues(currentUser);
    }
  }, [setValues, currentUser, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      name='profile'
      nameColor='light'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className='popup__form-input'>
        <input
          className='popup__input popup__input_type_light'
          id='popupName'
          type='text'
          placeholder='Имя пользователя'
          name='name'
          minLength='2'
          maxLength='40'
          required
          autoComplete='off'
          value={values.name || ''}
          onChange={handleChange}
        />
        <span className='popup__help popupName-error'></span>
        <input
          className='popup__input popup__input_type_light'
          id='popupJob'
          type='text'
          placeholder='Вид деятельности'
          name='about'
          minLength='2'
          maxLength='200'
          required
          autoComplete='off'
          value={values.about || ''}
          onChange={handleChange}
        />
        <span className='popup__help popupJob-error'></span>
      </fieldset>
    </PopupWithForm>
  );
}
