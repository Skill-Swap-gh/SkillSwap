// SkillSwap Application JavaScript

// Application data
let appData = {
  "users": [
    {
      "id": 1,
      "login": "alexey_python",
      "email": "alexey@school.com",
      "firstName": "Алексей",
      "lastName": "Иванов", 
      "school": "Школа №1",
      "class": "10А",
      "avatar": "/api/placeholder/100/100",
      "canTeach": ["Python", "JavaScript", "Математика"],
      "wantToLearn": ["Гитара", "Английский", "Рисование"],
      "rating": 4.8,
      "experiencePoints": 1250,
      "isOnline": true
    },
    {
      "id": 2,
      "login": "maria_guitar",
      "email": "maria@school.com", 
      "firstName": "Мария",
      "lastName": "Петрова",
      "school": "Школа №1", 
      "class": "9Б",
      "avatar": "/api/placeholder/100/100",
      "canTeach": ["Гитара", "Вокал", "Музыкальная теория"],
      "wantToLearn": ["Python", "Фотография"],
      "rating": 4.9,
      "experiencePoints": 980,
      "isOnline": false
    },
    {
      "id": 3,
      "login": "dmitry_art",
      "email": "dmitry@school.com",
      "firstName": "Дмитрий", 
      "lastName": "Смирнов",
      "school": "Школа №1",
      "class": "11В",
      "avatar": "/api/placeholder/100/100", 
      "canTeach": ["Рисование", "Дизайн", "Фотография"],
      "wantToLearn": ["JavaScript", "3D-моделирование"],
      "rating": 4.6,
      "experiencePoints": 1450,
      "isOnline": true
    },
    {
      "id": 4,
      "login": "anna_english",
      "email": "anna@school.com",
      "firstName": "Анна",
      "lastName": "Козлова", 
      "school": "Школа №1",
      "class": "10Б",
      "avatar": "/api/placeholder/100/100",
      "canTeach": ["Английский", "Французский", "История"],
      "wantToLearn": ["Программирование", "Гитара"],
      "rating": 4.7,
      "experiencePoints": 1120,
      "isOnline": true
    }
  ],
  "currentUser": {
    "id": null,
    "login": null,
    "isLoggedIn": false
  },
  "skillCategories": [
    "Все",
    "Программирование", 
    "Музыка",
    "Языки",
    "Искусство",
    "Наука",
    "Спорт"
  ],
  "notifications": [
    {
      "id": 1,
      "type": "exchange_proposal",
      "fromUser": "Мария Петрова",
      "fromUserId": 2,
      "message": "Предлагает обмен: Гитара → Python",
      "timestamp": "2 часа назад",
      "isRead": false,
      "data": {
        "skillOffered": "Гитара",
        "skillWanted": "Python",
        "date": "2025-10-01",
        "time": "15:00",
        "message": "Привет! Хочу изучить Python, готова научить игре на гитаре."
      }
    },
    {
      "id": 2, 
      "type": "exchange_accepted",
      "fromUser": "Дмитрий Смирнов",
      "fromUserId": 3,
      "message": "Принял ваше предложение обмена",
      "timestamp": "1 день назад", 
      "isRead": false
    }
  ],
  "exchanges": [
    {
      "id": 1,
      "initiator": "Алексей Иванов",
      "target": "Мария Петрова", 
      "skillOffered": "Python",
      "skillWanted": "Гитара",
      "date": "2025-10-01",
      "time": "15:00",
      "status": "pending",
      "message": "Привет! Хочу научиться играть на гитаре, готов обучить Python основам."
    },
    {
      "id": 2,
      "initiator": "Дмитрий Смирнов",
      "target": "Алексей Иванов",
      "skillOffered": "Рисование", 
      "skillWanted": "JavaScript",
      "date": "2025-10-03",
      "time": "14:30", 
      "status": "accepted",
      "message": "Давай обменяемся! Научу рисовать персонажей."
    }
  ],
  "lessons": [
    {
      "id": 1,
      "skill": "JavaScript",
      "partner": "Дмитрий Смирнов",
      "date": "2025-10-03",
      "time": "14:30",
      "status": "scheduled",
      "type": "learning"
    },
    {
      "id": 2, 
      "skill": "Python",
      "partner": "Мария Петрова",
      "date": "2025-09-25", 
      "time": "16:00",
      "status": "completed",
      "type": "teaching"
    }
  ]
};

// Application state
let currentPage = 'home';
let currentFilter = 'Все';
let selectedUserForExchange = null;
let chatMessages = {};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing SkillSwap app...');
  
  try {
    initializeApp();
    setupEventListeners();
    checkAuthStatus();
    console.log('App initialized successfully');
  } catch (error) {
    console.error('Application initialization error:', error);
  }
});

