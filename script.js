let CartIcon = document.querySelector("#cart-icon");
let Cart = document.querySelector(".cart");
let CloseCart = document.querySelector("#close-cart");

CartIcon.onclick = () => {
  Cart.classList.add("active");
};

CloseCart.onclick = () => {
  Cart.classList.remove("active");
};

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  //console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  document
    .getElementsByName("btn-buy")[0]
    .addEventListener("click", buyButtonClicket);
}
function buyButtonClicket() {
  alert("your order is placed");
  var cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotal();
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}

function quantitychanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}
function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innertext;
  var price = shopProducts.getElementsByClassName("price")[0].innertext;
  var productIMG = shopProducts.getElementsByClassName("product-img")[0].src;
  addproductToCart(title, price, productIMG);
  updateTotal();
}
function addproductToCart(title, price, productIMG) {
  var cartShopbox = document.createElement("div");
  cartShopbox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemsNames.length; i++) {
    alert("you have already add this item to cart");
    return;
  }
}
var cartBoxContent = `
                <img src="${productImg}" alt="" class="cart-img">
                <div class="detail-box">
                          <div class="cart-product-title">${title}</div>
                          <div class="cart-price">${price}</div>
                          <input type="number" value="1" class="cart-quantitys">
  

                </div> 
                <i class='bx bxs-trash-alt cart-remove'></i>`;
cartShopbox.innerHTML = cartBoxContent;
cartItems.append(cartShopbox);
cartShopbox
  .getElementsByClassName("cart-remove")[0]
  .addEventListener("click", removeCartItem);
cartShopbox
  .getElementsByClassName("cart-quantity")[0]
  .addEventListener("change", quantityChanged);

function updateTotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innertext.replace("$"));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;

  document.getElementsByClassName("total-price")[0].innertext = "$" + total;
}
