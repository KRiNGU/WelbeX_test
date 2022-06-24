/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { ChangeEvent, useCallback, useState } from 'react';
import styles from './styles.module.scss';

export interface SubmitProps {
  name: string;
  date: string;
  number: number;
  distance: number;
}

interface CreateNewTableElementModalProps {
  onSubmit: ({ name, date, number, distance }: SubmitProps) => void;
  onClose: () => void;
}

// Здесь модальное окно для создания нового элемента таблицы
const CreateNewTableElementModal = ({
  onSubmit,
  onClose,
}: CreateNewTableElementModalProps) => {
  const [newName, setNewName] = useState<string>('');
  const [newDate, setNewDate] = useState<string>('');
  const [newNumber, setNewNumber] = useState<number>(0);
  const [newDistance, setNewDistance] = useState<number>(0);

  const handleSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      onSubmit({
        name: newName,
        date: newDate,
        number: newNumber,
        distance: newDistance,
      });
    },
    [onSubmit, newName, newDate, newNumber, newDistance]
  );

  const handleChangeName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      // Запрещаем пользователю ввод любых символов, кроме a-z, заглавных и цифр
      if (e.target.value.match(/[a-zA-Z0-9]/)) {
        setNewName(e.target.value);
        // Учитываем, что в пустом вводе e.target.value будет undefined
      } else if (e.target.value) {
        setNewName('');
      }
    },
    [setNewName]
  );

  // Вызывается при нажатии на область вокруг модального окна
  const handleClose = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      // Если мы нажали именно на область вокруг модального окна, а не всплыли к нему,
      // то закрываем модальное окно, не очищая значения
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <div className={styles.container} onClick={handleClose}>
      <form className={styles.modal} onSubmit={handleSubmit}>
        <button className={styles.closeButton} onClick={() => onClose()}>
          x
        </button>
        <h2 className={styles.title}>Создание нового элемента таблицы</h2>
        <label className={styles.label} htmlFor="newName">
          Введите название:
        </label>
        <input
          required
          placeholder="Название"
          className={styles.input}
          type="text"
          id="newName"
          value={newName}
          onChange={handleChangeName}
        />
        <label className={styles.label} htmlFor="newDate">
          Введите дату:
        </label>
        <input
          required
          className={styles.input}
          // Прописываем паттерн для даты
          pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
          type="date"
          id="newDate"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <label className={styles.label} htmlFor="newNumber">
          Введите количество:
        </label>
        <input
          required
          placeholder="Количество"
          className={styles.input}
          // Числовой тип
          type="number"
          id="newNumber"
          value={newNumber}
          // Парсим в number, чтобы не было ошибок типизации useState
          onChange={(e) => setNewNumber(parseInt(e.target.value))}
        />
        <label className={styles.label} htmlFor="newDistance">
          Введите расстояние:
        </label>
        <input
          required
          placeholder="Расстояние"
          className={styles.input}
          // Числовой тип
          type="number"
          id="newDistance"
          value={newDistance}
          // Парсим в number, чтобы не было ошибок типизации useState
          onChange={(e) => setNewDistance(parseInt(e.target.value))}
        />
        <button type="submit" className={styles.button}>
          Создать
        </button>
      </form>
    </div>
  );
};

export default CreateNewTableElementModal;
