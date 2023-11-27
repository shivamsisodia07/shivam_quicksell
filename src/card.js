import "./card.css";
function card(props) {
  return (
    <div className="cardbox">
      <div className="card-body">
        <div className="card-head">
          <div className="head-text">{props.item.id}</div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
              className="profile-img"
            />
          </div>
        </div>
        <div className="card-text">
          {props.item.title}
        </div>
        <div className="card-footer">
          <div className="feature-box">
          <span class="material-symbols-outlined">
error
</span>
          </div>
          <div className="feature-box">
            <div className="round-box"></div>
            <div className="feature-text">
             
                {props.item.tag[0]}

             </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default card;
