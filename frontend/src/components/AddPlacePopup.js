import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useForm from '../hooks/useForm';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { values, setValues, handleChange } = useForm({});

  useEffect(() => {
    setValues({});
  }, [setValues, isOpen]);

  //обработка формы
  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: values.namePlace,
      link: values.linkPlace,
    });
  }

  //разметка
  return (
    <PopupWithForm
      name='add-new-card'
      nameColor='light'
      title='Новое место'
      btnText='Создать'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className='popup__form-input'>
        <input
          className='popup__input popup__input_type_light'
          id='popupNamePlace'
          type='text'
          placeholder='Название'
          name='namePlace'
          minLength='2'
          maxLength='30'
          required
          autoComplete='off'
          value={values.namePlace || ''}
          onChange={handleChange}
        />
        <span className='popup__help popupNamePlace-error'></span>
        <input
          className='popup__input popup__input_type_light'
          id='popupLinkPlace'
          type='url'
          placeholder='Ссылка на картинку'
          name='linkPlace'
          required
          autoComplete='off'
          value={values.linkPlace || ''}
          onChange={handleChange}
        />
        <span className='popup__help popupLinkPlace-error'></span>
      </fieldset>
    </PopupWithForm>
  );
}
