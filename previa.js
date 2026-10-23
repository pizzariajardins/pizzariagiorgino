const contact=document.querySelector('#contact-dialog');
document.querySelectorAll('[data-contact]').forEach(button=>button.addEventListener('click',()=>contact.showModal()));
document.querySelectorAll('dialog .close').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}}));
document.querySelector('[data-photo]').addEventListener('click',()=>document.querySelector('#photo-dialog').showModal());
document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#mode-title').textContent=button.dataset.mode;document.querySelector('#mode-dialog').showModal();}));
const menu=document.querySelector('.menu'),nav=document.querySelector('nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}));

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

Li e concordo com a tolerância de 15 minutos; após esse prazo, a reserva será cancelada automaticamente e a mesa poderá ser liberada. Entendo que os pedidos especiais dependem de disponibilidade e que eventuais valores serão combinados previamente. Aguardo a confirmação da equipe.`;window.open('https://wa.me/5511975386869?text='+encodeURIComponent(message),'_blank','noopener,noreferrer');document.querySelector('#reservation-status').textContent='Revise e envie a mensagem no WhatsApp. Sua reserva depende da confirmação da equipe.';});
