import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "static",
    },
  },
  schema: {
    collections: [
      {
        name: "landing",
        label: "Landing Page",
        path: "content",
        format: "md",
        match: { include: "_index" },
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: "string", name: "title", label: "Page title", isTitle: true, required: true },
          { type: "string", name: "description", label: "Meta description", ui: { component: "textarea" } },
          { type: "string", name: "page_lang", label: "HTML lang attribute" },

          // ---------- NAV ----------
          {
            type: "object",
            name: "nav",
            label: "Navigation",
            fields: [
              {
                type: "object", name: "links", label: "Links", list: true,
                ui: { itemProps: (i: any) => ({ label: i?.label }) },
                fields: [
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "href",  label: "Href" },
                ],
              },
              { type: "string", name: "cta_label", label: "CTA button label" },
            ],
          },

          // ---------- HERO ----------
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "title_line1", label: "Title line 1" },
              { type: "string", name: "title_line2_prefix", label: "Title line 2 prefix" },
              {
                type: "string", name: "accent_word", label: "Accent word",
                options: [
                  { value: "echt",    label: "écht anders" },
                  { value: "samen",   label: "écht samen" },
                  { value: "sneller", label: "écht sneller" },
                ],
              },
              { type: "string", name: "lead", label: "Lead paragraph (HTML ok)", ui: { component: "textarea" } },
              { type: "string", name: "cta_primary", label: "Primary CTA label" },
              { type: "string", name: "cta_secondary", label: "Secondary CTA label" },
              {
                type: "object", name: "meta", label: "Hero stats", list: true,
                ui: { itemProps: (i: any) => ({ label: i?.value }) },
                fields: [
                  { type: "string", name: "value", label: "Value" },
                  { type: "string", name: "label", label: "Caption" },
                ],
              },
            ],
          },

          // ---------- PROBLEM ----------
          {
            type: "object",
            name: "problem",
            label: "Problem",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "title_html", label: "Title (HTML)", ui: { component: "textarea" } },
              { type: "string", name: "body", label: "Body", ui: { component: "textarea" } },
              {
                type: "object", name: "cards", label: "Problem cards", list: true,
                ui: { itemProps: (i: any) => ({ label: i?.title }) },
                fields: [
                  { type: "string", name: "icon", label: "Icon", options: [
                    "file","users","layers","database","clock","grid","target",
                    "workflow","bulb","check","barChart","arrowRight","map","user",
                    "calendar","msg","sliders","play","eye","refresh","shield","flag"
                  ]},
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "body",  label: "Body", ui: { component: "textarea" } },
                ],
              },
              {
                type: "object", name: "transition", label: "From → To strip",
                fields: [
                  { type: "string", name: "from_label", label: "From label" },
                  { type: "string", name: "from_value", label: "From value" },
                  { type: "string", name: "to_label",   label: "To label" },
                  { type: "string", name: "to_value",   label: "To value" },
                ],
              },
            ],
          },

          // ---------- PLATFORM ----------
          {
            type: "object",
            name: "platform",
            label: "Platform",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "title_html", label: "Title (HTML)", ui: { component: "textarea" } },
              { type: "string", name: "body", label: "Body", ui: { component: "textarea" } },
              {
                type: "object", name: "features", label: "Features", list: true,
                ui: { itemProps: (i: any) => ({ label: i?.title }) },
                fields: [
                  { type: "string", name: "icon",  label: "Icon" },
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "body",  label: "Body", ui: { component: "textarea" } },
                ],
              },
              {
                type: "object", name: "aside", label: "Niet / Wél aside",
                fields: [
                  { type: "string", name: "not_list", label: "Not list", list: true },
                  { type: "string", name: "yes_lead_html", label: "Yes lead (HTML)", ui: { component: "textarea" } },
                  { type: "string", name: "yes_body", label: "Yes body", ui: { component: "textarea" } },
                ],
              },
            ],
          },

          // ---------- ECOSYSTEM ----------
          {
            type: "object",
            name: "ecosystem",
            label: "Ecosystem",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "title_html", label: "Title (HTML)", ui: { component: "textarea" } },
              { type: "string", name: "body", label: "Body", ui: { component: "textarea" } },
              {
                type: "object", name: "quadrants", label: "Wheel quadrants", list: true,
                ui: { itemProps: (i: any) => ({ label: i?.title }) },
                fields: [
                  { type: "string", name: "key",   label: "Position", options: ["tl","tr","bl","br"] },
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "body",  label: "Body" },
                ],
              },
              { type: "string", name: "center_signature", label: "Center signature (HTML)", ui: { component: "textarea" } },
              { type: "string", name: "list_title", label: "List title" },
              {
                type: "object", name: "list", label: "Ecosystem rows", list: true,
                ui: { itemProps: (i: any) => ({ label: i?.name }) },
                fields: [
                  { type: "string", name: "icon", label: "Icon" },
                  { type: "string", name: "name", label: "Name" },
                  { type: "string", name: "tag",  label: "Tag" },
                  { type: "string", name: "desc", label: "Description", ui: { component: "textarea" } },
                ],
              },
            ],
          },

          // ---------- TRAJECT ----------
          {
            type: "object",
            name: "traject",
            label: "Traject (12 weeks)",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "title_html", label: "Title (HTML)", ui: { component: "textarea" } },
              { type: "string", name: "body", label: "Body", ui: { component: "textarea" } },
              {
                type: "object", name: "steps", label: "Steps", list: true,
                ui: { itemProps: (i: any) => ({ label: i?.title }) },
                fields: [
                  { type: "string", name: "week",  label: "Week range" },
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "body",  label: "Body", ui: { component: "textarea" } },
                ],
              },
            ],
          },

          // ---------- IMPACT ----------
          {
            type: "object",
            name: "impact",
            label: "Impact KPIs",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "title_html", label: "Title (HTML)", ui: { component: "textarea" } },
              { type: "string", name: "body", label: "Body", ui: { component: "textarea" } },
              {
                type: "object", name: "cards", label: "KPI cards", list: true,
                ui: { itemProps: (i: any) => ({ label: i?.label }) },
                fields: [
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "num",   label: "Number" },
                  { type: "string", name: "unit",  label: "Unit" },
                  { type: "string", name: "desc",  label: "Description", ui: { component: "textarea" } },
                ],
              },
            ],
          },

          // ---------- QUOTE ----------
          {
            type: "object",
            name: "quote",
            label: "Manifest quote band",
            fields: [
              { type: "boolean", name: "show",      label: "Show section" },
              { type: "string",  name: "body_html", label: "Quote (HTML)", ui: { component: "textarea" } },
              { type: "string",  name: "signature", label: "Signature" },
            ],
          },

          // ---------- BRANDS ----------
          {
            type: "object",
            name: "brands",
            label: "Brand architecture",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "title_html", label: "Title (HTML)", ui: { component: "textarea" } },
              { type: "string", name: "body", label: "Body", ui: { component: "textarea" } },
              {
                type: "object", name: "cards", label: "Brand cards", list: true,
                ui: { itemProps: (i: any) => ({ label: i?.sub }) },
                fields: [
                  { type: "string", name: "key",  label: "Brand key",
                    options: ["group","live","academy","services"] },
                  { type: "string", name: "sub",  label: "Sub-wordmark" },
                  { type: "string", name: "role", label: "Role line" },
                  { type: "string", name: "desc", label: "Description", ui: { component: "textarea" } },
                  { type: "string", name: "link", label: "Link label" },
                ],
              },
            ],
          },

          // ---------- CTA ----------
          {
            type: "object",
            name: "cta",
            label: "CTA band",
            fields: [
              {
                type: "object", name: "columns", label: "Columns", list: true,
                ui: { itemProps: (i: any) => ({ label: i?.button_label }) },
                fields: [
                  { type: "string", name: "icon",          label: "Icon" },
                  { type: "string", name: "title_html",    label: "Title (HTML)", ui: { component: "textarea" } },
                  { type: "string", name: "body_html",     label: "Body (HTML)",  ui: { component: "textarea" } },
                  { type: "string", name: "button_label",  label: "Button label" },
                  { type: "string", name: "button_variant",label: "Button variant",
                    options: ["primary","accent","ghost","ghost-light"] },
                ],
              },
              { type: "string", name: "signature", label: "Signature line" },
            ],
          },

          // ---------- FOOTER ----------
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              { type: "string", name: "copyright", label: "Copyright" },
              {
                type: "object", name: "links", label: "Links", list: true,
                ui: { itemProps: (i: any) => ({ label: i?.label }) },
                fields: [
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "href",  label: "Href" },
                ],
              },
              { type: "string", name: "signature", label: "Signature line" },
            ],
          },

          // ---------- PLATFORM MOCK (hero visual) ----------
          {
            type: "object",
            name: "platform_mock",
            label: "Hero platform mock",
            fields: [
              { type: "string", name: "url", label: "Window URL" },
              { type: "string", name: "rail_layers_label", label: "Rail: layers heading" },
              {
                type: "object", name: "rail_layers", label: "Rail layers", list: true,
                ui: { itemProps: (i: any) => ({ label: i?.name }) },
                fields: [
                  { type: "string", name: "id",   label: "Id" },
                  { type: "string", name: "name", label: "Name" },
                  { type: "string", name: "swatch", label: "Swatch", options: ["ink","tan","live","green"] },
                  { type: "boolean", name: "active", label: "Active by default" },
                ],
              },
              { type: "string", name: "rail_parties_label", label: "Rail: parties heading" },
              { type: "string", name: "rail_parties", label: "Rail parties", list: true },
              {
                type: "object", name: "pins", label: "Viewport pins", list: true,
                ui: { itemProps: (i: any) => ({ label: i?.label }) },
                fields: [
                  { type: "string", name: "class", label: "Pin class", options: ["","is-warn","is-ok"] },
                  { type: "string", name: "style", label: "Inline style" },
                  { type: "string", name: "label", label: "Pin label" },
                ],
              },
              { type: "string", name: "inspector_eyebrow", label: "Inspector eyebrow" },
              { type: "string", name: "advice_eyebrow",    label: "Advice eyebrow" },
              { type: "string", name: "advice_body",       label: "Advice body", ui: { component: "textarea" } },
            ],
          },
        ],
      },
    ],
  },
});
