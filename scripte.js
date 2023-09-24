class ShoppingCart {
    constructor() {
      this.items = {};
    }
  
    addItem(itemName, quantity, pricePerUnit) {
      if (itemName in this.items) {
        this.items[itemName].quantity += quantity;
      } else {
        this.items[itemName] = { quantity, pricePerUnit, liked: false };
      }
    }
  
    removeItem(itemName) {
      if (itemName in this.items) {
        delete this.items[itemName];
      }
    }
  
    updateQuantity(itemName, newQuantity) {
      if (itemName in this.items) {
        this.items[itemName].quantity = newQuantity;
      }
    }
  
    toggleLike(itemName) {
      if (itemName in this.items) {
        this.items[itemName].liked = !this.items[itemName].liked;
      }
    }
  
    calculateTotal() {
      let total = 0;
      for (const itemName in this.items) {
        const item = this.items[itemName];
        total += item.quantity * item.pricePerUnit;
      }
      return total.toFixed(2);
    }
  
    renderCart() {
      const cartContainer = document.querySelector('.item-list');
      cartContainer.innerHTML = '';
  
      for (const itemName in this.items) {
        const item = this.items[itemName];
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
  
        const likeButton = document.createElement('button');
        likeButton.classList.add('like-button');
        likeButton.innerHTML = item.liked ? '❤️' : '🤍';
        likeButton.addEventListener('click', () => {
          this.toggleLike(itemName);
          this.renderCart();
        });
  
        const itemNameElement = document.createElement('span');
        itemNameElement.textContent = itemName;
  
        const quantityElement = document.createElement('span');
        quantityElement.textContent = `Quantity: ${item.quantity}`;
  
        const priceElement = document.createElement('span');
        priceElement.textContent = `$${(item.quantity * item.pricePerUnit).toFixed(2)}`;
  
        const addButton = document.createElement('button');
        addButton.textContent = '+';
        addButton.addEventListener('click', () => {
          this.updateQuantity(itemName, item.quantity + 1);
          this.renderCart();
        });
  
        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.addEventListener('click', () => {
          if (item.quantity > 1) {
            this.updateQuantity(itemName, item.quantity - 1);
            this.renderCart();
          } else {
            this.removeItem(itemName);
            this.renderCart();
          }
        });
  
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
          this.removeItem(itemName);
          this.renderCart();
        });
  
        itemElement.appendChild(likeButton);
        itemElement.appendChild(itemNameElement);
        itemElement.appendChild(quantityElement);
        itemElement.appendChild(priceElement);
        itemElement.appendChild(addButton);
        itemElement.appendChild(minusButton);
        itemElement.appendChild(deleteButton);
  
        cartContainer.appendChild(itemElement);
      }
  
      const totalPriceElement = document.getElementById('totalPrice');
      totalPriceElement.textContent = this.calculateTotal();
    }
  }
  
  // Create a shopping cart
  const cart = new ShoppingCart();
  
  // Preselect items
  cart.addItem("Item 1", 2, 10.0);
  cart.addItem("Item 2", 3, 5.0);
  cart.addItem("Item 3", 1, 15.0);
  
  // Render the cart
  cart.renderCart();
  
