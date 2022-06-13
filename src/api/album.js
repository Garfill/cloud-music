import ajax from "./ajax"


export const getPlayList = (data) => {
  return ajax.get({
    url: '/playlist/detail',
    data,
  })
}