import React, { useEffect } from "react";
import "./App.css";
import { connect } from "react-redux";
import { deletProduct, getProduct } from "./Redux/ActionCreator";
import { useNavigate } from "react-router-dom";

const Product = ({ data, getProducts, deletProducts }) => {
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (data.deletSucccess) {
      getProducts();
    }
    // eslint-disable-next-line
  }, [data]);

  const handelDelet = (id) => {
    deletProducts(id);
  };

  const handelCreate = () => {
    navigate("/create");
  };

  const handelUpdate = (id) => {
    navigate(`/update/${id}`);
  };
  const handelDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <>
      {data.isLoading ? (
        <h2 className="text-center m-5 text-white">Loading...</h2>
      ) : (
        <div>
          <div className="create-btn ">
            <button onClick={handelCreate} className="btn btn-success">
              create
            </button>
          </div>

          <div className="container">
            <div className="row row-cols-md-4 row-cols-sm-2 row-cols-1 w-100 g-4">
              {data.productList && data.productList.length ? (
                data.productList.map((item) => (
                  <div className="col" key={item.id}>
                    <div className="border h-100">
                      <img
                        src={`data:image/jpeg;base64,${item.image}`}
                        alt="Product"
                        className="product-image w-50"
                      />
                      <p className="text-center text-white">{item.title}</p>
                      <p className="text-white">{item.price}</p>
                      <div className="query">
                        <button
                          onClick={() => handelDetail(item.id)}
                          className="cr-btn"
                        >
                          Details
                        </button>{" "}
                        <button
                          onClick={() => handelUpdate(item.id)}
                          className="up-btn"
                        >
                          Update
                        </button>{" "}
                        <button
                          onClick={() => handelDelet(item.id)}
                          className="dlt-btn"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="col">No products found</p>
              )}
            </div>
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
  getProducts: () => dispatch(getProduct()),
  deletProducts: (id) => dispatch(deletProduct(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
