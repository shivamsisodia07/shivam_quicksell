import Card from "./card";
function category(props) {
  // console.log(props.value);
  return (
    
      <div className="col">
      <div className="cgbox">
      <div className="cghead">
      <div className="flexbox">
          {props.image && <img src={props.image} className="corner-img" />}
          <div>{props.title}</div>
          {props.grouping == "Priority" &&
            <div style={{ padding: "0px 5px" }}>{props.arr
              .filter((item) => item.priority === props.value).length}</div>}
          {props.grouping == "Status" &&
            <div style={{ padding: "0px 5px" }}>{props.arr
              .filter((item) => item.status === props.value).length}</div>}
          {props.grouping == "User" &&
            <div style={{ padding: "0px 5px" }}>{props.arr
              .filter((item) => item.userId === props.value).length}</div>}

        </div>
          <div className="flexbox">
            <div>
              <span class="material-symbols-outlined">add</span>
            </div>{" "}
            <div>
              <span class="material-symbols-outlined">pending</span>
            </div>
          </div>
        </div>

        {props.grouping == "Priority" &&
          props.arr
            .filter((item) => item.priority === props.value)
            .map((item, i) => {
              return <Card item={item} key={item.id}></Card>;
            })}
        {props.grouping == "Status" &&
          props.arr
            .filter((item) => item.status === props.value)
            .map((item, i) => {
              {/* console.log(item.status); */}
              return <Card item={item} key={item.id}></Card>;
            })}
        {props.grouping == "User" &&
          props.arr
            .filter((item) => item.userId === props.value)
            .map((item, i) => {
              return <Card item={item} key={item.id}></Card>;
            })}
      </div>
       
      </div>
   
  );
}

export default category;
