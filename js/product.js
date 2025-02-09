async function loadProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get("product"));

    if (!productId) {
        document.body.innerHTML = "<h2>Product not found</h2>";
        return;
    }

    try {
        const response = await fetch("data.json");
        const data = await response.json();
        const products = data.products;

        const product = products.find(p => p.id === productId);
        const recommendationsContainer = document.getElementById("product-recommendations");

        if (!product) {
            document.body.innerHTML = "<h2>Product not found</h2>";
            return;
        }

        document.getElementById("product-name").textContent = product.name;
        document.getElementById("product-description").textContent = product.description;
        document.getElementById("product-image").src = "./resources/" + product.image;
        document.getElementById("product-image").alt = product.name;

        if (product.recommendations.length != 0) {
            const recommendationHeader = document.createElement("h6");
            const recommendationList = document.createElement("ul"); 

            recommendationHeader.innerHTML = "Recommendations";
            recommendationsContainer.appendChild(recommendationHeader);

            product.recommendations.forEach(recommendation => {
                const recommendationItem = document.createElement("li");
                recommendationItem.innerHTML = recommendation;
                recommendationList.appendChild(recommendationItem);
            });

            recommendationsContainer.appendChild(recommendationList);
        }
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

loadProduct();