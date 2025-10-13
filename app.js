async function loadNodes(){ 
  const res = await fetch('./nodes.json', {cache:'no-store'});
  return res.json();
}
function getParam(name){
  const m = location.hash.match(new RegExp(name+'=([^&]+)'));
  return m ? decodeURIComponent(m[1]) : '';
}
function getNodeFromHash(){ return getParam('node') || 'D1'; }
function getTrailFromHash(){ return getParam('trail'); }
function setHash(node, trail){ location.hash = 'node='+encodeURIComponent(node) + (trail ? '&trail='+encodeURIComponent(trail) : ''); }

function pathClass(path){
  switch(path){
    case 'prohibitive': return 'path-prohibitive';
    case 'balanced': return 'path-balanced';
    case 'embracing': return 'path-embracing';
    case 'collaborative': return 'path-collaborative';
    default: return 'path-shared';
  }
}

function renderNode(node, trail=''){
  const app = document.getElementById('app');
  if(!node){
    app.innerHTML = '<div class="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow">Node not found.</div>';
    return;
  }
  const newTrail = trail ? (trail + '>' + node.id) : node.id;
  app.innerHTML = `
    <article class="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow border border-gray-200">
      <header class="flex items-start justify-between gap-3">
        <div>
          <p class="badge ${pathClass(node.path)}">${(node.pathLabel||'')}</p>
          <h1 class="text-2xl font-bold mt-2">${node.title}</h1>
        </div>
        <div class="text-right text-xs text-gray-500">
          <div>Node: <code>${node.id}</code></div>
          <div>Trail len: ${newTrail.split('>').length}</div>
        </div>
      </header>
      <p class="mt-4 leading-7">${node.narrative}</p>

      ${node.resources && node.resources.length ? `
        <section class="mt-6">
          <h2 class="font-semibold">Resources</h2>
          <ul class="list-disc ml-5 mt-2 space-y-1">
            ${node.resources.map(r=>`<li>
              <a class="underline" href="${r.url}" target="_blank" rel="noreferrer">${r.label}</a>
              ${r.why ? `<span class="text-sm text-gray-600"> — ${r.why}</span>` : ''}
            </li>`).join('')}
          </ul>
        </section>` : ''}

      <section class="mt-6 grid gap-2">
        ${node.choices.map(c=>`<a class="px-4 py-2 rounded-xl border border-gray-300 inline-block hover:bg-gray-50"
              href="#node=${encodeURIComponent(c.to)}&trail=${encodeURIComponent(newTrail)}">${c.label}</a>`).join('')}
      </section>

      <section class="mt-6 flex items-center gap-3 text-sm">
        <button class="underline" onclick="navigator.clipboard.writeText(location.href)">Copy link to this step</button>
        <a class="underline" href="#node=R1&trail=${encodeURIComponent(newTrail)}">Jump to Meta‑Reflection</a>
        <a class="underline" href="#node=D1">Restart</a>
      </section>
    </article>
  `;
}

(async function init(){
  const nodes = await loadNodes();
  function update(){
    const nodeId = getNodeFromHash();
    const trail = getTrailFromHash();
    renderNode(nodes[nodeId], trail);
  }
  window.addEventListener('hashchange', update);
  update();
})();