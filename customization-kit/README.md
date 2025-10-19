# AI Pathways Explorer - Customization Kit

## Quick Start Guide

This kit allows you to customize the AI Pathways Explorer for your own institution **without writing code**.

---

## What You'll Need

- **Excel** or **Google Sheets**
- **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
- **GitHub account** (for deploying your customized site)

---

## Step-by-Step Instructions

### 1. Import CSV Files into Spreadsheet

**Option A: Microsoft Excel**
1. Create new Excel workbook
2. Create 4 sheets: `Branding`, `Values`, `Resource Library`, `Nodes`
3. In each sheet: **Data → From Text/CSV** → import corresponding CSV file
   - Import `01-Branding.csv` into "Branding" sheet
   - Import `02-Values.csv` into "Values" sheet
   - Import `03-Resource-Library.csv` into "Resource Library" sheet
   - Import `04-Nodes.csv` into "Nodes" sheet
4. Save as `AI-Explorer-Customization.xlsx`

**Option B: Google Sheets**
1. Create new Google Sheet
2. Create 4 sheets (tabs) with names above
3. In each sheet: **File → Import → Upload** → select CSV → **Replace current sheet**
4. Repeat for all 4 CSVs
5. Keep it named `AI-Explorer-Customization`

### 2. Customize Your Content

**Edit the "Value" columns only** (pre-filled with Soka defaults as examples):

#### Branding Tab (12 fields)
- Change institution name, colors, URLs
- Use hex color codes (e.g., #003366)
- Test colors at [colorhexa.com](https://www.colorhexa.com/)

#### Values Tab (5 fields)
- Edit your institution's motto and core values
- These appear throughout narratives

#### Resource Library Tab (8 fields)
- Set "Yes" or "No" for research/writing centers
- If "Yes", **must** provide name and URL
- Add your academic integrity policy URL

#### Nodes Tab (23 rows × many columns)
- **Most admins leave this unchanged** - Soka content is generic
- Edit only if you want to change specific narratives or resources
- Each row is one node (D1, I1, P1, etc.)
- Wide spreadsheet - scroll right to see all columns

### 3. Generate Configuration Files

**First, install dependencies from the project root:**

#### For Mac/Linux:
```bash
# From the repository root (where package.json is located)
cd /path/to/soka-ai-pathways-site
npm install

# Then run the generator (it will find your workbook in customization-kit/)
npm run generate
```

#### For Windows:
```cmd
# From the repository root
cd C:\path\to\soka-ai-pathways-site
npm install

# Run the generator
npm run generate
```

**Note:** The generator automatically looks for `customization-kit/AI-Explorer-Customization.xlsx`

**⚡ Quick Alternative - All-in-One Script:**
```bash
# From repository root (Mac/Linux only)
bash customization-kit/generate.sh
```
This script handles `npm install` + generation + validation automatically!

**Output (in `customization-kit/output/`):**
- `config.json` - Your branding configuration
- `custom-nodes.json` - Your content customizations  
- `validation-report.txt` - Any errors or warnings

### 4. Review Validation Report

Open `output/validation-report.txt` and fix any errors:
- Missing required fields
- Invalid hex colors (must be #RRGGBB)
- Invalid URLs (must start with http:// or https://)
- Research/Writing center toggles with missing URLs

### 5. Test Locally (Optional but Recommended)

```bash
# From repository root - copy generated files
cp customization-kit/output/config.json config/
cp customization-kit/output/custom-nodes.json data/

# Run local server
python3 -m http.server 8000
```

Visit `http://localhost:8000` to preview your customized site.

**⚡ Quick Alternative - Helper Script:**
```bash
# From repository root (Mac/Linux only)
bash customization-kit/test-local.sh
```
Automatically copies files and starts server!

**To revert back to Soka defaults for testing:**
```bash
cp config/config-soka.json config/config.json
rm data/custom-nodes.json
```

### 6. Deploy to GitHub Pages

**⚡ Quick Method - Helper Script (Mac/Linux):**
```bash
# From repository root
bash customization-kit/deploy.sh
```
Automatically copies files, commits, and pushes to GitHub!

**Manual Method:**

**Option A: Web Interface** (Easier)
1. Go to your GitHub repository
2. Navigate to `config/` folder
3. Click **Add file → Upload files**
4. Drag `output/config.json` here
5. Repeat for `data/custom-nodes.json`
6. Commit changes
7. Wait 1-2 minutes for deployment

**Option B: Command Line**
```bash
git add config/config.json data/custom-nodes.json
git commit -m "Apply [Your Institution] customization"
git push origin main
```

---

## What Gets Customized

### Automatically Replaced
- ✅ Institution name throughout site
- ✅ All brand colors (buttons, headings, badges)
- ✅ Mission/values references
- ✅ Links to your centers and policies

### Optional Customization
- Individual node narratives
- Resource links
- Choice labels
- Pathway descriptions

---

## Files in This Kit

| File | Purpose |
|------|---------|
| `01-Branding.csv` | Institution name, colors, URLs |
| `02-Values.csv` | Mission motto and core values |
| `03-Resource-Library.csv` | Your research/writing centers |
| `04-Nodes.csv` | All 23 node contents (optional to edit) |
| `README.md` | This file |

---

## Troubleshooting

### "Module not found: xlsx"
Run `npm install` in the customization-kit directory.

### "Cannot find workbook"
Make sure your Excel file is named exactly `AI-Explorer-Customization.xlsx` and in the `customization-kit/` folder.

### "Invalid hex color"
Colors must be 6-character hex codes starting with # (e.g., #0048B7, not #04B or blue).

### "Required field is empty"
If you enable Research Center or Writing Center, you must provide both name and URL.

### Changes don't appear on site
1. Check you copied files to correct folders (`config/` and `data/`)
2. Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+F5)
3. Check browser console for errors (F12)

---

## Support

- **Documentation:** See `/docs/Admin-Customization-System-Guide.md` in the repository
- **Issues:** Open an issue on GitHub
- **Questions:** Contact the maintainer

---

## License

MIT License - Feel free to adapt for your institution.

**Original:** Created by Soka University of America  
**Customized by:** [Your Institution Name]


