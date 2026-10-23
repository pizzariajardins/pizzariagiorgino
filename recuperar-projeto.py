from pathlib import Path
import zipfile,hashlib,json,shutil,re
root=Path.cwd(); dest=root/'recuperacao';dest.mkdir(exist_ok=True)
sha=lambda b:hashlib.sha256(b).hexdigest()
inventory=[];seen=set()
for p in (Path.home()/'Downloads').glob('Giorgino*.zip'):
 b=p.read_bytes(); h=sha(b)
 inventory.append({'arquivo':p.name,'sha256':h,'bytes':len(b)})
 if h not in seen:
  shutil.copy2(p,dest/p.name);seen.add(h)
backup=dest/'estado-local-antes.zip'
if not backup.exists():
 with zipfile.ZipFile(backup,'w',zipfile.ZIP_DEFLATED) as z:
  for p in root.rglob('*'):
   if p.is_file() and not any(x in p.relative_to(root).parts for x in ('.git','tmp','recuperacao')):z.write(p,p.relative_to(root))
source=Path.home()/'Downloads/Giorgino_Previa_Atualizada.zip'
changes=[]
with zipfile.ZipFile(source) as z:
 for n in z.namelist():
  name=n.replace('#U00f4','ô');out=(root/name).resolve()
  assert out.is_relative_to(root)
  if name=='index.html':
   assert out.read_bytes()==z.read(n),'Index oficial difere do ZIP'
   continue
  if name.startswith(('assets/','docs/','cardapio/','tests/')) or name in ('previa.html','previa.css','previa.js'):
   b=z.read(n)
   if not out.exists() or out.read_bytes()!=b:
    changes.append(name);out.parent.mkdir(parents=True,exist_ok=True);out.write_bytes(b)
(root/'docs/recuperacao-zips.json').write_text(json.dumps({'fontes':inventory,'zip_base':source.name,'arquivos_recuperados':changes},ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps({'zips':len(inventory),'versoes_unicas':len(seen),'recuperados':changes},ensure_ascii=False))
