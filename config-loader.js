/**
 * Configuration loader with graceful fallbacks
 */

const DEFAULT_CONFIG = {
  institution: {
    name: "Soka University of America",
    shortName: "SUA",
    missionUrl: "https://www.soka.edu/about/suas-heritage/mission-and-values"
  },
  branding: {
    primaryColor: "#0048B7",
    accentColor: "#FCD43B",
    pathwayColors: {
      ignore: "#F3F4F6",
      prohibitive: "#001D61",
      balanced: "#FFE20D",
      embracing: "#249E6B",
      collaborative: "#66B0FF"
    }
  },
  values: {
    motto: "philosophers of a renaissance of life",
    value1: "humanism",
    value2: "intercultural dialogue",
    value3: "pacifism",
    value4: "contributive lives"
  },
  resources: {
    hasResearchCenter: true,
    researchCenterName: "Pacific Basin Research Center",
    researchCenterUrl: "https://www.soka.edu/academics/research/pacific-basin-research-center/about",
    hasWritingCenter: true,
    writingCenterName: "Writing Center",
    writingCenterUrl: "https://catalog.soka.edu/university-writing-center",
    integrityPolicyUrl: "https://catalog.soka.edu/academic-honesty",
    integrityPolicyLabel: "SUA Academic Honesty Policy"
  },
  metadata: {
    siteName: "Soka AI Pathways Explorer",
    description: "Choose-your-own-path explorer for AI in the classroom at Soka University of America"
  }
};

export async function loadConfig() {
  try {
    const response = await fetch('./config/config.json', { cache: 'no-store' });
    if (!response.ok) {
      console.log('ℹ️  No custom config found, using Soka defaults');
      return DEFAULT_CONFIG;
    }
    const config = await response.json();
    // Merge with defaults to ensure all fields exist
    return mergeWithDefaults(config, DEFAULT_CONFIG);
  } catch (error) {
    console.log('ℹ️  Error loading config, using Soka defaults:', error.message);
    return DEFAULT_CONFIG;
  }
}

export async function loadNodesWithConfig() {
  try {
    // Load base nodes
    const baseResponse = await fetch('./nodes.json', { cache: 'no-store' });
    if (!baseResponse.ok) {
      throw new Error('Failed to load base nodes');
    }
    const baseNodes = await baseResponse.json();
    
    // Try to load customizations
    let customNodes = {};
    try {
      const customResponse = await fetch('./data/custom-nodes.json', { cache: 'no-store' });
      if (customResponse.ok) {
        customNodes = await customResponse.json();
        console.log(`ℹ️  Loaded ${Object.keys(customNodes).length} node customizations`);
      }
    } catch {
      // No custom nodes, that's fine
      console.log('ℹ️  No custom nodes found, using base content');
    }
    
    // Merge: custom overrides base
    const mergedNodes = { ...baseNodes };
    Object.entries(customNodes).forEach(([id, custom]) => {
      if (mergedNodes[id]) {
        // Merge, keeping base values for any missing fields
        mergedNodes[id] = {
          ...mergedNodes[id],
          ...custom,
          // Preserve base resources/choices if custom doesn't provide them
          resources: custom.resources || mergedNodes[id].resources || [],
          choices: custom.choices || mergedNodes[id].choices || []
        };
      }
    });
    
    return mergedNodes;
  } catch (error) {
    console.error('Error loading nodes:', error);
    throw error;
  }
}

function mergeWithDefaults(config, defaults) {
  const merged = JSON.parse(JSON.stringify(defaults)); // Deep clone
  
  // Merge each section
  if (config.institution) {
    merged.institution = { ...merged.institution, ...config.institution };
  }
  if (config.branding) {
    merged.branding = {
      ...merged.branding,
      ...config.branding,
      pathwayColors: { ...merged.branding.pathwayColors, ...config.branding.pathwayColors }
    };
  }
  if (config.values) {
    merged.values = { ...merged.values, ...config.values };
  }
  if (config.resources) {
    merged.resources = { ...merged.resources, ...config.resources };
  }
  if (config.metadata) {
    merged.metadata = { ...merged.metadata, ...config.metadata };
  }
  
  return merged;
}

export function applyColorsToDOM(config) {
  const root = document.documentElement;
  root.style.setProperty('--color-primary', config.branding.primaryColor);
  root.style.setProperty('--color-accent', config.branding.accentColor);
  root.style.setProperty('--color-ignore', config.branding.pathwayColors.ignore);
  root.style.setProperty('--color-prohibitive', config.branding.pathwayColors.prohibitive);
  root.style.setProperty('--color-balanced', config.branding.pathwayColors.balanced);
  root.style.setProperty('--color-embracing', config.branding.pathwayColors.embracing);
  root.style.setProperty('--color-collaborative', config.branding.pathwayColors.collaborative);
}

