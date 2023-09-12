window.addEventListener('load', () => {
  addHTML(document.querySelector('#introduce-area'), './html/introduce.html');
  addHTML(document.querySelector('#diary-area'), './html/diary.html');
  addHTML(document.querySelector('#playlist-area'), './html/playlist.html');
});

let addHTML = (target, file) => {
  const xhttps = new XMLHttpRequest();
  xhttps.addEventListener('load', () => {
    target.insertAdjacentHTML('afterend', xhttps.responseText);
  });
  xhttps.open('GET', file);
  xhttps.send();
};
