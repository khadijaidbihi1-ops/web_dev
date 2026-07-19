"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const products = Array.isArray(window.products) ? window.products : [];
  const grid = document.querySelector("#products-grid");
  if (!grid) return;
  const search = document.querySelector("#product-search");
  const type = document.querySelector("#product-type-filter");
  const collection = document.querySelector("#collection-filter");
  const gender = document.querySelector("#gender-filter");
  const genderGroup = document.querySelector("#gender-filter-group");
  const sort = document.querySelector("#sort-products");
  const count = document.querySelector("#product-results-count");
  const empty = document.querySelector("#empty-results-message");
  const apply = document.querySelector("#apply-filters");
  const reset = document.querySelector("#reset-filters");
  const emptyReset = document.querySelector("#empty-results-reset");
  const params = new URLSearchParams(location.search);
  const homeTypes = ["scented-candle","reed-diffuser","room-spray"];
  const label = value => String(value || "").replace(/-/g," ").replace(/\b\w/g,c=>c.toUpperCase());
  const money = n => `£${Number(n).toFixed(2)}`;
  const getCart = () => { try { const x=JSON.parse(localStorage.getItem("shoppingCart")); return Array.isArray(x)?x:[]; } catch { return []; } };
  const saveCart = cart => { localStorage.setItem("shoppingCart",JSON.stringify(cart)); document.dispatchEvent(new CustomEvent("cart:updated")); };
  const toast = text => { let t=document.querySelector(".shop-toast"); if(!t){t=document.createElement("div");t.className="shop-toast";t.setAttribute("role","status");document.body.append(t);} t.textContent=text;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800); };
  function addToBag(product){ const v=product.variants?.[0] || {label:"",price:product.price}; const key=`${product.id}-${v.label||"default"}`; const cart=getCart(); const item=cart.find(x=>x.cartKey===key); if(item)item.quantity=(Number(item.quantity)||0)+1; else cart.push({cartKey:key,id:product.id,name:product.name,collection:`${label(product.collection)} Collection`,type:product.type,size:v.label,price:Number(v.price),image:product.images?.[0]||"",quantity:1}); saveCart(cart); toast(`${product.name} added to bag`); }
  function card(product){ const article=document.createElement("article");article.className="product-card"; const url=`product.html?id=${encodeURIComponent(product.id)}`; article.innerHTML=`<div class="product-media"><a class="product-image-link" href="${url}" aria-label="View ${product.name}"><img class="product-image" src="${product.images?.[0]||""}" alt="${product.name} from the ${label(product.collection)} Collection" loading="lazy"></a></div><div class="product-content"><p class="product-collection">${label(product.collection)} Collection</p><h3><a class="product-name-link" href="${url}">${product.name}</a></h3><p class="product-meta">${product.type}${product.gender?` · ${label(product.gender)}`:""}</p><p class="product-price">${money(product.price)}</p><button class="add-cart-button" type="button" data-id="${product.id}">Add to Bag</button></div>`; return article; }
  function syncGender(){ const perfume=type.value==="perfume"; genderGroup.hidden=!perfume; if(!perfume) gender.value="all"; }
  function render(){ const q=search.value.trim().toLowerCase(); let list=products.filter(p=>{ const t=type.value; const typeMatch=t==="all" || (t==="home-fragrance"?homeTypes.includes(p.category):p.category===t); const c=collection.value; const cMatch=c==="all"||p.collection===c; const g=gender.value; const gMatch=g==="all"||p.gender===g; const hay=[p.name,p.collection,p.category,p.type,p.gender,p.description,p.notes?.top,p.notes?.heart,p.notes?.base].join(" ").toLowerCase(); return typeMatch&&cMatch&&gMatch&&(!q||hay.includes(q)); });
    const mode=sort.value; list.sort((a,b)=>mode==="price-low-high"?a.price-b.price:mode==="price-high-low"?b.price-a.price:mode==="name-a-z"?a.name.localeCompare(b.name):mode==="name-z-a"?b.name.localeCompare(a.name):a.id-b.id);
    grid.replaceChildren(...list.map(card)); count.textContent=`Showing ${list.length} ${list.length===1?"product":"products"}`; empty.hidden=list.length>0;
  }
  const initialType=params.get("type")||params.get("category")||"all"; type.value=["perfume","hair-mist","home-fragrance","room-spray","reed-diffuser","scented-candle"].includes(initialType)?initialType:"all"; collection.value=params.get("collection")||"all"; search.value=params.get("search")||""; syncGender(); render();
  type.addEventListener("change",syncGender); apply.addEventListener("click",render); sort.addEventListener("change",render); search.addEventListener("keydown",e=>{if(e.key==="Enter")render();});
  function resetAll(){search.value="";type.value="all";collection.value="all";gender.value="all";sort.value="featured";syncGender();render();}
  reset.addEventListener("click",resetAll); emptyReset?.addEventListener("click",resetAll);
  grid.addEventListener("click",e=>{const b=e.target.closest(".add-cart-button");if(!b)return; const p=products.find(x=>x.id===Number(b.dataset.id));if(p)addToBag(p);});
});
