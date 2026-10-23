const contact=document.querySelector('#contact-dialog');
document.querySelectorAll('[data-contact]').forEach(button=>button.addEventListener('click',()=>contact.showModal()));
document.querySelectorAll('dialog .close').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}}));
document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{const original=button.querySelector('img');const expanded=document.querySelector('#photo-dialog img');expanded.src=original.src;expanded.alt=original.alt;document.querySelector('#photo-dialog').classList.toggle('watermarked',button.classList.contains('watermarked'));document.querySelector('#photo-dialog').showModal();}));
document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#mode-title').textContent=button.dataset.mode;document.querySelector('#mode-dialog').showModal();}));
const menu=document.querySelector('.menu'),nav=document.querySelector('nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}));

// Navegação por categorias e carrossel de dois segundos.
const menuData=JSON.parse(document.getElementById('approved-menu-data').textContent);
let categoryIndex=0, foodIndex=0, foodPaused=false, foodTimer, foodHovered=false, foodFocused=false, foodVisible=false;
const tabs=document.querySelector('.category-tabs');
function renderFood(){
 const category=menuData[categoryIndex], item=category.items[foodIndex];
 document.getElementById('feature-category').textContent=category.category.toUpperCase();
 document.getElementById('feature-name').textContent=item.name;
 document.getElementById('feature-phrase').textContent=item.phrase;
 document.getElementById('feature-ingredients').textContent=item.ingredients;
 document.getElementById('feature-count').textContent=`${foodIndex+1} / ${category.items.length}`;
 const img=document.getElementById('feature-image'), missing=document.getElementById('feature-missing');
 if(item.src){img.src=item.src;img.alt=item.name;img.hidden=false;missing.hidden=true;}else{img.hidden=true;missing.hidden=false;}
 tabs.querySelectorAll('button').forEach((b,i)=>{b.classList.toggle('active',i===categoryIndex);b.setAttribute('aria-selected',String(i===categoryIndex));});
 const list=document.getElementById('food-items');list.replaceChildren();
 category.items.forEach((it,i)=>{
 const article=document.createElement('button'); article.type='button';article.className='food-item'+(i===foodIndex?' selected':'');
 const title=document.createElement('strong');title.textContent=it.name;const detail=document.createElement('span');detail.textContent=it.phrase;
 article.append(title,detail);article.addEventListener('click',()=>{foodIndex=i;renderFood();scheduleFood();});list.append(article);
 });
}
function scheduleFood(){clearInterval(foodTimer);if(!foodPaused&&!foodHovered&&!foodFocused&&foodVisible&&!document.hidden&&!window.matchMedia('(prefers-reduced-motion:reduce)').matches)foodTimer=setInterval(()=>{foodIndex=(foodIndex+1)%menuData[categoryIndex].items.length;renderFood();},2000);}
menuData.forEach((cat,i)=>{const b=document.createElement('button');b.type='button';b.textContent=cat.category;b.setAttribute('role','tab');b.addEventListener('click',()=>{categoryIndex=i;foodIndex=0;renderFood();scheduleFood();});tabs.append(b);});
document.getElementById('feature-prev').addEventListener('click',()=>{foodIndex=(foodIndex+menuData[categoryIndex].items.length-1)%menuData[categoryIndex].items.length;renderFood();scheduleFood();});
document.getElementById('feature-next').addEventListener('click',()=>{foodIndex=(foodIndex+1)%menuData[categoryIndex].items.length;renderFood();scheduleFood();});
document.getElementById('feature-pause').addEventListener('click',e=>{foodPaused=!foodPaused;e.currentTarget.textContent=foodPaused?'Retomar':'Pausar';e.currentTarget.setAttribute('aria-pressed',String(foodPaused));scheduleFood();});
const foodRegion=document.querySelector('.food-feature');
foodRegion.addEventListener('mouseenter',()=>{foodHovered=true;scheduleFood();});
foodRegion.addEventListener('mouseleave',()=>{foodHovered=false;scheduleFood();});
foodRegion.addEventListener('focusin',()=>{foodFocused=true;scheduleFood();});
foodRegion.addEventListener('focusout',event=>{foodFocused=foodRegion.contains(event.relatedTarget);scheduleFood();});
new IntersectionObserver(entries=>{foodVisible=entries[0].isIntersecting;scheduleFood();},{threshold:.2}).observe(foodRegion);
window.matchMedia('(prefers-reduced-motion:reduce)').addEventListener('change',scheduleFood);
document.addEventListener('visibilitychange',scheduleFood);renderFood();scheduleFood();
document.querySelector('#load-film').addEventListener('click',event=>{const frame=document.createElement('iframe');frame.src='https://www.instagram.com/reel/C9ik5dYtnUJ/embed/';frame.title='Vídeo institucional da Giorgino no Instagram';frame.allow='encrypted-media; picture-in-picture; fullscreen';frame.setAttribute('allowfullscreen','');document.querySelector('#film-player').replaceChildren(frame);event.currentTarget.disabled=true;event.currentTarget.textContent='VÍDEO DO INSTAGRAM CARREGADO';});

const reservationForm=document.querySelector('#reservation-form');
const dateField=reservationForm.elements.date;
function localToday(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
dateField.min=localToday();
for(let minutes=18*60;minutes<24*60;minutes+=15){const value=`${String(Math.floor(minutes/60)).padStart(2,'0')}:${String(minutes%60).padStart(2,'0')}`;reservationForm.elements.time.add(new Option(value,value));}
document.querySelector('#copyright-year').textContent=new Date().getFullYear();
reservationForm.addEventListener('submit',event=>{event.preventDefault();dateField.min=localToday();if(!reservationForm.reportValidity())return;const d=new FormData(reservationForm);const [y,m,day]=d.get('date').split('-');const chosen=new Date(`${d.get('date')}T${d.get('time')}:00`);if(chosen<=new Date()){document.querySelector('#reservation-status').textContent='Escolha uma data e um horário futuros para solicitar sua reserva.';return;}const message=`Olá, Giorgino! Gostaria de solicitar uma reserva.

Nome: ${d.get('name').trim()}
WhatsApp: ${d.get('phone').trim()}
Data: ${day}/${m}/${y}
Horário: ${d.get('time')}
Pessoas: ${d.get('people')}
Motivo: ${d.get('occasion')}
Pedidos especiais: ${d.get('requests').trim()||'Nenhum'}

Li e concordo com a tolerância de 15 minutos; após esse prazo, a reserva poderá ser cancelada pela equipe e a mesa poderá ser liberada. Entendo que os pedidos especiais dependem de disponibilidade e que eventuais valores serão combinados previamente. Aguardo a confirmação da equipe.`;window.open('https://wa.me/5511975386869?text='+encodeURIComponent(message),'_blank','noopener,noreferrer');document.querySelector('#reservation-status').textContent='Revise e envie a mensagem no WhatsApp. Sua reserva depende da confirmação da equipe.';});
