const button = document.getElementById("checkout")
// This code sends and gets back a response back from the server
// If the url is ok it will redirect the user, otherwise
button.addEventListener("click",()=>{
   fetch('/create-checkout-session',{
    method:'POST',
    headers:{
        'Content-Type' : 'application/json'
    },
    body : JSON.stringify({
        items : [
            {id : 1, quantity: 843},
            {id : 2, quantity : 831}
        ]
    })
   }).then(res=>{
    if (res.ok) return res.json()

    return res.json().then(json => Promise.reject(json))

   }).then(({url}) => {
    window.location  = url
   }).catch(e =>{
    console.log(e.error)
   })
})