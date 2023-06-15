const getProductDetails = async () => {
    try {
        let prodId = localStorage.getItem('prodId');
        let response = await axios.get(`http://localhost:7000/product/getProductDetails/${prodId}`);
        console.log(response);
        document.querySelector(".left-container").innerHTML += `
            <img src="${response.data.url}" alt="${response.data.shortTitle}">
            <button onclick="addToCart()">Add To Cart</button>
            <button>Buy Now</button>
        `;
        document.querySelector(".right-container").innerHTML += `
            <p>${response.data.longTitle}</p>
            <div class="rating">
                <p>3<i class="fas fa-star"></i></p>
                <span class="review">9 Ratings & 1 Reviews</span>
                <img class="fAssured" src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" />
            </div>
            <div class="price">
                <p>₹${response.data.cost} <span>₹${response.data.mrp}</span> <i>${response.data.discount}Off</i></p>
            </div>
            <div class="offers">
                <h4>Available Offers</h4>
                <p><i class="fas fa-tag"></i>Bank Offer10% off on Axis Bank Credit Card and EMI Transactions, up to ₹1500, on orders of ₹5,000 and above <i class="TC">T&C</i></p>
                <p><i class="fas fa-tag"></i>Bank Offer10% off on Flipkart Axis Bank Credit Card EMI Transactions,up to ₹1500,on orders of ₹5,000 and above <i class="TC">T&C</i></p>
                <p><i class="fas fa-tag"></i>Bank OfferFlat ₹100 Instant Cashback on Paytm Wallet. Min Order Value ₹1000. Valid once per Paytm account <i class="TC">T&C</i></p>
                <p><i class="fas fa-tag"></i>Buy this product and Get Extra ₹50 Off on Select Fans <i>T&C</i></p>
            </div>
            <img class="coin" src="	https://rukminim1.flixcart.com/lockin/400/400/images/CCO__PP_2019-07-14.png?q=50" alt="superCoinLogo" />
            <p class="desc">${response.data.description}</p>
        `;
    } catch (error) {
        console.log(error);
    }
}

getProductDetails();

const getCart = async () => {
    try {
        const token = localStorage.getItem('token');
        let response = await axios.get('http://localhost:7000/cart/getCartDetails', { headers: { 'Authorization': token } });
        console.log(response);
        document.querySelector(".fa-shopping-cart").textContent = `(${response.data.response.length})`;
    } catch (error) {
        console.log(error);
    }
}

getCart();

const addToCart = async () => {
    try {
        const token = localStorage.getItem('token');
        let prodId = localStorage.getItem('prodId');
        let response = await axios.get(`http://localhost:7000/product/getProductDetails/${prodId}`);
        let response1 = await axios.post('http://localhost:7000/cart/addToCart', {
            url: response.data.url,
            detailUrl: response.data.detailUrl,
            shortTitle: response.data.shortTitle,
            longTitle: response.data.longTitle,
            mrp: response.data.mrp,
            cost: response.data.cost,
            discount: response.data.discount,
            quantity: response.data.quantity,
            description: response.data.description,
            discount1: response.data.discount1,
            tagline: response.data.tagline,
        }, { headers: { 'Authorization': token } });
        console.log(response1);
        location.reload();
        location.href = 'cart.html';
    } catch (error) {
        console.log(error);
    }
}

const cart = async () => {
    try {
        location.href = 'cart.html';
    } catch (error) {
        console.log(error);
    }
}

const homePage = () => {
    try {
        location.href = 'homepage.html';
    } catch (error) {
        console.log(error);
    }
}