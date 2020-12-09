import React from "react";
import robotsinfo from "../robotsInfo";
import { useFormik } from "formik";

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
    }
    if (!robotData.type) {
        errors.type = "Robot's type is missing";
    }
    if (!robotData.imgURL) {
        errors.imgURL = "Image's url  is missing"
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
    const robot = (props.id ? robotsinfo.find(x => x.id === props.id) : null);
    const formik = useFormik({
        initialValues: {
            id: (props.id ? robot.id : ""),
            name: (props.id ? robot.name : ""),
            imgURL: (props.id ? robot.imgURL : ""),
            description: (props.id ? robot.description : ""),
            type: (props.id ? robot.type : "")
        },
        validate: validateRobotData,
        onSubmit: values => {
            if (props.id) {
                const deleteRobot = robotsinfo.findIndex(function (i) {
                    return i.id === props.id;
                })
                robotsinfo.splice(deleteRobot, 1);
            }
            values.id = now.getFullYear().toString() + now.getMonth().toString() + now.getDate() + now.getHours() + now.getMinutes() + now.getSeconds();
            robotsinfo.push(values);
            props.hideAdd();
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
                    type="url" name="imgURL" id="imgURL" value={formik.values.imgURL}
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
