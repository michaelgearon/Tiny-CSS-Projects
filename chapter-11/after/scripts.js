(() => {
  'use strict';

  let expanded = false;
  const container = document.getElementById('share');
  const shareButton = document.getElementById('shareButton');
  const menuItems = Array.from(container.querySelectorAll('li'));
  const menu = container.querySelector('menu');
  
  addButtonListeners();
  addListListeners();
  addTransitionListeners();
  
  /**
   * Adds event listeners to share button for clicks and key presses
   * to open and close the menu both via keyboard and mouse
   */
  function addButtonListeners() {    
    shareButton.addEventListener('click', toggleMenu);
    shareButton.addEventListener('keyup', handleToggleButtonKeypress);
  }

  /**
   * Adds event listens to links for clicks and key presses
   * to handle keyboard navigation within the menu
   */
  function addListListeners() {
    menuItems.forEach(li => {
        const link = li.querySelector('a');
        link.addEventListener('keyup', handleMenuItemKeypress);
        link.addEventListener('keydown', handleTab);
        link.addEventListener('click', toggleMenu);
      })
  }

  /**
   * Add event listeners to menu in order to know when transitions start and end
   */
  function addTransitionListeners() {
    menu.addEventListener('transitionstart', handleAnimationStart);
    menu.addEventListener('transitionend', handleAnimationEnd);
  }

  /**
   * Handles keyboard up and down arrow functionality or the share button
   * @param {*} event 
   */
  function handleToggleButtonKeypress(event) {
    switch(event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        if (!expanded) { toggleMenu(); }
        moveToNext();
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        if (expanded) { toggleMenu(); }
        break;
    }
  }

  /**
   * Handle keypress on links for keyboard navigation
   * within the menu including exiting the menu
   * @param {*} event 
   */
  function handleMenuItemKeypress(event) {
    switch(event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        moveToNext();
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        if (event.altKey === true) {
          navigate(event);
          toggleMenu();
        } else {
          moveToPrevious();
        }
        break;
      case 'Enter':
        toggleMenu();
        break;
      case ' ':
        navigate(event)
        toggleMenu();
        break;
      case 'Tab':
        event.preventDefault();
        toggleMenu();
        break;
      case 'Escape':
        toggleMenu();
        break;
      case 'Home':
        moveToNext(0);
        break;
      case 'End':
        moveToNext(menuItems.length - 1);
        break;
    }
  }

  /**
   * Prevents tab from navigating between the links because on tab we want to return
   * focus to the share button rather than go to the next link
   * @param {*} event 
   * @returns 
   */
  function handleTab(event) {
    if (event.key !== 'Tab') { return; }
    event.preventDefault();
  }

  /**
   * Open and close the menu
   * @param {*} event 
   */
  function toggleMenu(event) {
    expanded = !expanded;
    shareButton.ariaExpanded = expanded;
    container.classList.toggle('share_expanded');
    if (expanded) {
      menuItems.forEach(li => li.removeAttribute('tabindex'));
    }
    if (!expanded) {
      menuItems.forEach(li => {
        li.removeAttribute('data-current');
        li.tabIndex = -1;
      })
      shareButton.focus();
    }
  }

  /**
   * When next is defined, moves the focus to the specific item by index.
   * Otherwise will cycle through the links returning to the top when user reaches the last item in the menu
   * @param {*} next 
   */
  function moveToNext(next = undefined) {
    const selectedIndex = menuItems.findIndex(li => li.dataset.current  === 'true');
    
    let newIndex;
    if (next) { newIndex = next; }
    else if (selectedIndex === -1 || selectedIndex ===  menuItems.length - 1) { newIndex = 0; }
    else { newIndex = selectedIndex + 1; }

    if (selectedIndex !== -1) { menuItems[selectedIndex].removeAttribute('data-current'); }
    menuItems[newIndex].setAttribute('data-current', 'true');
    menuItems[newIndex].querySelector('a').focus();
  }

  /**
   * Moves focus to the previous link and returns user to the bottom of the list
   * when they reach the first item in the menu
   */
  function moveToPrevious() {
    const selectedIndex = menuItems.findIndex(li => li.dataset.current);
    const newIndex = selectedIndex < 1 ? menuItems.length - 1 : selectedIndex - 1;
    if (selectedIndex !== -1) { menuItems[selectedIndex].removeAttribute('data-current'); }
    menuItems[newIndex].setAttribute('data-current', 'true');
    menuItems[newIndex].querySelector('a').focus();
  }

  /**
   * Navigates the user when the action is keyboard triggered and not the default click or enter.
   * Used when the user presses space bar while on a menu item
   * @param {*} event 
   */
  function navigate(event) {
    const url = event.target.href;
    window.open(url);
  }

  /**
   * Hides the overflow when menu is closing
   */
  function handleAnimationStart() {
    //  we have just asked it to close, therefore expanded is not false
    if (!expanded) { menu.style.overflow = 'hidden'; }
  }

  /**
   * If open, we show the overflow to allow the magnified icon to expand outside of the container
   */
  function handleAnimationEnd() {
    if (expanded) { menu.style.overflow = 'visible'; }
  }
})()
