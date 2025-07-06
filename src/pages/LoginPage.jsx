import React from 'react';

export default function LoginPage() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Вхід</h2>
      <form style={styles.form}>
        <input type="email" placeholder="Email" style={styles.input} />
        <input type="password" placeholder="Пароль" style={styles.input} />
        <button style={styles.button}>Увійти</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '360px',
    margin: '60px auto',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0,0,0,0.05)',
    borderRadius: '8px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }
};
