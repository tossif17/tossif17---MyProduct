import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getByProductId } from "../Redux/ActionCreator";
import { useParams, useNavigate } from "react-router-dom";

const Detail = ({ data, getByProductId }) => {
  const [productDetails, setProductDetails] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getByProductId(id);
  }, [id]);

  useEffect(() => {
    if (data.productDetails) {
      // console.log(data.productDetails);
      setProductDetails(data.productDetails);
    }
  }, [data.productDetails]);

  return (
    <>
      {data.isLoading ? (
        <h2 className="text-center m-5 text-white">Loading...</h2>
      ) : (
        <div className="m-5 d-flex">
          <div className="d-flex flex-column align-items-center border border-white rounded p-3 w-50">
            {/* Check if productDetails.image exists before constructing the data URL */}
            {productDetails.image && (
              <img
                src={`data:image/jpeg;base64,${productDetails.image}`}
                alt="Product"
                className="product-image mb-3 w-25 h-50"
              />
            )}
            <h2 className="text-white">{productDetails.title}</h2>
            <p className="text-white">{productDetails.price}</p>
            <p className="text-white">{productDetails.description}</p>

            <button
              onClick={() => navigate("/product")}
              type="button"
              className="btn btn-success"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getByProductId: (id) => dispatch(getByProductId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
