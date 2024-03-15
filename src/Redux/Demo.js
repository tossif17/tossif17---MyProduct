import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProduct } from "./ActionCreator";

const Demo = ({ datas, getProducts }) => {
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div>
      {datas.isLoading && <div>Loading.......</div>}
      {datas.map((itm, index) => (
        <li key={index}>{itm.name}</li>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    datas: state.datas,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(getProduct()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Demo);
