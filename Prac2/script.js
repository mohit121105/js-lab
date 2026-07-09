function calculateBill() {

    var customerName = document.getElementById("name").value;
    let product = document.getElementById("product").value;
    let price = Number(document.getElementById("price").value);
    let quantity = Number(document.getElementById("quantity").value);

    const GST = 0.18;

    let subtotal = price * quantity;
    let gst = subtotal * GST;
    let total = subtotal + gst;

    const bill = {
        customerName,
        product,
        price,
        quantity,
        subtotal,
        gst,
        total
    };

    const {
        customerName: name,
        product: item,
        price: rate,
        quantity: qty,
        subtotal: sub,
        gst: tax,
        total: finalAmount
    } = bill;

    document.getElementById("output").innerHTML = `
        <h2>Billing Details</h2>
        <p><b>Customer Name:</b> ${name}</p>
        <p><b>Product Name:</b> ${item}</p>
        <p><b>Price:</b> ₹${rate.toFixed(2)}</p>
        <p><b>Quantity:</b> ${qty}</p>
        <p><b>Subtotal:</b> ₹${sub.toFixed(2)}</p>
        <p><b>GST (18%):</b> ₹${tax.toFixed(2)}</p>
        <h3>Total Amount: ₹${finalAmount.toFixed(2)}</h3>
    `;

    console.log(`Customer: ${name}`);
    console.log(`Product: ${item}`);
    console.log(`Total Bill: ₹${finalAmount.toFixed(2)}`);
}