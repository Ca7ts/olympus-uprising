'use strict';
globalThis.OLYMPUS_ART={
atlases:Object.fromEntries(["guardian_gold_l020","guardian_gold_l021","guardian_gold_l022","guardian_gold_l023","guardian_gold_l024","guardian_gold_l025","guardian_gold_l026","guardian_gold_l027","guardian_gold_l028","guardian_gold_l029","guardian_gold_l030",'gold-ult-elements','gold-ult-mystic',"human-rebels","hero-evolution","result-mascots","rebellion-hearth","roles-white-1","roles-white-2","roles-white-3","roles-green-1","roles-green-2","roles-green-3","roles-green-4","roles-green-5","roles-purple-1","roles-purple-2","roles-purple-3","roles-purple-4","roles-blue-1","roles-blue-2","roles-blue-3",'animals','militia',...Array.from({length:30},(_,i)=>'chapter-'+String(i+1).padStart(2,'0')),'skill-fx','vfx-flight','vfx-impact','skill-sequence',...Array.from({length:7},(_,i)=>'chiefs-'+(i+1)),...Array.from({length:3},(_,i)=>'gods-'+(i+1))].map(n=>[n,'assets/'+n+'.webp'])),
scenes:{earth:'assets/earth.webp',sea:'assets/sea.webp',sky:'assets/olympus.webp',sun:'assets/sun.webp',snow:'assets/snow.webp',night:'assets/underworld.webp'},
sceneKeys:['earth','sea','sky','sun','snow','night'],
sceneNames:['青銅山谷・古神聖域','潮汐神庭・愛琴王座','奧林帕斯・雲海天庭','日輪聖所・黃金階梯','霜峰神殿・北風隘口','冥河王庭・永夜之門'],
sceneLines:['青山與古柱之間，凡界的誓約重新聚集。','巨浪穿過白色柱廊，海神的疆域向天際延伸。','群峰浮於雲海，雷霆照亮諸神的聖殿。','日輪灑下金焰，古老的石階直抵蒼穹。','雪嶺連綿無際，冰霧守護沉寂的神廟。','幽藍冥河穿過深淵，紫焰照見永夜王座。']
};
globalThis.applyOlympusArtwork=function(cards,nodes,regions){
if(typeof document!=='undefined'){let sheet=document.getElementById('olympus-assets');if(!sheet){sheet=document.createElement('style');sheet.id='olympus-assets';document.head.appendChild(sheet);}sheet.textContent=':root{'+Object.entries(OLYMPUS_ART.atlases).map(([k,v])=>'--art-'+k+':url("'+v+'");').join('')+Object.entries(OLYMPUS_ART.scenes).map(([k,v])=>'--realm-'+k+':url("'+v+'");').join('')+'}';}
const animals=['幼獅鷲','幼天馬','不死鳥雛','三首冥犬幼崽','海馬靈駒','金羊毛羔羊','月羽靈梟','翡翠翼蛇','苔岩靈龜','星角幼鹿'];
const species=['薩堤爾羊人','半人馬','米諾牛頭人','哈耳庇厄翼人','深海鰭人','獨眼巨人','樹靈','青銅機巧人','晶鱗蜥人','甲殼蟲人'];
const ranks=['盾衛','長槍手','弓弩手','戰地醫者','巡遊者','破陣兵','符文師','傳令者','斥候','守備者'];
const spiritTraits=['守護林地的足跡','追逐山風的羽翼','在灰燼中照亮歸途','替旅人守住夜路','聆聽潮汐的呼喚','把豐收帶回山谷','記住月光下的誓言','以靈巧穿過古老柱廊','背負岩石與青苔的祝福','在星光中引導迷路者'];
// Preserve divine references for the story even when purple combat cards become clan leaders.
nodes.forEach(n=>{n.mythFigures=(n.storyCast||[]).map(id=>cards.find(c=>c.id===id)?.name).filter(Boolean);n.storyGuestNames=(n.storyAllies||[]).map(id=>cards.find(c=>c.id===id)?.name).filter(Boolean);});
cards.forEach(c=>{const i=Number(c.id.slice(1))-1;c.originalName=c.name;
if(c.rarity===0){const animal=i%10,region=Math.floor(i/10);c.name=regions[region]+'・'+animals[animal];c.title='神話小獸 · '+animals[animal];c.species=animals[animal];c.lore=`來自${regions[region]}的${animals[animal]}，${spiritTraits[animal]}。當凡人尋求盟友，牠以自己的方式加入凡界聯軍。此為希臘神話意象延伸的原創靈獸。`;c.art={sheet:'animals',cell:animal,variant:region,design:'同族共用立繪，以地區徽記與色調區分'};}
else if(c.rarity===1){const clan=Math.floor(i/10),rank=i%10;c.name=species[clan]+'・'+ranks[rank];c.title='異族民兵 · '+ranks[rank];c.species=species[clan];c.lore=`${species[clan]}部落的${ranks[rank]}。以實用的青銅裝具、族群技藝與低階靈能參戰；曾服從神庭徵召，也能選擇為自己的族群而戰。此為原創奇幻族群編制。`;c.art={sheet:'militia',cell:clan,variant:rank,design:'同族共用立繪，以兵種徽記與色調區分'};}
else if(c.rarity===2){const domain=c.title.replace('神格','');c.patronName=c.originalName;c.name=domain+'・'+species[i%10]+'首領';c.title=domain+'氏族統領';c.species=species[i%10];c.lore=`${species[i%10]}的${domain}首領，承接${c.patronName}的神話意象，以獨立的裝束、姿態及${domain}戰技統領民兵。本卡為原創族群角色，並非神祇本尊。`;c.art={sheet:'chiefs-'+(Math.floor(i/10)+1),cell:i%10,variant:0,design:'獨立首領立繪'};}
else{c.species='神祇／泰坦／原初神';c.art={sheet:'gods-'+(Math.floor(i/10)+1),cell:i%10,variant:0,design:'獨立神祇立繪'};}
});
};

globalThis.OLYMPUS_SHOT_RATIOS={"chapter-01":1,"chapter-02":1.3333333333333333,"chapter-03":1,"chapter-04":1,"chapter-05":1.3333333333333333,"chapter-06":1,"chapter-07":1,"chapter-08":1,"chapter-09":1,"chapter-10":1,"chapter-11":1,"chapter-12":1.3333333333333333,"chapter-13":1,"chapter-14":1,"chapter-15":1.3333333333333333,"chapter-16":1,"chapter-17":1,"chapter-18":1,"chapter-19":1,"chapter-20":1,"chapter-21":1,"chapter-22":1,"chapter-23":1,"chapter-24":1,"chapter-25":1,"chapter-26":1,"chapter-27":1,"chapter-28":1,"chapter-29":1,"chapter-30":1};