function initializeApp() {
  // Initialize chat messages
  chatMessages = {
    2: [
      { sender: 'received', message: 'Привет! Готова к обмену навыками?', time: '14:30' },
      { sender: 'sent', message: 'Да! Когда удобно встретиться?', time: '14:32' }
    ]
  };
  
  // Setup navigation
  setupNavigation();
  
  // Render initial data
  renderSkillFilters();
  renderCatalog();
  renderNotifications();
  renderLessons();
  renderCalendar();
}

function setupEventListeners() {
  console.log('Setting up event listeners...');
  
  // Navigation
  document.querySelectorAll('[data-page]').forEach(element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      const page = e.target.getAttribute('data-page');
      if (page) {
        console.log('Navigating to page:', page);
        navigateToPage(page);
      }
    });
  });

  // Auth forms with proper form submission handling
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      console.log('Login form submitted');
      handleLogin(e);
    });
  }
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      console.log('Register form submitted');
      handleRegister(e);
    });
  }
  
  // Auth tabs
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Switching auth tab to:', e.target.dataset.tab);
      switchAuthTab(e.target.dataset.tab);
    });
  });

  // Login/Logout buttons
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  
  if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigateToPage('auth');
    });
  }
  
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleLogout();
    });
  }

  // Notifications
  const notificationsBtn = document.getElementById('notificationsBtn');
  if (notificationsBtn) {
    notificationsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleNotifications();
    });
  }
  
  // Profile dropdown
  const profileBtn = document.getElementById('profileBtn');
  if (profileBtn) {
    profileBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleProfileMenu();
    });
  }

  // Modals
  setupModalEventListeners();

  // Skill filters - using event delegation for dynamic content
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
      e.preventDefault();
      console.log('Filter clicked:', e.target.dataset.filter);
      handleSkillFilter(e.target.dataset.filter);
    }
    
    // Exchange buttons - using event delegation since they're dynamically created
    if (e.target.classList.contains('exchange-btn')) {
      e.preventDefault();
      const userId = parseInt(e.target.dataset.userId);
      console.log('Exchange button clicked for user:', userId);
      if (appData.currentUser.isLoggedIn) {
        showExchangeModal(userId);
      } else {
        showNotification('Необходимо войти в систему', 'error');
        navigateToPage('auth');
      }
    }
  });

  // Offer skill button
  const offerSkillBtn = document.getElementById('offerSkillBtn');
  if (offerSkillBtn) {
    offerSkillBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (appData.currentUser.isLoggedIn) {
        navigateToPage('profile');
      } else {
        navigateToPage('auth');
      }
    });
  }

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.notifications')) {
      const notificationsDropdown = document.getElementById('notificationsDropdown');
      if (notificationsDropdown) {
        notificationsDropdown.classList.add('hidden');
      }
    }
    if (!e.target.closest('.profile-dropdown')) {
      const profileMenu = document.getElementById('profileMenu');
      if (profileMenu) {
        profileMenu.classList.add('hidden');
      }
    }
  });
  
  console.log('Event listeners setup complete');
}

function setupModalEventListeners() {
  // Exchange modal
  const submitExchangeBtn = document.getElementById('submitExchangeBtn');
  const cancelExchangeBtn = document.getElementById('cancelExchangeBtn');
  
  if (submitExchangeBtn) {
    submitExchangeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleExchangeSubmit();
    });
  }
  
  if (cancelExchangeBtn) {
    cancelExchangeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      hideModal('exchangeModal');
    });
  }

  // Edit profile modal
  const editProfileBtn = document.getElementById('editProfileBtn');
  const saveProfileBtn = document.getElementById('saveProfileBtn');
  const cancelEditBtn = document.getElementById('cancelEditBtn');
  
  if (editProfileBtn) {
    editProfileBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showEditProfileModal();
    });
  }
  
  if (saveProfileBtn) {
    saveProfileBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleProfileSave();
    });
  }
  
  if (cancelEditBtn) {
    cancelEditBtn.addEventListener('click', (e) => {
      e.preventDefault();
      hideModal('editProfileModal');
    });
  }

  // Notification modal
  const acceptExchangeBtn = document.getElementById('acceptExchangeBtn');
  const declineExchangeBtn = document.getElementById('declineExchangeBtn');
  
  if (acceptExchangeBtn) {
    acceptExchangeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleExchangeAccept();
    });
  }
  
  if (declineExchangeBtn) {
    declineExchangeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleExchangeDecline();
    });
  }

  // Chat modal
  const sendMessageBtn = document.getElementById('sendMessageBtn');
  const messageInput = document.getElementById('messageInput');
  
  if (sendMessageBtn) {
    sendMessageBtn.addEventListener('click', (e) => {
      e.preventDefault();
      sendMessage();
    });
  }
  
  if (messageInput) {
    messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  // Modal close buttons
  document.querySelectorAll('.modal__close, .modal__overlay').forEach(element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = e.target.closest('.modal');
      if (modal) {
        hideModal(modal.id);
      }
    });
  });
}

