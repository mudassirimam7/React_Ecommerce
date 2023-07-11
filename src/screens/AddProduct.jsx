import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer/Footer";
import { useState } from "react";
import { API_URL } from "../Config/Constant";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("rating", rating);

    const fileInput = document.getElementById("image");
    for (let i = 0; i < fileInput.files.length; i++) {
      formData.append("image", fileInput.files[i]);
    }

    try {
      const response = await fetch(`${API_URL}/api/products/add`, {
        method: "POST",
        body: formData,
      });
      navigate("/home");
      console.log(await response.json());
    } catch (error) {
      console.error(error);
    }
  };

  const handleImagePreview = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <>
      <Header />
      <section className="add-product">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="text-center my-5">Add product</h1>
            </div>
          </div>
          <div className="row justify-content-center mb-5">
            <div className="col-xl-6 col-md-8 col-12">
              <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group w-100">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                  />
                </div>
                <div className="form-group w-100">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows={5}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    required
                  />
                </div>
                <div className="form-group w-100">
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    required
                  />
                </div>
                <div className="form-group w-100">
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    id="quantity"
                    name="quantity"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                    required
                  />
                </div>
                <div className="form-group w-100">
                  <label htmlFor="rating">Rating</label>
                  <select
                    className="form-control"
                    id="rating"
                    name="rating"
                    value={rating}
                    onChange={(event) => setRating(event.target.value)}
                    required
                  >
                    <option value="">Select a rating</option>
                    <option value="1">1 </option>
                    <option value="2">2 </option>
                    <option value="3">3 </option>
                    <option value="4">4 </option>
                    <option value="5">5 </option>
                  </select>
                </div>
                <div className="form-group mt-4 w-100">
                  <div className="choose-file">
                    <label htmlFor="image">
                      choose form file
                      <input
                        type="file"
                        className="form-control-file btn-1 d-none"
                        id="image"
                        name="image"
                        accept="image/*"
                        multiple
                        onChange={handleImagePreview}
                        required
                      />
                    </label>
                    <img
                      src={
                        imagePreview
                          ? imagePreview
                          : "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                      }
                      alt="Image Preview"
                      className="mt-2 img-thumbnail"
                    />
                  </div>
                </div>
                <button type="submit" className="btn bg-red mt-3 ">
                  Add Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AddProduct;  