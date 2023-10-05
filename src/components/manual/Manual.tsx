import React from 'react';
import './Manual.scss';
import BorderedImage from '../bordered-image/BorderedImage';
const Manual = () => {
  return (
    <div className='manual-form'>
      <div className='manual-form-text'>
        <h1>Почни за лічені хвилини</h1>
        <p>Хмарне сховище де немає нічого зайвого</p>
      </div>
      <div className='manual-form-steps'>
        <div>
          <span>Крок 1</span>
          <h2>Авторизуйтеся</h2>
          <p>Увійдіть в систему натиснувши 'Увійти' або зереєструйтеся, якщо ще не маєте акаунту (Реєстрація за лічені хвилини).</p>
        </div>
        <div>
          <span>Крок 2</span>
          <h2>Завантажте файл</h2>
          <p>Натисніть на кнопу 'завантажити PDF' та переместіть або оберіть файл.</p>
        </div>
        <div>
          <span>Крок 3</span>
          <h2>Зручно передивляєтеся ваші PDF</h2>
          <p>Натисніть на файл, після цього відкриється вікно перегляду.</p>
        </div>
      </div>
      <BorderedImage
        src='/file-upload-preview.jpg'
        className='w-full sm:w-2/3 p-2 sm:p-4 h-auto mt-4 self-center'
      />
    </div>
  );
};

export default Manual;
