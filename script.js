const WHATSAPP_NUMBER = '201102612084';
const ADMIN_PASSWORD = 'mohamed123#';
let cart = JSON.parse(localStorage.getItem('nxt8_cart')) || [];
let currentProductColors = [];

const defaultProducts = [
    {id:1,name:'Classic Black Suit',category:'men',price:3500,discount:2800,sizes:['S','M','L','XL'],colors:[{name:'Black',code:'#000000'},{name:'Navy',code:'#1a1a2e'},{name:'Gray',code:'#555555'}],image:'',description:'Premium black suit',featured:true,newArrival:false,stock:25},
    {id:2,name:'Gold Embroidered Blazer',category:'men',price:2200,discount:0,sizes:['M','L','XL'],colors:[{name:'Black',code:'#000000'},{name:'Gold',code:'#d4af37'}],image:'',description:'Luxury blazer',featured:true,newArrival:true,stock:15},
    {id:3,name:'Premium White Shirt',category:'men',price:850,discount:650,sizes:['S','M','L','XL','XXL'],colors:[{name:'White',code:'#ffffff'},{name:'Light Blue',code:'#add8e6'},{name:'Black',code:'#000000'},{name:'Pink',code:'#ffc0cb'}],image:'',description:'Egyptian cotton shirt',featured:true,newArrival:false,stock:50},
    {id:4,name:'Designer Denim Jacket',category:'men',price:1800,discount:0,sizes:['M','L','XL'],colors:[{name:'Blue',code:'#4169e1'},{name:'Dark Blue',code:'#1e3a8a'},{name:'Black',code:'#000000'}],image:'',description:'Handcrafted denim',featured:true,newArrival:true,stock:20},
    {id:5,name:'Slim Fit Chinos',category:'men',price:950,discount:750,sizes:['S','M','L','XL'],colors:[{name:'Beige',code:'#d2b48c'},{name:'Black',code:'#000000'},{name:'Navy',code:'#1a1a2e'},{name:'Olive',code:'#808000'}],image:'',description:'Comfortable chinos',featured:false,newArrival:true,stock:35},
    {id:6,name:'Elegant Evening Dress',category:'women',price:2800,discount:2200,sizes:['S','M','L'],colors:[{name:'Red',code:'#dc143c'},{name:'Black',code:'#000000'},{name:'Gold',code:'#d4af37'}],image:'',description:'Stunning gown',featured:true,newArrival:true,stock:10},
    {id:7,name:'Silk Blouse',category:'women',price:1200,discount:0,sizes:['S','M','L','XL'],colors:[{name:'White',code:'#ffffff'},{name:'Pink',code:'#ffc0cb'},{name:'Champagne',code:'#f7e7ce'},{name:'Black',code:'#000000'}],image:'',description:'Pure silk blouse',featured:true,newArrival:false,stock:30},
    {id:8,name:'High-Waist Palazzo',category:'women',price:1100,discount:900,sizes:['S','M','L'],colors:[{name:'Black',code:'#000000'},{name:'White',code:'#ffffff'},{name:'Beige',code:'#d2b48c'}],image:'',description:'Flowing palazzo',featured:false,newArrival:true,stock:25},
    {id:9,name:'Luxury Leather Bag',category:'accessories',price:1800,discount:1400,sizes:['One Size'],colors:[{name:'Black',code:'#000000'},{name:'Brown',code:'#8b4513'},{name:'Tan',code:'#d2b48c'}],image:'',description:'Genuine leather bag',featured:true,newArrival:true,stock:15},
    {id:10,name:'Gold Chain Necklace',category:'accessories',price:650,discount:0,sizes:['One Size'],colors:[{name:'Gold',code:'#d4af37'},{name:'Silver',code:'#c0c0c0'},{name:'Rose Gold',code:'#b76e79'}],image:'',description:'Gold-plated necklace',featured:false,newArrival:true,stock:40},
    {id:11,name:'Premium Sunglasses',category:'accessories',price:950,discount:750,sizes:['One Size'],colors:[{name:'Black',code:'#000000'},{name:'Brown',code:'#8b4513'},{name:'Gold',code:'#d4af37'}],image:'',description:'Designer sunglasses',featured:true,newArrival:false,stock:20},
    {id:12,name:'Leather Oxford Shoes',category:'shoes',price:2200,discount:1800,sizes:['40','41','42','43','44'],colors:[{name:'Black',code:'#000000'},{name:'Brown',code:'#8b4513'},{name:'Burgundy',code:'#800020'}],image:'',description:'Handmade oxford shoes',featured:true,newArrival:true,stock:18},
    {id:13,name:'Classic Sneakers',category:'shoes',price:1500,discount:0,sizes:['39','40','41','42','43','44'],colors:[{name:'White',code:'#ffffff'},{name:'Black',code:'#000000'},{name:'Gray',code:'#808080'}],image:'',description:'Premium sneakers',featured:false,newArrival:true,stock:30},
    {id:14,name:'Chelsea Boots',category:'shoes',price:2500,discount:2000,sizes:['40','41','42','43'],colors:[{name:'Black',code:'#000000'},{name:'Brown',code:'#8b4513'}],image:'',description:'Leather Chelsea boots',featured:true,newArrival:false,stock:12},
    {id:15,name:'Cashmere Overcoat',category:'men',price:4200,discount:3500,sizes:['M','L','XL'],colors:[{name:'Camel',code:'#c19a6b'},{name:'Black',code:'#000000'},{name:'Charcoal',code:'#36454f'}],image:'',description:'Cashmere overcoat',featured:true,newArrival:true,stock:8},
    {id:16,name:'Designer Watch',category:'accessories',price:3200,discount:2600,sizes:['One Size'],colors:[{name:'Silver',code:'#c0c0c0'},{name:'Gold',code:'#d4af37'},{name:'Black',code:'#000000'},{name:'Rose Gold',code:'#b76e79'}],image:'',description:'Luxury watch',featured:true,newArrival:true,stock:10}
];

