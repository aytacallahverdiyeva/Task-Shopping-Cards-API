const cardContainer = document.getElementById('card-container');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const clearCartBtn = document.getElementById('clear-cart-btn');
let cart = [];

// Fetch data from fake store API
axios
  .get('https://fakestoreapi.com/products')
  .then((response) => {
    const data = response.data;
    // Display data on the cards
    data.forEach((product) => {
      const card = createCard(product);
      cardContainer.appendChild(card);
    });
  })
  .catch((error) => {
    console.log('Error:', error);
  });

  //Add html
function createCard(product) {
  const card = document.createElement('div');
  card.classList.add('card');

  const image = document.createElement('img');
  image.src = product.image;
  card.appendChild(image);

  const title = document.createElement('h3');
  title.textContent = product.title;
  card.appendChild(title);

  const price = document.createElement('p');
  price.textContent = 'Price: $' + product.price;
  card.appendChild(price);

  const button = document.createElement('button');
  button.textContent = 'Add to Cart';
  card.appendChild(button);

  // Add event listener to "Add to Cart" button
  button.addEventListener('click', () => {
    addToCart(product);
  });

  return card;
}

function addToCart(product) {
  cart.push(product);
  updateCart();
}

function removeCartItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = '';

  let totalPrice = 0;

  cart.forEach((product, index) => {
    const li = document.createElement('li');
    li.textContent = product.title + ' - $' + product.price;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');

    // Add event listener to "Remove" button
    removeBtn.addEventListener('click', () => {
      removeCartItem(index);
		//removeCartItem
    });

    li.appendChild(removeBtn);
    cartItems.appendChild(li);
    totalPrice += product.price;
  });

  cartTotal.textContent = 'Total: $' + totalPrice.toFixed(2);
}
clearCartBtn.addEventListener('click', () => {
  cart = [];
  updateCart();
});
