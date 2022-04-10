import axios from "axios";
import { useEffect, useState } from "react"

export const RestaurantDetails=()=>{
  const [data,setdata]=useState([]);
  const [page,setpage]=useState(1);
  const [loading,setloading]=useState(true)
  useEffect(()=>{
   getdata(page)
  },[page])
  const getdata =()=>{
  axios.get(`http://localhost:3001/get-restaurants?_page=${page}&_limit=5`).then((res)=>{
   setdata(res.data)
   console.log(res.data)
  })
  }
 
  const handlesortacs=()=>{
    axios.get("http://localhost:3001/get-restaurants").then((res)=>{
        setdata(res.data.sort((a,b)=>{return a.costForTwo - b.costForTwo}))
        
       })
}
  const handlesotdesc=()=>{
    axios.get("http://localhost:3001/get-restaurants").then((res)=>{
   setdata(res.data.sort((a,b)=>{return b.costForTwo - a.costForTwo}))
   
  })
    
}





    return(
        <div>
           
            <h1 className="nameh1">Restaurant Names</h1>
            <h3>Pagination</h3>
            <div className="pagination">
            <button disabled={page==1} onClick={()=>{setpage((page)=>page - 1)}}>PREV</button>
            <button  onClick={()=>{setpage((page)=>page + 1)}}>NEXT</button>
         
           
            </div>
            <h3>Sort by Price</h3>
            <div className="sortbuttons">
            
            <button onClick={handlesortacs}>acs</button>
            <button onClick={handlesotdesc}>desc</button>
            </div>
            <h3>Food Ratings</h3>
            <div className="Ratingbuttons">
            <button onClick={()=>{axios.get("http://localhost:3001/get-restaurants?rating_gte=4").then((res)=>{setdata(res.data)})}}>4 and above</button>
            <button onClick={()=>{axios.get("http://localhost:3001/get-restaurants?rating_gte=3").then((res)=>{setdata(res.data)})}}>3 and above</button>
            <button onClick={()=>{axios.get("http://localhost:3001/get-restaurants?rating_gte=2").then((res)=>{setdata(res.data)})}}>2 and above</button>
            <button onClick={()=>{axios.get("http://localhost:3001/get-restaurants?rating_gte=1").then((res)=>{setdata(res.data)})}}>1 and above</button>
            <button onClick={()=>{getdata()}}>All</button>
            </div>
            <h3>Payment Options </h3>
            <div className="Payment Method">
            <button onClick={()=>{axios.get('http://localhost:3001/get-restaurants').then((res)=>{setdata(res.data.filter((e)=>{if (e.payment_methods.cash===true) {return true} else{return false}}))})}}>Cash</button>
            <button onClick={()=>{axios.get('http://localhost:3001/get-restaurants').then((res)=>{setdata(res.data.filter((e)=>{if (e.payment_methods.card===true) {return true} else{return false}}))})}}>Card</button>
            <button onClick={()=>{axios.get('http://localhost:3001/get-restaurants').then((res)=>{setdata(res.data.filter((e)=>{if (e.payment_methods.upi===true) {return true} else{return false}}))})}}>Upi</button>
            <button onClick={()=>{getdata()}}>all</button>
            </div>
         <div>
             {data.map((el)=>
             <div className="maindiv" key={el.id}>
                 <div className="main">
                    <div className="child1">
                        <img src={el.src} alt="Image Not Found" />
                    </div>
                   
                    <div className="child2">
                        <h2>{el.name}</h2>
                        {el.cuisine.map((el)=><div key={el} className="cuisine" >
                        <div>
                        <span>{el}</span>
                        </div>
                        </div>)}
                        <h3 className="cost">Cost For Two:-{el.costForTwo}₹</h3>
                        <h3 className="cost">Min:-₹{el.minOrder}</h3>
                        <h3 className="cost">Delivery Time:-{el.deliveryTime}Min</h3>
                        <div><h3 className="cost">accepts: 
                        {el.payment_methods.card?' card':''}
                         {el.payment_methods.cash?' cash':''}
                         {el.payment_methods.upi?' upi':''}
                         {el.payment_methods.all?' all':''}
                         </h3>
                         <div className="rat">Rating:-{el.rating}⭐</div>
                        </div>
                         <h3 style={{color:"green"}}>Order Now</h3>
                 </div>
                 
                 </div>
                 
                
             </div>
             )}
         </div>
        </div>
    )
}