function initProducts(){if(!localStorage.getItem('nxt8_products'))localStorage.setItem('nxt8_products',JSON.stringify(defaultProducts));}
function getProducts(){return JSON.parse(localStorage.getItem('nxt8_products'))||[];}
function saveProducts(p){localStorage.setItem('nxt8_products',JSON.stringify(p));}

function trackVisitor(){let v=parseInt(localStorage.getItem('nxt8_visitors')||'0');let l=localStorage.getItem('nxt8_lastVisit');let t=new Date().toDateString();if(l!==t){v++;localStorage.setItem('nxt8_visitors',v);localStorage.setItem('nxt8_lastVisit',t);}}

window.addEventListener('load',function(){initProducts();trackVisitor();setTimeout(()=>{const l=document.getElementById('loader');if(l)l.classList.add('hidden');},1800);initAll();});

function initAll(){initNavbar();initCart();initHeroParticles();initAOS();initCounters();initFeaturedProducts();initNewArrivals();initProductsPage();initContactForm();initNewsletter();initBackToTop();initAdminPanel();}

function initNavbar(){const n=document.getElementById('navbar'),h=document.getElementById('hamburger'),l=document.getElementById('navLinks');if(!n)return;window.addEventListener('scroll',()=>{n.classList.toggle('scrolled',window.scrollY>50);});if(h)h.addEventListener('click',()=>{h.classList.toggle('active');l.classList.toggle('active');});document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{if(h)h.classList.remove('active');if(l)l.classList.remove('active');}));}

function initCart(){updateCartUI();const ci=document.getElementById('cartIcon'),cc=document.getElementById('cartClose'),co=document.getElementById('cartOverlay');if(ci)ci.addEventListener('click',openCart);if(cc)cc.addEventListener('click',closeCart);if(co)co.addEventListener('click',closeCart);}
function openCart(){document.getElementById('cartSidebar').classList.add('active');document.getElementById('cartOverlay').classList.add('active');document.body.style.overflow='hidden';}
function closeCart(){document.getElementById('cartSidebar').classList.remove('active');document.getElementById('cartOverlay').classList.remove('active');document.body.style.overflow='';}

function addToCart(productId,selectedSize,colorName,colorCode){
    const products=getProducts();const product=products.find(p=>p.id==productId);if(!product)return;
    if(!selectedSize){showToast('Please select a size!','error');return;}
    if(product.colors&&product.colors.length>0&&!colorName){showToast('Please select a color!','error');return;}
    const existing=cart.find(i=>i.id==productId&&i.size==selectedSize&&i.colorName==colorName);
    if(existing){existing.quantity++;}else{cart.push({id:product.id,name:product.name,price:product.discount||product.price,image:product.image,size:selectedSize,colorName:colorName||'',colorCode:colorCode||'',quantity:1});}
    localStorage.setItem('nxt8_cart',JSON.stringify(cart));updateCartUI();showToast('Added to cart!','success');openCart();
}