function setupNavigation() {
  // Handle browser back/forward buttons
  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.page) {
      showPage(e.state.page, false);
    }
  });
}

function navigateToPage(page) {
  if (page === currentPage) return;
  
  console.log('Navigating to:', page, 'Current user logged in:', appData.currentUser.isLoggedIn);
  
  // Check if page requires authentication
  const authRequiredPages = ['profile', 'my-lessons'];
  if (authRequiredPages.includes(page) && !appData.currentUser.isLoggedIn) {
    console.log('Auth required, redirecting to auth page');
    navigateToPage('auth');
    return;
  }
  
  showPage(page, true);
  
  // Update browser history
  const url = page === 'home' ? '/' : `/#${page}`;
  history.pushState({ page }, '', url);
}

function showPage(page, updateHistory = true) {
  try {
    console.log('Showing page:', page);
    
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.add('hidden'));
    
    // Show target page
    const targetPage = document.getElementById(page);
    if (targetPage) {
      targetPage.classList.remove('hidden');
      currentPage = page;
      
      // Update navigation active state
      updateNavigation();
      
      // Load page-specific data
      loadPageData(page);
      
      console.log('Page shown successfully:', page);
    } else {
      console.error('Page not found:', page);
    }
  } catch (error) {
    console.error('Error showing page:', error);
  }
}

function updateNavigation() {
  const navLinks = document.querySelectorAll('[data-page]');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-page') === currentPage) {
      link.classList.add('active');
    }
  });
}

function loadPageData(page) {
  try {
    switch (page) {
      case 'profile':
        renderProfile();
        break;
      case 'catalog':
        renderCatalog();
        renderSkillFilters();
        break;
      case 'my-lessons':
        renderLessons();
        break;
      case 'calendar':
        renderCalendar();
        break;
    }
  } catch (error) {
    console.error('Error loading page data:', error);
  }
}

// Authentication functions
function checkAuthStatus() {
  try {
    const isLoggedIn = localStorage.getItem('skillswap_logged_in') === 'true';
    const userId = localStorage.getItem('skillswap_user_id');
    
    console.log('Checking auth status - logged in:', isLoggedIn, 'user ID:', userId);
    
    if (isLoggedIn && userId) {
      appData.currentUser.isLoggedIn = true;
      appData.currentUser.id = parseInt(userId);
      const user = appData.users.find(u => u.id === appData.currentUser.id);
      if (user) {
        appData.currentUser.login = user.login;
      }
    } else {
      appData.currentUser.isLoggedIn = false;
      appData.currentUser.id = null;
      appData.currentUser.login = null;
    }
    
    updateUIForAuth(appData.currentUser.isLoggedIn);
  } catch (error) {
    console.error('Error checking auth status:', error);
    updateUIForAuth(false);
  }
}

function handleLogin(e) {
  e.preventDefault();
  console.log('Handling login...');
  
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  
  console.log('Login attempt with email:', email);
  
  if (!email || !password) {
    showNotification('Пожалуйста, заполните все поля', 'error');
    return;
  }
  
  // Simple authentication - in production, this would be server-side
  const user = appData.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  console.log('User found:', user ? user.firstName : 'none');
  
  if (user) {
    appData.currentUser.isLoggedIn = true;
    appData.currentUser.id = user.id;
    appData.currentUser.login = user.login;
    
    localStorage.setItem('skillswap_logged_in', 'true');
    localStorage.setItem('skillswap_user_id', user.id.toString());
    
    updateUIForAuth(true);
    navigateToPage('catalog');
    showNotification(`Добро пожаловать, ${user.firstName}!`, 'success');
    
    // Clear form
    document.getElementById('loginForm').reset();
  } else {
    console.log('User not found for email:', email);
    showNotification('Пользователь не найден. Попробуйте зарегистрироваться.', 'error');
  }
}

