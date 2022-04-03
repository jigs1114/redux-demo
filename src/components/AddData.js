import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createData } from "../slices/Data";
const AddData = () => {
    const initialDataState = {
        id: null,
        title: "",
        description: "",
        published: false
    };
    const [Data, setData] = useState(initialDataState);
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();
    const handleInputChange = event => {
        const { name, value } = event.target;
        setData({ ...Data, [name]: value });
    };
    const saveData = () => {
        const { title, description } = Data;
        dispatch(createData({ title, description }))
            .unwrap()
            .then(data => {
                console.log(data);
                setData({
                    id: data.id,
                    title: data.title,
                    description: data.description,
                    published: data.published
                });
                setSubmitted(true);
            })
            .catch(e => {
                console.log(e);
            });
    };
    const newData = () => {
        setData(initialDataState);
        setSubmitted(false);
    };
    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newData}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={Data.title || ''}
                            onChange={handleInputChange}
                            name="title"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={Data.description || ''}
                            onChange={handleInputChange}
                            name="description"
                        />
                    </div>
                    <button onClick={saveData} className="btn btn-success mt-3">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};
export default AddData;