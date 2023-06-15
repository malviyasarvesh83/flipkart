

const getTopProduct = async () => {
    try {
        const token = localStorage.getItem('token');
        let response = await axios.get('http://localhost:7000/product/getTopProducts', {headers:{'Authorization':token}});
        for (let i = 0; i < response.data.length; i++){
            document.querySelector(".top-products").innerHTML += `
                <a href="${response.data[i].link}">
                    <img src="${response.data[i].img}" alt="${response.data[i].name}">
                    <p>${response.data[i].name}</p>
                </a>
            `;
        }
    } catch (error) {
        console.log(error);
    }
}

const getMainProduct = async () => {
    try {
        const token = localStorage.getItem("token");
        let response = await axios.get('http://localhost:7000/product/getMainProducts',{headers:{'Authorization':token}});
        for (let i = 0; i < response.data.length-3; i++){
            document.querySelector(".product-list").innerHTML += `
                <a onclick="productDetails(${response.data[i].id})" title="From ₹${response.data[i].cost}">
                    <img src="${response.data[i].url}" alt="${response.data[i].shortTitle}">
                    <p class="prodName">${response.data[i].shortTitle}</p>
                    <p class="prodPrice">From ₹${response.data[i].cost}</p>
                    <p class="prodBrand">${response.data[i].longTitle.slice(0,30)+'...'}</p>
                </a>
            `;
        }
    } catch (error) {
        console.log(error);
    }
}

getTopProduct();
getMainProduct();

const productDetails = (id) => {
    console.log(id);
    localStorage.setItem('prodId', id);
    location.href = 'productDetails.html';
}

const getCart = async () => {
    try {
        const token = localStorage.getItem('token');
        let response = await axios.get('http://localhost:7000/cart/getCartDetails', { headers: { 'Authorization': token } });
        console.log(response);
        console.log(response.data.name);
        document.querySelector('.loginUser').textContent = `Welcome ${response.data.name}`;
        document.querySelector('.loginUser').style.fontSize = '10px';
        document.querySelector('.loginUser').style.display = 'block';
        document.querySelector(".fa-shopping-cart").textContent = `(${response.data.response.length})`;
    } catch (error) {
        console.log(error);
    }
}

getCart();

const cart = async () => {
    try {
        location.href = 'cart.html';
    } catch (error) {
        console.log(error);
    }
}

document.getElementById('search').onkeyup = async (e) => {
    try {
        let search = e.target.value.toLowerCase();
        const token = localStorage.getItem('token');
        let response = await axios.get('http://localhost:7000/product/getMainProducts', { headers: { 'Authorization': token } });
        for (let i = 0; i < response.data.length; i++){
            if (search == response.data[i].shortTitle.toLowerCase()) {
                console.log(response.data[i].cost);
            }
        }
    } catch (error) {
        console.log(error);
    }
}