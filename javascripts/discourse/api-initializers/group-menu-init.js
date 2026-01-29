import { apiInitializer } from "discourse/lib/api";
import { i18n } from "discourse-i18n";
import CustomMenuLink from "../lib/custom-menu-link";

/**
 * Initializes custom sidebar menu sections based on user group membership.
 * Each configured section is only visible to users belonging to the specified groups.
 */
export default apiInitializer((api) => {
  const currentUser = api.getCurrentUser();
  if (!currentUser) {
    return;
  }

  // Auto-detect theme component ID from themePrefix
  const extractThemeId = () => {
    const prefix = themePrefix();
    const match = prefix.match(/theme_translations\.(\d+)\./);
    return match ? match[1] : null;
  };

  const themeId = extractThemeId();

  // Get IDs of all groups the current user belongs to
  const userGroupIds = currentUser.groups.map((g) => g.id);
  const menuSections = settings.menu_sections || [];

  // Process each configured menu section
  for (const section of menuSections) {
    const allowedGroupIds = section.groups || [];
    
    // Skip sections with no group configuration
    if (!allowedGroupIds.length) {
      continue;
    }

    // Check if user belongs to any of the allowed groups
    const hasAccess = allowedGroupIds.some((id) => userGroupIds.includes(id));

    if (!hasAccess) {
      continue;
    }

    // Create link instances from section configuration
    const menuLinks = (section.links || []).map(
      (link) => new CustomMenuLink(link)
    );

    // Skip sections with no links configured
    if (!menuLinks.length) {
      continue;
    }

    // Generate section identifier from title (e.g., "My Menu" -> "my-menu")
    const sectionTitle = section.title;
    const sectionName = `${sectionTitle.toLowerCase().replace(/\s+/g, "-")}`;

    // Register the sidebar section
    api.addSidebarSection((BaseCustomSidebarSection) => {
      return class CustomMenuSection extends BaseCustomSidebarSection {
        name = sectionName;
        text = sectionTitle;

        // Show pencil icon in header for admins when theme ID is detected
        get actionsIcon() {
          return currentUser.admin && themeId ? "pencil" : null;
        }

        // Admin action to navigate to theme component settings
        get actions() {
          if (!currentUser.admin || !themeId) {
            return [];
          }

          return [
            {
              id: "editSection",
              title: i18n(themePrefix("edit_component")),
              action: () => window.location.href = `/admin/customize/themes/${themeId}`,
            },
          ];
        }

        get links() {
          return menuLinks;
        }
      };
    }, "main");
  }
});
