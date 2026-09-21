const billingForm = document.getElementById('billingForm');

billingForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const customerName = document.getElementById('customerName').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();
  const price = Number(document.getElementById('price').value);
  const quantity = Number(document.getElementById('quantity').value);

  if (!customerName || !phone || !address || !price || !quantity) {
    alert('Please fill in all fields correctly.');
    return;
  }

  if (quantity <= 0 || price <= 0) {
    alert('Price and quantity must be greater than zero.');
    return;
  }

  const totalPrice = price * quantity;
  const gst = totalPrice * 0.18;
  const grandTotal = totalPrice + gst;

  document.getElementById('resultName').textContent = customerName;
  document.getElementById('resultPhone').textContent = phone;
  document.getElementById('resultAddress').textContent = address;
  document.getElementById('totalPrice').textContent = `₹${totalPrice.toFixed(2)}`;
  document.getElementById('gst').textContent = `₹${gst.toFixed(2)}`;
  document.getElementById('grandTotal').textContent = `₹${grandTotal.toFixed(2)}`;
});
