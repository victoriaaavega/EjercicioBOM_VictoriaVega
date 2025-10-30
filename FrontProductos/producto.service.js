const API_URL = 'http://localhost:3000/api/productos';

export default class ProductoService {
    static async getProducts() {
        return await fetch(`${API_URL}`).then(response => response.json());
    }

    static async getProductById(id) {
        return await fetch(`${API_URL}/${id}`).then(response => response.json());
    }

    static async addProduct(productData) {
        return await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        }).then(response => response.json());
    }

    static async editProduct(id, productData) {
        return await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        }).then(response => response.json());
    }

    static async deleteProduct(id) {
        return await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        }).then(response => response.json());
    }

    static async searchProducts(filter) {
        return await fetch(`${API_URL}/filtro/${filter}`).then(response => response.json());
    }
}