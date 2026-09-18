import * as T from 'three';
export function createCafe(container){
 const scene=new T.Scene();scene.background=new T.Color('#253d35');scene.fog=new T.Fog('#253d35',24,55);
 const renderer=new T.WebGLRenderer({antialias:true,alpha:false});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(innerWidth,innerHeight);renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.35;container.appendChild(renderer.domElement);
 const camera=new T.PerspectiveCamera(38,innerWidth/innerHeight,.1,100);const target=new T.Vector3(-1,1.4,.2);
 const mat=(color,roughness=.7,metalness=0)=>new T.MeshStandardMaterial({color,roughness,metalness});
 const wood=mat('#a86c43'),dark=mat('#153c32'),cream=mat('#f4ddbc'),brass=mat('#d1ab65',.28,.7),steel=mat('#aeb9b6',.25,.8),black=mat('#24312c'),leaf=mat('#42734b'),soil=mat('#533622');
 function mesh(g,m,x,y,z,parent=scene){const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
 function box(x,y,z,w,h,d,m,parent){return mesh(new T.BoxGeometry(w,h,d),m,x,y,z,parent);}
 function cyl(x,y,z,r,h,m,parent,rt=r){return mesh(new T.CylinderGeometry(rt,r,h,32),m,x,y,z,parent);}
 function sphere(x,y,z,r,m,parent){return mesh(new T.SphereGeometry(r,20,12),m,x,y,z,parent);}
 const ground=box(0,-.3,0,200,.1,200,mat('#253d35'));ground.castShadow=false;
 box(0,-.1,0,12,.35,9,mat('#766348'));
 for(let i=0;i<24;i++)box(-5.75+i*.5,.1,0,.485,.06,8.95,mat(i%3===0?'#bda180':i%3===1?'#cdb494':'#ad9373'));
 box(0,2.4,-4.5,12,4.7,.15,mat('#315448'));
 box(-6,2.4,-1.8,.15,4.7,5.4,mat('#d0bb99'));
 // Architectural trim and tall window on the back wall.
 box(0,.38,-4.36,12,.4,.1,dark);
 box(3.6,2.8,-4.32,3.2,3.2,.08,mat('#ecbe79'));
 const glass=mat('#c9d8b9',.18,.15);box(3.6,2.8,-4.25,2.9,2.9,.05,glass);
 for(const x of [2.05,3.6,5.15])box(x,2.8,-4.13,.1,3.3,.14,cream);
 for(const y of [1.2,2.8,4.4])box(3.6,y,-4.13,3.2,.1,.14,cream);
 // Backbar and shelves.
 box(-1.75,1,-3.6,5.5,1.8,1.2,dark);box(-1.75,1.97,-3.6,5.7,.15,1.4,wood);
 for(const y of [2.75,3.55]){box(-2,y,-4,5,.12,.7,wood);for(const x of [-4,-.1])box(x,y-.18,-4.16,.08,.36,.25,brass);}
 for(let i=0;i<7;i++){const x=-4+i*.57;cyl(x,2.99,-3.95,.15,.34,mat(i%2?'#eee2c6':'#825737'));cyl(x,3.18,-3.95,.165,.045,brass);}
 function cup(x,y,z,parent=scene){cyl(x,y,z,.13,.3,cream,parent,.17);cyl(x,y+.153,z,.142,.009,soil,parent);const handle=mesh(new T.TorusGeometry(.11,.025,8,24),cream,x+.18,y,z,parent);return handle;}
 for(let i=0;i<7;i++)cup(-4+i*.6,3.77,-3.92);
 // Front fluted service counter.
 box(.1,.93,.65,7.7,1.65,1.4,dark);for(let i=0;i<44;i++)box(-3.65+i*.174,.93,1.39,.075,1.62,.06,wood);
 box(.1,1.83,.65,8,.2,1.65,mat('#dfc4a0'));box(.1,.17,1.39,7.8,.13,.08,brass);
 // Espresso machine: body, group heads, switches, tray and cups.
 box(-2.05,2.3,.38,1.7,.8,.82,steel);box(-2.05,2.35,.83,1.45,.38,.05,dark);box(-2.05,1.99,.96,1.65,.05,.5,black);
 for(const x of [-2.45,-1.8]){cyl(x,2.14,.89,.11,.16,steel);box(x+.15,2.13,.94,.35,.06,.09,black);cup(x,2.16,1.09);sphere(x,2.45,.88,.037,mat('#ffa857'));}
 for(let i=0;i<10;i++)box(-2.73+i*.15,2.025,1,.025,.01,.35,steel);
 for(let i=0;i<3;i++)cup(-2.6+i*.5,2.87,.35);
 cyl(-3.38,2.35,.45,.22,.72,black);cyl(-3.38,2.8,.45,.28,.38,mat('#73634e',.2));
 // Syrups and matcha tins.
 for(let i=0;i<3;i++){cyl(-.7+i*.38,2.16,.3,.11,.5,mat(['#8e4c26','#f0e5c7','#578158'][i]));box(-.7+i*.38,2.48,.3,.06,.18,.06,black);box(-.64+i*.38,2.55,.3,.18,.035,.035,black);}
 // Waffle plate and lattice.
 cyl(2.3,1.98,1,.43,.035,cream);box(2.3,2.025,1,.55,.09,.55,mat('#e1a450'));
 for(let i=0;i<5;i++){box(2.08+i*.11,2.078,1,.025,.014,.55,wood);box(2.3,2.078,.78+i*.11,.55,.014,.025,wood);}
 box(3.1,2.02,.2,.55,.15,.5,black);const terminal=box(3.1,2.3,.27,.62,.42,.055,dark);terminal.rotation.x=-.3;
 const workCup=new T.Group();scene.add(workCup);workCup.position.set(.85,1.96,1.05);cup(0,.17,0,workCup);cyl(0,.015,0,.29,.035,cream,workCup);
 const steam=[];for(let i=0;i<5;i++){const o=sphere(.85,2.7,1.05,.035,new T.MeshBasicMaterial({color:'#fff1da',transparent:true,opacity:.25}));steam.push(o);}
 // Customer, stools and tables.
 const customer=new T.Group();scene.add(customer);customer.position.set(2.6,0,2.8);
 const shirt=mat('#b66c47'),skin=mat('#e3b08d');cyl(0,1.05,0,.26,.65,shirt,customer,.32);sphere(0,1.65,0,.23,skin,customer);sphere(0,1.77,-.05,.225,black,customer);
 for(const x of [-.16,.16]){cyl(x,.43,0,.085,.8,dark,customer);box(x,.11,.08,.18,.13,.32,black,customer);}for(const x of [-.38,.38])cyl(x,1.03,0,.075,.62,shirt,customer);
 function table(x,z){cyl(x,1.25,z,.8,.1,wood);cyl(x,.65,z,.06,1.2,black);cyl(x,.18,z,.4,.07,black);cup(x+.2,1.45,z);for(const dx of [-1,1]){cyl(x+dx,.7,z,.33,.12,dark);for(const dz of [-.2,.2]){const leg=cyl(x+dx,.38,z+dz,.035,.6,brass);leg.rotation.z=dx*.1;}}}
 table(4.3,-1.8);table(-4,2.9);
 function plant(x,y,z,size=1){cyl(x,y+.28*size,z,.28*size,.55*size,mat('#c7906b'),undefined,.36*size);cyl(x,y+.55*size,z,.3*size,.02,soil);for(let i=0;i<8;i++){const a=i*Math.PI/4;const o=sphere(x+Math.cos(a)*.28*size,y+.8*size+(i%3)*.12,z+Math.sin(a)*.28*size,.2*size,leaf);o.scale.set(.65,2,.5);o.rotation.z=Math.cos(a)*.6;}}
 plant(5.2,0,-3.6,1.5);plant(-5.1,0,1.1,1.4);plant(-.1,1.98,-3.6,.55);
 // Readable sign generated as a texture, not a flat substitute for the 3D scene.
 const signCanvas=document.createElement('canvas');signCanvas.width=1024;signCanvas.height=320;const cx=signCanvas.getContext('2d');cx.fillStyle='#183c31';cx.fillRect(0,0,1024,320);cx.fillStyle='#f3d4a0';cx.textAlign='center';cx.font='bold 105px Georgia';cx.fillText('bit & bean',512,160);cx.font='22px sans-serif';cx.fillText('COFFEE  /  WAFFLES  /  GOOD DAYS',512,235);const tex=new T.CanvasTexture(signCanvas);tex.colorSpace=T.SRGBColorSpace;
 mesh(new T.PlaneGeometry(3.5,1.09),new T.MeshStandardMaterial({map:tex,roughness:.8}),-1.8,4.35,-4.37);
 scene.add(new T.HemisphereLight('#fff0cc','#3a5446',2.3));const sun=new T.DirectionalLight('#ffd69c',4);sun.position.set(3,9,4);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-9,right:9,top:9,bottom:-9,near:.5,far:30});sun.shadow.normalBias=.035;scene.add(sun);
 for(const x of [-2.3,1.2]){cyl(x,4.6,.5,.018,1,black);mesh(new T.ConeGeometry(.42,.3,32,1,true),brass,x,4.04,.5);const bulb=sphere(x,3.92,.5,.085,new T.MeshStandardMaterial({color:'#ffe0a1',emissive:'#ffbe55',emissiveIntensity:3}));const light=new T.PointLight('#ffcd87',18,7,2);light.position.set(x,3.85,.5);scene.add(light);}
 let view=0,angle=.62,wanted=.62,flash=0;const angles=[.62,1.03,-.12];
 function frame(t){const time=t*.001;angle+=(wanted-angle)*.025;const mobile=innerWidth<700;const radius=mobile?19:17;camera.position.set(Math.sin(angle)*radius,10.2,Math.cos(angle)*radius);camera.lookAt(target);customer.position.y=Math.sin(time*1.6)*.016;customer.rotation.y=Math.sin(time*.5)*.1;steam.forEach((o,i)=>{const q=(time*.3+i*.2)%1;o.position.set(.85+Math.sin(time+i)*.04,2.35+q*.7,1.05);o.material.opacity=(1-q)*.25;o.scale.setScalar(.6+q*1.6);});if(flash>0){flash-=.016;workCup.rotation.y+=.07;}renderer.render(scene,camera);}
 renderer.setAnimationLoop(frame);
 window.addEventListener('resize',()=>{renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();});
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();window.dispatchEvent(new Event('cafe-context-lost'));});
 return{rotate(){view=(view+1)%angles.length;wanted=angles[view];},quality(high){renderer.setPixelRatio(Math.min(devicePixelRatio,high?2:1));renderer.shadowMap.enabled=high;scene.traverse(o=>{if(o.material)o.material.needsUpdate=true;});},serve(){flash=1;customer.position.x=1.8+Math.random()*1.1;},mix(count){workCup.scale.setScalar(1+count*.045);}};
}
