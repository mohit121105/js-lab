const products = {

Electronics: [
{ name: "Laptop", price: 59999 },
{ name: "Smartphone", price: 24999 },
{ name: "Smart Watch", price: 7999 },
{ name: "Wireless Earbuds", price: 2999 },
{ name: "Bluetooth Speaker", price: 4499 }
],

Fashion: [
{ name: "T-Shirt", price: 799 },
{ name: "Jeans", price: 1499 },
{ name: "Shoes", price: 2999 },
{ name: "Jacket", price: 3999 },
{ name: "Watch", price: 2499 }
],

Grocery: [
{ name: "Rice (5kg)", price: 450 },
{ name: "Wheat Flour (10kg)", price: 520 },
{ name: "Sugar (1kg)", price: 55 },
{ name: "Cooking Oil (1L)", price: 180 },
{ name: "Tea (500g)", price: 275 }
],

Books: [
{ name: "Java Programming", price: 699 },
{ name: "Python Programming", price: 799 },
{ name: "Data Structures", price: 899 },
{ name: "Web Development", price: 999 },
{ name: "Operating Systems", price: 850 }
],

Home: [
{ name: "Mixer Grinder", price: 3499 },
{ name: "Microwave Oven", price: 8999 },
{ name: "Ceiling Fan", price: 2499 },
{ name: "Vacuum Cleaner", price: 6499 },
{ name: "Electric Iron", price: 1499 }
]

};

function loadProducts(){

let category=document.getElementById("category").value;

let product=document.getElementById("product");

product.innerHTML="<option>Select Product</option>";

if(category=="") return;

products[category].forEach(function(item){

let option=document.createElement("option");

option.value=item.price;

option.text=item.name;

product.appendChild(option);

});

document.getElementById("price").value="";

}

function showPrice(){

let category=document.getElementById("category").value;

let productName=document.getElementById("product").selectedOptions[0].text;

let list=products[category];

for(let item of list){

if(item.name==productName){

document.getElementById("price").value=item.price;

}

}

}

function generateBill(){

var customer=document.getElementById("customer").value;

let category=document.getElementById("category").value;

let product=document.getElementById("product").selectedOptions[0].text;

const website="Mohit Shopping Mart";

let price=Number(document.getElementById("price").value);

let quantity=Number(document.getElementById("quantity").value);

if(customer=="" || category=="" || price==0){

alert("Please fill all details.");

return;

}

let subtotal=price*quantity;

let gstRate=18;

let gst=subtotal*gstRate/100;

let delivery=subtotal>=1000?0:50;

let discount=subtotal>=10000?subtotal*0.10:0;

let total=subtotal+gst+delivery-discount;

let isMember=true;

let coupon=null;

let stock;

let coercion="100"+20;

let conversion=Number("100")+20;

document.getElementById("output").innerHTML=`

<div class="invoice">

<h3>${website}</h3>

<hr>

<p><strong>Customer :</strong> ${customer}</p>

<p><strong>Category :</strong> ${category}</p>

<p><strong>Product :</strong> ${product}</p>

<p><strong>Price :</strong> ₹${price.toLocaleString()}</p>

<p><strong>Quantity :</strong> ${quantity}</p>

<hr>

<p><strong>Subtotal :</strong> ₹${subtotal.toLocaleString()}</p>

<p><strong>GST (18%) :</strong> ₹${gst.toFixed(2)}</p>

<p><strong>Delivery Charge :</strong> ₹${delivery.toFixed(2)}</p>

<p><strong>Discount :</strong> ₹${discount.toFixed(2)}</p>

<hr>

<p class="total">Grand Total : ₹${total.toFixed(2)}</p>

<hr>

<p style="text-align:center;color:green;">
✔ Thank you for shopping with us!
</p>

</div>

`;

console.log(customer);
console.log(price);
console.log(isMember);
console.log(stock);
console.log(coupon);
console.log(coercion);
console.log(conversion);

}