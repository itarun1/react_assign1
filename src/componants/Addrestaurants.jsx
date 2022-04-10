import axios from "axios";
import { useState } from "react"

export const Addrestaurants = ()=>{
    const[data,setdata]=useState({})
    const handlechange=(e)=>{
    const{id,value}=e.target;
    setdata({
        ...data,
        [id]:value
    })
    }

    const handlesubmit=(e)=>{
       e.preventDefault()
     axios.post("http://localhost:3001/get-restaurants",data).then((res)=>{
     alert("Data Added")
     })
    }
    
    return (
        <div>
            <form onSubmit={handlesubmit} action="">
                <label htmlFor="">Restaurant Name</label>
                <input onChange={handlechange} type="text" name="" id="name" />

                <div style={{marginBottom:'20px'}}>
                    <label htmlFor="">Cuisine</label>
                    Continental<input  type="checkbox" name="" id="cuisine" value="continental"  />
                    Asian<input type="checkbox" name="" id="cuisine" value="Asian" />
                    Pizza<input type="checkbox" name="" id="cuisine" value="Pizza" />
                    Deserts<input type="checkbox" name="" id="cuisine" value="Deserts" />
                </div>
                
                <label htmlFor="">cost for two</label>
                <input onChange={handlechange} type="text" name="" id="costForTwo" />

                <label htmlFor="">Min Order</label>
                <input onChange={handlechange} type="text" name="" id="minOrder" />

                <label htmlFor="">Delivery Time</label>
                <input onChange={handlechange} type="text" name="" id="deliveryTime" />

               <div style={{marginBottom:'20px'}}>
                    <label htmlFor="">Payment Mehods</label>
                    Card<input type="checkbox" name="" id="payment_methods" value='card'  />
                    Cash<input type="checkbox" name="" id="payment_methods" value='cash' />
                    All<input type="checkbox" name="" id="payment_methods" value='all' />
               </div>

                <label htmlFor="">Rating</label>
                <input onChange={handlechange} type="text" name="" id="rating" />

                <label htmlFor="">votes</label>
                <input onChange={handlechange} type="text" name="" id="votes" />

                <label htmlFor="">reviews</label>
                <input onChange={handlechange} type="text" name="" id="reviews" />

                <label htmlFor="">Image</label>
                <input onChange={handlechange} type="text"  id="src"  />

                <button>Submit</button>
            </form>
            

        </div>
    )
}