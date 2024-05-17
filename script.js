let cartItems = [];

document.getElementById("buy-btn").addEventListener("click", buyItems);

function addToCart(productName, price) {
    cartItems.push({ name: productName, price: price });
    updateCart();
}

function updateCart() {
    let cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';
    let total = 0;
    cartItems.forEach((item, index) => {
        let li = document.createElement('li');
        li.className = 'cart-item';
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`; // Fixed template literal
        let removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = function() {
            cartItems.splice(index, 1);
            updateCart();
        };
        li.appendChild(removeBtn);
        cartList.appendChild(li);
        total += item.price;
    });
    let totalElement = document.getElementById('total');
    totalElement.textContent = '$' + total.toFixed(2); // Added $ sign
}

function buyItems() {
    // Generate receipt
    var receipt = generateReceipt();

    // Display receipt
    displayReceipt(receipt);

    // Reset cart items
    cartItems = [];
    updateCart();

    // Alert user for purchase
    alert('Thank you for your purchase!');
}

function generateReceipt() {
    var receipt = "";
    cartItems.forEach((item) => {
        receipt += `<li style="color: black;">${item.name} - $${item.price.toFixed(2)}</li>`; // Fixed template literal
    });
    receipt += `<li style="color: black; font-weight: bold;">Total: $${getTotal().toFixed(2)}</li>`; // Fixed template literal and included $ sign
    return receipt;
}

function closeReceipt() {
    var receiptContainer = document.getElementById('receipt-container');
    receiptContainer.style.display = 'none'; // Hide the receipt
}

function displayReceipt(receipt) {
    // Display receipt
    var receiptContainer = document.getElementById('receipt-container');
    var receiptItems = document.getElementById('receipt-items');
    receiptItems.innerHTML = ''; // Clear previous receipt items

    // Populate receipt items
    receiptItems.innerHTML = receipt;

    // Show receipt
    receiptContainer.style.display = 'block';
}

function getTotal() {
    let total = 0;
    cartItems.forEach((item) => {
        total += item.price;
    });
    return total;
}
