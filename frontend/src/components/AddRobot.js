import React from "react";
import { useFormik } from "formik";
import Axios from "axios";
import domain from "../domain"

//validates the information for the new robot
const validateRobotData = robotData => {
    const errors = {};
    if (!robotData.name) {
        errors.name = "Robot's name is missing";

    } else if (robotData.name.length > 20) {
        errors.name = 'Name cannot exceed 20 characters';
    }

    if (!robotData.description) {
        errors.description = "Robot's description is missing";
    } else if (robotData.description.length > 100) {
        errors.description = 'Description can not exceed 100 characters';
    }

    if (!robotData.type) {
        errors.type = "Robot's type is missing";
    } else if (robotData.type.length > 15) {
        errors.type = 'Type can not exceed 10 characters';
    }

    if (!robotData.imgURL) {
        errors.imgURL = "Image's url  is missing"
    } else if (robotData.imgURL.length > 30) {
        errors.imgURL = 'Image url can not exceed 30 characters';
    }

    return errors;
}

/*
user adds information (name, image url, description and type) 
for the new robot. Id is generated from the current date and time.
Add robot form shows when admin clicks on the button and hides when admin clicks cancel.
*/

const AddRobotComponent = (props) => {
    var now = new Date();
    const robot = props.robot;
    const formik = useFormik({
        initialValues: {
            id: (props.action === "edit" ? robot.id : ""),
            name: (props.action === "edit" ? robot.name : ""),
            imgURL: (props.action === "edit" ? robot.url : ""),
            description: (props.action === "edit" ? robot.description : ""),
            type: (props.action === "edit" ? robot.type : "")
        },
        validate: validateRobotData,
        onSubmit: values => {
            if (props.action === "edit") {
                props.hideAdd({ loading: true })
                Axios.put(domain + "/robots/update/" + values.id, {
                    id: robot.id,
                    name: values.name,
                    imgURL: values.imgURL,
                    description: values.description,
                    type: values.type
                }).then(response => {
                    props.hideAdd({ loading: false, fetchSuccess: true });
                }).catch(err => {
                    window.alert("Error\n" + err)
                })
            }
            if (props.action === "add") {
                props.hideAdd({ loading: true })
                values.id = now.getFullYear().toString() + now.getMonth().toString() + now.getDate() + now.getHours() + now.getMinutes() + now.getSeconds();
                Axios.post(domain + "/robots/add", {
                    id: values.id,
                    name: values.name,
                    imgURL: values.imgURL,
                    description: values.description,
                    type: values.type
                }).then(response => {
                    props.hideAdd({ loading: false, fetchSuccess: true });
                }).catch(err => {
                    window.alert("Error\n" + err)
                })
            }
        }
    });

    return (
        <form onSubmit={formik.handleSubmit} className="addRobotForm">
            <h4>{(props.id ? "Edit:" : "Add new robot:")}</h4><br />
            <p>
                <label htmlFor="name">Robot's name:</label>
                <input
                    type="text" name="name" id="name" value={formik.values.name}
                    onChange={formik.handleChange} onBlur={formik.handleBlur}>
                </input>

                {formik.touched.name && formik.errors.name ? <span style={{ color: 'red' }}>{formik.errors.name}</span> : <br />}
            </p>
            <p>
                <label htmlFor="imgURL">Image url: </label>
                <input
                    type="text" name="imgURL" id="imgURL" value={formik.values.imgURL}
                    onChange={formik.handleChange} onBlur={formik.handleBlur}>
                </input>

                {formik.touched.imgURL && formik.errors.imgURL ? <span style={{ color: 'red' }}>{formik.errors.imgURL}</span> : <br />}
            </p>
            <p>
                <label htmlFor="type">Type:</label>
                <input
                    type="text" name="type" id="type" value={formik.values.type}
                    onChange={formik.handleChange} onBlur={formik.handleBlur}>
                </input>

                {formik.touched.type && formik.errors.type ? <span style={{ color: 'red' }}>{formik.errors.type}</span> : <br />}
            </p>
            <p>
                <label htmlFor="description">Description:</label>
                <textarea
                    name="description" id="description" style={{ width: '100%' }} value={formik.values.description}
                    onChange={formik.handleChange} onBlur={formik.handleBlur}>
                </textarea>

                {formik.touched.description && formik.errors.description ? <span style={{ color: 'red' }}>{formik.errors.description}</span> : <br />}
            </p>
            <button type="submit" className="blueBtn" style={{ width: '100%', backgroundColor: "#092768" }}>{(props.id ? "Update" : "Add")}</button>
            <button onClick={props.hideAdd} className="calcelAdd" style={{ width: '100%' }}>Cancel</button>
        </form>
    )
}

export default AddRobotComponent;
