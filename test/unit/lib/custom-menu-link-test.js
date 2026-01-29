import { module, test } from "qunit";
import CustomMenuLink from "../../../discourse/lib/custom-menu-link";

module("Unit | Lib | custom-menu-link", function () {
  test("creates link with correct properties", function (assert) {
    const linkData = {
      text: "About Us",
      url: "/about",
      icon: "circle-info",
    };

    const link = new CustomMenuLink(linkData);

    assert.strictEqual(link.text, "About Us", "text matches input");
    assert.strictEqual(link.href, "/about", "href matches input");
    assert.strictEqual(link.prefixValue, "circle-info", "icon matches input");
    assert.strictEqual(link.prefixType, "icon", "prefix type is icon");
  });

  test("generates kebab-case name from text", function (assert) {
    const linkData = {
      text: "My Awesome Link",
      url: "/awesome",
      icon: "star",
    };

    const link = new CustomMenuLink(linkData);

    assert.strictEqual(
      link.name,
      "link-my-awesome-link",
      "name is kebab-cased with prefix"
    );
  });

  test("handles text with special characters in name", function (assert) {
    const linkData = {
      text: "FAQ & Help",
      url: "/faq",
      icon: "question",
    };

    const link = new CustomMenuLink(linkData);

    assert.strictEqual(
      link.name,
      "link-faq-&-help",
      "special characters preserved except spaces"
    );
  });

  test("returns null for route to use href navigation", function (assert) {
    const linkData = {
      text: "External Link",
      url: "https://example.com",
      icon: "link",
    };

    const link = new CustomMenuLink(linkData);

    assert.strictEqual(link.route, null, "route is null for href-based navigation");
  });

  test("applies correct class names", function (assert) {
    const linkData = {
      text: "Test",
      url: "/test",
      icon: "test",
    };

    const link = new CustomMenuLink(linkData);

    assert.strictEqual(link.classNames, "link", "class name is correct");
  });

  test("handles internal paths", function (assert) {
    const linkData = {
      text: "Preferences",
      url: "/my/preferences",
      icon: "cog",
    };

    const link = new CustomMenuLink(linkData);

    assert.strictEqual(
      link.href,
      "/my/preferences",
      "internal path is preserved"
    );
  });

  test("handles external URLs", function (assert) {
    const linkData = {
      text: "Documentation",
      url: "https://docs.example.com",
      icon: "book",
    };

    const link = new CustomMenuLink(linkData);

    assert.strictEqual(
      link.href,
      "https://docs.example.com",
      "external URL is preserved"
    );
  });
});
