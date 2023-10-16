const sectionlist = document.querySelectorAll(".product-section"); 

for (let i = 0; i < sectionlist.length; i++) {
    const item = sectionlist[i];
    const key = Object.keys(rolls)[i]; 
    const aref = item.parentElement;
    aref.href = `product-detail.html?roll=${key}`;
}

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get("roll"); 

if (rolls[rollType]) {
    const rollvalue = rolls[rollType]; 
    document.querySelector('.cinna-roll').textContent = `${rollType} cinnamon roll`; 
    document.querySelector('.og-detail').src = `assets/products/${rollvalue.imageFile}`;
    document.querySelector('.price-detail').textContent = "$" + rollvalue.basePrice.toFixed(2);
}

let cart = JSON.parse(localStorage.getItem("cart")) || []; 

class Roll {
    constructor(rollType, glazingSelection, packsizeSelection, basePrice) {
        this.type = rollType;
        this.glazing =  glazingSelection;
        this.size = packsizeSelection;
        this.basePrice = basePrice;
    }
}

document.querySelector(".addtocart").addEventListener("click", addToCart); 

function addToCart() {
    const rollvalue = rolls[rollType]; 
    const glazingSelection = document.querySelector("#glazing_choice").value;
    const packSizeSelection = document.querySelector("#size_choice").value;
    const basePrice = rolls[rollType].basePrice;
    const addedroll = new Roll(rollType, glazingSelection, packSizeSelection, basePrice);
    cart.push(addedroll); 
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Content in Cart:", JSON.parse(localStorage.getItem("cart")));
}
