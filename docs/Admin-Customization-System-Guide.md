# Admin Customization System Guide
## Making AI Pathways Explorer Universally Customizable

**Version:** 1.0  
**Created:** October 2025  
**Purpose:** Enable any institution to customize the AI Pathways Explorer for their context

---

## Overview

This guide outlines how to implement an admin interface that allows users to customize the AI Pathways Explorer for their institution without editing code. The system uses a configuration-driven approach with live editing capabilities.

---

## System Architecture

### Files Structure
```
/
├── index.html              # Main application
├── admin.html              # NEW: Admin customization interface
├── app.js                  # Main app (updated to use config)
├── tracking.js             # User tracking
├── config.js               # NEW: Configuration management
├── config-default.json     # NEW: Soka default configuration
├── nodes-template.json     # NEW: Template with {{placeholders}}
└── nodes.json              # Generated from template + config
```

---

## Phase 1: Tier 2 Customization (13 Fields)

### A. Basic Branding (5 fields)

| Field | Placeholder | Example | Where Used |
|-------|------------|---------|------------|
| Institution Name | `{{institution}}` | Soka University of America | Narratives, title |
| Institution Short Name | `{{institution_short}}` | SUA | Narratives |
| Primary Color | `{{color_primary}}` | #0048B7 | Headings, buttons, links |
| Accent Color | `{{color_accent}}` | #FCD43B | Highlights, badges |
| Mission Page URL | `{{mission_url}}` | https://www.soka.edu/... | D1, R1 resources |

### B. Mission & Values (4 fields)

| Field | Placeholder | Example | Where Used |
|-------|------------|---------|------------|
| Mission Motto | `{{mission_motto}}` | philosophers of a renaissance of life | P1, narratives |
| Value 1 | `{{value_1}}` | humanism | Throughout narratives |
| Value 2 | `{{value_2}}` | intercultural dialogue | Throughout narratives |
| Value 3 | `{{value_3}}` | pacifism | Throughout narratives |

### C. Institutional Resources (4 fields)

| Field | Placeholder | Example | Where Used |
|-------|------------|---------|------------|
| Research Center Name | `{{research_center}}` | Pacific Basin Research Center | B2B, E3B |
| Research Center URL | `{{research_center_url}}` | https://... | B2B, E3B |
| Writing Center Name | `{{writing_center}}` | Writing Center | C2B |
| Writing Center URL | `{{writing_center_url}}` | https://... | C2B |

---

## Phase 2: Admin Interface Design

### Access Method

**URL:** `https://yoursite.com/#admin` or separate `admin.html`

**Authentication:** Simple password stored in config or URL parameter
- Example: `#admin?key=customize2025`
- No server needed, just client-side check

### Admin Page Layout

