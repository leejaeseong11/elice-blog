window.addEventListener('load', () => {
  // 분리한 HTML 파일 로드
  addHTML(document.querySelector('#introduce-area'), './html/introduce.html');
  addHTML(document.querySelector('#diary-area'), './html/diary.html');
  addHTML(document.querySelector('#playlist-area'), './html/playlist.html');

  // nav에 클릭된 카테고리 style 적용
  function toggleSelection(event) {
    const clickedElement = event.currentTarget;

    const clickableElements = document.querySelectorAll('#nav-category > a');
    clickableElements.forEach(element => {
      element.classList.remove('selected');
    });

    clickedElement.classList.add('selected');
  }

  document.querySelectorAll('#nav-category > a').forEach(element => {
    element.addEventListener('click', toggleSelection);
  });

  // nav에 클릭된 요소로 이동하기 (nav bar만큼의 여백을 제외)
  const navLinks = document.querySelectorAll('#nav-category > a');
  navLinks.forEach(navLink => {
    navLink.addEventListener('click', function (e) {
      e.preventDefault();
      const headerHeight = document.querySelector('nav').offsetHeight;
      window.scrollTo({
        top: document.getElementById(navLink.href.split('#')[1]).offsetTop - headerHeight,
        behavior: 'smooth',
      });
    });
  });
});

let addHTML = (target, file) => {
  const xhttps = new XMLHttpRequest();
  xhttps.addEventListener('load', () => {
    target.insertAdjacentHTML('afterend', xhttps.responseText);

    if (file == './html/diary.html') {
      // 이미지 슬라이드
      const leftArrow = document.getElementById('left-arrow');
      const rightArrow = document.getElementById('right-arrow');
      const postsWrapper = document.querySelector('#post-container');
      const posts = document.querySelectorAll('.post');
      let currentIndex = 0;

      rightArrow.addEventListener('click', () => {
        if (currentIndex < posts.length - 3) {
          currentIndex++;
        } else {
          currentIndex = 0;
        }
        slideToCurrentIndex();
      });

      leftArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
        } else {
          currentIndex = posts.length - 3;
        }
        slideToCurrentIndex();
      });

      function slideToCurrentIndex() {
        const slideValue = -currentIndex * (100 / 3);
        postsWrapper.style.transform = `translateX(${slideValue}%)`;
      }

      slideToCurrentIndex();

      // 일기 상세 내용 확인
      const post = document.querySelectorAll('.post');
      const btn = document.querySelectorAll('.close-btn');

      post.forEach(p => {
        p.addEventListener('click', function () {
          let id = this.id;
          document.querySelector(`#popup${id[id.length - 1]}`).classList.remove('hidden');
        });
      });

      btn.forEach(b => {
        b.addEventListener('click', function () {
          let id = this.id;
          document.querySelector(`#popup${id[id.length - 1]}`).classList.add('hidden');
        });
      });
    }

    if (file == './html/playlist.html') {
      // 플레이리스트 링크 이벤트
      const playlist = document.querySelectorAll('.playlist-content');
      const links = [
        'https://www.youtube.com/watch?v=EIz09kLzN9k',
        'https://www.youtube.com/watch?v=1QYBiNRu1ok',
        'https://www.youtube.com/watch?v=ArmDp-zijuc',
        'https://www.youtube.com/watch?v=_GgIt2EFHV8',
        'https://www.youtube.com/watch?v=6ZUIwj3FgUY',
      ];
      links.forEach((link, index) => {
        playlist[index].addEventListener('click', () => {
          window.open(link, '_blank');
        });
      });
    }
  });

  xhttps.open('GET', file);
  xhttps.send();
};
