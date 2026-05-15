let SendBtn=document.getElementById("SendBtn")
let input_area=document.getElementById("input_area")
SendBtn.addEventListener("click",()=>{
let in_area=input_area.value
let el=document.createElement("div")
el.className="flex justify-end p-2 bg-green-200 sooceli"

    if(in_area){
    el.innerHTML=in_area
    document.getElementById("messeges").appendChild(el)
    }

})