function addToCartFromCard(productId){
    const card=document.querySelector(`.product-card[data-id="${productId}"]`);
    const as=card?card.querySelector('.size-btn.active'):null;
    const ac=card?card.querySelector('.color-option.active'):null;
    addToCart(productId,as?as.getAttribute('data-size'):null,ac?ac.getAttribute('data-color-name'):null,ac?ac.getAttribute('data-color-code'):null);
}

function removeFromCart(i){cart.splice(i,1);localStorage.setItem('nxt8_cart',JSON.stringify(cart));updateCartUI();}

function updateCartUI(){
    const cc=document.getElementById('cartCount'),ci=document.getElementById('cartItems'),ct=document.getElementById('cartTotal');
    if(cc)cc.textContent=cart.reduce((s,i)=>s+i.quantity,0);
    if(ci){
        if(cart.length===0){ci.innerHTML='<div style="text-align:center;padding:40px;color:var(--gray);"><i class="fas fa-shopping-bag" style="font-size:40px;margin-bottom:15px;display:block;"></i><p>Your bag is empty</p></div>';}
        else{ci.innerHTML=cart.map((item,idx)=>`<div class="cart-item"><div class="cart-item-img">${item.image?`<img src="${item.image}" alt="">` :'<i class="fas fa-tshirt"></i>'}</div><div class="cart-item-info"><h4>${item.name}</h4><p>Size: ${item.size} | Qty: ${item.quantity}</p>${item.colorName?`<p class="cart-item-color"><span class="cart-item-color-dot" style="background:${item.colorCode}"></span>${item.colorName}</p>`:''}<div class="cart-item-price">EGP ${(item.price*item.quantity).toLocaleString()}</div></div><button class="cart-item-remove" onclick="removeFromCart(${idx})"><i class="fas fa-trash-alt"></i></button></div>`).join('');}
    }
    if(ct){const total=cart.reduce((s,i)=>s+(i.price*i.quantity),0);ct.textContent=`EGP ${total.toLocaleString()}`;}
}

function checkoutWhatsApp(){
    if(cart.length===0){showToast('Your cart is empty!','error');return;}
    let m='🛍️ *New Order - NXT8 Fashion*\n\n📦 *Order Details:*\n─────────────────\n';let total=0;
    cart.forEach((item,i)=>{const t=item.price*item.quantity;total+=t;m+=`${i+1}. *${item.name}*\n   📏 Size: ${item.size}\n`;if(item.colorName)m+=`   🎨 Color: ${item.colorName}\n`;m+=`   🔢 Qty: ${item.quantity}\n   💰 Price: EGP ${t.toLocaleString()}\n\n`;});
    m+=`─────────────────\n💰 *Total: EGP ${total.toLocaleString()}*\n\n📍 Please provide your:\n- Full Name\n- Address\n- Phone Number`;
    saveOrder(cart,total);window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(m)}`,'_blank');
    cart=[];localStorage.setItem('nxt8_cart',JSON.stringify(cart));updateCartUI();closeCart();
}

function orderSingleProduct(productId){
    const products=getProducts();const product=products.find(p=>p.id==productId);if(!product)return;
    const card=document.querySelector(`.product-card[data-id="${productId}"]`);
    const sb=card?card.querySelector('.size-btn.active'):null;const cb=card?card.querySelector('.color-option.active'):null;
    if(!sb){showToast('Please select a size!','error');return;}
    if(product.colors&&product.colors.length>0&&!cb){showToast('Please select a color!','error');return;}
    const size=sb.textContent,colorName=cb?cb.getAttribute('data-color-name'):'',price=product.discount||product.price;
    let m=`🛍️ *Quick Order - NXT8 Fashion*\n\n📦 *Product:* ${product.name}\n📏 *Size:* ${size}\n`;
    if(colorName)m+=`🎨 *Color:* ${colorName}\n`;
    m+=`💰 *Price:* EGP ${price.toLocaleString()}\n\n📍 Please provide your:\n- Full Name\n- Address\n- Phone Number`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(m)}`,'_blank');
    saveOrder([{name:product.name,size,color:colorName,price,quantity:1}],price);
}

