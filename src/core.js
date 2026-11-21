export const LANES = 10;
export const MODES = {
  endless: {name:'Endless', label:'SEM FIM', speed:18, description:'Até onde você consegue chegar?', target:0},
  hardcore: {name:'Hardcore', label:'UMA CHANCE', speed:21, description:'Mais rápido. Sem margem para erro.', target:0},
  distance: {name:'Distância', label:'OBJETIVO 2.000 M', speed:18, description:'Uma linha de chegada. Dez caminhos.', target:2000},
  daily: {name:'Desafio diário', label:'SEMENTE DO DIA', speed:19, description:'Uma pista nova a cada dia.', target:0},
  extreme: {name:'Velocidade extrema', label:'VELOCIDADE MÁXIMA', speed:27, description:'Se piscar, já era.', target:0},
  impossible: {name:'Impossível', label:'REGRAS ESPECIAIS', speed:25, description:'Sem escudo e com obstáculos mais densos.', target:0}
};
export function seeded(seed){ let n=seed>>>0; return ()=>{ n=(Math.imul(n,1664525)+1013904223)>>>0; return n/4294967296; }; }
export function dailySeed(date=new Date()){ return Number(date.toISOString().slice(0,10).replaceAll('-','')); }
// Each row reserves a clear lane reachable from the previous reserved lane. The gap
// between rows exceeds lane-change time even at maximum speed.
export function makeRow(random, previousLane, difficulty=0, mode='endless'){
  const safe=Math.max(0,Math.min(9,previousLane+Math.floor(random()*3)-1));
  const density=Math.min(.76,.28+difficulty*.24+(mode==='impossible'?.14:0));
  const types=['block','low','high','train','hole','vehicle','moving'];
  const obstacles=[];
  for(let lane=0;lane<LANES;lane++) if(lane!==safe && random()<density) obstacles.push({lane,type:types[Math.floor(random()*types.length)]});
  const coinLane=random()<.7?safe:Math.floor(random()*LANES);
  return {safe,obstacles,coinLane};
}
export function validateRows(rows){let reachable=new Set(Array.from({length:10},(_,i)=>i)); for(const row of rows){const blocked=new Set(row.obstacles.map(o=>o.lane)); const next=new Set(); for(const lane of reachable) for(let d=-1;d<=1;d++){let n=lane+d;if(n>=0&&n<10&&!blocked.has(n))next.add(n)} if(!next.size)return false;reachable=next;} return true;}
export function loadSave(storage){const defaults={coins:0,records:{},settings:{sound:true,shake:true},owned:['volt'],selected:'volt',achievements:[]};try {const data=JSON.parse(storage.getItem('ten-tracks-save')||'{}');return {...defaults,...data,records:{...defaults.records,...data.records},settings:{...defaults.settings,...data.settings},owned:Array.isArray(data.owned)?data.owned:defaults.owned,achievements:Array.isArray(data.achievements)?data.achievements:[]};}catch{return defaults}}
export function saveGame(storage,data){try{storage.setItem('ten-tracks-save',JSON.stringify(data));}catch{/* Storage can be unavailable in private browsing. */}}
