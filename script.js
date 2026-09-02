// Get cart from browser
function getCart() {
  return JSON.parse(localStorage.getItem("bookCart")) || [];
}

// Add book to cart
function addToCart(book, author, publisher, price) {
  let cart = getCart();

  // Check if book already exists
  let existingBook = cart.find((item) => item.book === book);

  if (existingBook) {
    // Increase quantity
    existingBook.quantity++;
  } else {
    // Add new book
    cart.push({
      book: book,
      author: author,
      publisher: publisher,
      price: price,
      quantity: 1,
    });
  }

  // Save cart
  localStorage.setItem("bookCart", JSON.stringify(cart));

  alert(book + " has been added to the cart.");
}

// Display cart
function displayCart() {
  const cartContent = document.getElementById("cartContent");

  if (!cartContent) {
    return;
  }

  let cart = getCart();

  // If cart is empty
  if (cart.length === 0) {
    cartContent.innerHTML = `

            <div class="empty-cart">

                <p>Your cart is empty.</p>

                <a
                    class="btn"
                    href="catalogue.html"
                    target="rightFrame">

                    Go to Catalogue

                </a>

            </div>

        `;

    return;
  }

  let total = 0;

  let table = `

        <div class="message">

            These are the books
            selected from the catalogue.

        </div>


        <table>

            <tr>

                <th>Book</th>
                <th>Author</th>
                <th>Publisher</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>

            </tr>

    `;

  // Add every selected book
  cart.forEach((item, index) => {
    let itemTotal = item.price * item.quantity;

    total += itemTotal;

    table += `

            <tr>

                <td>${item.book}</td>

                <td>${item.author}</td>

                <td>${item.publisher}</td>

                <td>
                    $${item.price.toFixed(2)}
                </td>

                <td>
                    ${item.quantity}
                </td>

                <td>
                    $${itemTotal.toFixed(2)}
                </td>

                <td>

                    <button
                        class="btn btn-danger"
                        onclick="removeFromCart(${index})">

                        Remove

                    </button>

                </td>

            </tr>

        `;
  });

  // Grand total
  table += `

        <tr>

            <th colspan="5">
                Grand Total
            </th>

            <th>
                $${total.toFixed(2)}
            </th>

            <th></th>

        </tr>

        </table>

        <br>

        <button
            class="btn btn-danger"
            onclick="clearCart()">

            Clear Cart

        </button>

        <a
            class="btn"
            href="catalogue.html"
            target="rightFrame">

            Continue Shopping

        </a>

    `;

  cartContent.innerHTML = table;
}

// Remove a book
function removeFromCart(index) {
  let cart = getCart();

  cart.splice(index, 1);

  localStorage.setItem("bookCart", JSON.stringify(cart));

  displayCart();
}

// Clear entire cart
function clearCart() {
  localStorage.removeItem("bookCart");

  displayCart();
}

// Display cart when cart page opens
displayCart();
