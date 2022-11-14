export const languages = {
    en: { name: 'Inglés' },
    es: { name: 'Español' },
    pt: { name: 'Portugués' },
};

export const langFromCode = code => languages?.[code]?.name;