function handleRegister(e) {
  e.preventDefault();
  console.log('Handling registration...');
  
  const firstName = document.getElementById('regFirstName').value.trim();
  const lastName = document.getElementById('regLastName').value.trim();
  const className = document.getElementById('regClass').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value.trim();
  
  if (!firstName || !lastName || !className || !email || !password) {
    showNotification('Пожалуйста, заполните все поля', 'error');
    return;
  }
  
  // Check if user already exists
  const existingUser = appData.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    showNotification('Пользователь с таким email уже существует', 'error');
    return;
  }
  
  // Create new user
  const newUser = {
    id: appData.users.length + 1,
    login: firstName.toLowerCase() + '_' + Date.now(),
    email,
    firstName,
    lastName,
    school: 'Школа №1',
    class: className,
    avatar: '/api/placeholder/100/100',
    canTeach: [],
    wantToLearn: [],
    rating: 0,
    experiencePoints: 0,
    isOnline: true
  };
  
  appData.users.push(newUser);
  
  // Log in the new user
  appData.currentUser.isLoggedIn = true;
  appData.currentUser.id = newUser.id;
  appData.currentUser.login = newUser.login;
  
  localStorage.setItem('skillswap_logged_in', 'true');
  localStorage.setItem('skillswap_user_id', newUser.id.toString());
  
  updateUIForAuth(true);
  navigateToPage('profile');
  showNotification('Аккаунт создан успешно!', 'success');
  
  // Clear form
  document.getElementById('registerForm').reset();
}

function handleLogout() {
  appData.currentUser.isLoggedIn = false;
  appData.currentUser.id = null;
  appData.currentUser.login = null;
  
  localStorage.removeItem('skillswap_logged_in');
  localStorage.removeItem('skillswap_user_id');
  
  updateUIForAuth(false);
  navigateToPage('home');
  showNotification('Вы вышли из системы', 'info');
}

function updateUIForAuth(isLoggedIn) {
  const authButtons = document.getElementById('authButtons');
  const userMenu = document.getElementById('userMenu');
  
  console.log('Updating UI for auth status:', isLoggedIn);
  
  if (isLoggedIn) {
    if (authButtons) authButtons.classList.add('hidden');
    if (userMenu) userMenu.classList.remove('hidden');
    
    const currentUser = getCurrentUser();
    if (currentUser) {
      const userNameElement = document.getElementById('currentUserName');
      const userPointsElement = document.getElementById('userPoints');
      
      if (userNameElement) {
        userNameElement.textContent = currentUser.firstName;
      }
      if (userPointsElement) {
        userPointsElement.textContent = `${currentUser.experiencePoints} очков`;
      }
    }
  } else {
    if (authButtons) authButtons.classList.remove('hidden');
    if (userMenu) userMenu.classList.add('hidden');
  }
}

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-form__content').forEach(f => f.classList.add('hidden'));
  
  const activeTab = document.querySelector(`[data-tab="${tab}"]`);
  const activeForm = document.getElementById(`${tab}Form`);
  
  if (activeTab) activeTab.classList.add('active');
  if (activeForm) activeForm.classList.remove('hidden');
}

// Utility functions
function getCurrentUser() {
  return appData.users.find(u => u.id === appData.currentUser.id);
}

