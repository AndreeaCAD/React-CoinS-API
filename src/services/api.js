import axios from "axios";

const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  headers: { Accept: "application/json" },
});

const buildQuerryParams = (obj) => {
  if (!obj) return "";
  const arr = Object.keys(obj).map((k) => {
    if (obj[k]) return `${k}=${obj[k]}`;
  });
  return `?${arr.join("&")}`;
};

const getCoinsMarkets = (params) => {
  const parameters = buildQuerryParams(params);
  return api.get(`/coins/markets${parameters}`);
};

const getCoinDetails = (coinId) => {
  if (!coinId) return "";
  return api.get(`/coins/${coinId}`);
};

export { getCoinsMarkets, getCoinDetails };
