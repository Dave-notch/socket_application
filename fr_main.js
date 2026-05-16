
const toggle = document.querySelector(".menu-toggle");
const links = document.querySelector(".nav-links");
let username = prompt("Enter your name:");




toggle.addEventListener("click", () => {
links.classList.toggle("active");
  });

let SendBtn=document.getElementById("SendBtn")
let input_area=document.getElementById("input_area")




const socket = io("ws://localhost:8080")

socket.on('message',(data) =>{

    
createMessage(data.username, data.text)


 
})



SendBtn.addEventListener("click",()=>{
    let in_area=input_area.value
  

    if(in_area){
    socket.emit('message',{
        username:username,
        text: in_area
    })
    input_area.value=""
    }

})

function createMessage(text){
    let el=document.createElement("div")
    el.className="flex justify-end p-2 bg-green-200 w-50 label corner rounded flex-col gap-1 rounded-tr-none label2 sooceli innerGR"
    let el2=document.createElement("div")
    let el3=document.createElement("p")
    el3.className="text-sm text-green-700 border-t flex label2 justify-end"

    const time = new Date().toLocaleTimeString([],{
        hour: "2-digit",
        minute: "2-digit"
    })
    el3.innerHTML=time
    el2.innerHTML = `${username}: ${text}`;

    el.appendChild(el2)
    el.appendChild(el3)
    document.getElementById("messeges").appendChild(el);

}