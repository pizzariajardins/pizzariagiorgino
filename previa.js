const contact=document.querySelector('#contact-dialog');
document.querySelectorAll('[data-contact]').forEach(button=>button.addEventListener('click',()=>contact.showModal()));
document.querySelectorAll('dialog .close').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}}));
document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{const original=button.querySelector('img');const expanded=document.querySelector('#photo-dialog img');expanded.src=original.src;expanded.alt=original.alt;document.querySelector('#photo-dialog').classList.toggle('watermarked',button.classList.contains('watermarked'));document.querySelector('#photo-dialog').showModal();}));
document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#mode-title').textContent=button.dataset.mode;document.querySelector('#mode-dialog').showModal();}));
const menu=document.querySelector('.menu'),nav=document.querySelector('nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}));

// Automatic photos stop when outside the viewport, hidden, hovered or focused.
const slides=JSON.parse(document.querySelector('#menu-slides').textContent);
const carousel=document.querySelector('.menu-carousel'),slideImage=document.querySelector('#menu-slide');
const pauseButton=document.querySelector('#slide-pause'),motion=window.matchMedia('(prefers-reduced-motion: reduce)');
let slideIndex=0,paused=motion.matches,visible=false,hovered=false,focused=false,timer;
function scheduleSlides(){clearInterval(timer);if(!paused&&visible&&!hovered&&!focused&&!document.hidden)timer=setInterval(()=>showSlide(slideIndex+1),6000);}
function showSlide(index,announce=false){slideIndex=(index+slides.length)%slides.length;const slide=slides[slideIndex];slideImage.src=slide.src;slideImage.alt=slide.alt;slideImage.closest('button').classList.toggle('watermarked',!!slide.watermark);document.querySelector('#slide-caption').textContent=slide.title;document.querySelector('#slide-count').textContent=`${slideIndex+1} / ${slides.length}`;if(announce)document.querySelector('#slide-announcement').textContent=slide.title;}
function updatePause(){pauseButton.textContent=paused?'Retomar':'Pausar';pauseButton.setAttribute('aria-pressed',String(paused));scheduleSlides();}
function manualSlide(step){paused=true;showSlide(slideIndex+step,true);updatePause();}
document.querySelector('#slide-prev').addEventListener('click',()=>manualSlide(-1));
document.querySelector('#slide-next').addEventListener('click',()=>manualSlide(1));
pauseButton.addEventListener('click',()=>{paused=!paused;updatePause();});
carousel.addEventListener('mouseenter',()=>{hovered=true;scheduleSlides();});
carousel.addEventListener('mouseleave',()=>{hovered=false;scheduleSlides();});
carousel.addEventListener('focusin',()=>{focused=true;scheduleSlides();});
carousel.addEventListener('focusout',event=>{focused=carousel.contains(event.relatedTarget);scheduleSlides();});
carousel.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();manualSlide(event.key==='ArrowRight'?1:-1);}});
document.addEventListener('visibilitychange',scheduleSlides);
motion.addEventListener('change',event=>{if(event.matches){paused=true;updatePause();}});
new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;scheduleSlides();},{threshold:.2}).observe(carousel);
updatePause();
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

Li e concordo com a tolerância de 15 minutos; após esse prazo, a reserva será cancelada automaticamente e a mesa poderá ser liberada. Entendo que os pedidos especiais dependem de disponibilidade e que eventuais valores serão combinados previamente. Aguardo a confirmação da equipe.`;window.open('https://wa.me/5511975386869?text='+encodeURIComponent(message),'_blank','noopener,noreferrer');document.querySelector('#reservation-status').textContent='Revise e envie a mensagem no WhatsApp. Sua reserva depende da confirmação da equipe.';});
