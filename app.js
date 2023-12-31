(function app() {
  const showAlert = document.getElementById('showAlertBtn');
  const toggleMenuBtn = document.getElementById('profile-menu');

  const accordion = document.getElementById('accordion');
  const expandCollapseAccordion = document.getElementById('toggleSetup');

  const profileMenu = document.getElementById('dropdown-menu');
  const notificationsMenu = document.getElementById('alertDropdown');
  const profileMenuMsg = document.getElementById('profileMenuMsg');
  const notificationsMenuMsg = document.getElementById('notificationsMenuMsg');

  const accordionItems = accordion.querySelectorAll('.accordion-item');
  const menuItems = profileMenu.querySelectorAll('[role="menuitem"]');
  const alertItems = document.querySelectorAll('.alert-item-icon');
  const checkStepsBtns = Array.from(
    document.querySelectorAll('[role="checkbox"]')
  );

  const plan = document.querySelector('.plan');
  const setup = document.querySelector('.setup-guide');
  const cancelPlan = plan.querySelector('.plan-content-right .cancel-btn');

  const progress = document.querySelector('.progress-bar');
  let completedStep = document.querySelector('.completed-step');

  let steps = 0;
  let maxSteps = 5;

  const checkboxIcons = `
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#8A8A8A" stroke-width="2.08333" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="5 5"></circle>
    </svg>
    |
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M22.0004 12C22.0004 13.9778 21.4139 15.9112 20.3151 17.5557C19.2162 19.2002 17.6545 20.4819 15.8272 21.2388C13.9999 21.9957 11.9893 22.1937 10.0495 21.8079C8.10965 21.422 6.32782 20.4696 4.9293 19.0711C3.53077 17.6725 2.57837 15.8907 2.19251 13.9509C1.80666 12.0111 2.00469 10.0004 2.76157 8.17317C3.51845 6.3459 4.80017 4.78412 6.44466 3.6853C8.08916 2.58649 10.0226 2 12.0004 2" stroke="#1C181D" stroke-width="2.08333" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
    |
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9996 2C13.9774 2 15.9108 2.58649 17.5553 3.6853C19.1998 4.78412 20.4816 6.3459 21.2384 8.17316C21.9953 10.0004 22.1933 12.0111 21.8075 13.9509C21.4216 15.8907 20.4692 17.6725 19.0707 19.0711C17.6722 20.4696 15.8903 21.422 13.9505 21.8079C12.0107 22.1937 10.0001 21.9957 8.1728 21.2388C6.34554 20.4819 4.78375 19.2002 3.68494 17.5557C2.58612 15.9112 1.99963 13.9778 1.99963 12" stroke="#1C181D" stroke-width="2.08333" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    |
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11" fill="#303030"></circle>
      <path d="M17.2738 8.52629C17.6643 8.91682 17.6643 9.54998 17.2738 9.94051L11.4405 15.7738C11.05 16.1644 10.4168 16.1644 10.0263 15.7738L7.3596 13.1072C6.96908 12.7166 6.96908 12.0835 7.3596 11.693C7.75013 11.3024 8.38329 11.3024 8.77382 11.693L10.7334 13.6525L15.8596 8.52629C16.2501 8.13577 16.8833 8.13577 17.2738 8.52629Z" fill="#fff"></path>
    </svg>
  `;

  let iconsIndex = checkboxIcons.split('|');
  let lastIcon = iconsIndex.length - 1;
  checkStepsBtns.forEach((button, index) => {
    let current = 0;

    button.setAttribute('aria-label', `Step ${index + 1} incomplete`);

    function handleCheckStepBtns(button) {
      const isChecked = button.getAttribute('checked') === 'true';
      const ariaChecked = button.getAttribute('aria-checked') === 'true';
      button.setAttribute('checked', !isChecked);
      button.setAttribute('aria-checked', !ariaChecked);
      steps += isChecked ? -1 : 1;
      if (!isChecked) {
        button.setAttribute('aria-label', `Step ${index + 1}  complete`);
      } else {
        button.setAttribute('aria-label', `Step ${index + 1}  incomplete`);
      }
      // update progress width
      setTimeout(() => {
        progress.style.width = (steps / maxSteps) * 100 + '%';
      }, 150);
      completedStep.textContent = steps;

      if (current === 0 && !isChecked) {
        const iconsInterval = setInterval(() => {
          current++;
          button.innerHTML = iconsIndex[current];

          // rotate the 3rd and 2nd to the last icons
          if (current === lastIcon - 2 || current === lastIcon - 1) {
            button.firstElementChild.classList.add('rotate');
          } else {
            button.firstElementChild.classList.remove('rotate');
            button.innerHTML = iconsIndex[current];
          }
          if (current >= lastIcon) {
            clearInterval(iconsInterval);
            button.innerHTML = iconsIndex[lastIcon];
            button.firstElementChild.classList.add('completed-icon');
          }
        }, 500);
      }
    }

    button.addEventListener('click', e => {
      handleCheckStepBtns(button);
      const isCheckedFalse = button.getAttribute('checked') === 'false';
      if (isCheckedFalse) {
        current = 0;
        button.innerHTML = iconsIndex[0];
      }
      // Get all unchecked checkboxes
      let uncheckedBoxes = checkStepsBtns.filter(
        btn => btn.getAttribute('checked') === 'false'
      );

      // If there are any unchecked boxes, focus on the first one
      if (uncheckedBoxes.length > 0) {
        uncheckedBoxes[0].focus();
      }
    });

    // set the empty button element to first svg on the array
    button.innerHTML = iconsIndex[current];
  });

  alertItems.forEach((item, index) => {
    item.addEventListener('focus', e => {});
  });

  function openNotificationsMenu() {
    showAlert.setAttribute('aria-expanded', 'true');
  }

  function closeNotificationsMenu() {
    showAlert.setAttribute('aria-expanded', 'false');
  }

  function closeProfileMenu() {
    toggleMenuBtn.setAttribute('aria-expanded', 'false');
    profileMenu.classList.remove('show');
  }

  function openProfileMenu() {
    toggleMenuBtn.setAttribute('aria-expanded', 'true');
    profileMenuMsg.ariaLabel = 'menu Opened';
    menuItems.item(0).focus();

    profileMenu.addEventListener('keyup', handleProfileEscKey);

    menuItems.forEach(menuitem => {
      menuitem.addEventListener('keydown', e => {
        handleProfileKeyEvents(e);
        e.preventDefault();
      });
    });
  }

  // key events for profile menu dropdown
  function handleProfileKeyEvents(e) {
    let currentIndex = Array.from(menuItems).indexOf(e.target);
    let lastMenuItem = menuItems.length - 1;

    // mouse controls for dropdown menu items
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      let nextIndex = currentIndex === lastMenuItem ? 0 : currentIndex + 1;
      menuItems[nextIndex].focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      let prevIndex = currentIndex === 0 ? lastMenuItem : currentIndex - 1;
      menuItems[prevIndex].focus();
    } else if (e.key === 'Home') {
      menuItems[0].focus();
    }
  }

  function toggleProfileMenu() {
    profileMenu.classList.toggle('show');
    showAlert.setAttribute('aria-expanded', 'false');
    notificationsMenuMsg.ariaLabel = 'alerts menu closed';
    if (notificationsMenu.classList.contains('show')) {
      notificationsMenu.classList.remove('show');
    }
    const modalExpanded =
      toggleMenuBtn.getAttribute('aria-expanded') === 'true';

    if (modalExpanded) {
      profileMenuMsg.ariaLabel = 'menu closed';
      closeProfileMenu();
    } else {
      profileMenuMsg.ariaLabel = 'menu opened';
      openProfileMenu();
    }
  }

  function toggleNotifications() {
    notificationsMenu.classList.toggle('show');
    toggleMenuBtn.setAttribute('aria-expanded', 'false');
    if (profileMenu.classList.contains('show')) {
      profileMenu.classList.remove('show');
    }
    const modalExpanded = showAlert.getAttribute('aria-expanded') === 'true';

    if (modalExpanded) {
      notificationsMenuMsg.ariaLabel = 'alerts menu closed';
      closeNotificationsMenu();
    } else {
      notificationsMenuMsg.ariaLabel = 'alerts menu opened';
      openNotificationsMenu();
    }
  }

  function handleSetupKeyPress(e) {
    if (e.key === 'Enter') {
      toggleSetup();
    }
  }

  function handleProfileEscKey(e) {
    if (e.key === 'Escape') {
      closeProfileMenu();
    }
  }

  
  function handleCheckboxes() {
    let currentFocused = 0;
    checkStepsBtns.forEach((btn, index) => {
      btn.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          const isChecked = btn.getAttribute('checked') === 'true';
          if (!isChecked) {
            // After handling the checkbox, move focus to the next checkbox
            currentFocused = (currentFocused + 1) % checkStepsBtns.length;
            checkStepsBtns[currentFocused].focus();
          }
        } else if (e.key === 'ArrowDown') {
          currentFocused = (currentFocused + 1) % checkStepsBtns.length;
          checkStepsBtns[currentFocused].focus();
          e.preventDefault();
        } else if (e.key === 'ArrowUp') {
          currentFocused =
          (currentFocused - 1 + checkStepsBtns.length) %
          checkStepsBtns.length;
          checkStepsBtns[currentFocused].focus();
          e.preventDefault();
        }
      });
    });
  }

  function toggleSetup() {
    let isVisible = getComputedStyle(accordion).display;

    if (isVisible === 'flex') {
      accordion.style.display = 'none';
      accordion.ariaLabel = 'Setup closed';
      accordion.ariaExpanded = 'false';
      expandCollapseAccordion.ariaExpanded = false;
      expandCollapseAccordion.firstElementChild.style.transform = `rotate(${180}deg)`;
    } else {
      accordion.style.display = 'flex';
      accordion.ariaLabel = 'Setup opened';
      accordion.ariaExpanded = 'true';
      expandCollapseAccordion.ariaExpanded = true;
      expandCollapseAccordion.firstElementChild.style.transform = `rotate(-${180}deg)`;
    }
  }

  expandCollapseAccordion.addEventListener('keypress', e => {
    handleSetupKeyPress(e);
  });

  function toggleAccordionItem(sectionId, item) {
    accordionItems.forEach(item => {
      item.classList.remove('open');
      item.setAttribute('aria-expanded', false);
    });

    if (!sectionId.classList.contains('open')) {
      item.classList.add('open');
      item.setAttribute('aria-expanded', true);
    }
  }

  accordionItems.forEach((item, i) => {
    item.setAttribute('id', `section${i + 1}`);
    const sectionId = document.getElementById(item.id);
    item.firstChild.addEventListener('focus', e => {
      if (!sectionId.classList.contains('open')) {
        item.setAttribute('tabindex', '-1');
      }
    });
    item.firstElementChild.addEventListener('click', () => {
      toggleAccordionItem(sectionId, item);
    });
    checkStepsBtns.forEach((button, i) => {
      button.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
          toggleAccordionItem(sectionId, item);
        }
      });
    });
  });
  cancelPlan.addEventListener('click', () => {
    plan.remove();
    setup.classList.add('transform');
  });

  showAlert.addEventListener('click', toggleNotifications);
  expandCollapseAccordion.addEventListener('click', () => {
    toggleSetup();
  });
  toggleMenuBtn.addEventListener('click', toggleProfileMenu);
  handleCheckboxes();
})();