```
┌──────────────────────────────────────────────────────────────┐
│  🎓 AI Pathways Explorer - Admin Customization               │
├──────────────────────────────────────────────────────────────┤
│  [Institution Setup] [Colors] [Nodes Editor] [Preview]       │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  INSTITUTION SETUP                                           │
│  ─────────────────────────────────────────────────────      │
│  Full Name: [Soka University of America____________]        │
│  Short Name: [SUA____]                                       │
│  Mission URL: [https://...____________________]              │
│                                                              │
│  BRANDING COLORS                                             │
│  ─────────────────────────────────────────────────────      │
│  Primary:  [#0048B7] 🎨 Preview: ███                        │
│  Accent:   [#FCD43B] 🎨 Preview: ███                        │
│                                                              │
│  Pathway Colors (Optional - leave blank for defaults):      │
│  Ignore:        [#9CA3AF] 🎨                                │
│  Prohibitive:   [#001D61] 🎨                                │
│  Balanced:      [#FFE20D] 🎨                                │
│  Embracing:     [#249E6B] 🎨                                │
│  Collaborative: [#66B0FF] 🎨                                │
│                                                              │
│  MISSION & VALUES                                            │
│  ─────────────────────────────────────────────────────      │
│  Motto/Principle: [philosophers of a renaissance of life]    │
│  Value 1: [humanism______________]                           │
│  Value 2: [intercultural dialogue]                           │
│  Value 3: [pacifism______________]                           │
│  Value 4: [contributive lives____]                           │
│                                                              │
│  INSTITUTIONAL RESOURCES (Optional)                          │
│  ─────────────────────────────────────────────────────      │
│  ☑ We have a Research Center                                │
│    Name: [Pacific Basin Research Center]                    │
│    URL:  [https://..._______________]                        │
│                                                              │
│  ☑ We have a Writing Center                                 │
│    Name: [Writing Center]                                    │
│    URL:  [https://..._______________]                        │
│                                                              │
│  Academic Integrity Policy URL:                              │
│    [https://catalog.soka.edu/academic-honesty]               │
│                                                              │
│  [💾 Save Configuration] [👁️ Preview] [⬇️ Export]          │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Phase 3: Node Text Editor

### Node Editor Interface

```
┌──────────────────────────────────────────────────────────────┐
│  EDIT NODES                                                  │
├──────────────────────────────────────────────────────────────┤
│  Select Node: [D1: Designing a Mission... ▼]                 │
│                                                              │
│  Title:                                                      │
│  [Designing a Mission-Aligned Seminar_______________]        │
│                                                              │
│  Pathway: [shared ▼]  Label: [Shared Start__]               │
│                                                              │
│  Narrative:                                                  │
│  ┌────────────────────────────────────────────────────┐    │
│  │You are preparing an upper-level interdisciplinary  │    │
│  │seminar at {{institution}}, but you're facing...    │    │
│  │                                                     │    │
│  │[Text editor with {{placeholder}} support]          │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  Resources:                                                  │
│  [1] Label: [Soka University Mission___________]             │
│      URL:   [https://...___________________]                 │
│      Why:   [Ground course goals in mission]                 │
│      [Remove] [+ Add Resource]                               │
│                                                              │
│  Choices:                                                    │
│  [1] Label: [Ignore AI — Defer policy...] → [I1]            │
│  [2] Label: [Prohibitive — Ban AI____] → [P1]               │
│      [Remove] [+ Add Choice]                                 │
│                                                              │
│  [💾 Save Node] [⬅️ Previous] [➡️ Next]                    │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Implementation Plan

### Step 1: Create Configuration System (30 min)

**File: `config.js`**
```javascript
export const defaultConfig = {
  institution: {
    name: "Soka University of America",
    shortName: "SUA",
    missionUrl: "https://www.soka.edu/about/suas-heritage/mission-and-values"
  },
  branding: {
    primaryColor: "#0048B7",
    accentColor: "#FCD43B",
    pathwayColors: {
      ignore: "#9CA3AF",
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
    integrityPolicyUrl: "https://catalog.soka.edu/academic-honesty"
  }
};

export function loadConfig() {
  const saved = localStorage.getItem('ai-pathways-config');
  return saved ? JSON.parse(saved) : defaultConfig;
}

export function saveConfig(config) {
  localStorage.setItem('ai-pathways-config', JSON.stringify(config));
}

export function applyConfigToNodes(nodes, config) {
  // Replace all {{placeholders}} with config values
  const json = JSON.stringify(nodes);
  let customized = json
    .replace(/\{\{institution\}\}/g, config.institution.name)
    .replace(/\{\{institution_short\}\}/g, config.institution.shortName)
    .replace(/\{\{mission_motto\}\}/g, config.values.motto)
    .replace(/\{\{value_1\}\}/g, config.values.value1)
    // ... etc for all placeholders
  
  return JSON.parse(customized);
}
```

### Step 2: Create nodes-template.json (15 min)

Convert current `nodes.json` to use placeholders:
- "Soka University of America" → `{{institution}}`
- "SUA" → `{{institution_short}}`
- "philosophers of a renaissance of life" → `{{mission_motto}}`
- etc.

### Step 3: Build Admin Interface (2 hours)

**File: `admin.html`**

**Features:**
1. **Config Tab** - 13 Tier 2 fields
2. **Colors Tab** - Visual color pickers
3. **Nodes Tab** - List of all 23 nodes, click to edit
4. **Preview Tab** - Live preview of changes
5. **Export Tab** - Download customized files

**Actions:**
- Save to localStorage (persists in browser)
- Export as ZIP (config.json + nodes.json)
- Reset to Soka defaults
- Apply changes instantly

### Step 4: Dynamic Color Application (45 min)

**CSS Variables in `index.html`:**
```css
:root {
  --color-primary: #0048B7;
  --color-accent: #FCD43B;
}

/* Load from config on page load */
```

**JavaScript sets colors:**
```javascript
const config = loadConfig();
document.documentElement.style.setProperty('--color-primary', config.branding.primaryColor);
```

### Step 5: Template Processing (30 min)

On app load:
1. Load config (localStorage or default)
2. Load template nodes
3. Replace placeholders
4. Render with custom branding

---

## User Workflow

### For Admin/Customizer:

1. Visit `#admin` or `admin.html`
2. Fill in 13 Tier 2 fields
3. (Optional) Edit specific node narratives
4. Preview changes
5. Export customized package OR save to localStorage
6. Share link: `?config=custom` (uses their localStorage config)

### For End Users:

1. Visit regular site
2. See customized branding automatically
3. No difference in experience
4. Works exactly as before

---

## Technical Considerations

### Placeholder System

**In nodes-template.json:**
```json
{
  "D1": {
    "narrative": "You are preparing a seminar at {{institution}}, guided by {{institution_short}}'s commitment to {{value_1}} and {{value_2}}..."
  }
}
```

**Conditional sections:**
```json
{
  "B2B": {
    "narrative": "{{#if hasResearchCenter}}Your seminar partners with {{research_center}}{{else}}Your seminar explores{{/if}}..."
  }
}
```

### Color Validation

- Validate hex codes (must start with #, 6 characters)
- Provide color picker UI
- Show live preview of colors
- Check contrast for accessibility

### Export Options

**Option 1: Download Package**
- `config.json` - Their settings
- `nodes.json` - Customized content
- `README.txt` - Instructions to use

**Option 2: Share Link**
- Generate shareable URL with encoded config
- Other institutions can import

---

## Security Considerations

### Admin Access

**Simple Protection:**
- Hidden URL: `#admin?key=yourpassword`
- Client-side only
- Good enough for this use case

**Alternative:**
- No password, just document that `/admin.html` exists
- Trust-based system

### Data Privacy

- All customization stored in localStorage
- No server uploads
- Users control their data
- Clear data anytime

---

## Future Enhancements

### Phase 4: Advanced Features (Optional)

1. **Add/Remove Nodes** - Create custom pathways
2. **Reorder Choices** - Change decision flow
3. **Custom Resources** - Add institution-specific links
4. **Multi-language** - Spanish, Japanese, etc.
5. **Themes** - Pre-built configs for different institutions
6. **Import/Export** - Share configs between users

---

## Implementation Checklist

### Tier 2 Config System (Required)
- [ ] Create `config.js` with default configuration
- [ ] Create `config-default.json` with Soka settings
- [ ] Convert `nodes.json` to `nodes-template.json` with placeholders
- [ ] Add config loading to `app.js`
- [ ] Implement placeholder replacement function
- [ ] Add CSS variable support for colors

### Admin Interface (Required)
- [ ] Create `admin.html` with form interface
- [ ] Build Tier 2 configuration form (13 fields)
- [ ] Add color picker widgets
- [ ] Implement save/load from localStorage
- [ ] Add export functionality (download config)
- [ ] Add reset to defaults button

### Node Editor (Optional but Recommended)
- [ ] Create node selection dropdown
- [ ] Build text editor for narrative
- [ ] Add resource editor (add/edit/remove)
- [ ] Add choice editor (add/edit/remove)
- [ ] Implement save individual node
- [ ] Add undo/redo capability

### Live Preview (Nice to Have)
- [ ] Split-screen preview mode
- [ ] Real-time updates as you type
- [ ] Navigate through nodes in preview
- [ ] Toggle between original and custom

### Polish & Testing
- [ ] Input validation (URLs, hex codes)
- [ ] Error handling
- [ ] Mobile responsive admin interface
- [ ] Help text and tooltips
- [ ] Test with multiple institutions
- [ ] Documentation for end users

---

## Example Configurations

### Example 1: Generic University

```json
{
  "institution": {
    "name": "Your University",
    "shortName": "YU",
    "missionUrl": "https://youruniversity.edu/mission"
  },
  "branding": {
    "primaryColor": "#003366",
    "accentColor": "#FFD700"
  },
  "values": {
    "motto": "truth, knowledge, service",
    "value1": "critical thinking",
    "value2": "community engagement",
    "value3": "ethical leadership",
    "value4": "lifelong learning"
  },
  "resources": {
    "hasResearchCenter": false,
    "hasWritingCenter": true,
    "writingCenterName": "Writing Support Center",
    "writingCenterUrl": "https://youruniversity.edu/writing"
  }
}
```

### Example 2: Liberal Arts College

```json
{
  "institution": {
    "name": "Liberal Arts College",
    "shortName": "LAC"
  },
  "branding": {
    "primaryColor": "#8B0000",
    "accentColor": "#FFD700"
  },
  "values": {
    "motto": "truth through inquiry",
    "value1": "intellectual curiosity",
    "value2": "civic responsibility",
    "value3": "creative expression",
    "value4": "social justice"
  }
}
```

---

## Technical Implementation Notes

### Template Processing

**Simple String Replacement:**
```javascript
function applyConfig(template, config) {
  return template
    .replace(/\{\{institution\}\}/g, config.institution.name)
    .replace(/\{\{institution_short\}\}/g, config.institution.shortName)
    // ... etc
}
```

**Conditional Sections:**
```javascript
// If they don't have research center, skip those nodes
if (!config.resources.hasResearchCenter) {
  delete customizedNodes.B2B;
  delete customizedNodes.E3B;
}
```

### Color Application

**CSS Custom Properties:**
```css
:root {
  --primary: #0048B7;
  --accent: #FCD43B;
}

.text-soka-blue { color: var(--primary); }
.bg-soka-yellow { background: var(--accent); }
```

**Dynamic Update:**
```javascript
document.documentElement.style.setProperty('--primary', config.branding.primaryColor);
document.documentElement.style.setProperty('--accent', config.branding.accentColor);
```

---

## Validation Rules

### Required Fields
- Institution name (min 3 characters)
- Primary color (valid hex)
- Accent color (valid hex)
- Mission URL (valid URL format)

### Optional Fields
- Can be left blank
- System uses sensible defaults
- Skips conditional content if not provided

### Color Validation
```javascript
function isValidHex(color) {
  return /^#[0-9A-F]{6}$/i.test(color);
}

function checkContrast(fg, bg) {
  // Ensure text is readable
  // WCAG AA minimum contrast ratio: 4.5:1
}
```

---

## Export Formats

### Option 1: Configuration Only
```
custom-config.json
```
User can load this into another browser

### Option 2: Complete Package
```
my-institution-pathways.zip
├── config.json
├── nodes.json (generated)
├── README.md (how to deploy)
└── index.html (copy)
```

### Option 3: Shareable URL
```
https://yoursite.com/?config=base64encodedconfig
```

---

## Testing Checklist

- [ ] Soka default configuration works
- [ ] Generic university configuration works
- [ ] All placeholders replaced correctly
- [ ] Colors apply throughout site
- [ ] Conditional content shows/hides correctly
- [ ] Export downloads valid files
- [ ] Import loads configurations
- [ ] Mobile responsive admin interface
- [ ] Works in Chrome, Firefox, Safari
- [ ] localStorage persists across sessions

---

## Deployment Strategy

### For Soka Version (Current)
- Keep as-is
- Soka branding hardcoded
- No admin interface needed for workshop

### For Generic Version (LinkedIn)
- Deploy to new repo: `ai-pedagogy-pathways`
- Include admin interface
- Default to generic branding
- Include Soka as example config

### Documentation for Users

Create `CUSTOMIZATION.md`:
1. How to access admin interface
2. What each field does
3. How to export your custom version
4. How to deploy to GitHub Pages
5. Troubleshooting guide

---

## Timeline Estimate

| Task | Time | Priority |
|------|------|----------|
| Config system | 30 min | Essential |
| Template nodes.json | 45 min | Essential |
| Basic admin form (Tier 2) | 1.5 hours | Essential |
| Color picker UI | 30 min | Important |
| Node text editor | 2 hours | Nice to have |
| Preview mode | 1 hour | Nice to have |
| Export functionality | 45 min | Important |
| Testing & polish | 1 hour | Important |
| **TOTAL TIER 2** | **3.5 hours** | |
| **TOTAL WITH NODE EDITOR** | **6 hours** | |

---

## Success Metrics

After implementation, users should be able to:
- ✅ Customize branding in < 10 minutes
- ✅ See live preview of changes
- ✅ Export ready-to-deploy package
- ✅ Edit narratives without coding
- ✅ Share configurations with colleagues
- ✅ Deploy to their own GitHub Pages

---

## Questions to Resolve Before Implementation

1. **Admin access method:** Hidden URL, password, or open?
2. **Scope:** Tier 2 only, or include node editor?
3. **When:** Before Soka workshop or after?
4. **Deployment:** Separate repo or same repo with feature flag?
5. **Export format:** JSON only, or complete package?

---

## Next Steps

1. Review this specification
2. Decide on scope (Tier 2 vs full node editor)
3. Set timeline
4. Begin implementation
5. Test with pilot institution
6. Document and share on LinkedIn

---

**Author:** AI Pathways Development Team  
**Institution:** Soka University of America  
**License:** MIT  
**Contact:** [Your contact info]

