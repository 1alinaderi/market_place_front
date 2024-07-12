import { useRouter } from 'next/router';
import React from 'react'

const Payment = () => {
    const url = 'https://api.cryptocloud.plus/v2/invoice/create';
    const headers = new Headers({
        'Authorization': 'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiTWpNek9UTT0iLCJ0eXBlIjoicHJvamVjdCIsInYiOiJjMjk0OTYzZmIxNGJjOTIzMjEyZWViN2YxM2VlMDY2Y2IwNDZjMTVmYThhYzllNDc4ZTgyMzc1ZGI5ZjI3NGFmIiwiZXhwIjo4ODEyMDY4MzM5Mn0.oUrG2q4Ta7eIPaNCb-nCOVaXxE1BjAcsC9x-u-A7uP0',
        "Content-Type" : "application/json"
    });

    const bodyfirst = {
        shop_id : "2Gt7Ur32pAyo7bgQ",amount : 50
    }

    const router = useRouter()


    function getAuth() {
        fetch(url, { method: 'POST', headers , body : JSON.stringify(bodyfirst)})
        .then(async response => {            
            if (response.ok) {
                const res = await response.json()
                if (res.status == "success") {
                    router.push(res.result.link)
                }

            } else {
                return Promise.reject('Auth error');
            }
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Fail:', error);
        });
                   }


  return (
    <button onClick={getAuth}>Payment</button>
  )
}

export default Payment