function saveOrder(items,total){let orders=JSON.parse(localStorage.getItem('nxt8_orders')||'[]');orders.push({id:'ORD'+Date.now().toString().slice(-6),items,total,status:'pending',date:new Date().toISOString(),customer:'WhatsApp Customer'});localStorage.setItem('nxt8_orders',JSON.stringify(orders));}

function initHeroParticles(){const c=document.getElementById('heroParticles');if(!c)return;for(let i=0;i<30;i++){const p=document.createElement('div');p.className='particle';p.style.left=Math.random()*100+'%';p.style.animationDelay=Math.random()*6+'s';p.style.animationDuration=(Math.random()*4+4)+'s';p.style.width=(Math.random()*4+2)+'px';p.style.height=p.style.width;c.appendChild(p);}}

function initAOS(){const els=document.querySelectorAll('[data-aos]');const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){const d=e.target.getAttribute('data-delay')||0;setTimeout(()=>e.target.classList.add('aos-animate'),parseInt(d));}});},{threshold:.1,rootMargin:'0px 0px -50px 0px'});els.forEach(el=>obs.observe(el));}

function initCounters(){const counters=document.querySelectorAll('.stat-number[data-count]');const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){animateCounter(e.target,parseInt(e.target.getAttribute('data-count')));obs.unobserve(e.target);}});});counters.forEach(c=>obs.observe(c));}
function animateCounter(el,target){let cur=0;const inc=target/60;const timer=setInterval(()=>{cur+=inc;if(cur>=target){cur=target;clearInterval(timer);}el.textContent=Math.floor(cur).toLocaleString();},25);}

function createProductCard(product){
    const hd=product.discount&&product.discount>0;const dp=hd?Math.round((1-product.discount/product.price)*100):0;const price=hd?product.discount:product.price;const colors=product.colors||[];
    return `<div class="product-card" data-id="${product.id}" data-category="${product.category}">
        <div class="product-image">${product.image?`<img src="${product.image}" alt="${product.name}">`:'<i class="fas fa-tshirt placeholder-icon"></i>'}${hd?`<span class="product-badge sale">-${dp}%</span>`:''}${product.newArrival?`<span class="product-badge new" style="${hd?'top:50px':''}">NEW</span>`:''}<button class="product-wishlist" onclick="showToast('Added to wishlist!','success')"><i class="far fa-heart"></i></button></div>
        <div class="product-info">
            <div class="product-category-label">${product.category}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price"><span class="current">EGP ${price.toLocaleString()}</span>${hd?`<span class="original">EGP ${product.price.toLocaleString()}</span>`:''}</div>
            ${colors.length>0?`<div class="product-colors"><span class="product-colors-label">Color:</span>${colors.map((c,i)=>`<div class="color-option ${i===0?'active':''}" style="background-color:${c.code};" data-color-name="${c.name}" data-color-code="${c.code}" onclick="selectColor(this)"></div>`).join('')}</div>`:''}
            <div class="product-sizes">${(product.sizes||[]).map(s=>`<button class="size-btn" data-size="${s}">${s}</button>`).join('')}</div>
            <div class="product-actions"><button class="btn btn-gold btn-sm" onclick="addToCartFromCard(${product.id})"><i class="fas fa-shopping-bag"></i> Add</button><button class="btn btn-outline btn-sm" onclick="orderSingleProduct(${product.id})"><i class="fab fa-whatsapp"></i> Order</button></div>
        </div></div>`;
}

function selectColor(el){const card=el.closest('.product-card');card.querySelectorAll('.color-option').forEach(c=>c.classList.remove('active'));el.classList.add('active');}

function initSizeButtons(){document.querySelectorAll('.product-card').forEach(card=>{card.querySelectorAll('.size-btn').forEach(btn=>{btn.addEventListener('click',function(){card.querySelectorAll('.size-btn').forEach(b=>b.classList.remove('active'));this.classList.add('active');});});});}

function initFeaturedProducts(){const c=document.getElementById('featuredProducts');if(!c)return;c.innerHTML=getProducts().filter(p=>p.featured).map(p=>createProductCard(p)).join('');initSizeButtons();const pb=document.getElementById('prevBtn'),nb=document.getElementById('nextBtn');if(pb)pb.addEventListener('click',()=>c.scrollBy({left:-310,behavior:'smooth'}));if(nb)nb.addEventListener('click',()=>c.scrollBy({left:310,behavior:'smooth'}));}

