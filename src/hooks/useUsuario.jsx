import { useState, useEffect } from 'react';

export const useUsuario = () => {
  const [usuario, setUsuarioState] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('usuario') || 'null');
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (usuario) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('usuario');
      localStorage.removeItem('token');
    }
  }, [usuario]);

  const setUsuario = (newUsuario) => {
    setUsuarioState(newUsuario);
  };

  return { usuario, setUsuario };
};