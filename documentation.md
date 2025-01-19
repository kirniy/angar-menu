# ANGAR Menu Website Documentation

## Core Structure

### HTML Structure
- Root container: `.container`
- Two main menu sections:
  1. Cocktail Menu (`#cocktail-menu`)
  2. Main Menu (`#main-menu`)
- Menu switcher: `.menu-switch`
- Navigation bar: `.menu-nav`
- Footer with social buttons: `.buttons-container`

### CSS Variables
```css
:root {
    --bg-color: #0a0a0a;
    --text-color: #e0e0e0;
    --accent-color: #ff4500;
    --accent-color-hover: #ff6a33;
    --secondary-color: #7ba3f1;
    --tertiary-color: #bc8fe9;
}
```

## JavaScript Functions & Features

### Menu Switching
```javascript
function toggleMenu()
```
- Toggles between cocktail and main menu
- Uses data-menu attribute ('cocktails' or 'main')
- Manages active classes on menu sections
- **Potential Pitfall**: Hardcoded menu types in HTML structure

### Navigation
```javascript
function setActiveNavItem()
function handleScroll()
```
- Updates active navigation item based on scroll position
- Manages floating navigation bar
- **Potential Pitfall**: Navigation items are hardcoded in HTML

### Shopping Cart System
```javascript
function addToCart(name, price, ingredients)
function updateCartButton()
function showCart()
```
- Manages cart state with array of items
- Each item has: name, price, ingredients, quantity
- **Potential Pitfalls**:
  - Item identification relies on exact name matching
  - Price parsing assumes specific format ("XXX ₽")
  - Ingredients extraction depends on DOM structure

### Menu Item Structure
- Class: `.menu-item`
- Components:
  1. Header (`.item-header`)
  2. Logo container (`.item-logo-container`) - for cocktail menu
  3. Price (`.item-price`)
  4. Description (`.item-description`)
  5. Ingredients (`.item-ingredients`)
- **Potential Pitfalls**:
  - Different structures for cocktail vs main menu items
  - Logo paths hardcoded
  - Inconsistent price formats
  - Varying DOM structures between sections

### Interactive Features

#### Add to Cart Button
```javascript
// Dynamic creation for each menu item
const addButton = document.createElement('button');
addButton.className = 'add-to-cart';
```
- **Potential Pitfalls**:
  - Button position depends on item structure
  - Item data extraction varies by menu type

#### Haptic Feedback
```javascript
function addHapticToElement(element, intensity = 'medium')
```
- Integrates with Telegram WebApp API
- **Potential Pitfall**: Assumes Telegram WebApp availability

### Menu Sections Structure
1. Cocktail Menu:
   - Custom logos
   - Full descriptions
   - Ingredient lists
   - Signature cocktail indicators

2. Main Menu Sections:
   - Classic Cocktails
   - Shots
   - Mix Drinks
   - Party Sets
   - Spirits (with subsections)
   - Wine
   - Beer
   - Energy Drinks
   - Soft Drinks
   
**Potential Pitfalls for JSON Migration**:
1. Inconsistent Data Structures:
   - Cocktail menu items have logos, descriptions
   - Main menu items have simpler structure
   - Some items have volumes, some don't
   - Some sections have subsections (e.g., Spirits)

2. Price Formatting:
   - Different price displays (with/without currency)
   - Volume information mixed with price in some cases

3. Image Handling:
   - Logo classes vary (`item-logo-techno`, `item-logo-boiler`, etc.)
   - Custom positioning for each logo

4. Section-Specific Features:
   - Signature cocktail indicators
   - Different layout structures
   - Varying information density

## CSS Classes and Styling

### Key Component Classes
1. Menu Items:
   ```css
   .menu-item
   .item-header
   .item-logo-container
   .item-price
   .item-description
   .item-ingredients
   ```

2. Navigation:
   ```css
   .menu-nav
   .nav-item
   .menu-section-title
   ```

3. Cart Interface:
   ```css
   .shopping-cart
   .cart-modal
   .cart-item
   ```

### Animation Classes
```css
.shake
.added
.active
.floating
```

### Responsive Design
- Mobile-first approach
- Special iOS handling:
  ```css
  @supports (-webkit-touch-callout: none)
  ```
- Custom scrollbar styling

## Recommendations for JSON Migration

1. Create Unified Item Schema:
   ```json
   {
     "id": "string",
     "type": "cocktail|main",
     "name": "string",
     "price": number,
     "currency": "₽",
     "volume": "string?",
     "description": "string?",
     "ingredients": "string?",
     "logo": {
       "path": "string?",
       "class": "string?"
     },
     "isSignature": boolean,
     "section": "string",
     "subsection": "string?"
   }
   ```

2. Separate Structure Definition:
   - Menu sections configuration
   - Navigation structure
   - Layout templates

3. Template System:
   - Different templates for cocktail/main items
   - Flexible rendering based on available data
   - Dynamic class assignment

4. Asset Management:
   - Standardized image paths
   - Consistent naming convention
   - Default fallbacks

5. Price/Volume Standardization:
   - Separate numeric values from formatting
   - Consistent unit handling
   - Clear volume specification

6. Section Configuration:
   - Hierarchical structure definition
   - Navigation mapping
   - Section-specific features

## Event Handling Considerations

1. Dynamic Content Loading:
   - Maintain scroll position
   - Preserve cart state
   - Update navigation

2. Cart Integration:
   - Unique item identification
   - Price calculation consistency
   - Data persistence

3. Interactive Features:
   - Haptic feedback
   - Animation triggers
   - State management

4. Platform-Specific Features:
   - Telegram WebApp integration
   - Mobile device optimization
   - Browser compatibility 