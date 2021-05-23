function removeOrderItem(orderItem) {
  orderItem.remove();
  changeTotalSum();
}

function changeTotalSum() {
  let total = 0;
  for (let price of document.querySelectorAll('.order-page__price')) {
    total += +price.innerHTML.split('$')[1];
  }
  let orderPageSumElement = document.querySelector('.order-page__total-sum');
  orderPageSumElement.innerHTML = '$' + total;

  if (total === 0) {
    orderPageSumElement.parentNode.parentNode.nextElementSibling.remove();
    orderPageSumElement.parentNode.parentNode.remove();
    document.querySelector('.menu-element__shipping-details').classList.add('menu-element_disabled');
  }
}