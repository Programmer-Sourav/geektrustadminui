export const url = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

async function getListOfUsers (){
   try{
     const response = await fetch(url);
     const jsondata = await response.json();
     console.log(12121, jsondata);
   }
   catch(error){
     console.error(error);
   }
}


export { getListOfUsers };