# Discourse Group Sidebar Menus

## 👩‍💻 Overview

This Discourse theme component allows admins to create custom sidebar menus that are only accessible to members of selected groups.

**Key Features:**

- **Group-based access control** - Menu sections only render for authorized users
- **Object-based configuration** - All settings for creating group menu sections are in component admin UI
- **Multiple sections** - Create unlimited menu sections for different groups (within reason)
- **Client-side security** - Unauthorized users cannot see menu sections in DOM, web inspector, or safe mode
- **No global pollution** - Doesn't require creating global sidebar sections
- **Admin quick-edit link** - Pencil icon in menu headers links admins directly to component settings

## 💼 Use Cases

- Staff-only resources and quick links
- Trust-level-specific navigation (guides for new users, advanced tools for veterans)
- Category moderator shortcuts
- Custom group portals (project teams, study groups, book clubs, VIP members)
- Links to parent or partner website resources

## ⚙️ Settings

### Menu Sections (`menu_sections`)

Opens the object settings editor to configure custom group menu sections.

#### Section Properties

| Property | Description |
|----------|-------------|
| **Menu title** | Title displayed as the sidebar section header |
| **Allowed groups** | Groups permitted to view this menu section (max: 20 groups per section) |
| **Menu links** | Collection of links to display in this section (max: 20 links per section) |

#### Link Properties

| Property | Description |
|----------|-------------|
| **Icon** | FontAwesome icon name (e.g., `circle-info`, `star`, `user-group`). May need to be added to **Admin > All site settings > `svg_icon_subset`** |
| **Text** | Display label for the link |
| **URL** | Link destination - supports both relative paths (`/faq`, `/my/preferences`) and absolute URLs (`https://example.com`) |

## 🔧 Configuration Example

```yaml
Menu Title: "Staff Resources"
Allowed Groups: staff
Links:
  - Icon: wrench
    Text: Moderation Guide
    URL: /t/moderation-guide/123
  - Icon: chart-line
    Text: Analytics Dashboard
    URL: /admin/dashboard
```

## 💡 Important Notes

### Admin Access

* **Admins must add themselves to groups** to see menus configured for those groups. Admin status alone does not grant access to all custom menus. This is intentional!
* Admins who belong to a menu’s allowed groups will see a pencil icon in the section header that links to component settings.

### Group Configuration

* **`everyone` group is not supported** - Use the native sidebar footer UI to create global custom menus for all users, including anonymous visitors.
* Maximum of 20 groups per menu section. If you need more, create duplicate sections with different group assignments.
* Users in multiple groups will see all menu sections they have access to.

### Testing & Organization

* **Use test accounts** to verify menu visibility for different group combinations.
* Keep track of your menu configurations to avoid confusion as complexity grows.

### Security Considerations

This component provides **UI-level access control only**. It controls menu access, not resource access.

**What this component protects:**

* :white_check_mark: Menu sections hidden from unauthorized users
* :white_check_mark: Links not discoverable via inspector/console/safe-mode
* :white_check_mark: Clean UX without menu clutter

**What administrators must still secure:**

* Configure linked category security permissions and group memembership separately - for example: a menu link to a private category must have that category’s permissions properly configured.
* Administrators are responsible for ensuring links to outside resources are appropriately authorized for selected groups.

**Best practice:** Use this component to organize navigation to resources that already have proper Discourse and organizational permissions in place.


---

**Support**: For issues or feature requests, please post in the [Meta topic](https://meta.discourse.org/t/discourse-group-sidebar-menus) or start a PR on this repo.  

**To hire me or buy me coffee**: :coffee: visit me here: [Lilly@Discourse Meta](https://meta.discourse.org/u/Lilly/summary).
