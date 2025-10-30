import ProductoService from "./producto.service.js";

document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("product-list");
    const searchInput = document.getElementById("search");
    const addProductButton = document.getElementById("add-product");

    console.log(window.navigator);
    console.log(window.location);
    console.log("Ancho de la pantalla" + window.screen.width + "px");
    console.log("Alto de la pantalla" + window.screen.height + "px");

    async function getProducts() {
        let products = await ProductoService.getProducts();

        products.forEach(product => {
            const productItem = document.createElement("li");
            productItem.innerHTML = `
                <p><strong>Nombre:</strong> ${product.nombre}</p>
                <p><strong>Precio:</strong> ${product.precio}</p>
                <p><strong>Cantidad:</strong> ${product.cantidad}</p>
                <button data-id="${product._id}" class="edit-button">Editar</button>
                <button data-id="${product._id}" class="delete-button">Eliminar</button>
            `;

            productList.appendChild(productItem);
        })
    }

    getProducts();

    addProductButton.addEventListener("click", function () {
        window.location.href = "formulario.html";
    });

    productList.addEventListener("click", async function (e) {
        if (e.target.classList.contains("edit-button")) {
            const productId = e.target.getAttribute("data-id");
            window.location.href = `formulario.html?id=${productId}`;
            return;
        }
        if (e.target.classList.contains("delete-button")) {
            const productId = e.target.getAttribute("data-id");
            if (confirm("¿Está seguro de que desea eliminar el producto?")) {
                try {
                    await ProductoService.deleteProduct(productId);
                    e.target.parentElement.remove();
                    alert("Producto eliminado con éxito.");
                } catch (error) {
                    alert("Ocurrió un error al eliminar el producto.");
                }
            }
        }
    });

    searchInput.addEventListener("input", async function () {
        const filtro = searchInput.value;

        let products;
        if (filtro === '') {
            products = await ProductoService.getProducts();
        } else {
            products = await ProductoService.searchProducts(filtro);
        }
        productList.innerHTML = '';
        products.forEach(product => {
            const productItem = document.createElement("li");
            productItem.innerHTML = `
                <p><strong>Nombre:</strong> ${product.nombre}</p>
                <p><strong>Precio:</strong> ${product.precio}</p>
                <p><strong>Cantidad:</strong> ${product.cantidad}</p>
                <button data-id="${product._id}" class="edit-button">Editar</button>
                <button data-id="${product._id}" class="delete-button">Eliminar</button>
            `;

            productList.appendChild(productItem);
        });
    })
})