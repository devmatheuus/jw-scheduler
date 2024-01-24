export const returnMonthsNames = (): string[] => {
  return [
    'janeiro',
    'fevereiro',
    'marco',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro',
  ];
};

export const monthsAliases: Record<string, string> = {
  janeiro: 'janeiro-fevereiro',
  fevereiro: 'janeiro-fevereiro',
  marco: 'marco-abril',
  abril: 'marco-abril',
  maio: 'maio-junho',
  junho: 'maio-junho',
  julho: 'julho-agosto',
  agosto: 'julho-agosto',
  setembro: 'setembro-outubro',
  outubro: 'setembro-outubro',
  novembro: 'novembro-dezembro',
  dezembro: 'novembro-dezembro',
};
