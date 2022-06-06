import ajax from "./ajax";

export function getBanner() {
  return ajax.get("/banner");
}

export function getRecommend() {
  return ajax.get('/personalized')
}