import ProductoService from "./producto.service.js";

document.addEventListener("DOMContentLoaded", async function () {
    const form = document.getElementById("product-form");
    const nameInput = document.getElementById("name");
    const priceInput = document.getElementById("price");
    const quantityInput = document.getElementById("quantity");
    const saveButton = document.getElementById("save-product");

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (productId) {
        let producto = await ProductoService.getProductById(productId);

        nameInput.value = producto.nombre;
        priceInput.value = producto.precio;
        quantityInput.value = producto.cantidad;
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        const name = nameInput.value;
        const price = parseFloat(priceInput.value);
        const quantity = parseInt(quantityInput.value, 10);

        if (name && price && quantity) {
            const productData = {
                nombre: name,
                precio: price,
                cantidad: quantity
            }

            if (productId) {
                try {
                    await ProductoService.editProduct(productId, productData);

                    alert("Producto actualizado con éxito");
                    window.location.href = "producto.html";
                } catch (error) {
                    alert("Ocurrió un error al editar el producto");
                }
            } else {
                try {
                    await ProductoService.addProduct(productData);

                    alert("Producto agregado con éxito");
                    window.location.href = "producto.html";
                } catch (error) {
                    alert("Ocurrió un error al agregar el producto");
                }
            }
        } else {
            alert("Por favor ingrese todos los datos del producto");
        }
    })
})