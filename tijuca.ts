import './styles.scss';

import { Viewer } from '@photo-sphere-viewer/core';
import { GalleryPlugin } from '@photo-sphere-viewer/gallery-plugin';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import { VirtualTourPlugin } from '@photo-sphere-viewer/virtual-tour-plugin';

type Scene = {
  file: string;
  label: string;
  caption: string;
  plan: {
    x: number;
    y: number;
  };
};

const basePath =
  (import.meta.env.BASE_URL?.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL || '/'}/`);
const withBasePath = (relative: string) => `${basePath}${relative.replace(/^\//, '')}`;
const galleryMediaQuery =
  typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)') : null;

const isMobileViewport = () => galleryMediaQuery?.matches ?? false;
const getGalleryThumbnailSize = () =>
  isMobileViewport() ? { width: 170, height: 96 } : { width: 180, height: 110 };

const propertyTitle = 'Casa na Tijuca';
const propertySubtitle = '2 quartos, área externa, 100 m² e 2 lances de escada';

const scenes: Scene[] = [
  {
    file: 'area-externa0.jpg',
    label: 'Área Externa 0',
    caption: 'Área Externa 0',
    plan: { x: 10, y: 16 },
  },
  {
    file: 'area-externa1.jpg',
    label: 'Área Externa 1',
    caption: 'Área Externa 1',
    plan: { x: 22, y: 28 },
  },
  {
    file: 'area-externa2.jpg',
    label: 'Área Externa 2',
    caption: 'Área Externa 2',
    plan: { x: 12, y: 42 },
  },
  {
    file: 'area-externa3.jpg',
    label: 'Área Externa 3',
    caption: 'Área Externa 3',
    plan: { x: 28, y: 46 },
  },
  {
    file: 'varanda.jpg',
    label: 'Varanda',
    caption: 'Varanda',
    plan: { x: 34, y: 20 },
  },
  {
    file: 'terraco.jpg',
    label: 'Terraço',
    caption: 'Terraço',
    plan: { x: 58, y: 16 },
  },
  {
    file: 'cozinha.jpg',
    label: 'Cozinha',
    caption: 'Cozinha',
    plan: { x: 50, y: 36 },
  },
  {
    file: 'corredor1.jpg',
    label: 'Corredor 1',
    caption: 'Corredor 1',
    plan: { x: 42, y: 52 },
  },
  {
    file: 'corredor2.jpg',
    label: 'Corredor 2',
    caption: 'Corredor 2',
    plan: { x: 62, y: 52 },
  },
  {
    file: 'banheiro.jpg',
    label: 'Banheiro',
    caption: 'Banheiro',
    plan: { x: 72, y: 36 },
  },
  {
    file: 'quarto1.jpg',
    label: 'Quarto 1',
    caption: 'Quarto 1',
    plan: { x: 42, y: 74 },
  },
  {
    file: 'quarto2.jpg',
    label: 'Quarto 2',
    caption: 'Quarto 2',
    plan: { x: 68, y: 74 },
  },
];

const scenesByFile = new Map(scenes.map((scene) => [scene.file, scene]));
const galleryItems = scenes.map((scene) => ({
  id: scene.file,
  file: scene.file,
  name: scene.label,
  panorama: withBasePath(`tijuca/${scene.file}`),
  thumbnail: withBasePath(`tijuca/${scene.file}`),
}));

const virtualTourNodes = scenes.map((scene, index) => {
  const prev = scenes[index - 1];
  const next = scenes[index + 1];
  const links: Array<{
    nodeId: string;
    position: { yaw: number; pitch: number };
    arrowStyle: { className: string };
  }> = [];

  if (next) {
    links.push({
      nodeId: next.file,
      position: { yaw: Math.PI, pitch: 0 },
      arrowStyle: { className: 'tour-arrow-next' },
    });
  }

  if (prev) {
    links.push({
      nodeId: prev.file,
      position: { yaw: 0, pitch: 0 },
      arrowStyle: { className: 'tour-arrow-prev' },
    });
  }

  return {
    id: scene.file,
    name: scene.label,
    caption: scene.caption,
    panorama: withBasePath(`tijuca/${scene.file}`),
    thumbnail: withBasePath(`tijuca/${scene.file}`),
    markers: [],
    data: { file: scene.file },
    links,
  };
});

const virtualTourNodeMap = new Map(virtualTourNodes.map((node) => [node.id, node]));
const initialNodeId = virtualTourNodes[0]?.id;

const viewer = new Viewer({
  container: 'viewer',
  panorama: virtualTourNodes[0]?.panorama ?? withBasePath('tijuca/area-externa0.jpg'),
  caption: `${propertyTitle} <b>&copy; Tijuca</b>`,
  loadingImg: 'https://photo-sphere-viewer-data.netlify.app/assets/loader.gif',
  touchmoveTwoFingers: false,
  defaultZoomLvl: 0,
  mousewheelCtrlKey: false,
  navbar: ['zoom', 'gallery', 'fullscreen'],
  plugins: [
    MarkersPlugin,
    GalleryPlugin.withConfig({
      visibleOnLoad: true,
      hideOnClick: false,
      thumbnailSize: getGalleryThumbnailSize(),
      items: galleryItems,
      navigationArrows: true,
    } as any),
    VirtualTourPlugin.withConfig({}),
  ],
});

const galleryPlugin = viewer.getPlugin(GalleryPlugin) as any;
const virtualTourPlugin = viewer.getPlugin(VirtualTourPlugin) as any;

let currentSceneId = initialNodeId ?? scenes[0]?.file;

function renderPlan(activeSceneId = currentSceneId) {
  const planRoot = document.querySelector('#plan-root');
  if (!planRoot) return;

  const activeScene = scenesByFile.get(activeSceneId) ?? scenes[0];

  planRoot.innerHTML = `
    <div class="property-plan-map">
      <div class="property-plan-grid"></div>
      <div class="property-plan-outline property-plan-outline--stairs">2 lances de escada</div>
      <div class="property-plan-outline property-plan-outline--external">Área externa</div>
      <div class="property-plan-outline property-plan-outline--social">Sala / circulação</div>
      <div class="property-plan-outline property-plan-outline--bedroom1">Quarto 1</div>
      <div class="property-plan-outline property-plan-outline--bedroom2">Quarto 2</div>
      <div class="property-plan-outline property-plan-outline--bath">Banheiro</div>

      ${scenes
        .map(
          (scene) => `
            <button
              type="button"
              class="property-plan-pin ${scene.file === activeScene?.file ? 'is-active' : ''}"
              style="left: ${scene.plan.x}%; top: ${scene.plan.y}%;"
              data-scene="${scene.file}"
              aria-label="Ir para ${scene.label}"
              title="${scene.label}"
            >
              <span>${scene.label}</span>
            </button>
          `,
        )
        .join('')}
    </div>
    <div class="property-plan-legend">
      <span><i class="is-active"></i> panorama atual</span>
      <span><i></i> outros ambientes</span>
    </div>
  `;

  planRoot.querySelectorAll<HTMLButtonElement>('.property-plan-pin').forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.scene;
      if (target) {
        changeScene(target);
      }
    });
  });
}

