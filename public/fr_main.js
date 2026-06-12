const toggle = document.querySelector(".menu-toggle");
const links = document.querySelector(".nav-links");



toggle.addEventListener("click", () => {
links.classList.toggle("active");
  });
let SendBtn=document.getElementById("SendBtn")
let input_area=document.getElementById("input_area")

const socket = io()

SendBtn.addEventListener("click",async()=>{
    let in_area=input_area.value

      if (in_area) {
        
        // input_area.value = "";
        const token=localStorage.getItem("token")
        const res= await fetch("/socketDB",{
            method:"POST",
            headers:{
                "Content-type": "application/json",
                authorization:`Bearer ${token}`
            },
            body: JSON.stringify({
                in_area
            })
        })
        const data = await res.json()
        console.log(data);

        socket.emit("message", in_area);
        
    }
});

socket.on('message',(data)=>{

    let isME=data.id===socket.id

    if(isME){
        createMessage(data.text)

    }else{
        recieving(data.text)
    }
})



function createMessage(text){
    let el=document.createElement("div")
    el.className="flex justify-end pl-9 bg-green-200 w-50  label corner rounded flex-col gap-1 rounded-tr-none label2 sooceli innerGR"
    let el2=document.createElement("div")
    let el3=document.createElement("p")
    el3.className="text-sm text-green-700 border-t flex label2 justify-end"

    const time = new Date().toLocaleTimeString([],{
        hour: "2-digit",
        minute: "2-digit"
    })
    el3.innerHTML=time
    el2.innerHTML =text;

    el.appendChild(el2)
    el.appendChild(el3)
    document.getElementById("messeges").appendChild(el);
}

function recieving(text){
    let el=document.createElement("div")
    el.className="flex justify-start bg-gray-200 pb-2 w-50  rounded rounded-tl-none label flex-col gap-1 soosiki innerGR"
    let el2=document.createElement("div")
    let el3=document.createElement("p")
    el3.className="text-sm text-green-700 border-t flex label2 justify-end"

    const time = new Date().toLocaleTimeString([],{
        hour: "2-digit",
        minute: "2-digit"
    })
    el3.innerHTML=time
    el2.innerHTML =text;

    el.appendChild(el2)
    el.appendChild(el3)
    document.getElementById("messeges").appendChild(el);
}

// const token=localStorage.getItem("token")
// async function checkJwt(){
//     const res=await fetch("/checkJWT",{
//         method:"POST",
//         headers:{
//             authorization:`Bearer ${token}`
//         }

//     })

//     const data = await res.json()

//     console.log(data);

//     if(data.userid !== undefined){


//     }
// }

// checkJwt()