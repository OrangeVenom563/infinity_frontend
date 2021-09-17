import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../globals/constants";

const UserProfile = () => {
  const [mypic, setPics] = useState(null);
//   const {state} = useContext(UserContext);
  const {userid} = useParams();

  useEffect(() => {
      console.log(userid)
    fetch(URL+`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
          console.log(result)
        setPics(result);
      });
  }, []);
  return (<>
      {!mypic? <div>loading</div>:
      
        <div style={{ maxWidth: "550px", margin: "auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src="https://cdn.sprintally.com/img/2018/05/kristina-pimenova4.jpg"
          />
        </div>
        <div>
          <h4>{mypic.user.name}</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <h6>40 posts</h6>
            <h6>52 followers</h6>
            <h6>31 following</h6>
          </div>
        </div>
      </div>

      <div className="gallery">
        {mypic.posts.map((item) => (
          <img key={item._id} className="item" src={item.photo} alt={item.title} />
        ))}
      </div>
    </div>
      }
    </>
  );
};

export default UserProfile;
