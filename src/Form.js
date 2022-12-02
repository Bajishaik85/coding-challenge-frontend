
import React from 'react'
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function Form() {

    let [post, setPost] = useState([]);
    let [err, setErr] = useState(false);

    let [newUser, setUser] = useState([]);
    let [newTitle, setTitle] = useState([]);
    let [newBody, setBody] = useState([]);
    const [data, setdata] = useState([]);
    var handleError = () => {
        (newUser.length === 0 || newTitle.length === 0 || newBody.length === 0) ? setErr(true) : setErr(false);
    }

    var handleSumbit = function (e) {
        e.preventDefault();
        handleError();
        try {
            if (newUser.length > 0 && newTitle.length > 0 && newBody.length > 0) {
                axios.post("https://jsonplaceholder.typicode.com/posts", {
                    title: newTitle,
                    body: newBody,
                    userId: newUser
                }).then(res => { setdata([res.data]) });
            }
        }
        catch (e) {
            console.log("Error from PostMethod");
            console.log(e);
        }
    }

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users").then(res => setPost(res.data)).catch(error => console.log(error))
    }, []);
    console.log(data);

    return (
        <>
            <div className='container mx-auto'>
                <h3 className="text-primary text-center fw-bold">Code Challenge From AdMyBrand Submitted By Baji Shaik</h3>
                <form onSubmit={handleSumbit}>
                    {err && newUser.length <= 0 ? <small className="err1">*Plese Select the User</small> : ""}
                    <div className='selectUser'>
                        <select name="" id="user" className="user" value={newUser} onChange={e => { setUser(e.target.value); }}>
                            <option value="" hidden>Select User</option>
                            {post.map((p) => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                    </div>
                    {err && newTitle.length <= 0 ? <small className="err2">*Plese Enter the Title</small> : ""}
                    <div className="titleDiv form-floating mb-3">
                        <input type="text" className='form-control' name="" id="title" value={newTitle} placeholder="Leave a comment here" onChange={e => { setTitle(e.target.value); }} />
                        <label for="title" className="label-1">Enter the Title</label>

                    </div>

                    {err && newBody.length <= 0 ? <small className="err3">*Plese Enter the Content</small> : ""}
                    <div className="bodyDiv form-floating">
                        <textarea className='form-control h-25' name="" id="body" rows={5} value={newBody} onChange={e => { setBody(e.target.value); }} />

                        <label for="body" className="from-label">Enter the Body</label>



                    </div>
                    <div class="d-grid gap-2 col-6 mx-auto mt-2">
                        <button className='btn btn-primary' type="submit">submit</button>

                    </div>
                </form>
            </div>

            <div>
                <h1 className='text-primary text-center mt-5'>Added Data</h1>
                {data.length === 0 ? <h1 className='text-black text-center'>Please Enter something to show the data</h1> : <h1>{data.map((p) => (
                    <><h3 className='text-dark text-center'>UserId:{p.userId}</h3><h3 className='text-dark text-center'>Title:{p.title}</h3><h3 className='text-dark text-center'>Body:{p.body}</h3></>
                ))}</h1>}





            </div>

        </>
    )
}

