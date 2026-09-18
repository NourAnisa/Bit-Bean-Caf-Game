export const ingredients={coffee:'Espresso',water:'Air panas',milk:'Susu',sugar:'Gula aren',matcha:'Matcha',waffle:'Waffle',chocolate:'Cokelat'};
export const recipes=[
 {name:'Americano',items:['coffee','water'],price:10000},
 {name:'Kopi Susu',items:['coffee','milk'],price:12000},
 {name:'Kopi Susu Gula Aren',items:['coffee','milk','sugar'],price:12000},
 {name:'Matcha Latte',items:['matcha','milk'],price:12000},
 {name:'Waffle Cokelat',items:['waffle','chocolate'],price:10000},
 {name:'Chocolate Latte',items:['chocolate','milk'],price:12000}
];
export const shifts=[{name:'01 / Pembukaan kafe',orders:[0,1,0],seconds:55},{name:'02 / Sore yang hangat',orders:[2,3,1,2],seconds:45},{name:'03 / Golden hour',orders:[4,5,2,3,4],seconds:35}];
export function fresh(){return{shift:0,index:0,mix:[],cash:0,served:0,mistakes:0,left:55,status:'playing'};}
export function order(s){return recipes[shifts[s.shift].orders[s.index]];}
export function add(s,id){if(s.status!=='playing'||!ingredients[id]||s.mix.length>=4)return false;s.mix.push(id);return true;}
export function serve(s){
 if(s.status!=='playing')return false;
 if([...s.mix].sort().join(',')!==[...order(s).items].sort().join(',')){s.mistakes++;s.mix=[];return false;}
 s.cash+=order(s).price;s.served++;s.mix=[];s.index++;
 if(s.index>=shifts[s.shift].orders.length){s.index--;s.status=s.shift===2?'won':'complete';}
 else s.left=shifts[s.shift].seconds;
 return true;
}
export function next(s){if(s.status!=='complete')return false;s.shift++;s.index=0;s.left=shifts[s.shift].seconds;s.status='playing';return true;}
export function tick(s,dt){if(s.status==='playing'&&Number.isFinite(dt)&&dt>0){s.left=Math.max(0,s.left-dt);if(!s.left)s.status='lost';}}
