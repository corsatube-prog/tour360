import{V as T,M as C,G as v,a as g}from"./index.module-ChzhgdPK.js";const E="./".endsWith("/")?"./":".//",p=a=>`${E}${a.replace(/^\//,"")}`,l=typeof window<"u"?window.matchMedia("(max-width: 768px)"):null,N=()=>(l==null?void 0:l.matches)??!1,b=()=>N()?{width:170,height:96}:{width:180,height:110},P="Casa na Tijuca",n=[{file:"area-externa0.jpg",label:"Área Externa 0",caption:"Área Externa 0",plan:{x:10,y:16}},{file:"area-externa1.jpg",label:"Área Externa 1",caption:"Área Externa 1",plan:{x:22,y:28}},{file:"area-externa2.jpg",label:"Área Externa 2",caption:"Área Externa 2",plan:{x:12,y:42}},{file:"area-externa3.jpg",label:"Área Externa 3",caption:"Área Externa 3",plan:{x:28,y:46}},{file:"varanda.jpg",label:"Varanda",caption:"Varanda",plan:{x:34,y:20}},{file:"terraco.jpg",label:"Terraço",caption:"Terraço",plan:{x:58,y:16}},{file:"cozinha.jpg",label:"Cozinha",caption:"Cozinha",plan:{x:50,y:36}},{file:"corredor1.jpg",label:"Corredor 1",caption:"Corredor 1",plan:{x:42,y:52}},{file:"corredor2.jpg",label:"Corredor 2",caption:"Corredor 2",plan:{x:62,y:52}},{file:"banheiro.jpg",label:"Banheiro",caption:"Banheiro",plan:{x:72,y:36}},{file:"quarto1.jpg",label:"Quarto 1",caption:"Quarto 1",plan:{x:42,y:74}},{file:"quarto2.jpg",label:"Quarto 2",caption:"Quarto 2",plan:{x:68,y:74}}],S=new Map(n.map(a=>[a.file,a])),I=n.map(a=>({id:a.file,file:a.file,name:a.label,panorama:p(`tijuca/${a.file}`),thumbnail:p(`tijuca/${a.file}`)})),s=n.map((a,e)=>{const t=n[e-1],r=n[e+1],i=[];return r&&i.push({nodeId:r.file,position:{yaw:Math.PI,pitch:0},arrowStyle:{className:"tour-arrow-next"}}),t&&i.push({nodeId:t.file,position:{yaw:0,pitch:0},arrowStyle:{className:"tour-arrow-prev"}}),{id:a.file,name:a.label,caption:a.caption,panorama:p(`tijuca/${a.file}`),thumbnail:p(`tijuca/${a.file}`),markers:[],data:{file:a.file},links:i}}),u=new Map(s.map(a=>[a.id,a]));var f;const o=(f=s[0])==null?void 0:f.id;var y;const d=new T({container:"viewer",panorama:((y=s[0])==null?void 0:y.panorama)??p("tijuca/area-externa0.jpg"),caption:`${P} <b>&copy; Tijuca</b>`,loadingImg:"https://photo-sphere-viewer-data.netlify.app/assets/loader.gif",touchmoveTwoFingers:!1,defaultZoomLvl:0,mousewheelCtrlKey:!1,navbar:["zoom","gallery","fullscreen"],plugins:[C,v.withConfig({visibleOnLoad:!0,hideOnClick:!1,thumbnailSize:b(),items:I,navigationArrows:!0}),g.withConfig({})]}),x=d.getPlugin(v),c=d.getPlugin(g);var h;let m=o??((h=n[0])==null?void 0:h.file);function w(a=m){const e=document.querySelector("#plan-root");if(!e)return;const t=S.get(a)??n[0];e.innerHTML=`
    <div class="property-plan-map">
      <div class="property-plan-grid"></div>
      <div class="property-plan-outline property-plan-outline--stairs">2 lances de escada</div>
      <div class="property-plan-outline property-plan-outline--external">Área externa</div>
      <div class="property-plan-outline property-plan-outline--social">Sala / circulação</div>
      <div class="property-plan-outline property-plan-outline--bedroom1">Quarto 1</div>
      <div class="property-plan-outline property-plan-outline--bedroom2">Quarto 2</div>
      <div class="property-plan-outline property-plan-outline--bath">Banheiro</div>

      ${n.map(r=>`
            <button
              type="button"
              class="property-plan-pin ${r.file===(t==null?void 0:t.file)?"is-active":""}"
              style="left: ${r.plan.x}%; top: ${r.plan.y}%;"
              data-scene="${r.file}"
              aria-label="Ir para ${r.label}"
              title="${r.label}"
            >
              <span>${r.label}</span>
            </button>
          `).join("")}
    </div>
    <div class="property-plan-legend">
      <span><i class="is-active"></i> panorama atual</span>
      <span><i></i> outros ambientes</span>
    </div>
  `,e.querySelectorAll(".property-plan-pin").forEach(r=>{r.addEventListener("click",()=>{const i=r.dataset.scene;i&&$(i)})})}function L(a){if(a)return u.has(a)?u.get(a):s.find(e=>{var t;return e.panorama===a||((t=e.data)==null?void 0:t.file)===a})}function j(a){const e=u.get(a);e&&d.setCaption(`${e.caption} <span class="property-caption-meta">Tijuca</span>`)}function $(a){const e=L(a);e&&c.setCurrentNode(e.id).catch(t=>{console.error("VirtualTour setCurrentNode error:",t)})}x.addEventListener("select",({item:a})=>{const e=(a==null?void 0:a.id)??(a==null?void 0:a.panorama);e&&$(e)});l==null||l.addEventListener("change",()=>{x.setOptions({thumbnailSize:b()})});c.addEventListener("node-changed",({node:a})=>{var e;m=a.id,j(a.id),w(((e=a.data)==null?void 0:e.file)??a.id)});d.addEventListener("ready",()=>{if(c)try{c.setNodes(s,o)}catch(a){console.error("VirtualTour setNodes error:",a)}o&&(j(o),w(o))});
