from pathlib import Path
import shutil,json,re
r=Path.cwd()
p=r/'previa.js';s=p.read_text(encoding='utf8')
s=s.replace('foodPaused=false, foodTimer','foodPaused=false, foodTimer, foodHovered=false, foodFocused=false, foodVisible=false')
s=s.replace("!foodPaused&&!document.hidden", "!foodPaused&&!foodHovered&&!foodFocused&&foodVisible&&!document.hidden")
s=s.replace("e.currentTarget.textContent=foodPaused?'Retomar':'Pausar';", "e.currentTarget.textContent=foodPaused?'Retomar':'Pausar';e.currentTarget.setAttribute('aria-pressed',String(foodPaused));")
s=s.replace("document.addEventListener('visibilitychange',scheduleFood);renderFood();scheduleFood();", """const foodRegion=document.querySelector('.food-feature');
foodRegion.addEventListener('mouseenter',()=>{foodHovered=true;scheduleFood();});
foodRegion.addEventListener('mouseleave',()=>{foodHovered=false;scheduleFood();});
foodRegion.addEventListener('focusin',()=>{foodFocused=true;scheduleFood();});
foodRegion.addEventListener('focusout',event=>{foodFocused=foodRegion.contains(event.relatedTarget);scheduleFood();});
new IntersectionObserver(entries=>{foodVisible=entries[0].isIntersecting;scheduleFood();},{threshold:.2}).observe(foodRegion);
window.matchMedia('(prefers-reduced-motion:reduce)').addEventListener('change',scheduleFood);
document.addEventListener('visibilitychange',scheduleFood);renderFood();scheduleFood();""")
s=s.replace('a reserva será cancelada automaticamente e a mesa poderá ser liberada','a reserva poderá ser cancelada pela equipe e a mesa poderá ser liberada')
p.write_text(s,encoding='utf8')
p=r/'previa.html';s=p.read_text(encoding='utf8').replace('id="feature-pause"','aria-pressed="false" id="feature-pause"')
# Preserve every approved category and item from the ZIP. Mark synthetic assets accurately.
s=s.replace("img.alt=item.name;", "img.alt=item.name;")
s=s.replace('previa.js?v=aprovacoes-2026','previa.js?v=recuperada-20261023').replace('previa.css?v=aprovacoes-2026','previa.css?v=recuperada-20261023')
p.write_text(s,encoding='utf8')
host=r/'previa-hospedada';dist=host/'dist';dist.mkdir(exist_ok=True)
shutil.copy2(r/'previa.html',dist/'index.html')
for name in ('previa.css','previa.js'):shutil.copy2(r/name,dist/name)
shutil.copytree(r/'assets',dist/'assets',dirs_exist_ok=True)
(host/'README.md').write_text('Prévia privada isolada. Origem: pizzariajardins/pizzariagiorgino, branch codex/recuperacao-previa-giorgino. Não aponta para o domínio oficial.\n',encoding='utf8')
print('Cópia de hospedagem preparada, sem alterar index.html oficial.')
