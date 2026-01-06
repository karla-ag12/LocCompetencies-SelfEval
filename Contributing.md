# Contributing to LMCC Self-Evaluation Tool

Thank you for your interest in contributing to this project! We welcome contributions from everyone, especially students learning about localization.

## How to Contribute

### For Students in Website Localization

If you're completing a Spanish localization assignment:

1. **Fork the repository** to your GitHub account
2. **Clone your fork** to your local machine
3. **Create a new branch** for your work:
   ```bash
   git checkout -b spanish-localization
   ```
4. **Complete the localization tasks**:
   - Translate `en-us.json` → `es-mx.json`
   - Copy and adapt `LocCompetencies_en-US.html` → `LocCompetencies_es-MX.html`
   - Update language-specific elements (lang attribute, meta tags, etc.)

5. **Customize CSS for your target audience** (Optional but recommended):
   - Open `locessential-styles.css`
   - Modify the CSS variables in the `:root` section to match your organization's branding:
     ```css
     :root {
         --primary-color: #1c6399;      /* Main brand color */
         --secondary-color: #2b7bb9;    /* Secondary brand color */
         --accent-color: #50A5E6;       /* Accent/highlight color */
         --success-color: #3dd598;      /* Success indicators (strengths) */
         --pink-accent: #ef91c6;        /* Used for areas needing development */
     }
     ```
   - **Example for a Mexican university**:
     ```css
     :root {
         --primary-color: #1a472a;      /* Deep green */
         --secondary-color: #2d5f3f;    /* Forest green */
         --accent-color: #d4af37;       /* Gold accent */
         --success-color: #2d5f3f;      /* Forest green */
     }
     ```
   - Update footer copyright and contact information to reflect your organization
   - **Tip**: Test color contrast for accessibility (use tools like WebAIM's Contrast Checker)
   - **Important**: Start by keeping all class names unchanged - only modify color values and text

6. **Enable Spanish functionality** in `resource-loader.js`:
   - Find the `SPANISH_COMING_SOON` constant (around line 30)
   - Change `const SPANISH_COMING_SOON = true;` to `const SPANISH_COMING_SOON = false;`
   - This will disable the "coming soon" message and enable actual language switching

7. **Test your work** thoroughly in a browser:
   - Check all translated text displays correctly
   - Verify color scheme works well and is accessible
   - Test language switching functionality
   - Ensure responsive design works on mobile
   - Print preview to ensure print styles work

8. **Commit your changes** with clear messages:
   ```bash
   git add .
   git commit -m "Add Spanish localization with custom branding
   
   - Translated all UI strings to Mexican Spanish
   - Customized CSS colors for [Your Organization] branding
   - Enabled Spanish language switching
   - Updated footer with organization info"
   ```

9. **Push to your fork** and create a pull request

### Understanding CSS Customization for Localization

When localizing for a specific market, consider that color meanings vary by culture.

**Your CSS Customization Should:**
- Reflect the target organization's brand identity
- Consider cultural color associations in the target market
- Maintain sufficient contrast for accessibility (WCAG AA: 4.5:1 for text)
- Be tested with native speakers and target audience members

**Common CSS Changes for Localization:**
1. **Colors** - Brand alignment and cultural appropriateness
2. **Fonts** - May need different font families for certain scripts (Arabic, Chinese, etc.)
3. **Text direction** - RTL (right-to-left) for Arabic, Hebrew
4. **Spacing** - Some languages need more space (German text is ~30% longer than English)

### Enabling/Disabling the Spanish "Coming Soon" Message

The application includes a configuration constant that controls whether Spanish localization is active:

**Location**: `resource-loader.js`, in the `changeLanguage()` method (around line 30)

**To show "coming soon" message** (default state):
```javascript
const SPANISH_COMING_SOON = true;
```

**To enable Spanish localization** (after translation is complete):
```javascript
const SPANISH_COMING_SOON = false;
```

This makes it easy to switch between development and production modes without commenting/uncommenting code.

### For Other Localizers

We welcome translations into any language! Follow the same process as above, using the appropriate locale codes.

#### Locale Naming Convention
- Use ISO language-region format: `zh-CN`, `fr-CI`, `pt-BR`, etc.
- File names: `LocCompetencies_[locale].html` and `[locale-lowercase].json`

## Quality Standards

### Translation Quality
- Maintain the original meaning and intent
- Adapt cultural references appropriately
- Keep technical terminology consistent
- Preserve HTML structure and formatting
- Don't translate:
  - File names or paths in code
  - HTML element IDs
  - CSS class names
  - JavaScript variable names

### Testing Checklist
Before submitting, ensure:
- [ ] All text is translated (no English remnants)
- [ ] Language picker switches correctly
- [ ] All buttons and links work
- [ ] Chart displays properly with translated labels
- [ ] No JavaScript console errors
- [ ] Responsive design works on mobile
- [ ] Print functionality works

### CSS Customization for Target Audience

The application uses LocEssentials branding colors and styling. When localizing for a specific audience or organization, you may want to customize the CSS:

#### What to Customize
1. **Colors** - Update CSS variables in `locessential-styles.css`:
   ```css
   :root {
       --primary-color: #1c6399;      /* Main brand color */
       --secondary-color: #2b7bb9;    /* Secondary brand color */
       --accent-color: #50A5E6;       /* Accent/highlight color */
       --success-color: #3dd598;      /* Success/strength indicators */
       --warning-color: #FF0000;      /* Warning/improvement indicators */
       --pink-accent: #ef91c6;        /* Secondary accent */
   }
   ```

2. **Typography** - Adjust fonts if needed:
   ```css
   --font-main: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
   --font-heading: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
   ```

3. **Logo/Branding** - Add organization logo to header if desired
4. **Footer** - Update copyright and contact information

#### Example: Academic Institution Branding
```css
:root {
    --primary-color: #003366;        /* University blue */
    --secondary-color: #0055A4;      
    --accent-color: #FFB81C;         /* School gold */
    --success-color: #00A651;        
}
```

#### Tips
- Test color contrast for accessibility (WCAG AA minimum)
- Preview on multiple devices before committing
- Keep the original file structure intact
- Document your changes in comments

### Code Style
- Maintain consistent indentation (2 spaces)
- Keep line length reasonable (<120 characters)
- Add comments for complex logic
- Follow existing code patterns

## Bug Reports

Found a bug? Please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs. actual behavior
- Browser and OS information
- Screenshots if applicable

## Feature Requests

Have an idea? Create an issue describing:
- The problem it solves
- How it would work
- Why it would be valuable
- Any implementation ideas

## Pull Request Process

1. **Update documentation** if you're changing functionality
2. **Test thoroughly** across different browsers
3. **Write clear commit messages**:
   ```
   Add Spanish localization for UI strings
   
   - Translated all strings in en-us.json to Spanish
   - Created es-mx.json with culturally appropriate adaptations
   - Updated HTML file with proper lang attributes
   ```
4. **Reference issues** in your PR description if applicable
5. **Be patient** - we'll review as soon as possible!

## Questions?

- Check existing issues and pull requests first
- For localization questions: info@locessentials.com
- For technical questions: Create a GitHub issue

## Recognition

All contributors will be:
- Listed in the GitHub contributors page
- Credited in project documentation
- Forever appreciated! 🎉

Thank you for helping make localization education better!
