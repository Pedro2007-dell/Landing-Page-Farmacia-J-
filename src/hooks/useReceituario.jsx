import { useState, useEffect } from 'react';

export const useReceituario = () => {
  const [receita, setReceita] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('receita') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('receita', JSON.stringify(receita));
  }, [receita]);

  const adicionarAoReceituario = (medicamento) => {
    if (!receita.some(item => item.id === medicamento.id)) {
      setReceita([...receita, { ...medicamento, posologia: '1 comprimido ao dia' }]);
    }
  };

  const removerDoReceituario = (id) => {
    setReceita(receita.filter(item => item.id !== id));
  };

  const atualizarPosologia = (id, posologia) => {
    setReceita(receita.map(item => 
      item.id === id ? { ...item, posologia } : item
    ));
  };

  const limparReceituario = () => {
    setReceita([]);
  };

  return {
    receita,
    adicionarAoReceituario,
    removerDoReceituario,
    atualizarPosologia,
    limparReceituario,
  };
};