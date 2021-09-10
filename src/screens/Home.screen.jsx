import React from "react";

const Home = ()=>{
    return(
        <div className="home">
            <div className="card home-card">
                <h5>Div Alisha</h5>
                <div className="card-image">
                    <img src="https://picsum.photos/300/200" alt="post pic"/>
                </div>
                <div className="card-content">
                <i class="material-icons" style={{color:"red"}}>favorite</i>
                    <h6>title</h6>
                    <p>This is great</p>
                    <input type='text' placeholder="add a comment"/>
                </div>
            </div>
        </div>
    )
}

export default Home;