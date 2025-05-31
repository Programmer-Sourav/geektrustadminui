import { useEffect, useState } from "react"
import "./admin.css"
import deleteIcon from "./assets/delete.png"
import editIcon from "./assets/edit.png"
import saveIcon from "./assets/save.png"
//import { getListOfUsers } from "./network"

export default function Home(){
   const listOfUsers = [{name: "Test1", role: "Role1", email: "remail1@gmail.com"}, {name: "Test2", role: "Role2", email: "email2@gmail.com"}, {name: "Test3", role: "Role3", email: "role3@hotmail.com"}, {name: "Test4", role: "Role4", email: "role4@outlook.com"}]
   const [selectedCb, setSelectedCb] = useState([])
   const [users, setUsers] = useState([]);
   const [inputSearch, setInputSearch] = useState("")
   const [pageCount, setPageCount] = useState(1)
   const [editable, setEditable] = useState(false)
   const [selectAll, setSelectAll] = useState([])

   const itemsPerPage = 10;
   
   const lastItemIndex = pageCount * itemsPerPage;
   const firstItemIndex = lastItemIndex - itemsPerPage;
   
   let dataToBeDisplayed = users;


   const whatIsMyCurrentPageNumber = (currentPage) =>{
         // console.log(4455, currentPage)
         setPageCount(currentPage+1)
   }
 


   const goToPreviousPage = () =>{
      if(pageCount>1)
      setPageCount(pageCount-1)
   }

   const goToNextPage = () =>{
      //console.log("Next", pageCount)
      setPageCount(pageCount + 1)
   }

   async function getListOfUsers (){
    const url = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    try{
      const response = await fetch(url);
      const jsondata = await response.json();
      console.log(12121, jsondata);
      setUsers(jsondata);
    }
    catch(error){
      console.error(error);
    }
  }
  

   useEffect(()=>{
    getListOfUsers()
   }, [])


   const handleClick = () => {
      const updatedUsers = users.filter(user => 
          !selectedCb.includes(user.id)
      );
      // Update the state with the filtered users
      setUsers(updatedUsers);
      setSelectedCb([])
  };
  

  const onNameChange = (nameVal, userId) =>{
     const updated = users.map((user)=>(user.id===userId ? {...user, name: nameVal} : user))
     setUsers(updated);
  }

  const onEmailChange = (emailVal, userId) =>{
   const updated = users.map((user)=>(user.id===userId ? {...user, email: emailVal} : user))
   setUsers(updated)
}

const onRoleChange = (roleVal, userId) =>{
   const updated = users.map((user)=>(user.id===userId ? {...user, role: roleVal} : user))
   setUsers(updated)
}

   const onChangeCheckBox= (value) =>{
    
         if(selectedCb.find((item)=>item===value)){
            console.log("Filter CB")
           const updated = selectedCb.filter((selectedItem)=>(selectedItem!==value))
           setSelectedCb(updated)
         }
         else{
            console.log("Add to CB")
            setSelectedCb( prevState =>[...prevState, value])
         }
   }
   // console.log(555, selectedCb)

   function searchByInput(searchVal){
    setUsers(users.filter((item)=>item.name===searchVal))
   }
   
   let filteredList = [];
   if(inputSearch!=""){
     // searchByInput(inputSearch)
     console.log(1111, inputSearch)
    filteredList =  users.filter((item)=>item.name.toLowerCase().includes(inputSearch.toLowerCase())|| item.email.toLowerCase().includes(inputSearch.toLowerCase()) || item.role.toLowerCase().includes(inputSearch.toLowerCase()))
    //setFilteredList(filteredList)
    dataToBeDisplayed = filteredList;
   }

 

   function onSearchChange(value){
    setInputSearch(value);
   }

   function deleteASingleItem(selectedObj){
      const deletedItem = users.filter((user)=>user.name!==selectedObj.name)
      setUsers(deletedItem);
      filteredList = users;
   }

   function editASingleItem(selectedObj){
      setEditable(editable=>!editable)
   }
   function saveASingleItem(){
      setEditable(editable=>!editable)
      //We can call any api to save the changes to the database here.
   }
   
   const onAllCbSelected = (allUsers) =>{
      
     //const updated = selectAll.filter((selectedItem)=>selectedItem)
   }

   if(filteredList.size>0){
      dataToBeDisplayed = filteredList;
      // console.log("DDD1", dataToBeDisplayed.length)
   }
   const totalPages = Math.ceil(dataToBeDisplayed.length/itemsPerPage);

   dataToBeDisplayed = dataToBeDisplayed.slice(firstItemIndex, lastItemIndex);
   //console.log("DDD2", dataToBeDisplayed.length)
   
//    const loadGoogleFontIcons = () =>{
//     const link = document.createElement('link');
//     link.href = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />';
//     link.rel = 'stylesheet';
//     document.head.appendChild(link);
//     console.log("End loading")
//    }

//    useEffect(()=>{
//     loadGoogleFontIcons();
//    }, [])


    return(
        <div className="adminbody">
            <input type="search" value={inputSearch} className="searchbar" placeholder="Search by name, email or role" onChange={(e)=>{onSearchChange(e.target.value)}}></input>
            <div className="sel-all-btn">
            <label>
                <input type="checkbox" checked={selectAll.includes(users)} onChange={()=>{onAllCbSelected(users)}}/>Select All
                </label>
            </div>
            <div className="listheader">
                <p>Name</p>
                <p>Email</p>
                <p>Role</p>
                <p>Actions</p>
            </div>
            <div className="cbitemholder">
            {dataToBeDisplayed.map((cbItem)=>(
                <div>
                <div  className="checkboxitems">
                <input type="checkbox"  checked={selectedCb.includes(cbItem.id)} onChange={()=>{onChangeCheckBox(cbItem.id)}}></input>
                {!editable && users.find((user)=>(user.id===cbItem.id)) ? <li className="listyle">{cbItem.name}</li> : <li className="listyle"><input type="text" className="inputdesign" value={cbItem.name} onChange={(e)=>{onNameChange(e.target.value, cbItem.id)}}/></li>}
                {!editable && users.find((user)=>user.id===cbItem.id) ? <li className="listyle">{cbItem.email}</li> : <li className="listyle"><input type="text" className="inputdesign" value={cbItem.email} onChange={(e)=>{onEmailChange(e.target.value, cbItem.id)}}/></li> }
                {!editable && users.find((user)=>user.id===cbItem.id) ? <li className="listyle">{cbItem.role}</li>: <li className="listyle"><input type="text" className="inputdesign" value={cbItem.role} onChange={(e)=>{onRoleChange(e.target.value, cbItem.id)}}/></li>}
                <div className="actions">
                {!editable ? <span class="icons"><img src={editIcon} className = "icons" alt="edit" onClick={()=>{editASingleItem(cbItem)}}/></span> : <span class="icons"><img src={saveIcon} className = "icons" alt="save" onClick={()=>{saveASingleItem(cbItem)}}/></span>}
                <span class="icons"><img src={deleteIcon} className="icons" alt="delete" onClick={()=>{deleteASingleItem(cbItem)}}/></span>
                </div>
                </div>
                </div>
            ))}
            </div>
         <div className="footer">
         <button onClick={handleClick} className="deletebtn">Delete Selected</button>
         <div className="pageiconholder">
            {pageCount>1 ? <button className="pageicon" onClick={goToPreviousPage}>Prev</button> :<button className="pageicondisabled" onClick={goToPreviousPage} disabled>Prev</button> }
            {filteredList.length===0 && users.length>10 || (users.length>10 && filteredList && filteredList.length>10) ? Array.from({ length: totalPages }).map((_, index)=>(<button key={index} onClick={()=>{whatIsMyCurrentPageNumber(index)}} className="pageicon">{index + 1}</button>)): ""}
            {(filteredList.length===0 && users.length>10 && pageCount<totalPages)|| (users.length>10 && filteredList && filteredList.length>10 && pageCount<totalPages ) ? <button className="pageicon" onClick={goToNextPage}>Next</button> : <button className="pageicondisabled" onClick={goToNextPage} disabled>Next</button>}
         </div>
         </div>   
        </div>
    )
}