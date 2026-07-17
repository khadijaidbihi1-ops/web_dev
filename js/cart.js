const wrap=document.querySelector("#cart-items"),
total=document.querySelector("#cart-total");
function renderCart()
{const cart=MEHEK.getCart();
    if(!cart.length)
        {wrap.innerHTML='<p>Your bag is empty. 
            <a href="products.html">Explore products</a>.
            </p>';total.textContent='£0.00';return}wrap.innerHTML=cart.map((i,n)=>
                `<div class="cart-row">
            <img src="${i.image}" alt="${i.name}" onerror="MEHEK.imageFallback(this,
            '${i.name.replace(/'/g,"\'")}')">
            <div><strong>${i.name}</strong>
            <p>${i.size} · Quantity ${i.quantity}</p>
            </div>
            <span class="price">£${(i.price*i.quantity).toFixed(2)}</span>
            <button class="button outline" data-remove="${n}">Remove</button></div>`).join('');total.textContent='£'+cart.reduce((s,i)=>s+i.price*i.quantity,0).toFixed(2);document.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{cart.splice(Number(b.dataset.remove),1);MEHEK.saveCart(cart);renderCart()})}renderCart();