function initNewArrivals(){const c=document.getElementById('newArrivals');if(!c)return;c.innerHTML=getProducts().filter(p=>p.newArrival).slice(0,8).map(p=>createProductCard(p)).join('');initSizeButtons();}

function initProductsPage(){const g=document.getElementById('productsGrid');if(!g)return;const up=new URLSearchParams(window.location.search);const cp=up.get('cat');if(cp){const r=document.querySelector(`input[name="category"][value="${cp}"]`);if(r)r.checked=true;}renderProducts();
    const si=document.getElementById('searchInput'),ci=document.querySelectorAll('input[name="category"]'),pr=document.getElementById('priceRange'),ss=document.getElementById('sortSelect'),ft=document.getElementById('filterToggle'),fc=document.getElementById('filterClose');
    if(si)si.addEventListener('input',renderProducts);ci.forEach(i=>i.addEventListener('change',renderProducts));
    if(pr)pr.addEventListener('input',function(){document.getElementById('priceValue').textContent=`EGP ${parseInt(this.value).toLocaleString()}`;renderProducts();});
    if(ss)ss.addEventListener('change',renderProducts);if(ft)ft.addEventListener('click',()=>document.getElementById('storeFilters').classList.add('active'));if(fc)fc.addEventListener('click',()=>document.getElementById('storeFilters').classList.remove('active'));}

function renderProducts(){const g=document.getElementById('productsGrid');if(!g)return;let p=getProducts();const s=(document.getElementById('searchInput')?.value||'').toLowerCase();const c=document.querySelector('input[name="category"]:checked')?.value||'all';const mp=parseInt(document.getElementById('priceRange')?.value||'5000');const so=document.getElementById('sortSelect')?.value||'default';
    if(s)p=p.filter(x=>x.name.toLowerCase().includes(s)||x.category.toLowerCase().includes(s));if(c!=='all')p=p.filter(x=>x.category===c);p=p.filter(x=>(x.discount||x.price)<=mp);
    switch(so){case'price-low':p.sort((a,b)=>(a.discount||a.price)-(b.discount||b.price));break;case'price-high':p.sort((a,b)=>(b.discount||b.price)-(a.discount||a.price));break;case'name':p.sort((a,b)=>a.name.localeCompare(b.name));break;case'newest':p.sort((a,b)=>b.id-a.id);break;}
    const np=document.getElementById('noProducts'),cnt=document.getElementById('productsCount');
    if(p.length===0){g.innerHTML='';if(np)np.style.display='block';}else{if(np)np.style.display='none';g.innerHTML=p.map(x=>createProductCard(x)).join('');initSizeButtons();}
    if(cnt)cnt.textContent=`${p.length} Product${p.length!==1?'s':''}`;}

function initContactForm(){const f=document.getElementById('contactForm');if(!f)return;f.addEventListener('submit',function(e){e.preventDefault();const n=document.getElementById('contactName').value,p=document.getElementById('contactPhone').value,em=document.getElementById('contactEmail').value,m=document.getElementById('contactMessage').value;
    let msg=`📩 *New Contact - NXT8 Fashion*\n\n👤 *Name:* ${n}\n📱 *Phone:* ${p}\n📧 *Email:* ${em}\n\n💬 *Message:*\n${m}`;
    let cs=JSON.parse(localStorage.getItem('nxt8_customers')||'[]');cs.push({name:n,phone:p,email:em,date:new Date().toISOString()});localStorage.setItem('nxt8_customers',JSON.stringify(cs));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,'_blank');f.reset();showToast('Message sent!','success');});}

function initNewsletter(){const f=document.getElementById('newsletterForm');if(!f)return;f.addEventListener('submit',function(e){e.preventDefault();showToast('Subscribed successfully! 🎉','success');f.reset();});}

function initBackToTop(){const b=document.getElementById('backToTop');if(!b)return;window.addEventListener('scroll',()=>b.classList.toggle('visible',window.scrollY>500));b.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));}

