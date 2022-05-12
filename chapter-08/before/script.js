
/** On Load */
(function() {
  const fruits = { grapes: 3.23, pineapple: 2.29, strawberries: 4.62 }
  const table = document.querySelector('table');
  const inputs = Array.from(table.querySelectorAll('input'))
  
  calculateTotals()

  inputs.forEach(input => {
    input.addEventListener('change', calculateTotals)
  })
  
  function calculateTotals() {
    'use strict';
    let total = 0;
    let totalQty = 0;
    inputs.forEach(input => {
      const row = input.closest('tr');
      const qty = Number(input.value);
      const itemTotal = qty * fruits[input.name];
      const itemTotalCell = row.querySelector('td[data-name="Total"]');
      itemTotalCell.innerText = '$ ' + itemTotal.toFixed(2);
      total += itemTotal;
      totalQty += qty;
    })
    const totalCell = document.getElementById('total');
    const orderTotal = '$ ' + total.toFixed(2);
    totalCell.innerText = orderTotal;
    const orderTotalElem = document.getElementById('orderTotal');
    orderTotalElem.innerText = orderTotal;

    const totalQtyElem = document.getElementById('itemQty');
    totalQtyElem.innerText = totalQty;

    const grandTotalElem = document.getElementById('grandTotal');
    const grandTotal = total + 5;
    grandTotalElem.innerText = '$ ' + grandTotal.toFixed(2);
  }
})()
