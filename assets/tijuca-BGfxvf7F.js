import{i as e,n as t,r as n,t as r}from"./index.module-S-i-rcrx.js";var i=`./`.endsWith(`/`)?`./`:`.//`,a=e=>`${i}${e.replace(/^\//,``)}`,o=typeof window<`u`?window.matchMedia(`(max-width: 768px)`):null,s=()=>o?.matches??!1,c=()=>s()?{width:170,height:96}:{width:180,height:110},l=`Casa na Tijuca`,u=[{file:`area-externa0.jpg`,label:`Área Externa 0`,caption:`Área Externa 0`,plan:{x:10,y:16}},{file:`area-externa1.jpg`,label:`Área Externa 1`,caption:`Área Externa 1`,plan:{x:22,y:28}},{file:`area-externa2.jpg`,label:`Área Externa 2`,caption:`Área Externa 2`,plan:{x:12,y:42}},{file:`area-externa3.jpg`,label:`Área Externa 3`,caption:`Área Externa 3`,plan:{x:28,y:46}},{file:`varanda.jpg`,label:`Varanda`,caption:`Varanda`,plan:{x:34,y:20}},{file:`terraco.jpg`,label:`Terraço`,caption:`Terraço`,plan:{x:58,y:16}},{file:`cozinha.jpg`,label:`Cozinha`,caption:`Cozinha`,plan:{x:50,y:36}},{file:`corredor1.jpg`,label:`Corredor 1`,caption:`Corredor 1`,plan:{x:42,y:52}},{file:`corredor2.jpg`,label:`Corredor 2`,caption:`Corredor 2`,plan:{x:62,y:52}},{file:`banheiro.jpg`,label:`Banheiro`,caption:`Banheiro`,plan:{x:72,y:36}},{file:`quarto1.jpg`,label:`Quarto 1`,caption:`Quarto 1`,plan:{x:42,y:74}},{file:`quarto2.jpg`,label:`Quarto 2`,caption:`Quarto 2`,plan:{x:68,y:74}}],d=new Map(u.map(e=>[e.file,e])),f=u.map(e=>({id:e.file,file:e.file,name:e.label,panorama:a(`tijuca/${e.file}`),thumbnail:a(`tijuca/${e.file}`)})),p=u.map((e,t)=>{let n=u[t-1],r=u[t+1],i=[];return r&&i.push({nodeId:r.file,position:{yaw:Math.PI,pitch:0},arrowStyle:{className:`tour-arrow-next`}}),n&&i.push({nodeId:n.file,position:{yaw:0,pitch:0},arrowStyle:{className:`tour-arrow-prev`}}),{id:e.file,name:e.label,caption:e.caption,panorama:a(`tijuca/${e.file}`),thumbnail:a(`tijuca/${e.file}`),markers:[],data:{file:e.file},links:i}}),m=new Map(p.map(e=>[e.id,e])),h=p[0]?.id,g=new e({container:`viewer`,panorama:p[0]?.panorama??a(`tijuca/area-externa0.jpg`),caption:`${l} <b>&copy; Tijuca</b>`,loadingImg:`https://photo-sphere-viewer-data.netlify.app/assets/loader.gif`,touchmoveTwoFingers:!1,defaultZoomLvl:0,mousewheelCtrlKey:!1,navbar:[`zoom`,`gallery`,`fullscreen`],plugins:[n,t.withConfig({visibleOnLoad:!0,hideOnClick:!1,thumbnailSize:c(),items:f,navigationArrows:!0}),r.withConfig({})]}),_=g.getPlugin(t),v=g.getPlugin(r),y=h??u[0]?.file;function b(e=y){let t=document.querySelector(`#plan-root`);if(!t)return;let n=d.get(e)??u[0];t.innerHTML=`
    <div class="property-plan-map">
      <div class="property-plan-grid"></div>
      <div class="property-plan-outline property-plan-outline--stairs">2 lances de escada</div>
      <div class="property-plan-outline property-plan-outline--external">Área externa</div>
      <div class="property-plan-outline property-plan-outline--social">Sala / circulação</div>
      <div class="property-plan-outline property-plan-outline--bedroom1">Quarto 1</div>
      <div class="property-plan-outline property-plan-outline--bedroom2">Quarto 2</div>
      <div class="property-plan-outline property-plan-outline--bath">Banheiro</div>

      ${u.map(e=>`
            <button
              type="button"
              class="property-plan-pin ${e.file===n?.file?`is-active`:``}"
              style="left: ${e.plan.x}%; top: ${e.plan.y}%;"
              data-scene="${e.file}"
              aria-label="Ir para ${e.label}"
              title="${e.label}"
            >
              <span>${e.label}</span>
            </button>
          `).join(``)}
    </div>
    <div class="property-plan-legend">
      <span><i class="is-active"></i> panorama atual</span>
      <span><i></i> outros ambientes</span>
    </div>
  `,t.querySelectorAll(`.property-plan-pin`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.scene;t&&C(t)})})}function x(e){if(e)return m.has(e)?m.get(e):p.find(t=>t.panorama===e||t.data?.file===e)}function S(e){let t=m.get(e);t&&g.setCaption(`${t.caption} <span class="property-caption-meta">Tijuca</span>`)}function C(e){let t=x(e);t&&v.setCurrentNode(t.id).catch(e=>{console.error(`VirtualTour setCurrentNode error:`,e)})}_.addEventListener(`select`,({item:e})=>{let t=e?.id??e?.panorama;t&&C(t)}),o?.addEventListener(`change`,()=>{_.setOptions({thumbnailSize:c()})}),v.addEventListener(`node-changed`,({node:e})=>{y=e.id,S(e.id),b(e.data?.file??e.id)}),g.addEventListener(`ready`,()=>{if(v)try{v.setNodes(p,h)}catch(e){console.error(`VirtualTour setNodes error:`,e)}h&&(S(h),b(h))});