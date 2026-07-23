"use strict";
document.addEventListener("DOMContentLoaded",
    ()=>{const f=document.querySelector("#contact-form");
        if(!f)return;
        f.addEventListener("submit",e=>{e.preventDefault();
            const fields=["name","email","subject","message"];
            let ok=true;
            fields.forEach(n=>{const el=f.elements[n],
                err=document.querySelector(`#${n}-error`);
                let msg="";
                if(!el.value.trim())msg="This field is required.";
                else if(n==="email"&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value))msg="Enter a valid email address.";
                else if(n==="message"&&el.value.trim().length<10)msg="Please enter at least 10 characters.";
                err.textContent=msg;
                el.setAttribute("aria-invalid",msg?"true":"false");
                if(msg)ok=false;});
                if(ok){document.querySelector("#form-success").hidden=false;
                    f.reset();}});});