function showToast(message,type='success'){const ex=document.querySelector('.toast');if(ex)ex.remove();const t=document.createElement('div');t.className=`toast ${type}`;t.innerHTML=`<i class="fas fa-${type==='success'?'check-circle':'exclamation-circle'}"></i> ${message}`;document.body.appendChild(t);setTimeout(()=>t.classList.add('show'),100);setTimeout(()=>{t.classList.remove('show');setTimeout(()=>t.remove(),400);},3000);}

// Admin
function initAdminPanel(){const lf=document.getElementById('loginForm');if(!lf)return;if(sessionStorage.getItem('nxt8_admin')==='true')showDashboard();
    lf.addEventListener('submit',function(e){e.preventDefault();if(document.getElementById('adminPassword').value===ADMIN_PASSWORD){sessionStorage.setItem('nxt8_admin','true');showDashboard();}else{document.getElementById('loginError').style.display='block';setTimeout(()=>document.getElementById('loginError').style.display='none',3000);}});
    document.querySelectorAll('.admin-nav-item').forEach(item=>{item.addEventListener('click',function(e){e.preventDefault();const s=this.getAttribute('data-section');document.querySelectorAll('.admin-nav-item').forEach(i=>i.classList.remove('active'));this.classList.add('active');document.querySelectorAll('.admin-section').forEach(x=>x.classList.remove('active'));document.getElementById(`section-${s}`).classList.add('active');document.getElementById('adminPageTitle').textContent=this.textContent.trim();document.getElementById('adminSidebar').classList.remove('active');});});
    const mt=document.getElementById('adminMenuToggle');if(mt)mt.addEventListener('click',()=>document.getElementById('adminSidebar').classList.toggle('active'));
    const apf=document.getElementById('addProductForm');if(apf)apf.addEventListener('submit',handleProductSubmit);}

function showDashboard(){document.getElementById('adminLogin').style.display='none';document.getElementById('adminDashboard').style.display='flex';loadDashboardData();loadProductsTable();loadOrdersTable();loadCustomersTable();}
function adminLogout(){sessionStorage.removeItem('nxt8_admin');document.getElementById('adminLogin').style.display='flex';document.getElementById('adminDashboard').style.display='none';document.getElementById('adminPassword').value='';}
function togglePassword(){const i=document.getElementById('adminPassword'),ic=document.querySelector('.toggle-pass i');if(i.type==='password'){i.type='text';ic.className='fas fa-eye-slash';}else{i.type='password';ic.className='fas fa-eye';}}

function loadDashboardData(){const p=getProducts(),o=JSON.parse(localStorage.getItem('nxt8_orders')||'[]'),c=JSON.parse(localStorage.getItem('nxt8_customers')||'[]'),v=parseInt(localStorage.getItem('nxt8_visitors')||'0');const ts=o.reduce((s,x)=>s+(x.total||0),0);const pr=Math.round(ts*.35);
    const el=id=>document.getElementById(id);if(el('totalProducts'))el('totalProducts').textContent=p.length;if(el('totalOrders'))el('totalOrders').textContent=o.length;if(el('totalCustomers'))el('totalCustomers').textContent=c.length;if(el('totalVisitors'))el('totalVisitors').textContent=v;if(el('totalSales'))el('totalSales').textContent=`EGP ${ts.toLocaleString()}`;if(el('netProfit'))el('netProfit').textContent=`EGP ${pr.toLocaleString()}`;
    const rt=document.getElementById('recentOrdersTable');if(rt){const rc=o.slice(-5).reverse();rt.innerHTML=rc.length===0?'<tr><td colspan="6" style="text-align:center;color:var(--gray);padding:30px;">No orders yet</td></tr>':rc.map(x=>`<tr><td>${x.id}</td><td>${x.customer||'N/A'}</td><td>${x.items?x.items.map(i=>i.name).join(', ').substring(0,30)+'...':'N/A'}</td><td>EGP ${(x.total||0).toLocaleString()}</td><td><span class="status-badge ${x.status}">${x.status}</span></td><td>${new Date(x.date).toLocaleDateString()}</td></tr>`).join('');}}

