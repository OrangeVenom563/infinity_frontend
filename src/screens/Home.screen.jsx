import React, { useState, useEffect, useContext } from "react";
import {UserContext} from '../App';


const Home = () => {
  const [data, setData] = useState([]);
  const {state} = useContext(UserContext);

  useEffect(() => {
    fetch("https://dry-wave-33980.herokuapp.com/allpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
      });
  }, []);

  const likePost = (id) => {
      fetch("https://dry-wave-33980.herokuapp.com/like",{
          method:"put",
          headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt")
          },
          body:JSON.stringify({
              postId:id
          })
      })
      .then(res=>res.json())
      .then(result=>{
          const newData = data.map(item=>{
              if(item._id===result._id){
                  return result
              }
              else{
                  return item
              }
          })
          setData(newData)
      })
      .catch(err=>{console.log(err)})
  }

  const unlikePost = (id) => {
    fetch("https://dry-wave-33980.herokuapp.com/unlike",{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            postId:id
        })
    })
    .then(res=>res.json())
      .then(result=>{
          const newData = data.map(item=>{
              if(item._id===result._id){
                  return result
              }
              else{
                  return item
              }
          })
          setData(newData)
      })
      .catch(err=>{console.log(err)})
    
}

const makeComment = (text,postId)=>{
  fetch("https://dry-wave-33980.herokuapp.com/comment",{
    method:"put",
    headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
    },
    body:JSON.stringify({
        postId,
        text
    })
})
.then(res=>res.json())
.then(result=>{
    const newData = data.map(item=>{
        if(item._id===result._id){
            return result
        }
        else{
            return item
        }
    })
    setData(newData)
})
.catch(err=>{console.log(err)})
}

const deletePost = (postid)=>{
  fetch(`https://dry-wave-33980.herokuapp.com/deletepost/${postid}`,{
    method:"delete",
    headers:{
      "Authorization":"Bearer "+localStorage.getItem("jwt")
    }
  })
  .then(res => res.json())
  .then(result=>{
    const newData = data.filter(item=>{
      return item._id !== result._id;
    })
    setData(newData);
  })
  .catch(err=>console.log(err))
}

  return (
    <div className="home">
      {data.map((item) => {
        return (
          <div className="card home-card" key={item._id}>
            <h5>{item.postedBy.name}</h5>
            <div className="card-image">
              <img src={item.photo} alt="post pic" />
            </div>
            <div className="card-content">
              
              <i className="material-icons" style={{ color: "red" }}>favorite</i>
              { 
                  item.likes.includes(state._id)?
                  <i className="material-icons" onClick={()=>{unlikePost(item._id)}}>thumb_down</i>:
                  <i className="material-icons" onClick={()=>{likePost(item._id)}}>thumb_up</i>
              }
              {
                item.postedBy._id === state._id &&
                <i className="material-icons right" onClick={()=>{deletePost(item._id)}}>delete</i>
              }
              <h6>{item.likes.length} Likes</h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              {
                item.comments.map(record=>{
                  return(
                    <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name} </span>{record.text}</h6>
                  )
                })
              }
              <form onSubmit={(e)=>{
                e.preventDefault();
                makeComment(e.target[0].value,item._id);
                e.target[0].value='';
                }} >
              <input type="text" placeholder="add a comment" />
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
