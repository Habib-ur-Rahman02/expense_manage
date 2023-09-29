import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import Table from './table';

const Crud = () => {

    const [user,setUser]=useState([]);

    const [data,setData]=useState({
        type:"",
        friend:"",
        name:"",
        date:"",
        currency:"",
        amt:""
    });

    const change=(e)=>{
        setData({...data,[e.target.name]:[e.target.value]});
        //console.log(data.currency);
    };

    const {type,friend,name,date,currency,amt}=data;

    function addInfo(e){
        e.preventDefault();
        if(type&&friend&&name&&date&&currency&&amt)
        {
            async function addData(e){
                    //e.preventDefault();
                    let res= await axios.post('https://expense-manage-27fd2-default-rtdb.firebaseio.com/expense.json',data);
                    if(res)
                    {
                        setUser([...user,{type,friend,name,date,currency,amt}])
                        alert("data added successfully");

                        
                        setData({
                            type:data.id,
                            friend:"",
                            name:"",
                            date:"",
                            currency:"",
                            amt:"",
                        })
                    }
            }
            addData();
        }
        else{
            alert("please fill all the fields");
        }
    }


  return (
    <>
    <h1 className='justify-content-center'>Expense Manager</h1>
    <hr />
    <form>
        <div className='container bg-secondary'>
            <br />
            <div className='row'>
                <div className='col-6'>
                    Type : <select name='type' value={data.id} onChange={change} autoComplete='off' required>
                        <option id='cash'>Cash</option>
                        <option id='upi'>UPI</option>
                    </select>
                </div>
                <div className='col-6'>
                    Add Friend : <input type='text' name='friend' value={data.friend} 
                    onChange={change} autoComplete='off' placeholder='Enter Friend name'  required/>
                </div>            
            </div>
            <br />
            <div className='row'>
                <div className='col-6'>
                    Name : <input type='text' name='name' value={data.name} autoComplete='off' onChange={change} placeholder='Enter your name'  required/>
                </div>
                <div className='col-6'>
                    Date : <input type='date' name='date' value={data.date} onChange={change} autoComplete='off'  required/>
                </div>            
            </div>
            <br />
            <div className='row'>
                <div className='col-6'>
                    Currency : <select name='currency' value={data.id} onChange={change} required>
                        <option id='rs'>RS</option>
                        <option id='usd'>USD</option>
                    </select>
                </div>
                <div className='col-6'>
                    Amount : <input type='number' name='amt' value={data.amt} onChange={change} autoComplete='off'  required/>
                </div>            
            </div>
            <br />
            <div className='row justify-content-center '>
                <div className='col-3'>
                    <button onClick={addInfo} >Add Expense</button>
                </div>
            </div>
        </div>
    </form>
    
    {/* {<Table data={{
                            type:data.type,
                            friend:data.friend,
                            name:data.name,
                            date:data.date,
                            currency:data.currency,
                            amt:data.amt
                        }}/>   }  */}

    
<table className='table table-bordered'>
        <thead>
            <tr>
                <td>Type</td>
                <td>Friend Name</td>
                <td>Name</td>
                <td>Date</td>
                <td>Currency</td>
                <td>Amount</td>
            </tr>
        </thead>
        <tbody>
        
            {
            user.map((v,i)=>{
                return(
                    <>
                    <tr key={i}>
                    <td>{v.type}</td>
                    <td>{v.friend}</td>
                    <td>{v.name}</td>
                    <td>{v.date}</td>
                    <td>{v.currency}</td>
                    <td>{v.amt}</td>
                    </tr>
                    </>
                )
            })}
        </tbody>
    </table>


    </>
  )
}

export default Crud