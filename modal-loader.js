fetch('modals.html') // делаю запрос к файлу
  .then(response => response.text()) // преобразую в текст
  .then(data => {
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = data;
    document.body.appendChild(modalContainer);
    initModalHandlers();
  })
  .catch(error => console.error('Ошибка выгрузки окна', error)); //нужно запускать Python сервер, что бы корректно работало:   python -m http.server 8000       http://127.0.0.1:8000


function initModalHandlers() {
  const modal = document.getElementById('authModal');
  const modal3 = document.getElementById('authModal3');
  const modal2 = document.getElementById('authModal2');
  const loginBtn = document.querySelector('.btn-primary');
  const closeBtn = document.querySelector('.close');
  const closeBtn2 = document.querySelector('.close2');
  const closeBtn3 = document.querySelector('.close3');
  const loginForm = document.getElementById('loginForm');
  const reqLink = document.getElementById('switchToRegister'); 
  const ReqForm = document.getElementById('reqForm');
  const switch_log = document.getElementById('switchToLogin'); 
  const loginBtnLinAll = document.querySelectorAll('.btn-login-mod')

  const switchToLoginFromModal3 = document.querySelectorAll('#authModal3 .btn-primary')[0]; // Первая кнопка "Войти"
  const switchToRegisterFromModal3 = document.querySelectorAll('#authModal3 .btn-primary')[1]; // Вторая кнопка "Зарегистрироваться"



  if (switchToLoginFromModal3 && modal3 && modal) {
        switchToLoginFromModal3.addEventListener('click', function(e) {
            e.preventDefault();
            modal3.style.display = 'none';
            modal.style.display = 'block';
        });
    } 

  if (switchToRegisterFromModal3 && modal3 && modal2) {
        switchToRegisterFromModal3.addEventListener('click', function(e) {
            e.preventDefault();
            modal3.style.display = 'none';
            modal2.style.display = 'block';
        });
    }  

  if (loginBtnLinAll.length > 0 && modal3){
    loginBtnLinAll.forEach(function(btn){
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        modal3.style.display = 'block';
      });
    })
  }

  if (loginBtn && modal) {
    loginBtn.addEventListener('click', function(e) {
      e.preventDefault();
      modal.style.display = 'block';
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  }

  if (closeBtn2 && modal2) {
    closeBtn2.addEventListener('click', function() {
      modal2.style.display = 'none';
    });
  }

  if (closeBtn3 && modal3) {
    closeBtn3.addEventListener('click', function() {
      modal3.style.display = 'none';
    });
  }

  if (loginForm && modal) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      console.log('Форма отправлена');
      modal.style.display = 'none';
    });
  }

  window.addEventListener('click', function(event) {
    if (modal && event.target == modal) {
      modal.style.display = 'none';
    }
    if (modal2 && event.target == modal2) {
      modal2.style.display = 'none';
    }
  });

  if (reqLink && modal && modal2 && modal3) {
    reqLink.addEventListener('click', function(e){
      e.preventDefault();
      modal.style.display = 'none';
      modal2.style.display = 'block';
      modal3.style.display = 'none';
    });
  }

  if (ReqForm) {
    ReqForm.addEventListener('submit', function(e) {
      e.preventDefault();
      console.log('Форма отправлена');
    });
  }

  if (switch_log && modal && modal2 && modal3) {
    switch_log.addEventListener('click', function(e){
      e.preventDefault();
      modal2.style.display = 'none';
      modal.style.display = 'block';
      modal3.style.display = 'none'
    });
  }
}


