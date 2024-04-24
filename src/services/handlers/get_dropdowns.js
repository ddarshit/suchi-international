import apiHandler from "../apiHandler";

export async function getCategory(){
   const response= await  apiHandler("GET",'/data/productCategory/get');

   console.log(response);
   const data=[];
   const res= response['Company Details']['Company name'] ;
   console.log(res)
   for(var i=0;i<res.length;i++){
      const obj= {
         "id":res[i]['id'],
         "value":res[i]['category_name']
      };

      data.push(obj);
   }
   console.log(data);
   return data;
}

export async function getState(){
   const response= await  apiHandler("GET",'/master/state');
   console.log("state",response);
   return response;
}

export async function getCities(stateId){
   const response= await  apiHandler("GET",`/master/city/cities/${stateId}`);
   
   return response;
}

export async function getTax(){
   const response= await  apiHandler("GET",'/dropdown/tax/get');
   let data=response.map((e) => ({id:e.id,value: e.tax_name}));
   
   console.log("taxes",data);
   return data;
}

export async function getRawMaterial(){
   const response= await  apiHandler("GET",'/dropdown/raw-material/get');
   let data=response.map((e) => ({id:e.id,value: e.raw_material_name}));
   
   console.log("Raw Material",data);
   return data;
}

export async function getStage(){
   const response= await  apiHandler("GET",'/dropdown//stage/get');
   let data=response.map((e) => ({id:e.id,value: e.stage_name}));
   
   console.log("Stage",data);
   return data;
}