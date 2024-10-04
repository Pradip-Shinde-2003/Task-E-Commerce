import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Products({ handleLogout }) {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    image: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Data not Found", error);
    }
  };

  useEffect(() => {
    fetchProducts();

    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct = () => {
    const fakeNewProduct = {
      id: products.length + 1,
      title: newProduct.title,
      price: newProduct.price,
      image: newProduct.image || "https://via.placeholder.com/150",
    };
    setProducts([...products, fakeNewProduct]);
    setNewProduct({ title: "", price: "", image: "" });
  };

  const updateProduct = (id) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, ...editingProduct } : product
    );
    setProducts(updatedProducts);
    setEditingProduct(null);
  };

  const deleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  const editProduct = (product) => {
    setEditingProduct(product);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "200px",
          gap: 10,
          margin: "20px auto",
        }}
      >
        <h3>Add New Product</h3>
        <input
          type="text"
          name="title"
          placeholder="Product Name"
          value={newProduct.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={handleChange}
        />
        <button onClick={addProduct}>Add Product</button>
      </div>

      <table border="1" style={{ margin: "50px auto", width: "90%" }}>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Title</th>
          <th>Price</th>
          <th>Operation</th>
        </tr>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>
              <img
                src={product.image}
                alt={product.title}
                width="80"
                height="80"
              />
            </td>
            <td>{product.title}</td>
            <td> Rs :- {product.price}</td>
            <td>
              {" "}
              <button onClick={() => deleteProduct(product.id)}>Delete</button>
              <button onClick={() => editProduct(product)}>Edit</button>
            </td>

            {editingProduct && editingProduct.id === product.id && (
              <div>
                <input
                  type="text"
                  name="title"
                  placeholder="Edit Title"
                  value={editingProduct.title}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      title: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  name="price"
                  placeholder="Edit Price"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      price: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  name="image"
                  placeholder="Edit Image URL"
                  value={editingProduct.image}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      image: e.target.value,
                    })
                  }
                />
                <button onClick={() => updateProduct(product.id)}>Save</button>
              </div>
            )}
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Products;
