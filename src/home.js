import React, { useState, useEffect } from "react";
import "./home.css";
import Category from './category.js'

function Home() {
  if (!localStorage.getItem("group")) {
    localStorage.setItem("group", "Status");
  }
  if (!localStorage.getItem("order")) {
    localStorage.setItem("order", "Priority");
  }
  let usersArr = [];
  const priorityArr = [{ title: "Urgent", value: 4, path: "./images/urgent.png" }, { title: "High", value: 3, path: "./images/high.png" }, { title: "Medium", value: 2, path: "./images/med.png" }, { title: "Low", value: 1, path: "./images/low.png" }, { title: "No Priority", value: 0,path: "./images/pending.png" }];

  const statusArr = [{ title: "Backlog", value: "Backlog", path: "./images/pending.png" }, { title: "Todo", value: "Todo", path: "./images/todo.png" }, { title: "In progress", value: "In progress", path: "./images/inprogress.png" }, { title: "Done", value: "Done", path: "./images/done.png" }, { title: "Cancelled", value: "Cancelled", path: "./images/backlog.png" }];
  // FETCHING USER INFO

  const filter = { "Status": statusArr, "Priority": priorityArr, "User": usersArr };
  const [filteredData, setfilteredData] = useState(null);
  const [grouping, setGrouping] = useState(localStorage.getItem("group"));
  const [ordering, setOrdering] = useState(localStorage.getItem("order"));
  const [arr, setArr] = useState(filter[grouping]);
  //const [, forceUpdate] = useState();
  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);
        usersArr = [];
        json["users"].map((item) => {
          usersArr.push({ title: item.name, value: item.id })
        })
        if (ordering == "Title") {
          json["tickets"].sort(function (a, b) {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
          });
        }
        else if (ordering == "Priority") {
          json["tickets"].sort(function (a, b) {
            if (a.priority < b.priority) return -1;
            if (a.priority > b.priority) return 1;
            return 0;
          });
        }
        setfilteredData(json);



        if (grouping == "User") {
          setArr(usersArr);
        }
      })
      .catch((error) => console.error(error));
  }, []);




  // ON CHANGING GROUPING VALUE
  function groupChange(e) {
    if (e.target.value === "Priority") {
      setArr(priorityArr)
    }
    else if (e.target.value === "User") {
      usersArr = [];
      filteredData["users"].map((item) => {
        usersArr.push({ title: item.name, value: item.id,path:'' })
      })
      setArr(usersArr);
    }
    else if (e.target.value === "Status") {
      setArr(statusArr)
    }
    setGrouping(e.target.value);
    localStorage.setItem("group", e.target.value);
  }



  // ON CHANGING ORDERING VALUE
  function orderChange(e) {
    localStorage.setItem("order", e.target.value);
    sortData(e.target.value);
    setOrdering(e.target.value);
  }

  // SORTING FUNCTION
  function sortData(parameter) {
    if (parameter === "Title") {
      // console.log("sort calling Title");
      filteredData["tickets"].sort(function (a, b) {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });

    }
    else if (parameter == "Priority") {
      // console.log("sort calling Priority");
      filteredData["tickets"].sort(function (a, b) {
        if (a.priority < b.priority) return -1;
        if (a.priority > b.priority) return 1;
        return 0;
      });
    }
    setfilteredData(filteredData);
    //forceUpdate({});
  }

  return (

    <div>
      <nav>
        <div className="dropdown">
          <div className="display-btn">
            <span className="material-symbols-outlined">tune</span>
            <span style={{ justifyContent: "center" }}>Display</span>
            <span className="material-symbols-outlined">expand_more</span>
          </div>
          <div className="dropdown-content">
            <div className="grouping">
              <h5>Group By: </h5>
              <select
                name="grouping"
                id="grouping"
                className="drop"
                onChange={groupChange}
                defaultValue={grouping}
              >
                <option value="Status">Status</option>
                <option value="User">User</option>
                <option value="Priority">Priority</option>
              </select>
            </div>
            <div className="ordering">
              <h5>Order By:</h5>
              <select
                name="ordering"
                id="ordering"
                className="drop"
                onChange={orderChange}
                defaultValue={ordering}
              >
                <option value="Priority" selected>Priority</option>
                <option value="Title">Title</option>
              </select>
            </div>
          </div>
        </div>
      </nav>


      <div className="flexbox">
        <h4 style={{ padding: "0px 5px 0px 20px" }}>Grouping:  </h4>{grouping}
        <h4 style={{ padding: "0px 5px 0px 20px" }}>Ordering:  </h4> {ordering}
      </div>


      {filteredData ?
        <div className="container" >
          {arr.length && arr.map((item, i) => {
            //console.log(item);
            return <Category title={item.title} value={item.value} arr={filteredData["tickets"]} grouping={grouping} key={i} image={item.path}> </Category>
          })}
        </div> : "No Tickets Found"}

    </div>
  );
}

export default Home;
