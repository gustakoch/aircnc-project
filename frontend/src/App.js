import React, { useState } from "react";
import api from './services/api';
import "./App.css";

import logo from './assets/logo.svg';

function App() {
  const [ getEmail, setEmail ] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await api.post('/sessions', { email: getEmail });
    const { _id } = response.data;

    localStorage.setItem('user_id', _id);
  }

  return (
    <div className="container">
      <img src={logo} alt="AirCnC" />

      <div className="content">
        <p>
          Ofereça <strong>spots</strong> para programadores e encontre{" "}
          <strong>talentos</strong> para sua empresa!
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-MAIL: (*)</label>
          <input
            id="email"
            type="email"
            placeholder="Informe seu melhor e-mail"
            value={getEmail}
            onChange={event => setEmail(event.target.value)}
          />

          <button className="btn" type="submit">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;