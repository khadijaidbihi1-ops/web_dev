const params=new URLSearchParams(location.search),product=PRODUCTS.find(p=>p.slug===(params.get("product")||"oud-legacy"))||PRODUCTS[0];
let current=0,qty=1; const $=s=>document.querySelector(s),placeholder=(n,l)=>`https://placehold.co/900x1050/f3efe8/222?text=${encodeURIComponent(n+" "+l)}`;
document.title=`${product.name} | MEHEK`; $("#crumb").textContent=product.name; $("#product-collection").textContent=`${product.collection} collection`; $("#name").textContent=product.name;
$("#price").textContent=`£${product.price}`;$("#size").textContent=product.size;$("#description").textContent=product.description;
$("#top").textContent=product.top.join(", ");$("#heart").textContent=product.heart.join(", ");$("#base").textContent=product.base.join(", ");

function gallery(){const img=$("#main-image");img.src=product.images[current];img.onerror=()=>img.src=placeholder(product.name,current?"Notes":"Bottle");$("#counter").textContent=`${current+1} / ${product.images.length}`;
$("#thumbs").innerHTML=product.images.map((src,i)=>`<button class="thumb ${i===current?"active":""}" data-i="${i}"><img src="${src}" onerror="this.src='${placeholder(product.name,i?"Notes":"Bottle")}'"></button>`).join("");
document.querySelectorAll(".thumb").forEach(b=>b.onclick=()=>{current=+b.dataset.i;gallery()})}
$("#prev").onclick=()=>{current=(current-1+product.images.length)%product.images.length;gallery()};
$("#next").onclick=()=>{current=(current+1)%product.images.length;gallery()};
if(product.variants){$("#variant-wrap").hidden=false;$("#variant").innerHTML=product.variants.map((v,i)=>`<option value="${i}">${v.label} — £${v.price}</option>`).join("");$("#variant").onchange=()=>{const v=product.variants[+$("#variant").value];$("#price").textContent=`£${v.price}`;$("#size").textContent=v.label}}
$("#minus").onclick=()=>{$("#qty").textContent=qty=Math.max(1,qty-1)};$("#plus").onclick=()=>{$("#qty").textContent=++qty};
$("#related").innerHTML=PRODUCTS.filter(p=>p.id!==product.id&&(p.collection===product.collection||p.type===product.type)).slice(0,4).map(p=>`<article class="card"><a class="image" href="product.html?product=${p.slug}"><img src="${p.images[0]}" onerror="this.src='${placeholder(p.name,"Bottle")}'"></a><p class="eyebrow">${p.collection}</p><h2>${p.name}</h2><b>£${p.price}</b></article>`).join("");gallery()