import React, { useEffect } from 'react'
import { FaCheck } from 'react-icons/fa';

const SuccessfullPayment = () => {
    const getUrl = "https://api.cryptocloud.plus/v2/invoice/merchant/info"

    const headers = new Headers({
        'Authorization': 'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiTWpNek9UTT0iLCJ0eXBlIjoicHJvamVjdCIsInYiOiJjMjk0OTYzZmIxNGJjOTIzMjEyZWViN2YxM2VlMDY2Y2IwNDZjMTVmYThhYzllNDc4ZTgyMzc1ZGI5ZjI3NGFmIiwiZXhwIjo4ODEyMDY4MzM5Mn0.oUrG2q4Ta7eIPaNCb-nCOVaXxE1BjAcsC9x-u-A7uP0',
        "Content-Type" : "application/json"
    });

    function getStatus() {
        const newbody = {uuids :[localStorage.getItem("uuid")]}
        fetch(getUrl, { method: 'POST', headers , body : JSON.stringify(newbody)})
        .then(async response => {            
            if (response.ok) {
                const res = await response.json()
                console.log(res)
            } else {
                return Promise.reject('Auth error');
            }
        })
        .catch(error => {
            console.error('Fail:', error);
        });
    }

    useEffect(()=>{
      getStatus()
    },[])
  return (
    <div className='flex justify-center items-start w-full h-full'>
        <FaCheck className='text-green-500' size={50}/>
    </div>
  )
}

export default SuccessfullPayment