import{test}from'node:test';import assert from'node:assert/strict';import*as G from'./engine.mjs';
test('correct recipe earns money',()=>{const s=G.fresh();G.add(s,'water');G.add(s,'coffee');assert.equal(G.serve(s),true);assert.equal(s.cash,10000);});
test('wrong ingredients and duplicates rejected',()=>{const s=G.fresh();G.add(s,'coffee');G.add(s,'coffee');assert.equal(G.serve(s),false);assert.equal(s.cash,0);assert.equal(s.mistakes,1);});
test('capacity and invalid ingredient',()=>{const s=G.fresh();assert.equal(G.add(s,'bad'),false);for(let i=0;i<4;i++)G.add(s,'milk');assert.equal(G.add(s,'milk'),false);});
test('time expiry ends shift',()=>{const s=G.fresh();G.tick(s,56);assert.equal(s.status,'lost');assert.equal(G.add(s,'milk'),false);});
test('12 orders across all shifts can be completed',()=>{const s=G.fresh();while(s.status!=='won'){for(const id of G.order(s).items)G.add(s,id);assert.ok(G.serve(s));if(s.status==='complete')assert.ok(G.next(s));}assert.equal(s.served,12);assert.equal(s.cash,136000);});
test('next is guarded and time frozen after completion',()=>{const s=G.fresh();assert.equal(G.next(s),false);s.status='complete';G.tick(s,100);assert.equal(s.left,55);});
