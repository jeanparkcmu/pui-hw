let cartArray = JSON.parse(localStorage.getItem("cart")) || [];
let totalPrice = 0; 

const rolls = {
    "Original": {
        "basePrice": 2.49,
        "imageFile": "original-cinnamon-roll.jpg"
    },
    "Apple": {
        "basePrice": 3.49,
        "imageFile": "apple-cinnamon-roll.jpg"
    },
    "Raisin": {
        "basePrice": 2.99,
        "imageFile": "raisin-cinnamon-roll.jpg"
    },
    "Walnut": {
        "basePrice": 3.49,
        "imageFile": "walnut-cinnamon-roll.jpg"
    },
    "Double-Chocolate": {
        "basePrice": 3.99,
        "imageFile": "double-chocolate-cinnamon-roll.jpg"
    },
    "Strawberry": {
        "basePrice": 3.99,
        "imageFile": "strawberry-cinnamon-roll.jpg"
    }    
};

const glazings = {
    "Keep original": 0,
    "Sugar milk": 0, 
    "Vanilla milk": 0.5, 
    "Double chocolate": 1.5
};

const packsizes = {
    "1": 1,
    "3": 3,
    "6": 5, 
    "12": 10
};

class Roll {
    constructor(rollType, rollGlazing, packSize, rollPrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = rollPrice;
    }

    calculateItemPrice() {
        let glazingPrice = glazings[this.glazing]; 
        let packPrice = packsizes[this.size]; 
        return (this.basePrice + glazingPrice) * packPrice; 
    }
}

function addToCart(rollitem, cartitem) {
    const template = document.querySelector('#cart-item-template');
    const clone = document.importNode(template.content, true);

    const itemImage = clone.querySelector('.item-image');
    const itemDesc = clone.querySelector('.item-desc');
    const itemPrice = clone.querySelector('.item-price');
    const removeButton = clone.querySelector('.remove');

    itemImage.src = 'assets/products/' + rolls[rollitem.type].imageFile;
    itemDesc.innerHTML = `${rollitem.type} Cinnamon Roll <br> ${rollitem.glazing} <br> Pack Size: ${rollitem.size}`;
    itemPrice.textContent = '$ ' + rollitem.calculateItemPrice().toFixed(2);

    removeButton.addEventListener('click', function() {
        let index = cartArray.findIndex(cartItem => 
            cartItem.type === cartitem.type && 
            cartItem.glazing === cartitem.glazing && 
            cartItem.packSize === cartitem.packSize
        );
    
        if (index !== -1) {
            cartArray.splice(index, 1);
        }
    
        const removeItemContainer = removeButton.closest('.item-wrap-container');
        removeItemContainer.remove();
    
        updateTotalPrice();
        saveCartToLocalStorage();
    });

    const cartContainer = document.querySelector('.cart-item-container'); 
    cartContainer.appendChild(clone);

    saveCartToLocalStorage();
}

for (let item of cartArray) {
    const rollInstance = new Roll(item.type, item.glazing, item.size, rolls[item.type].basePrice);
    addToCart(rollInstance, item);
    totalPrice += rollInstance.calculateItemPrice();
}

document.querySelector('.total-price').innerText = "$ " + totalPrice.toFixed(2);

function updateTotalPrice() {
    let total = 0;
    for (let item of cartArray) {
        const rollInstance = new Roll(item.type, item.glazing, item.size, rolls[item.type].basePrice);
        total += rollInstance.calculateItemPrice();
    }
    document.querySelector('.total-price').innerText = "$ " + total.toFixed(2);
}

function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cartArray));
    console.log("Content in Cart:", localStorage.getItem("cart")); 
}