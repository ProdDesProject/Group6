import React from "react";
import users from "../users";
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
    if (!userData.id) {
        errors.id = "User must have an id";

    } else if (users.find(x => x["id"] === userData.id)) {
        errors.id = "User with this id already exists";
    }
    if (!userData.email) {
        errors.email = "User's email is missing";
    }
    if (!userData.password) {
        errors.password = "User's password is missing";
    }
    return errors;
}


const AddUser = (props) => {
    const user = props.user;
    const formik = useFormik({
        initialValues: {
            id: (props.action==="edit" ? user.id : ""),
            name: (props.action==="edit" ? user.name : ""),
            email: (props.action==="edit" ? user.email : ""),
            password: (props.action==="edit" ? user.password : ""),
            class: (props.action==="edit" ? user.class : "")
        },
        validate: validateRobotData,
        onSubmit: values => {
            if (props.action==="edit") {
                //props.hideAdd({loading: true})
                
            }
            if (props.action==="add") {
                props.hideAdd({loading: true})
                Axios.post(domain+"/users/add",{
                    name: values.name,
                    password: values.password,
                    email: values.email,
                    classname: values.class
                }).then(response=>{
                    props.hideAdd({loading: false, fetchSuccess: true});
                }).catch(err=>{
                    window.alert("Error\n"+err)
                })
            }
            users.push(values);
        }
    });

    return (
        <form onSubmit={formik.handleSubmit} className="addRobotForm" style={{ color: "white" }}>
            <h4>{(props.action==="edit" ? "Edit:" : "Add a new user:")}</h4><br />
            <p>
                <label htmlFor="id">User id:</label>
                <input
                    type="text" name="id" id="id" value={formik.values.id}
                    onChange={formik.handleChange} onBlur={formik.handleBlur}>
                </input>

                {formik.touched.id && formik.errors.id ? <span style={{ color: 'red' }}>{formik.errors.id}</span> : <br />}
            </p>
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
                    type="text" name="class" id="class" disabled={(formik.values.role === "admin") ? "disabled" : ""} value={(formik.values.role === "admin") ? "/" : formik.values.class}
                    onChange={formik.handleChange} onBlur={formik.handleBlur}>
                </input><br />
            </p>
            <button type="submit" className="blueBtn" style={{ width: '48%', backgroundColor: "#092768" }}>{(props.action==="edit" ? "Update" : "Add")}</button>&nbsp;
            <button onClick={props.hideAdd} className="calcelAdd" style={{ width: '48%' }}>Cancel</button>
        </form>
    )
}

export default AddUser;
