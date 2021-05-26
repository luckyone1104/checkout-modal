function menuButtonClick(pageToShow) {
  if (pageToShow.classList.contains('menu-element_disabled')) {
    return null;
  }
  switchPages(checkoutPages[menuButtons.indexOf(pageToShow)]);
}

// function removeMenuElementSelectedStyle(menuButton) {
//   menuButton.classList.remove('payment-modal__menu-element_selected');
// }

// function addMenuElementSelectedStyle(menuButton) {
//   moveMenuSelectedLine(menuButton);
//   menuButton?.classList.add('payment-modal__menu-element_selected');
// }

// function moveMenuSelectedLine(selectedMenuButton) {
//   switch(menuButtons.indexOf(selectedMenuButton)) {
//     case 0:
//       menuSelectLine.style.left='0%';
//       break;
//     case 1:
//       menuSelectLine.style.left='25%';
//       break;
//     case 2:
//       menuSelectLine.style.left='50%';
//       break;
//     case 3:
//       menuSelectLine.style.left='75%';
//       break;
//   }
// }