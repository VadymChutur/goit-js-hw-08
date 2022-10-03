import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const CURENT_TIME = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const onPlay = function ({ seconds }) {
  localStorage.setItem(CURENT_TIME, seconds);
};

player
  .setCurrentTime(localStorage.getItem(CURENT_TIME))
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;

      default:
        break;
    }
  });

player.on('timeupdate', throttle(onPlay, 1000));

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});