function showNotification(message, type = 'info') {
  console.log('Showing notification:', message, type);
  
  // Simple notification system
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-base);
    padding: var(--space-16);
    box-shadow: var(--shadow-lg);
    z-index: 1001;
    max-width: 300px;
    font-size: var(--font-size-sm);
  `;
  
  // Add type-specific styling
  if (type === 'success') {
    notification.style.borderColor = 'var(--color-success)';
    notification.style.backgroundColor = 'rgba(var(--color-success-rgb), 0.1)';
  } else if (type === 'error') {
    notification.style.borderColor = 'var(--color-error)';
    notification.style.backgroundColor = 'rgba(var(--color-error-rgb), 0.1)';
  }
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  let stars = '';
  
  for (let i = 0; i < fullStars; i++) {
    stars += '★';
  }
  
  if (hasHalfStar) {
    stars += '☆';
  }
  
  while (stars.length < 5) {
    stars += '☆';
  }
  
  return stars;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU');
}

// Render functions
function renderSkillFilters() {
  const filtersContainer = document.getElementById('skillFilters');
  if (!filtersContainer) return;
  
  filtersContainer.innerHTML = appData.skillCategories.map(category => 
    `<button class="filter-btn ${category === currentFilter ? 'active' : ''}" data-filter="${category}">
      ${category}
    </button>`
  ).join('');
}

function renderCatalog() {
  const catalogGrid = document.getElementById('catalogGrid');
  if (!catalogGrid) return;
  
  let filteredUsers = appData.users.filter(user => user.id !== appData.currentUser.id);
  
  if (currentFilter !== 'Все') {
    filteredUsers = filteredUsers.filter(user => {
      const categorySkills = getCategorySkills(currentFilter);
      return user.canTeach.some(skill => categorySkills.includes(skill)) ||
             user.wantToLearn.some(skill => categorySkills.includes(skill));
    });
  }
  
  console.log('Rendering catalog with', filteredUsers.length, 'users');
  
  catalogGrid.innerHTML = filteredUsers.map(user => `
    <div class="user-card" data-user-id="${user.id}">
      <div class="user-card__header">
        <img src="${user.avatar}" alt="${user.firstName}" class="user-card__avatar">
        <div class="user-card__info">
          <h3>${user.firstName} ${user.lastName}</h3>
          <div class="user-card__class">${user.class}</div>
          <div class="user-card__rating">
            <span class="rating">${generateStars(user.rating)}</span>
            <span>${user.experiencePoints} очков</span>
          </div>
        </div>
      </div>
      
      <div class="user-card__skills">
        <div class="skill-section">
          <h4>Может научить:</h4>
          <div class="skills-tags">
            ${user.canTeach.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
          </div>
        </div>
        <div class="skill-section">
          <h4>Хочет изучить:</h4>
          <div class="skills-tags">
            ${user.wantToLearn.map(skill => `<span class="skill-tag skill-tag--want">${skill}</span>`).join('')}
          </div>
        </div>
      </div>
      
      <div class="user-card__footer">
        <div class="online-indicator">
          <span class="online-dot ${user.isOnline ? '' : 'offline-dot'}"></span>
          ${user.isOnline ? 'Онлайн' : 'Офлайн'}
        </div>
        <button class="btn btn--primary btn--sm exchange-btn" data-user-id="${user.id}">
          Предложить обмен
        </button>
      </div>
    </div>
  `).join('');
  
  console.log('Catalog rendered with exchange buttons');
}

function renderProfile() {
  const currentUser = getCurrentUser();
  if (!currentUser) return;
  
  const profileAvatar = document.getElementById('profileAvatar');
  const profileName = document.getElementById('profileName');
  const profileClass = document.getElementById('profileClass');
  const profileRating = document.getElementById('profileRating');
  const profilePoints = document.getElementById('profilePoints');
  const canTeachList = document.getElementById('canTeachList');
  const wantToLearnList = document.getElementById('wantToLearnList');
  
  if (profileAvatar) profileAvatar.src = currentUser.avatar;
  if (profileName) profileName.textContent = `${currentUser.firstName} ${currentUser.lastName}`;
  if (profileClass) profileClass.textContent = currentUser.class;
  if (profileRating) profileRating.textContent = generateStars(currentUser.rating);
  if (profilePoints) profilePoints.textContent = `${currentUser.experiencePoints} очков`;
  
  if (canTeachList) {
    canTeachList.innerHTML = currentUser.canTeach.length > 0 ? 
      currentUser.canTeach.map(skill => `<span class="skill-tag">${skill}</span>`).join('') :
      '<span style="color: var(--color-text-secondary);">Навыки не указаны</span>';
  }
  
  if (wantToLearnList) {
    wantToLearnList.innerHTML = currentUser.wantToLearn.length > 0 ?
      currentUser.wantToLearn.map(skill => `<span class="skill-tag skill-tag--want">${skill}</span>`).join('') :
      '<span style="color: var(--color-text-secondary);">Навыки не указаны</span>';
  }
}

function renderNotifications() {
  const notificationsList = document.getElementById('notificationsList');
  const notificationsCount = document.getElementById('notificationsCount');
  
  if (!notificationsList || !notificationsCount) return;
  
  const unreadCount = appData.notifications.filter(n => !n.isRead).length;
  notificationsCount.textContent = unreadCount;
  notificationsCount.style.display = unreadCount > 0 ? 'block' : 'none';
  
  notificationsList.innerHTML = appData.notifications.map(notification => `
    <div class="notification-item ${!notification.isRead ? 'unread' : ''}" data-notification-id="${notification.id}">
      <div class="notification-content">
        <strong>${notification.fromUser}</strong><br>
        ${notification.message}
      </div>
      <div class="notification-time">${notification.timestamp}</div>
    </div>
  `).join('');
  
  // Add click listeners
  notificationsList.querySelectorAll('.notification-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const notificationId = parseInt(e.target.closest('.notification-item').dataset.notificationId);
      handleNotificationClick(notificationId);
    });
  });
}

function renderLessons() {
  const lessonsList = document.getElementById('lessonsList');
  if (!lessonsList) return;
  
  lessonsList.innerHTML = appData.lessons.map(lesson => `
    <div class="lesson-card">
      <div class="lesson-info">
        <h3>${lesson.skill}</h3>
        <div class="lesson-details">
          <div>Партнер: ${lesson.partner}</div>
          <div>Дата: ${formatDate(lesson.date)} в ${lesson.time}</div>
          <div>Тип: ${lesson.type === 'teaching' ? 'Преподаю' : 'Изучаю'}</div>
        </div>
      </div>
      <div class="lesson-actions">
        <span class="status status--${lesson.status === 'scheduled' ? 'warning' : 'success'}">
          ${lesson.status === 'scheduled' ? 'Запланировано' : 'Завершено'}
        </span>
        ${lesson.status === 'scheduled' ? 
          `<button class="btn btn--primary btn--sm chat-btn" data-partner="${lesson.partner}">Чат</button>` : 
          ''
        }
      </div>
    </div>
  `).join('');
  
  // Add event listeners for chat buttons
  lessonsList.querySelectorAll('.chat-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const partner = e.target.dataset.partner;
      const user = appData.users.find(u => `${u.firstName} ${u.lastName}` === partner);
      if (user) showChatModal(user.id);
    });
  });
}

function renderCalendar() {
  const calendar = document.getElementById('calendar');
  if (!calendar) return;
  
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
                      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  
  // Create calendar header with month/year
  let calendarHTML = `
    <div style="grid-column: 1 / -1; text-align: center; font-weight: var(--font-weight-semibold); padding: var(--space-16); border-bottom: 2px solid var(--color-border);">
      ${monthNames[currentMonth]} ${currentYear}
    </div>
  `;
  
  // Create days of week header
  const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  calendarHTML += daysOfWeek.map(day => 
    `<div style="padding: var(--space-8); font-weight: var(--font-weight-semibold); text-align: center; border: 1px solid var(--color-border); background: var(--color-secondary);">${day}</div>`
  ).join('');
  
  // Get first day of month and number of days
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Add empty cells for days before month starts
  const startDay = firstDay === 0 ? 6 : firstDay - 1;
  for (let i = 0; i < startDay; i++) {
    calendarHTML += '<div class="calendar-day" style="border: 1px solid var(--color-border);"></div>';
  }
  
  // Add days of month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const dateString = date.toISOString().split('T')[0];
    const hasLesson = appData.lessons.some(lesson => lesson.date === dateString);
    const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
    
    let dayClasses = 'calendar-day';
    let dayStyles = 'border: 1px solid var(--color-border); padding: var(--space-8); text-align: center; cursor: pointer; transition: background var(--duration-fast);';
    
    if (hasLesson) {
      dayClasses += ' has-lesson';
      dayStyles += ' background: var(--color-bg-1); color: var(--color-primary); font-weight: var(--font-weight-semibold);';
    }
    
    if (isToday) {
      dayClasses += ' today';
      dayStyles += ' background: var(--color-primary); color: var(--color-btn-primary-text); font-weight: var(--font-weight-bold);';
    }
    
    calendarHTML += `<div class="${dayClasses}" style="${dayStyles}">${day}</div>`;
  }
  
  calendar.innerHTML = calendarHTML;
}

// Modal functions
function showModal(modalId) {
  console.log('Showing modal:', modalId);
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
  } else {
    console.error('Modal not found:', modalId);
  }
}

function hideModal(modalId) {
  console.log('Hiding modal:', modalId);
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
  }
}

function showExchangeModal(userId) {
  console.log('Opening exchange modal for user:', userId);
  selectedUserForExchange = userId;
  const targetUser = appData.users.find(u => u.id === userId);
  const currentUser = getCurrentUser();
  
  if (!targetUser || !currentUser) {
    console.error('User not found for exchange modal');
    return;
  }
  
  console.log('Target user:', targetUser.firstName, 'Current user:', currentUser.firstName);
  
  // Populate skill options
  const skillToLearnSelect = document.getElementById('skillToLearn');
  const skillToTeachSelect = document.getElementById('skillToTeach');
  
  if (skillToLearnSelect && skillToTeachSelect) {
    skillToLearnSelect.innerHTML = '<option value="">Выберите навык</option>' +
      targetUser.canTeach.map(skill => `<option value="${skill}">${skill}</option>`).join('');
    
    skillToTeachSelect.innerHTML = '<option value="">Выберите навык</option>' +
      currentUser.canTeach.map(skill => `<option value="${skill}">${skill}</option>`).join('');
    
    console.log('Skills populated - can learn:', targetUser.canTeach.length, 'can teach:', currentUser.canTeach.length);
  }
  
  // Set default date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const exchangeDateInput = document.getElementById('exchangeDate');
  if (exchangeDateInput) {
    exchangeDateInput.value = tomorrow.toISOString().split('T')[0];
  }
  
  // Set default time
  const exchangeTimeInput = document.getElementById('exchangeTime');
  if (exchangeTimeInput) {
    exchangeTimeInput.value = '15:00';
  }
  
  showModal('exchangeModal');
}

function showEditProfileModal() {
  const currentUser = getCurrentUser();
  if (!currentUser) return;
  
  const editFirstName = document.getElementById('editFirstName');
  const editLastName = document.getElementById('editLastName');
  const editClass = document.getElementById('editClass');
  const editCanTeach = document.getElementById('editCanTeach');
  const editWantToLearn = document.getElementById('editWantToLearn');
  
  if (editFirstName) editFirstName.value = currentUser.firstName;
  if (editLastName) editLastName.value = currentUser.lastName;
  if (editClass) editClass.value = currentUser.class;
  if (editCanTeach) editCanTeach.value = currentUser.canTeach.join(', ');
  if (editWantToLearn) editWantToLearn.value = currentUser.wantToLearn.join(', ');
  
  showModal('editProfileModal');
}

function showChatModal(userId) {
  const user = appData.users.find(u => u.id === userId);
  if (!user) return;
  
  const chatPartnerName = document.getElementById('chatPartnerName');
  if (chatPartnerName) {
    chatPartnerName.textContent = `Чат с ${user.firstName} ${user.lastName}`;
  }
  
  const messagesContainer = document.getElementById('chatMessages');
  const messages = chatMessages[userId] || [];
  
  if (messagesContainer) {
    messagesContainer.innerHTML = messages.map(msg => `
      <div class="chat-message chat-message--${msg.sender}">
        ${msg.message}
        <div class="chat-time" style="font-size: var(--font-size-xs); opacity: 0.7; margin-top: var(--space-4);">${msg.time}</div>
      </div>
    `).join('');
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  showModal('chatModal');
  selectedUserForExchange = userId; // Reuse this variable for chat
}

// Event handlers
function handleSkillFilter(filter) {
  currentFilter = filter;
  
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.filter === filter) {
      btn.classList.add('active');
    }
  });
  
  renderCatalog();
}

function handleExchangeSubmit() {
  const skillToLearn = document.getElementById('skillToLearn')?.value;
  const skillToTeach = document.getElementById('skillToTeach')?.value;
  const date = document.getElementById('exchangeDate')?.value;
  const time = document.getElementById('exchangeTime')?.value;
  const message = document.getElementById('exchangeMessage')?.value || '';
  
  console.log('Exchange form data:', { skillToLearn, skillToTeach, date, time, message });
  
  if (!skillToLearn || !skillToTeach || !date || !time) {
    showNotification('Пожалуйста, заполните все обязательные поля', 'error');
    return;
  }
  
  const currentUser = getCurrentUser();
  const targetUser = appData.users.find(u => u.id === selectedUserForExchange);
  
  if (!currentUser || !targetUser) {
    showNotification('Ошибка: пользователь не найден', 'error');
    return;
  }
  
  // Create new exchange
  const newExchange = {
    id: appData.exchanges.length + 1,
    initiator: `${currentUser.firstName} ${currentUser.lastName}`,
    target: `${targetUser.firstName} ${targetUser.lastName}`,
    skillOffered: skillToTeach,
    skillWanted: skillToLearn,
    date,
    time,
    status: 'pending',
    message
  };
  
  appData.exchanges.push(newExchange);
  
  hideModal('exchangeModal');
  showNotification('Предложение отправлено!', 'success');
  
  // Clear form
  const exchangeForm = document.getElementById('exchangeForm');
  if (exchangeForm) {
    exchangeForm.reset();
  }
}

function handleProfileSave() {
  const currentUser = getCurrentUser();
  if (!currentUser) return;
  
  const editFirstName = document.getElementById('editFirstName')?.value;
  const editLastName = document.getElementById('editLastName')?.value;
  const editClass = document.getElementById('editClass')?.value;
  const editCanTeach = document.getElementById('editCanTeach')?.value;
  const editWantToLearn = document.getElementById('editWantToLearn')?.value;
  
  if (editFirstName) currentUser.firstName = editFirstName;
  if (editLastName) currentUser.lastName = editLastName;
  if (editClass) currentUser.class = editClass;
  if (editCanTeach) {
    currentUser.canTeach = editCanTeach.split(',').map(s => s.trim()).filter(s => s);
  }
  if (editWantToLearn) {
    currentUser.wantToLearn = editWantToLearn.split(',').map(s => s.trim()).filter(s => s);
  }
  
  hideModal('editProfileModal');
  renderProfile();
  updateUIForAuth(true);
  showNotification('Профиль обновлен!', 'success');
}

function handleNotificationClick(notificationId) {
  const notification = appData.notifications.find(n => n.id === notificationId);
  if (!notification) return;
  
  notification.isRead = true;
  
  if (notification.type === 'exchange_proposal') {
    showNotificationModal(notification);
  }
  
  renderNotifications();
  hideDropdowns();
}

function showNotificationModal(notification) {
  const modalBody = document.getElementById('notificationModalBody');
  if (modalBody) {
    modalBody.innerHTML = `
      <div>
        <strong>${notification.fromUser}</strong> предлагает обмен:
      </div>
      <div style="margin: var(--space-16) 0;">
        <strong>Предлагает:</strong> ${notification.data.skillOffered}<br>
        <strong>Хочет изучить:</strong> ${notification.data.skillWanted}<br>
        <strong>Дата:</strong> ${formatDate(notification.data.date)} в ${notification.data.time}<br>
        <strong>Сообщение:</strong> ${notification.data.message}
      </div>
    `;
  }
  
  showModal('notificationModal');
  selectedUserForExchange = notification.fromUserId;
}

function handleExchangeAccept() {
  const notification = appData.notifications.find(n => n.fromUserId === selectedUserForExchange && n.type === 'exchange_proposal');
  if (notification) {
    const newLesson = {
      id: appData.lessons.length + 1,
      skill: notification.data.skillOffered,
      partner: notification.fromUser,
      date: notification.data.date,
      time: notification.data.time,
      status: 'scheduled',
      type: 'learning'
    };
    
    appData.lessons.push(newLesson);
    
    // Remove notification
    appData.notifications = appData.notifications.filter(n => n.id !== notification.id);
    
    showNotification('Предложение принято!', 'success');
    hideModal('notificationModal');
    renderNotifications();
    renderLessons();
  }
}

function handleExchangeDecline() {
  const notification = appData.notifications.find(n => n.fromUserId === selectedUserForExchange && n.type === 'exchange_proposal');
  if (notification) {
    appData.notifications = appData.notifications.filter(n => n.id !== notification.id);
    showNotification('Предложение отклонено', 'info');
    hideModal('notificationModal');
    renderNotifications();
  }
}

function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput?.value.trim();
  
  if (!message) return;
  
  const userId = selectedUserForExchange;
  if (!chatMessages[userId]) {
    chatMessages[userId] = [];
  }
  
  const time = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  chatMessages[userId].push({
    sender: 'sent',
    message,
    time
  });
  
  messageInput.value = '';
  showChatModal(userId);
  
  // Simulate response after 2 seconds
  setTimeout(() => {
    const responses = [
      'Отлично! Жду встречи',
      'Согласен, давайте так и сделаем',
      'Хорошо, до встречи!',
      'Понятно, спасибо за информацию'
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    chatMessages[userId].push({
      sender: 'received',
      message: randomResponse,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    });
    
    const chatModal = document.getElementById('chatModal');
    if (chatModal && !chatModal.classList.contains('hidden')) {
      showChatModal(userId);
    }
  }, 2000);
}

function toggleNotifications() {
  const dropdown = document.getElementById('notificationsDropdown');
  if (dropdown) {
    dropdown.classList.toggle('hidden');
  }
}

function toggleProfileMenu() {
  const menu = document.getElementById('profileMenu');
  if (menu) {
    menu.classList.toggle('hidden');
  }
}

function hideDropdowns() {
  const notificationsDropdown = document.getElementById('notificationsDropdown');
  const profileMenu = document.getElementById('profileMenu');
  
  if (notificationsDropdown) notificationsDropdown.classList.add('hidden');
  if (profileMenu) profileMenu.classList.add('hidden');
}

function getCategorySkills(category) {
  const skillMap = {
    'Программирование': ['Python', 'JavaScript', 'Java', 'C++', 'HTML', 'CSS'],
    'Музыка': ['Гитара', 'Фортепиано', 'Вокал', 'Музыкальная теория', 'Барабаны'],
    'Языки': ['Английский', 'Французский', 'Немецкий', 'Испанский', 'Китайский'],
    'Искусство': ['Рисование', 'Дизайн', 'Фотография', 'Живопись', 'Скульптура'],
    'Наука': ['Математика', 'Физика', 'Химия', 'Биология', 'Астрономия'],
    'Спорт': ['Футбол', 'Баскетбол', 'Теннис', 'Плавание', 'Бег']
  };
  
  return skillMap[category] || [];
}