import React from "react";

const SearchCard = ({ data }) => {
  return (
    <div className="shadow-sm p-4 my-2">
      <div className="search-card">
        <div className="container">
          <div className="row">
            <div className="col-md-1">photo</div>
            <div className="col-md-7">
              <p className="m-0 h4">I am looking for i9 processor 5th gen</p>
              <p className="text-small m-0 ">Anil Joseph</p>
            </div>
            <div className="col-md-4 pe-0">
              <p className="bg-danger rounded text-white p-2 text-center">
                Valid till 28/04/2022
              </p>
            </div>
            <div className="col-md-12 p-0">
              <p className="py-3 mx-0">
                I am looking for second hand processor which is in good
                condition and has cheap price. My budget is $150. If you willing
                to sell please let me know. I will contact if i like it
              </p>
            </div>
            <div className="btn btn-light-green">Respond</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