function loadProductsTable(){const t=document.getElementById('productsTable');if(!t)return;const p=getProducts();
    t.innerHTML=p.length===0?'<tr><td colspan="7" style="text-align:center;color:var(--gray);padding:30px;">No products</td></tr>':p.map(x=>`<tr><td><div class="product-thumb">${x.image?`<img src="${x.image}">`:'<i class="fas fa-tshirt" style="color:var(--gray);"></i>'}</div></td><td>${x.name}</td><td style="text-transform:capitalize;">${x.category}</td><td><div class="color-dots">${(x.colors||[]).map(c=>`<div class="color-dot" style="background:${c.code};" title="${c.name}"></div>`).join('')}</div></td><td>EGP ${(x.discount||x.price).toLocaleString()}</td><td>${x.stock||0}</td><td><button class="action-btn edit" onclick="editProduct(${x.id})"><i class="fas fa-edit"></i></button><button class="action-btn delete" onclick="deleteProduct(${x.id})"><i class="fas fa-trash"></i></button></td></tr>`).join('');}

function loadOrdersTable(){const t=document.getElementById('ordersTable');if(!t)return;const o=JSON.parse(localStorage.getItem('nxt8_orders')||'[]').reverse();
    t.innerHTML=o.length===0?'<tr><td colspan="7" style="text-align:center;color:var(--gray);padding:30px;">No orders</td></tr>':o.map(x=>`<tr><td>${x.id}</td><td>${x.customer||'WhatsApp'}</td><td>${x.items?x.items.map(i=>i.name).join(', ').substring(0,40):'N/A'}</td><td>EGP ${(x.total||0).toLocaleString()}</td><td><span class="status-badge ${x.status}">${x.status}</span></td><td>${new Date(x.date).toLocaleDateString()}</td><td><button class="action-btn edit" onclick="updateOrderStatus('${x.id}','completed')"><i class="fas fa-check"></i></button><button class="action-btn delete" onclick="updateOrderStatus('${x.id}','cancelled')"><i class="fas fa-times"></i></button></td></tr>`).join('');}

function updateOrderStatus(id,status){let o=JSON.parse(localStorage.getItem('nxt8_orders')||'[]');const x=o.find(i=>i.id===id);if(x){x.status=status;localStorage.setItem('nxt8_orders',JSON.stringify(o));loadOrdersTable();loadDashboardData();showToast(`Order ${status}!`,status==='completed'?'success':'error');}}

function loadCustomersTable(){const t=document.getElementById('customersTable');if(!t)return;const c=JSON.parse(localStorage.getItem('nxt8_customers')||'[]').reverse();
    t.innerHTML=c.length===0?'<tr><td colspan="5" style="text-align:center;color:var(--gray);padding:30px;">No customers</td></tr>':c.map(x=>`<tr><td>${x.name||'N/A'}</td><td>${x.phone||'N/A'}</td><td>-</td><td>-</td><td>${new Date(x.date).toLocaleDateString()}</td></tr>`).join('');}

// Colors Management
function addColor(){const ni=document.getElementById('colorName'),cp=document.getElementById('colorPicker');const n=ni.value.trim(),c=cp.value;
    if(!n){showToast('Enter color name!','error');return;}if(currentProductColors.length>=8){showToast('Max 8 colors!','error');return;}if(currentProductColors.some(x=>x.name.toLowerCase()===n.toLowerCase())){showToast('Color exists!','error');return;}
    currentProductColors.push({name:n,code:c});renderColorsList();ni.value='';cp.value='#000000';ni.focus();}
function removeColor(i){currentProductColors.splice(i,1);renderColorsList();}
function renderColorsList(){const l=document.getElementById('colorsList');if(!l)return;l.innerHTML=currentProductColors.length===0?'<p style="color:var(--gray);font-size:13px;padding:5px;">No colors added yet</p>':currentProductColors.map((c,i)=>`<div class="color-chip"><div class="color-chip-circle" style="background-color:${c.code}"></div><span class="color-chip-name">${c.name}</span><button type="button" class="color-chip-remove" onclick="removeColor(${i})"><i class="fas fa-times"></i></button></div>`).join('');}

function showAddProduct(){document.getElementById('productForm').style.display='block';document.getElementById('productFormTitle').textContent='Add New Product';document.getElementById('addProductForm').reset();document.getElementById('editProductId').value='';document.getElementById('imagePreview').style.display='none';document.getElementById('uploadPlaceholder').style.display='flex';currentProductColors=[];renderColorsList();window.scrollTo({top:0,behavior:'smooth'});}
function hideAddProduct(){document.getElementById('productForm').style.display='none';}

