import React, { useEffect, useState } from "react";
import { createProduct } from "../Redux/ActionCreator";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getProduct } from "../Redux/ActionCreator";

const Create = ({ createProducts, getProducts, data }) => {
  const initialState = {
    title: "",
    price: "",
    description: "",
    image: null,
    fileName: "",
  };
  const [value, setValue] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        let base64String = reader.result;
        base64String = base64String.split(",")[1];

        setValue({ ...value, image: base64String, fileName: file.name });
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setValue({
        ...value,
        [e.target.name]: e.target.value,
      });
    }
  };

  useEffect(() => {
    if (data.createSuccess) {
      getProducts();
      navigate("/product");
    }
    // eslint-disable-next-line
  }, [data]);

  const handleCreateForm = (e) => {
    e.preventDefault();
    createProducts(value);
    setValue(initialState);
    // console.log(value);
  };

  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex align-items-center justify-content-center"
    >
      <form onSubmit={handleCreateForm} className="update-form">
        <div className="d-flex justify-content-center mb-4">
          <h3>Create Form</h3>
        </div>
        <label style={{ fontSize: "1.5rem" }}>Enter Title </label>
        <input
          type="text"
          name="title"
          value={value.title}
          onChange={handleChange}
          className="mb-3"
          required
        />
        <label style={{ fontSize: "1.5rem" }}>Enter Price </label>
        <input
          type="number"
          name="price"
          value={value.price}
          onChange={handleChange}
          className="mb-3"
          required
        />
        <label style={{ fontSize: "1.5rem" }}>Enter Description </label>
        <textarea
          name="description"
          value={value.description}
          onChange={handleChange}
          className="mb-3"
          required
          style={{ height: "5rem" }}
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="mb-3"
        />

        <div className="d-flex justify-content-center">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(getProduct()),
  createProducts: (value) => dispatch(createProduct(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
