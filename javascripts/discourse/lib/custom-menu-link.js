/**
 * Represents a single link in a custom sidebar menu section.
 * This class implements the interface expected by Discourse's sidebar link system.
 */
export default class CustomMenuLink {
  /**
   * @param {Object} linkData - Link configuration from theme settings
   * @param {string} linkData.text - Display text for the link
   * @param {string} linkData.url - URL or path for the link
   * @param {string} linkData.icon - FontAwesome icon name
   */
  constructor(linkData) {
    this.linkData = linkData;
  }

  /**
   * Unique identifier for the link, generated from text.
   * Used by Discourse for DOM attributes and tracking.
   * @returns {string} Kebab-cased link identifier (e.g., "link-about-us")
   */
  get name() {
    return `link-${this.linkData.text.toLowerCase().replace(/\s+/g, "-")}`;
  }

  /**
   * CSS class name(s) applied to the link element.
   * @returns {string} Space-separated class names
   */
  get classNames() {
    return "link";
  }

  /**
   * Ember route name for navigation.
   * Returns null to always use href-based navigation for flexibility.
   * This allows both internal paths (/faq) and external URLs to work.
   * @returns {null}
   */
  get route() {
    return null;
  }

  /**
   * URL for the link.
   * Handles both relative paths and absolute URLs.
   * @returns {string} The configured URL
   */
  get href() {
    return this.linkData.url;
  }

  /**
   * Display text for the link.
   * @returns {string} The configured link text
   */
  get text() {
    return this.linkData.text;
  }

  /**
   * Type of prefix to display before the link text.
   * @returns {string} Always "icon" for FontAwesome icons
   */
  get prefixType() {
    return "icon";
  }

  /**
   * Icon identifier for the link prefix.
   * @returns {string} FontAwesome icon name (e.g., "star", "circle-info")
   */
  get prefixValue() {
    return this.linkData.icon;
  }
}
