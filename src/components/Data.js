import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateData, deleteData } from "../slices/Data";
import DataService from "../services/DataService";
const Data = (props) => {
    const initialDataState = {
        id: null,
        title: "",
        description: "",
        published: false
    };
    const [currentData, setcurrentData] = useState(initialDataState);
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const getData = id => {
        DataService.get(id)
            .then(response => {
                console.log(response.data);
                setcurrentData(response.data.data[0]);
            })
            .catch(e => {
                console.log(e);
            });
    };
    useEffect(() => {
        getData(props.match.params.id);
    }, [props.match.params.id]);
    const handleInputChange = event => {
        const { name, value } = event.target;
        setcurrentData({ ...currentData, [name]: value });
    };
  
    const updateContent = () => {
        dispatch(updateData({ id: currentData.idcode, data: currentData }))
            .unwrap()
            .then(response => {
                console.log(response);
                setMessage("The Data was updated successfully!");
            }).then(() => {
               setTimeout(() => {
                props.history.push("/data");  
               }, 2000);
            })
            .catch(e => {
                console.log(e);
            });
    };
    const removeData = () => {
        dispatch(deleteData({ id: currentData.idcode }))
            .unwrap()
            .then(() => {
                props.history.push("/data");  
            })
            .catch(e => {
                console.log(e);
            });
    };
    return (
        <div>
            {currentData ? (
                <div className="edit-form">
                    <h4>Data : {currentData.title}</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={currentData.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={currentData.description}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>

                    <button className="badge bg-danger mt-3 me-2" onClick={removeData}>
                        Delete
                    </button>
                    <button
                        type="submit"
                        className="badge bg-success"
                        onClick={updateContent}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Data...</p>
                </div>
            )}
        </div>
    );
};
export default Data;