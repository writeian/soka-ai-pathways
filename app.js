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
    app.innerHTML = '<div class="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg border-2 border-gray-200"><h1 class="font-serif text-3xl font-bold text-soka-blue">Node not found</h1><p class="mt-3 text-gray-600">Please check the URL or restart from the beginning.</p></div>';
    return;
  }
  const newTrail = trail ? (trail + '>' + node.id) : node.id;
  app.innerHTML = `
    <article class="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg border-2 border-gray-100 transition-all">
      <header class="flex items-start justify-between gap-4 mb-6">
        <div class="flex-1">
          <p class="badge ${pathClass(node.path)} mb-3">${(node.pathLabel||'')}</p>
          <h1 id="page-title" tabindex="-1" class="font-serif text-4xl font-bold text-soka-blue leading-tight tracking-tight">${node.title}</h1>
        </div>
        <div class="text-right text-xs text-gray-400 font-mono">
          <div>Node: <code class="bg-gray-100 px-2 py-1 rounded">${node.id}</code></div>
          <div class="mt-1">Trail: ${newTrail.split('>').length}</div>
        </div>
      </header>
      <p class="text-lg leading-relaxed text-gray-700">${node.narrative}</p>

      ${node.resources && node.resources.length ? `
        <section class="mt-8">
          <h2 class="font-serif text-xl font-semibold text-soka-blue mb-3">Resources</h2>
          <ul class="space-y-3 bg-blue-50 rounded-xl p-5 border border-blue-100">
            ${node.resources.map(r=>`<li class="flex items-start gap-2">
              <span class="text-soka-blue mt-1">→</span>
              <div>
                <a class="text-soka-blue hover:text-blue-800 font-medium underline decoration-2 decoration-soka-yellow hover:decoration-soka-blue transition-colors" href="${r.url}" target="_blank" rel="noopener noreferrer">
                  ${r.label}
                  <span class="sr-only">(opens in new tab)</span>
                </a>
                ${r.why ? `<span class="block text-sm text-gray-600 mt-1">${r.why}</span>` : ''}
              </div>
            </li>`).join('')}
          </ul>
        </section>` : ''}

      <section class="mt-8">
        <h2 class="font-serif text-xl font-semibold text-soka-blue mb-4">Choose Your Path</h2>
        <div class="grid gap-3">
          ${node.choices.map(c=>`<a class="block px-6 py-4 rounded-xl border-2 border-soka-blue bg-white hover:bg-soka-blue hover:text-white text-soka-blue font-medium shadow-sm hover:shadow-md transition-all duration-200 text-center"
              href="#node=${encodeURIComponent(c.to)}&trail=${encodeURIComponent(newTrail)}">${c.label}</a>`).join('')}
        </div>
      </section>

      <section class="mt-8 pt-6 border-t border-gray-200 flex items-center gap-3 text-sm">
        <a class="text-gray-500 hover:text-soka-blue underline transition-colors" href="#node=D1">← Restart from Beginning</a>
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
  app.innerHTML = '<div class="max-w-4xl mx-auto p-8 text-center"><div class="animate-pulse text-soka-blue font-serif text-xl">Loading pathways...</div></div>';
  
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
      <div class="max-w-4xl mx-auto p-8 bg-red-50 rounded-2xl shadow-lg border-2 border-red-200">
        <h1 class="font-serif text-3xl font-bold text-red-900 mb-4">Unable to Load Content</h1>
        <p class="text-lg text-red-800 mb-6 leading-relaxed">
          We encountered an error loading the AI Pathways Explorer. This might be due to a network issue or browser cache problem.
        </p>
        <div class="space-y-4">
          <button onclick="location.reload()" class="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium shadow-sm hover:shadow-md transition-all">
            Retry
          </button>
          <p class="text-sm text-red-700">
            If the problem persists, try:<br>
            • Refreshing your browser (Cmd+R or Ctrl+R)<br>
            • Clearing your browser cache<br>
            • Using a different browser
          </p>
        </div>
        <details class="mt-6 text-xs text-red-600">
          <summary class="cursor-pointer font-medium">Technical details</summary>
          <pre class="mt-2 p-3 bg-red-100 rounded-lg overflow-auto font-mono">${error.message || error}</pre>
        </details>
      </div>
    `;
  }
})();