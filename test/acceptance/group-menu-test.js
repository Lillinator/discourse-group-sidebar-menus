import { click, visit } from "@ember/test-helpers";
import { test } from "qunit";
import { acceptance, exists } from "discourse/tests/helpers/qunit-helpers";

acceptance("Group Menu - Sidebar Sections", function (needs) {
  needs.user();
  needs.settings({
    menu_sections: [
      {
        title: "Test Menu",
        groups: [10], // trust_level_0
        links: [
          {
            icon: "circle-info",
            text: "About",
            url: "/about",
          },
          {
            icon: "star",
            text: "FAQ",
            url: "/faq",
          },
        ],
      },
    ],
  });

  test("displays menu section for authorized user", async function (assert) {
    await visit("/");

    assert.ok(
      exists(".sidebar-section[data-section-name='test-menu']"),
      "menu section exists"
    );

    assert.ok(
      exists(".sidebar-section-test-menu .sidebar-section-header-text"),
      "section header exists"
    );

    assert.strictEqual(
      document.querySelector(".sidebar-section-test-menu .sidebar-section-header-text")
        .textContent.trim(),
      "Test Menu",
      "section title is correct"
    );

    assert.ok(
      exists(".sidebar-section-test-menu .sidebar-section-link[data-link-name*='about']"),
      "first link exists"
    );

    assert.ok(
      exists(".sidebar-section-test-menu .sidebar-section-link[data-link-name*='faq']"),
      "second link exists"
    );
  });

  test("menu section is collapsible", async function (assert) {
    await visit("/");

    const sectionHeader = ".sidebar-section-test-menu .sidebar-section-header-button";

    assert.ok(exists(sectionHeader), "section header button exists");

    await click(sectionHeader);

    assert.ok(
      document
        .querySelector(".sidebar-section-test-menu")
        .classList.contains("sidebar-section-collapsed"),
      "section is collapsed after click"
    );
  });
});

acceptance("Group Menu - No Access", function (needs) {
  needs.user();
  needs.settings({
    menu_sections: [
      {
        title: "Admin Only Menu",
        groups: [1], // admins group
        links: [
          {
            icon: "wrench",
            text: "Admin Panel",
            url: "/admin",
          },
        ],
      },
    ],
  });

  test("does not display menu section for unauthorized user", async function (assert) {
    await visit("/");

    assert.notOk(
      exists(".sidebar-section[data-section-name='admin-only-menu']"),
      "admin menu section does not exist for regular user"
    );
  });
});

acceptance("Group Menu - Multiple Sections", function (needs) {
  needs.user();
  needs.settings({
    menu_sections: [
      {
        title: "First Menu",
        groups: [10],
        links: [
          {
            icon: "star",
            text: "Link One",
            url: "/one",
          },
        ],
      },
      {
        title: "Second Menu",
        groups: [10],
        links: [
          {
            icon: "heart",
            text: "Link Two",
            url: "/two",
          },
        ],
      },
    ],
  });

  test("displays multiple menu sections", async function (assert) {
    await visit("/");

    assert.ok(
      exists(".sidebar-section[data-section-name='first-menu']"),
      "first menu section exists"
    );

    assert.ok(
      exists(".sidebar-section[data-section-name='second-menu']"),
      "second menu section exists"
    );
  });
});

acceptance("Group Menu - No Configuration", function (needs) {
  needs.user();
  needs.settings({
    menu_sections: [],
  });

  test("does not display sections when none configured", async function (assert) {
    await visit("/");

    assert.notOk(
      exists(".sidebar-section-link.custom-menu-link"),
      "no custom menu links exist"
    );
  });
});

acceptance("Group Menu - Admin Edit Icon", function (needs) {
  needs.user({ admin: true });
  needs.settings({
    menu_sections: [
      {
        title: "Staff Menu",
        groups: [3], // staff group
        links: [
          {
            icon: "wrench",
            text: "Tools",
            url: "/tools",
          },
        ],
      },
    ],
  });

  test("displays edit icon for admin with auto-detected theme ID", async function (assert) {
    await visit("/");

    assert.ok(
      exists(".sidebar-section-staff-menu .sidebar-section-header-button"),
      "section header exists"
    );

    assert.ok(
      exists(".sidebar-section-staff-menu .sidebar-section-header-button .d-icon-pencil"),
      "pencil icon exists in header for admin (auto-detected)"
    );
  });
});

acceptance("Group Menu - Non-Admin User", function (needs) {
  needs.user({ admin: false });
  needs.settings({
    menu_sections: [
      {
        title: "Test Menu",
        groups: [10], // trust_level_0
        links: [
          {
            icon: "star",
            text: "Link",
            url: "/link",
          },
        ],
      },
    ],
  });

  test("does not display edit icon for non-admin user", async function (assert) {
    await visit("/");

    assert.ok(
      exists(".sidebar-section-test-menu"),
      "section exists for authorized non-admin"
    );

    assert.notOk(
      exists(".sidebar-section-test-menu .d-icon-pencil"),
      "pencil icon does not exist for non-admin user"
    );
  });
});
