import React, { useState } from 'react';
import {
  FaLifeRing,
  FaHome,
  FaShieldAlt,
  FaChevronRight,
  FaChevronDown,
} from 'react-icons/fa';
import './SupportPage.css';

const TABS = [
  { id: 'housing',   label: 'Житло',      icon: <FaHome /> },
  { id: 'insurance', label: 'Страховка',  icon: <FaShieldAlt /> },
];

const FAQ = {
  housing: [
    'Відміна бронювання',
    'Оплата та повернення',
    'Деталі про об’єкт',
    'Правила проживання',
  ],
  insurance: [
    'Види страхування',
    'Як оформити поліс',
    'Умови відшкодування',
  ],
};

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState('housing');
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = idx =>
    setOpenIndex(openIndex === idx ? null : idx);

  return (
    <div className="support-page">
      <div className="container">
        <header className="support-header">
          <FaLifeRing className="support-icon" />
          <div className="support-text">
            <h1>Ласкаво просимо до Центру підтримки</h1>
            <p>Ми працюємо цілодобово</p>
          </div>
          <button className="btn-primary">Отримати допомогу з бронюванням</button>
        </header>

        <nav className="support-tabs">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={tab.id === activeTab ? 'tab active' : 'tab'}
              onClick={() => {
                setActiveTab(tab.id);
                setOpenIndex(null);
              }}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </nav>

        <section className="faq-list">
          {FAQ[activeTab].map((q, i) => (
            <div key={i} className="faq-item">
              <button className="faq-q" onClick={() => toggleIndex(i)}>
                <span>{q}</span>
                {openIndex === i ? <FaChevronDown /> : <FaChevronRight />}
              </button>
              {openIndex === i && (
                <div className="faq-a">
                  <p>Тут з’явиться відповідь на питання «{q}».</p>
                </div>
              )}
            </div>
          ))}
        </section>
      </div>
    </div>
);
}
