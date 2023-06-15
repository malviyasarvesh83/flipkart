let totalCost = 0;
let totalMrp = 0;
const getCart = async () => {
  try {
    const token = localStorage.getItem("token");
    let response = await axios.get(
      "http://localhost:7000/cart/getCartDetails",
      {
        headers: { Authorization: token },
      }
    );
    console.log(response);
    document.querySelector(
      ".fa-shopping-cart"
    ).textContent = `(${response.data.response.length})`;
    if (response.data.response.length == 0) {
      document.querySelector(".cart-items").innerHTML = `
        <img class="emptyImg" src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="" />
        <p class="emptyCart">Your Cart Is Empty..!</p>
        <a class="emptyProduct" href="homepage.html">Add Product</a>
        `;
      document.querySelector('.address').style.display = 'none';
      // document.getElementById('order').style.display = 'none';
      document.querySelector('.order').style.display = 'none';
      document.querySelector('.right-container').style.display = 'none';
      document.querySelector('body').style.backgroundColor = 'white';
    } else {
      document.querySelector(".address").innerHTML = `
                <p style="color:#2874f0;"><i class="fas fa-location-dot" style="margin-right:10px; color:#2874f0;"></i>${response.data.address},${response.data.address1}</p>
                <a style="color:#2874f0;" href="change.html">Change</a>
            `;

      for (let i = 0; i < response.data.response.length; i++) {
        totalCost += +response.data.response[i].cost;
        totalMrp += +response.data.response[i].mrp;
        document.querySelector(".cart-items").innerHTML += `
                    <div class="cart-item-list" onclick="prodDetail(${response.data.response[i].cost})">
                        <div>
                            <img src="${
                              response.data.response[i].url
                            }" alt="cartItem" />
                            <div class="qty-cont">
                                <button class="minus" onclick="minusQty()">-</button>
                                <input type="text" class="qty" id="qty" name="qty" value="${
                                  response.data.response[i].quantity
                                }"/>
                                <button class="plus" onclick="plusQty()">+</button>
                            </div>
                        </div>
                        <div>
                            <p>${response.data.response[i].longTitle}</p>
                            <p>₹${response.data.response[i].cost} <span>₹${
          response.data.response[i].mrp
        }</span><i>${response.data.response[i].discount}Off</i></p>
                            <p>${
                              response.data.response[i].description.slice(
                                0,
                                100
                              ) + "..."
                            }</p>
                            <button class="remove" id="remove" onclick="removeFromCart(${
                              response.data.response[i].id
                            })">Remove Item</button>
                        </div>
                    </div>
                `;
      }
      console.log(totalCost);
      console.log(totalMrp);
      let discount = totalMrp - totalCost;
      console.log(discount);
      document.querySelector(".right-container").innerHTML = `
                <h1>Total Item in Your Cart ${response.data.response.length}</h1>
                <p>Total Mrp <span>${totalMrp}</span></p>
                <p>Discount <span>-${discount}</span></p>
                <p>Delivery Charges <span>+40</span></p>
                <p>Total Amount <span>${totalCost+40}</span></p>
                <p class="save">Your Will Save ${discount} In This Order</p>
            `;
    }
  } catch (error) {
    console.log(error);
  }
};

getCart();

const removeFromCart = async (id) => {
  try {
    const token = localStorage.getItem("token");
    let response = await axios.delete(
      `http://localhost:7000/cart/deleteFromCart/${id}`,
      { headers: { Authorization: token } }
    );
    console.log(response);
    location.reload();
  } catch (error) {
    console.log(error);
  }
};

// Place Order Through RAZORPAY

const placeOrder = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    "http://localhost:7000/purchase/placeOrder",
    { headers: { 'Authorization': token, 'totalAmount':totalCost } }
  );
  console.log(response);
  var options = {
    key: response.data.key_id,
    order_id: response.data.order.id,
    handler: async (response) => {
      await axios.post(
        "http://localhost:8000/purchase/updatetransactionstatus",
        {
          order_id: options.order_id,
          payment_id: response.razorpay_payment_id,
        },
        { headers: { Authorization: token } }
      );
      let response1 = await axios.get("http://localhost:8000/user/allusers", {
        headers: { Authorization: token },
      });
    },
  };
  const rzp = new Razorpay(options);
  rzp.open();

  rzp.on("payment.failed", async (response) => {
    console.log(response);
    let response1 = await axios.post(
      "http://localhost:8000/purchase/paymentfailed",
      {
        order_id: options.order_id,
        payment_id: response.razorpay_payment_id,
      },
      { headers: { Authorization: token } }
    );
    console.log(response1);
    alert("Payment Failed");
  });
};

const prodDetail = (id) => {
  try {
    console.log(id);
    // location.href = 'productDetails.html';
  } catch (error) {
    console.log(error);
  }
}

const homePage = () => {
  location.href = 'homepage.html';
}