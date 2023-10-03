const givenPrice = 2.49; 

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

function populate(){
    let glazingSelection = document.getElementById('glazing_choice');
    let packSizeSelection = document.getElementById('size_choice'); 

    Object.keys(glazings).forEach(key => {
        const option = document.createElement('option');
        option.value = key; 
        option.innerText = key; 
        glazingSelection.appendChild(option);
    });

    Object.keys(packsizes).forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.innerText = key;
        packSizeSelection.appendChild(option);
    });
}

function updatePrice(glazing, size) {
    let glazingSelection = document.getElementById('glazing_choice');
    let packSizeSelection = document.getElementById('size_choice');
    let priceDetail = document.querySelector('.price-detail'); 

    let basePrice = 2.49;
    let glazingPrice = glazings[glazingSelection.value];
    let packMultiplier = packsizes[packSizeSelection.value];

    let finalPrice = (basePrice + glazingPrice) * packMultiplier; 
    priceDetail.innerText = '$' + finalPrice.toFixed(2);
}

function glazingChange() {
    updatePrice();
}

function packSizeChange() {
    updatePrice();
}

populate();
updatePrice();

