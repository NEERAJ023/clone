let header_cells=document.querySelector(".tools");
let row=100;
let column=26;
function create_header(){
for(let i=0; i<=column; i++){
    let cell=document.createElement("div");
    cell.className="cells";
if(i!==0){
    
    cell.innerText=String.fromCharCode(64+i);
}
    header_cells.appendChild(cell);
}
}
create_header();

let sno=document.querySelector(".sno");
 function create_row(){
    
    for(let i=1; i<=row; i++){
        let snocell=document.createElement("div");
        snocell.className="sno-cell";
        snocell.innerText=i;
        sno.appendChild(snocell);
    }
    
 }
 create_row();

 let col=document.querySelector(".body");
 function innercolumn(b){
    let row=document.createElement("div");
    row.className="row";
    for(let i=1; i<=column; i++){
       let innercell=document.createElement("div");
       innercell.className="innercell";
       innercell.contentEditable=true;

       innercell.id=String.fromCharCode(64+i) + b;
       
       row.appendChild(innercell);
       innercell.addEventListener("focus",onfocus);
       innercell.addEventListener("input",formchange);
    }
    
      col.appendChild(row);
      
 }
 
 function innerrow(){
    for(let i=1; i<=row; i++){
        innercolumn(i);
    }
 }
 innerrow();


/* for option icons */
let form =document.querySelector("form");
 let active_cell=document.querySelector("#active-cell");

 let state={};

 let defaultstate={
  bold:false,
  italic:false,
  underline:false,
  align:"left",
  color:"#000000",
  bgcolor:"#ffffff"
 }
 let activeElement=null;

function onfocus(event){
    elementID=event.target.id;
   active_cell.innerText=elementID;
    activeElement=event.target;
    if(state[elementID]){
         resetoption(state[elementID]);
    }else{
        resetoption(defaultstate);
    }
}
  
function resetoption(optionstate){
    form.bold.checked=optionstate.bold;
    form.italic.checked=optionstate.italic;
    form.underline.checked=optionstate.underline;
    form.align.value=optionstate.align;
    form.color.value=optionstate.color;
    form.bgcolor.value=optionstate.bgcolor;
   
}
function formchange(){
    if(!activeElement){
      alert("please select a cell");
      form.reset();
      return;
    }
    let currstate={
        textcolor:form.color.value,
        isbold:form.bold.checked,
        isitalic:form.italic.checked,
        isunderline:form.underline.checked,
        textalign:form.align.value,
        bgcolor:form.bgcolor.value
    }


    applystyletotext(currstate);

    state[activeElement.id]={...currstate,value:activeElement.innerText};
}
function applystyletotext(subjectobject){
    
        activeElement.style.color=subjectobject.textcolor;
        activeElement.style.backgroundColor=subjectobject.bgcolor;
        activeElement.style.textAlign=subjectobject.textalign;
        if(subjectobject.isbold){
            activeElement.style.fontWeight="bold";
        }else{
            activeElement.style.fontWeight="normal";
        }
        if(subjectobject.isitalic){
            activeElement.style.fontStyle="italic";
        }else{
            activeElement.style.fontStyle="normal";
        }
        if(subjectobject.isunderline){
            activeElement.style.textDecoration="underline";
        }else{
            activeElement.style.textDecoration="none";
        }
        
}

/* for import and export */

let but1= document.querySelector(".import");
let but2= document.querySelector(".export");

but1.addEventListener("click",()=>{
let data=JSON.stringify(state);
let file=new Blob([data], {type:"application/json"})
let url = URL.createObjectURL(file);
let link=document.createElement("a");
link.href=url;
link.download="sheet.json";
link.click();
})

/* for cut , copy , paste */
let copy=document.querySelector("#copy");
let cut=document.querySelector("#cut");
let paste=document.querySelector("#paste");
let content="";
copy.addEventListener("click",()=>{
    content=activeElement.innerText;
})
paste.addEventListener("click",()=>{
    activeElement.innerText=content;
    
})
cut.addEventListener("click",()=>{
    content=activeElement.innerText;
    if(cut){
        activeElement.innerText="";
    }
})

let input=document.querySelector(".input");
input.addEventListener("focus",()=>{
    let expression=input.value;
    let result=eval(expression);
    activeElement.innerText=result;
})

