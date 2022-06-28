import ajax from "./ajax";

export const getSongUrl = id => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
};

export const getLyric = id => {
  return ajax.get({
    url: '/lyric',
    data: { id }
  })
}