function editProduct(id){const p=getProducts().find(x=>x.id==id);if(!p)return;
    document.getElementById('productForm').style.display='block';document.getElementById('productFormTitle').textContent='Edit Product';document.getElementById('editProductId').value=p.id;document.getElementById('productName').value=p.name;document.getElementById('productCategory').value=p.category;document.getElementById('productPrice').value=p.price;document.getElementById('productDiscount').value=p.discount||'';document.getElementById('productSizes').value=(p.sizes||[]).join(', ');document.getElementById('productStock').value=p.stock||0;document.getElementById('productDescription').value=p.description||'';document.getElementById('productFeatured').checked=p.featured||false;document.getElementById('productNew').checked=p.newArrival||false;
    currentProductColors=p.colors?[...p.colors]:[];renderColorsList();
    if(p.image){document.getElementById('imagePreview').src=p.image;document.getElementById('imagePreview').style.display='block';document.getElementById('uploadPlaceholder').style.display='none';}
    document.querySelectorAll('.admin-nav-item').forEach(i=>i.classList.remove('active'));document.querySelector('[data-section="products"]').classList.add('active');document.querySelectorAll('.admin-section').forEach(s=>s.classList.remove('active'));document.getElementById('section-products').classList.add('active');window.scrollTo({top:0,behavior:'smooth'});}

function deleteProduct(id){if(!confirm('Delete this product?'))return;saveProducts(getProducts().filter(p=>p.id!=id));loadProductsTable();loadDashboardData();showToast('Product deleted!','success');}

function handleProductSubmit(e){e.preventDefault();const eid=document.getElementById('editProductId').value;let p=getProducts();
    const data={id:eid?parseInt(eid):Date.now(),name:document.getElementById('productName').value,category:document.getElementById('productCategory').value,price:parseInt(document.getElementById('productPrice').value),discount:parseInt(document.getElementById('productDiscount').value)||0,sizes:document.getElementById('productSizes').value.split(',').map(s=>s.trim()).filter(s=>s),colors:[...currentProductColors],stock:parseInt(document.getElementById('productStock').value),description:document.getElementById('productDescription').value,featured:document.getElementById('productFeatured').checked,newArrival:document.getElementById('productNew').checked,image:document.getElementById('imagePreview').src||''};
    if(eid){const idx=p.findIndex(x=>x.id==eid);if(idx>-1){if(!data.image||data.image===window.location.href)data.image=p[idx].image;p[idx]=data;}}else{p.push(data);}
    saveProducts(p);hideAddProduct();loadProductsTable();loadDashboardData();showToast(eid?'Product updated!':'Product added!','success');}

function previewImage(e){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=function(ev){const p=document.getElementById('imagePreview');p.src=ev.target.result;p.style.display='block';document.getElementById('uploadPlaceholder').style.display='none';};r.readAsDataURL(f);}

function exportData(){const d={products:getProducts(),orders:JSON.parse(localStorage.getItem('nxt8_orders')||'[]'),customers:JSON.parse(localStorage.getItem('nxt8_customers')||'[]'),visitors:localStorage.getItem('nxt8_visitors'),date:new Date().toISOString()};const b=new Blob([JSON.stringify(d,null,2)],{type:'application/json'});const u=URL.createObjectURL(b);const a=document.createElement('a');a.href=u;a.download=`nxt8_data_${new Date().toISOString().slice(0,10)}.json`;a.click();URL.revokeObjectURL(u);showToast('Data exported!','success');}

function clearAllData(){if(!confirm('Delete ALL data?'))return;if(!confirm('This cannot be undone. Continue?'))return;localStorage.removeItem('nxt8_products');localStorage.removeItem('nxt8_orders');localStorage.removeItem('nxt8_customers');localStorage.removeItem('nxt8_cart');localStorage.removeItem('nxt8_visitors');cart=[];initProducts();loadDashboardData();loadProductsTable();loadOrdersTable();loadCustomersTable();showToast('All data cleared!','success');}

document.addEventListener('mousemove',e=>{const c=document.getElementById('cursor'),f=document.getElementById('cursorFollower');if(c){c.style.left=e.clientX+'px';c.style.top=e.clientY+'px';}if(f){f.style.left=e.clientX+'px';f.style.top=e.clientY+'px';}});
document.addEventListener('click',function(e){const l=e.target.closest('a[href^="#"]');if(l){const t=document.querySelector(l.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}}});
