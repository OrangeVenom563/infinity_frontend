import React from "react";

const Profile = ()=>{
    return(
        <div>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"18px 0px",
                borderBottom:"1px solid grey"
            }}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}} src="https://cdn.sprintally.com/img/2018/05/kristina-pimenova4.jpg"/>
                </div>
                <div>
                    <h4>Div Alisha</h4>
                    <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
                        <h6>40 posts</h6>
                        <h6>52 followers</h6>
                        <h6>31 following</h6>
                    </div>
                </div>
            </div>

            <div className="gallery">
                <img className="item" src="https://picsum.photos/200?random=1" alt='pic'/>
                <img className="item" src="https://picsum.photos/200?random=2" alt='pic'/>
                <img className="item" src="https://picsum.photos/200?random=3" alt='pic'/>
                <img className="item" src="https://picsum.photos/200?random=4" alt='pic'/>
                <img className="item" src="https://picsum.photos/200?random=5" alt='pic'/>
                <img className="item" src="https://picsum.photos/200?random=6" alt='pic'/>
                <img className="item" src="https://picsum.photos/200?random=7" alt='pic'/>
                <img className="item" src="https://picsum.photos/200?random=8" alt='pic'/>
                <img className="item" src="https://picsum.photos/200?random=9" alt='pic'/>
                
            </div>
        </div>
    )
}

export default Profile;
