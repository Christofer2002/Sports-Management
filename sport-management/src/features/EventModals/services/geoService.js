// services/geoService.js
const API_BASE_URL = 'http://costa-rica-places.herokuapp.com/api';

export const getProvinces = async () => {
  const response = await fetch(`${API_BASE_URL}/provinces`);
  const data = await response.json();
  return data;
};

export const getCantons = async (provinceId) => {
  const response = await fetch(`${API_BASE_URL}/cantons`);
  const data = await response.json();
  return data.filter(canton => canton.Provincia_idProvincia === provinceId);
};

export const getDistricts = async (cantonId) => {
  const response = await fetch(`${API_BASE_URL}/districts`);
  const data = await response.json();
  return data.filter(district => district.Canton_idCanton === cantonId);
};