function resolveNode(target: string | undefined) {
  if (!target) return undefined;
  if (virtualTourNodeMap.has(target)) return virtualTourNodeMap.get(target);
  return virtualTourNodes.find((node) => node.panorama === target || node.data?.file === target);
}

function applyCaption(nodeId: string) {
  const node = virtualTourNodeMap.get(nodeId);
  if (node) {
    viewer.setCaption(`${node.caption} <span class="property-caption-meta">Tijuca</span>`);
  }
}

function changeScene(target: string) {
  const resolvedNode = resolveNode(target);
  if (!resolvedNode) return;

  virtualTourPlugin.setCurrentNode(resolvedNode.id).catch((err: any) => {
    console.error('VirtualTour setCurrentNode error:', err);
  });
}

galleryPlugin.addEventListener('select', ({ item }: any) => {
  const nextTarget = item?.id ?? item?.panorama;
  if (nextTarget) {
    changeScene(nextTarget);
  }
});

galleryMediaQuery?.addEventListener('change', () => {
  galleryPlugin.setOptions({
    thumbnailSize: getGalleryThumbnailSize(),
  });
});

virtualTourPlugin.addEventListener('node-changed', ({ node }: any) => {
  currentSceneId = node.id;
  applyCaption(node.id);
  renderPlan(node.data?.file ?? node.id);
});

viewer.addEventListener('ready', () => {
  if (virtualTourPlugin) {
    try {
      virtualTourPlugin.setNodes(virtualTourNodes, initialNodeId);
    } catch (err) {
      console.error('VirtualTour setNodes error:', err);
    }
  }

  if (initialNodeId) {
    applyCaption(initialNodeId);
    renderPlan(initialNodeId);
  }
});
