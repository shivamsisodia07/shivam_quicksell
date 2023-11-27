import Card from "./card";
function category(props) {
  // console.log(props.value);
  return (
    
      <div className="col">
        <div className="cghead">
          <div className="flexbox">
            <div>{props.title}</div>
            <div style={{ padding: "0px 5px" }}>2</div>
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
   
  );
}

export default category;
