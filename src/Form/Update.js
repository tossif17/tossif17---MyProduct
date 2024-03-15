// Update.js

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getByProductId, updateByProductId } from "../Redux/ActionCreator";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getProduct } from "../Redux/ActionCreator";

const Update = ({ data, getByProductId, updateByProductId, getProducts }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    getByProductId(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (data.productDetails) {
      setFormData(data.productDetails);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.productDetails]);

  useEffect(() => {
    if (data.updateSuccess) {
      navigate("/product");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.updateSuccess]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateForm = (e) => {
    e.preventDefault();
    updateByProductId(formData, id);
    console.log(formData);
  };

  return (
    <>
      <div
        style={{ height: "100vh" }}
        className="d-flex align-items-center justify-content-center"
      >
        <form onSubmit={handleUpdateForm} className="update-form">
          <div className="d-flex justify-content-center mb-4">
            <h3>Update Form</h3>
          </div>
          <label style={{ fontSize: "1.5rem" }}>Enter Title </label>
          <input
            type="text"
            name="title"
            className="mb-3"
            value={formData.title || ""}
            onChange={handleChange}
            required
          />
          <label style={{ fontSize: "1.5rem" }}>Enter Price </label>
          <input
            type="number"
            name="price"
            className="mb-3"
            value={formData.price || ""}
            onChange={handleChange}
            required
          />
          <label style={{ fontSize: "1.5rem" }}>Enter Description </label>
          <textarea
            name="description"
            className="mb-3"
            value={formData.description || ""}
            onChange={handleChange}
            required
            style={{ height: "5rem" }}
          />
          <div className="d-flex justify-content-center">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(getProduct()),
  getByProductId: (id) => dispatch(getByProductId(id)),
  updateByProductId: (data, id) => dispatch(updateByProductId(data, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Update);
