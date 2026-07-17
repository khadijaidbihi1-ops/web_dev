const grid=document.querySelector("#grid"),count=document.querySelector("#count"),empty=document.querySelector("#empty");
const search=document.querySelector("#search"),collection=document.querySelector("#collection"),gender=document.querySelector("#gender"),sort=document.querySelector("#sort");
const tabs=[...document.querySelectorAll("[data-type]")],params=new URLSearchParams(location.search);
let type=params.get("type")||"all"; collection.value=params.get("collection")||"all";
const placeholder=n=>`https://placehold.co/700x850/f3efe8/222?text=${encodeURIComponent(n)}`;

function render(){
 gender.hidden=type!=="perfume";
 tabs.forEach(b=>b.classList.toggle("active",b.dataset.type===type));
 let list=PRODUCTS.filter(p=>(type==="all"||p.type===type)&&(collection.value==="all"||p.collection===collection.value)&&(type!=="perfume"||gender.value==="all"||p.gender===gender.value)&&(`${p.name} ${p.collection}`.toLowerCase().includes(search.value.toLowerCase())));
 if(sort.value==="low")list.sort((a,b)=>a.price-b.price);
 if(sort.value==="high")list.sort((a,b)=>b.price-a.price);
 if(sort.value==="az")list.sort((a,b)=>a.name.localeCompare(b.name));
 count.textContent=list.length; empty.hidden=!!list.length;
 grid.innerHTML=list.map(p=>`<article class="card"><a class="image" href="product.html?product=${p.slug}"><img src="${p.images[0]}" alt="${p.name}" onerror="this.src='${placeholder(p.name)}'"></a><p class="eyebrow">${p.collection}</p><h2><a href="product.html?product=${p.slug}">${p.name}</a></h2><p class="muted">${p.type.replaceAll("-"," ")} · ${p.size}</p><b>£${p.price}</b></article>`).join("");
 document.querySelector("#page-title").textContent=collection.value!=="all"?`${collection.value[0].toUpperCase()+collection.value.slice(1)} Collection`:(type==="all"?"Shop All Products":tabs.find(b=>b.dataset.type===type).textContent);
}
tabs.forEach(b=>b.onclick=()=>{type=b.dataset.type;if(type!=="perfume")gender.value="all";render()});
[search,collection,gender,sort].forEach(el=>el.addEventListener(el.tagName==="INPUT"?"input":"change",render));
document.querySelector("#clear").onclick=()=>{type="all";search.value="";collection.value="all";gender.value="all";sort.value="featured";render()};render();