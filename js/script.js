async function loadProducts() {
    try {
        const response = await fetch("../data.json");
        const data = await response.json(); 
        const products = data.products; 

        const productList = document.getElementById("product-list");

        products.forEach(product => { 
            const article = document.createElement("article");
            article.classList.add("grid-item");
        
            article.innerHTML = `
                <img src="./resources/${product.image}" alt="${product.name}" width="200">
                <h4>${product.name}</h4>
                <h6>${product.category}</h6>
                <p>Available in:</p>
                <small>${product.available_volumes.map(volume => `${volume}`).join(", ")}</small>
                <br>
                <a href="product-details.html?product=${product.id}">View Product</a>
            `;
        
            productList.appendChild(article);
        });
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

loadProducts();

// Filter products by category
function filterProducts(category) {
    // Select all product cards
    var products = document.querySelectorAll('.product-card');

    // Loop through each product and check its category
    products.forEach(function(product) {
        // Check if the product's data-category matches the selected category
        if (category === '' || product.getAttribute('data-category') === category) {
            product.style.display = 'inline-block'; // Show the product
        } else {
            product.style.display = 'none'; // Hide the product
        }
    });
}

// Back to Top Button
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("back-to-top").style.display = "block";
    } else {
        document.getElementById("back-to-top").style.display = "none";
    }
};
document.getElementById("back-to-top").onclick = function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};