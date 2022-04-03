import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveData,
  findDataByTitle,
} from "../slices/Data.js";
import { Link } from "react-router-dom";
const DataList = () => {
  const [currentData, setcurrentData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const dataLists = useSelector(state => state.dataLists);
  const dispatch = useDispatch();
  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };
  const initFetch = useCallback(() => {
    dispatch(retrieveData());
  }, [dispatch])
  useEffect(() => {
    initFetch()
  }, [initFetch])
  const refreshData = () => {
    setcurrentData(null);
    setCurrentIndex(-1);
  };
  const setActiveData = (Data, index) => {
    setcurrentData(Data);
    setCurrentIndex(index);
  };
  const findByTitle = () => {
    refreshData();
    dispatch(findDataByTitle({ title: searchTitle }));
  };
  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Data List</h4>
        <ul className="list-group">
          {dataLists &&
            dataLists.map((data, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveData(data, index)}
                key={index}
              >
                {data.title}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentData ? (
          <div>
            <h4>Data</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentData.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentData.description}
            </div>
            <Link
              to={"/data/" + currentData.idcode}
              className="badge bg-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Data...</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default DataList;