async function loadNodes(){ 
  try {
    const res = await fetch('./nodes.json', {cache:'no-store'});
    if (!res.ok) {
      throw new Error(`Failed to load content (${res.status})`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error loading nodes:', error);
    throw error;
  }
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
          <h1 id="page-title" tabindex="-1" class="text-2xl font-bold mt-2">${node.title}</h1>
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
              <a class="underline" href="${r.url}" target="_blank" rel="noopener noreferrer">
                ${r.label}
                <span class="sr-only">(opens in new tab)</span>
              </a>
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
  
  // Move focus to the new heading for screen reader users
  const heading = document.getElementById('page-title');
  if (heading) {
    heading.focus();
  }
}

(async function init(){
  const app = document.getElementById('app');
  
  // Show loading state
  app.innerHTML = '<div class="max-w-3xl mx-auto p-6 text-center text-gray-600">Loading pathways...</div>';
  
  try {
    const nodes = await loadNodes();
    
    function update(){
      const nodeId = getNodeFromHash();
      const trail = getTrailFromHash();
      renderNode(nodes[nodeId], trail);
    }
    
    window.addEventListener('hashchange', update);
    update();
  } catch (error) {
    // Show user-friendly error message
    app.innerHTML = `
      <div class="max-w-3xl mx-auto p-6 bg-red-50 rounded-2xl shadow border border-red-200">
        <h1 class="text-2xl font-bold text-red-900 mb-3">Unable to Load Content</h1>
        <p class="text-red-800 mb-4">
          We encountered an error loading the AI Pathways Explorer. This might be due to a network issue or browser cache problem.
        </p>
        <div class="space-y-2">
          <button onclick="location.reload()" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Retry
          </button>
          <p class="text-sm text-red-700 mt-4">
            If the problem persists, try:<br>
            • Refreshing your browser (Cmd+R or Ctrl+R)<br>
            • Clearing your browser cache<br>
            • Using a different browser
          </p>
        </div>
        <details class="mt-4 text-xs text-red-600">
          <summary class="cursor-pointer">Technical details</summary>
          <pre class="mt-2 p-2 bg-red-100 rounded overflow-auto">${error.message || error}</pre>
        </details>
      </div>
    `;
  }
})();