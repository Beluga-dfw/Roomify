import React from "react";

function AdCard() {
  return (
    <div className="ad-card">
      <img src="https://via.placeholder.com/100" alt="Фото кімнати" />
      <div>
        <h3>3х кімнатна в центрі</h3>
        <p>Адреса: м. Київ, вул. Велика васильківська, буд. 98</p>
        <p>Ціна: 1200 грн/доба</p>
        <p>Дата: 14.05.2025</p>
        <p>Автор: Сергій Петрович | sergiy_petrovich@gmail.com</p>
        <p>Скарги: 2 | Статус: Очікує модерації</p>
        <div className="buttons">
          <button>Схвалити</button>
          <button>Відхилити</button>
          <button>Детальніше</button>
          <button>Коментувати</button>
        </div>
      </div>
    </div>
  );
}

export default AdCard;
