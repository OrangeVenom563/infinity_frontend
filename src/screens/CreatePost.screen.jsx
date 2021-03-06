import React, { useState, useEffect } from "react";
import { URL } from "../globals/constants";
import { useHistory } from "react-router";
import M from "materialize-css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const history = useHistory();

   useEffect(() => {
      if (url) {
        fetch(URL+"/createpost", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            title,
            body,
            photo: url,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              M.toast({ html: data.error, classes: "#c62828 red darken-3" });
            } else {
              M.toast({
                html: "Created Post Successfully",
                classes: "#43a047 green darken-1",
              });
              history.push("/");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, [url]);

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "infinity-app");
    data.append("cloud_name", "dmwtip1la");

    // console.log(localStorage.getItem("jwt"));
    // console.log(title,body,url);
    fetch("https://api.cloudinary.com/v1_1/dmwtip1la/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className="card input-field"
      style={{
        margin: "10px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        placeholder="title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="body"
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn">
          <span>Upload Image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        className="btn waves-effect waves-light #64b5f6 clue darken-1"
        onClick={() => postDetails()}
      >
        Submit Post
      </button>
    </div>
  );
};

export default CreatePost;
