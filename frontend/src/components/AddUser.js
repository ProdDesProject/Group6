import React from "react";
import users from "../users";
import { useFormik } from "formik";

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
    if (!userData.role) {
        errors.role = "User's role is missing"
    }
    return errors;
}


const AddUser = (props) => {
    const user = (props.id ? users.find(x => x.id === props.id) : null);
    const formik = useFormik({
        initialValues: {
            id: (props.id ? user.id : ""),
            name: (props.id ? user.name : ""),
            email: (props.id ? user.email : ""),
            password: (props.id ? user.password : ""),
            role: (props.id ? user.role : ""),
            class: (props.id ? user.class : "")
        },
        validate: validateRobotData,
        onSubmit: values => {
            if (props.id) {
                const deleteUser = users.findIndex(function (i) {
                    return i.id === props.id;
                })
                users.splice(deleteUser, 1);
            }
            users.push(values);
            props.hideAdd();
        }
    });

    return (
        <form onSubmit={formik.handleSubmit} className="addRobotForm" style={{ color: "white" }}>
            <h4>{(props.id ? "Edit:" : "Add a new user:")}</h4><br />
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
                <label htmlFor="role">Role:</label>
                <select
                    name="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}>
                    <option value="" label="" />
                    <option value="user" label="user" />
                    <option value="admin" label="admin" />
                </select>
                {formik.touched.role && formik.errors.role ? <span style={{ color: 'red' }}>{formik.errors.role}</span> : <br />}
            </p>
            <p>
                <label htmlFor="class">Class:</label>
                <input
                    type="text" name="class" id="class" disabled={(formik.values.role === "admin") ? "disabled" : ""} value={(formik.values.role === "admin") ? "/" : formik.values.class}
                    onChange={formik.handleChange} onBlur={formik.handleBlur}>
                </input><br />
            </p>
            <button type="submit" className="blueBtn" style={{ width: '48%', backgroundColor: "#092768" }}>{(props.id ? "Update" : "Add")}</button>&nbsp;
            <button onClick={props.hideAdd} className="calcelAdd" style={{ width: '48%' }}>Cancel</button>
        </form>
    )
}

export default AddUser;
