import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import { FaTrash } from "react-icons/fa";
import "../App.css";

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    images: []
  });
  const [products, setProducts] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const handleInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imagesArray = files.map((file) => URL.createObjectURL(file));
    setProduct({ ...product, images: files });
    setPreviewImages(imagesArray);
  };

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProducts([...products, product]);
    setProduct({ name: "", description: "", price: "", category: "", quantity: "", images: [] });
    setPreviewImages([]);
  };

  return (
    <div className="container-fluid form-container">
      <h2 className="text-center mb-4">Add Your Product</h2>
      <div className="row">
        <div className="col-md-6">
          <form className="p-4" onSubmit={handleSubmit}>
            <div className="form-group slide-in">
              <label className="font-weight-bold">Product Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group slide-in">
              <label className="font-weight-bold">Description</label>
              <textarea
                className="form-control"
                name="description"
                value={product.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group slide-in">
              <label className="font-weight-bold">Price ($)</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group slide-in">
              <label className="font-weight-bold">Category</label>
              <select
                className="form-control"
                name="category"
                value={product.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Grains">Grains</option>
              </select>
            </div>

            <div className="form-group slide-in">
              <label className="font-weight-bold">Quantity</label>
              <input
                type="number"
                className="form-control"
                name="quantity"
                value={product.quantity}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group slide-in">
              <label className="font-weight-bold">Upload Images</label>
              <input type="file" className="form-control" multiple onChange={handleImageChange} />
              {previewImages.length > 0 && (
                <Carousel>
                  {previewImages.map((img, index) => (
                    <Carousel.Item key={index}>
                      <img className="d-block w-100" src={img} alt={`Slide ${index}`} />
                    </Carousel.Item>
                  ))}
                </Carousel>
              )}
            </div>

            <button type="submit" className="btn btn-success mt-3">Submit</button>
          </form>
        </div>

        <div className="col-md-6">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Images</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price ($)</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod, index) => (
                <tr key={index}>
                  <td>
                    {prod.images.length > 0 && (
                      <Carousel>
                        {prod.images.map((file, idx) => (
                          <Carousel.Item key={idx}>
                            <img
                              className="d-block w-100 table-img"
                              src={URL.createObjectURL(file)}
                              alt={`Slide ${idx}`}
                            />
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    )}
                  </td>
                  <td>{prod.name}</td>
                  <td>{prod.description}</td>
                  <td>{prod.price}</td>
                  <td>{prod.category}</td>
                  <td>{prod.quantity}</td>

                  <td>
                    <button className="btn btn-danger" onClick={() => handleDelete(index)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
