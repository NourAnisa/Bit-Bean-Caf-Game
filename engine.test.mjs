import{test}from'node:test';import assert from'node:assert/strict';import*as G from'./engine.mjs';
function espresso(s,t=5){G.act(s,'cups');G.act(s,'grinder');G.tick(s,2);G.act(s,'machine');G.act(s,'machine');G.tick(s,t);G.act(s,'machine');}
test('requires cup, ground beans and tamping',()=>{const s=G.fresh();G.act(s,'machine');assert.equal(s.job,null);G.act(s,'cups');G.act(s,'machine');assert.equal(s.cup.tamped,false);});
test('grinding takes time and blocks other operations',()=>{const s=G.fresh();G.act(s,'cups');G.act(s,'grinder');G.act(s,'milk');assert.equal(s.job.type,'grind');G.tick(s,1);assert.equal(s.cup.ground,false);G.tick(s,1);assert.equal(s.cup.ground,true);});
test('perfect extraction and real recipe delivery',()=>{const s=G.fresh();espresso(s);assert.equal(s.quality,100);G.act(s,'water');G.tick(s,2.5);G.act(s,'serve');assert.equal(s.served,1);assert.equal(s.cash,11700);assert.ok(s.dirty);});
test('early extraction gives lower quality',()=>{const s=G.fresh();espresso(s,1);assert.equal(s.quality,20);});
test('overlong brew automatically finishes bitter',()=>{const s=G.fresh();espresso(s,12);assert.equal(s.quality,20);assert.ok(s.cup.espresso);});
test('wrong recipe is not paid',()=>{const s=G.fresh();espresso(s);G.act(s,'milk');G.tick(s,3);G.act(s,'serve');assert.equal(s.cash,0);});
test('sink clears cup and machine',()=>{const s=G.fresh();espresso(s);G.act(s,'sink');assert.equal(s.cup,null);assert.equal(s.dirty,false);});
test('three lost customers end game',()=>{const s=G.fresh();for(let i=0;i<3;i++)G.tick(s,200);assert.equal(s.status,'lost');});
test('all nine orders achievable with clean machine',()=>{const s=G.fresh();for(let i=0;i<9;i++){G.act(s,'sink');espresso(s);G.act(s,G.order(s)==='Americano'?'water':'milk');G.tick(s,2.5);G.act(s,'serve');}assert.equal(s.status,'won');assert.equal(s.served,9);});
test('invalid time does not change game',()=>{const s=G.fresh();G.tick(s,NaN);G.tick(s,-2);assert.equal(s.patience,150);});
