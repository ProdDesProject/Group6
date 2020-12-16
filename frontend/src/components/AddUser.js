import React from "react";
import { useFormik } from "formik";
import Axios from "axios";
import domain from "../domain"

//validates the information for the new robot
const validateRobotData = userData => {
    const errors = {};
    if (!userData.name) {
        errors.name = "User's name is missing";

    } else if (userData.name.length > 20) {
        errors.name = 'Name cannot exceed 20 characters';
    }
    if (!userData.email) {
        errors.email = "User's email is missing";
    }
    if (!userData.password) {
        errors.password = "User's password is missing";
    }
    if (!userData.class) {
        errors.class = "User's class is missing";
    }
    return errors;
}


const AddUser = (props) => {
    const user = props.user;
    const formik = useFormik({
        initialValues: {
            id: (props.action === "edit" ? user.id : ""),
            name: (props.action === "edit" ? user.name : ""),
            email: (props.action === "edit" ? user.email : ""),
            password: (props.action === "edit" ? user.password : ""),
            class: (props.action === "edit" ? user.classname : "")
        },
        validate: validateRobotData,
        onSubmit: values => {
            if (props.action === "edit") {
                props.hideAdd({ loading: true })
                Axios.put(domain + "/users/update/" + values.id, {
                    name: values.name,
                    password: values.password,
                    email: values.email,
                    classname: values.class
                }).then(response => {
                    props.hideAdd({ loading: false, fetchSuccess: true });
                }).catch(err => {
                    window.alert("Error\n" + err)
                })
            }
            if (props.action === "add") {
                props.hideAdd({ loading: true })
                Axios.post(domain + "/users/add", {
                    name: values.name,
                    password: values.password,
                    email: values.email,
                    classname: values.class
                }).then(response => {
                    props.hideAdd({ loading: false, fetchSuccess: true });
                }).catch(err => {
                    window.alert("Error\n" + err)
                })
            }
        }
    });

    console.log(props)
    return (
        <form onSubmit={formik.handleSubmit} className="addRobotForm" style={{ color: "white" }}>
            <h4>{(props.action === "edit" ? "Edit:" : "Add a new user:")}</h4><br />
            {props.action === "edit" ? <>
                <p>
                    <label htmlFor="id">User id:</label>
                    <input
                        type="text" name="id" id="id" value={formik.values.id}
                        onChange={formik.handleChange} onBlur={formik.handleBlur} disabled>
                    </input>
                </p><br /></> : null}
            <p>
                <label htmlFor="name">Name and surname:</label>
                <input
                    type="text" name="name" id="name" value={formik.values.name}
                    onChange={formik.handleChange} onBlur={formik.handleBlur}>
                </input>

                {formik.touched.name && formik.errors.name ? <span style={{ color: 'red' }}>{formik.errors.name}</span> : <br />}
            </p>
            <p>
                <label htmlFor="email">Email: </label>
                <input
                    type="email" name="email" id="email" value={formik.values.email}
                    onChange={formik.handleChange} onBlur={formik.handleBlur}>
                </input>

                {formik.touched.email && formik.errors.email ? <span style={{ color: 'red' }}>{formik.errors.email}</span> : <br />}
            </p>
            <p>
                <label htmlFor="password">Password:</label>
                <input
                    type="text" name="password" id="password" value={formik.values.password}
                    onChange={formik.handleChange} onBlur={formik.handleBlur}>
                </input>

                {formik.touched.password && formik.errors.password ? <span style={{ color: 'red' }}>{formik.errors.password}</span> : <br />}
            </p>
            <p>
                <label htmlFor="class">Class:</label>
                <input
                    type="text" name="class" id="class" disabled={formik.values.class === "admin" ? true : false} value={formik.values.class}
                    onChange={formik.handleChange} onBlur={formik.handleBlur}>
                </input>
                {formik.touched.class && formik.errors.class ? <span style={{ color: 'red' }}>{formik.errors.class}</span> : <br />}
                <br />
            </p>
            <button type="submit" className="blueBtn" style={{ width: '48%', backgroundColor: "#092768" }}>{(props.action === "edit" ? "Update" : "Add")}</button>&nbsp;
            <button onClick={props.hideAdd} className="calcelAdd" style={{ width: '48%' }}>Cancel</button>
        </form>
    )
}

export default AddUser;
