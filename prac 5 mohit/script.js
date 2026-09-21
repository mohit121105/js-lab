const cart = [];

function displayCart() {

    const tbody = document.getElementById("cartBody");
    tbody.innerHTML = "";

    cart.forEach((item, index) => {

        tbody.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>₹${item.price}</td>
            <td>${item.quantity}</td>
            <td>₹${item.price * item.quantity}</td>
            <td>
                <button class="remove" onclick="removeItem(${index})">X</button>
            </td>
        </tr>
        `;
    });
}

function addItem() {

    const name = document.getElementById("itemName").value;
    const price = Number(document.getElementById("price").value);
    const quantity = Number(document.getElementById("quantity").value);

    if(name === "" || price <= 0 || quantity <= 0){
        alert("Enter valid item details.");
        return;
    }

    const item = {
        name: name,
        price: price,
        quantity: quantity
    };

    cart.push(item);

    displayCart();

    document.getElementById("itemName").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = "";
}

function calculateCart() {

    const totals = cart.map(item => item.price * item.quantity);

    const subtotal = totals.reduce((sum, value) => sum + value, 0);

    let discount = 0;

    if(subtotal >= 5000){
        discount = subtotal * 0.20;
    }
    else if(subtotal >= 3000){
        discount = subtotal * 0.10;
    }

    const finalTotal = subtotal - discount;

    document.getElementById("subtotal").textContent = "₹" + subtotal.toFixed(2);
    document.getElementById("discount").textContent = "₹" + discount.toFixed(2);
    document.getElementById("finalTotal").textContent = "₹" + finalTotal.toFixed(2);
}

function removeItem(index){

    cart.splice(index,1);

    displayCart();

    calculateCart();
}

function clearCart(){

    cart.length = 0;

    displayCart();

    calculateCart();
}