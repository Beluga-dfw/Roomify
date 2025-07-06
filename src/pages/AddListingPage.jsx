import React, { useState } from 'react';
import {
  FaHome, FaWarehouse, FaMountain, FaBuilding,
  FaWifi, FaCoffee, FaSnowflake, FaTv,
  FaSwimmingPool, FaParking, FaDog,
} from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './AddListingPage.css';

function LocationPicker({ position, onChange }) {
  useMapEvents({ click(e) { onChange([e.latlng.lat, e.latlng.lng]); } });
  return position ? <Marker position={position} /> : null;
}

export default function AddListingPage() {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const [data, setData] = useState({
    title: '', description: '', type: 'studio',
    address: '', coords: [50.45,30.52],
    price: '', guests:1, beds:1, baths:1,
    amenities: {}, photos: [], from:'', to:''
  });

  const types = [
    { key:'studio', icon:FaHome, label:'Студія' },
    { key:'loft',   icon:FaWarehouse, label:'Лофт' },
    { key:'cottage',icon:FaMountain, label:'Котедж' },
    { key:'apart',  icon:FaBuilding, label:'Апарт' },
  ];
  const amList = [
    { key:'wifi', icon:FaWifi, label:'Wi-Fi' },
    { key:'breakfast',icon:FaCoffee,label:'Сніданок' },
    { key:'ac', icon:FaSnowflake, label:'Кондиціонер' },
    { key:'tv', icon:FaTv, label:'Телевізор' },
    { key:'pool', icon:FaSwimmingPool, label:'Басейн' },
    { key:'parking',icon:FaParking,label:'Паркування'},
    { key:'pets', icon:FaDog, label:'Дом. тварини' },
  ];

  const update = (k,v) => setData(d=>({...d,[k]:v}));
  const next = () => setStep(s=>Math.min(s+1,totalSteps));
  const prev = () => setStep(s=>Math.max(s-1,1));
  const toggleAmenity = k => {
    setData(d=>{
      const am = {...d.amenities,[k]:!d.amenities[k]};
      return {...d,amenities:am};
    });
  };
  const handlePhotos = e => update('photos',[...e.target.files]);

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Submit', data);
    // TODO: send to server
  };

  return (
    <div className="wizard-page">
      <h1>Додати оголошення</h1>
      <div className="progress-bar">
        {Array.from({length:totalSteps},(_,i)=>i+1).map(i=>(
          <div key={i}
               className={`step-indicator ${i<=step?'active':''}`}>
            {i}
          </div>
        ))}
      </div>
      <form className="wizard-form" onSubmit={handleSubmit}>
        {/* Step 1 */}
        {step===1 && (
          <div className="step-card">
            <h2>Основна інформація</h2>
            <label>Заголовок
              <input
                value={data.title}
                onChange={e=>update('title',e.target.value)}
                required placeholder="Затишна студія в центрі"
              />
            </label>
            <label>Опис
              <textarea
                value={data.description}
                onChange={e=>update('description',e.target.value)}
                placeholder="Розкажіть про житло"
              />
            </label>
            <div className="type-grid">
              {types.map(t=>(
                <div key={t.key}
                     className={`type-item ${data.type===t.key?'sel':''}`}
                     onClick={()=>update('type',t.key)}>
                  <t.icon/>
                  <span>{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Step 2 */}
        {step===2 && (
          <div className="step-card">
            <h2>Локація</h2>
            <label>Адреса
              <input
                value={data.address}
                onChange={e=>update('address',e.target.value)}
                placeholder="Вулиця, місто"
              />
            </label>
            <div className="map-wrapper">
              <MapContainer
                center={data.coords} zoom={13}
                className="minimap">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <LocationPicker position={data.coords} onChange={c=>update('coords',c)} />
              </MapContainer>
            </div>
          </div>
        )}
        {/* Step 3 */}
        {step===3 && (
          <div className="step-card grid-4">
            <label>Ціна (₴)
              <input type="number" value={data.price}
                     onChange={e=>update('price',e.target.value)}/>
            </label>
            <label>Гостей
              <input type="number" min="1" value={data.guests}
                     onChange={e=>update('guests',e.target.value)}/>
            </label>
            <label>Спальні
              <input type="number" min="0" value={data.beds}
                     onChange={e=>update('beds',e.target.value)}/>
            </label>
            <label>Ванні
              <input type="number" min="0" value={data.baths}
                     onChange={e=>update('baths',e.target.value)}/>
            </label>
          </div>
        )}
        {/* Step 4 */}
        {step===4 && (
          <div className="step-card amenities-grid">
            {amList.map(a=>(
              <div key={a.key}
                   className={`amenity-card ${data.amenities[a.key]?'sel':''}`}
                   onClick={()=>toggleAmenity(a.key)}>
                <a.icon/>
                <span>{a.label}</span>
              </div>
            ))}
          </div>
        )}
        {/* Step 5 */}
        {step===5 && (
          <div className="step-card">
            <h2>Фото та доступність</h2>
            <label>Фотографії
              <input type="file" multiple accept="image/*"
                     onChange={handlePhotos}/>
            </label>
            <div className="photos-preview">
              {data.photos.map((f,i)=>(
                <img key={i} src={URL.createObjectURL(f)} alt=""/>
              ))}
            </div>
            <div className="grid-2">
              <label>З
                <input type="date" value={data.from}
                       onChange={e=>update('from',e.target.value)}/>
              </label>
              <label>По
                <input type="date" value={data.to}
                       onChange={e=>update('to',e.target.value)}/>
              </label>
            </div>
          </div>
        )}
        {/* Navigation */}
        <div className="wizard-nav">
          {step>1 && <button type="button" onClick={prev}>Назад</button>}
          {step<totalSteps
            ? <button type="button" onClick={next}>Далі</button>
            : <button type="submit" className="finish">Опублікувати</button>
          }
        </div>
      </form>
    </div>
  );
}
