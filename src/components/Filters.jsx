import React from "react";

function Filters() {
  return (
    <div className="filters">
      <input type="text" placeholder="Пошук оголошень" />
      <select>
        <option>На модерації</option>
        <option>Схвалено</option>
        <option>Відхілено</option>
      </select>
      <select>
        <option>За датою додавання (спочатку нові)</option>
        <option>За датою додавання (спочатку старі)</option>
      </select>
    </div>
  );
}

export default Filters;
