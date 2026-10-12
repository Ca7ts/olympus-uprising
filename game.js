/* ===== data.js ===== */
'use strict';
const ELEMENTS=['雷','水','火','冰','地','風','光','冥'];
const EICON={雷:'ϟ',水:'≈',火:'♨',冰:'❄',地:'◆',風:'≋',光:'☼',冥:'☾',無:'◇'};
const RARITIES=['白','綠','藍','紫','橙'];
const ROLES=['增益坦','減益坦','攻擊手','輔助'];
const TERRAINS=[
{name:'陸地',title:'阿爾戈斯平原',up:['地'],down:['風'],desc:'堅實大地護佑地屬性，逆風拖慢空中攻勢。'},
{name:'海上',title:'破碎的愛琴海',up:['水'],down:['火'],desc:'潮汐回應水之力，海霧削弱火焰。'},
{name:'天空',title:'奧林帕斯雲階',up:['風','雷'],down:['地'],desc:'風與雷在高空共鳴，大地之力遠離根源。'},
{name:'豔陽',title:'赫利俄斯日輪',up:['火','光'],down:['冰','冥'],desc:'烈日強化火與光，消融冰霜並驅散冥影。'},
{name:'大雪',title:'北境的白色寂靜',up:['冰'],down:['火'],desc:'暴雪增幅冰之力，壓制火焰。'},
{name:'冥夜',title:'無星的冥河',up:['冥'],down:['光'],desc:'亡魂低語滋養冥之力，日光難以穿透。'}];
const cards=[];
function skill(name,cost,power,target='single',effects=[],extra={}){return {name,cost,power,target,effects,...extra};}
const basicSkills=[
()=>skill('守衛號令',1,0,'allAlly',[{type:'shield',value:0.45}]),
()=>skill('威嚇盾擊',1,1.1,'single',[{type:'weak',value:.2,duration:2}]),
()=>skill('精準突擊',1,1.65),
()=>skill('戰地包紮',1,0,'lowAlly',[{type:'heal',value:1.4}])];
const regions=['阿爾戈斯','科林斯','雅典','斯巴達','底比斯','米利都','納克索斯','克里特','羅德島','德爾斐','色薩利','阿卡迪亞','伊利斯','麥加拉','伊薩卡','薩摩斯','福基斯','萊斯博斯','優卑亞','特洛伊'];
const jobs=['採石工','牧羊人','漁民','陶工','耕作者','樵夫','鹽工','織工','挑水人','礦工'];
const humanNames=['達蒙','梅莉','提蒙','多莉','利昂','艾拉','尼科','菲拉','阿里','索菲'];
function stats(role,r,i){let hp=[370,490,570,660][r],atk=[80,103,119,132][r];return {hp:hp+(role<2?150:role===3?-20:0)+(i%5)*11,atk:atk+(role===2?26:role===3?-4:-12)+(i%4)*3,def:[12,18,24,29][r]+(role<2?15:0),spd:55+(role===2?13:role===3?8:0)+(i%7)*3};}
regions.forEach((region,x)=>jobs.forEach((job,y)=>{let i=x*10+y,role=[0,3,2,1,0,2,1,3,3,2][y],e=['地','風','水','火','地','風','水','光','冰','冥'][y];cards.push({id:'W'+String(i+1).padStart(3,'0'),name:region+'・'+humanNames[y],title:job,rarity:0,role:ROLES[role],element:e,...stats(role,0,i),skill:null,passive:null,lore:`${region}的${job}。當神廟索取最後一份收成，${humanNames[y]}決定站到反抗軍的一邊。`});}));
const patrons=['宙斯','波賽頓','阿瑞斯','得墨忒耳','雅典娜','阿波羅','阿提蜜絲','赫密士','黑帝斯','赫拉'];
const pe=['雷','水','火','地','光','光','冰','風','冥','雷'];
const ranks=['門衛長','徵糧官','神殿弓手','隨軍醫官','巡邏長','祭壇護衛','執令劍士','祈禱祭司','港口監察','傳令官'];
patrons.forEach((p,x)=>ranks.forEach((rank,y)=>{let i=x*10+y,role=y%4;cards.push({id:'G'+String(i+1).padStart(3,'0'),name:p+'神殿・'+rank,title:'受命的人類幹部',rarity:1,role:ROLES[role],element:pe[x],...stats(role,1,i),skill:basicSkills[role](),passive:null,lore:`曾以${p}的名義維持秩序的${rank}。擊敗其部隊後，反抗軍給予重新選擇的機會。`});}));
const minor=[
['尼刻','勝利','光'],['伊里斯','虹橋','光'],['赫柏','青春','水'],['厄里斯','紛爭','火'],['福波斯','恐懼','冥'],['得摩斯','驚惶','冥'],['厄倪俄','戰禍','火'],['堤喀','命運','光'],['涅墨西斯','報應','冥'],['阿斯克勒庇俄斯','醫療','光'],
['許癸厄亞','潔淨','水'],['帕那刻亞','萬靈','光'],['伊阿索','康復','水'],['阿刻索','療癒','地'],['忒勒斯福洛斯','痊癒','地'],['摩耳甫斯','夢形','冥'],['伊刻洛斯','獸夢','冥'],['凡塔索斯','幻夢','風'],['革拉斯','衰老','冰'],['摩摩斯','譏諷','風'],
['阿帕忒','欺瞞','冥'],['多洛斯','詭計','冥'],['菲洛忒斯','情誼','光'],['俄匊斯','誓約','雷'],['埃爾庇斯','希望','光'],['索忒里亞','救贖','光'],['厄勒俄斯','憐憫','水'],['珀尼亞','貧困','地'],['普路托斯','豐饒','地'],['克拉托斯','強權','雷'],
['比亞','武力','火'],['澤洛斯','競逐','風'],['歐諾彌亞','秩序','光'],['狄刻','正義','光'],['厄瑞涅','和平','地'],['克洛托','紡命','風'],['拉刻西斯','度命','水'],['阿特羅波斯','斷命','冥'],['卡利俄佩','史詩','光'],['克莉奧','歷史','地'],
['歐忒耳佩','音樂','風'],['塔莉亞','喜劇','光'],['墨爾波墨涅','悲劇','冥'],['忒耳普西科瑞','舞蹈','風'],['厄剌托','情詩','火'],['波呂許姆尼亞','頌歌','光'],['烏拉尼亞','星象','雷'],['阿格萊亞','光華','光'],['歐芙洛緒涅','歡悅','水'],['帕西忒亞','安息','冰'],
['波瑞阿斯','北風','冰'],['澤菲羅斯','西風','風'],['諾托斯','南風','水'],['歐羅斯','東風','風'],['涅柔斯','海智','水'],['普羅透斯','變幻','水'],['特里同','海螺','水'],['安菲特里忒','海后','水'],['多里斯','海贈','水'],['忒提斯','浪護','水'],
['伽拉忒亞','海沫','水'],['普薩瑪忒','沙岸','地'],['克墨托','波濤','水'],['格勞科斯','海諭','水'],['福耳庫斯','深海','冥'],['刻托','海怖','水'],['阿里斯泰俄斯','蜂群','地'],['普里阿波斯','園圃','地'],['帕萊蒙','航護','水'],['勒烏科忒亞','白浪','水']];
minor.forEach(([name,domain,element],i)=>{let role=i%4,s;
const healDomains=['青春','醫療','潔淨','萬靈','康復','療癒','痊癒','情誼','希望','憐憫','豐饒','音樂','舞蹈','情詩','頌歌','歡悅','海贈','園圃'];
const guardDomains=['勝利','虹橋','救贖','秩序','正義','和平','史詩','歷史','光華','海智','海后','浪護','航護','白浪'];
const controlDomains=['恐懼','驚惶','報應','夢形','獸夢','幻夢','衰老','譏諷','欺瞞','詭計','貧困','紡命','度命','悲劇','安息','北風','變幻','海諭','海怖'];
if(healDomains.includes(domain))role=3;else if(guardDomains.includes(domain))role=0;else if(controlDomains.includes(domain))role=1;else role=2;
if(role===0)s=skill(domain+'庇護',2,0,'allAlly',[{type:'shield',value:1.25},{type:'guard',value:.18,duration:2}]);
if(role===1)s=skill(domain+'禁令',2,.9,'allEnemy',[{type:'weak',value:.22,duration:2}],{self:[{type:'taunt',value:1,duration:2}]});
if(role===2)s=skill(domain+'降臨',i%3===0?3:2,i%3===0?1.8:2.3,i%3===0?'allEnemy':'single',[{type:element==='火'?'burn':'vuln',value:element==='火'?.3:.2,duration:2}]);
if(role===3)s=skill(domain+'祝禱',2,0,'allAlly',[{type:'heal',value:1.15},{type:i%2?'cleanse':'boost',value:.2,duration:2}]);
if(['夢形','獸夢','幻夢','安息'].includes(domain))s=skill(domain+'沉眠',2,.6,'column',[{type:'stun',value:1,duration:1}]);
if(['潔淨','萬靈','醫療','痊癒'].includes(domain))s=skill(domain+'恩典',2,0,'allAlly',[{type:'heal',value:1.3},{type:'cleanse'}]);
cards.push({id:'P'+String(i+1).padStart(3,'0'),name,title:domain+'神格',rarity:2,role:ROLES[role],element,...stats(role,2,i),skill:s,passive:null,lore:`${domain}權能的持有者，在本作中統領神廟的人類幹部。神名取材希臘神話；軍階、屬性與戰鬥招式為原創改編。`});});
const gods=[
['宙斯','天穹的裁決者','雷',2,skill('奧林帕斯・天罰',3,1.65,'allEnemy',[{type:'vuln',value:.2,duration:2}]),['威權雷冠','pierce',.25,'造成傷害時忽略目標 25% 防禦。']],
['波賽頓','震地的海王','水',1,skill('三叉戟・覆世狂潮',3,1.25,'allEnemy',[{type:'weak',value:.25,duration:2}],{self:[{type:'shield',value:1.5}]}),['潮汐不息','regen',.05,'每次行動開始恢復自身最大生命 5%。']],
['黑帝斯','冥府的守門人','冥',1,skill('冥河・亡者敕令',3,1.6,'allEnemy',[{type:'silence',value:1,duration:1}],{recoil:.12}),['靈魂徵稅','leech',.2,'造成傷害後恢復傷害量 20% 的生命。']],
['雅典娜','智慧與城邦','光',0,skill('埃癸斯・不落之城',2,0,'allAlly',[{type:'shield',value:1.6},{type:'guard',value:.25,duration:2}]),['戰術洞見','teamguard',.08,'在場時，全隊受到的傷害降低 8%（同類不疊加）。']],
['阿瑞斯','浴血的戰神','火',2,skill('血戰・百槍屠陣',3,2.3,'allEnemy',[],{recoil:.28,self:[{type:'vuln',value:.25,duration:2}]}),['嗜戰之心','rage',.45,'生命低於一半時，造成的傷害增加 45%。']],
['阿波羅','光明與弦歌','光',3,skill('日輪・療傷頌歌',2,0,'allAlly',[{type:'heal',value:1.6},{type:'cleanse'}]),['晨光','regen',.06,'每次行動開始恢復自身最大生命 6%。']],
['阿提蜜絲','荒野的獵月','冰',2,skill('月狩・無聲之矢',2,2.6,'lowEnemy',[{type:'vuln',value:.2,duration:2}]),['獵物標記','execute',.35,'攻擊生命低於一半的敵人時，傷害增加 35%。']],
['赫拉','誓約的王后','雷',1,skill('王后敕令・背誓者',2,1.3,'allEnemy',[{type:'weak',value:.22,duration:2}]),['王權威儀','ward',1.3,'上場時獲得自身攻擊力 130% 的護盾。']],
['得墨忒耳','穀物與大地','地',3,skill('豐收・金穗歸來',2,0,'allAlly',[{type:'heal',value:1.05},{type:'regen',value:.08,duration:2}]),['土地的贈禮','teamhp',.12,'戰鬥開始時，全隊最大生命增加 12%。']],
['赫密士','邊界的旅人','風',3,skill('翼履・越界之旅',1,0,'allAlly',[{type:'haste',value:.2,duration:2}]),['捷足','speed',.25,'自身速度增加 25%。']],
['赫菲斯托斯','火山的鑄造者','火',0,skill('神匠・不熄熔爐',2,0,'allAlly',[{type:'shield',value:1.5},{type:'boost',value:.15,duration:2}]),['百煉之軀','armor',.3,'自身受到的傷害降低 30%。']],
['阿芙蘿黛蒂','愛與渴望','光',3,skill('金蘋果・迷戀之網',2,.8,'allEnemy',[{type:'weak',value:.35,duration:2}],{teamheal:.7}),['柔情','healpower',.3,'自身所有治療與護盾效果增加 30%。']],
['戴歐尼修斯','狂歡的解放者','水',3,skill('酒神祭・醉生狂舞',2,0,'allAlly',[{type:'boost',value:.5,duration:2},{type:'vuln',value:.2,duration:2}]),['狂喜','regen',.07,'每次行動開始恢復自身最大生命 7%。']],
['赫斯提亞','爐火的守望者','火',0,skill('永恆爐火・歸家',2,0,'allAlly',[{type:'shield',value:1.1},{type:'regen',value:.07,duration:2}]),['家園誓約','teamguard',.1,'在場時，全隊受到的傷害降低 10%（同類不疊加）。']],
['珀耳塞福涅','春日與冥后','冥',3,skill('石榴契約・春逝',3,1.4,'allEnemy',[],{teamheal:1.4,recoil:.18}),['春回','regen',.09,'每次行動開始恢復自身最大生命 9%。']],
['赫卡忒','三岔路的火炬','冥',3,skill('三相秘儀・封術',2,1.3,'column',[{type:'silence',value:1,duration:2}]),['月下秘法','pierce',.35,'造成傷害時忽略目標 35% 防禦。']],
['赫利俄斯','駕馭太陽之神','火',2,skill('太陽戰車・焚天',3,1.6,'allEnemy',[{type:'burn',value:.4,duration:2}],{recoil:.15}),['日之傲','damage',.12,'自身造成的傷害增加 12%。']],
['塞勒涅','銀月的引路人','冰',3,skill('銀月・靜夜祝福',2,0,'allAlly',[{type:'heal',value:1.2},{type:'guard',value:.15,duration:2}]),['月之幕','ward',1.7,'上場時獲得自身攻擊力 170% 的護盾。']],
['厄俄斯','黎明的玫瑰','光',3,skill('曙光・長夜初醒',1,0,'lowAlly',[{type:'heal',value:1.9},{type:'cleanse'}]),['晨風','speed',.18,'自身速度增加 18%。']],
['克洛諾斯','收割王權的泰坦','地',2,skill('神鐮・王朝終焉',3,3.8,'single',[],{self:[{type:'stun',value:1,duration:1}]}),['弒王之刃','execute',.5,'攻擊生命低於一半的敵人時，傷害增加 50%。']],
['瑞亞','眾神之母','地',0,skill('母神・山岳搖籃',2,0,'allAlly',[{type:'shield',value:1.8},{type:'cleanse'}]),['庇子之心','teamhp',.15,'戰鬥開始時，全隊最大生命增加 15%。']],
['蓋亞','大地的根源','地',0,skill('原初大地・萬物之牆',3,0,'allAlly',[{type:'shield',value:2.3},{type:'guard',value:.3,duration:2}]),['地脈','regen',.1,'每次行動開始恢復自身最大生命 10%。']],
['烏拉諾斯','星空的穹頂','風',1,skill('蒼穹・群星重壓',3,1.25,'allEnemy',[{type:'weak',value:.3,duration:2},{type:'vuln',value:.15,duration:2}]),['天穹之壁','armor',.22,'自身受到的傷害降低 22%。']],
['尼克斯','原初之夜','冥',1,skill('永夜・閉目之刻',3,.7,'allEnemy',[{type:'stun',value:1,duration:1}],{self:[{type:'vuln',value:.25,duration:2}]}),['夜的衣裳','ward',2,'上場時獲得自身攻擊力 200% 的護盾。']],
['厄瑞玻斯','幽暗的深淵','冥',2,skill('深淵・吞光',2,2.4,'single',[],{drain:.5}),['暗流','leech',.15,'造成傷害後恢復傷害量 15% 的生命。']],
['埃忒耳','明亮的上空','光',0,skill('淨空・天光屏障',2,0,'allAlly',[{type:'shield',value:1.4},{type:'cleanse'}]),['清明','immune',1,'免疫沉默，仍會受到其他負面效果。']],
['普羅米修斯','盜火的先知','火',3,skill('盜火・凡人之炬',2,0,'allAlly',[{type:'boost',value:.45,duration:2}],{recoil:.2}),['反抗火種','human',.18,'在場時，友方白卡與綠卡造成的傷害增加 18%。']],
['阿特拉斯','擎天者','地',0,skill('擎天・以身為柱',2,0,'allAlly',[{type:'shield',value:1.9}],{self:[{type:'taunt',value:1,duration:2},{type:'weak',value:.25,duration:2}]}),['天之重','armor',.35,'自身受到的傷害降低 35%。']],
['塔納托斯','寂靜的死神','冥',2,skill('終末之翼・斷息',3,3.5,'lowEnemy'),['死亡逼近','execute',.65,'攻擊生命低於一半的敵人時，傷害增加 65%。']],
['修普諾斯','沉眠之主','冰',1,skill('罌粟之夢・長眠',2,.6,'column',[{type:'stun',value:1,duration:1}]),['安眠薄霧','teamguard',.07,'在場時，全隊受到的傷害降低 7%（同類不疊加）。']]
];
gods.forEach(([name,title,element,role,s,p],i)=>cards.push({id:'O'+String(i+1).padStart(3,'0'),name,title,rarity:3,role:ROLES[role],element,...stats(role,3,i),skill:s,passive:{name:p[0],type:p[1],value:p[2],desc:p[3]},lore:`${name}的神話意象化為可召喚的神力投影。${title}；本作位階為遊戲設定，不代表神話中的固定強弱排名。`}));
const CARD=Object.fromEntries(cards.map(c=>[c.id,c]));
const chapterNames=['灰燼裡的火種','海風中的誓言','不再跪拜','冥河沒有王','撼動天穹'];
const nodeInfo=[
['最後一袋麥穗','收稅隊要取走村莊最後的口糧。九位同行者在穀倉外站成了第一道防線。','地屬性民兵守住三路，先擊破薄弱一路。',0],
['採石場的鎖鏈','石匠拒絕繼續建造神像。監工帶來巡邏隊，封死唯一出口。','敵方前排厚實，輔助留在後排。',0],
['鹽港火光','漁民藏起起義者，祭司便下令燒毀船隻。今晚要奪回港口。','海上火屬性輸出受到抑制。',1],
['豔陽徵兵令','烈日下，神殿弓手將孩子與父母分開。你攔在徵兵名冊前。','光、火受到場地加成；冰與冥較弱。',3],
['第一面神旗','在神廟前，首位中階管理者質問：沒有神，誰來守護你們？','綠卡會使用一氣技能，留意治療。',0],
['虹橋的看守者','伊里斯封起通往外島的航道。凡人的船第一次駛向神族的領地。','水屬性隊伍能利用海上優勢。',1],
['北風不收稅','被放逐者困在山隘。波瑞阿斯允許雪落下，卻不允許凡人越境。','冰系獲得優勢，避免依賴火。',4],
['海螺警報','特里同吹響海螺。海底神殿的護衛從每一道浪中出現。','雷克水，但雷在此沒有場地加成。',1],
['園圃與饑荒','豐饒之神守著不向凡人開放的果園。飢餓的人們要求開門。','地克風；切勿只按稀有度上陣。',0],
['秩序的價格','狄刻帶來神庭裁決：反抗即是罪。你以生還者的名字答辯。','驅散負面效果可對抗持續削弱。',3],
['無人歡呼的勝利','尼刻的翅膀遮住城門。她只承認勝者，卻從未問過誰付出代價。','敵方有範圍技能，分散續戰資源。',2],
['白浪的避難船','勒烏科忒亞保護難民，卻受命交出反抗軍。你必須擊破封鎖而非難民。','同路前後排任一陣亡，該路替補就會進入其位置。',1],
['恐懼有了名字','福波斯與得摩斯鎮守山門。他們使每個人看見自己最害怕的結局。','削弱會壓低普攻，護盾可爭取蓄氣。',5],
['金蘋果的宴席','神祇以欲望瓦解盟約。有人想要自由，有人只想坐上舊王的椅子。','短氣技能能更快建立增益。',3],
['盜火者的鐐銬','普羅米修斯拒絕悔罪。你斬斷鎖鏈，他將火種交給不再跪拜的人。','神技代價可以創造反擊窗口。',0],
['狂歡之後','戴歐尼修斯邀你忘記戰爭。可酒醒後，受壓迫的人仍在原地。','狂歡增傷也提高承傷，把握敵方破綻。',1],
['冥河渡口','亡者的擺渡名冊上，也刻著尚未出生的凡人。你拒絕預定的命運。','冥夜強化冥系、削弱光系。',5],
['罌粟之城','修普諾斯許諾永不受苦的長夢。整座城即將忘記醒來的理由。','昏迷跳過一次行動，影響蓄氣節奏。',5],
['石榴的契約','珀耳塞福涅問：若自由只屬於活人，亡者又該如何？你承諾打開歸途。','敵方兼具全體攻擊與恢復。',5],
['黑帝斯的王座','黑帝斯不畏死亡，只懷疑凡人能否承擔沒有主人後的秩序。','冥王會沉默全隊，但神技也損耗生命。',5],
['擎天者的肩膀','阿特拉斯支撐的不只是天空，還有眾神永不改變的秩序。','嘲諷牽制單體技，範圍技可繞開。',0],
['戰神的答案','阿瑞斯稱和平只是下一場戰爭的間隙。你必須讓他的狂怒失去對象。','撐過爆發後，利用反噬與易傷反攻。',3],
['銀月狩獵','阿提蜜絲測試反抗軍是否只是另一群掠奪者。森林裡沒有王座可藏身。','低血目標會被狙擊，帶上治療。',4],
['智慧的辯場','雅典娜要求你證明：凡人能建立比神權更好的城邦。','護盾與減傷強，準備持續輸出。',0],
['覆世狂潮','波賽頓舉起三叉戟。港口的人們選擇站在一起，而非獻出一個替罪者。','海王有海上優勢；雷克水可破局。',1],
['神后的誓言','赫拉見過太多被背棄的誓言。她問你會不會成為自己最憎恨的神。','敵方削弱會拖慢進攻，淨化有價值。',2],
['日輪墜落之前','赫利俄斯的戰車封鎖天梯。這一次，凡人要直視太陽。','豔陽的火焰極強，水克火但不獲場地加成。',3],
['夜與天之間','尼克斯與烏拉諾斯站在星穹兩側。古老秩序最後一次要求你退下。','混合屬性守軍，需要兼顧多路。',2],
['神鐮的舊王','克洛諾斯告訴你，他也曾推翻自己的父親。弒神並不保證自由。','神鐮造成重擊後，使用者會昏迷。',2],
['凡人的黎明','宙斯在雷霆中等待。你要擊碎的不是天空，而是只有神可以決定命運的權利。','雷系克水；不要只沿用海戰陣容。',2]
];
const bossIds=['P002','P051','P057','P029','P034','P001','P070','P005','O012','O027','O013','P038','O030','O015','O003','O028','O005','O007','O004','O002','O008','O017','O024','O020','O001'];
const nodes=nodeInfo.map(([name,story,hint,terrain],i)=>{let ids;
if(i<4)ids=Array.from({length:9},(_,k)=>'W'+String((i*13+k*7)%200+1).padStart(3,'0'));
else if(i===4)ids=['G001','W030','G002','G004','G003','W049','W012','W068','G005'];
else {let boss=bossIds[i-5],pool=i<10?'G':i<20?'P':'O',limit=pool==='G'?100:pool==='P'?70:30;ids=Array.from({length:9},(_,k)=>pool+String((i*7+k*3)%limit+1).padStart(3,'0'));ids[1]=boss;ids=[...new Set(ids)];while(ids.length<9){let id=pool+String((ids.length*11+i)%limit+1).padStart(3,'0');if(ids.includes(id))id='G'+String(ids.length+1).padStart(3,'0');ids.push(id);}}
return {id:i,name,story,hint,terrain,chapter:Math.floor(i/6),enemy:ids,reward:i===29?'O001':i<4?'G'+String(i*13+1).padStart(3,'0'):i===4?'P001':bossIds[i-5],scale:i<5?.84: .90+Math.floor(i/6)*.12};});

// Enrich existing identities without changing save identifiers or reward thresholds.
nodes.forEach((n,i)=>{const row=globalThis.OLYMPUS_CHRONICLES[i];n.prologue=row[0];n.mythNote=row[1];n.source=globalThis.OLYMPUS_SOURCES[row[2]];n.storyCast=row[3];n.storyAllies=row[4];n.leaderId=row[3][0]||n.enemy[0];
if(row[3].length){const support=n.enemy.filter(id=>!row[3].includes(id)&&!row[4].includes(id));n.enemy=[...row[3],...support].slice(0,9);for(const c of cards)if(n.enemy.length<9&&!n.enemy.includes(c.id)&&!row[4].includes(c.id))n.enemy.push(c.id);}
});
applyOlympusArtwork(cards,nodes,regions);
// Eight soldiers plus one commander of the next rarity; gods remain the top tier.
nodes.forEach(n=>{const counts=[0,0,0,0];n.enemy.forEach(id=>counts[CARD[id].rarity]++);const base=counts.indexOf(Math.max(...counts));if(base===3){n.commandTier=3;return;}const tier=base+1;const leader=n.enemy.find(id=>CARD[id].rarity===tier)||([n.reward].find(id=>CARD[id].rarity===tier))||cards.filter(c=>c.rarity===tier&&!n.storyAllies.includes(c.id))[n.id%cards.filter(c=>c.rarity===tier&&!n.storyAllies.includes(c.id)).length].id;const pool=[...new Set([...n.enemy,...cards.map(c=>c.id)])].filter(id=>CARD[id].rarity===base&&!n.storyAllies.includes(id));n.enemy=pool.slice(0,8);n.enemy.splice(1,0,leader);n.leaderId=leader;n.commandTier=tier;});
if(typeof module!=='undefined')module.exports={cards,CARD,ELEMENTS,EICON,ROLES,RARITIES,TERRAINS,nodes,chapterNames};


// Expansion data is inserted after legacy identities/artwork and before the engine.
const CLAN_NAMES=['薩堤爾羊人','半人馬','米諾牛頭人','哈耳庇厄翼人','深海鰭人','獨眼巨人','樹靈','青銅機巧人','晶鱗蜥人','甲殼蟲人'];
const WHITE_JOBS=['護衛靈獸','獵弓靈獸','突擊靈獸','咒紋靈獸','療癒靈獸'];
const MANAGER_JOBS=['盾衛督導','弓隊指揮','突擊隊長','戰術術官','醫療總管'];
const ROLE_BY_JOB=[0,2,2,1,3];
// Keep every legacy card ID stable. Only the rarity display index moves.
cards.forEach(c=>{if(c.rarity>=2)c.rarity++;});
for(let i=0;i<150;i++){
 const clan=Math.floor(i/15),job=i%5,region=Math.floor(i/5)%3,role=ROLE_BY_JOB[job],base=stats(role,1,i),higher=stats(role,2,i);
 const skills=[()=>skill('防線協調',2,0,'allAlly',[{type:'shield',value:.9},{type:'guard',value:.1,duration:1}]),()=>skill('交叉射擊',2,2,'lowEnemy'),()=>skill('突擊指令',2,2.1,'single'),()=>skill('封鎖陣式',2,.7,'allEnemy',[{type:'weak',value:.15,duration:1}]),()=>skill('救護調度',2,0,'allAlly',[{type:'heal',value:.9}])];
 const c={id:'B'+String(i+1).padStart(3,'0'),name:CLAN_NAMES[clan]+'・'+['山隘','海港','神廟'][region]+MANAGER_JOBS[job],title:'中階管理者 · '+MANAGER_JOBS[job],rarity:2,role:ROLES[role],element:pe[clan],hp:Math.round((base.hp+higher.hp)/2),atk:Math.round((base.atk+higher.atk)/2),def:Math.round((base.def+higher.def)/2),spd:base.spd,skill:skills[job](),passive:null,species:CLAN_NAMES[clan],profession:MANAGER_JOBS[job],lore:CLAN_NAMES[clan]+'的中階管理者，在'+['山隘運補','海港撤離','神廟解放'][region]+'中協調部隊、保護同行者。承接民兵與氏族首領之間的責任。'};cards.push(c);CARD[c.id]=c;
}
const GREEN_ROLES=[0,1,2,3,2,2,1,3,2,0];
for(const c of cards){const i=Number(c.id.slice(1))-1;
 if(c.rarity===0){const animal=i%10,region=Math.floor(i/10),job=(region+animal)%5,role=ROLE_BY_JOB[job];c.role=ROLES[role];Object.assign(c,stats(role,0,i));c.originLabel=regions[region];c.sharedRegionalArt=true;c.profession=WHITE_JOBS[job];c.title='神話小獸 · '+c.profession;c.name=regions[region]+'・'+c.species+'・'+c.profession;c.art={sheet:'roles-white-'+(Math.floor((animal*5+job)/20)+1),cell:(animal*5+job)%20,cols:5,rows:4,variant:region,design:'依物種與職業重繪，地區變體共用職業立繪'};}
 if(c.rarity===1){const role=GREEN_ROLES[i%10];c.role=ROLES[role];Object.assign(c,stats(role,1,i));c.skill=basicSkills[role]();c.skill.name=['堅盾守望','槍陣壓制','穿風射擊','戰地包紮','遊刃突襲','裂陣斧擊','符文束縛','援軍號角','伏影雙刺','堡壘屏障'][i%10];c.profession=c.name.split('・').at(-1);c.art={sheet:'roles-green-'+(Math.floor(i/20)+1),cell:i%20,cols:5,rows:4,variant:0,design:'每一物種／兵種獨立武器與姿勢'};}
 if(c.rarity===2){c.originLabel=['山隘','海港','神廟'][Math.floor(i/5)%3];c.sharedRegionalArt=true;const index=Math.floor(i/15)*5+i%5;c.art={sheet:'roles-blue-'+(Math.floor(index/20)+1),cell:index%20,cols:5,rows:4,variant:Math.floor(i/5)%3,design:'每族五種管理職業立繪，三個駐地變體共用'};}
 if(c.rarity===3){c.profession=c.role;c.art={sheet:'roles-purple-'+(Math.floor(i/20)+1),cell:i%20,cols:5,rows:4,variant:0,design:'獨立首領立繪，武器／姿勢對應戰鬥定位'};}
 if(c.art.sheet==='roles-white-3')c.art.rows=5;
 c.poolUnlock=c.rarity===0?Math.floor(i/40):c.rarity===1?1+Math.floor(i/10):c.rarity===2?6+Math.floor(i/15):c.rarity===3?12+Math.floor(i/7):c.id==='O001'?30:24+Math.floor(i/5);
}
// Intermediate blue officers become commanders for green armies, and troops beneath purple leaders.
nodes.forEach(n=>{if(n.id<4)return;const blues=cards.filter(c=>c.rarity===2&&c.element===TERRAINS[n.terrain].up[0]);const leaderBlue=blues[n.id%blues.length].id;if(n.id<12){const troops=[...new Set([...n.enemy,...cards.filter(c=>c.rarity===1).map(c=>c.id)])].filter(id=>CARD[id].rarity===1&&!n.storyAllies.includes(id));n.enemy=troops.slice(0,8);n.enemy.splice(1,0,leaderBlue);n.leaderId=leaderBlue;n.commandTier=2;}else if(n.id<19){const leader=n.enemy.find(id=>CARD[id].rarity===3)||'P'+String((n.id*3)%70+1).padStart(3,'0');const pool=cards.filter(c=>c.rarity===2&&!n.storyAllies.includes(c.id));n.enemy=Array.from({length:8},(_,k)=>pool[(n.id*7+k*3)%pool.length].id);n.enemy.splice(1,0,leader);n.leaderId=leader;n.commandTier=3;}else n.commandTier=CARD[n.leaderId]?.rarity||4;});


// Independent chapter guardians: stable IDs, excluded from the ordinary pool.
const GUARDIAN_NAMES=['穀倉誓衛・最後麥穗','斷鎖監守・採石之門','鹽港燼衛・不滅航燈','日令守衛・徵兵名冊','神旗守誓者・第一防線','虹橋封航者・七彩界門','北風關衛・無稅雪隘','螺音巡衛・潮汐警鐘','禁園守望者・飢年果實','天秤裁衛・秩序之價','折翼城衛・無聲凱旋','白浪護航者・避難之誓','雙懼門衛・無名恐懼','金蘋果侍衛・欲望宴席','鎖火看守者・盜火鐐銬','醒酒門徒・狂歡餘燼','冥渡簿衛・未生之名','罌粟夢衛・長眠之城','石榴契衛・歸途誓言','冥座禁衛・亡者秩序','擎天界衛・蒼穹重負','戰火鎧衛・狂怒終界','銀月林衛・狩獵準則','智城盾衛・辯場之證','覆潮戟衛・不沉港灣','神后誓衛・不棄之約','日輪御衛・墜日前夕','星穹雙衛・夜天邊界','舊王鐮衛・王朝循環','曙光雷衛・凡人黎明'];
const GUARDIAN_PERSONAL_NAMES=["墨利安","卡斯鐸","涅瑞雅","菲蕾娜","阿爾刻昂","伊里珊","波瑞安","特里昂","黛芙莉亞","狄凱昂","伊卡瑞斯","瑙西婭","福柏里昂","厄莉珊","皮里昂","安佩洛恩","阿刻西昂","罌諾雅","柯瑞莉雅","墨爾薩恩","泰嶽恩","瓦爾克斯","瑟琳雅","伊索菲雅","涅瑞昂","卡莉珊卓","斐里奧斯","奧爾希昂","凱洛迦","艾斯特里昂"];
nodes.forEach((n,i)=>{
 const base=i<4?0:i<12?1:i<19?2:3,tier=base+1,oldLeader=CARD[n.leaderId];
 const templates=cards.filter(c=>!c.limited&&c.rarity===tier&&c.element===TERRAINS[n.terrain].up[0]);
 const source=templates[i%templates.length]||cards.find(c=>c.rarity===tier);
 const c=JSON.parse(JSON.stringify(source));c.id='L'+String(i+1).padStart(3,'0');c.name=GUARDIAN_PERSONAL_NAMES[i];c.epithet=GUARDIAN_NAMES[i];c.limited=true;c.sharedRegionalArt=false;c.originLabel='第 '+(i+1)+' 關守護者';c.guardianNode=i;c.guardianPatron=oldLeader.name;c.title='限定守護者 · '+GUARDIAN_NAMES[i];c.poolUnlock=i+1;c.hp=Math.round(c.hp*1.04);c.atk=Math.round(c.atk*1.02);c.lore=c.name+'，人稱「'+GUARDIAN_NAMES[i]+'」，是「'+n.name+'」的獨立守護者。'+n.story+' 此守護者承接'+oldLeader.name+'的試煉職責，並非該神祇本人。戰勝後，透過限定召喚締結守護誓約。';
 if(tier===4){c.originalName=c.name;c.species='神裔守護者';c.art={sheet:'guardian_gold_'+c.id.toLowerCase(),cell:0,cols:1,rows:1,variant:0,design:'限定守護者專屬原創立繪；原神樣貌僅限原卡'};}
 if(c.skill)c.skill.name=GUARDIAN_NAMES[i].split('・')[1]+'・'+c.skill.name;
 const troops=[...new Set([...n.enemy,...cards.filter(x=>!x.limited).map(x=>x.id)])].filter(id=>CARD[id].rarity===base&&!n.storyAllies.includes(id)).slice(0,8);
 c.bonds=troops.slice(0,tier===1?1:tier===4?3:2).map((id,j)=>({partner:id,type:j%2?'defense':'attack',title:'關隘同袍・'+(j+1),story:'共同守護「'+n.name+'」的戰線；雙方上場且存活時啟動。'}));c.bondBonus=tier===4?'guard':null;
 cards.push(c);CARD[c.id]=c;n.enemy=[...troops];n.enemy.splice(1,0,c.id);n.leaderId=c.id;n.commandTier=tier;n.storyCast=[c.id];
});


// Human resistance: nine civilian roles in white, green and blue only.
const HUMAN_REBELS=[['達蒙','石匠盾衛',0,'地','male'],['梅莉','獵弓手',2,'風','female'],['提蒙','漁港槍兵',2,'水','male'],['多莉','草藥醫者',3,'光','female'],['利昂','鐵匠鎚兵',1,'火','male'],['尼科','斥候劍士',2,'雷','male'],['菲拉','持炬守夜人',1,'火','female'],['阿里','糧道協調者',0,'冰','male'],['索菲','投石手',2,'地','female']];
for(let tier=0;tier<=2;tier++)HUMAN_REBELS.forEach(([name,job,role,element,voiceType],j)=>{
 const id='U'+String(tier*9+j+1).padStart(3,'0'),template=cards.find(c=>!c.limited&&c.rarity===tier&&c.role===ROLES[role]);
 const rank=['平民起義者','民兵骨幹','戰地幹部'][tier];let ability=null;
 if(tier===1)ability=basicSkills[role]();
 if(tier===2)ability=role===0?skill('協同盾陣',2,0,'allAlly',[{type:'shield',value:.8},{type:'guard',value:.1,duration:1}]):role===1?skill('破陣壓制',2,1.5,'single',[{type:'weak',value:.2,duration:2}]):role===3?skill('救護調度',2,0,'lowAlly',[{type:'heal',value:2},{type:'cleanse',value:1}]):skill('交錯突擊',2,1.9,'single',[{type:'vuln',value:.12,duration:1}]);
 if(ability)ability.name=job+'・'+ability.name;
 const c={id,name:name+'・'+rank,title:rank+' · '+job,rarity:tier,role:ROLES[role],element,species:'人族',humanRebel:true,profession:job,voiceType,hp:template.hp,atk:template.atk,def:template.def,spd:template.spd,skill:ability,passive:null,poolUnlock:tier===0?0:tier===1?1+Math.floor(j/3):6+Math.floor(j/3),art:{sheet:'human-rebels',cell:j,cols:3,rows:3,variant:0},lore:name+'原是凡界的'+job+'。神庭的徵稅與徵役使家園失去生計，於是加入厄里昂的起義隊伍，以人類的技藝、紀律與互助守護同行者。此卡為'+rank+'編制，不具神族血統。',bonds:[]};
 if(tier)c.bonds=Array.from({length:tier},(_,k)=>({partner:'U'+String(tier*9+(j+k+1)%9+1).padStart(3,'0'),type:k?'defense':'attack',title:'起義同袍・'+(k+1),story:'同批人族起義軍彼此支援，雙方上場且存活時啟動。'}));
 cards.push(c);CARD[id]=c;
});

// The protagonist has one stable identity across saves; story milestones replace its card form.
const HERO_ID='H001';
const HERO_STAGES=[
 {at:0,age:15,species:'人族',title:'灰燼中的少年',rarity:1,element:'地',hp:610,atk:111,def:29,spd:63,skill:skill('逆火・碎枷重鎚',2,1.55,'single',[{type:'weak',value:.15,duration:1}],{self:[{type:'shield',value:.55}]}),passive:{name:'護種之誓',type:'ward',value:.45,desc:'首次上場獲得自身攻擊力 45% 的護盾。'},lore:'十五歲的厄里昂，是凡人母親與隕落神裔的孩子。高大的身形與部族烙印沒有為他換來麵包。神庭帶走母親，又要把達蒙送上祭壇，他終於舉起礦鎚。尚未覺醒的他仍是人族，必須依靠同行者。'},
 {at:15,age:18,species:'半神',title:'持火的覺醒者',rarity:3,element:'火',hp:760,atk:145,def:38,spd:71,skill:skill('神火・裂天鎚環',2,1.9,'column',[{type:'vuln',value:.15,duration:2}],{self:[{type:'shield',value:.8}]}),passive:{name:'不熄的烙印',type:'ward',value:.7,desc:'首次上場獲得自身攻擊力 70% 的護盾。'},lore:'三年征途後，他在第十五道防線解開盜火者的鎖鏈。普羅米修斯的火種照見封存在血脈中的神性，部族烙印化為金焰。十八歲的他成為半神；力量來自血脈，使用力量的責任仍屬於人。'},
 {at:22,age:21,species:'逆命者',title:'拒絕王座的弒神者',rarity:4,element:'光',hp:900,atk:173,def:45,spd:77,skill:skill('逆命・萬鎚碎神庭',3,1.8,'allEnemy',[{type:'weak',value:.15,duration:2},{type:'vuln',value:.1,duration:1}],{self:[{type:'shield',value:1.1},{type:'boost',value:.12,duration:1}]}),passive:{name:'凡心鑄神核',type:'ward',value:.9,desc:'首次上場獲得自身攻擊力 90% 的護盾。'},lore:'又經三年，他與同行者共同斬滅阿瑞斯降臨凡界的神性戰軀。這不是消滅一切神明，而是第一次摧毀神權不可戰勝的化身。他拒絕繼承戰爭王座，以凡人意志重鑄神核，成為不受神庭血統支配的逆命者。'}
];
function heroRankSkill(rank){
 if(rank>=4)return skill('逆命・萬鎚碎神庭',3,1.9,'allEnemy',[{type:'weak',value:.15,duration:2},{type:'vuln',value:.12,duration:1}],{self:[{type:'shield',value:1.15},{type:'boost',value:.12,duration:1}]});
 if(rank===3)return skill('神火・焚枷裂天鎚',2,2,'columnPlusOne',[{type:'vuln',value:.15,duration:2}],{self:[{type:'shield',value:.85}]});
 if(rank===2)return skill('破誓・斷鏈震嶽鎚',2,1.7,'single',[{type:'weak',value:.18,duration:1}],{self:[{type:'shield',value:.65}]});
 return skill('逆火・碎枷重鎚',2,1.55,'single',[{type:'weak',value:.15,duration:1}],{self:[{type:'shield',value:.55}]});
}
function heroSkillEvolutionPanel(rank){const current=heroRankSkill(rank),next=rank<4?heroRankSkill(rank+1):null;return '<section class="hero-skill-evolution"><h3>卡色覺醒 · 專屬奧義</h3><strong>目前 · '+current.name+'</strong><p>'+skillText(current)+'</p>'+(next?'<hr class="divider"><strong>下一階 · '+RARITIES[rank+1]+'卡 · '+next.name+'</strong><p>'+skillText(next)+'</p>':'<p class="meta">已覺醒最終奧義。</p>')+'<p class="meta">轉階即替換奧義；升星不重複疊加技能效果。</p></section>';}
function heroCard(stage,rank=1){const s=HERO_STAGES[stage],base=HERO_STAGES[0],factor=heroRankFactor(rank);return{innate:{name:'不滅命火',type:'revive',value:.2,desc:'每場戰鬥首次死亡時，原位復活並恢復最大生命的 20%（至少 1 點）。保留氣與狀態，不重置行動次數或登場特性。'},id:HERO_ID,storyExclusive:true,name:'厄里昂',role:ROLES[2],profession:'起義戰鎚',poolUnlock:999,heroStage:stage,...s,rarity:rank,skill:heroRankSkill(rank),hp:Math.round(base.hp*factor),atk:Math.round(base.atk*factor),def:Math.round(base.def*factor),spd:base.spd,art:{sheet:'hero-evolution',cell:stage,cols:3,rows:1,variant:0,design:'原創主角，十五歲人族、十八歲半神、二十一歲逆命者的連續立繪'},bonds:[{partner:HERO_ID,self:true,type:'defense',title:'凡心不屈',story:'自身上場且存活時啟動。守住自己的意志，便是最初的羈絆。'},...(stage>=1?[{partner:HERO_ID,self:true,type:'attack',title:'神火自燃',story:'半神覺醒後解鎖；自身上場且存活時啟動，不需其他角色。'}]:[]),...(stage>=2?[{partner:HERO_ID,self:true,type:'charge',title:'逆命自證',story:'逆命者形態解鎖；自身上場且存活時啟動，以自己的選擇凝聚神力。'}]:[])],bondBonus:stage===2?'guard':null};}
cards.push(CARD[HERO_ID]=heroCard(0));
function heroStageFor(s){return s.cleared>=22?2:s.cleared>=15?1:0;}
function syncHeroProgress(){const stage=heroStageFor(state),rank=ensureRecruitment().heroRank;if(CARD[HERO_ID].heroStage!==stage||CARD[HERO_ID].rarity!==rank)Object.assign(CARD[HERO_ID],heroCard(stage,rank));if(state.recruitment&&!state.recruitment.owned.includes(HERO_ID))state.recruitment.owned.push(HERO_ID);}
function heroProgressPanel(c){if(c.id!==HERO_ID)return '';return '<section class="hero-progress hero-story-entry"><button data-action="heroChronicle"><span aria-hidden="true">✧</span><span>閱讀崛起故事</span><span aria-hidden="true">›</span></button></section>';}
function ascensionTier(c){return c.rarity;}
function heroRankFactor(rank){let factor=1;const rates=[0,.05,.04,.03];for(let r=1;r<rank;r++)factor*=(1+5*rates[r])*1.07;return factor;}

/* ===== engine.js ===== */
'use strict';
const STATUS={shield:'護盾',guard:'減傷',weak:'虛弱',boost:'強化',vuln:'易傷',haste:'迅捷',silence:'沉默',stun:'昏迷',burn:'灼傷',regen:'再生',taunt:'嘲諷'};
function advantage(a,b){if(a===b)return 1;let i=ELEMENTS.indexOf(a),j=ELEMENTS.indexOf(b);if(i<0||j<0)return 1;return (i+1)%8===j?1.3:(j+1)%8===i?.7:1;}
function terrainFactor(c,t){return t.up.includes(c.element)?1.15:t.down.includes(c.element)?.85:1;}
let battleMusicSerial=0;
function createBattle(formation,enemy,terrain,scale=1,enemyScale=1,policies={}){
let b={musicSession:++battleMusicSerial,round:0,queue:[],units:[],terrain:TERRAINS[terrain],log:[],done:false,winner:null,last:null,events:[],impactUnits:null};
[formation,enemy].forEach((ids,side)=>ids.forEach((id,slot)=>{if(!CARD[id])return;let c=CARD[id],s=side?enemyScale:scale;b.units.push({...c,growthScale:s,uid:side+'-'+slot,side,slot,origin:slot,active:slot<6,hp:Math.round(c.hp*s),max:Math.round(c.hp*s),atk:Math.round(c.atk*s),def:Math.round(c.def*s),qi:0,shield:0,status:[],auto:side?true:policies[id]!==false,entered:false});}));
for(let side=0;side<2;side++){let v=Math.max(0,...b.units.filter(u=>u.side===side&&u.active&&u.passive?.type==='teamhp').map(u=>u.passive.value));for(let u of b.units.filter(u=>u.side===side)){u.teamHpAura=v;u.teamHpSources=b.units.filter(x=>x.side===side&&x.active&&x.passive?.type==='teamhp'&&x.passive.value===v).map(x=>x.name);u.max=Math.round(u.max*(1+v));u.hp=u.max;}}
b.units.filter(u=>u.active).forEach(u=>enter(b,u));reinforce(b);b.log.push('戰鬥開始：'+b.terrain.name+'。雙方從 0 氣開始。');return b;}
function emit(b,event){(b.events||=[]).push(event);}
function captureImpact(b){resolveInnateRevival(b);b.impactUnits=b.units.map(u=>({...u,status:u.status.map(s=>({...s}))}));}
function active(b,side){return b.units.filter(u=>u.side===side&&u.hp>0&&u.active);}
function status(u,type){return Math.max(0,...u.status.filter(s=>s.type===type).map(s=>s.value||0));}
function enter(b,u){if(u.entered)return;u.entered=true;if(u.starWard)u.shield=Math.min(u.max,u.shield+u.starWard);if(u.passive?.type==='ward')u.shield+=Math.round(u.atk*u.passive.value);}
function reinforce(b){resolveInnateRevival(b);for(let side=0;side<2;side++)for(let lane=0;lane<3;lane++){
const reserve=b.units.find(u=>u.side===side&&u.origin===lane+6&&!u.active&&u.hp>0);if(!reserve)continue;
// An empty starting cell is not a death. A reserve only replaces a fallen starter in its own lane.
const fallen=b.units.filter(u=>u.side===side&&u.origin<6&&u.slot%3===lane&&u.hp<=0).sort((a,z)=>a.slot-z.slot)[0];
if(fallen){reserve.active=true;reserve.slot=fallen.slot;enter(b,reserve);emit(b,{kind:'entry',target:reserve.uid,slot:reserve.slot});b.log.push(reserve.name+' 由 '+(reserve.origin+1)+' 號位替補至 '+(reserve.slot+1)+' 號位，下輪開始行動。');}
}}
function pick(b,u,type,requested=null){let en=active(b,1-u.side),al=active(b,u.side);const area=lane=>{const targets=en.filter(v=>v.slot%3===lane);if(type==='columnPlusOne'){const extra=en.filter(v=>v.slot%3!==lane).sort((a,z)=>Math.abs(a.slot%3-lane)-Math.abs(z.slot%3-lane)||(a.slot>=3)-(z.slot>=3)||a.hp/a.max-z.hp/z.max||a.slot-z.slot)[0];if(extra)targets.push(extra);}return targets;};const chosen=b.units.find(v=>v.uid===requested&&v.hp>0&&v.active);if(chosen){if(type==='lowAlly'&&chosen.side===u.side)return [chosen];if(['single','lowEnemy','column','columnPlusOne'].includes(type)&&chosen.side!==u.side){const taunts=en.filter(v=>status(v,'taunt'));if(!taunts.length||taunts.includes(chosen))return type==='column'||type==='columnPlusOne'?area(chosen.slot%3):[chosen];}}if(type==='allAlly')return al;if(type==='lowAlly')return al.sort((a,z)=>a.hp/a.max-z.hp/z.max).slice(0,1);if(type==='self')return [u];if(type==='allEnemy')return en;if(type==='lowEnemy')return en.sort((a,z)=>a.hp/a.max-z.hp/z.max).slice(0,1);let taunt=en.filter(v=>status(v,'taunt'));let lane=en.filter(v=>v.slot%3===u.slot%3);let pool=taunt.length?taunt:lane.length?lane:en;let first=pool.sort((a,z)=>(a.slot>=3)-(z.slot>=3)||a.slot-z.slot)[0];if(type==='column'||type==='columnPlusOne')return first?area(first.slot%3):[];return first?[first]:[];}
function effect(b,source,u,e){let power=(source.passive?.type==='healpower'?1+source.passive.value:1)*bondSupportFactor(b,source);
if(e.type==='heal'){let old=u.hp;u.hp=Math.min(u.max,u.hp+Math.round(bondAttack(b,source)*e.value*power));if(u.hp>old)emit(b,{kind:'heal',target:u.uid,amount:u.hp-old});return;}
if(e.type==='shield'){let old=u.shield;u.shield=Math.min(u.max,u.shield+Math.round(bondAttack(b,source)*e.value*power));if(u.shield>old)emit(b,{kind:'shield',target:u.uid,amount:u.shield-old});return;}
if(e.type==='cleanse'){let old=u.status.length;u.status=u.status.filter(s=>!['weak','vuln','silence','stun','burn'].includes(s.type));if(old>u.status.length)emit(b,{kind:'cleanse',target:u.uid});return;}
if(e.type==='silence'&&u.passive?.type==='immune')return;
u.status=u.status.filter(s=>s.type!==e.type);u.status.push({...e,expires:b.round+(e.duration||1),sourceAtk:bondAttack(b,source),sourceName:source.name,sourceSkill:source.skill?.name});emit(b,{kind:['weak','vuln','silence','stun','burn'].includes(e.type)?'debuff':'buff',target:u.uid,status:e.type});}
function hurt(b,u,v,power){const critical=power>0&&Math.random()<.10;let mult=bondDamageFactor(b,u,v)*advantage(u.element,v.element)*terrainFactor(u,b.terrain)*(1+status(u,'boost'))*(1-status(u,'weak'))*(1+status(v,'vuln'))*(1-status(v,'guard'));
if(critical)mult*=1.5;mult*=1+(u.starPowers?.damage||0);mult*=1-(v.starPowers?.guard||0);if(v.rarity>=3)mult*=1+(u.divinePowers?.damage||0);if(u.rarity>=3)mult*=1-(v.divinePowers?.guard||0);let p=u.passive;if(p?.type==='damage')mult*=1+p.value;if(p?.type==='rage'&&u.hp/u.max<.5)mult*=1+p.value;if(p?.type==='execute'&&v.hp/v.max<.5)mult*=1+p.value;
if(u.rarity<2){let h=Math.max(0,...active(b,u.side).filter(a=>a.passive?.type==='human').map(a=>a.passive.value));mult*=1+h;}
let g=Math.max(0,...active(b,v.side).filter(a=>a.passive?.type==='teamguard').map(a=>a.passive.value));mult*=1-g;if(v.passive?.type==='armor')mult*=1-v.passive.value;
let def=bondDefense(b,v)*(1-Math.min(.75,(p?.type==='pierce'?p.value:0)+(u.starPowers?.pierce||0)+(v.rarity>=3?(u.divinePowers?.pierce||0):0)));let n=Math.max(1,Math.round(bondAttack(b,u)*power*mult*100/(100+def)));let absorb=Math.min(v.shield,n);v.shield-=absorb;let dealt=Math.min(v.hp,n-absorb);v.hp-=dealt;emit(b,{kind:'damage',target:v.uid,amount:dealt,absorbed:absorb,element:u.element,critical});if(p?.type==='leech'){let old=u.hp;u.hp=Math.min(u.max,u.hp+Math.round(dealt*p.value));if(u.hp>old)emit(b,{kind:'heal',target:u.uid,amount:u.hp-old});}return {n,dealt,absorb,critical};}
function checkEnd(b){resolveInnateRevival(b);for(let side=0;side<2;side++)if(!b.units.some(u=>u.side===side&&u.hp>0)){b.done=true;b.winner=1-side;return true;}return false;}
function nextAction(b,continuing=false){if(b.done)return b;if(!continuing){b.events=[];b.impactUnits=null;}reinforce(b);if(checkEnd(b))return b;
b.queue=b.queue.filter(id=>b.units.some(u=>u.uid===id&&u.hp>0&&u.active));if(!b.queue.length){if(b.round>=50){b.done=true;b.winner=-1;b.log.push('50 回合戰線僵持，平手。本場不發放通關獎勵。');return b;}b.round++;emit(b,{kind:'round',round:b.round});b.units.forEach(u=>u.status=u.status.filter(s=>s.expires>=b.round));b.queue=orderedRound(b);b.log.push('── 第 '+b.round+' 回合 ──');}
if(b.autoPriority&&!b.command)prioritizeCounterActor(b);
if(b.command){const command=b.command;delete b.command;const at=b.queue.indexOf(command.uid);const head=b.units.find(u=>u.uid===b.queue[0]);const actor=b.units.find(u=>u.uid===command.uid);if(at>=0&&head?.side===0&&actor?.side===0&&actor.hp>0&&actor.active){[b.queue[0],b.queue[at]]=[b.queue[at],b.queue[0]];b.manualSkill=command.skill;b.manualTarget=command.target;}}
let uid=b.queue.shift();let u=b.units.find(u=>u.uid===uid);if(!u||u.hp<=0||!u.active)return nextAction(b,true);
const commandSkill=b.manualSkill,commandTarget=b.manualTarget;delete b.manualSkill;delete b.manualTarget;let recovery=Math.round(u.max*(u.starPowers?.regen||0));if(u.passive?.type==='regen')recovery+=Math.round(u.max*u.passive.value);if(status(u,'regen'))recovery+=Math.round(u.max*status(u,'regen'));if(recovery){let old=u.hp;u.hp=Math.min(u.max,u.hp+recovery);if(u.hp>old)emit(b,{kind:'heal',target:u.uid,amount:u.hp-old});}
for(let burn of u.status.filter(s=>s.type==='burn')){let old=u.hp;u.hp=Math.max(0,u.hp-Math.round(burn.sourceAtk*burn.value));emit(b,{kind:'damage',target:u.uid,amount:old-u.hp,absorbed:0,element:'火'});}
if(u.hp<=0){b.last={actor:u.uid,targets:[u.uid],skill:'灼傷'};b.log.push(u.name+' 因灼傷倒下。');captureImpact(b);reinforce(b);checkEnd(b);return b;}
if(status(u,'stun')){u.status=u.status.filter(s=>s.type!=='stun');b.log.push(u.name+' 昏迷，跳過行動。');b.last={actor:u.uid,targets:[],skill:'昏迷'};emit(b,{kind:'notice',target:u.uid,label:'昏迷 · 跳過'});captureImpact(b);return b;}
let manual=commandSkill;let s=u.skill&&u.qi>=u.skill.cost&&(manual===undefined?u.auto:manual)&&!status(u,'silence')?u.skill:null;let targets=pick(b,u,s?.target||'single',commandTarget);let logs=[];if(s)emit(b,{kind:'cast',actor:u.uid,name:s.name,element:u.element});
for(let v of targets){if(s?.power===0){}else{let hit=hurt(b,u,v,s?s.power:1);logs.push((hit.critical?'暴擊！':'')+v.name+' −'+hit.n+(hit.absorb?'（盾擋 '+hit.absorb+'）':''));if(s?.drain){let old=u.hp;u.hp=Math.min(u.max,u.hp+Math.round(hit.dealt*s.drain));if(u.hp>old)emit(b,{kind:'heal',target:u.uid,amount:u.hp-old});}}
if(v.hp>0&&s)for(let e of s.effects)effect(b,u,v,e);}
if(s){u.qi=0;for(let e of s.self||[])effect(b,u,u,e);if(s.teamheal)active(b,u.side).forEach(v=>effect(b,u,v,{type:'heal',value:s.teamheal}));if(s.recoil){let loss=Math.round(u.max*s.recoil);let old=u.hp;u.hp=Math.max(1,u.hp-loss);emit(b,{kind:'recoil',target:u.uid,amount:old-u.hp});logs.push('反噬 '+loss+'（不致死）');}}else if(u.skill)u.qi=Math.min(u.skill.cost,u.qi+1);
bondGain(b,u,s?'refund':'charge');
b.last={actor:u.uid,targets:targets.map(v=>v.uid),skill:s?s.name:'普通攻擊'};
b.log.push((u.side?'敵':'我')+'・'+u.name+'：'+(s?s.name:'普攻')+(logs.length?' → '+logs.join(' / '):' → '+targets.length+' 名友方獲得效果'));captureImpact(b);reinforce(b);checkEnd(b);return b;}
function speed(u){return u.spd*(1+status(u,'haste'))*(u.passive?.type==='speed'?1+u.passive.value:1);}
if(typeof module!=='undefined')module.exports={createBattle,nextAction,advantage,terrainFactor,active,STATUS,effect,hurt,reinforce};


/* ===== icons.js ===== */
'use strict';
// Shared functional unit glyphs: each card combines a stable silhouette, equipment and livery.
const ICON_TOOLS={
 pick:'M-8-15Q0-24 9-15M0-20V19',crook:'M0 19V-14Q0-24 8-20Q13-15 6-10',fish:'M-9 0Q0-13 8 0Q0 13-9 0L-14-7V7Z',jar:'M-5-11H5L8 5Q8 13 0 13Q-8 13-8 5ZM-5-15H5',wheat:'M0 19V-20M0-10-7-17M0-3 8-11M0 6-8-3M0 12 8 4',axe:'M0 19V-21M1-17Q17-18 11-3L0-7',salt:'M-11 11 0-12 11 11ZM-5 4H5',spindle:'M0-20V20M0-13-7 0 0 12 7 0ZM-8 0H8',bucket:'M-10-3H10L7 13H-7ZM-8-3V-10Q0-20 8-10V-3',hammer:'M0 19V-11M-10-19H10V-8H-10Z',
 shield:'M-11-15H11V-1Q11 12 0 19Q-11 12-11-1ZM0-10V11',spear:'M0 20V-11M0-23-6-10H6Z',bow:'M-5-21Q18 0-5 21ZM-9 0H15M10-5 15 0 10 5',staff:'M0 20V-10M0-22 7-15 0-8-7-15Z',sword:'M0-24 5-16 3 9H-3L-5-16ZM-9 9H9M0 9V20',scroll:'M-8-14H8V14H-8ZM-4-7H4M-4 0H4M-4 7H4',horn:'M-11 10Q6 3 9-16L14-10Q10 8-9 17ZM8-16 15-10',banner:'M-7 20V-21M-7-20H12L7-12 12-4H-7',torch:'M0 20V0M-7-4Q-10-12 0-23Q-1-12 6-14Q13 0 0 1Q-7 1-7-4Z',lyre:'M-10-17V2Q-10 15 0 15Q10 15 10 2V-17M-10-10H10M-4-10V8M4-10V8',
 bolt:'M4-24-10 1H0L-4 23 13-5H2Z',trident:'M0 21V-24M-11-18V-6Q0 6 11-6V-18M-15-14-11-20-7-14M7-14 11-20 15-14',bident:'M0 21V-3M-9-21V-10Q0 4 9-10V-21',crown:'M-13-9-9 10H9L13-9 5 0 0-15-5 0ZM-9 14H9',heart:'M0 16Q-22 1-11-11Q-5-18 0-8Q7-20 14-9Q21 2 0 16Z',cup:'M-10-17H10V-8Q10 5 0 5Q-10 5-10-8ZM0 5V18M-8 18H8',flame:'M0 18Q-19 11-8-8Q-4 0 0-22Q19-7 11 10Q9 18 0 18Z',flower:'M0 19V0M0-7C-16 0-15-18-3-14C-7-27 12-26 9-14C24-15 19 2 7-4C6 10-9 7 0-7Z',torches:'M-7 20-7-4M7 20V-4M-7-4Q-19-9-7-21Q5-9-7-4ZM7-4Q-4-9 7-21Q19-9 7-4Z',
 sun:'M0-22V-17M0 17V22M-22 0H-17M17 0H22M-16-16-12-12M12 12 16 16M-16 16-12 12M12-12 16-16M12 0A12 12 0 1 1-12 0A12 12 0 1 1 12 0Z',moon:'M7-19A20 20 0 1 0 7 19A25 25 0 0 1 7-19Z',star:'M0-22 6-6 22-5 9 5 14 21 0 12-14 21-9 5-22-5-6-6Z',sickle:'M-2 20V-8M-2-19Q21-21 13-1Q14-14-2-8Z',mountain:'M-18 14-5-13 3 2 9-9 19 14ZM-9-5-5 0-1-5',tree:'M0 20V4M-14 4Q-24-5-11-12Q-11-28 3-19Q16-23 17-9Q26 6 10 9Z',stars:'M-9-22-6-15 1-12-6-9-9-2-12-9-19-12-12-15ZM10 0 13 8 21 11 13 14 10 22 7 14-1 11 7 8Z',eye:'M-20 0Q0-22 20 0Q0 22-20 0ZM6 0A6 6 0 1 1-6 0A6 6 0 1 1 6 0Z',void:'M18 0A18 18 0 1 1-18 0A18 18 0 1 1 18 0ZM8 0A8 8 0 1 0-8 0A8 8 0 1 0 8 0Z',halo:'M-17-10Q0-22 17-10Q0 2-17-10ZM0-4V20M-10 7H10',globe:'M0-19A19 19 0 1 0 0 19A19 19 0 1 0 0-19ZM0-19Q-14 0 0 19Q14 0 0-19ZM-19 0H19',scythe:'M-6 21V-19M-6-19Q17-26 20-7Q10-17-6-11',sleep:'M-11-17H2L-11-2H2M2 4H15L2 19H15',wing:'M-13 17Q-11-14 16-22L8-4 2-4 2 3-5 3-5 12Z'};
const ORANGE_TOOLS=['bolt','trident','bident','shield','spear','lyre','bow','crown','wheat','wing','hammer','heart','cup','flame','flower','torches','sun','moon','star','sickle','mountain','tree','stars','eye','void','halo','torch','globe','scythe','sleep'];
const HUMAN_TOOLS=['pick','crook','fish','jar','wheat','axe','salt','spindle','bucket','hammer'];
const OFFICER_TOOLS=['shield','scroll','bow','staff','spear','sword','axe','lyre','horn','banner'];
const ICON_PALETTE=['#d5b17d','#8ccab9','#d99686','#a8bce8','#b7cd8c','#c9a1ce','#e6ca8b','#94c4d7','#d7a8b8','#adbece','#d8b895','#86bca7','#c98e72','#9daed6','#9fbd83','#b694c6','#d9bb6e','#76b6c8','#c99fae','#92a9b9'];
const ELEMENT_COLORS={雷:'#e7bf59',水:'#66b7f2',火:'#f38b70',冰:'#a7e8ed',地:'#c9a47a',風:'#83c9a2',光:'#f4e4ac',冥:'#bc93e9'};
function iconSpec(c){let n=Number(c.id.slice(1))-1;return {n,group:Math.floor(n/10),tool:c.rarity===0?HUMAN_TOOLS[n%10]:c.rarity===1?OFFICER_TOOLS[n%10]:c.rarity===4?ORANGE_TOOLS[n]:Object.keys(ICON_TOOLS)[(n*7+3)%Object.keys(ICON_TOOLS).length],color:ICON_PALETTE[Math.floor(n/(c.rarity<2?10:1))%20],hat:c.rarity<2?Math.floor(n/10)%5:n%5,mark:c.rarity<2?Math.floor(n/50)%4:Math.floor(n/5)%4};}
function iconDefs(){return `<svg class="icon-defs" aria-hidden="true" width="0" height="0"><defs>${Object.entries(ICON_TOOLS).map(([k,p])=>`<g id="prop-${k}" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="${p}"/></g>`).join('')}</defs></svg>`;}
function commonAvatar(c,cls=''){let s=iconSpec(c),color=ELEMENT_COLORS[c.element];const hats=['M33 30Q34 14 48 16Q60 16 62 30','M31 28H64M37 26V17H57V26','M34 28 37 16 43 23 49 12 55 23 61 16 62 29','M35 29Q31 8 51 15Q68 19 61 33M52 16 67 12','M33 30Q30 18 41 19M40 20Q46 5 56 18M55 20Q67 14 64 30'];let rare=c.rarity>=2;
return `<svg class="avatar ${cls}" viewBox="0 0 110 116" aria-hidden="true" data-avatar="${c.id}" style="--avatar-color:${s.color};--element-color:${color}"><ellipse cx="51" cy="108" rx="29" ry="4" fill="#000" opacity=".24"/>${rare?`<circle cx="48" cy="31" r="${c.rarity===4?26:23}" fill="none" stroke="${color}" stroke-width="1.5" ${c.rarity===3?'stroke-dasharray="3 5"':''}/>`:''}<g stroke="${s.color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M43 76 35 104M54 76 63 104M41 46 26 66 17 53M54 46 71 59 82 46" fill="none"/><path d="M40 43H56L${61+s.mark} 79H${34-s.mark}Z" fill="${s.color}" fill-opacity=".16" stroke-width="2.5"/><path d="M48 42V75M40 60H57" fill="none"/><circle cx="48" cy="30" r="12" fill="#192734" stroke-width="2.8"/><path d="${hats[s.hat]}" fill="none" stroke-width="3"/><path d="M43 31h.1M53 31h.1" stroke="#f7e5bf" stroke-width="2.7"/>${s.mark===0?'<path d="M42 68H55"/>':s.mark===1?'<path d="M43 64 54 73M54 64 43 73" stroke-width="2"/>':s.mark===2?'<path d="M48 63 53 68 48 73 43 68Z" fill="none" stroke-width="2"/>':'<circle cx="48" cy="68" r="4" fill="none" stroke-width="2"/>'}</g><g style="color:${color}" transform="translate(87 62) scale(.77)"><use href="#prop-${s.tool}"/></g>${c.rarity===1?`<path d="M30 40 35 37M61 37 67 42" stroke="${color}" stroke-width="5"/>`:''}${c.rarity===4?'<path d="M37 15 39 5 47 11 55 5 59 17" fill="none" stroke="#e8ac58" stroke-width="2"/>':''}<circle cx="17" cy="84" r="9" fill="#111c29" stroke="${color}" stroke-width="1"/><text x="17" y="88" text-anchor="middle" fill="${color}" font-size="12">${EICON[c.element]}</text></svg>`;}
// Mythic silhouettes use distinct body poses, faces, robes and divine attributes.
const MYTH_POSES={
 throne:{head:[59,32,0],body:'M43 49Q59 42 75 49L82 84 72 98H43L36 84Z',arms:'M45 53 29 62 24 47M73 53 88 48 92 29',legs:'M47 87 43 111 32 125M70 87 78 111 89 125',hand:[96,26,-12]},
 surge:{head:[59,30,-12],body:'M46 45 70 44 78 79 60 91 42 76Z',arms:'M47 51 25 71 17 60M68 50 89 59 102 45',legs:'M51 84 39 104 14 121M69 83 85 104 107 115',hand:[105,43,0]},
 hood:{head:[61,37,0],body:'M45 42Q62 30 78 44L93 124 62 116 31 125Z',arms:'M46 55 33 76 20 74M77 54 91 66 99 47',legs:'',hand:[102,62,0]},
 guard:{head:[61,29,0],body:'M43 48 78 46 76 74 65 91 43 80Z',arms:'M47 53 29 67 29 83M74 52 90 52 98 38',legs:'M50 83 39 108 24 118M67 83 75 108 91 122',hand:[101,44,0]},
 strike:{head:[62,28,-12],body:'M45 42 72 45 80 72 59 92 42 78Z',arms:'M47 48 31 36 24 17M72 49 92 70 105 55',legs:'M54 84 34 102 16 116M70 83 80 109 102 126',hand:[104,44,-24]},
 musician:{head:[57,33,-6],body:'M45 47 69 47 77 82 88 117 52 118 37 86Z',arms:'M47 51 39 70 62 77M67 53 82 60 80 79',legs:'M53 113 43 128M76 113 89 126',hand:[79,74,0]},
 archer:{head:[50,33,10],body:'M37 47 62 46 77 76 58 91 39 73Z',arms:'M41 52 21 68 62 59M60 51 92 57 103 53',legs:'M58 85 36 106 24 122M67 84 88 103 77 124',hand:[106,54,0]},
 queen:{head:[61,28,0],body:'M49 43 72 43 74 71Q79 95 100 123Q61 133 24 123Q45 93 48 71Z',arms:'M49 49 32 65 21 47M71 49 88 68 100 52',legs:'',hand:[103,50,12]},
 run:{head:[61,32,17],body:'M50 44 71 49 66 80 44 77Z',arms:'M53 50 33 66 18 56M69 53 86 42 91 29',legs:'M50 76 74 99 99 92M62 77 41 99 30 124',hand:[97,30,25]},
 forge:{head:[71,48,24],body:'M47 45 72 61 62 87 29 77Z',arms:'M51 55 40 30 51 13M67 65 80 81 101 81',legs:'M38 78 28 103 15 122M59 84 67 108 85 126',hand:[56,17,-40]},
 float:{head:[62,28,-8],body:'M51 43 73 44 75 72Q69 94 89 116L62 108 44 122 51 79Z',arms:'M52 49 35 60 18 45M72 49 91 42 103 22',legs:'',hand:[107,23,0]},
 recline:{head:[45,52,-25],body:'M40 67 56 60 89 81 97 97 60 91 32 85Z',arms:'M45 70 27 80 16 68M57 67 67 45 80 39',legs:'M84 88 103 100 111 119M70 89 79 108 54 121',hand:[81,30,0]},
 kneel:{head:[61,47,0],body:'M45 63 72 63 78 94 94 119 54 124 36 99Z',arms:'M47 67 29 84 39 101M70 67 88 84 77 101',legs:'',hand:[61,98,0]},
 invoke:{head:[61,36,0],body:'M46 50 77 50 75 81 91 122 33 122 46 81Z',arms:'M48 55 29 43 19 23M75 55 94 43 106 23',legs:'',hand:[107,23,0]},
 carry:{head:[62,73,12],body:'M43 82 78 82 83 102 57 113 37 102Z',arms:'M45 88 23 66 32 47M76 87 99 66 91 47',legs:'M49 108 28 128M73 108 94 130',hand:[103,75,0]},
 reap:{head:[52,36,8],body:'M38 51 64 46 81 93 96 126 46 116 31 126 38 86Z',arms:'M39 56 24 78 14 71M65 54 86 60 99 47',legs:'',hand:[105,64,0]},
 earth:{head:[61,34,0],body:'M44 48 79 48 87 87 109 120 85 117 67 132 53 122 22 129 38 89Z',arms:'M45 54 25 65 11 57M76 54 99 65 116 53',legs:'',hand:[109,39,0]},
 sleep:{head:[45,50,-32],body:'M43 64 60 59 82 80 104 105 82 117 58 93 34 84Z',arms:'M43 67 28 56 33 47M59 64 82 67 94 53',legs:'',hand:[97,44,0]}
};
// pose, face, garment, hair, backdrop, attribute. Every orange card is authored individually.
const GOD_LOOKS=[
 ['throne','beard','#547ec0','#e8e6d8','throne','bolt'],['surge','beard','#3d9eac','#173f65','waves','trident'],['hood','beard','#58476b','#d0cbd3','gate','bident'],
 ['guard','helmet','#8998a5','#705530','shield','spear'],['strike','helmet','#b54843','#7b282c','war','sword'],['musician','curl','#d9b457','#eee0a1','rays','lyre'],
 ['archer','ponytail','#7e9ead','#dbe7e5','crescent','bow'],['queen','veil','#a984bc','#3f2856','peacock','crown'],['queen','braid','#9baf5c','#d6aa63','grain','wheat'],
 ['run','wingcap','#6fbba9','#b39b70','speed','staff'],['forge','beard','#b77c50','#765747','anvil','hammer'],['float','long','#dba8b3','#efd0af','shell','heart'],
 ['recline','curl','#9572ad','#382d53','vine','cup'],['kneel','veil','#d6a271','#8a6b50','hearth','flame'],['queen','split','#bb7895','#503c61','garden','flower'],
 ['invoke','triple','#8b80af','#48456b','sigil','torches'],['surge','radiant','#e6aa55','#ecd298','wheel','sun'],['recline','long','#aabce0','#e2e9f4','crescent','moon'],
 ['float','braid','#e8a895','#c27b5d','dawn','star'],['reap','old','#899674','#d7dbbc','clock','sickle'],['invoke','veil','#b28d73','#765941','mountains','mountain'],
 ['earth','long','#6fa16e','#3c6443','roots','tree'],['invoke','void','#8392cf','#cad7f2','constellation','stars'],['float','long','#736798','#2b2348','nightwings','eye'],
 ['hood','void','#525779','#20263e','smoke','void'],['float','radiant','#c4d9bf','#fff6bd','aether','halo'],['surge','short','#c58f68','#a0583c','chain','torch'],
 ['carry','beard','#9d976c','#78754d','world','globe'],['reap','skull','#858796','#dfdfd5','deathwings','scythe'],['sleep','closed','#b1a0ce','#d3cde0','sleepwing','sleep']
];
const PURPLE_POSES=['guard','invoke','archer','musician','float','queen','reap','kneel','run','surge','hood','recline','earth','strike'];
const PURPLE_FACES=['short','braid','helmet','long','curl','veil','ponytail','closed','wingcap','beard'];
function mythLook(c){let n=Number(c.id.slice(1))-1;if(c.rarity===4){let [pose,face,robe,hair,back,tool]=GOD_LOOKS[n];return {pose,face,robe,hair,back,tool};}return {pose:PURPLE_POSES[n%14],face:PURPLE_FACES[Math.floor(n/7)%10],robe:ICON_PALETTE[n%20],hair:ICON_PALETTE[(n+7)%20],back:['sigil','crescent','grain','waves','rays','vine','constellation'][Math.floor(n/10)],tool:iconSpec(c).tool};}
function mythBackdrop(kind,tone){const stroke=`stroke="${tone}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"`;const shapes={
 throne:'<path d="M29 119V44L23 30 35 15 43 36H79L87 15 100 30 94 44V119M30 85H93M36 86V128M87 86V128"/>',
 waves:'<path d="M7 117Q18 100 33 117T61 117T91 117T120 117M8 129Q25 113 40 129T72 129T116 129M14 86Q-1 60 25 65Q7 70 25 83"/>',
 gate:'<path d="M19 128V48Q19 4 62 4Q106 4 106 48V128M25 42V16M98 42V16M33 21H90M28 37H95"/>',
 shield:'<path d="M16 63 39 56 43 89Q42 105 28 113Q13 105 12 87Z" fill="#3e5b70"/><path d="M27 66V99M17 79H37"/>',
 war:'<path d="M9 124 112 29M16 111 25 121M19 123 113 23M98 19 117 39"/><path d="M24 32Q35 4 78 10L82 19Q40 9 24 32" fill="#8b4038"/>',
 rays:'<circle cx="60" cy="39" r="27"/><path d="M60 4V10M29 11 35 18M90 11 85 19M20 40H28M92 40H101M31 66 35 60M87 60 94 69"/>',
 crescent:'<path d="M88 7A59 59 0 1 0 105 104A66 66 0 0 1 88 7Z" fill="currentColor" fill-opacity=".12"/>',
 peacock:'<path d="M60 74Q1 38 13 12Q40 12 61 59Q77 10 109 12Q125 41 66 76M60 67Q25 2 42 3Q59 9 62 54Q68 8 86 3Q100 16 65 70"/><circle cx="23" cy="25" r="5"/><circle cx="101" cy="25" r="5"/>',
 grain:'<path d="M18 123 15 61M15 72 8 61M16 84 24 72M106 124 111 58M110 71 103 61M108 86 117 73"/>',
 speed:'<path d="M9 51H29M2 73H26M9 94H23M21 122 17 110 29 115M88 92 98 77 101 89"/>',
 anvil:'<path d="M78 92H122L113 103H104L108 120H86L92 103H78Z" fill="#6e7a80"/><path d="M76 29 82 23M84 40H94M66 16V7"/>',
 shell:'<path d="M62 130Q9 115 21 102Q33 84 43 105Q61 77 77 105Q90 87 109 106Q112 124 62 130ZM62 130 32 108M62 130V106M62 130 97 108" fill="currentColor" fill-opacity=".13"/>',
 vine:'<path d="M12 118Q5 92 22 74M22 90Q39 75 32 67Q15 67 22 90M101 131Q122 113 110 84M111 104Q92 84 98 78Q117 80 111 104"/><circle cx="17" cy="111" r="4"/><circle cx="23" cy="119" r="4"/>',
 hearth:'<path d="M20 123H105M29 131H99M21 117 39 125M98 117 83 125"/><path d="M57 120Q32 112 48 91L57 103 67 78Q97 113 65 122Z" fill="#b76843"/>',
 garden:'<path d="M20 125 24 81M20 110 10 99M23 94 33 85M100 126 107 89M104 113 117 100"/><circle cx="24" cy="78" r="7" fill="#db8596"/>',
 sigil:'<circle cx="62" cy="64" r="49" stroke-dasharray="3 8"/><path d="M62 11 16 98H109ZM16 38H110L62 125Z" opacity=".45"/>',
 wheel:'<circle cx="69" cy="106" r="25"/><path d="M69 81V131M44 106H94M51 89 86 124M87 89 51 123"/><path d="M9 80H49L46 103H20Z" fill="currentColor" fill-opacity=".2"/>',
 dawn:'<path d="M45 64Q6 51 5 14Q38 16 49 51M76 63Q121 46 120 13Q83 21 72 49" fill="currentColor" fill-opacity=".2"/><path d="M10 23 35 45M119 22 94 45M14 127H115"/>',
 clock:'<path d="M20 11 104 11 21 128H103Z" opacity=".3"/><circle cx="60" cy="36" r="24"/><path d="M60 16V36L73 45"/>',
 mountains:'<path d="M4 123 28 88 46 106 64 77 90 112 107 84 125 123Z" fill="currentColor" fill-opacity=".18"/>',
 roots:'<path d="M44 104 28 127 7 131M57 112 50 137 32 133M72 111 87 133 109 139M77 96 98 118 122 124M15 80Q2 32 39 34M108 83Q132 31 85 31"/>',
 constellation:'<path d="M9 14 37 7 74 16 112 8 116 88 103 126 14 132 9 14" opacity=".4"/><path d="M20 32 23 22 26 32 35 35 26 38 23 48 20 38 11 35ZM99 77 103 68 107 77 116 81 107 85 103 94 99 85 90 81Z"/>',
 nightwings:'<path d="M48 69Q2 70 3 15L25 41 20 9Q43 23 51 47M73 71Q123 70 125 14L103 43 108 8Q84 22 73 47" fill="#3c335a"/>',
 smoke:'<path d="M19 126Q-2 102 18 84Q2 68 15 57M99 131Q125 100 110 79Q134 52 109 32M38 119Q11 111 32 97" stroke-dasharray="3 7"/>',
 aether:'<ellipse cx="61" cy="63" rx="51" ry="18" transform="rotate(-30 61 63)"/><ellipse cx="61" cy="63" rx="51" ry="18" transform="rotate(30 61 63)"/><circle cx="62" cy="29" r="22"/>',
 chain:'<path d="M20 83 8 103M98 83 116 103" stroke-dasharray="3 5" stroke-width="5"/><path d="M12 118 23 111M105 114 116 123"/>',
 world:'<circle cx="62" cy="34" r="30" fill="#344d60"/><ellipse cx="62" cy="34" rx="13" ry="30"/><path d="M32 34H92M39 16H85M39 51H85"/>',
 deathwings:'<path d="M47 69Q2 65 7 14L17 46 25 23 32 52 38 40M72 69Q124 62 119 14L108 43 101 24 91 50 83 39" fill="#454751"/>',
 sleepwing:'<path d="M28 64Q-1 36 20 15Q19 42 42 47M94 78Q126 59 122 28Q107 46 79 58" fill="currentColor" fill-opacity=".18"/><path d="M5 126Q61 139 116 121"/>'
};return `<g fill="none" ${stroke} style="color:${tone}" opacity=".7">${shapes[kind]||shapes.sigil}</g>`;}
function mythFace(type,x,y,angle,hair,tone){const feminine=['long','braid','veil','ponytail','split'].includes(type);let pre='',post='';if(feminine)pre=`<path d="M-13-7Q-5-24 12-10Q20 11 15 32L7 25 4 8-11 24-18 29Q-19 7-13-7Z" fill="${hair}"/>`;
if(type==='hood'||type==='void')pre='<path d="M-18 16Q-24-23 0-22Q26-17 20 20L9 15-11 18Z" fill="#202336"/>';
if(['long','braid','split'].includes(type))post=`<path d="M-13-5Q-17-24 1-24Q20-22 14-5L6-14-2-10-9-4Z" fill="${hair}"/>`;
if(['beard','old'].includes(type))post=`<path d="M-12 2Q0 12 12 2L9 17 0 27-10 15Z" fill="${hair}"/><path d="M-13-9Q-20-20-7-22Q4-28 16-13L10-6-1-11-10-4Z" fill="${hair}"/>`;
if(type==='curl')post=`<path d="M-14-4Q-23-15-12-20Q-4-31 5-24Q22-24 16-6L6-14-3-12Z" fill="${hair}"/>`;
if(type==='helmet')post=`<path d="M-15 6V-10Q-12-24 4-23Q21-18 15 5L7-2V12H1V-7L-8-2V10Z" fill="${tone}"/><path d="M-9-20Q5-36 19-26L16-17Q6-26-9-20Z" fill="${hair}"/>`;
if(type==='wingcap')post=`<path d="M-17-7H17L8-16H-9Z" fill="${tone}"/><path d="M-13-9-26-22-24-6-15-2M13-9 26-23 24-6 15-2" fill="#d9e9e5"/>`;
if(type==='short'||type==='ponytail')post=`<path d="M-14-4Q-17-23 0-22Q18-20 15-6L4-12-7-8Z" fill="${hair}"/>`+(type==='ponytail'?`<path d="M-11-13Q-39-16-28 27L-19 17Q-33-2-11-4Z" fill="${hair}"/>`:'');
if(type==='braid')post+=`<path d="M-12 0Q-24 6-15 15Q-27 24-17 34M13 1Q22 8 15 15Q24 24 17 33" fill="none" stroke="${hair}" stroke-width="6"/>`;
if(type==='veil')post+=`<path d="M-18 17-13-17Q0-28 14-16L19 21M-12-17 0-21 13-17" fill="none" stroke="${tone}" stroke-width="3"/>`;
if(type==='radiant')post+=`<path d="M-16-5-24-12-14-15-12-27-3-19 5-30 10-18 23-21 16-10 26-3 15 0" fill="none" stroke="${tone}" stroke-width="3"/>`;
if(type==='split')post+=`<path d="M0-15Q22-18 18 8L9 25 0 17Z" fill="${hair}"/>`;
let face=type==='skull'?`<path d="M-12-9Q0-22 12-9V5L7 8 5 17H-5L-7 8-12 5Z" fill="#cbd0d4"/><path d="M-8-2H-4M4-2H8M-4 11H4" stroke="#26323b" stroke-width="4"/>`:type==='void'?`<ellipse rx="12" ry="15" fill="#202336"/><path d="M-8-1H-3M3-1H8" stroke="${tone}" stroke-width="2"/>`:`<ellipse rx="12" ry="15" fill="${feminine?'#e9c5ad':'#d9b89a'}"/><path d="${type==='closed'?'M-8 0-4 2-1 0M3 0 6 2 9 0':'M-7-1h1M5-1h1'}" stroke="#26323b" stroke-width="2.6" stroke-linecap="round"/>`;
let main=`${pre}${face}${post}`;if(type==='triple')main=`<g transform="translate(-15 7) scale(.68)"><ellipse rx="12" ry="17" fill="${hair}"/><path d="M-6 0H5" stroke="${tone}"/></g><g transform="translate(16 7) scale(.68)"><ellipse rx="12" ry="17" fill="${hair}"/><path d="M-6 0H5" stroke="${tone}"/></g>${face}<path d="M-11-14 0-27 11-14" fill="${hair}"/>`;
return `<g transform="translate(${x} ${y}) rotate(${angle})">${main}</g>`;}
function mythAvatar(c,cls=''){let look=mythLook(c),p=MYTH_POSES[look.pose],tone=ELEMENT_COLORS[c.element],skin='#d2b696';let hand=p.hand;return `<svg class="avatar myth-avatar ${cls}" viewBox="0 0 128 144" aria-hidden="true" data-avatar="${c.id}" data-pose="${look.pose}"><ellipse cx="63" cy="134" rx="44" ry="5" fill="#050b12" opacity=".5"/>${mythBackdrop(look.back,tone)}<g stroke-linecap="round" stroke-linejoin="round"><path d="${p.legs}" fill="none" stroke="${skin}" stroke-width="9"/><path d="${p.body}" fill="${look.robe}" stroke="${tone}" stroke-width="1.8"/><path d="${p.body}" fill="none" stroke="#111c2a" stroke-width="1" opacity=".5"/><path d="${p.arms}" fill="none" stroke="#162433" stroke-width="11"/><path d="${p.arms}" fill="none" stroke="${skin}" stroke-width="7"/>${['hood','earth','queen','invoke','float','reap'].includes(look.pose)?`<path d="M56 63 51 113M68 67 75 112" fill="none" stroke="${tone}" opacity=".6"/>`:`<path d="M46 66 72 70" stroke="${tone}" stroke-width="4"/>`}${mythFace(look.face,...p.head,look.hair,tone)}</g><g style="color:${tone}" transform="translate(${hand[0]} ${hand[1]}) rotate(${hand[2]}) scale(${look.tool==='trident'||look.tool==='scythe'?1.4:1.05})"><use href="#prop-${look.tool}"/></g>${c.id==='O016'?`<g style="color:${tone}" transform="translate(18 24)"><use href="#prop-torch"/></g>`:''}${c.id==='O028'?'':`<circle cx="15" cy="128" r="9" fill="#142032" stroke="${tone}"/><text x="15" y="132" text-anchor="middle" fill="${tone}" font-size="12">${EICON[c.element]}</text>`}</svg>`;}
function avatar(c,cls=''){const art=c.art||CARD[c.id]?.art;if(!art)return c.rarity>=2?mythAvatar(c,cls):commonAvatar(c,cls);const cols=art.cols||5,rows=art.rows||2,x=cols>1?(art.cell%cols)*100/(cols-1):0,y=rows>1?Math.floor(art.cell/cols)*100/(rows-1):0,hue=c.rarity<2?(art.variant%5-2)*5:0,light=c.rarity<2?.96+(art.variant%4)*.025:1;const stars=state.mode==='campaign'&&c.side!==1?(c.ascension??ascensionLevel(c.id)):0;return `<span class="avatar painted-avatar ${c.rarity===4?'legendary-card':''} ${stars?'has-stars':''} rarity-${c.rarity} ${c.storyExclusive?'limited-avatar story-exclusive-avatar':c.limited?'limited-avatar':''} ${cls}" aria-hidden="true" style="--element-color:${ELEMENT_COLORS[c.element]};--atlas:var(--art-${art.sheet});--atlas-x:${x}%;--atlas-y:${y}%;--atlas-size:${cols*100}% ${rows*100}%;--art-hue:${hue}deg;--art-light:${light}"><span class="art-panel">${c.rarity===4&&globalThis.LIVING_CARD_RIGS?.[c.id]?`<span class="living-card-host" data-living-card="${c.id}"></span>`:''}</span>${cardSymbolStrip(c,stars)}</span>`;}

// Terrain art follows the actual terrain bonuses, never card rarity or the selected actor.
function terrainFrameStyle(n){
 const t=TERRAINS[n.terrain]||TERRAINS[0];
 const keys={雷:'thunder',水:'water',火:'fire',冰:'ice',地:'earth',風:'wind',光:'light',冥:'dark'};
 const primary=t.up[0]||'地',secondary=t.up[1]||primary;
 return '--battle-frame:var(--art-frame_'+keys[primary]+');--battle-accent-frame:var(--art-frame_'+keys[secondary]+');--frame-glow:'+ELEMENT_COLORS[primary]+';';
}

function sceneArt(n){return 'var(--realm-'+OLYMPUS_ART.sceneKeys[n.terrain]+')';}
function sceneBanner(n){return `<section class="arena-banner" style="${terrainFrameStyle(n)}--scene-image:${sceneArt(n)}"><div class="arena-banner-copy"><span>REALM OF THE GODS · ${TERRAINS[n.terrain].name}</span><h2>${OLYMPUS_ART.sceneNames[n.terrain]}</h2><p>${OLYMPUS_ART.sceneLines[n.terrain]}</p></div></section>`;}
function showArt(id){const c=CARD[id];if(!c)return;stopNodeStory();const d=document.getElementById('detail');d.classList.add('art-dialog');d.innerHTML=`<h2>${c.name}</h2><p class="meta">${RARITIES[c.rarity]}卡 · ${c.title}</p>${avatar(c,'zoom-avatar')}<p>${c.lore}</p><p class="meta">${c.art.design}</p><button data-action="close">關閉立繪</button>`;if(!d.open)d.showModal();}



/* ===== playback.js ===== */
'use strict';
let playing=false,busy=false,pauseAtRound=false,announcedRound=0,liveFx=[],entryUids=[],fxDuration=650;
let quickSettleUnlockAt=0,quickSettleTimer=null;
let presentationEpoch=0;const pendingPresentation=new Set();
function motionDuration(kind){const base={entry:900,round:1450,cast:1100,impact:650,skill:1600,death:1100};const factor=delay===60?1/3:delay===180?.55:delay===1000?1.25:1;const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;return Math.round((base[kind]||650)*(reduced?Math.min(.55,factor):factor));}
function waitPresentation(ms,epoch){return new Promise(resolve=>{let record={id:null,resolve};record.id=setTimeout(()=>{pendingPresentation.delete(record);resolve(epoch===presentationEpoch);},ms);pendingPresentation.add(record);});}
function cancelPresentation(){stopCatalogVoice();stopGoldCinematic();globalThis.olympusAudio?.stop();presentationEpoch++;for(const p of pendingPresentation){clearTimeout(p.id);p.resolve(false);}pendingPresentation.clear();busy=false;liveFx=[];entryUids=[];announcedRound=0;document.getElementById('stageOverlay').innerHTML='';}
function roundWords(n){const digits=['','一','二','三','四','五','六','七','八','九'];return '第'+(n<10?digits[n]:n<20?'十'+digits[n%10]:digits[Math.floor(n/10)]+'十'+digits[n%10])+'回合';}
async function showStage(kind,title,subtitle,epoch,color='#e2c68b'){
const host=document.getElementById('stageOverlay');const rect=document.querySelector('.battle-board')?.getBoundingClientRect();const vw=window.innerWidth||1200,vh=window.innerHeight||800;const left=rect?Math.max(0,rect.left):0,top=rect?Math.max(0,rect.top):0;const width=rect?Math.max(0,Math.min(vw,rect.right)-left):vw;const height=rect?Math.max(0,Math.min(vh,rect.bottom)-top):vh;
Object.assign(host.style,{left:left+'px',top:top+'px',width:(width||vw)+'px',height:(height||vh)+'px'});
let ms=Math.max(1250,motionDuration(kind));host.innerHTML=`<div class="stage-announcement stage-${kind}" style="--stage-time:${ms}ms;--stage-color:${color}"><div class="stage-shade"></div><div class="stage-copy"><p>${esc(subtitle)}</p><strong>${esc(title)}</strong>${kind==='round'?['nw','ne','sw','se'].map(d=>`<span class="round-echo echo-${d}" aria-hidden="true">${esc(title)}</span>`).join(''):''}</div></div>`;
const copy=host.querySelector('.stage-copy');void scrollBannerMotion(copy,false);if(!await waitPresentation(ms-350,epoch))return false;copy?.classList.add('scroll-banner-out');const valid=await waitPresentation(350,epoch);if(valid)host.innerHTML='';return valid;}
function canOpenBattleReplay(){return !busy&&(!battle||battle.done)&&!!battleRecording?.frames?.at(-1)?.done;}
function updatePlaybackControls(){document.querySelectorAll('[data-action="battleReplay"]').forEach(b=>b.disabled=!canOpenBattleReplay());let btn=document.querySelector('[data-action="play"]');if(btn){btn.textContent=playing?'暫停':busy?'演出後繼續':'自動戰鬥';btn.setAttribute('aria-pressed',String(playing));}let stepBtn=document.querySelector('[data-action="step"]');if(stepBtn)stepBtn.disabled=playing||busy||!!battle?.done;const leaveBtn=document.querySelector('[data-action="leave"]');if(leaveBtn){leaveBtn.disabled=playing||busy;leaveBtn.textContent=playing?(mobilePortraitLayout()?'撤退':'自動戰鬥時無法撤退'):battle?.done?'返回營地':'撤退';}refreshQuickSettleControl();}
function refreshQuickSettleControl(){const button=document.querySelector('[data-action="quickSettle"]');if(!button)return;const remaining=battleOpening?0:Math.max(0,Math.ceil((quickSettleUnlockAt-Date.now())/1000));button.disabled=!battle||battle.done||remaining>0;button.textContent=remaining?'快速結算 · '+remaining+'秒':'快速結算';button.title=remaining?'戰鬥開始 30 秒後開放':'立即結算剩餘戰鬥';if(remaining===0&&!battleOpening&&quickSettleTimer){clearInterval(quickSettleTimer);quickSettleTimer=null;}}
function scheduleNextAction(){if(fastBattleRequested&&!busy){void finishFastBattle();return;}if(!playing||busy||!battle||battle.done||timer!==null)return;timer=setTimeout(()=>{timer=null;void presentNextAction();},delay===60?Math.round(220/3):delay===180?100:delay===1000?450:220);}
let battleOpening=false;
async function startEntrance(){battleOpening=true;try{warmGoldVoices();const epoch=presentationEpoch;busy=true;entryUids=battle.units.filter(u=>u.active).map(u=>u.uid);fxDuration=motionDuration('entry');render();const valid=await showStage('entry','雙方列陣','戰鼓將起 · 諸神與凡人',epoch);if(!valid)return;entryUids=[];if(!await battleStartCountdown(epoch))return;busy=false;if(autoBattlePreference()){pauseAtRound=false;playing=true;globalThis.mobileManualBattle=false;}render();scheduleNextAction();}finally{battleOpening=false;refreshQuickSettleControl();}}
async function presentNextAction(){if(busy||!battle||battle.done)return false;const epoch=presentationEpoch;busy=true;updatePlaybackControls();
try{
const projected=JSON.parse(JSON.stringify({...battle,events:[],impactUnits:null}));projected.autoPriority=playing;nextAction(projected);const events=projected.events||[];const round=events.find(e=>e.kind==='round');
if(round&&announcedRound!==round.round){announcedRound=round.round;if(!await showStage('round',roundWords(round.round),'回合開始',epoch))return false;
if(pauseAtRound&&playing){pause();busy=false;render();toast('回合開始前已暫停，可調整奧義策略後繼續。');return false;}}
const cast=events.find(e=>e.kind==='cast');if(cast){const actor=projected.units.find(u=>u.uid===cast.actor);if(!await showSkillInvocation(actor,cast,epoch))return false;}
if(epoch!==presentationEpoch)return false;
if(projected.last){const actor=battle.units.find(u=>u.uid===projected.last.actor);if(!await animateTargetEffects(actor,events,epoch))return false;}
const deathState=projected.impactUnits||projected.units;const fallen=battle.units.filter(u=>u.hp>0&&deathState.some(v=>v.uid===u.uid&&v.hp<=0));
CombatAudio.reactions(events,battle.units,projected.impactUnits||projected.units);liveFx=events.filter(e=>!['round','cast','entry'].includes(e.kind));fxDuration=goldImpactDuration||motionDuration('impact');
battle={...projected,units:projected.impactUnits||projected.units,done:false,winner:null};render();
if(!await waitPresentation(goldImpactDuration||(liveFx.length?fxDuration:100),epoch))return false;stopGoldCinematic();document.getElementById('stageOverlay').innerHTML='';
if(!await animateDeathBurn(fallen,epoch))return false;
battle=projected;battle.impactUnits=null;recordBattleFrame(battle);liveFx=[];entryUids=events.filter(e=>e.kind==='entry').map(e=>e.target);
if(entryUids.length){fxDuration=motionDuration('entry');render();if(!await waitPresentation(fxDuration,epoch))return false;}
entryUids=[];settle();return true;
}finally{if(epoch===presentationEpoch){busy=false;render();scheduleNextAction();}}}
function unitFxClass(u){const kinds=new Set(liveFx.filter(e=>e.target===u.uid).map(e=>e.kind));return [...kinds].map(k=>'fx-'+k).join(' ')+(entryUids.includes(u.uid)?' unit-entry':'');}
function effectHtml(uid){const effects=liveFx.filter(e=>e.target===uid);if(!effects.length&&!entryUids.includes(uid))return '';let labels=[];
const damage=effects.filter(e=>e.kind==='damage'||e.kind==='recoil').reduce((a,e)=>a+(e.amount||0),0),heal=effects.filter(e=>e.kind==='heal').reduce((a,e)=>a+(e.amount||0),0),shield=effects.filter(e=>e.kind==='shield').reduce((a,e)=>a+(e.amount||0),0),blocked=effects.reduce((a,e)=>a+(e.absorbed||0),0);
for(const e of effects.filter(e=>e.kind==='revive'))labels.push(['heal','不滅命火 · 復活 +'+e.amount]);if(damage)labels.push([effects.some(e=>e.critical)?'critical':'damage',(effects.some(e=>e.critical)?'暴擊！ ':'')+'−'+damage]);if(!damage&&effects.some(e=>e.critical))labels.push(['critical','暴擊！']);if(heal)labels.push(['heal','+'+heal]);if(shield)labels.push(['shield','護盾 +'+shield]);if(blocked)labels.push(['shield','格擋 '+blocked]);
for(const e of effects.filter(e=>['buff','debuff','cleanse','notice'].includes(e.kind)))labels.push([e.kind,e.kind==='cleanse'?'淨化':e.kind==='notice'?e.label:STATUS[e.status]]);
if(entryUids.includes(uid))labels.push(['entry',battle?.units.find(u=>u.uid===uid)?.origin>=6?'替補進場':'登場']);labels=labels.slice(0,5);
const damageEvent=effects.find(e=>e.kind==='damage');const mark=damageEvent?EICON[damageEvent.element]||'✦':effects.some(e=>e.kind==='heal')?'✚':effects.some(e=>e.kind==='shield')?'◈':effects.some(e=>e.kind==='debuff')?'⊘':'✧';
return `<span class="unit-fx" aria-hidden="true"><span class="fx-ring"></span><span class="fx-spark">${mark}</span><span class="fx-floats">${labels.map(([kind,label],i)=>`<span class="fx-label label-${kind}" style="--label-i:${i}">${esc(label)}</span>`).join('')}</span></span>`;}


/* ===== app.js ===== */
'use strict';
const KEY='olympus-uprising-v1';
const initial=['H001','U001','U003','U002','U004','U005','U006','U007','U008'];
const trial=['O004','O028','O002','O001','O027','O006','O005','O003','O030'];
let state={version:1,mode:'campaign',node:0,cleared:0,lineups:{campaign:[...initial],trial:[...trial]},presets:{campaign:[],trial:[]},policies:{},recruitment:newRecruitment()};
let storageWarning='';
function repairDuplicateCards(s){
 if(!s||typeof s!=='object')return;
 if(Array.isArray(s.recruitment?.owned))s.recruitment.owned=[...new Set(s.recruitment.owned)];
 const uniqueSlots=arr=>{if(!Array.isArray(arr))return;const seen=new Set();for(let i=0;i<arr.length;i++){const id=arr[i];if(typeof id!=='string')continue;if(seen.has(id))arr[i]=null;else seen.add(id);}};
 for(const mode of ['campaign','trial']){uniqueSlots(s.lineups?.[mode]);if(Array.isArray(s.presets?.[mode]))s.presets[mode].forEach(uniqueSlots);}
}
function validSave(s){repairDuplicateCards(s);if(s?.recruitment!==undefined&&!validRecruitment(s.recruitment))return false;if(s?.divinity!==undefined&&!validDivinity(s.divinity))return false;if(s?.camp&&!validCampSave(s.camp))return false;if(!s||s.version!==1||!['campaign','trial'].includes(s.mode)||!Number.isInteger(s.cleared)||s.cleared<0||s.cleared>30||!Number.isInteger(s.node)||s.node<0||s.node>29)return false;for(let m of ['campaign','trial']){let arr=s.lineups?.[m];if(!Array.isArray(arr)||arr.length!==9||!arr.every(id=>id===null||typeof id==='string'&&Object.hasOwn(CARD,id))||new Set(arr.filter(Boolean)).size!==arr.filter(Boolean).length)return false;if(!Array.isArray(s.presets?.[m])||s.presets[m].length>3)return false;for(let p of s.presets[m])if(!Array.isArray(p)||p.length!==9||!p.every(id=>id===null||typeof id==='string'&&Object.hasOwn(CARD,id))||new Set(p.filter(Boolean)).size!==p.filter(Boolean).length)return false;}if(!s.policies||typeof s.policies!=='object'||Array.isArray(s.policies)||Object.entries(s.policies).some(([id,v])=>!Object.hasOwn(CARD,id)||typeof v!=='boolean'))return false;let own=owned(s);if(s.lineups.campaign.some(id=>id&&!own.has(id))||s.presets.campaign.some(p=>p.some(id=>id&&!own.has(id))))return false;return true;}
try{let s=JSON.parse(localStorage.getItem(KEY));if(validSave(s))state=s;}catch{storageWarning='瀏覽器無法讀取本機存檔，可使用匯出備份。';}
ensureRecruitment(state);ensureDivinity(state);
if(state.mode==='campaign')state.node=Math.min(state.cleared,29);
let battleSelected=null;
let view='formation',selected=state.lineups[state.mode][0],slotIndex=0,filter={q:'',rarity:'all',element:'all',role:'all',stars:'all',owned:true},page=0,battle=null,timer=null,delay=650,settled=false,returnView='formation';
const app=document.getElementById('app');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function owned(s=state){const set=s.recruitment?new Set(s.recruitment.owned):legacyOwned(s);set.add(HERO_ID);return set;}
function available(id){return state.mode==='trial'||owned().has(id);}
function lineup(){return state.lineups[state.mode];}
function persist(notify=false){ensureRecruitment();ensureDivinity();campProgress();try{localStorage.setItem(KEY,JSON.stringify(state));if(notify)toast('陣型與進度已儲存於目前瀏覽器');}catch{toast('無法儲存至瀏覽器，請匯出存檔備份。');}}
let toastTimer,toastSerial=0;function toast(s){const el=document.getElementById('toast'),serial=++toastSerial;el.textContent=s;el.classList.add('show');void scrollBannerMotion(el,false);clearTimeout(toastTimer);toastTimer=setTimeout(async()=>{await scrollBannerMotion(el,true);if(serial===toastSerial){el.classList.remove('show','scroll-banner-out','scroll-banner-in');}},3000);}
function qi(n,max){return `<span class="qi" aria-label="${n}/${max} 氣">${Array.from({length:max},(_,i)=>`<i class="${i<n?'on':''}"></i>`).join('')}</span>`;}
const pct=n=>Math.round(n*100)+'%';
function effectsText(s){const map={heal:e=>'恢復施術者攻擊力 '+pct(e.value)+' 的生命',shield:e=>'獲得施術者攻擊力 '+pct(e.value)+' 的護盾',guard:e=>'受到傷害降低 '+pct(e.value),weak:e=>'造成傷害降低 '+pct(e.value),boost:e=>'造成傷害增加 '+pct(e.value),vuln:e=>'受到傷害增加 '+pct(e.value),haste:e=>'速度增加 '+pct(e.value),silence:()=> '沉默（不能施放奧義，仍可普攻蓄氣）',stun:()=> '昏迷（跳過下一次行動）',burn:e=>'每次行動前承受施術者攻擊力 '+pct(e.value)+' 的灼傷',regen:e=>'每次行動前恢復最大生命 '+pct(e.value),taunt:()=> '嘲諷（優先吸引一般單體攻擊）',cleanse:()=> '清除虛弱、易傷、沉默、昏迷、灼傷'};return s.map(e=>(map[e.type]?.(e)||e.type)+(e.duration&&e.type!=='stun'?'，至第 '+e.duration+' 個後續回合結束':'')).join('；');}
function skillText(s){if(!s)return '只會普通攻擊，沒有奧義或被動技能。';let targets={single:'依同路前排優先的單體敵人',allEnemy:'所有在場敵人',column:'目標一路的在場敵人',lowEnemy:'生命比例最低的敵人',allAlly:'所有在場友軍',lowAlly:'生命比例最低的友軍',self:'自身'};return `消耗 ${s.cost} 氣，作用於${targets[s.target]}。`+(s.power?`造成 ${pct(s.power)} 攻擊力的${'屬性傷害'}。`:'')+(s.effects.length?effectsText(s.effects)+'。':'')+(s.self?.length?'自身：'+effectsText(s.self)+'。':'')+(s.teamheal?'另恢復全體在場友軍 '+pct(s.teamheal)+' 攻擊力的生命。':'')+(s.drain?'恢復實際生命傷害 '+pct(s.drain)+' 的生命。':'')+(s.recoil?'代價：損失自身最大生命 '+pct(s.recoil)+'，此反噬不致死。':'');}
function detail(c,live=null){if(!c)return '<p class="muted">選擇角色圖示以查看能力。</p>';let controllable=live?live.side===0&&live.hp>0&&!!live.skill:!!c.skill;return `<div class="detail-inner r${c.rarity}"><div class="identity-section"><div class="section-kicker">角色檔案</div><h2 class="detail-name profile-name">${c.name}</h2><div class="detail-emblem">${c.skill?qi(live?live.qi:0,c.skill.cost):''}<button class="portrait-zoom" data-action="artZoom" data-id="${c.id}" aria-label="放大 ${c.name} 立繪">${avatar(c,'portrait')}</button></div><div class="row"><span class="badge">${RARITIES[c.rarity]}卡</span>${c.storyExclusive?'<span class="limited-label">劇情限定 · 唯一 · 不可抽取</span>':c.limited?'<span class="limited-label">限定守護者</span>':''}<span class="badge element-badge" style="--element-color:${ELEMENT_COLORS[c.element]}">${EICON[c.element]} ${c.element}屬性</span><span class="badge">${c.role}</span><span class="badge species-badge">種族 · ${esc(c.species||'神族')}</span>${live?`<span class="badge">${live.side?'敵方':'我方'} · ${live.hp<=0?'陣亡':live.active?(live.slot+1)+' 號位':'候補'}</span>`:''}</div><p class="meta">${c.title} · ${c.id}</p><div class="section-kicker stats-heading">能力數值</div>${detailedStats(c,live)}${live?`<p class="meta">最大生命 ${live.max} · 護盾 ${live.shield}${live.skill?' · 氣 '+live.qi+'/'+live.skill.cost:''}</p><p class="status-detail">${live.status.length?live.status.map(x=>STATUS[x.type]).join(' · '):'目前無狀態效果'}</p>`:''}</div>${heroProgressPanel(c)}${!live?'<button class="profile-preview-trigger" data-action="openCardPreview" data-id="'+c.id+'">✦ 角色預覽</button>':''}<div class="skill-box ability-section"><div class="section-kicker">${c.skill?"奧義技能":"普通攻擊"}</div><h3>${c.skill?c.skill.name:c.humanRebel?'凡人武藝':'靈獸本能'}</h3><p>${skillText(c.skill)}</p>${controllable?`<button class="small ${live?live.auto?'active':'':state.policies[c.id]===false?'':'active'}" data-action="${live?'battlePolicy':'policy'}" data-id="${live?live.uid:c.id}" ${live&&busy?'disabled':''} style="margin-top:12px">${(live?!live.auto:state.policies[c.id]===false)?'保留氣：繼續普攻':'滿氣時：自動奧義'}</button>`:''}</div><div class="skill-box lore-section"><div class="section-kicker">特性與背景</div>${innateDivinityHtml(c,live)}<h3>${c.passive?(c.id.startsWith('O')?'天生神性 · ':'特性 · ')+c.passive.name:'人物札記'}</h3><p>${c.passive?c.passive.desc:c.lore}</p>${c.passive?`<p class="meta">${c.lore}</p>`:''}${!live&&!available(c.id)?'<p class="gold">尚未擁有；請查看下方入池條件，開池後可至召喚祭壇抽取。自由試陣可立即使用。</p>':''}</div>${!live?catalogNotes(c):''}</div>`;}

function head(){return `<header class="top"><div class="brand"><div class="brandmark erion-rune" aria-hidden="true"></div><div><small>ERION · MYTHIC CHRONICLES</small><h1>逆命者：厄里昂</h1></div></div><div class="top-right"><span class="meta">版本 0.20 · 逐幕敘事</span><div class="pills"><button data-action="mode" data-id="campaign" class="${state.mode==='campaign'?'active':''}" ${battle?'disabled':''}>故事戰役</button><button data-action="mode" data-id="trial" class="${state.mode==='trial'?'active':''}" ${battle?'disabled':''}>自由試陣</button></div></div></header>`;}
function mainNavigation(){return `<nav class="nav" aria-label="主要功能">${[['formation','布陣營地'],['enhancement','英雄強化'],['recruitment','召喚祭壇'],['campaign','當前征途'],['divineCamp','起義營地'],['catalog','卡牌圖鑑'],['rules','戰鬥法則']].map(([id,n])=>`<button data-action="nav" data-id="${id}" class="${view===id?'active':''}" ${battle?'disabled':''}>${n}</button>`).join('')}<button class="ghost" data-action="export">匯出存檔</button><button class="ghost" data-action="import" ${battle?'disabled':''}>匯入存檔</button><button data-action="quickSettings">⚙ 設定</button><button data-journey="home" ${battle?'disabled':''}>主選單</button><button data-journey="achievements" ${battle?'disabled':''}>成就</button><button data-action="battleReplay" ${!canOpenBattleReplay()?'disabled':''}>戰鬥回放</button></nav>`;}
function elementLabel(e){return '<span class="element-label" style="--element-color:'+ELEMENT_COLORS[e]+'">'+EICON[e]+' '+esc(e)+'</span>';}
function sceneAtmosphere(terrain=2){return '<div class="scene-atmosphere atmosphere-'+terrain+'" aria-hidden="true"><i class="mist-layer"></i><i class="mist-layer far"></i><i class="weather-layer"></i></div>';}
function terrainEffects(t){return '<div class="scene-effect-rows">'+[['up','增幅','+15%'],['down','抑制','−15%']].map(([key,label,value])=>'<div class="scene-effect-row effect-'+key+'"><span class="scene-effect-kind">'+label+'</span><div class="scene-effect-elements">'+t[key].map(elementLabel).join('')+'</div><b class="scene-effect-value">傷害 '+value+'</b></div>').join('')+'</div>';}
function terrainBox(t){return '<section class="terrain scene-effect-panel"><header class="scene-effect-heading"><small>場景效果 · 雙方適用</small><strong>'+esc(t.name)+' · '+esc(t.title)+'</strong></header>'+terrainEffects(t)+'<p class="scene-effect-note">其餘屬性不變 · 治療與護盾不受影響</p></section>';}
function nodeLeader(n){return CARD[n.leaderId||n.enemy[0]];}
function stopNodeStory(){globalThis.stopStoryReading?.();if(typeof currentSceneAudio!=="undefined"&&currentSceneAudio)currentSceneAudio.pause();}
function mission(){let n=nodes[state.node],t=TERRAINS[n.terrain],leader=nodeLeader(n);return `<aside class="panel mission-panel"><div class="mission-art" style="--scene-image:${sceneArt(n)}" role="img" aria-label="${OLYMPUS_ART.sceneNames[n.terrain]}">${sceneAtmosphere(n.terrain)}</div><div class="mission-body"><div class="eyebrow">第 ${n.chapter+1} 章 ／ 第 ${String(n.id+1).padStart(2,'0')} 關</div><h2>${n.name}</h2><p class="story">${n.story}</p><button class="small" data-action="reviewStory">閱讀完整篇章</button><p class="meta">本關守將：${leader.name} · ${leader.title}</p><hr class="divider">${terrainBox(t)}<p class="hint">${n.hint}</p><hr class="divider"><div class="enemy-summary"><h3>敵方守軍配置</h3><p class="meta">查看九宮格陣容與角色能力</p><button data-action="enemy">查看能力</button></div></div></aside>`;}
function formationBoard(){return `<section class="panel board-panel"><div class="board-head row space"><div><h3>出征陣型</h3><p class="meta">拖曳卡牌放入；拖曳已上陣角色可交換位置（觸控請長按）</p></div><span class="count">${lineup().filter(Boolean).length} / 9</span></div><div class="battle-line">敵 軍 方 向</div><div class="formation-grid">${[0,1,2].map(row=>`<div class="rank-label">${['Ⅰ　前排 · 1 / 2 / 3','Ⅱ　後排 · 4 / 5 / 6','Ⅲ　替補 · 7 補 1 或 4 · 8 補 2 或 5 · 9 補 3 或 6'][row]}</div>${[0,1,2].map(col=>{let i=row*3+col,c=CARD[lineup()[i]];return `<button data-action="slot" data-id="${i}" draggable="${!!c}" aria-label="${i+1} 號位：${c?c.name:'空位'}" title="${c?c.name:'空位'}" class="slot icon-slot ${c?'r'+c.rarity:'empty'} ${row===2?'reserve':''} ${slotIndex===i?'selected':''}"><span class="number">${i+1}</span>${c?`<span class="unit-qi">${c.skill?qi(0,c.skill.cost):'<span class="no-qi" aria-label="無奧義">—</span>'}</span>${avatar(c)}`:'＋'}</button>`;}).join('')}`).join('')}</div><div class="board-actions"><button class="primary auto-deploy" data-action="autoFormation" title="依本關克制、場地、定位、進階與羈絆推薦；不保證必勝">一鍵上陣</button><button class="small" data-action="openPlacement" data-id="${selected}" ${!available(selected)?'disabled':''}>部署所選角色</button><button class="small" data-action="remove">撤下 ${slotIndex+1} 號位</button><div class="row"><select id="preset" aria-label="陣型存檔位置"><option value="0">陣型一</option><option value="1">陣型二</option><option value="2">陣型三</option></select><button class="small" data-action="loadPreset">讀取</button><button class="small" data-action="savePreset">儲存陣型</button></div></div></section>`;}

let mobilePeekCard=null;
function mobilePortraitLayout(){return matchMedia('(max-width: 900px)').matches;}
function roster(){let list=cards.filter(c=>(!filter.species||filter.species==='all'||(filter.species==='human'?c.species==='人族':c.species!=='人族'))&&(!filter.pool||filter.pool==='all'||(filter.pool==='limited'?(c.limited||c.storyExclusive):(!c.limited&&!c.storyExclusive)))&&(filter.rarity==='all'||c.rarity===+filter.rarity)&&(filter.element==='all'||c.element===filter.element)&&(filter.role==='all'||c.role===filter.role)&&(filter.stars==='all'||(state.mode==='campaign'?ascensionLevel(c.id):0)===+filter.stars)&&(!filter.owned||available(c.id))&&(!filter.q||[c.name,c.title,c.id,c.skill?.name].some(s=>s?.toLowerCase().includes(filter.q.toLowerCase()))));if(view==='formation')list.sort((a,b)=>Number(lineup().includes(a.id))-Number(lineup().includes(b.id))||b.rarity-a.rarity||a.id.localeCompare(b.id));else if(view==='enhancement')list.sort((a,b)=>(state.mode==='campaign'?ascensionLevel(b.id)-ascensionLevel(a.id):0)||b.rarity-a.rarity||a.id.localeCompare(b.id));let size=view==='formation'?12:24,total=Math.max(1,Math.ceil(list.length/size));page=Math.min(page,total-1);return `<section class="below-roster"><div class="row space"><div><h2>${view==='formation'?'選擇你的同行者':'諸神與凡人'}</h2><p class="meta">${RARITIES.map((r,i)=>'<span class="rarity-label r'+i+'">'+cards.filter(c=>c.rarity===i).length+' '+r+'</span>').join(' · ')}${view==='formation'?'　｜　拖曳卡牌至陣位，或使用陣型下方的「部署所選角色」':''}</p></div><span class="count">${list.length} 張符合條件</span></div><div class="toolbar"><input id="search" aria-label="搜尋卡牌" placeholder="搜尋角色、神技或編號…" value="${esc(filter.q)}">${filterMenu('species','種族',[['all','所有種族'],['human','人族'],['other','其他種族']])}${filterMenu('pool','卡池',[['all','全部卡池'],['normal','普通角色'],['limited','限定角色']])}${filterMenu('rarity','稀有度',[['all','所有稀有度'],...RARITIES.map((r,i)=>[String(i),r+'卡'])])}${filterMenu('element','屬性',[['all','所有屬性'],...ELEMENTS.map(e=>[e,e+'屬性'])])}${filterMenu('role','角色定位',[['all','所有定位'],...ROLES.map(r=>[r,r])])}${filterMenu('stars','星數',[['all','所有星數'],...Array.from({length:6},(_,i)=>[String(i),i?i+' 星':'0 星・未進階'])])}<label class="meta"><input type="checkbox" id="ownedOnly" ${filter.owned?'checked':''}> 已擁有</label></div><div class="catalog">${list.slice(page*size,(page+1)*size).map(c=>`<button data-action="card" data-id="${c.id}" draggable="${view==='formation'&&available(c.id)}" class="card r${c.rarity} ${c.id===mobilePeekCard?'mobile-peek':''} ${c.id===selected?'selected':''} ${available(c.id)?'':'locked'}">${avatar(c,'roster-avatar')}<span class="badge">${RARITIES[c.rarity]} · ${elementLabel(c.element)}${state.mode==='campaign'&&ascensionLevel(c.id)?' · '+ascensionLevel(c.id)+'階':''}</span>${c.storyExclusive?'<span class="limited-label">劇情限定 · 唯一 · 不可抽取</span>':c.limited?'<span class="limited-label">限定守護者</span>':''}${c.originLabel?`<span class="origin-label">${c.rarity===0?"地區":"駐地"} · ${esc(c.originLabel)}</span>`:""}<h3>${c.name}</h3><p>${c.title}</p><small class="card-identity">卡號 ${c.id} · ${RARITIES[c.rarity]}卡</small><p>${c.role}　${c.skill?qi(c.skill.cost,c.skill.cost):'普通攻擊'}</p><small class="deployment-label ${lineup().includes(c.id)?'is-deployed':''}">${lineup().includes(c.id)?'◆ 已上陣':available(c.id)?'可上陣':c.poolUnlock<=state.cleared?'已入池 · 待召喚':'尚未入池'}</small></button>`).join('')||'<p class="empty-state">沒有符合條件的卡牌，試著調整篩選。</p>'}</div><div class="catalog-foot"><button class="small" data-action="prev" ${page===0?'disabled':''}>上一頁</button><span class="meta">${page+1} / ${total}</span><button class="small" data-action="next" ${page===total-1?'disabled':''}>下一頁</button></div></section>`;}
function formation(){return `<div class="phase-head"><div><h2>讓萬族決定自己的命運</h2><p class="meta">${state.mode==='trial'?'自由試陣 · 全卡開放，關卡依序推進，不影響戰役進度':'已通關 '+state.cleared+' / 30 · 起義加成 '+pct(state.cleared*.02)+'（生命／攻擊／防禦）'}</p></div><div class="row"><button data-action="save">存檔</button><button data-action="openRevisit" ${state.mode!=='campaign'?'disabled':''}>重返征途</button><button class="primary" data-action="start">出征 · ${nodes[state.node].name}</button></div></div><div class="setup-layout">${mission()}<div class="formation-workspace">${formationBoard()}${roster()}</div><aside class="panel panel-pad selected-detail">${detail(CARD[selected])}</aside></div>`;}
function campaign(){let n=nodes[state.node],complete=state.mode==='campaign'&&state.cleared===30,leader=nodeLeader(n);return `<div class="phase-head"><div><div class="eyebrow">THE ROAD TO OLYMPUS</div><h2>${complete?'凡人的黎明':'當前征途'}</h2><p class="meta">${complete?'三十道防線已突破，可再戰最終關。':'攻克眼前的防線後，下一關會在這裡出現。'}</p></div><span class="count">${state.mode==='campaign'?state.cleared+' / 30 已通關':'自由試陣 · 第 '+(n.id+1)+' 關'}</span></div><article class="panel current-node"><div class="current-node-art" style="--scene-image:${sceneArt(n)}" role="img" aria-label="${OLYMPUS_ART.sceneNames[n.terrain]}">${sceneAtmosphere(n.terrain)}</div><div class="panel-pad campaign-brief"><header class="campaign-brief-title"><div class="eyebrow">CHAPTER ${n.chapter+1} · ${chapterNames[n.chapter]}</div><h2>${String(n.id+1).padStart(2,'0')} · ${n.name}</h2></header><section class="campaign-story-block"><p class="story">${n.story}</p><button class="small" data-action="reviewStory">閱讀完整篇章</button></section><section class="campaign-intel"><h3>戰場情報</h3><p class="commander-line"><span>本關守將</span><strong>${leader.name}</strong><small>${leader.title}</small></p>${terrainBox(TERRAINS[n.terrain])}<p class="hint">${n.hint}</p></section><footer class="campaign-departure"><p class="meta">首勝解鎖新角色獎池 · 需透過召喚取得</p><button class="primary" data-action="start">${complete?'再次出征':'出征'}</button></footer></div></article>`;}

function rules(){return `<div class="phase-head"><div><div class="eyebrow">CODEX OF WAR</div><h2>戰鬥法則與初版設定</h2></div><button data-action="downloadData">匯出 608 張卡牌資料</button></div><div class="rule-layout">${battleGuide()}<article class="panel panel-pad"><h3>九宮格與行動順序</h3><p>每方三路，每路前排、後排、替補各一格。角色定位不限制擺位。同一卡只能上陣一次，可留空，但至少要有一名先發。</p><p>每輪雙方交替行動，我方先手。自動模式下，我方每次從尚未行動的角色中，優先選擇對原有攻擊目標克制倍率較高者（多目標取平均；同倍率按陣位排序；純輔助技視為中性；昏迷者後置）。敵方維持 1～6 號陣位順序；手動可選我方當輪尚未行動的角色。每卡每回合最多一次，滿氣可選普攻保留氣或施放奧義。一般單體攻擊優先打同路前排，再打同路後排；該路清空則轉向其他前排。嘲諷優先於一般選敵，最低生命狙擊與全體技不受嘲諷影響；一路技能會先依嘲諷選定目標所在路線。</p><p><strong>1／4／7、2／5／8、3／6／9 為三組獨立替補路線。</strong>同路前排或後排任一角色陣亡，該路替補立即進入陣亡者的原位，下輪開始行動。例：4 號先倒下，7 號就補到 4 號；不會移到 1 號。替補僅進場一次。若同一招使前後排同時陣亡，優先補前排。替補所在路線至少需配置一名先發；空格不視為陣亡。替補未上場時不會受到攻擊、治療、氣或光環效果；開場的最大生命特性會涵蓋替補。</p></article><article class="panel panel-pad"><h3>氣與技能節奏</h3><p>初始 0 氣，每次完成普通攻擊 +1 氣；受擊不加氣。1～3 氣為各角色固定上限。滿氣後於下一次輪到自己時施放奧義，取代普攻並清空氣，奧義本身不回氣。</p><p>例如 3 氣角色：普攻 → 普攻 → 普攻 → 奧義。可在卡片或戰場切換「保留氣」，滿氣時繼續普攻，待解除保留後在下一次行動施放。白卡只有普攻，沒有氣條與任何技能。</p><p>進場與每個回合開始時會先播放提示；奧義名稱顯示後才結算傷害並播放目標特效。勾選「每回合開始前暫停」可在新回合操作前停下；一般暫停會等目前演出完成。回合開始鎖定可行動角色；替補下一輪加入。此版本速度與迅捷暫不影響出手順序。50 回合仍未分勝負判為平手，不發放首勝獎勵。</p></article><article class="panel panel-pad"><h3>屬性克制 · 八相循環</h3><p class="gold">${[...ELEMENTS,'雷'].map(elementLabel).join(' → ')}</p><p>箭頭方向增傷 30%，反方向減傷 30%，其他組合（含同屬性）不變。普攻與奧義使用卡牌屬性。這是遊戲平衡設定，不是神話的固定分類。</p><p>最終傷害＝攻擊 × 技能倍率 × 克制倍率 × 場地倍率 × 增減益 × 100 ÷（100＋防禦）。依序扣護盾與生命。灼傷以技能寫明的固定攻擊比例扣生命，不再套用克制、防禦或護盾。</p><p>例如雷攻水、在天空作戰：1.30 × 1.15＝1.495，為基礎傷害的 149.5%（未計防禦與其他效果）。</p></article><article class="panel panel-pad"><h3>場地同時影響雙方</h3><table><thead><tr><th>場地</th><th>傷害 +15%</th><th>傷害 −15%</th></tr></thead><tbody>${TERRAINS.map(t=>`<tr><td>${t.name}</td><td>${t.up.map(elementLabel).join('、')}</td><td>${t.down.map(elementLabel).join('、')}</td></tr>`).join('')}</tbody></table><p class="meta">不直接影響治療、護盾或反噬；場地整場固定，戰前可查看。</p></article><article class="panel panel-pad"><h3>效果與風險</h3><p>增益坦利用護盾、減傷維持防線；減益坦用虛弱、沉默、嘲諷壓制敵人。所有角色普攻規則相同，輔助也需先攻擊累積氣。</p><p>同名狀態不相加，新效果覆蓋舊效果並刷新期限；不同狀態乘算。護盾可以累積，但最多為目標最大生命。狀態於當下生效，持續到標示的後續回合結束。昏迷消耗於一次跳過行動。一般治療不復活陣亡角色；厄里昂的天生神性「不滅命火」每場首次死亡時，以最大生命 20% 原位復活，先於替補與勝負判定。</p><p>反噬至少保留 1 點生命；代價不會被護盾吸收。淨化清除虛弱、易傷、沉默、昏迷與灼傷；不清除嘲諷。開場生命光環只取最大值、套用一次；在場減傷光環也只取最大值。</p></article><article class="panel panel-pad"><h3>成長、內容與保存</h3><p>人族另有 27 張卡：白卡平民起義者、綠卡民兵骨幹、藍卡戰地幹部各 9 張。白卡初始開池，綠卡於第 1–3 關、藍卡於第 6–8 關分批開池；人族沒有紫卡或橙卡。主角為獨立劇情特例，一般人族不會跨卡色轉階。</p><p>每關八名一般守軍與一名高一階限定守護者；第 1–4 關白兵／綠守護者、第 5–12 關綠兵／藍守護者、第 13–19 關藍兵／紫守護者、第 20–30 關紫兵／橙守護者。神話人物仍屬劇情主角，由專屬守護者承接戰鬥試煉。限定卡通關後永久開池，僅限定召喚可得；普通池與限定池規則分開。</p><p>戰役初始可用主角與九張白卡人族。通關解鎖獎池，抽到後才可使用；綠卡第 1 關、藍卡第 6 關、紫卡第 12 關、橙卡第 24 關起逐批入池。每關首勝仍提供原有 2% 起義加成。取得的是神話小獸、異族民兵、中階管理者、族群首領或神力投影；主線為凡人召集萬族、共同反抗神庭的虛構征途。</p><p>白卡為 20 個地區 × 10 種神話小獸；100 綠卡為 10 個族群 × 10 種民兵編制；150 藍卡為 10 個族群 × 5 種中階管理職業 × 3 個駐地。70 紫卡為獨立造型的族群首領，承接神話權能意象；30 橙卡為眾神、泰坦與原初神的投影，各有專屬立繪、奧義與特性。普通卡 577 張（含 27 張人族）、主角 1 張及限定守護者 30 張均可實際上陣，尚未進行長期數值平衡。</p><p>本作是獨立原型，沒有複用《戰國布武》的程式、美術或文字。六種場地各有壯闊神域背景。白、綠、藍卡依物種與職業繪製不同武器和姿勢；同職業的地區變體共用立繪。70 位紫卡首領與 30 位橙卡神祇各有造型。神話人名與意象經遊戲化改編，非神話考證資料。</p><p>存檔保存在目前瀏覽器，無跨裝置同步。請使用匯出／匯入備份。自由試陣不會增加戰役進度。</p></article></div>`;}
function render(){syncHeroProgress();paintBattleApp(iconDefs()+head()+`<main class="shell ${battle?'battle-shell':''}">${mainNavigation()}${!battle?'<section class="world-masthead">'+sceneAtmosphere(2)+'<div class="world-copy"><span class="eyebrow">THE AGE OF OLYMPUS</span><h2>穿越神域，改寫命運</h2><p>集結萬族與眾神，在古老神殿之間展開你的征途。</p><span class="edition-mark">逐幕敘事版 0.20 · 608 張卡牌 · 30 段篇章</span></div></section>':''}${battle?battleView():view==='formation'?formation():view==='catalog'?`<div class="phase-head"><div><div class="eyebrow">THE ARCHIVE · 608 CARDS</div><h2>每一次反抗，都始於一個名字</h2></div><button data-action="downloadData">匯出卡牌資料</button></div><div class="catalog-view"><div>${roster()}</div><aside class="panel panel-pad selected-detail">${detail(CARD[selected])}</aside></div>`:view==='campaign'?campaign():view==='recruitment'?recruitmentView():view==='enhancement'?enhancementView():view==='divineCamp'?divineCampView():rules()}<footer>逆命者：厄里昂 · 原型 0.20　｜　${state.mode==='trial'?'自由試陣不改變主線進度':'自動保留編隊與通關進度；建議定期匯出備份'}　｜　美術：神域場景 / 神話角色立繪</footer></main>`);}

function showCard(id){selected=id;if(document.getElementById('detail').open)document.getElementById('detail').close();render();}

function start(){stopNodeStory();let ids=lineup();for(let lane=0;lane<3;lane++)if(ids[lane+6]&&!ids[lane]&&!ids[lane+3]){toast('第 '+(lane+1)+' 路有替補，請先放置至少一名前排或後排角色。');return;}if(!ids.slice(0,6).some(Boolean)){toast('至少放置一名先發角色。');return;}if(state.mode==='campaign'&&state.node>state.cleared){toast('請先突破前一個節點。');return;}if(ids.some(id=>id&&!available(id))){toast('陣型內有尚未解鎖的卡牌。');return;}if(quickSettleTimer)clearInterval(quickSettleTimer);pause();cancelPresentation();persist();battle=createBattle(ids,nodes[state.node].enemy,nodes[state.node].terrain,state.mode==='campaign'?1+state.cleared*.02:1,nodes[state.node].scale,state.policies);battle.nodeId=state.node;applyCampGrowth(battle);beginBattleRecording(battle);quickSettleUnlockAt=Date.now()+30000;quickSettleTimer=setInterval(refreshQuickSettleControl,1000);globalThis.mobileManualBattle=false;battleSelected=battle.units.find(u=>u.side===0&&u.active)?.uid;settled=false;returnView=view;pause();render();window.scrollTo({top:0,behavior:'smooth'});void startEntrance();}
function pause(){playing=false;if(timer!==null)clearTimeout(timer);timer=null;updatePlaybackControls();}
function settle(){if(!battle?.done||settled)return;settled=true;if(quickSettleTimer){clearInterval(quickSettleTimer);quickSettleTimer=null;}pause();awardEmbers(battle);let id=battle.nodeId;if(battle.winner===0){if(state.mode==='campaign'&&id===state.cleared)state.cleared++;state.node=state.mode==='campaign'?Math.min(state.cleared,29):Math.min(id+1,29);persist();}}

function step(){return presentNextAction();}
function play(){if(playing){pause();if(!busy)render();return;}if(!battle||battle.done)return;globalThis.mobileManualBattle=false;playing=true;updatePlaybackControls();if(!busy)void presentNextAction();}
function unitHtml(u,slot){if(!u)return `<div class="unit vacant-unit"><span class="number">${slot+1}</span><span aria-hidden="true">◇</span></div>`;let glyph={guard:'◈',weak:'↓',boost:'↑',vuln:'!',haste:'»',silence:'⊘',stun:'✦',burn:'♨',regen:'✚',taunt:'◎'};return `<button data-action="unit" data-id="${u.uid}" aria-label="查看${u.side?'敵方':'我方'} ${u.name}，${u.hp} 生命" title="${u.name}" style="--fx-time:${fxDuration}ms" class="unit icon-unit ${unitFxClass(u)} r${u.rarity} ${u.hp<=0?'dead':''} ${!u.active?'waiting':''} ${battleSelected===u.uid?'inspected':''} ${battle.last?.actor===u.uid?'acting':''} "><span class="number">${slot+1}</span><span class="unit-qi">${u.skill?qi(u.qi,u.skill.cost):'<span class="no-qi" aria-label="無奧義">—</span>'}</span>${avatar(u)}${healthBarHtml(u)}<div class="unit-vitals"><small>${u.hp}${u.shield?' ◈'+u.shield:''}</small><span class="flags" aria-label="${u.status.map(x=>STATUS[x.type]).join('、')}">${u.status.slice(0,4).map(x=>glyph[x.type]||'•').join(' ')}${u.side===0&&u.skill&&!u.auto?' ◷':''}</span></div>${effectHtml(u.uid)}</button>`;}

function army(side){let order=side?[6,7,8,3,4,5,0,1,2]:[0,1,2,3,4,5,6,7,8];return `<div class="army-grid ${side?'enemy':''}">${order.map(slot=>{let list=battle.units.filter(u=>u.side===side&&u.slot===slot);let u=list.find(u=>u.hp>0)||list.at(-1);return unitHtml(u,slot);}).join('')}</div>`;}

function battleView(){let n=nodes[battle.nodeId],inspected=battle.units.find(u=>u.uid===battleSelected);return `<div class="battle-layout" style="${terrainFrameStyle(n)}"><aside class="battle-overview"><div class="phase-head"><div><div class="eyebrow">${state.mode==='trial'?'TRAINING BATTLE':'BATTLE'} · NODE ${n.id+1}</div><h2>${n.name}</h2><p class="meta">${n.story}</p></div><button data-action="leave" ${playing||busy?'disabled':''}>${playing?'自動戰鬥時無法撤退':battle.done?'返回營地':'撤退'}</button></div>${battle.done?`<div class="result row space"><div><h2>${battle.winner===0?'防線突破':battle.winner===1?'火種尚未熄火':'戰線僵持'}</h2><p>${battle.winner===0?(n.id===29?'三十道防線已突破，凡人迎來自己的黎明。':`下一關已抵達：${nodes[state.node].name}。返回營地即可調整陣型。`):'可調整屬性、前後排與奧義保留時機，再次挑戰。'}</p></div><button class="primary" data-action="continue">${battle.winner===0&&n.id<29?'準備下一戰':'回營調整'}</button></div>`:''}${sceneBanner(n)}${battleTerrainHud(n)}${battleBondSummary()}</aside><section class="panel battle-board" style="--scene-image:${sceneArt(n)}">${chapterBattleArt(n)}<span class="battle-frame-ornament" aria-hidden="true"></span><div class="board-head row space"><h3>神庭守軍</h3><span class="meta">紅色生命條 · 替補在最上方</span></div>${army(1)}<div class="round-controls"><div class="center-band"><strong>第 ${Math.max(1,battle.round,announcedRound)} 回合</strong><p class="meta">${battle.last?battle.units.find(u=>u.uid===battle.last.actor)?.name+' · '+battle.last.skill:'戰鼓未響，準備開始'}</p></div></div>${army(0)}<div class="row space" style="padding:5px 20px"><h3>凡界聯軍</h3><span class="meta">點角色圖示查看下方卡片資訊</span></div></section><aside class="battle-sidebar"><section class="panel command-panel"><h3 class="sidebar-heading">戰場指揮<span>操作與播放</span></h3><div class="battle-controls"><button data-action="fastBattle" ${battle.done?'disabled':''}>快速結算</button><button data-action="battleReplay" ${!canOpenBattleReplay()?'disabled':''}>戰鬥回放</button><button data-action="step" ${playing||busy||battle.done?'disabled':''}>繼續回合</button><div class="speed-autoplay"><select id="speed" aria-label="播放速度"><option value="1000" ${delay===1000?'selected':''}>慢速</option><option value="650" ${delay===650?'selected':''}>標準</option><option value="180" ${delay===180?'selected':''}>快速</option><option value="60" ${delay===60?'selected':''}>3 倍速</option></select><button class="primary command-autoplay" aria-label="切換自動戰鬥" aria-pressed="${playing}" data-action="play" ${battle.done?'disabled':''}>${playing?'暫停':busy?'演出後繼續':'自動戰鬥'}</button></div><label class="round-pause"><input type="checkbox" id="roundPause" ${pauseAtRound?'checked':''}> 每回合開始前暫停</label><button class="battle-mobile-only" data-action="quickSettings">設定</button><button class="battle-mobile-only" data-action="quickSettle" ${!battle||battle.done||(!battleOpening&&Date.now()<quickSettleUnlockAt)?'disabled':''} title="${Math.max(0,Math.ceil((quickSettleUnlockAt-Date.now())/1000))?`戰鬥開始 ${Math.max(0,Math.ceil((quickSettleUnlockAt-Date.now())/1000))} 秒後開放`:'立即結算剩餘戰鬥'}">${!battleOpening&&Date.now()<quickSettleUnlockAt?'快速結算 · '+Math.ceil((quickSettleUnlockAt-Date.now())/1000)+'秒':'快速結算'}</button></div></section><section class="panel inspector-panel"><h3 class="sidebar-heading">角色情報<span>點選戰場角色查看</span></h3><div class="panel-pad battle-inspector">${detail(inspected,inspected)}</div></section><section class="panel battle-record"><h3 class="board-head">戰鬥紀錄</h3><div class="log" aria-label="戰鬥紀錄">${battle.log.slice(-35).reverse().map(l=>`<p>${esc(l)}</p>`).join('')}</div></section></aside></div>`;}

function leave(){if(quickSettleTimer){clearInterval(quickSettleTimer);quickSettleTimer=null;}quickSettleUnlockAt=0;pause();cancelPresentation();battle=null;battleSelected=null;settled=false;view='formation';persist();render();}

function download(name,obj){const url=URL.createObjectURL(new Blob([JSON.stringify(obj,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function assign(index){if(battle||!Number.isInteger(index)||index<0||index>8)return false;if(!CARD[selected]||!available(selected)){toast('請先選擇一張已解鎖卡牌。');return false;}let arr=lineup(),old=arr.indexOf(selected);if(old>=0)[arr[index],arr[old]]=[arr[old],arr[index]];else arr[index]=selected;slotIndex=index;persist();render();return true;}
app.addEventListener('click',handler);document.getElementById('detail').addEventListener('click',handler);
function handler(e){let btn=e.target.closest('[data-action]');if(!btn||btn.disabled)return;let {action:a,id}=btn.dataset;
if(a==='filterChoice'){const key=btn.dataset.filter;if(['rarity','element','role','stars','pool','species'].includes(key)){filter[key]=id;page=0;render();document.querySelector('[popovertarget="filter-'+key+'"]')?.focus();}return;}if(a==='divineUpgrade'){upgradeDivinity(id);return;}if(a==='autoFormation'){autoFormation();return;}if(a==='enhanceCard'){selected=id;view='enhancement';document.getElementById('detail').close();render();openEnhancement(id);return;}if(a==='summonLimited'){summonLimited(Number(id));return;}if(a==='summon'){summonCards(Number(id));return;}if(a==='ascend'){ascendHero(id);return;}
if(a==='openRevisit'){if(battle||state.mode!=='campaign')return;const d=document.getElementById('detail');d.className='revisit-dialog';d.innerHTML=revisitPanel()+'<button data-action="close">返回</button>';d.showModal();return;}if(a==='revisit'){if(battle||state.mode!=='campaign')return;const node=Number(document.getElementById('revisit-node')?.value);if(!Number.isInteger(node)||node<0||node>Math.min(state.cleared,29))return;state.node=node;view='formation';document.getElementById('detail').close();persist();render();return;}
if(a==='fastBattle'){requestFastBattle();return;}if(a==='battleReplay'){openBattleReplay();return;}
if(a==='voicePreview'){playCatalogVoice(id);return;}
if(a==='stopVoicePreview'){stopCatalogVoice();return;}
if(a==='skillPreview'){void previewCatalogSkill(id);return;}
if(a==='nav'){cancelPresentation();stopNodeStory();view=id;if(id==='catalog')filter.owned=false;if(id==='formation'||id==='enhancement')filter.owned=true;page=0;render();return;}

if(a==='artZoom'){showArt(id);return;}

if(a==='mode'){stopNodeStory();state.mode=id;state.node=id==='campaign'?Math.min(state.cleared,29):state.node;selected=lineup()[0]||initial[0];slotIndex=0;page=0;persist();render();return;}
if(a==='card'||a==='inspect'){stopCatalogVoice();selected=id;mobilePeekCard=mobilePortraitLayout()?id:null;if(view==='enhancement'){render();openEnhancement(id);return;}render();if(matchMedia('(max-width: 900px), (hover: none) and (pointer: coarse)').matches)openMobileCardInfo(id);return;}
if(a==='slot'){slotIndex=+id;if(lineup()[slotIndex])selected=lineup()[slotIndex];render();return;}
if(a==='openPlacement'){openPlacement(id);return;}
if(a==='deployTo'){selected=id;view='formation';const d=document.getElementById('detail');d.close();d.classList.remove('placement-dialog');assign(+btn.dataset.slot);toast('已部署 '+CARD[id].name);return;}
if(a==='placeSelected'){assign(slotIndex);return;}
if(a==='remove'){lineup()[slotIndex]=null;persist();render();return;}
if(a==='save'){persist(true);return;}
if(a==='savePreset'){let n=+document.getElementById('preset').value;while(state.presets[state.mode].length<=n)state.presets[state.mode].push(Array(9).fill(null));state.presets[state.mode][n]=[...lineup()];persist();toast('已儲存陣型 '+(n+1));return;}
if(a==='loadPreset'){let n=+document.getElementById('preset').value,arr=state.presets[state.mode][n];if(!arr?.some(Boolean)){toast('這個位置尚未儲存陣型。');return;}state.lineups[state.mode]=[...arr];selected=arr.find(Boolean);persist();render();toast('已載入陣型 '+(n+1));return;}
if(a==='policy'){state.policies[id]=state.policies[id]===false;persist();if(document.getElementById('detail').classList.contains('profile-section-modal')){render();return;}if(document.getElementById('detail').open)showCard(id);else render();return;}
if(a==='prev'||a==='next'){page+=a==='next'?1:-1;render();document.querySelector('.toolbar')?.scrollIntoView({block:'start'});return;}
if(a==='node'){state.node=+id;view='formation';persist();render();window.scrollTo({top:0});return;}
if(a==='enemy'){openEnemyRoster();return;}
if(a==='enemyDetail'){openEnemyRoster(Number(id));return;}
if(a==='openCardPreview'){openCardPreview(id);return;}
if(a==='enemyCard'){showCard(id);return;}
if(a==='close'){stopNodeStory();document.getElementById('detail').close();return;}
if(a==='selectForFormation'){selected=id;view='formation';document.getElementById('detail').close();render();window.scrollTo({top:0});return;}
if(a==='start'){showPrologue();return;}
if(a==='beginBattle'){stopNodeStory();document.getElementById('detail').close();start();return;}
if(a==='reviewStory'){showPrologue(false);return;}
if(a==='play'){play();return;}
if(a==='quickSettle'){if(!battle||battle.done)return;if(!battleOpening&&Date.now()<quickSettleUnlockAt){toast('戰鬥開始 30 秒後才能快速結算。');return;}requestFastBattle();return;}
if(a==='step'){step();return;}
if(a==='manualBattle'){if(!battle||battle.done)return;setAutoBattlePreference(false);const wasManual=globalThis.mobileManualBattle===true;pause();globalThis.mobileManualBattle=true;if(!busy){render();if(wasManual)step();}return;}
if(a==='battleSection'){openBattleSection(id,btn.dataset.section);return;}
if(a==='battleCardInfo'){openBattleCardInfo(id||battleSelected);return;}
if(a==='unit'){battleSelected=id;if(mobilePortraitLayout()){updateMobileCardDock();return;}if(busy){let box=document.querySelector('.battle-inspector');let unit=battle.units.find(u=>u.uid===id);if(box)box.innerHTML=detail(unit,unit);}else render();if(window.innerWidth<=800)document.querySelector('.battle-sidebar')?.scrollIntoView({block:'start',behavior:'smooth'});return;}
if(a==='battlePolicy'){if(busy)return;let u=battle.units.find(x=>x.uid===id);if(u?.side===0&&u.skill&&u.hp>0){u.auto=!u.auto;render();}return;}
if(a==='leave'){if(playing||busy)return;if(battle.done){leave();return;}pause();render();let d=document.getElementById('detail');d.innerHTML='<h2>暫時撤退？</h2><p style="margin:14px 0">本場戰鬥會結束，不影響卡牌與已完成的關卡。</p><div class="row"><button data-action="close">繼續作戰</button><button class="primary" data-action="confirmLeave">撤退回營</button></div>';d.showModal();return;}
if(a==='confirmLeave'){if(playing||busy)return;document.getElementById('detail').close();leave();return;}
if(a==='continue'){leave(true);return;}
if(a==='export'){persist();download('逆命者-存檔.json',state);toast('已匯出存檔');return;}
if(a==='import'){document.getElementById('importFile').click();return;}
if(a==='downloadData'){download('逆命者-608卡牌與30關卡.json',{version:'0.20',elements:ELEMENTS,terrains:TERRAINS,cards,nodes});toast('已匯出完整卡牌與關卡資料');return;}
}
app.addEventListener('change',e=>{let {id,value}=e.target;if(['rarity','element','role'].includes(id)){filter[id]=value;page=0;render();}if(id==='ownedOnly'){filter.owned=e.target.checked;page=0;render();}if(id==='speed'){delay=+value;if(timer!==null){clearTimeout(timer);timer=null;scheduleNextAction();}if(!busy)render();}if(id==='roundPause'){pauseAtRound=e.target.checked;}});
app.addEventListener('input',e=>{if(e.target.id==='search'){let pos=e.target.selectionStart;filter.q=e.target.value;page=0;render();let el=document.getElementById('search');el.focus();el.setSelectionRange(pos,pos);}});
document.getElementById('importFile').addEventListener('change',async e=>{let f=e.target.files[0];if(!f)return;try{if(f.size>100000)throw Error();let s=JSON.parse(await f.text());if(!validSave(s))throw Error();let d=document.getElementById('detail');d.innerHTML=`<h2>載入存檔</h2><p style="margin:14px 0">備份已通過格式檢查。進度：${s.cleared} / 30。載入後會取代目前瀏覽器的陣型與進度。</p><div class="row"><button id="cancelImport">取消</button><button class="primary" id="commitImport">載入此存檔</button></div>`;d.showModal();document.getElementById('cancelImport').onclick=()=>d.close();document.getElementById('commitImport').onclick=()=>{state=s;if(state.mode==='campaign')state.node=Math.min(state.cleared,29);selected=lineup().find(Boolean)||initial[0];view='formation';page=0;persist();d.close();render();toast('存檔已載入');};}catch{toast('這不是有效的逆命者存檔，原有進度未改變。');}e.target.value='';});
document.getElementById('detail').addEventListener('click',e=>{if(e.target===e.currentTarget){let r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.currentTarget.close();}});
if(document.modelContext?.registerTool){const life=new AbortController();window.addEventListener('pagehide',()=>life.abort());for(const tool of [{name:'read_formation',description:'Read current game mode, selected node and nine formation slots.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true},execute:()=>({mode:state.mode,node:state.node+1,formation:[...lineup()],cleared:state.cleared})},{name:'configure_formation_slot',description:'Place an unlocked card in a formation slot (0–8), swapping if already present, and save the formation.',inputSchema:{type:'object',properties:{slot:{type:'integer',minimum:0,maximum:8},cardId:{type:'string'}},required:['slot','cardId'],additionalProperties:false},annotations:{readOnlyHint:false},execute:input=>{if(battle||!input||!Number.isInteger(input.slot)||input.slot<0||input.slot>8||!Object.hasOwn(CARD,input.cardId)||!available(input.cardId))throw Error('Invalid slot/card or battle in progress');selected=input.cardId;assign(input.slot);return {formation:[...lineup()]};}}])try{Promise.resolve(document.modelContext.registerTool(tool,{signal:life.signal})).catch(()=>{});}catch{}}
function catalogNotes(c){
const roleTips={'增益坦':'通常放在前排，藉護盾與減傷維持防線。白卡僅有定位和基礎數值，沒有技能。','減益坦':'利用削弱或控制打亂對手；留意技能說明中的自我代價。白卡沒有控制技能。','攻擊手':'找出有利屬性與攻擊目標，搭配保護維持輸出。','輔助':'放在受保護的位置，透過普攻蓄氣後支援隊伍。白卡沒有治療技能。'};
const unlock=c.limited?'完成第 '+c.poolUnlock+' 關後，只能於限定守護者池召喚':c.id===HERO_ID?'初始主角；第 15／22 關通關後覺醒，不進入召喚池':c.poolUnlock===0?'初始獎池可抽取':'完成第 '+c.poolUnlock+' 關後進入獎池，需召喚取得';
const rewards=nodes.filter(n=>n.reward===c.id).map(n=>'第 '+(n.id+1)+' 關首勝');const appearances=nodes.filter(n=>n.enemy.includes(c.id));
return `<section class="skill-box"><h3>圖鑑備註</h3><p class="meta">族群：${c.species}${c.patronName?" · 神話意象："+c.patronName:""}</p><p>${roleTips[c.role]}</p><p class="meta">取得：${unlock}。自由試陣全部可用。</p><p class="meta">普攻倍率 100%；${c.skill?'奧義週期約 '+c.skill.cost+' 次普攻後施放一次（控制效果可能延後）。':'無奧義、無被動。'}</p><details><summary>戰役登場 · ${appearances.length} 關</summary><p>${appearances.map(n=>'第 '+(n.id+1)+' 關・'+n.name).join('；')||'目前不在敵方守軍編制中，可由我方上陣。'}</p></details><p class="meta">${c.humanRebel?'本卡為人族起義軍，僅設白、綠、藍卡；同一職責的三種編制共用人族立繪。':c.limited?(c.rarity===4?'本卡為獨立的原創限定守護者，擁有專屬姓名與立繪；原神名與原神樣貌僅屬於原神卡。':'本卡為具有專屬姓名的原創限定守護者，僅於限定池取得。'):c.id===HERO_ID?'本卡為原創主角厄里昂，種族隨主線由人族、半神演變為逆命者。':c.rarity<3?'本卡為原創神話小獸、異族民兵或中階管理者。 ':'神話意象取材古典傳說；紫卡是原創族群首領，橙卡為神祇投影。屬性、位階與戰役立場為遊戲設定。'}</p></section>`;
}
function showStoryReference(canBegin=true){stopNodeStory();const n=nodes[state.node],d=document.getElementById('detail');d.classList.add('story-dialog');d.setAttribute('aria-labelledby','storyTitle');d.innerHTML=`<div class="eyebrow">CHAPTER ${n.chapter+1} · NODE ${n.id+1}</div><h2 id="storyTitle">${n.name}</h2><div class="prologue-text">${n.prologue.split('\n').map(p=>`<p>${esc(p)}</p>`).join('')}</div><h3>本關登場</h3>${n.mythFigures.length?`<p class="gold">神話主角：${n.mythFigures.join("、")}</p>`:""}<p class="meta">紫卡為承接神話意象的族群首領；未以橙卡上陣的神話人物由麾下首領代行試煉。</p><p class="meta">我方：目前編隊。下列為實際守軍；1–6 號先發，7–9 號替補。</p><div class="story-cast">${n.enemy.map((id,i)=>`<div class="story-person r${CARD[id].rarity}">${avatar({...CARD[id],side:1},'mini-avatar')}<span>${i+1} 號 · ${CARD[id].name}<small>${CARD[id].element} · ${CARD[id].role}</small></span></div>`).join('')}</div>${n.storyAllies.length?`<p class="gold">劇情協助／救援人物：${n.storyGuestNames.join('、')}（不額外加入戰鬥編隊）。</p>`:''}<div class="skill-box"><h3>戰前提示</h3>${terrainBox(TERRAINS[n.terrain])}<p>${n.hint}</p><p class="meta">目標：擊敗所有敵方角色，包含替補。首勝獎勵：依劇情開放新的可抽角色。</p></div><details class="myth-source"><summary>神話取材與本作改編</summary><p>${n.mythNote}</p><p>本作為神話改編的虛構起義故事；對話、戰役順序與神祇立場不是古典原典記述的事件。</p><a href="${n.source[1]}" target="_blank" rel="noopener noreferrer">參考：${n.source[0]}（英譯）</a></details><div class="story-actions"><button data-action="close">返回布陣</button>${canBegin?'<button class="primary" data-action="beginBattle">開始戰鬥</button>':''}</div>`;if(!d.open)d.showModal();d.scrollTop=0;mountStoryReading(d.querySelector('.prologue-text'),n.prologue.split(/(?<=[。！？])|\n/).map(s=>s.trim()).filter(Boolean));}
function battleGuide(){const effects=[['護盾','先吸收一般攻擊傷害，上限為目標最大生命。灼傷與反噬不經護盾。'],['強化／虛弱','提高／降低造成的傷害，數值以技能說明為準。'],['減傷／易傷','降低／提高受到的傷害；不同狀態分別乘算。'],['迅捷','增加速度；本輪順序已鎖定，下一輪才重排。'],['沉默','無法施放奧義，仍可普攻與蓄氣。'],['昏迷','跳過下一次行動，該次不蓄氣。'],['灼傷／再生','角色每次行動開始時結算；灼傷按施術者攻擊，再生按目標最大生命。'],['嘲諷','吸引一般單體選敵，也影響一路技能選定哪一路。'],['淨化','移除虛弱、易傷、沉默、昏迷、灼傷，不移除嘲諷。']];return `<article class="panel panel-pad"><h3>第一次出征</h3><ol><li>點格位 → 選卡 → 在右側按「放入」。1–3 是前排，4–6 是後排，7–9 是替補。</li><li>查看敵方屬性與場地，為每一路配置先發與替補。</li><li>按「出征」，閱讀本關故事與登場名單；可先朗讀，再按「開始戰鬥」。</li><li>用「單步」逐次行動，或開啟自動戰鬥；點角色可查看氣、技能與狀態。</li><li>全滅敵方（包含替補）即勝利；首勝增加進度並開啟下一關。失敗可回營調整。</li></ol></article><article class="panel panel-pad"><h3>狀態速查</h3><dl>${effects.map(([name,desc])=>`<dt>${name}</dt><dd>${desc}</dd>`).join('')}</dl></article>`;}
document.getElementById('detail').addEventListener('close',()=>{stopNodeStory();const d=document.getElementById('detail');d.classList.remove('story-dialog','art-dialog');d.removeAttribute('aria-labelledby');});
window.addEventListener('pagehide',stopNodeStory);

render();if(storageWarning)toast(storageWarning);

// Decode shared illustrations once; report missing assets instead of silently showing an old icon.
(()=>{
const notice=document.createElement('div');notice.className='asset-notice';notice.setAttribute('role','status');notice.textContent='正在載入神域美術…';document.body.appendChild(notice);
const paths=[OLYMPUS_ART.scenes.sky];let loaded=0;
Promise.all(paths.map(src=>new Promise(resolve=>{const image=new Image();image.onload=()=>{loaded++;notice.textContent=`正在載入神域美術 ${loaded} / ${paths.length}`;resolve(true);};image.onerror=()=>resolve(false);image.src=src;}))).then(results=>{const missing=results.filter(v=>!v).length;if(!missing){notice.remove();document.body.classList.add('artwork-ready');}else{notice.classList.add('asset-error');notice.textContent=`有 ${missing} 個美術檔案未載入。請使用完整的「直接試玩」檔案，或保留 assets 資料夾，再重新整理。`;const close=document.createElement('button');close.textContent='關閉';close.onclick=()=>notice.remove();notice.appendChild(close);}});
})();


/* 0.7 story films and skill presentation. Voice clips are optional recorded assets. */
let sceneTimer=null,sceneWatch=null,currentSceneAudio=null,sceneState=null,sceneSerial=0;
const sceneVoiceQueue=new Map();
function warmSceneVoices(s){const wanted=s.lines.slice(s.index,s.index+3).map(storyVoiceClip).filter(Boolean);for(const [src,a] of sceneVoiceQueue)if(!wanted.some(c=>c.src===src)){releaseStoryAudio(a);sceneVoiceQueue.delete(src);}for(const clip of wanted)if(!sceneVoiceQueue.has(clip.src)&&currentSceneAudio?.getAttribute("src")!==clip.src){const a=speechClipAudio(clip);a.preload="auto";a.load();sceneVoiceQueue.set(clip.src,a);}}
globalThis.OLYMPUS_VOICE=globalThis.OLYMPUS_VOICE||{};
function storyLines(n){return [n.name,...n.prologue.split(/(?<=[。！？])|\n/).map(s=>s.trim()).filter(Boolean),'突破守軍防線。'+n.hint];}
function clearSceneClock(){clearInterval(sceneWatch);sceneWatch=null;currentSceneAudio?._goldStop?.();clearTimeout(sceneTimer);sceneTimer=null;if(currentSceneAudio){releaseStoryAudio(currentSceneAudio);currentSceneAudio=null;}}
function closeScene(){sceneSerial++;clearSceneClock();for(const a of sceneVoiceQueue.values())releaseStoryAudio(a);sceneVoiceQueue.clear();sceneState=null;queueMicrotask(()=>globalThis.olympusScore?.sync());const d=document.getElementById('detail');d.classList.remove('cinema-dialog');if(d.open)d.close();}
function finishScene(){const begin=sceneState?.canBegin;closeScene();if(begin){start();if(battle){playing=false;updatePlaybackControls();}}}
function showPrologue(canBegin=true){closeScene();const n=nodes[state.node];sceneState={n,lines:storyLines(n),index:0,canBegin,paused:false};globalThis.olympusScore?.sync();const d=document.getElementById('detail');d.classList.remove('story-dialog','art-dialog');d.classList.add('cinema-dialog');d.setAttribute('aria-label',n.name+' 劇情');d.innerHTML=`<div class="story-film" style="--film-scene:${sceneArt(n)}"><div class="film-landscape"></div><div class="film-vignette"></div><div class="film-tableau"></div><div class="film-dust" aria-hidden="true">${Array.from({length:18},(_,i)=>`<i style="--i:${i}"></i>`).join('')}</div><div class="film-heading"><span>CHAPTER ${n.chapter+1} · ${chapterNames[n.chapter]}</span><strong>${n.name}</strong></div><div class="film-cast" aria-hidden="true">${avatar(nodeLeader(n),'film-portrait')}</div><div class="film-subtitles" aria-live="polite"><span class="film-counter"></span><p></p></div><div class="film-progress"><i></i></div><div class="film-controls"><button data-film="back">返回布陣</button><button data-film="info">故事資料</button><button data-film="pause">暫停劇情</button><button data-film="next">下一段</button><button data-film="skip" class="primary">${canBegin?'略過劇情・進入戰鬥':'結束劇情'}</button></div></div>`;d.showModal();d.scrollTop=0;void drawSceneLine();}
async function drawSceneLine(){if(!sceneState)return;clearSceneClock();const s=sceneState,serial=++sceneSerial;if(s.index>=s.lines.length){await scrollBannerMotion(document.querySelector('.film-subtitles'),true);if(sceneState===s&&serial===sceneSerial)finishScene();return;}const d=document.getElementById('detail'),text=s.lines[s.index],p=d.querySelector('.film-subtitles p');if(p.textContent)await scrollBannerMotion(p.parentElement,true);if(sceneState!==s||serial!==sceneSerial)return;void scrollBannerMotion(p.parentElement,false);void renderStoryShot(s.n,s.index,text,serial);p.textContent=text;p.scrollTop=0;d.querySelector('.film-counter').textContent=`${String(s.index+1).padStart(2,'0')} / ${s.lines.length}`;d.querySelector('.film-progress i').style.width=((s.index+1)/s.lines.length*100)+'%';d.querySelector('.film-cast').style.opacity=s.index>0&&s.index%3===0?'.8':'0';const advance=()=>{if(sceneState&&serial===sceneSerial&&!s.paused){s.index++;drawSceneLine();}};
const clip=storyVoiceClip(text);let lastTick=performance.now(),lastTime=0,idle=0,reading=0,fallback=false,finished=false;
const valid=()=>sceneState===s&&serial===sceneSerial;
const next=()=>{if(finished||!valid()||s.paused)return;finished=true;advance();};
const textMs=Math.max(2200,Math.min(9000,text.length*110))*(globalThis.storyPace||1);
function useText(){if(fallback||!valid())return;fallback=true;reading=0;if(currentSceneAudio){releaseStoryAudio(currentSceneAudio);currentSceneAudio=null;}p.textContent=text;d.querySelector('.film-counter').textContent=String(s.index+1).padStart(2,'0')+' / '+s.lines.length+' · 文字播放';}
if(clip){const a=currentSceneAudio=sceneVoiceQueue.get(clip.src)||speechClipAudio(clip);sceneVoiceQueue.delete(clip.src);a.preload='auto';a.volume=.8;bindStoryGold(a,clip,text,p);a.onended=next;a.onerror=useText;a.play().catch(()=>{if(valid())useText();});}else useText();
warmSceneVoices(s);
sceneWatch=setInterval(()=>{
 if(!valid())return;
 const now=performance.now(),delta=Math.min(500,now-lastTick);lastTick=now;
 if(s.paused||document.hidden)return;
 if(fallback){reading+=delta;if(reading>=textMs)next();return;}
 const a=currentSceneAudio;if(!a){useText();return;}
 if(a.ended){next();return;}
 if(a.currentTime>lastTime+.01){lastTime=a.currentTime;idle=0;}else idle+=delta;
 if(idle>4500)useText();
},200);
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-film]');if(!b||!sceneState)return;const s=sceneState;if(b.dataset.film==='info'){const begin=s.canBegin;closeScene();showStoryReference(begin);return;}if(b.dataset.film==='back'){closeScene();return;}if(b.dataset.film==='skip'){finishScene();return;}if(b.dataset.film==='next'){s.paused=false;document.querySelector('.story-film').classList.remove('film-paused');s.index++;document.querySelector('[data-film="pause"]').textContent='暫停劇情';drawSceneLine();return;}s.paused=!s.paused;b.textContent=s.paused?'繼續劇情':'暫停劇情';document.querySelector('.story-film').classList.toggle('film-paused',s.paused);if(s.paused){clearTimeout(sceneTimer);currentSceneAudio?.pause();}else if(currentSceneAudio){currentSceneAudio.play().catch(()=>drawSceneLine());}else if(!sceneWatch)drawSceneLine();});
document.getElementById('detail').addEventListener('cancel',()=>{sceneSerial++;clearSceneClock();for(const a of sceneVoiceQueue.values())releaseStoryAudio(a);sceneVoiceQueue.clear();sceneState=null;queueMicrotask(()=>globalThis.olympusScore?.sync());document.getElementById('detail').classList.remove('cinema-dialog');});
window.addEventListener('pagehide',()=>{sceneSerial++;clearSceneClock();for(const a of sceneVoiceQueue.values())releaseStoryAudio(a);sceneVoiceQueue.clear();});
function openPlacement(id){const c=CARD[id];if(!c||!available(id)||battle)return;selected=id;const d=document.getElementById('detail');d.classList.remove('story-dialog','cinema-dialog','art-dialog');d.classList.add('placement-dialog');d.innerHTML=`<h2>部署 ${c.name}</h2><p>選擇位置；若已上陣，會與目標位置交換。</p><div class="deploy-grid">${lineup().map((v,i)=>`<button data-action="deployTo" data-id="${id}" data-slot="${i}"><span>${i+1} 號 · ${i<3?'前排':i<6?'後排':'替補'}</span>${v?avatar(CARD[v],'mini-avatar'):'＋'}<small>${v?CARD[v].name:'空位'}</small></button>`).join('')}</div><button data-action="close">取消</button>`;d.showModal();}
let draggedCard=null,dragClickUntil=0;
function dragCardFrom(el){const card=el.closest('[data-action="card"],[data-action="slot"]');if(!card||view!=='formation'||battle)return null;const id=card.dataset.action==='slot'?lineup()[+card.dataset.id]:card.dataset.id;return id&&available(id)?{id,card}:null;}
function clearDropMarks(){document.querySelectorAll('.drop-target').forEach(e=>e.classList.remove('drop-target'));document.body.classList.remove('dragging-card');}
document.addEventListener('dragstart',e=>{const item=dragCardFrom(e.target);if(!item){e.preventDefault();return;}draggedCard=item.id;e.dataTransfer.setData('text/plain',item.id);e.dataTransfer.effectAllowed='move';document.body.classList.add('dragging-card');});
document.addEventListener('dragover',e=>{const slot=e.target.closest('[data-action="slot"]');if(!slot||!draggedCard)return;e.preventDefault();e.dataTransfer.dropEffect='move';document.querySelectorAll('.drop-target').forEach(x=>x.classList.remove('drop-target'));slot.classList.add('drop-target');});
document.addEventListener('drop',e=>{const slot=e.target.closest('[data-action="slot"]');if(!slot||!draggedCard)return;e.preventDefault();selected=draggedCard;assign(+slot.dataset.id);draggedCard=null;clearDropMarks();dragClickUntil=Date.now()+350;});
document.addEventListener('dragend',()=>{draggedCard=null;clearDropMarks();dragClickUntil=Date.now()+350;});
document.addEventListener('click',e=>{if(Date.now()<dragClickUntil){e.preventDefault();e.stopImmediatePropagation();}},true);
// Touch: long press then move, leaving ordinary scrolling and taps intact.
let touchDrag=null;
document.addEventListener('pointerdown',e=>{if(e.pointerType!=='touch')return;const item=dragCardFrom(e.target);if(!item)return;touchDrag={...item,x:e.clientX,y:e.clientY,pointer:e.pointerId,active:false,timer:setTimeout(()=>{if(!touchDrag)return;touchDrag.active=true;const ghost=item.card.querySelector('.painted-avatar').cloneNode(true);ghost.className='avatar painted-avatar drag-ghost';ghost.style.left=e.clientX+'px';ghost.style.top=e.clientY+'px';document.body.appendChild(ghost);touchDrag.ghost=ghost;document.body.classList.add('dragging-card');},340)};});
document.addEventListener('pointermove',e=>{const t=touchDrag;if(!t||e.pointerId!==t.pointer)return;if(!t.active){if(Math.hypot(e.clientX-t.x,e.clientY-t.y)>10){clearTimeout(t.timer);touchDrag=null;}return;}e.preventDefault();t.ghost.style.left=e.clientX+'px';t.ghost.style.top=e.clientY+'px';document.querySelectorAll('.drop-target').forEach(x=>x.classList.remove('drop-target'));document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-action="slot"]')?.classList.add('drop-target');if(e.clientY<80)window.scrollBy(0,-14);else if(e.clientY>innerHeight-80)window.scrollBy(0,14);},{passive:false});
function endTouchDrag(e){const t=touchDrag;if(!t)return;clearTimeout(t.timer);if(t.active){const slot=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-action="slot"]');t.ghost.remove();if(e.type==='pointerup'&&slot){selected=t.id;assign(+slot.dataset.id);}dragClickUntil=Date.now()+500;}touchDrag=null;clearDropMarks();}
document.addEventListener('pointerup',endTouchDrag);document.addEventListener('pointercancel',endTouchDrag);

async function showSkillFilm(actor,cast,epoch){const gold=goldSkillRecord(actor,cast.name);if(gold){const ok=await playGoldUltimate(actor,gold,epoch);if(ok)await waitPresentation(goldImpactDuration||650,epoch);stopGoldCinematic();return ok;}const host=document.getElementById('stageOverlay'),element=cast.element||actor?.element||'光',idx=Math.max(0,ELEMENTS.indexOf(element)),s=actor?.skill||{},effects=(s.effects||[]).map(x=>x.type),mode=effects.some(x=>['heal','regen','cleanse'].includes(x))?'blessing':effects.some(x=>['shield','guard'].includes(x))?'ward':'strike',ms=motionDuration('skill');host.innerHTML=`<div class="painted-skill ${mode}" style="--skill-time:${ms}ms;--fx-x:${idx%4*100/3}%;--fx-y:${Math.floor(idx/4)*100}%;--skill-color:${ELEMENT_COLORS[element]}"><div class="painted-skill-shade"></div><div class="painted-caster">${actor?avatar(CARD[actor.id]||actor,'cast-portrait'):''}</div><div class="painted-element"></div><div class="cast-signature"><strong>${esc(actor?.name||'')}</strong><span>${esc(cast.name)}</span></div></div>`;const valid=await waitPresentation(ms,epoch);if(valid)host.innerHTML='';return valid;}


// Each subtitle addresses its own atlas cell. Decode before changing either image or subtitle.
const chapterImageCache=new Map();
function loadChapterImage(key){if(!chapterImageCache.has(key)){const pending=new Promise(resolve=>{const img=new Image();let finished=false;const finish=ok=>{if(finished)return;finished=true;clearTimeout(timer);img.onload=img.onerror=null;if(!ok)chapterImageCache.delete(key);resolve(ok);};const timer=setTimeout(()=>finish(false),8000);img.fetchPriority='high';img.onload=()=>finish(true);img.onerror=()=>finish(false);img.src=OLYMPUS_ART.atlases[key];});chapterImageCache.set(key,pending);}return chapterImageCache.get(key);}
async function renderStoryShot(n,index,text,serial){const key='chapter-'+String(n.id+1).padStart(2,'0'),rows=Math.ceil(storyLines(n).length/2);const host=document.querySelector('.film-tableau');if(!host)return false;const loaded=await loadChapterImage(key);if(!sceneState||sceneSerial!==serial||!host.isConnected)return false;if(!loaded){host.setAttribute('aria-label','分鏡圖片載入失敗');toast('分鏡圖片無法載入，保留文字故事。');return true;}
if(!host.querySelector('.sequence-layer')){host.innerHTML='<div class="sequence-layer"></div><div class="sequence-layer"></div>';host.dataset.active='0';host.dataset.frame='-1';}
if(+host.dataset.frame===index)return true;
clearTimeout(host._fadeTimer);const layers=host.querySelectorAll('.sequence-layer'),old=layers[+host.dataset.active],next=layers[1-(+host.dataset.active)],initial=+host.dataset.frame<0;
const ratio=globalThis.OLYMPUS_SHOT_RATIOS?.[key]||1;
host.style.setProperty('--sequence-ratio',ratio);next.style.backgroundImage=`var(--art-${key})`;next.style.backgroundSize=`200% ${rows*100}%`;next.style.backgroundPosition=`${index%2*100}% ${Math.floor(index/2)*100/(rows-1)}%`;next.setAttribute('role','img');next.setAttribute('aria-label',`${n.name}，第 ${index+1} 幕：${text}`);old.setAttribute('aria-hidden','true');next.removeAttribute('aria-hidden');
next.style.transition='none';next.style.opacity='0';next.style.zIndex='2';old.style.transition='none';old.style.zIndex='1';old.style.opacity=initial?'0':'1';void next.offsetWidth;
next.style.transition=window.matchMedia('(prefers-reduced-motion: reduce)').matches?'none':'opacity 900ms ease';next.style.opacity='1';host.dataset.active=String(1-(+host.dataset.active));host.dataset.frame=String(index);
host._fadeTimer=setTimeout(()=>{if(host.isConnected&&+host.dataset.frame===index)old.style.opacity='0';},950);return true;
}


/* Campaign front end: local saves, achievements, opening and result presentation. */
(()=>{
const STORE=KEY+'-journey';
let hub='home',hubOrigin=null,film=null,filmClock=null,filmToken=0,resultBattle=null;globalThis.olympusMusicHub=hub;
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))||fallback;}catch{return fallback;}};
let prefs=Object.assign({pace:1,motion:false,speed:650},read(STORE+'-settings',{}));
prefs.pace=[.8,1,1.4].includes(+prefs.pace)?+prefs.pace:1;prefs.speed=[60,180,650,1000].includes(+prefs.speed)?+prefs.speed:650;
delay=prefs.speed;
const storage=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));return true;}catch{toast('本機儲存空間不足，請匯出存檔備份。');return false;}};
const panel=document.createElement('dialog');panel.id='journey-dialog';document.body.appendChild(panel);
const float=document.createElement('div');float.id='achievement-pop';float.setAttribute('role','status');document.body.appendChild(float);
function progress(){if(!state.journey||typeof state.journey!=='object'||Array.isArray(state.journey))state.journey={};let j=state.journey;for(const k of ['read','unlocked'])if(!Array.isArray(j[k]))j[k]=[];j.read=j.read.filter(x=>Number.isInteger(x)&&x>=0&&x<30);j.unlocked=j.unlocked.filter(x=>typeof x==='string');return j;}
const goals=[
 ['start','火種初醒','開始新的故事戰役',1,()=>progress().begun?1:0],
 ...[[1,'第一道裂縫'],[5,'凡界聯軍'],[10,'名字不再沉默'],[15,'盜火者的同行者'],[20,'走出冥府'],[25,'潮汐中的承諾'],[30,'凡人的黎明']].map(([n,t])=>['clear'+n,t,'故事戰役通過 '+n+' 關',n,()=>state.cleared]),
 ...[[20,'初聚的火種'],[50,'跨越山海'],[100,'萬族先聲'],[210,'萬族相聚'],[300,'百族盟約'],[370,'首領的認可'],[400,'舊日盟約'],[550,'諸神與凡人']].map(([n,t])=>['collect'+n,t,'戰役持有 '+n+' 張不同卡牌',n,()=>owned().size]),
 ['summon1','來自火光的回應','進行首次召喚',1,()=>ensureRecruitment().draws],
 ['ascension1','從餘燼中成長','讓任一英雄完成一次進階',1,()=>Math.max(0,...Object.values(ensureRecruitment().ascensions))],
 ['formation','九席同行','戰役編隊放滿 9 個位置',9,()=>state.lineups.campaign.filter(Boolean).length],
 ['elements','八相同盟','戰役編隊同時擁有 8 種屬性',8,()=>new Set(state.lineups.campaign.filter(Boolean).map(id=>CARD[id].element)).size],
 ['reader','聽見每個名字','完整讀完 30 關戰前故事',30,()=>new Set(progress().read).size],
 ['safe','一個也不留下','故事戰役勝利時，我方全員存活',1,()=>progress().safe?1:0]
 ];
let notices=[],noticeTimer;
function announce(){if(noticeTimer||!notices.length)return;float.textContent='◆ 成就解鎖　'+notices.shift();float.classList.add('show');noticeTimer=setTimeout(()=>{float.classList.remove('show');noticeTimer=null;announce();},3500);}
function achievements(silent=false){const j=progress();for(const [id,title,,target,value] of goals)if(value()>=target&&!j.unlocked.includes(id)){j.unlocked.push(id);if(!silent)notices.push(title);}announce();}
const oldPersist=persist;persist=function(notify=false){achievements();oldPersist(notify);};
function applyPrefs(){document.documentElement.classList.toggle('quiet-motion',!!prefs.motion);document.documentElement.style.setProperty('--story-font',prefs.large?'29px':'24px');delay=prefs.speed;globalThis.storyPace=prefs.pace;}
applyPrefs();achievements(true);
const oldRender=render;render=function(){oldRender();const nav=document.querySelector('.shell>.nav');if(nav&&!nav.querySelector('[data-journey=home]'))nav.insertAdjacentHTML('beforeend','<button data-journey="home" '+(battle?'disabled':'')+'>主選單</button><button data-journey="achievements" '+(battle?'disabled':'')+'>成就</button>');if(hub)renderHub();else if(!battle){const phase=document.querySelector('.phase-head');if(phase)phase.insertAdjacentHTML('afterend',`<div class="journey-objective"><strong>下一個目標</strong><span>${state.cleared===30?'三十關已完成，前往成就頁完成蒐集與編隊目標。':'突破第 '+(state.cleared+1)+' 關「'+esc(nodes[Math.min(state.cleared,29)].name)+'」，解鎖下一批召喚角色並累積成長資源。'}</span><button data-journey="achievements">查看成就</button></div>`);}};
const jb=(action,label,cls='')=>`<button class="${cls}" data-journey="${action}">${label}</button>`;
function renderHub(){globalThis.olympusMusicHub=hub;globalThis.olympusScore?.sync();
 if(hub==='home'){app.innerHTML=`<main class="title-screen"><div class="title-copy"><span class="eyebrow">ERION · THE MORTAL DAWN</span><h1>逆命者<br><small>厄里昂</small></h1><p>厄里昂與九名人族起義者，從守護口糧走向凡人的黎明。</p><div class="title-actions">${jb('resume','繼續旅程 · '+state.cleared+' / 30','primary')}${jb('new','新遊戲')}${jb('campaign','故事戰役')}${jb('saves','檔案存取')}${jb('achievements','成就殿堂')}${jb('settings','設置')}${jb('exit','儲存並離開')}</div><small>0.20 · 本機獨立遊戲 · 成就保存在目前存檔</small></div><aside class="title-summary"><span>你的征途</span><h2>${esc(nodes[Math.min(state.cleared,29)].name)}</h2><p>已通關 ${state.cleared} / 30　·　持有 ${owned().size} / 608 張卡牌</p><p>成就 ${progress().unlocked.length} / ${goals.length}</p><p>守住種子、救出同行者，讓凡人的聲音抵達神庭。</p></aside></main>`;return;}
 let content='';
 if(hub==='achievements'){achievements(true);content=`<h1>成就殿堂</h1><p>本機成就 · ${progress().unlocked.length} / ${goals.length} 已解鎖。自由試陣不計入戰役通關與蒐集。</p><div class="achievement-grid">${goals.map(([id,title,desc,target,value])=>{const got=progress().unlocked.includes(id),n=Math.min(target,value());return `<article class="achievement ${got?'earned':''}"><span>${got?'◆ 已解鎖':'◇ 進行中'}</span><h2>${title}</h2><p>${desc}</p><progress max="${target}" value="${got?target:n}"></progress><small>${got?target:n} / ${target}</small></article>`;}).join('')}</div>`;}
 if(hub==='saves'){content=`<h1>檔案存取</h1><p>自動存檔保留目前進度；手動槽位保存獨立快照。讀取前會保留目前進度的復原備份。</p><div class="save-grid">${[0,1,2].map(i=>{const s=read(STORE+'-slot'+i,null);return `<article class="achievement"><h2>存檔 ${i+1}</h2><p>${s&&validSave(s.state)?'已通關 '+s.state.cleared+' / 30 · '+esc(s.date):'尚無存檔'}</p>${jb('save'+i,'儲存於此')}${s&&validSave(s.state)?jb('load'+i,'讀取'):''}</article>`;}).join('')}</div><div class="row">${jb('export','匯出目前存檔')}${jb('import','匯入存檔')}${validSave(read(STORE+'-backup',null))?jb('restore','讀取復原備份'):''}</div><p class="meta">換裝置或換檔案路徑前，建議匯出備份。瀏覽器可能隔離不同檔案的本機資料。</p>`;}
 if(hub==='settings'){content=`<h1>設置</h1><div class="settings-list">${globalThis.olympusAudio?.controls()||''}${globalThis.olympusScore?.controls()||''}<label>故事閱讀速度<select data-pref="pace">${[[.8,'較快'],[1,'標準'],[1.4,'慢速']].map(([v,t])=>`<option value="${v}" ${prefs.pace===v?'selected':''}>${t}</option>`).join('')}</select></label><label>預設戰鬥速度<select data-pref="speed">${[[1000,'慢速'],[650,'標準'],[180,'快速'],[60,'3 倍速']].map(([v,t])=>`<option value="${v}" ${prefs.speed===v?'selected':''}>${t}</option>`).join('')}</select></label><label><input type="checkbox" data-pref="motion" ${prefs.motion?'checked':''}> 減少動態效果</label><label><input type="checkbox" data-pref="large" ${prefs.large?'checked':''}> 放大故事字幕</label></div><p class="meta">設定自動保存。頁面音樂與戰鬥配樂可分別調整。</p>${jb('opening','重看開場故事')}`;}
 if(hub==='exit'){content='<h1>旅程已暫歇</h1><p>已嘗試保存目前進度。你可以關閉此分頁，或返回主選單。</p>';}
 app.innerHTML=`<main class="journey-page"><header>${jb('return','← 返回')}</header>${content}</main>`;
}
function enter(destination='formation'){hub=null;hubOrigin=null;globalThis.olympusMusicHub=null;view=destination;render();window.scrollTo(0,0);}
function dialog(title,body,buttons){globalThis.stopStoryReading?.();panel.className='journey-modal';panel.innerHTML=`<h2>${title}</h2><p>${body}</p><div class="row">${buttons}</div>`;if(!panel.open)panel.showModal();}
function backup(){return storage(STORE+'-backup',state);}
function loadState(s){if(!validSave(s)){toast('存檔無效，未更改目前進度。');return;}if(!backup())return;state=JSON.parse(JSON.stringify(s));state.node=state.mode==='campaign'?Math.min(state.cleared,29):state.node;selected=lineup().find(Boolean)||initial[0];page=0;persist();enter();}
document.addEventListener('click',e=>{const b=e.target.closest('[data-journey]');if(!b||b.disabled)return;const a=b.dataset.journey;
 if(a==='dismiss'){panel.close();return;}
 if(a==='result-close'){panel.close();return;}
  if(a==='result-retry'){const retryNode=battle?.nodeId;if(!battle||battle.winner!==0||!Number.isInteger(retryNode))return;panel.close();state.node=retryNode;start();return;}
 if(a==='result-next'){const ending=battle?.winner===0&&battle.nodeId===29&&state.mode==='campaign';panel.close();leave();if(ending)playFilm('尾聲 · 今年的第一束麥穗',[[29,3,'你請求的沒有包括王冠。神庭的命令必須重新接受檢視，凡人開始共同決定自己的生活。'],[0,0,'回到村莊後，達蒙挑出仍能播種的種子。採石場拆下鎖鏈，工匠用石材修起水渠與糧倉。'],[0,3,'議事場的爭論沒有停止。有人質問你的決定，你聽著，沒有命人把他帶走。'],[0,2,'第一束麥穗留給祭壇，一份種子留在糧倉，其餘被磨成麵粉，分到每一張桌上。'],[0,4,'你把破盾掛在穀倉門邊。它仍能替守夜的燈擋去一點風；明天的事，大家可以一起決定。']],()=>enter('campaign'));return;}
 if(a==='film-next'){advanceFilm();return;}if(a==='film-skip'){endFilm();return;}if(a==='film-pause'){if(!film)return;film.paused=!film.paused;b.textContent=film.paused?'繼續':'暫停';clearTimeout(filmClock);if(filmVoice){if(film.paused)filmVoice.pause();else filmVoice.play().catch(()=>{});}else if(!film.paused)scheduleFilm();return;}
 if(a==='return'){const origin=hubOrigin;hubOrigin=null;if(origin?.hub){hub=origin.hub;renderHub();}else{hub=null;globalThis.olympusMusicHub=null;view=origin?.view||'formation';render();}requestAnimationFrame(()=>window.scrollTo(origin?.x||0,origin?.y||0));return;}if(a==='resume'){enter();return;}if(a==='campaign'){state.mode='campaign';state.node=Math.min(state.cleared,29);selected=lineup().find(Boolean)||initial[0];persist();enter('campaign');return;}
 if(['home','achievements','saves','settings'].includes(a)){if(battle)return;hubOrigin={hub,view,x:scrollX,y:scrollY};hub=a;renderHub();window.scrollTo(0,0);return;}
 if(a==='exit'){persist();hub='exit';renderHub();return;}
 if(a==='new'){dialog('開始新的旅程？','目前進度會先存入復原備份；手動存檔不會刪除。新旅程的戰役與成就將重新開始。',jb('dismiss','取消')+jb('confirm-new','備份並開始','primary'));return;}
 if(a==='confirm-new'){if(!backup())return;panel.close();state={version:1,mode:'campaign',node:0,cleared:0,lineups:{campaign:[...initial],trial:[...trial]},presets:{campaign:[],trial:[]},policies:{},recruitment:newRecruitment(),journey:{begun:true,read:[],unlocked:[]}};selected=initial[0];page=0;persist();enter();opening();return;}
 if(a==='opening'){opening();return;}
 if(/^save[0-2]$/.test(a)){const i=+a.at(-1);dialog('儲存至槽位 '+(i+1),'將以目前進度取代此槽位的快照。',jb('dismiss','取消')+jb('commit-save'+i,'確認儲存','primary'));return;}
 if(/^commit-save[0-2]$/.test(a)){persist();if(storage(STORE+'-slot'+a.at(-1),{state,date:new Date().toLocaleString('zh-TW')})){panel.close();renderHub();toast('手動存檔已保存');}return;}
 if(/^load[0-2]$/.test(a)){dialog('讀取存檔','目前進度會先放入復原備份。',jb('dismiss','取消')+jb('commit-load'+a.at(-1),'確認讀取','primary'));return;}
 if(/^commit-load[0-2]$/.test(a)){const s=read(STORE+'-slot'+a.at(-1),null);panel.close();if(s)loadState(s.state);return;}
 if(a==='restore'){const s=read(STORE+'-backup',null);if(s)loadState(s);return;}
 if(a==='export'){persist();download('逆命者-旅程存檔.json',state);return;}
 if(a==='import'){hub=null;globalThis.olympusMusicHub=null;render();document.getElementById('importFile').click();return;}
});
document.addEventListener('change',e=>{const k=e.target.dataset.pref;if(!k)return;prefs[k]=e.target.type==='checkbox'?e.target.checked:+e.target.value;storage(STORE+'-settings',prefs);applyPrefs();});
let filmVoice=null,captionFrame=0;
function stopFilmVoice(){cancelAnimationFrame(captionFrame);releaseStoryAudio(filmVoice);filmVoice=null;}
window.addEventListener('pagehide',stopFilmVoice);
function voiceFilm(f,text){const clip=storyVoiceClip(text);if(!clip)return false;const caption=panel.querySelector('.journey-caption'),a=filmVoice=speechClipAudio(clip);a.volume=.8;caption.scrollTop=0;bindStoryGold(a,clip,text,caption);a.onended=()=>{if(film===f&&filmVoice===a)advanceFilm();};a.onerror=()=>{if(filmVoice===a){stopFilmVoice();scheduleFilm();}};if(!f.paused)a.play().catch(()=>{if(filmVoice!==a)return;f.paused=true;panel.querySelector('[data-journey="film-pause"]').textContent='播放旁白';});return true;}
function opening(){playFilm('序章 · 厄里昂的起義',[[0,0,"你叫厄里昂。十五歲這年，神庭收走村莊最後的麥種，也帶走了拒絕交糧的母親。"],[0,1,"你生來高大，手臂烙印被族人視為不祥。你不知道，那是凡人母親與隕落神裔留下的血脈。"],[0,2,"當徵糧官把達蒙推向祭壇，你舉起礦鎚。壓垮你的不是飢餓，而是神明要求人們感謝苦難。"],[0,3,"你救下達蒙，卻救不回所有人。逃出的工匠、醫者與萬族同伴，決定一起守住最後的種子。"],[0,4,"征途將持續多年。你會在盜火者面前覺醒，在戰神面前付出代價，學會以自己的意志駕馭神力。"],[0,5,"你將成為半神，卻不必成為新的主人。率領同行者穿越三十道防線，讓眾生重新選擇命運。"]],()=>{progress().opening=true;persist();enter();},10000);}
async function paintFilm(){stopFilmVoice();if(!film)return;const f=film,index=f.index,token=++filmToken,[chapter,cell,text]=f.frames[index],key='chapter-'+String(chapter+1).padStart(2,'0');
const captionBanner=panel.querySelector('.journey-film-copy');if(index>0)await scrollBannerMotion(captionBanner,true);if(film!==f||token!==filmToken)return;void scrollBannerMotion(captionBanner,false);const img=panel.querySelector('.journey-film-art');img.classList.toggle('hero-origin-film',!!f.frameMs);if(f.frameMs&&!img.querySelector('.hero-film-portrait'))img.insertAdjacentHTML('beforeend','<div class="hero-film-portrait" aria-hidden="true"></div>');img.style.backgroundImage='var(--realm-sky)';img.style.backgroundSize='cover';img.style.backgroundPosition='center';img.style.aspectRatio=globalThis.OLYMPUS_SHOT_RATIOS?.[key]||1;img.setAttribute('aria-label',text);
panel.querySelector('.journey-caption').textContent=text;panel.querySelector('.journey-counter').textContent=(index+1)+' / '+f.frames.length+(f.frameMs?' · 序章旁白':'');if(!voiceFilm(f,text))scheduleFilm();
const loaded=await loadChapterImage(key);if(!film||film!==f||f.index!==index||token!==filmToken)return;if(!loaded){img.setAttribute('aria-label',text+'（分鏡圖片暫未載入）');return;}const rows=chapterRows[chapter];img.style.backgroundImage='var(--art-'+key+')';img.style.backgroundSize='200% '+rows*100+'%';img.style.backgroundPosition=cell%2*100+'% '+Math.floor(cell/2)*100/(rows-1)+'%';}

function scheduleFilm(){clearTimeout(filmClock);if(film&&!film.paused)filmClock=setTimeout(advanceFilm,film.frameMs||(Math.max(6500,film.frames[film.index][2].length*200)*prefs.pace));}
function advanceFilm(){stopFilmVoice();clearTimeout(filmClock);if(!film)return;if(++film.index>=film.frames.length){endFilm();return;}void paintFilm();}
async function endFilm(){stopFilmVoice();clearTimeout(filmClock);const ending=film,token=++filmToken,done=film?.done;await scrollBannerMotion(panel.querySelector('.journey-film-copy'),true);if(film!==ending||filmToken!==token)return;film=null;globalThis.olympusFilmActive=false;panel.close();if(done)done();queueMicrotask(()=>globalThis.olympusScore?.sync());}
function playFilm(title,frames,done,frameMs=0){globalThis.stopStoryReading?.();film={frames,index:0,paused:false,done,frameMs};globalThis.olympusFilmActive=true;globalThis.olympusScore?.sync();panel.className='journey-cinema';panel.innerHTML=`<h2>${esc(title)}</h2><div class="journey-film-art" role="img"></div><div class="journey-film-copy"><small class="journey-counter"></small><p class="journey-caption" aria-live="polite">畫面載入中…</p></div><div class="journey-film-actions">${jb('film-pause','暫停')}${jb('film-next','下一幕')}${jb('film-skip','SKIP · 略過')}</div>`;if(!panel.open)panel.showModal();void paintFilm();}
panel.addEventListener('cancel',e=>{if(film){e.preventDefault();endFilm();}});
const chapterRows=nodes.map(n=>Math.ceil(storyLines(n).length/2));
const connections=[
 '徵糧隊再次抵達村口。你與達蒙守著最後的種子，這一次，你們不再讓開。',
 '守住糧倉後，一名逃亡者帶來求救。你循著失蹤村民的足跡，走進採石場。',
 '採石場的傷者需要撤離。你們沿河抵達鹽港，卻發現船槳已被扣押。',
 '船隊帶走部分難民，你護送岸上的人前行，撞見烈日下的強徵名冊。',
 '逃亡無法保住已救出的人。你們返回控制道路的神廟，準備建立共同守望的家園。',
 '雷紋旗降下後，神庭下令封航。你帶著受難者名冊，站到虹橋使者面前。',
 '海路無法容納所有人。你帶其餘流亡者翻越北方山隘，尋找另一側的接應船隊。',
 '你們走出風雪，海灣卻響起封航的號角。曾在鹽港獲救的船夫仍在等待。',
 '船隊終於靠岸，糧食卻已用盡。高牆內的果園仍青翠，飢餓的人停在門外。',
 '園門打開了，神庭的裁決隨之到來。你要求廣場也聽見飢民與工人的證詞。',
 '你們帶著允許異議的約定前進。避難海灣之前，還有最後一座必須打開的城門。',
 '城門開啟，老石匠卻沒能回來。你帶著傷者登船，決定讓不願再戰的人留在海灣。',
 '避難地安頓後，你帶自願者前往神域。山門裡，竟傳來死去同伴的求救聲。',
 '走過恐懼的山門，宴席許諾每個人的願望。同行者的分歧，也隨金蘋果浮現。',
 '你們約定共同決策，循山路找到盜火者。老石匠留下的鑿子，再次對準鎖鏈。',
 '普羅米修斯指出穿越冥府的古道。進入黑暗之前，酒神邀請疲憊的眾人休息。',
 '歌聲在身後遠去，你帶著火種抵達冥河。命運女神的線束裡，也有你們的名字。',
 '跨過渡口，你們走進一座燈火溫暖的城。夢裡，失去的人彷彿從未離開。',
 '你們從夢中醒來，抵達冥后的花園。思念可以同行，卻不能變成徵召亡者的理由。',
 '你答應尊重死者的安寧。如今，還須向冥王請求讓活人通過古道。',
 '帶著亡者的名字走出冥府，你們抵達天地邊界。天穹的重量壓在一雙肩上。',
 '擎天者教會你交出盾牌。接下來，戰神卻要你用無止境的憤怒換取勝利。',
 '你們克制追擊，轉入森林避開敵軍。一支銀箭制止了焚林開路的提議。',
 '走出林地，你們抵達未完成的議事場。雅典娜問：勝利以後，誰有權讓別人閉嘴？',
 '共同的約定才剛寫下，補給港便遭狂潮威脅。你們選擇為身後的人折返。',
 '港口保住了，天梯再次開啟。神后要求你承諾：勝利後，權力也能被收回。',
 '每位同行者都在誓言上留下記號。最後一段雲階，卻被烈日烤得無處藏身。',
 '你們輪流扶持，走到日輪之外。更古老的夜與天空，展現在微小的火把前。',
 '穿過星穹，舊王的神鐮映出另一種未來：推翻暴政的人，也可能成為新的暴君。',
 '你們拒絕重演舊王的循環，終於抵達雷霆之前。達蒙背上的種子，仍是最初那一袋。'
];
const originalLines=storyLines;
storyLines=function(n){const lines=originalLines(n);lines[0]=connections[n.id];lines[lines.length-1]='你們在這道防線前站定。'+n.hint;return lines;};
const originalFinish=finishScene;finishScene=function(){if(sceneState&&sceneState.index>=sceneState.lines.length&&state.mode==='campaign'){const j=progress();if(!j.read.includes(sceneState.n.id))j.read.push(sceneState.n.id);persist();}originalFinish();};
const aftermath=["守軍退走，種子保住了。當夜，一名逃亡者帶來採石場的求救。","鎖鏈被鑿斷，傷者被抬出山腹。通往鹽港的河道，成了撤離的希望。","水門開啟，難民登船。你留在岸上，護送尚未離開的人走向內陸。","徵兵令被攔下，醫者帶著藥箱加入。你們決定留下，守住已救出的人。","神旗降下，糧倉公開分配，守夜由各村輪替。凡界聯軍於此誕生。","封鎖被突破。伊里斯收下受難者名冊，開始懷疑神庭聽見的報告。","最後一位同行者走出雪霧。你們沿山路前往接應船隊所在的海灣。","漁船終於通過淺灘。人們靠岸時，才發現最後的口糧也已用盡。","果園向飢民開門。你要求留下種子與照料土地的人，讓豐收能夠延續。","證人說出判詞之外的故事。你們帶著容許質問的約定，前往避難海灣。","城門打開，老石匠卻倒在絞盤旁。今晚沒有凱歌，醫者將他的名字記下。","避難地終於安頓。你讓不願再戰的人留下，只帶自願者前往神域山門。","真實的呼喚穿過幻影。你承認自己害怕，同行者仍握住你的手。","你們放下金蘋果，聽完彼此的願望。今後的重要決定，不再由你獨斷。","三年征途後，十八歲的厄里昂解開盜火者的鐐銬。火種喚醒烙印，半神血脈終於甦醒；力量的用途，由他自己決定。","酒歌給了疲憊的人片刻安慰。你們扶起同伴，帶著新的勇氣走向河岸。","你沒有要求永生，只請活人能選擇下一步。渡口讓出一條通路。","達蒙把你從夢中喚醒。你帶著思念，重新走向仍需改變的世界。","你承諾不召集亡者作戰，也不以犧牲逼迫活人。冥后交出王殿的道路。","冥王允許通行。你帶著死者的名字離開，這次沒有回頭尋找他們的身影。","你們輪流承受衝擊，走過擎天者。你終於學會，把盾交給別人。","又過三年，厄里昂與同行者斬滅戰神降臨人間的神性戰軀。他拒絕繼承戰爭王座，以凡人意志重鑄神核。逆命者，從此誕生。","火把熄滅，森林得以保存。同行的小獸重新跟上糧車，隊伍走向議事場。","眾人寫下糧倉公開與權力可被質問的約定。遠方卻傳來港口遭難的消息。","你們為身後的人折返，守住港口。撤離船先於軍隊通過海王讓出的航道。","每位同行者在誓言上留名。你同意，違背約定的首領也必須交還權力。","遮陽布與水袋在人群中傳遞。你們終於走到日輪之外，看見第一點星光。","火把照亮彼此的面孔。古神退去，你們繼續走向王座前最後一道門。","神鐮映出的未來成為警告。你們守住共同的約定，拒絕成為新的暴君。","雷霆散去，你沒有走向王座。達蒙放下種子，神庭第一次允許凡人的異議進入議席。"];
nodes[14].story='三年征途後，十八歲的厄里昂在盜火者面前得知烙印的真相。';nodes[21].story='又過三年，戰神降下神性戰軀。厄里昂將與同行者共同打破神權不可戰勝的傳說。';
const originalSettle=settle;settle=function(){const fresh=battle?.done&&!settled;originalSettle();if(!fresh||!battle||resultBattle===battle)return;resultBattle=battle;if(state.mode==='campaign'&&battle.winner===0){if(battle.units.filter(u=>u.side===0).every(u=>u.hp>0))progress().safe=true;persist();}const won=battle.winner===0;if(battle.winner===0||battle.winner===1)globalThis.olympusResultSound?.(won?'victory':'defeat');dialog('戰鬥結束 · '+(won?'勝利':battle.winner===1?'戰敗':'平手'),won?(state.mode==='campaign'?aftermath[battle.nodeId]+' 已通關 '+state.cleared+' / 30。'+(state.cleared===30?'凡人的黎明已到來。':'下一站：'+nodes[state.node].name)+'。本場獎勵已計入存檔；重打不重複領取首勝解鎖。':'自由試陣完成，不影響戰役進度。'):'本次未通關，征途仍在繼續。',jb('result-close','查看戰場')+(won?jb('result-retry','再次戰鬥'):'')+'<button data-action="battleReplay" '+(canOpenBattleReplay()?'':'disabled')+'>戰鬥回放</button>'+jb('result-next',won?'返回營地／準備下一戰':'回營調整','primary'));panel.classList.add('battle-end-modal');if(battle.winner===0||battle.winner===1)panel.insertAdjacentHTML('afterbegin','<div class="result-mascot '+(won?'mascot-victory':'mascot-defeat')+'" role="img" aria-label="'+(won?'Q 版戰士開心舉拳慶祝勝利':'Q 版戰士眼睛打 X，趴在框邊')+'"></div>');panel.insertAdjacentHTML('beforeend',battleGrowthReport(battle));if(won&&state.mode==='campaign'){const story=aftermath[battle.nodeId],body=panel.querySelector(':scope > p');body.textContent=body.textContent.slice(story.length).trim();const reading=document.createElement('section');body.before(reading);mountStoryReading(reading,[story],4200);}};
render();
})();

/* Five painted realms, decoded before a 5-second title-screen rotation. */
(()=>{
const realms=[['sky','奧林帕斯 · 雲海天庭'],['sea','潮汐神庭 · 愛琴王座'],['sun','日輪聖所 · 黃金階梯'],['snow','霜峰神殿 · 北風隘口'],['night','冥河王庭 · 永夜之門']];
let activeHost=null,clock=null,epoch=0;
function attach(){const host=document.querySelector('.title-screen');if(host===activeHost)return;activeHost=host;clearInterval(clock);clock=null;const serial=++epoch;if(!host)return;
const gallery=document.createElement('div');gallery.className='title-gallery';gallery.setAttribute('aria-hidden','true');gallery.innerHTML='<div class="title-realm visible"></div><div class="title-realm"></div>';host.prepend(gallery);
const caption=document.createElement('div');caption.className='realm-caption';caption.innerHTML='<span>01 / 05</span><strong>'+realms[0][1]+'</strong>';host.appendChild(caption);
host.querySelectorAll('.title-actions button').forEach(b=>{const text=b.textContent;b.textContent='';const span=document.createElement('span');span.textContent=text;b.appendChild(span);});
const layers=gallery.children;layers[0].style.backgroundImage='var(--realm-sky)';let index=0,shown=0;
Promise.all(realms.map(([key])=>new Promise(resolve=>{const img=new Image();img.onload=()=>img.decode().catch(()=>{}).then(()=>resolve(key));img.onerror=()=>resolve(null);img.src=OLYMPUS_ART.scenes[key];}))).then(ready=>{if(serial!==epoch||!host.isConnected)return;const usable=realms.filter(([key])=>ready.includes(key));if(usable.length<2)return;
clock=setInterval(()=>{if(serial!==epoch||!host.isConnected){clearInterval(clock);return;}if(document.hidden)return;index=(index+1)%usable.length;const next=1-shown;layers[next].style.backgroundImage='var(--realm-'+usable[index][0]+')';layers[next].classList.add('visible');layers[shown].classList.remove('visible');shown=next;caption.innerHTML='<span>'+String(index+1).padStart(2,'0')+' / '+String(usable.length).padStart(2,'0')+'</span><strong>'+usable[index][1]+'</strong>';},5000);
});}
new MutationObserver(attach).observe(app,{childList:true});attach();
})();



/* Manual selection changes the friendly actor, never grants extra actions. */
function orderedRound(b){const allies=active(b,0).sort((a,z)=>a.slot-z.slot),enemies=active(b,1).sort((a,z)=>a.slot-z.slot),q=[];for(let i=0;i<Math.max(allies.length,enemies.length);i++){if(allies[i])q.push(allies[i].uid);if(enemies[i])q.push(enemies[i].uid);}return q;}
function pendingActors(b){return b.queue.length?b.queue.filter(id=>b.units.some(u=>u.uid===id&&u.hp>0&&u.active)):b.round<50?orderedRound(b):[];}
function selectableActors(){if(!battle||battle.done)return [];const q=pendingActors(battle);if(!q.length||battle.units.find(u=>u.uid===q[0])?.side!==0)return [];return q.map(id=>battle.units.find(u=>u.uid===id)).filter(u=>u.side===0);}
(()=>{
 let commandPending=false,actorId=null,targetId=null,mode='attack',session=null;
 function resetSession(){if(session!==battle?.musicSession){session=battle?.musicSession;actorId=null;targetId=null;mode='attack';}}
 function actor(){return selectableActors().find(u=>u.uid===actorId);}
 function skillReady(u){return !!(u?.skill&&u.qi>=u.skill.cost&&!status(u,'silence')&&!status(u,'stun'));}
 function targetType(u){return mode==='skill'&&skillReady(u)?u.skill.target:'single';}
 function legal(u,v){if(!u||!v||v.hp<=0||!v.active)return false;const type=targetType(u);if(type==='self')return v.uid===u.uid;if(['lowAlly','allAlly'].includes(type))return v.side===u.side;if(v.side===u.side)return false;if(['allEnemy'].includes(type))return true;const taunts=active(battle,1-u.side).filter(x=>status(x,'taunt'));return !taunts.length||taunts.some(x=>x.uid===v.uid);}
 const oldUnit=unitHtml;unitHtml=function(u,slot){resetSession();let html=oldUnit(u,slot);if(!u)return html;const chosen=u.uid===actorId,aimed=u.uid===targetId,can=selectableActors().some(x=>x.uid===u.uid),a=actor();const classes=(chosen?'manual-actor ':'')+(aimed?'manual-target ':'')+(!playing&&!busy&&a&&legal(a,u)?'manual-eligible ':'')+(!playing&&can?'can-command ':'');html=html.replace('class="unit icon-unit','class="unit icon-unit '+classes);if(chosen||aimed)html=html.replace('</button>','<span class="manual-selection-label">'+(aimed?'攻擊目標':'已選出手者')+'</span></button>');return html;};
 const oldBattleView=battleView;battleView=function(){resetSession();if(!commandPending&&actorId&&!actor()){actorId=null;mode='attack';}const html=oldBattleView(),u=actor(),locked=busy||playing||commandPending||battle.done;const note=battle.done?'戰鬥結束':playing?'自動戰鬥中':commandPending?'交鋒中…':u?u.name+' · '+(mode==='skill'?u.skill.name:'普通攻擊')+'：點選亮框目標':selectableActors().length?'先點我方出手角色，再點敵方目標':'等待敵方行動，可按指揮按鈕繼續';const bar='<div class="direct-command"><span>'+esc(note)+'</span>'+(u&&!locked?'<div class="row"><button data-direct-mode="attack" class="'+(mode==='attack'?'active':'')+'">普攻</button><button data-direct-mode="skill" '+(!skillReady(u)?'disabled':'')+' class="'+(mode==='skill'?'active':'')+'">'+esc(u.skill?.name||'無奧義')+'</button><button data-direct-mode="cancel">取消選取</button></div>':'')+'</div>';if(mobilePortraitLayout()){const exit='<div class="mobile-battle-exit"><button data-action="'+(battle.done?'continue':'leave')+'" '+(playing||busy?'disabled':'')+'>'+(battle.done?'返回營地':'撤退')+'</button></div>';return html.replace('<div class="battle-controls">','<div class="battle-controls">'+bar+exit);}return html.replace('<div class="round-controls">',bar+'<div class="round-controls">');};
 async function enemyReply(){while(battle&&!battle.done&&!playing){const q=pendingActors(battle);if(!q.length||battle.units.find(u=>u.uid===q[0])?.side===0)break;if(!await presentNextAction())break;}}
 document.addEventListener('click',async e=>{
  if(!battle||battle.done||playing||busy||commandPending||(mobilePortraitLayout()&&!globalThis.mobileManualBattle))return;
  const toggle=e.target.closest('[data-direct-mode]'),card=e.target.closest('[data-action="unit"]');if(!toggle&&!card)return;
  resetSession();if(toggle){if(toggle.disabled)return;mode=toggle.dataset.directMode;if(mode==='cancel'){actorId=null;mode='attack';}render();return;}
  const v=battle.units.find(x=>x.uid===card.dataset.id);if(!v)return;
  e.stopImmediatePropagation();globalThis.olympusAudio?.click();battleSelected=v.uid;if(mobilePortraitLayout())updateMobileCardDock();
  const u=actor();
  if(u&&legal(u,v)&&(v.side!==0||mode==='skill')){
   targetId=v.uid;commandPending=true;const current=battle.musicSession;render();
   try{battle.command={uid:u.uid,skill:mode==='skill',target:v.uid};await presentNextAction();await enemyReply();}
   finally{if(battle?.musicSession===current)delete battle.command;actorId=null;targetId=null;mode='attack';commandPending=false;render();}
   return;
  }
  if(v.side===0&&selectableActors().some(x=>x.uid===v.uid)){actorId=v.uid;targetId=null;mode='attack';}
  else if(u&&v.side===1)toast(v.hp<=0?'這名角色已倒下':!v.active?'替補尚未上場':'敵方嘲諷生效，請選擇亮框目標。');
  render();
 },true);
 step=function(){if(busy||playing||commandPending||!battle||battle.done)return;if(selectableActors().length){toast('先點我方出手角色，再點敵方目標。');return;}return enemyReply();};
 render();
})();

document.addEventListener('click',e=>{if(!e.target.closest('[data-action="play"]')||playing||!battle||battle.done)return;const q=battle.queue;for(const side of [0,1]){const positions=[];const units=[];q.forEach((id,i)=>{const u=battle.units.find(x=>x.uid===id);if(u?.side===side){positions.push(i);units.push(u);}});units.sort((a,b)=>a.slot-b.slot);positions.forEach((at,i)=>q[at]=units[i].uid);}},true);



/* The live board remains visible: launch, travel, impact, then numerical results. */
function vfxCell(kind,element){if(kind==='heal')return 8;if(kind==='shield')return 9;if(kind==='cleanse')return 10;if(kind==='buff')return 11;if(kind==='debuff')return 7;return Math.max(0,ELEMENTS.indexOf(element));}
async function animateTargetEffects(actor,events,epoch,skillProjectile=false){
if(!skillProjectile&&events.some(e=>e.kind==='cast'))return animateSkillSequence(actor,events,epoch);
const board=document.querySelector('.battle-board');if(!board||!actor)return true;
const rawTargets=events.filter(e=>e.target&&['damage','heal','shield','buff','debuff','cleanse'].includes(e.kind));if(!rawTargets.length)return true;const targets=skillProjectile?[...rawTargets.reduce((map,e)=>{const old=map.get(e.target);if(!old||e.kind==='damage')map.set(e.target,e);return map;},new Map()).values()]:rawTargets;
const find=uid=>board.querySelector('[data-action="unit"][data-id="'+uid+'"]');const source=find(actor.uid);if(!source)return true;
const host=document.getElementById('stageOverlay');const rect=board.getBoundingClientRect();Object.assign(host.style,{left:rect.left+'px',top:rect.top+'px',width:rect.width+'px',height:rect.height+'px'});host.innerHTML='<div class="target-vfx-layer"></div>';const layer=host.firstElementChild;
const reduced=document.documentElement.classList.contains('quiet-motion')||matchMedia('(prefers-reduced-motion: reduce)').matches;const duration=reduced?160:Math.max(delay===60?160:480,motionDuration('skill')*.52);
const sourceRect=source.getBoundingClientRect();const start={x:sourceRect.left+sourceRect.width/2-rect.left,y:sourceRect.top+sourceRect.height/2-rect.top};
CombatAudio.sound(actor,'launch',skillProjectile,events);const signature=Array.from(actor.skill?.name||actor.name).reduce((n,c)=>n+c.codePointAt(0),0);const arc=(signature%3-1)*48;const seen=new Set();const hits=[];
for(const e of targets){const cell=vfxCell(e.kind,e.element||actor.element),key=e.target+'-'+cell;if(seen.has(key))continue;seen.add(key);const target=find(e.target);if(!target)continue;const r=target.getBoundingClientRect(),end={x:r.left+r.width/2-rect.left,y:r.top+r.height/2-rect.top};const angle=Math.atan2(end.y-start.y,end.x-start.x)*180/Math.PI;
const sprite=document.createElement('i');sprite.className='target-projectile';sprite.style.setProperty('--cell-x',cell%4*100/3+'%');sprite.style.setProperty('--cell-y',Math.floor(cell/4)*50+'%');sprite.style.left=start.x+'px';sprite.style.top=start.y+'px';layer.appendChild(sprite);
sprite.animate([{transform:`translate(-50%,-50%) rotate(${angle}deg) scale(.3)`,opacity:0},{transform:`translate(-50%,-50%) rotate(${angle}deg) scale(.8)`,opacity:1,offset:.18},{transform:`translate(calc(-50% + ${(end.x-start.x)*.55+arc}px),calc(-50% + ${(end.y-start.y)*.55}px)) rotate(${angle}deg) scale(.9)`,opacity:1,offset:.58},{transform:`translate(calc(-50% + ${end.x-start.x}px),calc(-50% + ${end.y-start.y}px)) rotate(${angle}deg) scale(1)`,opacity:1}],{duration,easing:'cubic-bezier(.3,.1,.6,1)',fill:'forwards'});hits.push({end,cell,target});}
if(!await waitPresentation(duration,epoch))return false;CombatAudio.sound(actor,'impact',skillProjectile,events);layer.innerHTML='';
for(const {end,cell} of hits){if(actor.element==='冰')iceShatter(layer,end.x,end.y,450,reduced);const burst=document.createElement('i');burst.className='target-impact';burst.style.left=end.x+'px';burst.style.top=end.y+'px';burst.style.setProperty('--cell-x',cell%4*100/3+'%');burst.style.setProperty('--cell-y',Math.floor(cell/4)*50+'%');layer.appendChild(burst);burst.animate([{transform:'translate(-50%,-50%) scale(.35)',opacity:.1},{transform:'translate(-50%,-50%) scale(1.15)',opacity:1,offset:.4},{transform:'translate(-50%,-50%) scale(1.35)',opacity:0}],{duration:reduced?160:450,fill:'forwards'});}
// Hand off at contact so HP and floating numbers appear during the impact burst.
return true;
}


/* Story-derived alliances. All links and values are original game adaptations. */
const BOND_KINDS={attack:{name:'並肩之力',desc:'自身攻擊 +10%',value:.1},defense:{name:'守望之盾',desc:'自身防禦 +15%',value:.15},refund:{name:'回氣',desc:'奧義結算後回復 1 氣',value:1},charge:{name:'增氣',desc:'普攻額外獲得 1 氣',value:1}};
const BOND_GOD_LINKS=[
 ['赫拉','雅典娜','普羅米修斯'],['特里同','勒烏科忒亞','安菲特里忒'],['珀耳塞福涅','塔納托斯','修普諾斯'],['狄刻','歐諾彌亞','厄瑞涅'],['福波斯','得摩斯','厄倪俄'],['阿斯克勒庇俄斯','許癸厄亞','阿提蜜絲'],['阿波羅','塞勒涅','阿里斯泰俄斯'],['宙斯','俄匊斯','狄刻'],['珀耳塞福涅','普路托斯','普里阿波斯'],['伊里斯','勒烏科忒亞','索忒里亞'],['普羅米修斯','赫斯提亞','雅典娜'],['厄里斯','菲洛忒斯','歐芙洛緒涅'],['帕西忒亞','歐芙洛緒涅','赫斯提亞'],['得墨忒耳','赫菲斯托斯','索忒里亞'],['黑帝斯','得墨忒耳','赫卡忒'],['珀耳塞福涅','塞勒涅','尼克斯'],['塞勒涅','厄俄斯','阿波羅'],['赫利俄斯','阿提蜜絲','赫卡忒'],['赫利俄斯','塞勒涅','埃爾庇斯'],['瑞亞','烏拉諾斯','宙斯'],['克洛諾斯','宙斯','蓋亞'],['烏拉諾斯','瑞亞','得墨忒耳'],['蓋亞','克洛諾斯','阿特拉斯'],['厄瑞玻斯','塔納托斯','修普諾斯'],['尼克斯','埃忒耳','黑帝斯'],['尼克斯','厄瑞玻斯','赫利俄斯'],['赫菲斯托斯','阿特拉斯','埃爾庇斯'],['普羅米修斯','烏拉諾斯','蓋亞'],['修普諾斯','尼克斯','黑帝斯'],['塔納托斯','摩耳甫斯','帕西忒亞']
];
const BOND_CHIEF_PATRONS=["宙斯","赫密士","赫拉","阿芙蘿黛蒂","阿瑞斯","阿瑞斯","阿瑞斯","雅典娜","狄刻","阿波羅","阿波羅","阿波羅","阿波羅","阿波羅","阿波羅","修普諾斯","修普諾斯","修普諾斯","克洛諾斯","雅典娜","阿芙蘿黛蒂","赫密士","阿芙蘿黛蒂","赫拉","普羅米修斯","赫斯提亞","珀耳塞福涅","得墨忒耳","得墨忒耳","普羅米修斯","普羅米修斯","阿瑞斯","雅典娜","雅典娜","雅典娜","珀耳塞福涅","珀耳塞福涅","黑帝斯","阿波羅","雅典娜","阿波羅","戴歐尼修斯","戴歐尼修斯","戴歐尼修斯","阿芙蘿黛蒂","阿波羅","烏拉諾斯","阿芙蘿黛蒂","戴歐尼修斯","修普諾斯","阿特拉斯","赫密士","波賽頓","赫密士","波賽頓","波賽頓","波賽頓","波賽頓","波賽頓","波賽頓","波賽頓","勒烏科忒亞","波賽頓","波賽頓","黑帝斯","波賽頓","阿提蜜絲","得墨忒耳","勒烏科忒亞","波賽頓"];
const BOND_GOD_THEMES=['神庭的新約','潮汐救援','冥河的界線','議事場的約定','恐懼與戰火','日光與醫者','銀月護林','誓言的見證','穀種與春歸','流亡者的道路','鐐銬化為工具','金蘋果之後','狂歡與歸途','守夜的爐火','兩個世界的承諾','冥路的火炬','日輪之外','月下引路','長夜初醒','拒絕王朝循環','守護下一代','大地承托','天地的重量','夜與天之間','深淵同行','微光匯聚','火種的責任','共同承擔','亡者安寧','夢醒的選擇'];
const BOND_BONUSES={might:{name:'神意共鳴',desc:'自身造成傷害 +15%'},guard:{name:'誓約庇護',desc:'自身承受傷害 −15%'},mercy:{name:'生命回響',desc:'自身施加的治療與護盾 +20%'},oppress:{name:'神域壓制',desc:'敵方全體造成傷害 −10%'},expose:{name:'破陣神諭',desc:'敵方全體承受傷害 +10%'}};
function installBonds(){const resolve=name=>cards.find(c=>c.rarity===4&&c.name===name)||cards.find(c=>c.patronName===name);const kinds=Object.keys(BOND_KINDS);
for(const c of cards){if(c.id===HERO_ID||c.limited||c.humanRebel)continue;c.bonds=[];if(c.rarity===2){const i=Number(c.id.slice(1))-1,clan=Math.floor(i/15),job=i%5;c.bonds=[{partner:'G'+String(clan*10+[0,2,5,6,3][job]+1).padStart(3,'0'),type:job===0?'defense':job===4?'refund':'attack',title:'調度與執行',story:'中階管理者與同族民兵共同維持撤離與防線。'},{partner:'B'+String(clan*15+Math.floor(i%15/5)*5+(job+1)%5+1).padStart(3,'0'),type:'defense',title:'跨職協調',story:'同一駐地的管理者互相接應，補足各自職責。'}];continue;}if(!c.rarity)continue;const i=Number(c.id.slice(1))-1;if(c.rarity===1){const partner=cards.find(p=>p.rarity===1&&p.species===c.species&&Number(p.id.slice(1))-1===Math.floor(i/10)*10+(i%10+1)%10);c.bonds=[{partner:partner.id,type:kinds[i%3],title:'同族守望',story:c.species+'的不同兵種在採石場與流亡路上互相掩護。'}];}
if(c.rarity===3){const kin=cards.filter(p=>p.rarity===1&&p.species===c.species);const cohort=cards.filter(p=>p.rarity===3&&Math.floor((Number(p.id.slice(1))-1)/10)===Math.floor(i/10));const partner=resolve(BOND_CHIEF_PATRONS[i]);c.bonds=[{partner:kin[i%kin.length].id,type:kinds[i%4],title:'氏族的回應',story:'原創結盟：'+c.species+'民兵回應首領，將神話權能用來保護同行者。'},{partner:partner.id,type:kinds[(i+1)%4],title:'征途盟約',story:'故事延伸：承接'+c.patronName+'意象的首領，與'+BOND_CHIEF_PATRONS[i]+'在征途、神庭試煉與互援誓約中建立連結。'}];}
if(c.rarity===4){c.bonds=BOND_GOD_LINKS[i].map((name,j)=>({partner:resolve(name).id,type:j===0?'attack':j===1?'defense':i%2?'charge':'refund',title:BOND_GOD_THEMES[i]+'・'+(j+1),story:'故事延伸：'+c.name+'與'+name+'的意象，連結「'+BOND_GOD_THEMES[i]+'」。若對應紫卡，夥伴是承接該意象的氏族首領。'}));c.bondBonus=['might','oppress','oppress','guard','might','mercy','expose','oppress','mercy','guard','guard','oppress','might','guard','mercy','oppress','might','mercy','mercy','might','guard','guard','oppress','oppress','expose','guard','might','guard','expose','oppress'][i];}}
}
function bondInfo(b,u){const links=(u.bonds||CARD[u.id]?.bonds||[]);const present=u.hp>0&&u.active;const living=present?b.units.filter(x=>x.side===u.side&&x.hp>0&&x.active):[];const on=links.filter(link=>link.self?present:living.some(x=>x.id===link.partner&&x.uid!==u.uid));const totals={attack:0,defense:0,refund:0,charge:0};for(const l of on)totals[l.type]+=BOND_KINDS[l.type].value;return {links,on,...totals,bonus:u.rarity===4&&on.length===3?CARD[u.id].bondBonus:null};}
function bondAttack(b,u){return u.atk*(1+bondInfo(b,u).attack);}
function bondDefense(b,u){return u.def*(1+bondInfo(b,u).defense);}
function bondDamageFactor(b,u,v){const a=bondInfo(b,u),d=bondInfo(b,v);const enemyWeak=active(b,1-u.side).some(x=>bondInfo(b,x).bonus==='oppress');const exposed=active(b,1-v.side).some(x=>bondInfo(b,x).bonus==='expose');return (a.bonus==='might'?1.15:1)*(d.bonus==='guard'?.85:1)*(enemyWeak?.9:1)*(exposed?1.1:1);}
function bondSupportFactor(b,u){return bondInfo(b,u).bonus==='mercy'?1.2:1;}
function bondGain(b,u,type){if(!u.skill||u.hp<=0)return;const n=bondInfo(b,u)[type],before=u.qi;u.qi=Math.min(u.skill.cost,u.qi+n);if(u.qi>before){emit(b,{kind:'notice',target:u.uid,label:'羈絆 '+(type==='refund'?'回氣':'增氣')+' +'+(u.qi-before)});b.log.push(u.name+' 的羈絆'+(type==='refund'?'回氣':'增氣')+' +'+(u.qi-before));}}
installBonds();
(()=>{
const oldDetail=detail;detail=function(c,live=null){const html=oldDetail(c,live);if(!c)return html;const party=live&&battle?battle:{units:state.lineups[state.mode].map((id,slot)=>id?{...CARD[id],uid:'preview-'+slot,side:0,slot,active:slot<6,hp:1}:null).filter(Boolean)};const subject=live||party.units.find(x=>x.id===c.id)||{...c,uid:'unplaced',side:0,active:false,hp:1};const info=bondInfo(party,subject);const box=`<section class="bond-panel"><h3>羈絆 ${info.on.length} / ${info.links.length}</h3>${!c.rarity?'<p>白卡無羈絆。</p>':'<p class="meta">'+(c.id===HERO_ID?'自身上場且存活即啟動，不需任何夥伴；候補及陣亡時停用，復活後恢復。':'同方上場且存活才啟動；候補不計。夥伴死亡即解除。')+(!live?'以下為戰役編隊預覽。':'')+'</p>'+info.links.map(l=>`<article class="bond-link ${info.on.includes(l)?'bond-on':''}"><strong>${info.on.includes(l)?'◆ 啟動':'◇ 未啟動'} · ${l.title}</strong><p>${l.self?'條件：厄里昂自身上場且存活':'夥伴：'+esc(CARD[l.partner].name)}</p><p>${BOND_KINDS[l.type].desc}</p><small>${esc(l.story)}</small>${l.self?'':`<button class="small" data-bond-inspect="${l.partner}">查看夥伴</button>`}</article>`).join('')}${c.rarity===4?`<div class="bond-complete ${info.bonus?'bond-on':''}"><strong>三羈絆全滿 · ${BOND_BONUSES[c.bondBonus].name}</strong><p>${BOND_BONUSES[c.bondBonus].desc}</p><small>同類敵方光環不疊加；任一連結中斷立即消失。</small></div>`:''}${live?`<p>羈絆後攻擊 ${Math.round(bondAttack(party,subject))} · 防禦 ${Math.round(bondDefense(party,subject))}</p>`:''}</section>`;const at=html.lastIndexOf('</div>');return html.slice(0,at)+box+html.slice(at);};
document.addEventListener('click',e=>{const btn=e.target.closest('[data-bond-inspect]');if(!btn)return;const c=CARD[btn.dataset.bondInspect];const d=document.getElementById('detail');d.className='bond-dialog';d.innerHTML='<h2>'+esc(c.name)+'</h2>'+detail(c)+'<button data-action="close">關閉</button>';if(!d.open)d.showModal();});
const oldRules=rules;rules=function(){return oldRules()+`<article class="panel panel-pad bond-rules"><h3>羈絆與神意共鳴</h3><p>白卡 0 條、綠卡 1 條、藍卡 2 條、紫卡 2 條、橙卡 3 條。厄里昂的羈絆僅要求自身上場且存活，依成長形態解鎖 1／2／3 條，不需夥伴。其他角色每條指定一名夥伴；雙方須同隊、上場且存活。候補進場後才參與，死亡即解除。</p><p>攻擊 +10%；防禦 +15%；回氣＝奧義結束後 +1 氣；增氣＝普攻額外 +1 氣。氣不超過技能上限。已取得的氣不會因羈絆解除而倒扣，後續加成停止。</p><p>橙卡三條同時啟動，取得卡面列出的持續增益或敵方光環；死亡或任一夥伴離場即解除。同類敵方光環只取一次。羈絆是依本作故事設計的原創結盟，不代表原典親屬關係。</p></article>`;};render();
})();



// Reconcile battle DOM in place: native scrollbar handles and focus retain their nodes.
function paintBattleApp(markup){
 if(!battle||!app.querySelector('.battle-layout')){const handX=app.querySelector('.formation-workspace .catalog')?.scrollLeft||0;app.innerHTML=markup;const hand=app.querySelector('.formation-workspace .catalog');if(hand)hand.scrollLeft=handX;animateHealthBars(app);return;}
 const savedScroll=[...app.querySelectorAll('.battle-overview,.battle-sidebar,.inspector-panel,.battle-inspector,.manual-command,.battle-record,.log,.battle-board,.battle-bonds')].map(el=>({el,x:el.scrollLeft,y:el.scrollTop}));
 const template=document.createElement('template');template.innerHTML=markup;
 const key=n=>n.nodeType===1?(n.id||n.getAttribute('data-scroll-key')||n.getAttribute('data-uid')||[n.tagName,n.getAttribute('data-action')||'',n.getAttribute('data-id')||'',n.classList[0]||''].join('|')):'#'+n.nodeType;
 function sync(old,fresh){
  if(old.nodeType!==fresh.nodeType||old.nodeName!==fresh.nodeName){old.replaceWith(fresh.cloneNode(true));return;}
  if(old.nodeType!==1){if(old.nodeValue!==fresh.nodeValue)old.nodeValue=fresh.nodeValue;return;}
  if(old.classList.contains('living-card-host')&&old.dataset.livingCard===fresh.dataset.livingCard)return;
  const x=old.scrollLeft,y=old.scrollTop;
  for(const a of [...old.attributes])if(!fresh.hasAttribute(a.name))old.removeAttribute(a.name);
  for(const a of fresh.attributes)if(old.getAttribute(a.name)!==a.value)old.setAttribute(a.name,a.value);
  let cursor=old.firstChild;
  for(const child of fresh.childNodes){
   let match=cursor;while(match&&key(match)!==key(child))match=match.nextSibling;
   if(!match){old.insertBefore(child.cloneNode(true),cursor);continue;}
   if(match!==cursor)old.insertBefore(match,cursor);
   sync(match,child);cursor=match.nextSibling;
  }
  while(cursor){const next=cursor.nextSibling;cursor.remove();cursor=next;}
  if(old.scrollLeft!==x)old.scrollLeft=x;if(old.scrollTop!==y)old.scrollTop=y;
 }
 const root=document.createElement('div');root.id=app.id;root.append(template.content);sync(app,root);
 // Restore after the complete tree is updated, without removing the viewport layout's #app anchor.
 for(const {el,x,y} of savedScroll)if(el.isConnected){if(el.scrollLeft!==x)el.scrollLeft=x;if(el.scrollTop!==y)el.scrollTop=y;}
 animateHealthBars(app);
}
function chapterBattleArt(n){
 const key='chapter-'+String(n.id+1).padStart(2,'0'),rows=Math.ceil(storyLines(n).length/2),ratio=globalThis.OLYMPUS_SHOT_RATIOS?.[key]||1;
 return '<div class="chapter-battle-art" aria-hidden="true" style="--chapter-image:var(--art-'+key+');--chapter-rows:'+rows+';--shot-ratio:'+ratio+'"></div>';
}
function battleTerrainHud(n){return '<div class="terrain-hud-wrap" data-scroll-key="terrain">'+terrainBox(TERRAINS[n.terrain])+'</div>';}


// Reorder only allied action slots; enemy order, targeting and per-round eligibility remain intact.
function prioritizeCounterActor(b){
 const head=b.units.find(u=>u.uid===b.queue[0]);if(!head||head.side!==0)return;
 const score=u=>{
  if(status(u,'stun'))return -1;
  const skill=u.skill&&u.qi>=u.skill.cost&&u.auto&&!status(u,'silence')?u.skill:null;
  if(skill&&skill.power===0)return 1;
  const targets=pick(b,u,skill?.target||'single').filter(v=>v.side!==u.side);
  return targets.length?targets.reduce((sum,v)=>sum+advantage(u.element,v.element),0)/targets.length:1;
 };
 const candidates=b.queue.map(uid=>b.units.find(u=>u.uid===uid)).filter(u=>u&&u.side===0&&u.hp>0&&u.active);
 candidates.sort((a,z)=>score(z)-score(a)||a.slot-z.slot);
 if(!candidates.length)return;const at=b.queue.indexOf(candidates[0].uid);
 [b.queue[0],b.queue[at]]=[b.queue[at],b.queue[0]];
}
function battleBondSummary(){
 const group=side=>{
  const units=active(battle,side).map(u=>({u,b:bondInfo(battle,u)})).filter(x=>x.b.on.length);
  if(!units.length)return '<p class="meta">目前沒有生效羈絆。</p>';
  return units.map(({u,b})=>{
   const effects=[];
   if(b.attack)effects.push('攻擊 +'+Math.round(b.attack*100)+'%（'+Math.round(bondAttack(battle,u))+'）');
   if(b.defense)effects.push('防禦 +'+Math.round(b.defense*100)+'%（'+Math.round(bondDefense(battle,u))+'）');
   if(b.refund)effects.push('奧義後回氣 +'+b.refund);
   if(b.charge)effects.push('普攻額外增氣 +'+b.charge);
   return '<article class="bond-summary-card" data-scroll-key="bond-'+u.uid+'"><strong>'+esc(u.name)+'</strong><small>'+b.on.length+' / '+b.links.length+' 條啟動 · 自身加成</small><p>'+effects.join('<br>')+'</p>'+b.on.map(l=>'<span class="bond-summary-link">'+esc(l.title)+' ↔ '+esc(CARD[l.partner].name)+'</span>').join('')+(b.bonus?'<div class="bond-summary-bonus">◆ '+BOND_BONUSES[b.bonus].name+'<br>'+BOND_BONUSES[b.bonus].desc+'</div>':'')+'</article>';
  }).join('');
 };
 return '<section class="battle-bonds" data-scroll-key="battle-bonds"><h3>羈絆加成</h3><p class="meta">僅計同方存活且上場角色；連結中斷即解除。氣不超過角色上限。</p><h4>我方 · 生效效果</h4>'+group(0)+'<h4>敵方 · 生效效果</h4>'+group(1)+'<p class="meta">橙卡同類敵方光環不疊加；括號數值僅計羈絆，未含其他戰鬥狀態。</p></section>';
}

// Replay stores immutable combat states only; reading it never runs settlement or alters saves.
var battleRecording=null,fastBattleRequested=false,replaySession=null,replayRaf=0;
function replaySnapshot(b){return {round:b.round,done:b.done,winner:b.winner,last:b.last?JSON.parse(JSON.stringify(b.last)):null,events:JSON.parse(JSON.stringify(b.events||[])),units:b.units.map(u=>({id:u.id,uid:u.uid,side:u.side,slot:u.slot,origin:u.origin,ascension:u.ascension||0,active:u.active,hp:u.hp,max:u.max,qi:u.qi,shield:u.shield,status:JSON.parse(JSON.stringify(u.status))}))};}
function beginBattleRecording(b){fastBattleRequested=false;battleRecording={nodeId:b.nodeId,frames:[{time:0,...replaySnapshot(b)}]};}
function recordBattleFrame(b){if(!battleRecording||battleRecording.nodeId!==b.nodeId)return;const frames=battleRecording.frames;frames.push({time:frames.at(-1).time+((b.events||[]).some(e=>e.kind==='cast')?3:1.5),...replaySnapshot(b)});}
function requestFastBattle(){if(!battle||battle.done)return;fastBattleRequested=true;pause();if(battleOpening){battleOpening=false;cancelPresentation();document.querySelectorAll('.battle-start-countdown').forEach(el=>el.remove());void finishFastBattle();return;}if(busy){toast('目前動作完成後，立即結算剩餘戰鬥。');return;}void finishFastBattle();}
async function finishFastBattle(){
 if(!battle||battle.done||busy){if(!battle||battle.done)fastBattleRequested=false;return;}
 fastBattleRequested=false;pause();busy=true;updatePlaybackControls();
 const current=battle;try{
  if(!battleRecording)beginBattleRecording(current);
  delete current.command;delete current.manualSkill;current.autoPriority=true;
  // Restore the remaining NPC action slots to their established order.
  const indices=[];const enemies=[];current.queue.forEach((id,i)=>{const u=current.units.find(x=>x.uid===id);if(u?.side===1){indices.push(i);enemies.push(u);}});enemies.sort((a,b)=>a.slot-b.slot);indices.forEach((at,i)=>current.queue[at]=enemies[i].uid);
  let count=0;while(!current.done){nextAction(current);current.impactUnits=null;recordBattleFrame(current);if(++count%40===0)await new Promise(resolve=>setTimeout(resolve,0));}
  liveFx=[];entryUids=[];announcedRound=current.round;settle();
 }catch(err){console.error(err);toast('快速結算中斷，已保留目前戰況。');}finally{busy=false;render();updatePlaybackControls();}
}
function replayTime(t){return Math.floor(t/60)+':'+String(Math.floor(t%60)).padStart(2,'0');}
function closeBattleReplay(){cancelAnimationFrame(replayRaf);replayRaf=0;replaySession=null;document.getElementById('battle-replay-dialog')?.close();}
function openBattleReplay(){
 if(!canOpenBattleReplay())return;pause();
 let modal=document.getElementById('battle-replay-dialog');if(!modal){modal=document.createElement('dialog');modal.id='battle-replay-dialog';document.body.append(modal);modal.addEventListener('cancel',e=>{e.preventDefault();closeBattleReplay();});}
 const frames=battleRecording.frames.map(f=>f),n=nodes[battleRecording.nodeId];
 replaySession={frames,nodeId:n.id,time:0,index:-1,playing:false,rate:1,last:0};
 modal.innerHTML=`<header class="replay-header"><div><small>戰鬥紀錄 · 本次開啟遊戲期間的最近一場</small><h2>${esc(n.name)} · 戰鬥回放</h2></div><button data-replay="close">關閉回放</button></header><div class="replay-arena" style="${terrainFrameStyle(n)}--scene-image:${sceneArt(n)}"><div class="replay-enemy"></div><div class="replay-caption" aria-live="off"></div><div class="replay-ally"></div><div class="replay-effects" aria-hidden="true"></div></div><div class="replay-controls"><button data-replay="toggle" aria-label="播放回放">▶ 開始</button><div class="replay-track"><input id="replay-seek" type="range" aria-label="戰鬥回放時間" min="0" max="${frames.at(-1).time}" step="0.05" value="0"><div><span id="replay-time">0:00</span><span>${replayTime(frames.at(-1).time)}</span></div></div><select id="replay-rate" aria-label="回放速度"><option value="0.5">½ 倍速</option><option value="1" selected>原速</option><option value="2">2 倍速</option></select></div><p class="replay-note">拖曳可前後查看每次行動、血量與氣的變化；時間為統一演出時間，不計原戰鬥暫停。回放不會重複發放獎勵。</p>`;
 modal.querySelector('[data-replay=close]').onclick=closeBattleReplay;
 modal.querySelector('[data-replay=toggle]').onclick=()=>{const r=replaySession;if(!r)return;if(r.time>=r.frames.at(-1).time)r.time=0;r.playing=!r.playing;r.last=0;drawBattleReplay();};
 modal.querySelector('#replay-seek').oninput=e=>{if(!replaySession)return;replaySession.playing=false;replaySession.time=+e.target.value;replaySession.last=0;drawBattleReplay();};
 modal.querySelector('#replay-rate').onchange=e=>{if(replaySession){replaySession.rate=+e.target.value;replaySession.last=0;}};
 modal.showModal();drawBattleReplay();cancelAnimationFrame(replayRaf);replayRaf=requestAnimationFrame(tickBattleReplay);
}
function tickBattleReplay(now){const r=replaySession;if(!r)return;if(r.playing&&r.last){r.time=Math.min(r.frames.at(-1).time,r.time+(now-r.last)/1000*r.rate);if(r.time>=r.frames.at(-1).time)r.playing=false;}r.last=now;if(r.playing||r.time===r.frames.at(-1).time)drawBattleReplay();replayRaf=requestAnimationFrame(tickBattleReplay);}
function drawBattleReplay(){
 const r=replaySession;if(!r)return;const modal=document.getElementById('battle-replay-dialog');let lo=0,hi=r.frames.length-1;while(lo<hi){const mid=Math.ceil((lo+hi)/2);if(r.frames[mid].time<=r.time)lo=mid;else hi=mid-1;}const frame=r.frames[lo];
 if(r.index!==lo){r.index=lo;
  const army=side=>'<div class="replay-team-label">'+(side?'神庭守軍':'凡界聯軍')+'</div><div class="replay-grid">'+(side?[6,7,8,3,4,5,0,1,2]:[0,1,2,3,4,5,6,7,8]).map(slot=>{const candidates=frame.units.filter(u=>u.side===side&&u.slot===slot),u=candidates.find(x=>x.hp>0)||candidates.at(-1);if(!u)return '<div class="replay-unit empty">'+(slot+1)+' · 空位</div>';const c=CARD[u.id];return `<div class="replay-unit r${c.rarity} ${u.hp<=0?'dead':''} ${!u.active?'waiting':''}" data-replay-uid="${u.uid}"><span class="replay-slot">${slot+1}${!u.active?' 候補':''}</span>${avatar({...c,side:u.side,ascension:u.ascension||0})}<div class="replay-unit-info"><strong>${esc(c.name)}</strong>${healthBarHtml(u,r.playing?r.frames[Math.max(0,lo-1)].units.find(v=>v.uid===u.uid):null)}<small>${u.hp} / ${u.max}${u.shield?' · 盾 '+u.shield:''}</small>${c.skill?qi(u.qi,c.skill.cost):'<small>普通攻擊</small>'}<small>${u.status.map(s=>STATUS[s.type]).join('、')}</small></div></div>`;}).join('')+'</div>';
  modal.querySelector('.replay-enemy').innerHTML=army(1);modal.querySelector('.replay-ally').innerHTML=army(0);animateHealthBars(modal,r.rate);
 }
 const next=r.frames[lo+1],progress=next?(r.time-frame.time)/(next.time-frame.time):1;
 const action=next?.last||frame.last,actor=action&&frame.units.find(u=>u.uid===action.actor);
 modal.querySelector('.replay-caption').textContent=next?(actor?`第 ${next.round} 回合 · ${CARD[actor.id].name} · ${action.skill}`:'雙方列陣'):frame.done?'戰鬥結束 · '+(frame.winner===0?'勝利':frame.winner===1?'戰敗':'平手'):'雙方列陣';
 modal.querySelector('#replay-seek').value=r.time;modal.querySelector('#replay-time').textContent=replayTime(r.time);const button=modal.querySelector('[data-replay=toggle]');button.textContent=r.playing?'Ⅱ 暫停':'▶ 開始';button.setAttribute('aria-label',r.playing?'暫停回放':'播放回放');
 const effects=modal.querySelector('.replay-effects');effects.replaceChildren();
 if(next&&actor&&next.events.some(e=>e.kind==='cast')){drawReplaySkill(modal,frame,next,actor,progress);return;}
 if(next&&actor&&progress>.12){const arena=modal.querySelector('.replay-arena').getBoundingClientRect(),source=modal.querySelector('[data-replay-uid="'+actor.uid+'"]')?.getBoundingClientRect();if(source){for(const uid of action.targets||[]){const target=modal.querySelector('[data-replay-uid="'+uid+'"]')?.getBoundingClientRect();if(!target)continue;const k=Math.min(1,Math.max(0,(progress-.18)/.57)),x=source.left+source.width/2+(target.left+target.width/2-source.left-source.width/2)*k-arena.left+modal.querySelector('.replay-arena').scrollLeft,y=source.top+source.height/2+(target.top+target.height/2-source.top-source.height/2)*k-arena.top+modal.querySelector('.replay-arena').scrollTop;const el=document.createElement('span');el.className='replay-energy'+(k===1?' is-impact':'');const artIndex=Math.max(0,ELEMENTS.indexOf(CARD[actor.id].element));el.style.cssText='--cell-x:'+(artIndex%4*100/3)+'%;--cell-y:'+(Math.floor(artIndex/4)*50)+'%;left:'+x+'px;top:'+y+'px;--energy:'+ELEMENT_COLORS[CARD[actor.id].element]+';transform:translate(-50%,-50%) scale('+(k===1?1.6:1)+')';effects.append(el);if(k===1){const hits=next.events.filter(e=>e.target===uid&&['damage','heal','shield'].includes(e.kind));if(hits.length){const label=document.createElement('b');label.className='replay-hit';label.style.cssText='left:'+x+'px;top:'+(y-25)+'px';label.textContent=hits.map(e=>(e.kind==='damage'?'−':'+')+(e.amount||e.absorbed||0)).join(' / ');effects.append(label);}}}}}
}
// The result modal is outside #app and its buttons have a separate event path.
document.addEventListener('click',e=>{const b=e.target.closest('[data-action="battleReplay"]');if(b&&!app.contains(b)&&!document.getElementById('detail').contains(b)){e.preventDefault();openBattleReplay();}});

function healthBarHtml(u,previous=null){
 const ratio=Math.max(0,Math.min(1,u.hp/u.max)),band=u.side?('enemy '+(ratio>.7?'enemy-healthy':ratio>.35?'wounded':ratio>0?'critical':'empty')):ratio>.7?'healthy':ratio>=.35?'wounded':ratio>0?'critical':'empty';
 return '<div class="bar health-meter '+band+'" role="progressbar" aria-label="生命" aria-valuemin="0" aria-valuemax="'+u.max+'" aria-valuenow="'+Math.max(0,u.hp)+'" data-hp-ratio="'+ratio+'"'+(previous?' data-hp-before="'+Math.max(0,Math.min(1,previous.hp/previous.max))+'"':'')+'><span class="hp-echo"></span><i class="hp-current" style="width:'+ratio*100+'%"></i></div>';
}
function animateHealthBars(root,rate=delay===60?3:1){
 const memory=animateHealthBars.memory||(animateHealthBars.memory=new WeakMap());
 const reduced=document.documentElement.classList.contains('quiet-motion')||window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 root.querySelectorAll('.health-meter').forEach(bar=>{
  const next=Number(bar.dataset.hpRatio),before=memory.has(bar)?memory.get(bar):bar.hasAttribute('data-hp-before')?Number(bar.dataset.hpBefore):next;
  memory.set(bar,next);if(before===next)return;
  const echo=bar.querySelector('.hp-echo'),fill=bar.querySelector('.hp-current');
  echo.getAnimations().forEach(a=>a.cancel());fill.getAnimations().filter(a=>a.effect?.getKeyframes().some(k=>'width' in k)).forEach(a=>a.cancel());
  if(reduced)return;
  const healing=next>before,duration=(healing?650:850)/rate;
  echo.animate([{width:(healing?next:before)*100+'%',opacity:.85,background:healing?'#c3ffdc':'#ffdaa0',filter:'blur(.5px)'},{width:(healing?next:before)*100+'%',opacity:.7,offset:.25},{width:next*100+'%',opacity:0,filter:'blur(2px)'}],{duration,easing:'ease-out'});
  fill.animate([{width:before*100+'%'},{width:next*100+'%'}],{duration:280/rate,easing:'ease-out'});
 });
}

function validCampSave(c){return !!c&&typeof c==='object'&&!Array.isArray(c)&&Number.isSafeInteger(c.embers)&&c.embers>=0&&c.embers<=1000000000&&['training','watch','supply'].every(k=>Number.isInteger(c[k])&&c[k]>=0&&c[k]<=5)&&Number.isInteger(c.stock)&&c.stock>=0&&c.stock<=99&&typeof c.prepared==='boolean';}
function campProgress(){if(!state.camp)state.camp={embers:0,training:0,watch:0,supply:0,stock:0,prepared:false};const c=state.camp;if(c.emberEconomyVersion!==2){c.emberCatchup=Math.max(0,Math.min(30,state.cleared||0))*900;c.embers=Math.min(1000000000,c.embers+c.emberCatchup);c.emberEconomyVersion=2;}return c;}
// Full-clear testing only: original 20x rewards, increased another 100x for collection testing.
const TEST_CAMPAIGN_REWARD_MULTIPLIER=20*100;
function awardEmbers(b){if(state.mode!=='campaign'||b.campRewarded)return;b.campRewarded=true;b.emberReward=0;b.soulRewards=[0,0,0,0,0];b.soulKills=[0,0,0,0,0];b.poolAdditions=[];b.spiritReward=0;b.spiritsUnlocked=false;b.rewardMultiplier=1;b.emberMultiplier=2;if(b.winner!==0){persist();return;}const c=campProgress(),r=ensureRecruitment(),fullClear=state.cleared>=nodes.length,soulMultiplier=fullClear?TEST_CAMPAIGN_REWARD_MULTIPLIER:1,emberMultiplier=2*(fullClear?TEST_CAMPAIGN_REWARD_MULTIPLIER:1);b.rewardMultiplier=soulMultiplier;b.emberMultiplier=emberMultiplier;b.campFirstWin=b.nodeId===state.cleared;b.emberBase=randomInt(540,660)*emberMultiplier;b.emberFirstBonus=b.campFirstWin?600*emberMultiplier:0;b.emberReward=b.emberBase+b.emberFirstBonus;c.embers=Math.min(1000000000,c.embers+b.emberReward);for(const u of b.units.filter(u=>u.side===1&&u.hp<=0)){const base=recruitRules().soulBase[u.rarity];b.soulKills[u.rarity]++;b.soulRewards[u.rarity]+=randomInt(Math.ceil(base*.8),Math.floor(base*1.2));}b.soulRewards=b.soulRewards.map(n=>n*soulMultiplier);r.souls=r.souls.map((n,i)=>Math.min(1000000000,n+b.soulRewards[i]));const d=ensureDivinity();for(const u of b.units.filter(u=>u.side===1&&u.hp<=0&&u.rarity>=3))b.spiritReward+=u.rarity===3?randomInt(8,12):randomInt(24,36);if(b.spiritReward){b.spiritsUnlocked=!d.unlocked;d.unlocked=true;d.spirits=Math.min(1000000000,d.spirits+b.spiritReward);}if(b.campFirstWin)b.poolAdditions=cards.filter(card=>card.poolUnlock===state.cleared+1&&!initial.includes(card.id)).map(card=>card.id);persist();}
function revisitPanel(){if(state.mode!=='campaign')return '';const fullClear=state.cleared>=nodes.length;return '<section class="revisit-panel"><h3>重返征途</h3><p>'+(fullClear?'全關通關測試模式已開啟：重打戰役勝利後餘燼 ×40、殘魂 ×20。':'全通關前：戰役餘燼 ×2、殘魂正常倍率；通關全部 30 關後，餘燼升為 ×40、殘魂升為 ×20。')+' 每勝基礎餘燼 540～660；新關首勝另加 600。首勝開池與起義加成不會重複發放。</p><div class="row"><select id="revisit-node" aria-label="選擇已開放關卡">'+nodes.slice(0,Math.min(state.cleared+1,30)).map(n=>'<option value="'+n.id+'" '+(n.id===state.node?'selected':'')+'>'+String(n.id+1).padStart(2,'0')+' · '+esc(n.name)+(n.id<state.cleared?' · 已突破':' · 目前征途')+'</option>').join('')+'</select><button data-action="revisit">前往布陣</button></div></section>';}
function battleGrowthReport(b){const report=battleRecruitRewards(b);if(state.mode!=='campaign'||b.winner===0)return report;const hints=[];if(b.units.filter(u=>u.side===0&&u.hp>0).length<=3)hints.push('這次交鋒中，聯軍防線承受了較大壓力。');if(b.round>=12)hints.push('戰事逐漸拉長，消耗成為重要的一環。');if(!hints.length)hints.push('這場交鋒留下了新的經驗，征途仍未結束。');return '<section class="defeat-direction" aria-labelledby="defeat-direction-title"><div class="defeat-direction-icon" aria-hidden="true">✦</div><div><span class="eyebrow">THE NEXT STEP</span><h3 id="defeat-direction-title">下一次出征 · 提升方向</h3><p>'+hints.slice(0,2).join(' ')+'</p><p class="defeat-direction-suggestion">'+(b.round>=12?'持續培養同行者，也許能為漫長的戰線帶來轉機。':'回到營地，重新看看隊伍的成長與彼此的配合。')+'</p></div></section>'+report;}
(function(){const originalFormation=formation,originalCampaign=campaign;campaign=function(){return originalCampaign()+revisitPanel();};})();


function skillSequenceRow(actor,kind){if(['heal','shield','buff','cleanse'].includes(kind))return 3;if(['水','冰','風'].includes(actor.element))return 1;if(['火','地'].includes(actor.element))return 2;return 0;}
function skillInvocationMarkup(actor,name){return '<div class="skill-invocation"><div class="skill-ghost">'+avatar(CARD[actor.id]||actor,'invocation-portrait')+'</div><div class="skill-title"><small>'+esc(actor.name)+' · 奧義</small><strong>'+esc(name)+'</strong></div></div>';}
async function showSkillInvocation(actor,cast,epoch){
 if(goldSkillRecord(actor,cast.name))return true;
 if(!actor)return showStage('cast',cast.name,'奧義',epoch);
 const board=document.querySelector('.battle-board'),source=board?.querySelector('[data-id="'+actor.uid+'"]');if(!board||!source)return true;
 const host=document.getElementById('stageOverlay'),r=board.getBoundingClientRect(),p=source.getBoundingClientRect();Object.assign(host.style,{left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px'});
 host.innerHTML='<div class="skill-cinematic-shade"></div>'+skillInvocationMarkup(actor,cast.name);const group=host.querySelector('.skill-invocation');
 const quiet=document.body.classList.contains('quiet-motion')||matchMedia('(prefers-reduced-motion: reduce)').matches;
 const hold=motionDuration('cast'),back=quiet?120:Math.round(hold*.6);group.animate([{opacity:0,transform:'scale(.82)'},{opacity:1,transform:'scale(1)'}],{duration:quiet?100:Math.round(hold*.35),fill:'forwards',easing:'ease-out'});
 if(!await waitPresentation(hold,epoch))return false;
 const x=p.left+p.width/2-r.left-r.width/2,y=p.top+p.height/2-r.top-r.height/2;
 group.animate(quiet?[{opacity:1},{opacity:0}]:[{transform:'translate(0,0) scale(1)',opacity:1},{transform:'translate('+x*.75+'px,'+y*.75+'px) scale(.25)',opacity:.6,offset:.75},{transform:'translate('+x+'px,'+y+'px) scale(.04)',opacity:0}],{duration:back,fill:'forwards',easing:'cubic-bezier(.55,.05,.8,.45)'});
 host.querySelector('.skill-cinematic-shade').animate([{opacity:1},{opacity:0}],{duration:back,fill:'forwards'});
 if(!await waitPresentation(back,epoch))return false;host.innerHTML='';return true;
}
function makeSkillSprite(layer,row,frame,x,y,size=180){const sprite=document.createElement('i');sprite.className='skill-sequence-sprite';sprite.style.cssText='--sequence-row:'+(row*100/3)+'%;background-position:'+(frame*20)+'% '+(row*100/3)+'%;left:'+x+'px;top:'+y+'px;width:'+size+'px;height:'+size+'px';layer.append(sprite);return sprite;}
async function animateSkillSequence(actor,events,epoch){
 const gold=goldSkillRecord(actor,actor?.skill?.name);if(gold){if(!await playGoldUltimate(actor,gold,epoch))return false;return animateTargetEffects(actor,events.filter(e=>e.kind!=='cast'),epoch,true);}
 const board=document.querySelector('.battle-board');if(!board||!actor)return true;const source=board.querySelector('[data-id="'+actor.uid+'"]');if(!source)return true;
 const host=document.getElementById('stageOverlay'),rect=board.getBoundingClientRect();Object.assign(host.style,{left:rect.left+'px',top:rect.top+'px',width:rect.width+'px',height:rect.height+'px'});host.innerHTML='<div class="target-vfx-layer skill-sequence-layer"></div>';const layer=host.firstElementChild;
 const quiet=document.body.classList.contains('quiet-motion')||matchMedia('(prefers-reduced-motion: reduce)').matches;
 const pr=source.getBoundingClientRect(),start={x:pr.left+pr.width/2-rect.left,y:pr.top+pr.height/2-rect.top},charge=quiet?90:motionDuration('skill')*.22,travel=quiet?110:motionDuration('skill')*.48;
 let targets=events.filter(e=>e.target&&['damage','heal','shield','buff','debuff','cleanse'].includes(e.kind));if(!targets.length)targets=pick(battle,actor,actor.skill?.target||'single').map(u=>({target:u.uid,kind:actor.skill?.power===0?'buff':'damage'}));
 const hits=[],seen=new Set();for(const event of targets){if(seen.has(event.target))continue;seen.add(event.target);const target=board.querySelector('[data-id="'+event.target+'"]');if(!target)continue;const p=target.getBoundingClientRect();hits.push({row:skillSequenceRow(actor,event.kind),x:p.left+p.width/2-rect.left,y:p.top+p.height/2-rect.top});}
 CombatAudio.sound(actor,'launch',true,events);const row=hits[0]?.row??skillSequenceRow(actor,'damage'),gather=makeSkillSprite(layer,row,0,start.x,start.y,200);
 gather.animate([{backgroundPosition:'0% '+row*100/3+'%',transform:'translate(-50%,-50%) scale(.45)',opacity:.4},{backgroundPosition:'20% '+row*100/3+'%',transform:'translate(-50%,-50%) scale(1.1)',opacity:1}],{duration:charge,easing:'steps(2,end)',fill:'forwards'});
 if(!await waitPresentation(charge,epoch))return false;gather.remove();
 for(const hit of hits){for(let trail=0;trail<(quiet?1:3);trail++){const sp=makeSkillSprite(layer,hit.row,2,start.x,start.y,trail?100:170),dx=hit.x-start.x,dy=hit.y-start.y;sp.animate([{transform:'translate(-50%,-50%) scale(.45)',opacity:trail?.3:1},{transform:'translate(calc(-50% + '+dx*.5+'px),calc(-50% + '+(dy*.5-36)+'px)) scale(.9)',opacity:trail?.25:1,offset:.5},{transform:'translate(calc(-50% + '+dx+'px),calc(-50% + '+dy+'px)) scale(1.1)',opacity:trail?0:1}],{duration:travel-trail*25,delay:trail*25,fill:'forwards',easing:'ease-in'});}}
 if(!await waitPresentation(travel,epoch))return false;CombatAudio.sound(actor,'impact',true,events);layer.replaceChildren();
 const impact=motionDuration('impact');if(actor.id===HERO_ID)heroHammerFinale(layer,hits,impact,quiet,Math.max(0,actor.rarity-1));for(const hit of hits){if(actor.element==='冰'&&hit.row!==3)iceShatter(layer,hit.x,hit.y,impact,quiet);skillFinale(layer,hit.row,hit.x,hit.y,null,impact,quiet);const burst=makeSkillSprite(layer,hit.row,3,hit.x,hit.y,230);burst.animate([{backgroundPosition:'60% '+hit.row*100/3+'%'},{backgroundPosition:'80% '+hit.row*100/3+'%',offset:.35},{backgroundPosition:'100% '+hit.row*100/3+'%',offset:.75},{backgroundPosition:'100% '+hit.row*100/3+'%'}],{duration:impact,easing:'steps(1,end)',fill:'forwards'});burst.animate([{transform:'translate(-50%,-50%) scale(.65)',opacity:1},{transform:'translate(-50%,-50%) scale(1.12)',opacity:1,offset:.35},{transform:'translate(-50%,-50%) scale(1.4)',opacity:0}],{duration:impact,fill:'forwards'});}
 return true;
}
function drawReplaySkill(modal,frame,next,actor,progress){
 const layer=modal.querySelector('.replay-effects'),arena=modal.querySelector('.replay-arena'),rect=arena.getBoundingClientRect(),source=modal.querySelector('[data-replay-uid="'+actor.uid+'"]')?.getBoundingClientRect();if(!source)return;const c={...CARD[actor.id],uid:actor.uid},sx=source.left+source.width/2-rect.left+arena.scrollLeft,sy=source.top+source.height/2-rect.top+arena.scrollTop;
 if(progress<.4){const wrap=document.createElement('div');wrap.className='replay-invocation-anchor';wrap.style.cssText='left:0;top:'+arena.scrollTop+'px;width:'+arena.clientWidth+'px;height:'+arena.clientHeight+'px';wrap.innerHTML=skillInvocationMarkup(c,next.last.skill);layer.append(wrap);const group=wrap.firstChild,t=Math.max(0,(progress-.23)/.17);group.style.transform='translate('+(sx-arena.clientWidth/2)*t+'px,'+(sy-arena.scrollTop-arena.clientHeight/2)*t+'px) scale('+(1-t*.96)+')';group.style.opacity=Math.min(1,progress/.06)*(1-t);return;}
 for(const uid of next.last.targets||[]){const target=modal.querySelector('[data-replay-uid="'+uid+'"]')?.getBoundingClientRect();if(!target)continue;const e=next.events.find(e=>e.target===uid&&['damage','heal','shield','buff','debuff','cleanse'].includes(e.kind)),row=skillSequenceRow(c,e?.kind||'buff'),tx=target.left+target.width/2-rect.left+arena.scrollLeft,ty=target.top+target.height/2-rect.top+arena.scrollTop;let col,x,y;if(progress<.5){col=progress<.45?0:1;x=sx;y=sy;}else if(progress<.78){const t=(progress-.5)/.28;col=2;x=sx+(tx-sx)*t;y=sy+(ty-sy)*t-Math.sin(t*Math.PI)*36;}else{col=progress<.85?3:progress<.93?4:5;x=tx;y=ty;}const sprite=makeSkillSprite(layer,row,col,x,y,col>=3?220:160);if(col>=3)skillFinale(layer,row,tx,ty,(progress-.78)/.22,650,document.documentElement.classList.contains('quiet-motion')||matchMedia('(prefers-reduced-motion: reduce)').matches);if(col===5)sprite.style.opacity=Math.max(0,(1-progress)/.07);if(col>=3&&e?.amount){const text=document.createElement('b');text.className='replay-hit';text.style.cssText='left:'+x+'px;top:'+(y-25)+'px';text.textContent=(e.kind==='damage'?'−':'+')+e.amount;layer.append(text);}}
}
function newRecruitment(){return {version:1,heroRank:1,limitedPity:0,owned:[...new Set([...initial,'U009'])],souls:[0,0,0,0,0],ascensions:{},purplePity:0,orangePity:0,draws:0,migrated:false};}
function validRecruitment(r){return !!r&&(r.limitedPity===undefined||Number.isInteger(r.limitedPity)&&r.limitedPity>=0&&r.limitedPity<50)&&(r.heroRank===undefined||Number.isInteger(r.heroRank)&&r.heroRank>=1&&r.heroRank<=4)&&r.version===1&&Array.isArray(r.owned)&&r.owned.length<=cards.length&&r.owned.every(id=>typeof id==='string'&&Object.hasOwn(CARD,id))&&new Set(r.owned).size===r.owned.length&&Array.isArray(r.souls)&&r.souls.length===5&&r.souls.every(x=>Number.isSafeInteger(x)&&x>=0&&x<=1000000000)&&r.ascensions&&typeof r.ascensions==='object'&&!Array.isArray(r.ascensions)&&Object.entries(r.ascensions).every(([id,n])=>r.owned.includes(id)&&Number.isInteger(n)&&n>=0&&n<=5)&&Number.isInteger(r.purplePity)&&r.purplePity>=0&&r.purplePity<=30&&Number.isInteger(r.orangePity)&&r.orangePity>=0&&r.orangePity<=90&&Number.isSafeInteger(r.draws)&&r.draws>=0;}
function ensureRecruitment(s=state){if(s.recruitment){repairDuplicateCards(s);if(s.recruitment.limitedPity===undefined)s.recruitment.limitedPity=0;if(s.recruitment.heroRank===undefined){s.recruitment.heroRank=s.cleared>=22?4:s.cleared>=15?3:1;s.recruitment.heroRankMigrated=true;}if(!s.recruitment.owned.includes(HERO_ID))s.recruitment.owned.push(HERO_ID);return s.recruitment;}const ids=[...legacyOwned(s)];s.recruitment={...newRecruitment(),owned:[...new Set([...ids,HERO_ID])],heroRank:s.cleared>=22?4:s.cleared>=15?3:1,heroRankMigrated:true,migrated:true};if(s.camp)s.camp.embers=Math.min(1000000000,s.camp.embers*5);return s.recruitment;}
function legacyOwned(s){let set=new Set(cards.filter(c=>!c.limited&&c.rarity===0).map(c=>c.id));nodes.slice(0,s.cleared).forEach(n=>set.add(n.reward));if(s.cleared>=5)cards.filter(c=>!c.limited&&c.rarity===1).forEach(c=>set.add(c.id));if(s.cleared>=12)cards.filter(c=>!c.limited&&c.rarity===3).forEach(c=>set.add(c.id));if(s.cleared>=24)cards.filter(c=>!c.limited&&c.rarity===4).forEach(c=>set.add(c.id));return set;}
function recruitRules(){return {weights:[45,30,18,6,1],soulBase:[10,50,100,200,500],growth:[.06,.05,.04,.03,.02],costs:[[10,20,50,100,200],[50,100,200,500,1000],[100,200,500,1000,2000],[200,500,1000,2000,5000],[500,1000,2000,5000,10000]]};}
function poolCards(s=state){return cards.filter(c=>c.id!==HERO_ID&&!c.storyExclusive&&!c.limited&&(c.poolUnlock<=s.cleared||initial.includes(c.id)));}
function poolGroups(){return RARITIES.map((_,i)=>poolCards().filter(c=>c.rarity===i));}
function randomInt(min,max){return min+Math.floor(Math.random()*(max-min+1));}
function ascensionLevel(id){return ensureRecruitment().ascensions[id]||0;}
function ascensionFactor(c){return 1+ascensionLevel(c.id)*recruitRules().growth[ascensionTier(c)];}
// Native synthesis only; shared by the game and the audition page.
async function playLegendaryDrawSFX({delay=0,onBurst}={}){
 let prefs={volume:.45,muted:false};
 try{Object.assign(prefs,JSON.parse(localStorage.getItem('olympus-combat-audio')||'{}'));}catch{}
 const volume=Math.max(0,Math.min(1,Number(prefs.volume)||0));
 if(prefs.muted||!volume||document.hidden)return false;
 const C=window.AudioContext||window.webkitAudioContext;if(!C)return false;
 playLegendaryDrawSFX.stop?.();
 const ctx=new C(),nodes=[],timers=[];let closed=false;
 const cleanup=()=>{if(closed)return;closed=true;timers.forEach(clearTimeout);document.removeEventListener('visibilitychange',onVisibility);for(const n of nodes){try{if(n.stop)n.stop();n.disconnect();}catch{}}ctx.close().catch(()=>{});if(playLegendaryDrawSFX.stop===cleanup)delete playLegendaryDrawSFX.stop;};
 const onVisibility=()=>{if(document.hidden)cleanup();};
 playLegendaryDrawSFX.stop=cleanup;document.addEventListener('visibilitychange',onVisibility);
 timers.push(setTimeout(cleanup,8000));
 try{
  await ctx.resume();if(closed)return false;
  const now=ctx.currentTime+.025+Math.max(0,Math.min(1,delay)),end=now+2.4;
  const master=ctx.createGain(),compressor=ctx.createDynamicsCompressor();nodes.push(master,compressor);
  compressor.threshold.value=-15;compressor.knee.value=12;compressor.ratio.value=6;compressor.attack.value=.003;compressor.release.value=.2;
  master.gain.setValueAtTime(volume*.95,now);master.connect(compressor);compressor.connect(ctx.destination);
  function tone(type,hz,start,peak,attack,finish,slide){
   const o=ctx.createOscillator(),g=ctx.createGain();nodes.push(o,g);o.type=type;o.frequency.setValueAtTime(hz,start);
   if(slide)o.frequency.exponentialRampToValueAtTime(slide,start+.29);
   g.gain.setValueAtTime(.0001,start);g.gain.exponentialRampToValueAtTime(peak,start+attack);g.gain.exponentialRampToValueAtTime(.0001,finish);
   o.connect(g);g.connect(master);o.start(start);o.stop(finish+.025);
  }
  // 0–0.3 s: low triangle-wave intake, rapidly rising into the reveal.
  tone('triangle',49,now,.46,.22,now+.3,1046.5);
  tone('triangle',98,now,.18,.24,now+.3,1567.98);
  // 0.4 s: a deep impact supports a wide, simultaneous golden chord.
  tone('sine',130.81,now+.4,.45,.006,now+.95,43.65);
  [523.25,659.25,783.99,1046.5,1318.51,1567.98].forEach((hz,i)=>tone('sine',hz,now+.4,i<3?.09:.14,.008,end));
  // Two staggered upward cascades and quieter echoes create a shower of gold.
  [783.99,1046.5,1318.51,1567.98,2093,2637.02,3135.96,4186].forEach((hz,i)=>{
   const start=now+.4+i*.033;tone('sine',hz,start,.19-i*.014,.005,end);
   tone('sine',Math.min(hz*2.002,7200),start,.035,.007,end);
   tone('sine',hz*1.001,start+.23,.075-i*.005,.006,end);
   tone('sine',hz,start+.47,.028,.009,end);
  });
  if(onBurst)timers.push(setTimeout(()=>{if(!closed)onBurst();},Math.max(0,(now+.4-ctx.currentTime)*1000)));
  timers.push(setTimeout(cleanup,Math.max(0,(end+.12-ctx.currentTime)*1000)));
  return true;
 }catch{cleanup();return false;}
}

function summonCards(count){if(battle||state.mode!=='campaign'||![1,11].includes(count))return;const price=count===11?5000:500,camp=campProgress();if(camp.embers<price){toast('餘燼不足。');return;}const rec=ensureRecruitment(),groups=poolGroups(),rules=recruitRules(),active=groups.map((a,i)=>a.length?i:-1).filter(i=>i>=0),max=active.at(-1),guarantee=Math.min(2,max),results=[],ownedSet=new Set(rec.owned);let best=-1;
 for(let i=0;i<count;i++){let min=0;if(max>=4&&rec.orangePity>=89)min=4;else if(max>=3&&rec.purplePity>=29)min=3;if(count===11&&i===10&&best<guarantee)min=Math.max(min,guarantee);const options=active.filter(t=>t>=min),total=options.reduce((a,t)=>a+rules.weights[t],0);let roll=Math.random()*total,tier=options.at(-1);for(const t of options){roll-=rules.weights[t];if(roll<0){tier=t;break;}}const c=groups[tier][randomInt(0,groups[tier].length-1)],duplicate=ownedSet.has(c.id);if(duplicate)rec.souls[tier]=Math.min(1000000000,rec.souls[tier]+rules.soulBase[tier]);else ownedSet.add(c.id);if(max>=3)rec.purplePity=tier>=3?0:rec.purplePity+1;if(max>=4)rec.orangePity=tier===4?0:rec.orangePity+1;rec.draws++;best=Math.max(best,tier);results.push({id:c.id,duplicate,souls:duplicate?rules.soulBase[tier]:0});}
 camp.embers-=price;rec.owned=[...ownedSet];persist();render();const d=document.getElementById('detail');d.className='summon-dialog';d.removeAttribute('aria-labelledby');d.addEventListener('close',()=>d.classList.remove('summon-dialog'),{once:true});d.innerHTML='<h2>召喚結果 · '+count+' 抽</h2><p>消耗 '+price+' 餘燼 · 剩餘 '+camp.embers+'</p><div class="summon-results">'+results.map((r,i)=>{const c=CARD[r.id];return '<article class="summon-card r'+c.rarity+(c.rarity===4?' summon-gold-reveal':'')+'" style="--reveal-delay:'+Math.min(i,10)*.07+'s">'+avatar(c,'summon-portrait')+'<span class="badge">'+RARITIES[c.rarity]+'卡</span><h3>'+esc(c.name)+'</h3><p>'+(r.duplicate?'重複 · '+RARITIES[c.rarity]+'色殘魂 +'+r.souls:'新同行者 · 已加入收藏')+'</p><button class="small" data-action="selectForFormation" data-id="'+c.id+'">查看／布陣</button></article>';}).join('')+'</div><div class="row summon-repeat"><button data-action="summon" data-id="'+count+'" '+(camp.embers<(count===11?5000:500)?'disabled':'')+'>'+(count===11?'再抽 11 次':'再抽一次')+'</button><button data-action="close">收下並返回</button></div>';if(!d.open)d.showModal();{const rareIndex=results.findIndex(r=>CARD[r.id]?.rarity===4);if(rareIndex>=0)void playLegendaryDrawSFX({delay:rareIndex*.07});}}
function ascendHero(id){if(battle||state.mode!=='campaign'||!owned().has(id))return;const c=CARD[id],r=ensureRecruitment(),level=r.ascensions[id]||0;if(level>=5)return;const cost=recruitRules().costs[ascensionTier(c)][level];if(r.souls[ascensionTier(c)]<cost){toast(RARITIES[ascensionTier(c)]+'色殘魂不足。');return;}r.souls[ascensionTier(c)]-=cost;r.ascensions[id]=level+1;persist();render();const dialog=document.getElementById('detail');if(dialog.open&&dialog.classList.contains('enhance-modal'))openEnhancement(id,true);else if(dialog.open&&dialog.classList.contains('bond-dialog'))dialog.innerHTML='<h2>'+esc(c.name)+'</h2>'+detail(c)+'<button data-action="close">關閉</button>';toast(c.id===HERO_ID&&c.rarity>1?c.name+' 已升至 '+(level+1)+' 星，本階基礎能力提升，傳承特性不重複疊加。':c.name+' 已升至 '+(level+1)+' 星，解鎖「'+starTraits(c)[level].name+'」：'+starTraits(c)[level].desc);}
function recruitmentView(){const r=ensureRecruitment(),camp=campProgress(),groups=poolGroups(),weights=recruitRules().weights,total=groups.reduce((sum,g,i)=>sum+(g.length?weights[i]:0),0),future=cards.filter(c=>c.id!==HERO_ID&&!c.storyExclusive&&!c.limited&&c.poolUnlock>state.cleared),next=future.length?Math.min(...future.map(c=>c.poolUnlock)):null;return '<section class="recruitment-page">'+limitedPoolView()+'<div class="phase-head"><div><div class="eyebrow">SUMMON THE ALLIANCE</div><h2>萬族召喚祭壇</h2><p>餘燼 '+camp.embers+' · 收藏 '+owned().size+' / 608 · 普通池已開放 '+poolCards().length+' 種角色（含已擁有，可重複抽取）</p></div><div class="row"><button data-action="summon" data-id="1" '+(state.mode!=='campaign'||camp.embers<500?'disabled':'')+'>召喚 1 張 · 500 餘燼</button><button class="primary" data-action="summon" data-id="11" '+(state.mode!=='campaign'||camp.embers<5000?'disabled':'')+'>召喚 11 張 · 5000 餘燼</button></div></div><p>僅故事戰役可召喚。每次勝利獲得 540～660 餘燼，每關首次通關另加 600（首勝共 1140～1260）；重打僅領勝利獎勵。通關解鎖可抽角色，不直接送卡。初始獲得主角厄里昂與九名白卡人族同行者；主角不進入召喚池。</p>'+(camp.emberCatchup?'<p class="recruit-notice">餘燼收益調整：已依舊存檔通關數一次補發 '+camp.emberCatchup+' 餘燼（每關 900），已加入餘額，不會重複領取。</p>':'')+ (r.migrated?'<p class="recruit-notice">舊版收藏已保留；舊營地設施與補給投入已退還餘燼。早期版本餘燼於首次召喚系統移轉時換算為五倍。</p>':'')+'<div class="pool-rates">'+RARITIES.map((name,i)=>'<article class="r'+i+'"><h3>'+name+'卡</h3><strong>'+ (groups[i].length?(weights[i]/total*100).toFixed(2)+'%':'未開放')+'</strong><span class="pool-rate-caption">普通單抽 · 抽中此卡色</span><p>'+groups[i].length+' 張可抽 · '+r.souls[i]+' 殘魂</p><small>重複轉換 '+recruitRules().soulBase[i]+' 殘魂</small></article>').join('')+'</div><section class="panel panel-pad"><h3>保底與規則</h3><p class="probability-explainer"><strong>百分比代表什麼？</strong>每次普通抽取，抽中該卡色的機率；不是特定角色的機率，也不是收藏進度。同卡色內每名角色機率相同：指定角色機率＝該卡色機率 ÷ 該卡色可抽張數。保底抽取另依下列規則調整。</p><p>機率浮動說明：白／綠／藍／紫／橙的基礎權重為 45／30／18／6／1。尚未解鎖的卡色不參與抽選，其餘卡色按權重重新換算為 100%，因此通關開放新卡色後，畫面百分比會變動；不是依玩家抽卡結果任意調整。同色新增角色後，指定角色的機率也會因人數增加而降低。11 抽至少一張藍色以上；藍池未開時保底綠色，綠池未開時僅白色。</p><p>紫池開放後，每 30 抽內至少一張紫色以上（目前 '+r.purplePity+' / 30）；橙池開放後，每 90 抽內至少一張橙色（目前 '+r.orangePity+' / 90）。抽到對應卡色便重置，包含重複卡；尚未開放時不累計。保底觸發的抽次會提高相應卡色機率。</p><p>重複卡轉為同色共用殘魂。進階維持原卡色，每卡最多五階；白／綠／藍／紫／橙每階生命、攻擊、防禦分別 +6%／5%／4%／3%／2%，同卡階數相加，另逐星解鎖角色自身固定能力，可在英雄強化查看。</p><p>下一批開放：'+(next?'通過第 '+next+' 關「'+esc(nodes[next-1].name)+'」後，新增 '+cards.filter(c=>!c.limited&&c.poolUnlock===next).length+' 張':'全部角色已進入卡池')+'</p><details><summary>查看各卡色進階費用</summary>'+RARITIES.map((n,i)=>'<p>'+n+'：'+recruitRules().costs[i].join('／')+' 同色殘魂</p>').join('')+'</details><details><summary>當前卡池完整名單</summary><p class="meta">暗色名稱表示已擁有。</p>'+RARITIES.map((n,i)=>'<h4>'+n+'卡 · '+groups[i].length+' 張</h4><p>'+groups[i].map(c=>'<span class="pool-roster-name'+(r.owned.includes(c.id)?' is-owned':'')+'"'+(r.owned.includes(c.id)?' style="color:#827f79;text-shadow:none" title="已擁有"':' title="尚未擁有"')+'>'+esc(c.name)+'</span>').join('、')+'</p>').join('')+'</details></section></section>';}
function ascensionPanel(c){if(state.mode!=='campaign')return '';if(c.id===HERO_ID)return heroAscensionPanel(c);const r=ensureRecruitment(),level=r.ascensions[c.id]||0,cost=recruitRules().costs[ascensionTier(c)][level],have=owned().has(c.id);return '<section class="ascension-panel"><h3>英雄進階 · '+level+' / 5</h3><p>'+RARITIES[ascensionTier(c)]+'色殘魂 '+r.souls[ascensionTier(c)]+' · 自身生命／攻擊／防禦 +'+Math.round(level*recruitRules().growth[ascensionTier(c)]*100)+'%</p><p class="meta">每階 +'+Math.round(recruitRules().growth[ascensionTier(c)]*100)+'%，不改變卡色或技能。營地與羈絆加成另計。</p><button data-action="ascend" data-id="'+c.id+'" '+(!have||battle||level>=5||r.souls[ascensionTier(c)]<cost?'disabled':'')+'>'+(!have?'尚未擁有':level>=5?'已達五階':'進階 · '+cost+' '+RARITIES[ascensionTier(c)]+'色殘魂')+'</button><p class="meta">取得方式：'+(c.limited?'通過第 '+c.poolUnlock+' 關後於限定池召喚':c.id===HERO_ID?'初始主角，劇情專屬，不進入召喚池':c.poolUnlock===0?'初始卡池': '通過第 '+c.poolUnlock+' 關後進入卡池')+'。'+(have?'已擁有。':'入池後仍需召喚取得。')+'</p>'+starTraitPanel(c)+'</section>';}
function battleRecruitRewards(b){if(state.mode!=='campaign')return '';const souls=b.soulRewards||[0,0,0,0,0],kills=b.soulKills||[0,0,0,0,0],added=(b.poolAdditions||[]).map(id=>CARD[id]),multiplier=b.rewardMultiplier||1,emberMultiplier=b.emberMultiplier||2;return '<section class="growth-result"><h3>征途結算 · 餘燼 +'+(b.emberReward||0)+(b.winner===0?' · 餘燼倍率 ×'+emberMultiplier+(multiplier>1?'／殘魂倍率 ×'+multiplier:''):'')+'</h3>'+(b.winner===0?'<p class="meta">勝利獎勵 '+(b.emberBase||b.emberReward||0)+' · 首次通關加成 '+(b.emberFirstBonus||0)+'</p>':'')+'<p class="spirit-reward">神靈 +'+(b.spiritReward||0)+(b.spiritsUnlocked?' · 起義營地的神力研習已開放':'')+'</p><div class="soul-results">'+RARITIES.map((name,i)=>'<span class="r'+i+'">'+name+'色殘魂 <b>+'+souls[i]+'</b><small>擊敗 '+kills[i]+' 名</small></span>').join('')+'</div><p>目前餘燼 '+campProgress().embers+'；殘魂可在英雄強化用於進階。'+(b.winner===0?'':'戰敗、平手及撤退不發放餘燼、殘魂或神靈。')+'</p>'+(added.length?'<h3>通關解鎖獎池 · '+added.length+' 張</h3><p>下列角色現在可以抽取，尚未直接加入收藏。</p><div class="pool-unlocked">'+added.slice(0,5).map(c=>'<article class="r'+c.rarity+'">'+avatar(c,'mini-avatar')+'<span>'+esc(c.name)+(c.limited?'【限定池】':'【普通池】')+'</span></article>').join('')+'</div><details><summary>查看全部新增角色</summary>'+added.map(c=>'<p class="r'+c.rarity+'">'+RARITIES[c.rarity]+' · '+esc(c.name)+(c.limited?'【限定池】':'【普通池】')+'</p>').join('')+'</details>':'<p class="meta">本場沒有新增卡池角色。</p>')+'</section>';}

(function(){const original=detail;detail=function(c,live=null){const html=original(c,live);if(!c||live)return html;const at=html.lastIndexOf('</div>'),box=view==='enhancement'?ascensionPanel(c):state.mode==='campaign'&&owned().has(c.id)?'<button class="enhance-link" data-action="enhanceCard" data-id="'+c.id+'">英雄強化 · '+ascensionLevel(c.id)+' / 5 階</button>':'';return view==='enhancement'?html.replace(/(<div class="detail-inner[^"]*">)/,'$1'+box):html.slice(0,at)+box+html.slice(at);};})();

function enhancementView(){return '<section class="enhancement-page"><div class="phase-head"><div><div class="eyebrow">HALL OF ASCENSION</div><h2>英雄強化</h2><p>點選卡牌，開啟角色的命火覺醒頁面。以同色殘魂升星，每卡最多五星。</p></div></div><div class="enhancement-collection">'+roster()+'</div></section>';}
function openEnhancement(id,refresh=false){const c=CARD[id];if(!c)return;const d=document.getElementById('detail'),scroll=d.querySelector('.enhance-modal-body')?.scrollTop||0;d.className='enhance-modal';d.setAttribute('aria-labelledby','enhance-title');d.innerHTML='<header class="enhance-modal-head"><div><span class="eyebrow">HALL OF ASCENSION</span><h2 id="enhance-title">'+esc(c.name)+'</h2></div><button data-action="close" aria-label="關閉英雄強化">✕ 關閉</button></header><div class="enhance-modal-body"><section class="enhance-portrait-panel">'+avatar(c,'portrait')+'<h3>'+esc(c.title)+'</h3>'+(c.sharedRegionalArt?'<p class="origin-label">'+esc(c.originLabel)+' · 卡號 '+c.id+'</p><p class="meta">此為獨立的地區編制卡，與其他駐地共用立繪；收藏與星數依卡號分別計算。同一卡號重複召喚會轉成殘魂。</p>':'')+'<p>'+RARITIES[c.rarity]+'卡 · '+c.element+' · '+c.role+'</p><p>'+esc(c.lore)+'</p></section><div class="enhance-power-panel">'+(state.mode==='campaign'?ascensionPanel(c):'<p>自由試陣不套用升星能力，請切換故事戰役培養角色。</p>')+'</div></div>';if(!d.open)d.showModal();if(refresh)d.querySelector('.enhance-modal-body').scrollTop=scroll;else d.addEventListener('close',()=>{d.classList.remove('enhance-modal');d.removeAttribute('aria-labelledby');document.querySelector('.enhancement-collection [data-action="card"][data-id="'+id+'"]')?.focus({preventScroll:true});},{once:true});}

function autoFormation(){
 if(battle)return;const candidates=cards.filter(c=>available(c.id)),node=nodes[state.node],terrain=TERRAINS[node.terrain],enemies=node.enemy.map(id=>CARD[id]);if(!candidates.length)return;
 const growth=c=>state.mode==='campaign'?ascensionFactor(c):1;
 const rawValue=(c,slot)=>{const traits=starPowers(c,state.mode==='campaign'?ascensionLevel(c.id):0),scale=growth(c),enemy=enemies[slot%3]||enemies[0],skill=c.skill,cycle=skill?(skill.cost+Math.max(0,skill.power))/(skill.cost+1):1,area=skill&&['allEnemy','column'].includes(skill.target)?1.32:1,attack=c.atk*scale*(1+traits.attack)*(1+traits.damage)*cycle*area*advantage(c.element,enemy.element)*terrainFactor(c,terrain),tough=c.hp*scale*(1+traits.hp)*(1+c.def*scale*(1+traits.defense)/100)/(1-traits.guard)/advantage(enemy.element,c.element),support=(skill?.effects||[]).reduce((v,e)=>v+(['heal','shield','guard','regen','cleanse'].includes(e.type)?c.atk*scale*(e.value||.5)/(skill.cost+1):0),0);return slot<3?attack*.65+tough*.12+support*.5:slot<6?attack+tough*.045+support*1.25:(attack*.8+tough*.075+support*.7)*.55;};
 const cached=Object.fromEntries(candidates.map(c=>[c.id,Array.from({length:9},(_,slot)=>rawValue(c,slot))]));const value=(c,slot)=>cached[c.id][slot];
 const score=ids=>{let total=0;const activeIds=new Set(ids.slice(0,6).filter(Boolean));for(let slot=0;slot<9;slot++){const c=CARD[ids[slot]];if(!c)continue;let v=value(c,slot);if(slot<6){let count=0;for(const link of c.bonds||[])if(activeIds.has(link.partner)){count++;v*=link.type==='attack'?1.08:link.type==='defense'?1.05:1.06;}if(c.rarity===4&&count===3)v*=1.12;}total+=v;}const front=ids.slice(0,3).map(id=>CARD[id]).filter(Boolean),live=ids.slice(0,6).map(id=>CARD[id]).filter(Boolean);total+=Math.min(2,front.filter(c=>['增益坦','減益坦'].includes(c.role)).length)*22;total+=Math.min(2,live.filter(c=>c.role==='攻擊手').length)*26;total+=Math.min(1,live.filter(c=>(c.skill?.effects||[]).some(e=>e.type==='heal')).length)*50;return total;};
 let chosen=Array(9).fill(null);for(const slot of [0,3,1,4,2,5,6,7,8]){let best=null,bestScore=-Infinity;for(const c of candidates){if(chosen.includes(c.id))continue;const next=[...chosen];next[slot]=c.id;const s=score(next);if(s>bestScore){bestScore=s;best=c.id;}}chosen[slot]=best;}
 // Refine both membership and placement without spending any resources or changing progression.
 for(let pass=0;pass<2;pass++){let current=score(chosen);for(let slot=0;slot<9;slot++){for(const c of candidates){if(chosen.includes(c.id))continue;const next=[...chosen];next[slot]=c.id;const s=score(next);if(s>current+.01){chosen=next;current=s;}}}for(let i=0;i<9;i++)for(let j=i+1;j<9;j++){const next=[...chosen];[next[i],next[j]]=[next[j],next[i]];const s=score(next);if(s>current+.01){chosen=next;current=s;}}}
 state.lineups[state.mode]=chosen;selected=chosen.find(Boolean);slotIndex=0;persist();render();toast('已依本關敵軍、場地、進階與羈絆配置推薦陣型，仍可手動調整。');
}
function skillFinale(layer,row,x,y,progress=null,duration=650,quiet=false){
 const colors=['#ffe0a0','#8bdfff','#ffb16a','#b3ffc9'],color=colors[row]||colors[0],support=row===3;
 const pieces=quiet?0:support?12:22;
 const put=(className,frames)=>{const el=document.createElement('i');el.className=className;el.style.cssText='left:'+x+'px;top:'+y+'px;--finale-color:'+color;layer.append(el);const anim=el.animate(frames,{duration,fill:'both',easing:'cubic-bezier(.12,.62,.28,1)'});if(progress!==null){anim.pause();anim.currentTime=Math.max(0,Math.min(1,progress))*duration;}return el;};
 put('skill-final-ring',[{transform:'translate(-50%,-50%) scale(.12)',opacity:.9},{opacity:.65,offset:.25},{transform:'translate(-50%,-50%) scale('+(quiet?1:2.4)+')',opacity:0}]);
 for(let i=0;i<pieces;i++){const angle=(i*137.508+row*21)*Math.PI/180,distance=(support?55:90)+(i%5)*18,dx=Math.cos(angle)*distance,dy=Math.sin(angle)*distance+(support?-35:35),size=5+i%4*3,rotation=i*53;const el=put('skill-final-shard'+(support?' blessing-shard':''),[{transform:'translate(-50%,-50%) rotate('+rotation+'deg) scale(.3)',opacity:1},{transform:'translate(calc(-50% + '+dx*.35+'px),calc(-50% + '+dy*.25+'px)) rotate('+(rotation+60)+'deg) scale(1.2)',opacity:1,offset:.22},{transform:'translate(calc(-50% + '+dx+'px),calc(-50% + '+dy+'px)) rotate('+(rotation+220)+'deg) scale(.15)',opacity:0}]);el.style.width=size+'px';el.style.height=size*(support?1:1.8)+'px';}
}

function starTraits(c){const role=c.role,guard=role==='增益坦',control=role==='減益坦',attack=role==='攻擊手',prefix={雷:'雷誓',水:'潮心',火:'餘焰',冰:'霜骨',地:'磐石',風:'長風',光:'曙光',冥:'夜魂'}[c.element]||'命火';return [
 {name:prefix+'・生息',key:'hp',value:guard ? .10 : .06,desc:'自身最大生命 +'+(guard?10:6)+'%'},
 {name:prefix+'・意志',key:'attack',value:attack ? .10 : .06,desc:'自身攻擊 +'+(attack?10:6)+'%'},
 {name:prefix+'・不屈',key:'defense',value:(guard||control) ? .16 : .10,desc:'自身防禦 +'+(guard||control?16:10)+'%'},
 {name:prefix+'・餘光',key:'ward',value:guard ? .14 : .08,desc:'自身首次上場時，獲得最大生命 '+(guard?14:8)+'% 護盾'},
 guard?{name:prefix+'・守命',key:'guard',value:.08,desc:'自身受到的直接攻擊傷害 −8%'}:control?{name:prefix+'・破障',key:'pierce',value:.10,desc:'自身直接攻擊額外忽略目標 10% 防禦'}:attack?{name:prefix+'・決意',key:'damage',value:.10,desc:'自身普攻與傷害技能的直接傷害 +10%'}:{name:prefix+'・歸息',key:'regen',value:.03,desc:'自身每次行動開始恢復最大生命 3%'}];}
function starPowers(c,level){if(c.id===HERO_ID&&c.rarity>1&&state.mode==='campaign')level=5;const p={hp:0,attack:0,defense:0,ward:0,guard:0,pierce:0,damage:0,regen:0};for(const t of starTraits(c).slice(0,level))p[t.key]+=t.value;return p;}
function starTraitPanel(c){const inherited=c.id===HERO_ID&&c.rarity>1&&state.mode==='campaign',level=inherited?5:state.mode==='campaign'?ascensionLevel(c.id):0;return '<section class="star-traits"><h3>命火覺醒 · 固定星階能力</h3>'+ (inherited?'<p class="gold">前階五星能力已融入，持續生效且不重複疊加。本階升星增加基礎數值。</p>':'')+'<p>依角色定位與屬性固定配置；僅強化本人，不新增隊伍光環。既有每星基礎成長另計。</p>'+starTraits(c).map((t,i)=>'<article class="'+(level>i?'unlocked':'sealed')+'"><strong>'+('★'.repeat(i+1))+' · '+t.name+'</strong><span>'+t.desc+'</span><small>'+(level>i?'已解鎖':'升至 '+(i+1)+' 星解鎖')+'</small></article>').join('')+'</section>';}
function validDivinity(d){return d&&d.version===1&&Number.isSafeInteger(d.spirits)&&d.spirits>=0&&d.spirits<=1000000000&&typeof d.unlocked==='boolean'&&d.levels&&['fire','crown','soul'].every(k=>Number.isInteger(d.levels[k])&&d.levels[k]>=0&&d.levels[k]<=5);}
function ensureDivinity(s=state){if(s.divinity)return s.divinity;let refund=0;if(s.camp){for(const k of ['training','watch','supply']){const n=s.camp[k]||0;refund+=300*n+100*n*(n-1);s.camp[k]=0;}refund+=(s.camp.stock||0)*150;s.camp.stock=0;s.camp.prepared=false;s.camp.embers=Math.min(1000000000,s.camp.embers+refund);}s.divinity={version:1,spirits:0,unlocked:s.cleared>=13,levels:{fire:0,crown:0,soul:0},refund};return s.divinity;}
function divineResearch(){return [{key:'fire',name:'竊火銘印',line:'將散落神靈鍛入凡人的武器。',effect:'對紫、橙卡敵軍的直接傷害',step:3},{key:'crown',name:'碎冕刻印',line:'辨認神性護甲的裂隙，讓凡刃穿過王冠。',effect:'攻擊紫、橙卡時額外忽略防禦',step:3},{key:'soul',name:'護魂誓約',line:'把被奪回的神力化為守護生者的誓言。',effect:'受到紫、橙卡直接攻擊的減傷',step:2.5}];}
function divineCampView(){scheduleCampSlides();const d=ensureDivinity();return '<section class="divine-camp"><header class="hearth-banner"><div class="camp-story-slides" aria-hidden="true"><i style="--camp-image:var(--art-rebellion-hearth);--slide-delay:0s"></i><i style="--camp-image:var(--art-camp_after_01);--slide-delay:5s"></i><i style="--camp-image:var(--art-camp_after_02);--slide-delay:10s"></i><i style="--camp-image:var(--art-camp_after_03);--slide-delay:15s"></i><i style="--camp-image:var(--art-camp_after_04);--slide-delay:20s"></i></div><div class="camp-banner-copy"><span class="eyebrow">THE HEARTH OF REBELLION</span><h2>起義營地 · 凡火議事</h2><p>平民在爐火旁交換傷痕與見聞。當神庭首領倒下，殘留的神靈成為凡人抗衡眾神的第一束火。</p><div class="camp-treasury"><span class="treasury-spirit"><small>神靈</small><b>'+d.spirits+'</b></span><span class="treasury-ember"><small>餘燼</small><b>'+campProgress().embers+'</b></span></div></div></header><div class="camp-explanation"><h3>'+(d.unlocked?'神力研習已開啟':'等待第一縷神靈')+'</h3><p>戰役勝利後，每名被擊敗的紫卡敵軍提供 8～12 神靈，橙卡提供 24～36；白、綠、藍卡不掉落。首次取得即開放研習，重打已通關關卡也能累積。</p><p>研習只在故事戰役生效，針對紫、橙卡敵軍；不影響召喚機率。自由試陣維持基礎能力。</p>'+(d.refund?'<p class="camp-refund">舊營地設施與補給已一次退還 '+d.refund+' 餘燼，神力研習從零開始。</p>':'')+'</div><div class="divine-research">'+divineResearch().map(t=>{const n=d.levels[t.key],cost=[30,60,100,160,240][n];return '<article class="research-'+t.key+'"><span class="eyebrow">'+n+' / 5 階</span><h3>'+t.name+'</h3><p>'+t.line+'</p><strong>'+t.effect+' '+(n*t.step)+'%</strong><p>下一階：'+(n===5?'已滿階':((n+1)*t.step)+'%')+'</p><button data-action="divineUpgrade" data-id="'+t.key+'" '+(!d.unlocked||state.mode!=='campaign'||n===5||d.spirits<cost?'disabled':'')+'>'+(!d.unlocked?'尚未取得神靈':n===5?'研習完成':'研習 · '+cost+' 神靈')+'</button></article>';}).join('')+'</div></section>';}
function upgradeDivinity(key){if(battle||state.mode!=='campaign'||!['fire','crown','soul'].includes(key))return;const d=ensureDivinity(),n=d.levels[key],cost=[30,60,100,160,240][n];if(!d.unlocked||n>=5||d.spirits<cost)return;d.spirits-=cost;d.levels[key]++;persist();render();toast('神力研習已提升，下一場戰役生效。');}
function applyCampGrowth(b){if(state.mode!=='campaign')return;const d=ensureDivinity();b.campRewarded=false;b.campFirstWin=b.nodeId===state.cleared;for(const u of b.units.filter(u=>u.side===0)){u.ascension=ascensionLevel(u.id);u.starPowers=starPowers(u,u.ascension);u.divinePowers={damage:d.levels.fire*.03,pierce:d.levels.crown*.03,guard:d.levels.soul*.025};const advance=ascensionFactor(u),p=u.starPowers;u.atk=Math.round(u.atk*advance*(1+p.attack));u.def=Math.round(u.def*advance*(1+p.defense));u.max=Math.round(u.max*advance*(1+p.hp));u.hp=u.max;u.starWard=Math.round(u.max*p.ward);if(u.passive?.type==='ward'&&u.entered)u.shield=Math.round(u.atk*u.passive.value);if(u.entered)u.shield=Math.min(u.max,u.shield+u.starWard);}persist();}
function filterMenu(key,label,options){const current=String(filter[key]??'all'),title=options.find(([v])=>String(v)===current)?.[1]||label;return '<div class="filter-box"><button type="button" class="filter-trigger" popovertarget="filter-'+key+'" aria-label="'+label+'" aria-expanded="false">'+esc(title)+' <span>⌄</span></button><div class="filter-options" id="filter-'+key+'" popover="auto">'+options.map(([value,text])=>'<button type="button" '+(key==='element'&&ELEMENT_COLORS[value]?'data-element="'+value+'" style="--element-color:'+ELEMENT_COLORS[value]+'" ':'')+'data-action="filterChoice" data-filter="'+key+'" data-id="'+value+'" aria-pressed="'+(current===String(value))+'">'+esc(text)+'</button>').join('')+'</div></div>';}
document.addEventListener('beforetoggle',e=>{const menu=e.target;if(!menu.matches?.('.filter-options'))return;const trigger=document.querySelector('[popovertarget="'+menu.id+'"]');if(!trigger)return;trigger.setAttribute('aria-expanded',String(e.newState==='open'));if(e.newState==='open'){const r=trigger.getBoundingClientRect(),width=Math.min(240,window.innerWidth-24);menu.style.width=width+'px';menu.style.left=Math.max(12,Math.min(r.left,window.innerWidth-width-12))+'px';menu.style.top=(r.bottom+8)+'px';menu.style.maxHeight=Math.max(100,window.innerHeight-r.bottom-20)+'px';}},true);
window.addEventListener('resize',()=>document.querySelectorAll('.filter-options:popover-open').forEach(m=>m.hidePopover()));
/* Compact formation profile; full sections are read in a centered dialog. */
(function(){
 const fullDetail=detail;
 const sections=[['ability','.ability-section','奧義／普通攻擊','✦'],['lore','.lore-section','特性與背景','◇'],['notes','section.skill-box','圖鑑備註','▤'],['bonds','.bond-panel','羈絆連結','◈']];
 function fragment(c){const t=document.createElement('template');t.innerHTML=fullDetail(c);return t.content;}
 detail=function(c,live=null){if(!c||live||view!=='formation')return fullDetail(c,live);const f=fragment(c),root=f.querySelector('.detail-inner'),bondActive=!!f.querySelector('.bond-link.bond-on');if(!root)return fullDetail(c,live);for(const [,selector]of sections)root.querySelector(selector)?.remove();root.querySelector('.enhance-link')?.remove();const menu=document.createElement('div');menu.className='profile-sections';menu.innerHTML=sections.map(([key,,label,icon])=>'<button '+(key==='bonds'?'class="profile-bonds '+(bondActive?'bonds-active':'bonds-inactive')+'" ':'')+'data-action="profileSection" data-id="'+c.id+'" data-section="'+key+'"><span aria-hidden="true">'+icon+'</span><strong>'+(key==='ability'?(c.skill?'奧義技能':'普通攻擊'):key==='bonds'?(bondActive?'羈絆 · 已啟動':'羈絆 · 未啟動'):label)+'</strong><small aria-hidden="true">›</small></button>').join('');const place=root.querySelector('.place-card');root.insertBefore(menu,place);return root.outerHTML;};
 function showSection(id,key){const c=CARD[id],spec=sections.find(s=>s[0]===key);if(!c||!spec)return;const section=fragment(c).querySelector(spec[1]),d=document.getElementById('detail');if(!section)return;d.className='profile-section-modal';d.setAttribute('aria-labelledby','profile-section-title');d.dataset.profileCard=id;d.dataset.profileSection=key;d.innerHTML='<header class="profile-modal-head"><div><span class="eyebrow">'+esc(c.name)+'</span><h2 id="profile-section-title">'+(key==='ability'?(c.skill?'奧義技能':'普通攻擊'):spec[2])+'</h2></div><button data-action="close">關閉 ✕</button></header><div class="profile-modal-content">'+section.outerHTML+'</div>';if(!d.open)d.showModal();}
 document.getElementById('detail').addEventListener('close',function(){this.classList.remove('profile-section-modal');delete this.dataset.profileCard;delete this.dataset.profileSection;});
 document.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(!b||b.disabled)return;if(b.dataset.action==='profileSection')showSection(b.dataset.id,b.dataset.section);if(b.dataset.action==='policy'){const d=document.getElementById('detail');if(d.open&&d.classList.contains('profile-section-modal'))showSection(d.dataset.profileCard,d.dataset.profileSection);}});
 render();
})();


/* Offline procedural battle Foley. No remote audio or speech required. */
async function readGameAudioBytes(src){if(typeof src!=='string'||!src)throw Error('音訊來源不存在');if(src.startsWith('data:'))return Uint8Array.from(atob(src.slice(src.indexOf(',')+1)),c=>c.charCodeAt(0)).buffer;const response=await fetch(src);if(!response.ok)throw Error('音訊載入失敗 '+response.status);return response.arrayBuffer();}
const CombatAudio=(()=>{
 let ctx,master,noise;const active=new Set();
 const settings=()=>{try{return JSON.parse(localStorage.getItem('olympus-combat-audio'))||{volume:.45,muted:false};}catch{return {volume:.45,muted:false};}};
 let prefs=settings();prefs.volume=Number.isFinite(+prefs.volume)?Math.max(0,Math.min(1,+prefs.volume)):.45;
 function unlock(){try{if(!ctx){const C=window.AudioContext||window.webkitAudioContext;if(!C)return;ctx=new C();master=ctx.createGain();const compressor=ctx.createDynamicsCompressor();compressor.threshold.value=-18;compressor.ratio.value=5;master.connect(compressor);compressor.connect(ctx.destination);noise=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate);const d=noise.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;}master.gain.value=prefs.muted?0:prefs.volume*.6;preloadSamples();if(ctx.state==='suspended')ctx.resume().catch(()=>{});}catch{}}
 function voice(freq,end,duration,amp,type='sine',delay=0){if(!ctx||ctx.state!=='running'||prefs.muted||document.hidden)return;const t=ctx.currentTime+delay,g=ctx.createGain(),source=type==='noise'?ctx.createBufferSource():ctx.createOscillator();if(type==='noise'){source.buffer=noise;const f=ctx.createBiquadFilter();f.type='bandpass';f.frequency.setValueAtTime(freq,t);f.frequency.exponentialRampToValueAtTime(Math.max(30,end),t+duration);f.Q.value=.7;source.connect(f);f.connect(g);}else{source.type=type;source.frequency.setValueAtTime(freq,t);source.frequency.exponentialRampToValueAtTime(Math.max(30,end),t+duration);source.connect(g);}g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(amp,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+duration);g.connect(master);active.add(source);source.onended=()=>{active.delete(source);source.disconnect();g.disconnect();};source.start(t);source.stop(t+duration+.02);}
 function stop(){for(const s of active)try{s.stop();}catch{}active.clear();}
 // Layered environmental textures: turbulence, crackle, debris and resonances.
 const textures=new Map();
 function texture(element,hit,strong){if(!ctx||ctx.state!=='running'||prefs.muted||document.hidden)return;
  const key=element+'-'+hit+'-'+strong;let buffer=textures.get(key);
  if(!buffer){const seconds=hit?(strong?1.15:.65):(strong?.7:.38),rate=ctx.sampleRate;buffer=ctx.createBuffer(1,Math.ceil(rate*seconds),rate);const data=buffer.getChannelData(0);let low=0,slow=0,previous=0,crackle=0,bubble=0,phase=0;const shards=Array.from({length:9},(_,i)=>({f:1100+i*387+Math.random()*240,t:Math.random()*.25,amp:.04+Math.random()*.05}));
   for(let i=0;i<data.length;i++){const t=i/rate,u=t/seconds,w=Math.random()*2-1;low=low*.975+w*.025;slow=slow*.998+w*.002;const high=w-previous;previous=w;const env=Math.min(1,t/.014)*Math.pow(1-u,hit?1.8:1.1);let v=0;
    if(element==='火'){if(Math.random()<.0008)crackle=.3+Math.random()*.6;crackle*=.89;v=low*3.7+(w*.15+crackle*high)*(.6+.4*Math.sin(t*31));if(hit)v+=Math.sin(2*Math.PI*(62*t-22*t*t))*Math.exp(-t*10)*.45;}
    else if(element==='雷'){const burst=Math.exp(-t*22)+.65*Math.exp(-Math.abs(t-.085)*70)+.35*Math.exp(-Math.abs(t-.21)*55);v=high*.37*burst+low*4.5*(hit?1:.5)+Math.sin(t*2*Math.PI*49)*Math.exp(-t*7)*.32;}
    else if(element==='水'){if(Math.random()<.0003){bubble=.4;phase=0;}bubble*=.997;phase+=2*Math.PI*(450+1200*Math.exp(-t*5))/rate;v=low*3.2+w*.18*Math.exp(-t*6)+Math.sin(phase)*bubble*.5;}
    else if(element==='冰'){v=high*.18*Math.exp(-t*18);for(const sh of shards)if(t>sh.t)v+=Math.sin(2*Math.PI*sh.f*(t-sh.t))*sh.amp*Math.exp(-(t-sh.t)*14);}
    else if(element==='地'){if(Math.random()<.001)crackle=Math.random()*.7;crackle*=.94;v=low*4.8+slow*5+high*crackle*.16+Math.sin(2*Math.PI*(72*t-30*t*t))*Math.exp(-t*9)*.5;}
    else if(element==='風'){v=(w*.2+low*3.2)*Math.sin(Math.PI*u)*(.8+.2*Math.sin(t*43));}
    else if(element==='光'){v=low*.6;for(const [j,f]of [523,784,1046,1568].entries())v+=Math.sin(2*Math.PI*f*t)*.12*Math.exp(-t*(3+j))*Math.min(1,t/.04);}
    else{v=low*2.6+Math.sin(2*Math.PI*65*t)*.2+Math.sin(2*Math.PI*97*t)*.12*Math.sin(t*13)+w*.04;}
    data[i]=Math.tanh(v*1.3)*env*.62;
   }textures.set(key,buffer);
  }const source=ctx.createBufferSource(),gain=ctx.createGain();source.buffer=buffer;source.playbackRate.value=.96+Math.random()*.08;gain.gain.value=strong?.8:.55;source.connect(gain);gain.connect(master);active.add(source);source.onended=()=>{active.delete(source);source.disconnect();gain.disconnect();};source.start();}
 function explosion(){texture('地',true,true);voice(66,28,.7,.3);voice(1400,100,.6,.25,'noise');}

 const samples=new Map(),sampleFailures=new Set();let loadingSamples=false,retrySamplesAt=0;
 function preloadSamples(){if(!ctx||loadingSamples||Date.now()<retrySamplesAt)return;const queue=Object.entries(globalThis.OLYMPUS_SFX||{}).filter(([key])=>!samples.has(key)).sort(([a],[b])=>Number(b.startsWith('ui_'))-Number(a.startsWith('ui_')));if(!queue.length)return;loadingSamples=true;let cursor=0;const worker=async()=>{while(cursor<queue.length){const [key,uri]=queue[cursor++];try{const bytes=await readGameAudioBytes(uri),buffer=await ctx.decodeAudioData(bytes);samples.set(key,buffer);sampleFailures.delete(key);}catch{sampleFailures.add(key);}}};Promise.all(Array.from({length:Math.min(4,queue.length)},worker)).finally(()=>{loadingSamples=false;retrySamplesAt=sampleFailures.size?Date.now()+15000:0;});}

 function sample(key,volume=1,delay=0){if(!ctx||prefs.muted||document.hidden)return false;const buffer=samples.get(key);if(!buffer)return false;if(active.size>=12){const old=active.values().next().value;try{old.stop();}catch{}active.delete(old);}const source=ctx.createBufferSource(),gain=ctx.createGain();source.buffer=buffer;gain.gain.value=volume;source.connect(gain);gain.connect(master);active.add(source);source.onended=()=>{active.delete(source);source.disconnect();gain.disconnect();source.buffer=null;};source.start(ctx.currentTime+delay);return true;}
 function sound(actor,phase,skill=false,events=[]){if(!ctx||prefs.muted)return;const hit=phase==='impact',eff=skill?(actor?.skill?.effects||[]).map(x=>x.type):[],element=({'火':'fire','冰':'ice','水':'water','地':'earth','風':'wind','光':'light','雷':'thunder','冥':'dark','暗':'dark'})[actor?.element]||'dark';
 if(!hit){sample(skill?(actor?.humanRebel?'human_rally_cast':element+'_cast'):/弓|射|箭/.test([actor?.name,actor?.title,actor?.profession].join(' '))?'arrow_release':'attack_swing',skill?.325:.5);return;}
 const damage=events.some(e=>e.kind==='damage');
 if(skill&&actor?.id===HERO_ID&&damage)sample(actor.rarity>=2?'erion_rank_'+actor.rarity+'_impact':'demigod_hammer_impact',.45);else if(damage||!skill)sample(element+'_hit',skill?.45:.55);if(skill&&actor?.limited&&damage)sample('guardian_oath_impact',.3);
 if(eff.some(x=>['heal','regen','cleanse'].includes(x)))sample('heal_restore',.325);
 if(eff.some(x=>['shield','guard'].includes(x)))sample('shield_grant',.325);
 if(eff.some(x=>['weak','vuln','silence','stun','burn'].includes(x)))sample('debuff_apply',actor?.id===HERO_ID?.1:.25);
 if(skill&&!damage&&!eff.some(x=>['heal','regen','cleanse','shield','guard','weak','vuln','silence','stun','burn'].includes(x)))sample('buff_grant',.325);
 if(events.some(e=>e.kind==='damage'&&(e.critical||e.crit)))sample('critical_blast',skill?.4:.8);
 }
 document.addEventListener('pointerdown',unlock,{passive:true});document.addEventListener('keydown',unlock);document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
 document.addEventListener('input',e=>{if(!e.target.matches('[data-combat-volume]'))return;prefs.volume=+e.target.value/100;save();const o=e.target.parentElement.querySelector('output');if(o)o.textContent=e.target.value+'%';});
 document.addEventListener('change',e=>{if(!e.target.matches('[data-combat-mute]'))return;prefs.muted=e.target.checked;save();if(prefs.muted)stop();});
 function save(){try{localStorage.setItem('olympus-combat-audio',JSON.stringify(prefs));}catch{}unlock();}
 function controls(){return '<label><input type="checkbox" data-combat-mute '+(prefs.muted?'checked':'')+'> 靜音戰鬥音效</label><label>戰鬥音效音量 <input aria-label="戰鬥音效音量" type="range" min="0" max="100" value="'+Math.round(prefs.volume*100)+'" data-combat-volume><output>'+Math.round(prefs.volume*100)+'%</output></label>';}
 const cryBuffers=new Map();
 function cryKind(c){const text=[c.name,c.title,c.species,c.profession].join(' ');if(/獅鷲|鷹|鳳|不死鳥|鴞|翼人|鳥/.test(text))return 'eagle';if(/馬|半人馬|獨角/.test(text))return 'horse';if(/狼|犬|狐/.test(text))return 'hound';if(/蛇|龍|蜥/.test(text))return 'serpent';if(/獅|豹|熊|牛|羊|鹿/.test(text))return 'beast';return 'human';}
 function cry(c,dead,delay=0){const kind=cryKind(c),female=c.voiceType==='female'||/雅典娜|赫拉|阿芙洛|阿提|阿耳忒|德墨|珀耳|妮克|尼克斯|赫斯|蓋亞|塞勒|厄俄|女|寧芙/.test(c.name+' '+c.title);sample('hurt_'+(kind==='human'?(female?'female':'male'):kind),dead?.55:.4,delay);if(dead)sample('death_fall',.5,delay+.15);}
 function reactions(events,before,after){if(events.some(e=>e.kind==='revive'))sample('undying_ember_revive',.45);const ids=[...new Set(events.filter(e=>e.kind==='damage'&&e.amount>0).map(e=>e.target))],hits=ids.map(id=>{const a=before.find(u=>u.uid===id),b=after.find(u=>u.uid===id);return a&&b&&a.hp>0?{c:a,dead:b.hp<=0}:null;}).filter(Boolean).sort((a,b)=>Number(b.dead)-Number(a.dead));hits.slice(0,4).forEach((h,i)=>cry(h.c,h.dead,i*.045));}

 const uiPlayers=Object.fromEntries(['button_hover','button_click'].map(key=>{const audio=new Audio(globalThis.OLYMPUS_SFX?.[key]||'');audio.preload='auto';audio.load();return [key,audio];}));
 function uiSound(key,level){if(prefs.muted||document.hidden)return;const audio=uiPlayers[key];if(!audio?.getAttribute('src'))return;audio.pause();audio.currentTime=0;audio.volume=Math.max(0,Math.min(1,prefs.volume*level));audio.play().catch(()=>{});}
 document.addEventListener('visibilitychange',()=>{if(document.hidden)Object.values(uiPlayers).forEach(a=>a.pause());});
 return {sound,stop,controls,reactions,hover(){uiSound('button_hover',.364);},click(){uiPlayers.button_hover.pause();uiSound('button_click',.624);}};
})();

globalThis.olympusAudio=CombatAudio;

(function(){const original=rules;rules=function(){return original()+'<article class="panel panel-pad"><h2>暴擊</h2><p>雙方普攻與傷害技能，每個目標各有 10% 機率造成 150% 傷害。護盾照常吸收傷害；治療、護盾、灼傷及反噬不觸發暴擊。</p></article>';};})();

function iceShatter(layer,x,y,duration,quiet){for(let i=0;i<(quiet?6:22);i++){const shard=document.createElement('i'),angle=i*2.39996,distance=quiet?25:40+(i%7)*14;shard.className='ice-shatter-piece';shard.style.cssText='left:'+x+'px;top:'+y+'px;width:'+(5+i%4*3)+'px;height:'+(13+i%5*4)+'px;';layer.append(shard);shard.animate([{transform:'translate(-50%,-50%) rotate('+i*29+'deg) scale(.35)',opacity:0},{transform:'translate(-50%,-50%) rotate('+i*29+'deg) scale(1)',opacity:1,offset:.12},{transform:'translate(calc(-50% + '+Math.cos(angle)*distance+'px),calc(-50% + '+(Math.sin(angle)*distance+30)+'px)) rotate('+(i*29+120)+'deg) scale(.55)',opacity:0}],{duration:duration+180,fill:'forwards',easing:'cubic-bezier(.12,.65,.25,1)'});}}

/* One recorded orchestral score at a time; skills never stop or layer music. */
const BATTLE_MUSIC_INFO={temple:{title:'神殿・血誓破曉',bpm:152},forest:{title:'森林・月桂疾行',bpm:144},sea:{title:'海戰・怒潮破陣',bpm:150},land:{title:'陸戰・烈旗進軍',bpm:148},sky:{title:'雲階・雷翼突襲',bpm:154},ice:{title:'冰境・霜刃疾襲',bpm:146},night:{title:'冥夜・逆流追魂',bpm:148},gods:{title:'神臨・碎冕決戰',bpm:158}};
function battleMusicScene(n){if(n.id===29)return 'gods';if(n.id===8||n.id===22)return 'forest';if(n.id===4||n.id===23)return 'temple';return ['land','sea','sky','temple','ice','night'][n.terrain]||'land';}
const PAGE_MUSIC_INFO={"home":"厄里昂・逆命之誓","formation":"布陣・同袍並肩","divineCamp":"爐火・凡人的誓約","catalog":"圖鑑・萬族之書","campaign":"征途・遠方的晨光","recruitment":"召喚・星火相逢","enhancement":"覺醒・鍛火成鋼","rules":"法則・智者的棋局","achievements":"榮耀・同行者的勳章","saves":"旅記・不滅的火種","settings":"靜心・秩序之間"};
const BattleScore=(()=>{
 const early=globalThis.olympusEarlyMusic;early?.detach();const player=early?.player||new Audio();player.loop=true;player.preload='auto';let key=early?'page:home':'',ownerSession=early?'pages':null,divineSession=null,playPending=false,failed=false,epoch=0;delete globalThis.olympusEarlyMusic;
 let prefs={volume:.32,muted:false,pageVolume:.28,pageMuted:false};try{Object.assign(prefs,JSON.parse(localStorage.getItem('olympus-score')||'{}'));}catch{}
 prefs.volume=Number.isFinite(Number(prefs.volume))?Math.max(0,Math.min(1,Number(prefs.volume))):.32;
 function stop(){epoch++;player.pause();player.removeAttribute('src');player.load();key='';ownerSession=null;playPending=false;failed=false;}
 function choose(){if(sceneState||globalThis.olympusFilmActive)return null;if(!battle){const page=globalThis.olympusMusicHub||view;if(page==='exit')return null;return 'page:'+(PAGE_MUSIC_INFO[page]?page:'formation');}if(battle.done)return null;const n=nodes[battle.nodeId];if(battle.units.some(u=>u.active&&u.hp>0&&/^O\d+$/.test(u.id)))divineSession=battle.musicSession;return divineSession===battle.musicSession?'gods':battleMusicScene(n);}
 function play(){if(playPending||!player.paused)return;const token=epoch;playPending=true;Promise.resolve(player.play()).catch(()=>{}).finally(()=>{if(token===epoch)playPending=false;});}
 function sync(){const wanted=choose();if(!wanted){if(key)stop();return;}const isPage=wanted.startsWith('page:'),id=isPage?wanted.slice(5):wanted,src=isPage?globalThis.OLYMPUS_PAGE_MUSIC?.[id]:globalThis.OLYMPUS_BATTLE_MUSIC?.[id],session=isPage?'pages':battle.musicSession;if(!src){if(key)stop();return;}if(ownerSession!==session||wanted!==key){stop();ownerSession=session;key=wanted;player.src=src;player.loop=true;failed=false;}const volume=Number(isPage?prefs.pageVolume:prefs.volume);player.volume=Math.max(0,Math.min(1,Number.isFinite(volume)?volume:.28))*(isPage?.65:.7)*((globalThis.goldVoiceActive||globalThis.catalogVoiceActive)?.3:1);player.muted=!!(isPage?prefs.pageMuted:prefs.muted);if(document.hidden||player.muted){player.pause();return;}if(!failed)play();}
 function unlock(){if(failed){failed=false;player.load();}sync();}
 player.addEventListener('error',()=>{failed=true;});
 function controls(){const wanted=choose(),title=wanted?(wanted.startsWith('page:')?PAGE_MUSIC_INFO[wanted.slice(5)]:BATTLE_MUSIC_INFO[wanted].title):'旅程暫歇';return '<label><input type="checkbox" data-page-mute '+(prefs.pageMuted?'checked':'')+'> 靜音頁面與主選單音樂</label><label>頁面音樂音量 <input type="range" min="0" max="100" aria-label="頁面音樂音量" data-page-volume value="'+Math.round(prefs.pageVolume*100)+'"><output>'+Math.round(prefs.pageVolume*100)+'%</output></label><label><input type="checkbox" data-score-mute '+(prefs.muted?'checked':'')+'> 靜音戰鬥配樂</label><label>戰鬥配樂音量 <input type="range" min="0" max="100" aria-label="戰鬥配樂音量" data-score-volume value="'+Math.round(prefs.volume*100)+'"><output>'+Math.round(prefs.volume*100)+'%</output></label><p class="meta">目前配樂：'+title+' · 全遊戲單首播放。</p>'+(failed?'<p class="meta">音樂載入失敗，請確認網路後點擊畫面重試。</p>':'');}
 function save(){try{localStorage.setItem('olympus-score',JSON.stringify(prefs));}catch{}sync();}
 document.addEventListener('pointerdown',unlock,{passive:true});document.addEventListener('keydown',unlock);document.addEventListener('visibilitychange',sync);
 document.addEventListener('input',e=>{if(e.target.matches('[data-score-volume]')){prefs.volume=+e.target.value/100;e.target.parentElement.querySelector('output').textContent=e.target.value+'%';save();}});
 document.addEventListener('change',e=>{if(e.target.matches('[data-score-mute]')){prefs.muted=e.target.checked;save();}});
 document.addEventListener('input',e=>{if(e.target.matches('[data-page-volume]')){prefs.pageVolume=+e.target.value/100;e.target.parentElement.querySelector('output').textContent=e.target.value+'%';save();}});document.addEventListener('change',e=>{if(e.target.matches('[data-page-mute]')){prefs.pageMuted=e.target.checked;save();}});
 return {sync,duck(){},controls};
})();

globalThis.olympusScore=BattleScore;
queueMicrotask(()=>BattleScore.sync());
(function(){const previous=render;render=function(){previous();BattleScore.sync();};})();

(function(){let panel;document.addEventListener('click',e=>{const b=e.target.closest('[data-action="quickSettings"]');if(!b)return;if(!panel){panel=document.createElement('dialog');panel.className='quick-settings-modal';document.body.append(panel);}panel.innerHTML='<header><h2 id="quick-settings-title">基本設定</h2><button type="button" data-settings-close>關閉 ✕</button></header><div class="settings-list"><h3>音樂</h3>'+globalThis.olympusScore.controls()+'<h3>音效</h3>'+globalThis.olympusAudio.controls()+browserVoiceControls()+'</div><p class="meta">音量與靜音會自動儲存。戰鬥中可隨時開啟調整。</p>';panel.setAttribute('aria-labelledby','quick-settings-title');panel.querySelector('[data-settings-close]').onclick=()=>panel.close();if(!panel.open)panel.showModal();});})();

// Result stingers share the battle sound-effects controls and play once at settlement.
(()=>{let active=null,resultKind=null;function sync(){if(!active)return;let p={volume:.45,muted:false};try{Object.assign(p,JSON.parse(localStorage.getItem('olympus-combat-audio')||'{}'));}catch{}active.volume=p.muted?0:Math.max(0,Math.min(1,Number(p.volume)||0))*(resultKind==='victory'?.6:1);}
globalThis.olympusResultSound=kind=>{if(active)active.pause();const src=globalThis.OLYMPUS_RESULT_AUDIO?.[kind];if(!src)return;resultKind=kind;const audio=active=new Audio(src);audio.onended=()=>{audio.removeAttribute('src');audio.load();if(active===audio)active=null;};sync();active.play().catch(()=>{});};
document.addEventListener('input',e=>{if(e.target.matches('[data-combat-volume]'))sync();});document.addEventListener('change',e=>{if(e.target.matches('[data-combat-mute]'))sync();});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&active)active.pause();});})();

// Narration uses recorded clips; gold progress estimates spoken timing from audio energy.
function storyVoiceClip(text){return globalThis.OLYMPUS_STORY_NARRATION?.[text]||BrowserSpeech.clip(text,{gender:'male',rate:-14,pitch:-6});}
function releaseStoryAudio(a){if(!a)return;if(a.dispose){a._goldStop?.();a.dispose();return;}a._goldStop?.();a.onended=a.onerror=null;a.pause();a.removeAttribute('src');a.load();}
async function storySpeechTimeline(clip){
 if(clip.native)return null;
 const cache=storySpeechTimeline.cache||(storySpeechTimeline.cache=new Map());if(cache.has(clip.key||clip.src))return cache.get(clip.key||clip.src);
 const pending=(async()=>{try{const bytes=await readGameAudioBytes(clip.src),C=window.OfflineAudioContext||window.webkitOfflineAudioContext;if(!C)return null;const buffer=await new C(1,1,22050).decodeAudioData(bytes),d=buffer.getChannelData(0),hop=Math.max(1,Math.floor(buffer.sampleRate*.025)),rms=[];let peak=0;for(let i=0;i<d.length;i+=hop){let sum=0,n=Math.min(hop,d.length-i);for(let j=0;j<n;j++)sum+=d[i+j]**2;const v=Math.sqrt(sum/n);rms.push(v);peak=Math.max(peak,v);}const threshold=Math.max(.003,peak*.045),cumulative=[0];for(const v of rms)cumulative.push(cumulative.at(-1)+(v>threshold?1:0));return{cumulative,step:hop/buffer.sampleRate,total:cumulative.at(-1)};}catch{return null;}})();cache.set(clip.key||clip.src,pending);if(cache.size>12)cache.delete(cache.keys().next().value);return pending;
}
function bindStoryGold(a,clip,text,host,scroller=host){
 host.classList.add('narrated-copy');host.setAttribute('aria-label',text);host.innerHTML=Array.from(text).map(c=>'<span aria-hidden="true">'+esc(c)+'</span>').join('');const spans=[...host.children];let frame=0,timeline=null,last=-1,stopped=false;const cached=storySpeechTimeline.cache?.get(clip.key||clip.src);if(cached)cached.then(t=>{if(!stopped)timeline=t;});else a.addEventListener('playing',()=>{setTimeout(()=>{if(!stopped)storySpeechTimeline(clip).then(t=>{if(!stopped)timeline=t;});},500);},{once:true});
 function paint(){if(stopped||!host.isConnected)return;let ratio=Math.min(1,a.currentTime/(a.duration||clip.duration||1));if(timeline?.total)ratio=timeline.cumulative[Math.min(timeline.cumulative.length-1,Math.floor(a.currentTime/timeline.step))]/timeline.total;const count=a.ended?spans.length:Math.floor(ratio*spans.length);if(count!==last){spans.forEach((s,i)=>s.classList.toggle('spoken-gold',i<count));const active=spans[Math.min(count,spans.length-1)];if(active&&scroller.scrollHeight>scroller.clientHeight){const r=active.getBoundingClientRect(),box=scroller.getBoundingClientRect();if(r.bottom>box.bottom-18||r.top<box.top+8)scroller.scrollTo({top:scroller.scrollTop+r.top-box.top-scroller.clientHeight*.4,behavior:'smooth'});}last=count;}frame=requestAnimationFrame(paint);}
 paint();a._goldStop=()=>{stopped=true;cancelAnimationFrame(frame);};return a._goldStop;
}
function mountStoryReading(container,texts,delayMs=0){
 globalThis.stopStoryReading?.();const dialog=container.closest('dialog');container.classList.add('story-reading');container.innerHTML='<div class="narration-controls"><button type="button">暫停旁白</button><small>旁白同步 · 燙金閱讀</small></div><div class="story-reading-scroll"></div>';const button=container.querySelector('button'),scroll=container.querySelector('.story-reading-scroll'),paragraphs=texts.map(text=>{const p=document.createElement('p');p.textContent=text;scroll.appendChild(p);return p;});let index=0,a=null,timer=null,paused=false,disposed=false,watch=0;
 const cleanup=()=>{if(disposed)return;disposed=true;clearTimeout(timer);cancelAnimationFrame(watch);releaseStoryAudio(a);dialog?.removeEventListener('close',cleanup);if(globalThis.stopStoryReading===cleanup)globalThis.stopStoryReading=null;};globalThis.stopStoryReading=cleanup;dialog?.addEventListener('close',cleanup);
 function monitor(){if(!container.isConnected||dialog&&!dialog.open){cleanup();return;}watch=requestAnimationFrame(monitor);}monitor();
 function play(){if(disposed)return;if(index>=texts.length){releaseStoryAudio(a);a=null;button.textContent='重新播放';return;}const text=texts[index],clip=storyVoiceClip(text);if(!clip){button.textContent='此段旁白暫不可用';return;}releaseStoryAudio(a);a=speechClipAudio(clip);a.volume=.8;bindStoryGold(a,clip,text,paragraphs[index],scroll);a.onended=()=>{paragraphs[index].querySelectorAll('span').forEach(s=>s.classList.add('spoken-gold'));index++;play();};a.onerror=()=>{button.textContent='重試旁白';paused=true;};if(!paused)a.play().catch(()=>{if(!disposed){paused=true;button.textContent='播放旁白';}});}
 button.onclick=()=>{if(index>=texts.length){index=0;paragraphs.forEach(p=>p.querySelectorAll('span').forEach(s=>s.classList.remove('spoken-gold')));scroll.scrollTop=0;paused=false;button.textContent='暫停旁白';play();return;}paused=!paused;button.textContent=paused?'繼續旁白':'暫停旁白';if(paused)a?.pause();else if(a)a.play().catch(()=>{paused=true;button.textContent='播放旁白';});else{clearTimeout(timer);play();}};
 timer=setTimeout(play,delayMs);return cleanup;
}

// Show effective outgoing attack and equivalent defense using the engine's multiplicative rules.
function detailedStats(c,live){
 if(!globalThis.olympusStatsReady)return '<div class="stat-grid">'+[['生命',live?live.hp:c.hp],['攻擊',c.atk],['防禦',c.def],['速度',c.spd]].map(([label,value])=>'<div><span>'+label+'</span><strong>'+value+'</strong></div>').join('')+'</div>';
 const base=c.id===HERO_ID?heroCard(c.heroStage??heroStageFor(state),c.rarity):CARD[c.id]||c;
 let u=live,b=live?battle:null;const sources={hp:[],atk:[],def:[],spd:[]},notes={atk:[],def:[],spd:[]};
 if(!u){const campaign=state.mode==='campaign',level=campaign?ascensionLevel(c.id):0,p=starPowers(c,level),scale=campaign?1+state.cleared*.02:1,growth=campaign?ascensionFactor(c):1;
 const party=lineup().map((id,i)=>id?{...CARD[id],uid:'preview-'+i,side:0,slot:i,active:i<6,hp:CARD[id].hp,status:[]}:null).filter(Boolean);const slot=party.findIndex(v=>v.id===c.id);u={...c,growthScale:scale,uid:slot>=0?party[slot].uid:'unplaced',side:0,active:slot>=0&&party[slot].active,status:[],max:Math.round(c.hp*scale),hp:0,atk:Math.round(c.atk*scale),def:Math.round(c.def*scale),starPowers:p,ascension:level};const aura=Math.max(0,...party.filter(v=>v.active&&v.passive?.type==='teamhp').map(v=>v.passive.value));u.teamHpAura=aura;u.teamHpSources=party.filter(v=>v.active&&v.passive?.type==='teamhp'&&v.passive.value===aura).map(v=>v.name);u.max=Math.round(Math.round(u.max*(1+aura))*growth*(1+p.hp));u.hp=u.max;u.atk=Math.round(u.atk*growth*(1+p.attack));u.def=Math.round(u.def*growth*(1+p.defense));b={units:party.map(v=>v.id===u.id?u:v),terrain:TERRAINS[nodes[state.node].terrain]};if(slot<0)b.units.push(u);
 }
 const add=(k,label,amount)=>{if(amount)sources[k].push(label+' '+(amount>0?'+':'')+(amount*100).toFixed(1).replace('.0','')+'%');};
 for(const [k,value]of [['hp',u.max],['atk',u.atk],['def',u.def]]){const origin=base[k];if(value!==origin)sources[k].push('基礎 '+origin+' → 成長後 '+value+'（永久成長與戰鬥倍率已計入）');}
 if(u.side===0&&state.mode==='campaign'){for(const k of ['hp','atk','def']){add(k,'征途成長',(u.growthScale||1)-1);add(k,'升星',((u.ascension??ascensionLevel(c.id))*recruitRules().growth[ascensionTier(base)]));}for(const t of starTraits(base).slice(0,u.id===HERO_ID&&u.rarity>1?5:u.ascension??ascensionLevel(c.id))){const k={hp:'hp',attack:'atk',defense:'def'}[t.key];if(k)add(k,t.name,t.value);}}
 if(u.side===1)for(const k of ['hp','atk','def'])add(k,'本關守軍倍率',(u.growthScale||1)-1);if(u.teamHpAura)add('hp','生命光環・'+(u.teamHpSources||[]).join('／'),u.teamHpAura);
 const bi=bondInfo(b,u);for(const l of bi.on){if(l.type==='attack')add('atk','羈絆「'+l.title+'」・'+CARD[l.partner].name,BOND_KINDS.attack.value);if(l.type==='defense')add('def','羈絆「'+l.title+'」・'+CARD[l.partner].name,BOND_KINDS.defense.value);}
 let attack=bondAttack(b,u),defense=bondDefense(b,u),out=1,incoming=1;
 const statusFactor=(type,key,sign)=>{const value=status(u,type);if(!value)return 1;const s=u.status.find(v=>v.type===type&&v.value===value);add(key,(STATUS[type]||type)+'・'+(s?.sourceName||'既有狀態')+(s?.sourceSkill?'「'+s.sourceSkill+'」':''),sign*value);return 1+sign*value;};
 out*=statusFactor('boost','atk',1)*statusFactor('weak','atk',-1);incoming*=statusFactor('guard','def',-1)*statusFactor('vuln','def',1);
 // Defense uses inverse damage multipliers. Relabel the source signs for clarity below.
 sources.def=sources.def.map(x=>x.startsWith('減傷')?x.replace(' -',' 承傷 -'):x.startsWith('易傷')?x.replace(' +',' 承傷 +'):x);
 const p=u.passive;if(p?.type==='damage'||p?.type==='rage'&&u.hp/u.max<.5){out*=1+p.value;add('atk',p.name,p.value);}if(p?.type==='rage'&&u.hp/u.max>=.5)notes.atk.push(p.name+'：生命低於一半才啟動');if(p?.type==='execute')notes.atk.push(p.name+'：對生命低於一半目標增傷 '+pct(p.value)+'，依目標另計');
 if(p?.type==='armor'){incoming*=1-p.value;add('def',p.name+'・承傷',-p.value);}if(p?.type==='pierce')notes.atk.push(p.name+'：忽略目標 '+pct(p.value)+' 防禦，依目標另計');
 const allies=active(b,u.side),enemies=active(b,1-u.side);const human=u.rarity<2?Math.max(0,...allies.filter(x=>x.passive?.type==='human').map(x=>x.passive.value)):0;if(human){out*=1+human;add('atk','同伴光環・'+allies.filter(x=>x.passive?.type==='human'&&x.passive.value===human).map(x=>x.name).join('／'),human);}
 const guards=allies.filter(x=>x.passive?.type==='teamguard'),guard=Math.max(0,...guards.map(x=>x.passive.value));if(guard){incoming*=1-guard;add('def','同伴減傷・'+guards.filter(x=>x.passive.value===guard).map(x=>x.name).join('／'),-guard);}
 if(bi.bonus==='might'){out*=1.15;add('atk','三羈絆・神意共鳴',.15);}if(bi.bonus==='guard'){incoming*=.85;add('def','三羈絆・誓約庇護・承傷',-.15);}
 const oppress=enemies.filter(x=>bondInfo(b,x).bonus==='oppress'),expose=enemies.filter(x=>bondInfo(b,x).bonus==='expose');if(oppress.length){out*=.9;add('atk','神域壓制・'+oppress.map(x=>x.name).join('／'),-.1);}if(expose.length){incoming*=1.1;add('def','破陣神諭・'+expose.map(x=>x.name).join('／')+'・承傷',.1);}
 if(u.starPowers?.damage){out*=1+u.starPowers.damage;add('atk','固定星階・直接傷害',u.starPowers.damage);}if(u.starPowers?.guard){incoming*=1-u.starPowers.guard;add('def','固定星階・承傷',-u.starPowers.guard);}
 const terrain=terrainFactor(u,b.terrain);out*=terrain;if(terrain!==1)add('atk','場景「'+b.terrain.name+'」・'+u.element,terrain-1);
 if(u.divinePowers?.damage)notes.atk.push('營地神力：對紫／橙卡增傷 '+pct(u.divinePowers.damage)+'，依目標另計');if(u.divinePowers?.guard)notes.def.push('營地神力：受紫／橙卡攻擊減傷 '+pct(u.divinePowers.guard)+'，依攻擊者另計');if(u.starPowers?.pierce||u.divinePowers?.pierce)notes.atk.push('星階／營地穿透依目標另計');
 attack*=out;defense=(100+defense)/Math.max(.01,incoming)-100;let spd=speed(u);statusFactor('haste','spd',1);if(p?.type==='speed')add('spd',p.name,p.value);
 notes.spd.push('目前出手順序由手動選擇／自動克制排序決定，速度不改變本輪順序。');
 const ratio=u.max?Math.max(0,u.hp/u.max):0,hpClass=ratio>.7?'stat-positive':ratio>0&&(u.side===1?ratio>.35:ratio>=.35)?'stat-wounded':ratio>0?'stat-critical':'stat-neutral';
 sources.hp.unshift('生命 '+u.hp+' / '+u.max+'（'+Math.round(ratio*100)+'%）');if(u.shield)sources.hp.push('現有護盾 '+u.shield+'，獨立於生命');
 const rows=[['hp','生命',u.hp,u.max,hpClass],['atk','攻擊',attack,base.atk],['def','防禦',defense,base.def],['spd','速度',spd,base.spd]];
 return '<div class="stat-grid live-stat-grid">'+rows.map(([k,label,value,origin,color])=>{const delta=value-origin;const title=[label+'：'+Math.round(value),...(sources[k].length?sources[k]:['無增減益']),...(notes[k]||[])];if(k==='atk')title.push('顯示常駐效果後的等效攻擊；屬性克制、暴擊、技能倍率依目標另計。');if(k==='def')title.push('含减傷／易傷的等效防禦；實際防禦 '+Math.round(bondDefense(b,u))+'，承傷倍率 '+incoming.toFixed(3)+'。穿透依攻擊者另計。');if(k!=='hp')title.push('按實際乘算後淨結果著色；與本形態基礎值比較。');return '<div class="stat-cell" data-stat-unit="'+u.uid+'" data-stat-key="'+k+'" tabindex="0" title="'+esc(title.join('\n'))+'" aria-label="'+esc(title.join('；'))+'"><span>'+label+'</span><strong class="'+(color||(Math.abs(delta)<.01?'stat-neutral':delta>0?'stat-positive':'stat-negative'))+'">'+Math.round(value)+'</strong><small>'+(k==='hp'?Math.round(ratio*100)+'%':Math.abs(delta)<.01?'基礎':(delta>0?'+':'')+Math.round(delta))+'</small></div>';}).join('')+'</div>';
}

function heroHammerFinale(layer,hits,duration,quiet,stage){
 for(const hit of hits){const ring=document.createElement('i');ring.className='hero-impact-sigil';ring.style.cssText='left:'+hit.x+'px;top:'+hit.y+'px;--hero-impact-color:'+(['#d8b77a','#91c9f5','#ef9a61','#ffe5a0'][stage]||'#ffe5a0');ring.classList.add('hero-rank-impact-'+stage);layer.append(ring);ring.animate([{transform:'translate(-50%,-50%) scale(.15) rotate(-70deg)',opacity:1},{transform:'translate(-50%,-50%) scale('+(1.1+stage*.25)+') rotate(20deg)',opacity:.9,offset:.35},{transform:'translate(-50%,-50%) scale(1.8) rotate(55deg)',opacity:0}],{duration,fill:'forwards'});if(!quiet)for(let i=0;i<8+stage*4;i++){const shard=document.createElement('i');shard.className='hero-impact-fragment';const angle=i*2.399,d=90+stage*35+i%3*20;shard.style.cssText='left:'+hit.x+'px;top:'+hit.y+'px;';layer.append(shard);shard.animate([{transform:'rotate('+i*31+'deg) scale(.2)',opacity:1},{transform:'translate('+Math.cos(angle)*d+'px,'+Math.sin(angle)*d+'px) rotate('+i*83+'deg) scale(.8)',opacity:.9,offset:.5},{transform:'translate('+Math.cos(angle)*d*1.2+'px,'+(Math.sin(angle)*d+60)+'px) rotate('+i*120+'deg) scale(.1)',opacity:0}],{duration,fill:'forwards'});}}
}
document.addEventListener('click',e=>{if(!e.target.closest('[data-action="heroChronicle"]'))return;stopNodeStory();const d=document.getElementById('detail'),stage=heroStageFor(state);d.className='hero-chronicle-dialog';d.innerHTML='<header><span class="eyebrow">THE RISE OF ERION</span><h2>厄里昂：從灰燼到逆命</h2><button data-action="close">關閉 ✕</button></header><div class="hero-chronicle-art" style="--hero-position:'+stage*50+'%"></div><section class="hero-narration"></section>';if(!d.open)d.showModal();const clips=Object.values(globalThis.OLYMPUS_STORY_NARRATION||{}).filter(x=>/^hero_story_/.test(x.key)).sort((a,b)=>Number(a.key.split('_').at(-1))-Number(b.key.split('_').at(-1)));const texts=Object.entries(globalThis.OLYMPUS_STORY_NARRATION||{}).filter(([,clip])=>clips.slice(0,6+stage).includes(clip)).sort((a,b)=>Number(a[1].key.split('_').at(-1))-Number(b[1].key.split('_').at(-1))).map(([text])=>text);mountStoryReading(d.querySelector('.hero-narration'),texts);});

globalThis.olympusStatsReady=true;render();

function resolveInnateRevival(b){for(const u of b.units){if(u.hp>0||!u.active||u.innate?.type!=='revive'||u.innateRevived)continue;u.innateRevived=true;u.hp=Math.max(1,Math.round(u.max*u.innate.value));emit(b,{kind:'revive',target:u.uid,amount:u.hp,label:u.innate.name});emit(b,{kind:'heal',target:u.uid,amount:u.hp});b.log.push(u.name+' 的天生神性「'+u.innate.name+'」觸發：原位復活，恢復 '+u.hp+' 生命（本場已使用）。');}}
function innateDivinityHtml(c,live){if(!c.innate)return '';return '<section class="innate-divinity"><h3>天生神性 · '+esc(c.innate.name)+'</h3><p>'+esc(c.innate.desc)+'</p><strong class="'+(live?.innateRevived?'spent':'ready')+'">'+(live?.innateRevived?'本場已觸發 · 不可再次復活':'每場一次 · 尚未觸發')+'</strong></section>';}

function heroAscensionPanel(c){const r=ensureRecruitment(),level=ascensionLevel(c.id),rank=r.heroRank,cost=recruitRules().costs[rank][level],gate={1:6,2:15,3:22}[rank],can=rank<4&&level===5&&state.cleared>=gate&&!battle;return '<section class="ascension-panel"><h3>主角培養 · '+RARITIES[rank]+'卡 '+level+' / 5 星</h3><p>'+RARITIES[rank]+'色殘魂 '+r.souls[rank]+' · 本階生命／攻擊／防禦 +'+Math.round((ascensionFactor(c)-1)*100)+'%</p><button data-action="ascend" data-id="H001" '+(battle||level>=5||r.souls[rank]<cost?'disabled':'')+'>'+(level>=5?'本階五星已滿':'升星 · '+cost+' '+RARITIES[rank]+'色殘魂')+'</button>'+(rank<4?'<button class="primary" data-action="promoteProtagonist" '+(can?'':'disabled')+'>轉階為'+RARITIES[rank+1]+'卡 · 零星</button><p>條件：本階五星，並通關第 '+gate+' 關。轉階不另收材料，數值約提高 7%，五星能力保留一份；星數歸零，改用'+RARITIES[rank+1]+'色殘魂。</p>':'<p>已達最高卡色；橙卡五星為培養上限。</p>')+'<p class="meta">僅厄里昂可轉階。劇情覺醒不再自動提升卡色與基礎數值；不滅命火維持每場一次、20% 生命復活。</p>'+heroSkillEvolutionPanel(rank)+starTraitPanel(c)+'</section>';}
document.addEventListener('click',e=>{if(!e.target.closest('[data-action="promoteProtagonist"]'))return;if(battle||state.mode!=='campaign')return;const r=ensureRecruitment(),rank=r.heroRank;if(rank>=4||ascensionLevel(HERO_ID)!==5||state.cleared<({1:6,2:15,3:22}[rank]))return;r.heroRank=rank+1;r.ascensions[HERO_ID]=0;syncHeroProgress();persist();render();openEnhancement(HERO_ID,true);toast('厄里昂已轉階為'+RARITIES[r.heroRank]+'卡零星，覺醒「'+CARD[HERO_ID].skill.name+'」。');});

function cardProfession(c){
 const text=[c.profession,c.title,c.name,c.skill?.name].join(' ');
 if(c.id===HERO_ID)return ['戰鎚勇士','M8 3h12v7H8zM12 10v11M6 5H3v5h5'];
 if(/弓|射擊|箭|獵月/.test(text))return ['弓箭手','M6 3q18 9 0 18M6 3v18M3 12h18m-4-4 4 4-4 4'];
 if(/療|醫|包紮|救護|牧師/.test(text)||c.role==='輔助')return ['牧師／支援','M9 3h6v6h6v6h-6v6H9v-6H3V9h6z'];
 if(/咒|術|符文|法杖/.test(text))return ['術士','M5 21 15 7M15 2l2 3 4 1-3 3v4l-4-2-4 1 1-4-2-3z'];
 if(c.role==='增益坦'||/盾|護衛|守衛/.test(text))return ['盾衛','M12 2 21 6v6q-1 7-9 10-8-3-9-10V6zM12 6v12M7 10h10'];
 if(c.role==='減益坦')return ['破陣戰士','M12 2 20 6v6q-1 6-8 10-7-4-8-10V6zM7 17 18 5M14 5h4v4'];
 if(/槍|矛/.test(text))return ['槍兵','M4 21 17 8M15 9l-1-5 7-2-2 7z'];
 return ['近戰戰士','M4 20 17 7M14 7l4-4 3 0v3l-4 4M6 13l5 5M3 18l3 3'];
}
function cardSymbolStrip(c,stars){
 const links=c.bonds||CARD[c.id]?.bonds||[];let on=0;
 if(globalThis.olympusStatsReady){if(c.uid&&battle)on=bondInfo(battle,c).on.length;else if(c.side!==1){const party={units:lineup().map((id,i)=>id?{...CARD[id],uid:'symbol-'+i,side:0,active:i<6,hp:1}:null).filter(Boolean)},u=party.units.find(x=>x.id===c.id);if(u)on=bondInfo(party,u).on.length;}}
 const [job,path]=cardProfession(c),svg=p=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+p+'"/></svg>';
 return '<span class="card-symbols"><span class="art-crest" title="'+esc(c.element+'屬性')+'">'+(EICON[c.element]||'◇')+'</span><span class="card-bond-symbol '+(on?'bond-lit':'')+'" title="羈絆：'+on+' / '+links.length+' 已啟動'+(c.id===HERO_ID?'；僅需自身上場存活':'；夥伴需上場且存活')+'">'+svg('M10 14 14 10M8 16l-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0M16 8l2-2a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0')+'<b>'+on+'/'+links.length+'</b></span><span class="card-job-symbol" title="'+esc('職業：'+job+'；種族：'+(c.species||'神族'))+'">'+svg(path)+'</span><span class="rank-stars" title="進階 '+stars+' 星">★'+stars+'</span></span>';
}

function limitedPoolGroups(){return RARITIES.map((_,i)=>cards.filter(c=>c.id!==HERO_ID&&!c.storyExclusive&&c.limited&&c.rarity===i&&c.poolUnlock<=state.cleared));}
function limitedPoolView(){const ownedIds=new Set(ensureRecruitment().owned),groups=limitedPoolGroups(),weights=recruitRules().weights,total=groups.reduce((a,g,i)=>a+(g.length?weights[i]:0),0),count=groups.flat().length,embers=campProgress().embers,disabled=state.mode!=='campaign'||!count;return '<section class="limited-pool panel panel-pad"><article class="story-exclusive-showcase">'+avatar(CARD[HERO_ID],'mini-avatar')+'<div><span class="limited-label">劇情限定 · 唯一角色</span><h3>厄里昂</h3><p>新遊戲劇情取得，僅持有一位。卡色進化沿用同一角色；所有召喚池皆無法抽取。</p></div><button class="small" data-action="inspect" data-id="H001">角色詳情</button></article><div class="phase-head"><div><span class="limited-label">劇情限定 · 三十道守護誓約</span><h2>關隘守護者召喚</h2><p>已解鎖 '+count+' / 30 名 · 通關對應關卡後永久加入本池</p></div><div class="row"><button data-action="summonLimited" data-id="1" '+(disabled||embers<1000?'disabled':'')+'>限定 1 抽 · 1000 餘燼</button><button data-action="summonLimited" data-id="11" '+(disabled||embers<10000?'disabled':'')+'>限定 11 抽 · 10000 餘燼</button></div></div><p>非保底抽取：2% 限定守護者、98% 已解鎖普通卡。連續 49 抽未出限定，第 50 抽必得限定；抽中限定（含重複）即重置，11 抽逐抽累計並跨次保存。限定保底與普通池保底互相獨立。限定指卡池專屬，不設限時；重複轉同色殘魂。</p><p class="limited-pity">限定保底：'+ensureRecruitment().limitedPity+' / 50 · 最多再 '+(50-ensureRecruitment().limitedPity)+' 抽必出限定</p><p class="meta">機率浮動說明：非保底的限定機率固定為 2%，普通卡為 98%；第 50 抽限定保底例外。下列百分比是「已抽中限定後」的卡色分布，僅將已解鎖卡色的權重換算為 100%，會隨新卡色解鎖變動。限定內同色角色等機率，新角色加入也會改變個別角色機率。98% 普通卡部分依普通池卡色權重抽取，不觸發普通池保底。'+groups.map((g,i)=>g.length?'<span class="rarity-label r'+i+'">'+RARITIES[i]+' '+(weights[i]/total*100).toFixed(2)+'%</span>':'').filter(Boolean).join(' ／ ')+'</p><details><summary>查看 30 名守護者、解鎖條件與個別機率</summary><div class="guardian-pool-list">'+cards.filter(c=>c.limited).map(c=>'<article class="r'+c.rarity+'">'+avatar(c,'mini-avatar')+'<div><strong class="pool-roster-name'+(ownedIds.has(c.id)?' is-owned':'')+'"'+(ownedIds.has(c.id)?' style="color:#827f79;text-shadow:none" title="已擁有"':' title="尚未擁有"')+'>'+esc(c.name)+'</strong><p>第 '+c.poolUnlock+' 關 · '+esc(nodes[c.guardianNode].name)+'</p><small>'+RARITIES[c.rarity]+'卡 · '+(c.poolUnlock<=state.cleared?'已開放 · 非保底單抽 '+(weights[c.rarity]/total/groups[c.rarity].length*2).toFixed(4)+'% · 保底抽 '+(weights[c.rarity]/total/groups[c.rarity].length*100).toFixed(2)+'%':'未通關 · 機率 0%')+'</small></div><button class="small" data-action="inspect" data-id="'+c.id+'">詳情</button></article>').join('')+'</div></details></section>';}
function summonLimited(count){if(battle||state.mode!=='campaign'||![1,11].includes(count))return;const groups=limitedPoolGroups(),weights=recruitRules().weights,active=groups.map((g,i)=>g.length?i:-1).filter(i=>i>=0),price=count===11?10000:1000,camp=campProgress();if(!active.length){toast('先通過第一關，解鎖限定守護者。');return;}if(camp.embers<price){toast('餘燼不足。');return;}const r=ensureRecruitment(),own=new Set(r.owned),results=[],total=active.reduce((a,i)=>a+weights[i],0);for(let k=0;k<count;k++){const guaranteed=r.limitedPity>=49,isLimited=guaranteed||Math.random()<.02,drawGroups=isLimited?groups:poolGroups(),drawActive=drawGroups.map((g,i)=>g.length?i:-1).filter(i=>i>=0),drawTotal=drawActive.reduce((a,i)=>a+weights[i],0);let roll=Math.random()*drawTotal,tier=drawActive.at(-1);for(const i of drawActive){roll-=weights[i];if(roll<0){tier=i;break;}}const c=drawGroups[tier][randomInt(0,drawGroups[tier].length-1)],duplicate=own.has(c.id),souls=duplicate?recruitRules().soulBase[tier]:0;if(duplicate)r.souls[tier]=Math.min(1000000000,r.souls[tier]+souls);else own.add(c.id);r.limitedPity=c.limited?0:r.limitedPity+1;results.push({c,duplicate,souls,guaranteed});}camp.embers-=price;r.owned=[...own];r.draws+=count;persist();render();const d=document.getElementById('detail');d.className='summon-dialog';d.removeAttribute('aria-labelledby');d.innerHTML='<h2>限定守護者 · 召喚結果</h2><p>'+count+' 張 · 消耗 '+price+' 餘燼 · 限定保底 '+r.limitedPity+' / 50</p><div class="summon-results">'+results.map(({c,duplicate,souls,guaranteed},i)=>'<article class="summon-card r'+c.rarity+(c.limited?' summon-limited-reveal':c.rarity===4?' summon-gold-reveal':'')+'" style="--reveal-delay:'+Math.min(i,10)*.07+'s">'+avatar(c,'summon-portrait')+'<span class="limited-label">'+(c.limited?(guaranteed?'保底限定':'限定'):'普通')+' · '+RARITIES[c.rarity]+'卡</span><h3>'+esc(c.name)+'</h3><p>'+(duplicate?'重複 · 同色殘魂 +'+souls:(c.limited?'新守護誓約 · 已加入收藏':'新同行者 · 已加入收藏'))+'</p><button data-action="selectForFormation" data-id="'+c.id+'">查看／布陣</button></article>').join('')+'</div><div class="row summon-repeat"><button data-action="summonLimited" data-id="'+count+'" '+(camp.embers<(count===11?10000:1000)?'disabled':'')+'>'+(count===11?'再抽 11 次':'再抽一次')+'</button><button data-action="close">收下並返回</button></div>';if(!d.open)d.showModal();{const rareIndex=results.findIndex(r=>r.c.limited||r.c.rarity===4);if(rareIndex>=0)void playLegendaryDrawSFX({delay:rareIndex*.07});}}

/* Pointer hover feedback: one sound per entry, capped during rapid traversal. */
(()=>{
 let lastSound=0,lastClick=0;
 const selector='button:not(:disabled),.card,.summon-card,.replay-unit,.enemy-mini,[role="button"]';
 document.addEventListener('pointerover',e=>{
  if(e.pointerType!=='mouse'||!matchMedia('(hover:hover)').matches)return;
  const el=e.target.closest?.(selector);
  if(!el||el.matches(':disabled,[aria-disabled="true"]')||el.contains(e.relatedTarget))return;
  if(!document.body.classList.contains('quiet-motion')&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
   el.classList.remove('ui-spring');void el.offsetWidth;el.classList.add('ui-spring');
  }
  const now=performance.now();if(now-lastSound>100){lastSound=now;globalThis.olympusAudio?.hover();}
 });
 document.addEventListener('pointerout',e=>{const el=e.target.closest?.(selector);if(el&&!el.contains(e.relatedTarget))el.classList.remove('ui-spring');});
 document.addEventListener('click',e=>{
  const el=e.target.closest?.(selector);
  if(!el||el.matches(':disabled,[aria-disabled="true"]'))return;
  const now=performance.now();if(now-lastClick<60)return;lastClick=now;
  queueMicrotask(()=>globalThis.olympusAudio?.click());
 },true);
 const previous=render;
 function values(){
  const result=new Map();
  document.querySelectorAll('[data-action="unit"] .unit-vitals small,[data-stat-unit] strong').forEach(el=>{
   const unit=el.closest('[data-action="unit"]'),cell=el.closest('[data-stat-unit]');
   const key=unit?'unit:'+unit.dataset.id:'stat:'+cell.dataset.statUnit+':'+cell.dataset.statKey;
   result.set(key,{text:el.textContent,el});
  });return result;
 }
 render=function(){
  const session=battle?.musicSession,before=values();previous();
  if(!battle||session!==battle.musicSession||document.hidden||document.body.classList.contains('quiet-motion')||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  for(const [key,current] of values()){
   if(!before.has(key)||before.get(key).text===current.text)continue;
   const rect=current.el.getBoundingClientRect();if(!rect.width||rect.bottom<0||rect.top>innerHeight)continue;
   current.el.animate([{transform:'scale(1)'},{transform:'translateY(-3px) scale(1.1)'},{transform:'scale(1)'}],{duration:300,easing:'ease-out'});
   const echo=document.createElement('span');echo.className='battle-number-echo';echo.textContent=current.text;
   const style=getComputedStyle(current.el);Object.assign(echo.style,{left:rect.left+'px',top:rect.top+'px',fontSize:style.fontSize,color:style.color});
   document.body.append(echo);setTimeout(()=>echo.remove(),700);
  }
 };
})();


/* Gold ultimates match both stable card identity and the real skill name. */
let catalogPreviewAudio=null,catalogPreviewTimer=null;
function catalogVoiceRecord(c){if(c.rarity===4&&c.skill)return goldSkillRecord(c,c.skill.name);return globalThis.OLYMPUS_CARD_VOICES?.[c.id]||globalThis.OLYMPUS_GOLD_ULTIMATES?.[c.id]||null;}
function catalogPreviewPanel(c){const voice=catalogVoiceRecord(c);return '<section class="catalog-preview-panel"><h3>角色預覽</h3><div class="catalog-preview-actions">'+(voice?'<button data-action="voicePreview" data-id="'+c.id+'">♫ 語音試聽</button><button class="small ghost" data-action="stopVoicePreview">停止語音</button>':'')+(c.skill?'<button data-action="skillPreview" data-id="'+c.id+'">✦ 技能預覽</button>':'')+'</div><p class="meta" data-voice-status="'+c.id+'" aria-live="polite">'+(voice?'試聽 '+esc(c.name)+' 的專屬台詞。':c.skill?'預覽目前卡色的技能演出。':'本卡僅有普通攻擊，沒有奧義或專屬語音。')+'</p></section>';}
function stopCatalogVoice(){clearTimeout(catalogPreviewTimer);catalogPreviewTimer=null;releaseStoryAudio(catalogPreviewAudio);catalogPreviewAudio=null;globalThis.catalogVoiceActive=false;globalThis.olympusScore?.sync();document.querySelectorAll('[data-voice-status]').forEach(el=>{if(el.dataset.playing){delete el.dataset.playing;el.textContent='語音已停止，可重新試聽。';}});}
function playCatalogVoice(id){if(busy||battle)return;const c=CARD[id],clip=c&&catalogVoiceRecord(c);if(!clip)return;stopCatalogVoice();let prefs={volume:.45,muted:false};try{Object.assign(prefs,JSON.parse(localStorage.getItem('olympus-combat-audio')||'{}'));}catch{}const statuses=()=>document.querySelectorAll('[data-voice-status="'+id+'"]');const status=text=>statuses().forEach(el=>{el.textContent=text;el.dataset.playing='true';});if(prefs.muted||Number(prefs.volume)<=0){statuses().forEach(el=>el.textContent='目前音效已靜音，請至設定開啟音效後試聽。');return;}const a=catalogPreviewAudio=speechClipAudio(clip);a.volume=Math.min(1,Number(prefs.volume)*1.25);a.preload='auto';status('正在載入語音…');globalThis.catalogVoiceActive=true;globalThis.olympusScore?.sync();const finish=text=>{if(catalogPreviewAudio!==a)return;stopCatalogVoice();statuses().forEach(el=>el.textContent=text);};a.onplaying=()=>{clearTimeout(catalogPreviewTimer);status(clip.text||[clip.whisper,clip.roar].filter(Boolean).join(' '));};a.onended=()=>finish('試聽完畢，可再次播放。');a.onerror=()=>finish('語音載入失敗，請再試一次。');catalogPreviewTimer=setTimeout(()=>finish('語音載入逾時，請再試一次。'),15000);a.play().catch(()=>finish('未能播放語音，請再次點擊試聽。'));}
async function previewCatalogSkill(id){
 const c=CARD[id];if(!c?.skill||busy||battle)return;stopCatalogVoice();
 const host=document.getElementById('stageOverlay'),parent=host.parentNode,next=host.nextSibling,oldStyle=host.getAttribute('style');
 const dialog=document.createElement('dialog');dialog.className='catalog-skill-preview';dialog.setAttribute('aria-label',c.name+'技能預覽');
 dialog.innerHTML='<header><div><small>'+esc(c.name)+' · '+RARITIES[c.rarity]+'卡</small><h2>'+esc(c.skill.name)+'</h2><p>演出預覽 · 不消耗資源</p></div><button autofocus type="button">關閉預覽 ✕</button></header><footer>'+skillText(c.skill)+'</footer>';
 document.body.append(dialog);dialog.append(host);Object.assign(host.style,{left:'0',top:'0',width:'100vw',height:'100dvh'});
 let closed=false;const end=()=>{if(closed)return;closed=true;cancelPresentation();host.innerHTML='';if(next?.parentNode===parent)parent.insertBefore(host,next);else parent.append(host);if(oldStyle===null)host.removeAttribute('style');else host.setAttribute('style',oldStyle);dialog.close();dialog.remove();};
 dialog.querySelector('button').onclick=end;dialog.addEventListener('cancel',e=>{e.preventDefault();end();});dialog.addEventListener('close',end);dialog.showModal();busy=true;const epoch=presentationEpoch;
 try{if(goldSkillRecord(c,c.skill.name)){await showSkillFilm(c,{name:c.skill.name,element:c.element},epoch);}else if(await showStage('cast',c.skill.name,c.name+' · 奧義',epoch,ELEMENT_COLORS[c.element])){CombatAudio.sound(c,'launch',true,[]);const film=showSkillFilm(c,{name:c.skill.name,element:c.element},epoch);if(await waitPresentation(motionDuration('skill')*.5,epoch))CombatAudio.sound(c,'impact',true,[{kind:c.skill.power>0?'damage':'buff'}]);await film;}}finally{end();}
}
document.getElementById('detail').addEventListener('close',()=>stopCatalogVoice());
window.addEventListener('pagehide',()=>stopCatalogVoice());
// Native browser speech: no API keys, remote generation calls or audio downloads.
const BrowserSpeech=(()=>{
 const synth=globalThis.speechSynthesis;let voices=[],active=null;
 const refresh=()=>{voices=synth?.getVoices()||[];};refresh();synth?.addEventListener('voiceschanged',refresh);
 function choose(c){refresh();const tw=voices.filter(v=>/^(zh|cmn)[-_]TW$/i.test(v.lang)),zh=voices.filter(v=>/^(zh|cmn)(-|_|$)/i.test(v.lang));const pool=tw.length?tw:zh;const female=c.gender==='female'||c.voiceType==='female';const hint=female?/female|曉|晓|hsiao|hanhan|美嘉|meijia|yating/i:/yunjhe|雲哲|云哲|zhiwei|志偉|male\b/i;return [...pool].sort((a,b)=>(Number(hint.test(b.name)&&!( !female&&/female/i.test(b.name)))*4+Number(b.localService))-(Number(hint.test(a.name)&&!(!female&&/female/i.test(a.name)))*4+Number(a.localService)))[0];}
 function clip(text,character={}){return {native:true,text,character,src:'speech:'+text,duration:Math.max(1.5,text.length/3.5)};}
 function audio(record){
  const a=new EventTarget();let utterance=null,elapsed=0,started=0,watch=null,deadline=null,disposed=false;
  Object.assign(a,{volume:1,ended:false,paused:true,duration:record.duration||3,preload:'auto'});
  Object.defineProperty(a,'currentTime',{get:()=>elapsed+(started?(performance.now()-started)/1000:0),set:v=>{elapsed=v;started=0;}});
  const emit=name=>{a['on'+name]?.();a.dispatchEvent(new Event(name));};
  const clean=()=>{clearTimeout(watch);clearTimeout(deadline);if(utterance)utterance.onstart=utterance.onend=utterance.onerror=null;};
  a.dispose=()=>{disposed=true;clean();if(active===a){synth?.cancel();active=null;}started=0;utterance=null;};
  a.pause=()=>{if(started)elapsed=a.currentTime;started=0;a.paused=true;if(active===a)synth?.pause();};
  a.removeAttribute=()=>a.dispose();a.load=()=>{};
  a.play=()=>{
   if(disposed||!synth||!globalThis.SpeechSynthesisUtterance)return Promise.reject(Error('此瀏覽器未提供語音合成'));
   if(active===a&&utterance&&a.paused){a.paused=false;started=performance.now();synth.resume();return Promise.resolve();}
   active?.dispose();active=a;a.paused=false;a.ended=false;
   const c=record.character||{},u=utterance=new SpeechSynthesisUtterance(record.text.replaceAll('・',record.character?.delivery==='heroic'?'！':'，')+(record.character?.delivery==='heroic'?'！':''));u.lang='zh-TW';const v=choose(c);if(v)u.voice=v;
   u.rate=Math.max(.72,Math.min(1.22,1+Number(c.rate??-12)/100));u.pitch=Math.max(.65,Math.min(1.2,1+Number(c.pitch??-5)/100));u.volume=Math.max(0,Math.min(1,a.volume*(c.delivery==='heroic'?1.6:1)));
   return new Promise((resolve,reject)=>{
    watch=setTimeout(()=>{a.dispose();reject(Error('語音啟動逾時，請點擊試聽啟用'));emit('error');},5000);
    u.onstart=()=>{clearTimeout(watch);started=performance.now();emit('playing');resolve();};
    u.onend=()=>{elapsed=a.currentTime;started=0;a.ended=true;a.paused=true;clean();if(active===a)active=null;utterance=null;emit('ended');};
    u.onerror=()=>{clean();started=0;if(active===a)active=null;utterance=null;reject(Error('語音無法播放'));emit('error');};
    deadline=setTimeout(()=>{a.dispose();emit('error');},Math.max(20000,record.text.length*1000));
    synth.cancel();synth.resume();synth.speak(u);
   });
  };return a;
 }
 function status(){refresh();if(!synth)return '此瀏覽器不支援語音合成';return voices.some(v=>/^(zh|cmn)[-_]TW$/i.test(v.lang))?'已找到台灣中文人聲':'未找到台灣中文人聲，將使用可用中文聲音或系統 zh-TW 預設';}
 const stop=()=>active?.dispose();addEventListener('pagehide',stop);document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
 return {clip,audio,stop,status};
})();
function speechClipAudio(clip){return clip.native?BrowserSpeech.audio(clip):new Audio(clip.src);}

const BROWSER_VOICE_PROFILES={"O001":{"gender":"male","age":"elder","form":"神祇","rate":12,"pitch":-5,"delivery":"heroic"},"O002":{"gender":"male","age":"elder","form":"神祇","rate":8,"pitch":-5,"delivery":"heroic"},"O003":{"gender":"male","age":"elder","form":"神祇","rate":2,"pitch":-5,"delivery":"heroic"},"O004":{"gender":"female","age":"adult","form":"神祇","rate":8,"pitch":6,"delivery":"heroic"},"O005":{"gender":"male","age":"adult","form":"神祇","rate":18,"pitch":0,"delivery":"heroic"},"O006":{"gender":"male","age":"young-adult","form":"神祇","rate":8,"pitch":0,"delivery":"heroic"},"O007":{"gender":"female","age":"young-adult","form":"神祇","rate":8,"pitch":6,"delivery":"heroic"},"O008":{"gender":"female","age":"adult","form":"神祇","rate":12,"pitch":6,"delivery":"heroic"},"O009":{"gender":"female","age":"adult","form":"神祇","rate":8,"pitch":6,"delivery":"heroic"},"O010":{"gender":"male","age":"young-adult","form":"神祇","rate":8,"pitch":0,"delivery":"heroic"},"O011":{"gender":"male","age":"adult","form":"神祇","rate":18,"pitch":0,"delivery":"heroic"},"O012":{"gender":"female","age":"adult","form":"神祇","rate":8,"pitch":6,"delivery":"heroic"},"O013":{"gender":"male","age":"adult","form":"神祇","rate":8,"pitch":0,"delivery":"heroic"},"O014":{"gender":"female","age":"adult","form":"神祇","rate":18,"pitch":6,"delivery":"heroic"},"O015":{"gender":"female","age":"adult","form":"神祇","rate":2,"pitch":6,"delivery":"heroic"},"O016":{"gender":"female","age":"adult","form":"神祇","rate":2,"pitch":6,"delivery":"heroic"},"O017":{"gender":"male","age":"adult","form":"神祇","rate":18,"pitch":0,"delivery":"heroic"},"O018":{"gender":"female","age":"adult","form":"神祇","rate":8,"pitch":6,"delivery":"heroic"},"O019":{"gender":"female","age":"young-adult","form":"神祇","rate":8,"pitch":6,"delivery":"heroic"},"O020":{"gender":"male","age":"elder","form":"神祇","rate":8,"pitch":-5,"delivery":"heroic"},"O021":{"gender":"female","age":"elder","form":"神祇","rate":8,"pitch":6,"delivery":"heroic"},"O022":{"gender":"female","age":"elder","form":"神祇","rate":8,"pitch":6,"delivery":"heroic"},"O023":{"gender":"male","age":"elder","form":"神祇","rate":8,"pitch":-5,"delivery":"heroic"},"O024":{"gender":"female","age":"elder","form":"神祇","rate":2,"pitch":6,"delivery":"heroic"},"O025":{"gender":"male","age":"elder","form":"monster","rate":2,"pitch":-5,"delivery":"heroic"},"O026":{"gender":"male","age":"adult","form":"神祇","rate":8,"pitch":0,"delivery":"heroic"},"O027":{"gender":"male","age":"adult","form":"神祇","rate":18,"pitch":0,"delivery":"heroic"},"O028":{"gender":"male","age":"elder","form":"神祇","rate":8,"pitch":-5,"delivery":"heroic"},"O029":{"gender":"male","age":"adult","form":"神祇","rate":2,"pitch":0,"delivery":"heroic"},"O030":{"gender":"male","age":"adult","form":"神祇","rate":8,"pitch":0,"delivery":"heroic"},"L020":{"gender":"male","age":"adult","form":"限定守護者","rate":2,"pitch":0,"delivery":"heroic"},"L021":{"gender":"male","age":"adult","form":"限定守護者","rate":8,"pitch":0,"delivery":"heroic"},"L022":{"gender":"male","age":"adult","form":"限定守護者","rate":18,"pitch":0,"delivery":"heroic"},"L023":{"gender":"female","age":"adult","form":"限定守護者","rate":8,"pitch":6,"delivery":"heroic"},"L024":{"gender":"female","age":"adult","form":"限定守護者","rate":8,"pitch":6,"delivery":"heroic"},"L025":{"gender":"male","age":"adult","form":"限定守護者","rate":8,"pitch":0,"delivery":"heroic"},"L026":{"gender":"female","age":"adult","form":"限定守護者","rate":8,"pitch":6,"delivery":"heroic"},"L027":{"gender":"male","age":"adult","form":"限定守護者","rate":18,"pitch":0,"delivery":"heroic"},"L028":{"gender":"male","age":"adult","form":"限定守護者","rate":8,"pitch":0,"delivery":"heroic"},"L029":{"gender":"male","age":"adult","form":"限定守護者","rate":8,"pitch":0,"delivery":"heroic"},"L030":{"gender":"male","age":"adult","form":"限定守護者","rate":8,"pitch":0,"delivery":"heroic"},"H001":{"gender":"male","age":"21","form":"逆命者","rate":8,"pitch":0,"delivery":"heroic"}};

let goldCinematic=null,goldImpactDuration=0;
const goldVoiceCache=new Map();
function goldSkillRecord(actor,name){if(actor?.rarity!==4||!name)return null;const generated=globalThis.OLYMPUS_GOLD_ULTIMATES?.[actor.id];if(generated?.src&&generated.skill===name)return {...generated,text:name,textMode:'skill-name-only',whisper:'',roar:''};return {...BrowserSpeech.clip(name,{...BROWSER_VOICE_PROFILES[actor.id],...actor,delivery:'heroic',rate:BROWSER_VOICE_PROFILES[actor.id]?.rate??10,pitch:BROWSER_VOICE_PROFILES[actor.id]?.pitch??-2}),skill:name,textMode:'skill-name-only',burstAt:.35,whisper:'',roar:name};}
function warmGoldVoices(){ /* Browser voices are loaded by voiceschanged. */ }
function stopGoldCinematic(){const fx=goldCinematic;goldCinematic=null;goldImpactDuration=0;if(fx){clearInterval(fx.timer);releaseStoryAudio(fx.audio);fx.finish(false);fx.root.remove();}globalThis.goldVoiceActive=false;globalThis.olympusScore?.sync();}
function playGoldUltimate(actor,row,epoch){
 stopGoldCinematic();
 const host=document.getElementById('stageOverlay');Object.assign(host.style,{left:'0',top:'0',width:'100vw',height:'100dvh'});
 const quiet=document.documentElement.classList.contains('quiet-motion')||matchMedia('(prefers-reduced-motion:reduce)').matches;
 const style={雷:['gold-ult-elements',0],水:['gold-ult-elements',1],火:['gold-ult-elements',2],地:['gold-ult-elements',3],光:['gold-ult-mystic',0],冥:['gold-ult-mystic',1],冰:['gold-ult-mystic',2],風:['gold-ult-mystic',3]}[actor.element]||['gold-ult-mystic',0];
 const role=actor.skill.power>0?'strike':actor.skill.effects?.some(e=>e.type==='shield')?'ward':'blessing';
  host.innerHTML='<section class="gold-ultimate '+role+(quiet?' reduced':'')+'" style="--gold-art:var(--art-'+style[0]+');--gold-x:'+(style[1]%2*100)+'%;--gold-y:'+Math.floor(style[1]/2)*100+'%;--gold-color:'+ELEMENT_COLORS[actor.element]+'"><div class="gold-ultimate-art"></div><div class="gold-ultimate-rays"></div><div class="gold-ultimate-rune">'+esc(EICON[actor.element])+'</div><div class="gold-ultimate-portrait">'+avatar(actor,'gold-portrait')+'</div><div class="gold-ultimate-copy"><small>'+esc(actor.name)+' · 神權覺醒</small><h2>'+esc(row.skill)+'</h2><p>'+esc(skillText(actor.skill))+'</p></div><div class="gold-ultimate-ring"></div><div class="gold-ultimate-particles">'+Array.from({length:quiet?0:24},(_,i)=>'<i style="--i:'+i+'"></i>').join('')+'</div></section>';
 const root=host.firstElementChild,audio=speechClipAudio(row);goldVoiceCache.delete(row.src);
 let prefs={volume:.45,muted:false};try{Object.assign(prefs,JSON.parse(localStorage.getItem('olympus-combat-audio')||'{}'));}catch{}
 audio.volume=Math.max(0,Math.min(1,(Number(prefs.volume)||0)*1.25));audio.preload='auto';
 globalThis.goldVoiceActive=!prefs.muted;globalThis.olympusScore?.sync();
 return new Promise(resolve=>{
  let settled=false,burst=false,fallback=!!prefs.muted,started=performance.now(),lastTime=0,lastProgress=started,virtualStart=started;
  const finish=value=>{if(settled)return;settled=true;resolve(value);};
  const fx=goldCinematic={root,audio,finish,timer:null};
   async function erupt(){if(burst)return;burst=true;root.classList.add('erupt');goldImpactDuration=0;if(!await waitPresentation(1000,epoch)){finish(false);return;}root.animate([{opacity:1,filter:'blur(0px)'},{opacity:0,filter:'blur(18px)'}],{duration:1000,easing:'ease-out',fill:'forwards'});const faded=await waitPresentation(1000,epoch);goldImpactDuration=0;while(faded&&!fallback&&!audio.ended&&goldCinematic===fx&&epoch===presentationEpoch&&performance.now()-started<15000){if(!await waitPresentation(100,epoch))break;}finish(faded&&epoch===presentationEpoch);}
  function useFallback(){if(fallback)return;fallback=true;virtualStart=performance.now()-Math.min(audio.currentTime,row.burstAt)*1000;audio.pause();globalThis.goldVoiceActive=false;globalThis.olympusScore?.sync();}
  audio.onerror=useFallback;
  if(!fallback)audio.play().catch(useFallback);
  fx.timer=setInterval(()=>{
   if(goldCinematic!==fx)return;
   if(epoch!==presentationEpoch){stopGoldCinematic();return;}
   const now=performance.now();
   if(!fallback){if(audio.currentTime>lastTime+.01){lastTime=audio.currentTime;lastProgress=now;}else if(now-lastProgress>(lastTime>0?3500:8000))useFallback();}
   const t=fallback?(now-virtualStart)/1000:audio.currentTime;
   if(!burst&&(row.native?(audio.ended||(fallback&&t>=row.duration)):t>=row.burstAt))erupt();
   if(!burst&&audio.ended)erupt();
  },25);
 });
}

function scrollBannerMotion(el,out=false){if(!el)return Promise.resolve();el.classList.remove("scroll-banner-in","scroll-banner-out");if(document.body.classList.contains("quiet-motion")||matchMedia("(prefers-reduced-motion:reduce)").matches)return Promise.resolve();void el.offsetWidth;el.classList.add(out?"scroll-banner-out":"scroll-banner-in");return new Promise(resolve=>setTimeout(resolve,out?350:500));}

// Rebuild control placement on orientation changes without restarting combat.
matchMedia('(max-width: 900px)').addEventListener('change',()=>{if(battle)render();});
window.addEventListener('orientationchange',()=>{if(battle)requestAnimationFrame(render);});

// Touch collection cards open their details above the current search results.
function openMobileCardInfo(id){
 const c=CARD[id];if(!c)return;
 const d=document.getElementById('detail');
 d.className='mobile-card-info';
 d.setAttribute('aria-labelledby','mobile-card-info-title');
 d.innerHTML='<header class="mobile-card-info-head"><h2 id="mobile-card-info-title">角色情報</h2><button type="button" data-action="close" autofocus aria-label="關閉角色情報">關閉 ✕</button></header><div class="mobile-card-info-body">'+detail(c)+'</div>';
 if(!d.open)d.showModal();
}
document.getElementById('detail').addEventListener('close',function(){this.classList.remove('mobile-card-info');});

function openCardPreview(id){
 const c=CARD[id];if(!c)return;stopCatalogVoice();
 const d=document.getElementById('detail');d.className='profile-section-modal';d.setAttribute('aria-labelledby','card-preview-title');
 d.innerHTML='<header class="profile-modal-head"><h2 id="card-preview-title">'+esc(c.name)+' · 角色預覽</h2><button data-action="close">關閉 ✕</button></header><div class="profile-modal-content">'+catalogPreviewPanel(c)+'</div>';
 if(!d.open)d.showModal();
}
function openEnemyRoster(slot=null){
 stopCatalogVoice();const n=nodes[state.node],c=slot===null?null:CARD[n.enemy[slot]];
 const d=document.getElementById('detail');d.className='enemy-roster-dialog';d.setAttribute('aria-labelledby','enemy-roster-title');
 const body=c?'<div class="enemy-unit-info"><h3>'+esc(c.name)+'</h3>'+avatar(c,'portrait')+'<p>'+esc(c.title)+' · '+esc(c.role)+' · '+esc(c.element)+'</p><div class="enemy-base-stats">'+[['生命',c.hp],['攻擊',c.atk],['防禦',c.def],['速度',c.spd]].map(([k,v])=>'<div><small>'+k+'</small><strong>'+v+'</strong></div>').join('')+'</div><p class="meta">以上為卡牌基礎能力；實戰另計關卡及場地加成。</p><h3>'+esc(c.skill?c.skill.name:'普通攻擊')+'</h3><p>'+skillText(c.skill)+'</p><h3>'+esc(c.passive?c.passive.name:'角色背景')+'</h3><p>'+esc(c.passive?c.passive.desc:c.lore)+'</p></div>':'<p>點選守軍查看能力。1–3 前排、4–6 後排、7–9 替補。</p><div class="enemy-roster-grid">'+n.enemy.map((id,i)=>'<button data-action="enemyDetail" data-id="'+i+'" class="r'+CARD[id].rarity+'"><small>'+ (i+1)+' 號位</small>'+avatar(CARD[id],'mini-avatar')+'<span>'+esc(CARD[id].name)+'</span></button>').join('')+'</div>';
 d.innerHTML='<header class="profile-modal-head"><h2 id="enemy-roster-title">敵方守軍配置</h2><div>'+(c?'<button data-action="enemy">← 返回陣容</button>':'')+'<button data-action="close">關閉 ✕</button></div></header><div class="profile-modal-content">'+body+'</div>';
 if(!d.open)d.showModal();d.scrollTop=0;
}

// One clock owns all five camp images, including the original first image.
function scheduleCampSlides(){
 if(globalThis.campSlideTimer)return;
 globalThis.campSlideIndex=0;
 const tick=()=>{const slides=[...document.querySelectorAll('.camp-story-slides i')];
  if(!slides.length){globalThis.campSlideTimer=null;globalThis.campSlideIndex=0;return;}
  globalThis.campSlideIndex=(globalThis.campSlideIndex+1)%slides.length;
  slides.forEach((el,i)=>el.classList.toggle('camp-current',i===globalThis.campSlideIndex));
  globalThis.campSlideTimer=setTimeout(tick,5000);
 };
 globalThis.campSlideTimer=setTimeout(tick,5000);
}
function mobileCardDock(){
 const u=battle?.units.find(x=>x.uid===battleSelected)||battle?.units.find(x=>x.side===0&&x.active);if(!u)return '';
 return '<section class="mobile-card-dock" data-scroll-key="mobile-card-dock"><div class="dock-portrait r'+u.rarity+'">'+avatar(u,'mini-avatar')+'</div><div class="dock-copy"><strong>'+esc(u.name)+'</strong><small>'+(u.side?'敵方':'我方')+' · '+esc(u.element)+' · '+esc(u.role)+'</small><p>生命 '+u.hp+'/'+u.max+'　攻 '+u.atk+'　防 '+u.def+'</p><p><b>'+esc(u.skill?u.skill.name:'普通攻擊')+'</b>'+(u.skill?' · 氣 '+u.qi+'/'+u.skill.cost:'')+'</p><small class="dock-skill-label">技能資訊</small><p class="dock-skill">'+esc(skillText(u.skill))+'</p></div></section>';
}
function updateMobileCardDock(){const old=document.querySelector('.mobile-card-dock');if(old)old.outerHTML=mobileCardDock();}
function openBattleCardInfo(uid){
 const u=battle?.units.find(x=>x.uid===uid);if(!u)return;
 let d=document.getElementById('battle-card-info');if(!d){d=document.createElement('dialog');d.id='battle-card-info';d.className='battle-card-info-dialog';document.body.append(d);d.addEventListener('click',e=>{if(e.target.closest('[data-battle-info-close]'))d.close();});}
 // Snapshot once; this dialog is outside #app and never reconciled by battle renders.
 const snapshot=structuredClone(u),fragment=document.createElement('template');fragment.innerHTML=battleFullDetail(snapshot,snapshot);
 fragment.content.querySelectorAll('button').forEach(btn=>{if(btn.classList.contains('portrait-zoom')){const div=document.createElement('div');div.className=btn.className;div.append(...btn.childNodes);btn.replaceWith(div);}else btn.remove();});
 d.setAttribute('aria-labelledby','battle-card-info-title');d.innerHTML='<header class="profile-modal-head"><h2 id="battle-card-info-title">角色情報</h2><button data-battle-info-close autofocus>關閉 ✕</button></header><p class="meta">點選當下的能力資料；自動戰鬥會持續進行。</p>';
 d.append(fragment.content);if(!d.open)d.showModal();
}
(function(){
 const base=battleView;battleView=function(){let html=base();if(!mobilePortraitLayout())return html;
 html=html.replace(/<button data-action="step"[^>]*>[^<]*<\/button>/,'<button data-action="manualBattle" aria-pressed="'+!!globalThis.mobileManualBattle+'" '+(battle.done?'disabled':'')+'>手動戰鬥</button>');
 html=html.replace('</div></section><section class="panel inspector-panel">','</div>'+mobileCardDock()+'</section><section class="panel inspector-panel">');
 return html;
 };
 const paint=paintBattleApp;paintBattleApp=function(markup){paint(markup);const slides=[...document.querySelectorAll('.camp-story-slides i')];slides.forEach((el,i)=>el.classList.toggle('camp-current',i===(globalThis.campSlideIndex||0)));};
})();

// Only explicit player mode changes update this preference; end-of-battle pauses do not.
function autoBattlePreference(){try{return localStorage.getItem('olympus-auto-battle')==='true';}catch{return !!globalThis.savedAutoBattle;}}
function setAutoBattlePreference(value){globalThis.savedAutoBattle=value;try{localStorage.setItem('olympus-auto-battle',String(value));}catch{}}
const explicitBattlePlay=play;play=function(){if(!battle||battle.done)return;setAutoBattlePreference(!playing);if(!playing)pauseAtRound=false;else globalThis.mobileManualBattle=true;return explicitBattlePlay();};
async function battleStartCountdown(epoch){
 const session=battle,overlay=document.createElement('div');overlay.className='battle-start-countdown';overlay.setAttribute('role','status');overlay.setAttribute('aria-live','polite');document.body.append(overlay);
 const board=document.querySelector('.battle-board'),rect=board?.getBoundingClientRect();if(rect){overlay.style.left=(rect.left+rect.width/2)+'px';overlay.style.top=(Math.max(0,rect.top)+Math.min(rect.height,innerHeight-Math.max(0,rect.top))/2)+'px';}
 try{for(const n of [3,2,1]){if(epoch!==presentationEpoch||battle!==session)return false;overlay.innerHTML='<div class="countdown-pulse" style="animation-duration:500ms"><span>開始戰鬥</span><strong>0'+n+'</strong></div>';if(!await waitPresentation(500,epoch))return false;}return epoch===presentationEpoch&&battle===session;}finally{overlay.remove();}
}
const battleFullDetail=detail;
detail=function(c,live=null){const html=battleFullDetail(c,live);if(!live)return html;const t=document.createElement('template');t.innerHTML=html;const root=t.content.querySelector('.detail-inner');if(!root)return html;
 const specs=[['ability','.ability-section',c.skill?'奧義技能':'普通攻擊'],['lore','.lore-section','特性與背景'],['bonds','.bond-panel','羈絆']];
 for(const [,selector]of specs)root.querySelector(selector)?.remove();
 const menu=document.createElement('div');menu.className='battle-detail-buttons';menu.innerHTML=specs.map(([key,,label])=>'<button data-action="battleSection" data-id="'+live.uid+'" data-section="'+key+'">'+label+' ›</button>').join('');root.append(menu);return root.outerHTML;
};
function openBattleSection(uid,key){const u=battle?.units.find(x=>x.uid===uid),selectors={ability:'.ability-section',lore:'.lore-section',bonds:'.bond-panel'},labels={ability:'技能與攻擊',lore:'特性與背景',bonds:'羈絆'};if(!u||!selectors[key])return;
 openBattleCardInfo(uid);const d=document.getElementById('battle-card-info'),t=document.createElement('template');t.innerHTML=battleFullDetail(structuredClone(u),structuredClone(u));const section=t.content.querySelector(selectors[key]);
 d.querySelector('#battle-card-info-title').textContent=u.name+' · '+labels[key];d.querySelector('.detail-inner')?.remove();if(section){section.querySelectorAll('button').forEach(b=>b.remove());d.append(section);}else{const p=document.createElement('p');p.textContent='此角色目前沒有羈絆效果。';d.append(p);}
}
(function(){const base=battleView;battleView=function(){const t=document.createElement('template');t.innerHTML=base();const f=t.content;
 f.querySelector('.battle-record')?.remove();f.querySelector('.round-pause')?.remove();
 if(!mobilePortraitLayout()){
  const step=f.querySelector('[data-action="step"]'),auto=f.querySelector('[data-action="play"]');if(step&&auto)step.replaceWith(auto);
  const direct=f.querySelector('.direct-command'),note=direct?.querySelector('span'),head=f.querySelector('.battle-board>.board-head>.meta');if(head&&note){head.textContent=note.textContent;head.classList.add('battle-command-hint');}
  const actions=direct?.querySelector('.row');if(actions)f.querySelector('.battle-controls')?.append(actions);direct?.remove();
 }
 const box=document.createElement('div');box.append(f);return box.innerHTML;
};})();

/* Four mobile navigation categories reuse the original actions and restrictions. */
(function(){
 const base=mainNavigation;
 mainNavigation=function(){const t=document.createElement('template');t.innerHTML=base();const nav=t.content.querySelector('nav');if(!nav)return base();const originals=[...nav.children];
 const groups=[['journey','征途',['formation','divineCamp','campaign']],['heroes','英傑',['catalog','recruitment','enhancement']],['archive','典藏',['rules','achievements','battleReplay']],['supplies','行囊',['export','import','quickSettings','home']]];
 const mobile=document.createElement('div');mobile.className='mobile-nav-groups';
 for(const [key,label,actions]of groups){const buttons=originals.filter(b=>actions.includes(b.dataset.id||b.dataset.action||b.dataset.journey));const active=buttons.some(b=>b.classList.contains('active'));const trigger=document.createElement('button');trigger.type='button';trigger.className='mobile-nav-trigger'+(active?' active':'');trigger.setAttribute('popovertarget','mobile-nav-'+key);trigger.setAttribute('aria-expanded','false');trigger.textContent=label+' ⌄';mobile.append(trigger);
 const menu=document.createElement('div');menu.id='mobile-nav-'+key;menu.className='mobile-nav-menu';menu.setAttribute('popover','auto');menu.setAttribute('aria-label',label+'功能');const heading=document.createElement('h3');heading.textContent=label;menu.append(heading);for(const b of buttons)menu.append(b.cloneNode(true));mobile.append(menu);}
 originals.forEach(b=>b.classList.add('desktop-nav-item'));nav.prepend(mobile);const out=document.createElement('div');out.append(t.content);return out.innerHTML;
 };
 document.addEventListener('beforetoggle',e=>{if(!e.target.matches?.('.mobile-nav-menu'))return;const trigger=document.querySelector('[popovertarget="'+e.target.id+'"]');trigger?.setAttribute('aria-expanded',String(e.newState==='open'));if(e.newState==='open'&&trigger){const r=trigger.getBoundingClientRect();e.target.style.top=Math.min(r.bottom+8,innerHeight-100)+'px';e.target.style.maxHeight=Math.max(80,innerHeight-r.bottom-24)+'px';}},true);
 document.addEventListener('click',e=>{const b=e.target.closest('.mobile-nav-menu button');if(b&&!b.disabled)b.closest('.mobile-nav-menu').hidePopover();},true);
 window.addEventListener('resize',()=>document.querySelectorAll('.mobile-nav-menu:popover-open').forEach(m=>m.hidePopover()));
 render();
})();

// Asset preparation is outside combat rendering and never touches saved games.
(function(){
 const panel=document.createElement('section');panel.className='asset-preparation';panel.innerHTML='<h2>整備征途</h2><p data-load-status role="status">正在確認素材版本…</p><progress max="100" value="0" aria-label="素材準備進度"></progress><div class="download-metrics"><p data-load-detail></p><p data-load-eta>預計剩餘：估算中…</p></div><div><button data-load-skip>先進入遊戲</button><button data-load-retry hidden>重試未完成素材</button></div>';
 const home=document.querySelector('.title-screen');if(!home)return;home.append(panel);const actions=home.querySelector('.title-actions');if(actions)actions.inert=true;
 const status=panel.querySelector('[data-load-status]'),detail=panel.querySelector('[data-load-detail]'),bar=panel.querySelector('progress'),skip=panel.querySelector('[data-load-skip]'),retry=panel.querySelector('[data-load-retry]');
 let released=false;function unlock(){released=true;if(actions)actions.inert=false;skip.hidden=true;}
 let completionScheduled=false;
 function finishPreparation(delay=700){
  unlock();if(completionScheduled)return;completionScheduled=true;
  setTimeout(()=>{
   if(!panel.isConnected)return;
   if(panel.contains(document.activeElement)){const next=actions?.querySelector('button:not(:disabled),a[href]');next?.focus({preventScroll:true});}
   panel.inert=true;
   const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
   if(reduced||!panel.animate){panel.remove();return;}
   const fade=panel.animate([{opacity:1},{opacity:0}],{duration:650,easing:'ease-out',fill:'forwards'});
   fade.finished.then(()=>panel.remove(),()=>panel.remove());
  },delay);
 }

 skip.onclick=()=>{unlock();status.textContent='已開放操作；素材會繼續在背景準備。';};
 if(location.protocol==='file:'){bar.value=100;status.textContent='離線版素材已隨遊戲檔案載入';detail.textContent='可開始旅程；不需要額外下載。';panel.querySelector('[data-load-eta]').textContent='預計剩餘：00:00';finishPreparation();return;}
 let manifest,done=new Set(),received=new Map(),running=false,mediaCache=null,cachedCount=0,cacheWriteFailed=false;
 const eta=panel.querySelector('[data-load-eta]');let samples=[],etaTimer=null;
 function updateEta(){if(!manifest)return;const now=performance.now(),total=manifest.assets.reduce((n,x)=>n+x.size,0),bytes=manifest.assets.reduce((n,x)=>n+(done.has(x.path)?x.size:Math.min(x.size,received.get(x.path)||0)),0);samples.push({time:now,bytes});while(samples.length>2&&samples[1].time<now-15000)samples.shift();const first=samples[0],elapsed=(now-first.time)/1000,rate=elapsed>0?(bytes-first.bytes)/elapsed:0;if(bytes>=total){eta.textContent='預計剩餘：00:00';return;}if(elapsed<2){eta.textContent='預計剩餘：估算中…';return;}if(rate<=0){eta.textContent='預計剩餘：等待網路…';return;}const seconds=Math.ceil((total-bytes)/rate),h=Math.floor(seconds/3600),m=Math.floor(seconds%3600/60),sec=seconds%60;eta.textContent='預計剩餘：約 '+(h?h+':':'')+String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0');}

 function draw(current){const total=manifest.assets.reduce((n,x)=>n+x.size,0),bytes=manifest.assets.reduce((n,x)=>n+(done.has(x.path)?x.size:Math.min(x.size,received.get(x.path)||0)),0);bar.value=total?bytes/total*100:100;detail.textContent='已快取 '+cachedCount+' 個 · 本次需下載 '+(manifest.assets.length-cachedCount)+' 個 ｜ '+Math.floor(bar.value)+'% · '+(bytes/1048576).toFixed(1)+' / '+(total/1048576).toFixed(1)+' MB · '+done.size+' / '+manifest.assets.length+' 個素材';if(!released)status.textContent=current;}
 async function run(){if(running)return;running=true;retry.hidden=true;samples=[];updateEta();etaTimer=setInterval(updateEta,1000);const queue=manifest.assets.filter(x=>!done.has(x.path));let failures=0;
 async function worker(){while(queue.length){const item=queue.shift();received.set(item.path,0);draw('下載更新素材：'+item.label);const abort=new AbortController(),timer=setTimeout(()=>abort.abort(),45000);try{const response=await fetch(item.path+'?rev='+item.hash,{signal:abort.signal});if(!response.ok)throw Error('HTTP '+response.status);const cacheCopy=mediaCache?response.clone():null;const reader=response.body?.getReader();if(reader){while(true){const chunk=await reader.read();if(chunk.done)break;received.set(item.path,(received.get(item.path)||0)+chunk.value.byteLength);draw('下載／讀取快取：'+item.label);}}else await response.arrayBuffer();if(cacheCopy){try{await mediaCache.put(new URL(item.path+'?rev='+item.hash,location.href).href,cacheCopy);}catch{cacheWriteFailed=true;}}done.add(item.path);}catch{failures++;received.delete(item.path);}finally{clearTimeout(timer);draw('整理素材…');}}}
 await Promise.all([worker(),worker(),worker()]);running=false;clearInterval(etaTimer);updateEta();if(failures)eta.textContent='預計剩餘：等待重試';if(!failures){bar.value=100;status.textContent=cacheWriteFailed?'素材已就緒；瀏覽器未能保存全部快取，下次可能需補下載。':cachedCount===manifest.assets.length?'素材已快取，無需重新下載，可以開始旅程':'素材更新完成，已保存快取，可以開始旅程';finishPreparation(cacheWriteFailed?3000:700);}else{status.textContent='部分素材尚未完成，可重試或先進入遊戲。';retry.hidden=false;} }
 retry.onclick=()=>{if(manifest)void run();else location.reload();};
 (async()=>{try{const response=await fetch('asset-manifest.json',{cache:'no-store'});if(!response.ok)throw Error('manifest');manifest=await response.json();
 if('serviceWorker' in navigator){try{await navigator.serviceWorker.register('asset-worker.js');await Promise.race([navigator.serviceWorker.ready,new Promise((_,reject)=>setTimeout(()=>reject(Error('worker timeout')),8000))]);if(!navigator.serviceWorker.controller)await Promise.race([new Promise(resolve=>navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true})),new Promise(resolve=>setTimeout(resolve,2000))]);}catch{detail.textContent='快取暫不可用，改用一般下載。';}}
 try{mediaCache=await caches.open('olympus-media-v1');const keys=new Set((await mediaCache.keys()).map(r=>r.url));for(const item of manifest.assets){if(keys.has(new URL(item.path+'?rev='+item.hash,location.href).href))done.add(item.path);}cachedCount=done.size;status.textContent='已找到 '+cachedCount+' 個快取素材';draw('正在比對素材版本…');}catch{cacheWriteFailed=true;}
 await run();}catch{status.textContent='目前無法取得素材清單，可重試或先進入遊戲。';retry.hidden=false;}})();
})();

function browserVoiceControls(){return '<h3>台灣人聲試聽</h3><p>'+esc(BrowserSpeech.status())+'</p><div class="catalog-preview-actions">'+['O001','O002','O003','O004','O005'].map(id=>'<button data-browser-sample="'+id+'">'+esc(CARD[id].name)+' · '+esc(CARD[id].skill.name)+'</button>').join('')+'<button data-browser-stop>停止試聽</button></div><p data-browser-status role="status">只念技能名稱；聲線依裝置而異。</p>';}
document.addEventListener('click',e=>{const b=e.target.closest('[data-browser-sample],[data-browser-stop]');if(!b)return;const status=b.closest('dialog')?.querySelector('[data-browser-status]');if(b.hasAttribute('data-browser-stop')){BrowserSpeech.stop();if(status)status.textContent='已停止';return;}if(battle){if(status)status.textContent='請先結束戰鬥再試聽，避免打斷戰鬥配音。';return;}const c=CARD[b.dataset.browserSample],a=speechClipAudio(goldSkillRecord(c,c.skill.name));let prefs={volume:.45,muted:false};try{Object.assign(prefs,JSON.parse(localStorage.getItem('olympus-combat-audio')||'{}'));}catch{}if(prefs.muted){if(status)status.textContent='請先解除音效靜音';return;}a.volume=Number(prefs.volume);if(status)status.textContent=c.name+'：'+c.skill.name;a.onended=()=>{if(status)status.textContent='試聽完畢';};a.onerror=()=>{if(status)status.textContent='無法播放，請確認系統已安裝中文語音';};b.closest('dialog')?.addEventListener('close',()=>a.dispose(),{once:true});a.play().catch(()=>a.onerror?.());});

async function animateDeathBurn(fallen,epoch){
 if(!fallen.length)return true;
 const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches||document.documentElement.classList.contains('quiet-motion');
 const duration=reduced?180:motionDuration('death'),layers=[];
 try{
  for(const u of fallen){
   const card=[...document.querySelectorAll('.battle-board .unit[data-id]')].find(el=>el.dataset.id===String(u.uid));
   const art=card?.querySelector('.painted-avatar');if(!art)continue;
   const rect=art.getBoundingClientRect();if(!rect.width||!rect.height)continue;
   const layer=document.createElement('div');layers.push(layer);layer.setAttribute('aria-hidden','true');
   layer.style.cssText=`position:fixed;pointer-events:none;z-index:90;left:${rect.left}px;top:${rect.top}px;width:${rect.width}px;height:${rect.height}px;`;
   const clone=art.cloneNode(true);clone.querySelectorAll('.living-card-host').forEach(el=>el.remove());clone.classList.remove('legendary-card');
   clone.style.cssText=art.style.cssText+`;position:absolute!important;inset:0!important;width:100%!important;height:100%!important;margin:0!important;animation:none!important;translate:none!important;rotate:none!important;opacity:1;visibility:visible!important;`;
   layer.append(clone);document.body.append(layer);art.style.setProperty("visibility","hidden","important");
   if(reduced){clone.animate([{opacity:1},{opacity:0}],{duration,fill:'forwards'});continue;}
   const cut=y=>`polygon(0 ${y}%,12% ${y-3}%,25% ${y+2}%,39% ${y-1}%,52% ${y+3}%,68% ${y-2}%,83% ${y+1}%,100% ${y}%,100% 100%,0 100%)`;
   clone.animate([{filter:'brightness(1)',clipPath:cut(-6),opacity:1},{filter:'sepia(1) saturate(1.8) brightness(.55)',clipPath:cut(-6),opacity:1,offset:.18},{filter:'sepia(1) brightness(.18)',clipPath:cut(52),opacity:1,offset:.62},{filter:'brightness(.1)',clipPath:cut(103),opacity:0}],{duration,fill:'forwards',easing:'ease-in'});
   const flame=document.createElement('i');flame.style.cssText='position:absolute;left:-3%;width:106%;height:14%;background:linear-gradient(transparent,#d3350877,#ffae32,#fff2a1,#e44f0f,transparent);clip-path:polygon(0 35%,12% 12%,25% 48%,39% 22%,52% 55%,68% 18%,83% 40%,100% 28%,100% 85%,0 100%);filter:drop-shadow(0 0 5px #ff671c);';layer.append(flame);
   flame.animate([{top:'-10%',opacity:0},{top:'-5%',opacity:1,offset:.18},{top:'48%',opacity:1,offset:.62},{top:'95%',opacity:0}],{duration,fill:'forwards',easing:'ease-in'});
   for(let i=0;i<12;i++){
    const ember=document.createElement('i'),start=.16+i*.052,x=8+(i*37)%86,y=start*90;
    ember.style.cssText=`position:absolute;left:${x}%;top:${y}%;width:${2+i%3}px;height:${3+i%4}px;background:${i%3?'#ffb74b':'#66605b'};box-shadow:0 0 5px #fa7028;border-radius:1px;opacity:0;`;layer.append(ember);
    ember.animate([{opacity:0,transform:'translate(0,0)'},{opacity:1,offset:.12},{opacity:0,transform:`translate(${(i%2?1:-1)*(10+i*2)}px,-${18+i*3}px) rotate(${i*37}deg)`}],{duration:duration*(1-start),delay:duration*start,fill:'forwards',easing:'ease-out'});
   }
  }
  return await waitPresentation(duration,epoch);
 }finally{layers.forEach(layer=>{layer.getAnimations({subtree:true}).forEach(a=>a.cancel());layer.remove();});}
}
