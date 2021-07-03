
/**
 * @roxi/routify 2.18.0
 * File generated Sat Jul 03 2021 15:40:10 GMT+0800 (Singapore Standard Time)
 */

export const __version = "2.18.0"
export const __timestamp = "2021-07-03T07:40:10.783Z"

//buildRoutes
import { buildClientTree } from "@roxi/routify/runtime/buildRoutes"

//imports


//options
export const options = {}

//tree
export const _tree = {
  "name": "_layout",
  "filepath": "/_layout.svelte",
  "root": true,
  "ownMeta": {},
  "absolutePath": "/home/nirudhi/projects/svelte/svelte_dashboard/src/pages/_layout.svelte",
  "children": [
    {
      "isFile": true,
      "isDir": false,
      "file": "_fallback.svelte",
      "filepath": "/_fallback.svelte",
      "name": "_fallback",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "/home/nirudhi/projects/svelte/svelte_dashboard/src/pages/_fallback.svelte",
      "importPath": "../src/pages/_fallback.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": true,
      "isPage": false,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/_fallback",
      "id": "__fallback",
      "component": () => import('../src/pages/_fallback.svelte').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "index.svelte",
      "filepath": "/index.svelte",
      "name": "index",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "/home/nirudhi/projects/svelte/svelte_dashboard/src/pages/index.svelte",
      "importPath": "../src/pages/index.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": true,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/index",
      "id": "_index",
      "component": () => import('../src/pages/index.svelte').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": true,
      "file": "_layout.svelte",
      "filepath": "/landing/_layout.svelte",
      "name": "_layout",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "/home/nirudhi/projects/svelte/svelte_dashboard/src/pages/landing/_layout.svelte",
      "children": [
        {
          "isFile": true,
          "isDir": true,
          "file": "_layout.svelte",
          "filepath": "/landing/[slug]/_layout.svelte",
          "name": "_layout",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "/home/nirudhi/projects/svelte/svelte_dashboard/src/pages/landing/[slug]/_layout.svelte",
          "children": [
            {
              "isFile": true,
              "isDir": false,
              "file": "branchsettings.svelte",
              "filepath": "/landing/[slug]/branchsettings.svelte",
              "name": "branchsettings",
              "ext": "svelte",
              "badExt": false,
              "absolutePath": "/home/nirudhi/projects/svelte/svelte_dashboard/src/pages/landing/[slug]/branchsettings.svelte",
              "importPath": "../src/pages/landing/[slug]/branchsettings.svelte",
              "isLayout": false,
              "isReset": false,
              "isIndex": false,
              "isFallback": false,
              "isPage": true,
              "ownMeta": {},
              "meta": {
                "$$bundleId": "_landing__slug___layout_svelte.js",
                "recursive": true,
                "preload": false,
                "prerender": true
              },
              "path": "/landing/:slug/branchsettings",
              "id": "_landing__slug_branchsettings",
              "component": () => import('./_landing__slug___layout_svelte.js').then(m => m._landing__slug_branchsettings)
            },
            {
              "isFile": true,
              "isDir": false,
              "file": "companysettings.svelte",
              "filepath": "/landing/[slug]/companysettings.svelte",
              "name": "companysettings",
              "ext": "svelte",
              "badExt": false,
              "absolutePath": "/home/nirudhi/projects/svelte/svelte_dashboard/src/pages/landing/[slug]/companysettings.svelte",
              "importPath": "../src/pages/landing/[slug]/companysettings.svelte",
              "isLayout": false,
              "isReset": false,
              "isIndex": false,
              "isFallback": false,
              "isPage": true,
              "ownMeta": {},
              "meta": {
                "$$bundleId": "_landing__slug___layout_svelte.js",
                "recursive": true,
                "preload": false,
                "prerender": true
              },
              "path": "/landing/:slug/companysettings",
              "id": "_landing__slug_companysettings",
              "component": () => import('./_landing__slug___layout_svelte.js').then(m => m._landing__slug_companysettings)
            },
            {
              "isFile": true,
              "isDir": false,
              "file": "index.svelte",
              "filepath": "/landing/[slug]/index.svelte",
              "name": "index",
              "ext": "svelte",
              "badExt": false,
              "absolutePath": "/home/nirudhi/projects/svelte/svelte_dashboard/src/pages/landing/[slug]/index.svelte",
              "importPath": "../src/pages/landing/[slug]/index.svelte",
              "isLayout": false,
              "isReset": false,
              "isIndex": true,
              "isFallback": false,
              "isPage": true,
              "ownMeta": {},
              "meta": {
                "$$bundleId": "_landing__slug___layout_svelte.js",
                "recursive": true,
                "preload": false,
                "prerender": true
              },
              "path": "/landing/:slug/index",
              "id": "_landing__slug_index",
              "component": () => import('./_landing__slug___layout_svelte.js').then(m => m._landing__slug_index)
            },
            {
              "isFile": true,
              "isDir": false,
              "file": "roles.svelte",
              "filepath": "/landing/[slug]/roles.svelte",
              "name": "roles",
              "ext": "svelte",
              "badExt": false,
              "absolutePath": "/home/nirudhi/projects/svelte/svelte_dashboard/src/pages/landing/[slug]/roles.svelte",
              "importPath": "../src/pages/landing/[slug]/roles.svelte",
              "isLayout": false,
              "isReset": false,
              "isIndex": false,
              "isFallback": false,
              "isPage": true,
              "ownMeta": {},
              "meta": {
                "$$bundleId": "_landing__slug___layout_svelte.js",
                "recursive": true,
                "preload": false,
                "prerender": true
              },
              "path": "/landing/:slug/roles",
              "id": "_landing__slug_roles",
              "component": () => import('./_landing__slug___layout_svelte.js').then(m => m._landing__slug_roles)
            },
            {
              "isFile": true,
              "isDir": true,
              "file": "_layout.svelte",
              "filepath": "/landing/[slug]/settings/_layout.svelte",
              "name": "_layout",
              "ext": "svelte",
              "badExt": false,
              "absolutePath": "/home/nirudhi/projects/svelte/svelte_dashboard/src/pages/landing/[slug]/settings/_layout.svelte",
              "children": [
                {
                  "isFile": true,
                  "isDir": false,
                  "file": "test.svelte",
                  "filepath": "/landing/[slug]/settings/test.svelte",
                  "name": "test",
                  "ext": "svelte",
                  "badExt": false,
                  "absolutePath": "/home/nirudhi/projects/svelte/svelte_dashboard/src/pages/landing/[slug]/settings/test.svelte",
                  "importPath": "../src/pages/landing/[slug]/settings/test.svelte",
                  "isLayout": false,
                  "isReset": false,
                  "isIndex": false,
                  "isFallback": false,
                  "isPage": true,
                  "ownMeta": {},
                  "meta": {
                    "$$bundleId": "_landing__slug___layout_svelte.js",
                    "recursive": true,
                    "preload": false,
                    "prerender": true
                  },
                  "path": "/landing/:slug/settings/test",
                  "id": "_landing__slug_settings_test",
                  "component": () => import('./_landing__slug___layout_svelte.js').then(m => m._landing__slug_settings_test)
                },
                {
                  "isFile": true,
                  "isDir": false,
                  "file": "userroles.svelte",
                  "filepath": "/landing/[slug]/settings/userroles.svelte",
                  "name": "userroles",
                  "ext": "svelte",
                  "badExt": false,
                  "absolutePath": "/home/nirudhi/projects/svelte/svelte_dashboard/src/pages/landing/[slug]/settings/userroles.svelte",
                  "importPath": "../src/pages/landing/[slug]/settings/userroles.svelte",
                  "isLayout": false,
                  "isReset": false,
                  "isIndex": false,
                  "isFallback": false,
                  "isPage": true,
                  "ownMeta": {},
                  "meta": {
                    "$$bundleId": "_landing__slug___layout_svelte.js",
                    "recursive": true,
                    "preload": false,
                    "prerender": true
                  },
                  "path": "/landing/:slug/settings/userroles",
                  "id": "_landing__slug_settings_userroles",
                  "component": () => import('./_landing__slug___layout_svelte.js').then(m => m._landing__slug_settings_userroles)
                },
                {
                  "isFile": true,
                  "isDir": false,
                  "file": "usersettings.svelte",
                  "filepath": "/landing/[slug]/settings/usersettings.svelte",
                  "name": "usersettings",
                  "ext": "svelte",
                  "badExt": false,
                  "absolutePath": "/home/nirudhi/projects/svelte/svelte_dashboard/src/pages/landing/[slug]/settings/usersettings.svelte",
                  "importPath": "../src/pages/landing/[slug]/settings/usersettings.svelte",
                  "isLayout": false,
                  "isReset": false,
                  "isIndex": false,
                  "isFallback": false,
                  "isPage": true,
                  "ownMeta": {},
                  "meta": {
                    "$$bundleId": "_landing__slug___layout_svelte.js",
                    "recursive": true,
                    "preload": false,
                    "prerender": true
                  },
                  "path": "/landing/:slug/settings/usersettings",
                  "id": "_landing__slug_settings_usersettings",
                  "component": () => import('./_landing__slug___layout_svelte.js').then(m => m._landing__slug_settings_usersettings)
                }
              ],
              "isLayout": true,
              "isReset": false,
              "isIndex": false,
              "isFallback": false,
              "isPage": false,
              "importPath": "../src/pages/landing/[slug]/settings/_layout.svelte",
              "ownMeta": {},
              "meta": {
                "$$bundleId": "_landing__slug___layout_svelte.js",
                "recursive": true,
                "preload": false,
                "prerender": true
              },
              "path": "/landing/:slug/settings",
              "id": "_landing__slug_settings__layout",
              "component": () => import('./_landing__slug___layout_svelte.js').then(m => m._landing__slug_settings__layout)
            },
            {
              "isFile": true,
              "isDir": false,
              "file": "users.svelte",
              "filepath": "/landing/[slug]/users.svelte",
              "name": "users",
              "ext": "svelte",
              "badExt": false,
              "absolutePath": "/home/nirudhi/projects/svelte/svelte_dashboard/src/pages/landing/[slug]/users.svelte",
              "importPath": "../src/pages/landing/[slug]/users.svelte",
              "isLayout": false,
              "isReset": false,
              "isIndex": false,
              "isFallback": false,
              "isPage": true,
              "ownMeta": {},
              "meta": {
                "$$bundleId": "_landing__slug___layout_svelte.js",
                "recursive": true,
                "preload": false,
                "prerender": true
              },
              "path": "/landing/:slug/users",
              "id": "_landing__slug_users",
              "component": () => import('./_landing__slug___layout_svelte.js').then(m => m._landing__slug_users)
            }
          ],
          "isLayout": true,
          "isReset": false,
          "isIndex": false,
          "isFallback": false,
          "isPage": false,
          "importPath": "../src/pages/landing/[slug]/_layout.svelte",
          "ownMeta": {
            "bundle": true
          },
          "meta": {
            "bundle": true,
            "$$bundleId": "_landing__slug___layout_svelte.js",
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/landing/:slug",
          "id": "_landing__slug__layout",
          "component": () => import('./_landing__slug___layout_svelte.js').then(m => m._landing__slug__layout)
        },
        {
          "isFile": true,
          "isDir": false,
          "file": "index.svelte",
          "filepath": "/landing/index.svelte",
          "name": "index",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "/home/nirudhi/projects/svelte/svelte_dashboard/src/pages/landing/index.svelte",
          "importPath": "../src/pages/landing/index.svelte",
          "isLayout": false,
          "isReset": false,
          "isIndex": true,
          "isFallback": false,
          "isPage": true,
          "ownMeta": {},
          "meta": {
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/landing/index",
          "id": "_landing_index",
          "component": () => import('../src/pages/landing/index.svelte').then(m => m.default)
        },
        {
          "isFile": true,
          "isDir": false,
          "file": "pricing.svelte",
          "filepath": "/landing/pricing.svelte",
          "name": "pricing",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "/home/nirudhi/projects/svelte/svelte_dashboard/src/pages/landing/pricing.svelte",
          "importPath": "../src/pages/landing/pricing.svelte",
          "isLayout": false,
          "isReset": false,
          "isIndex": false,
          "isFallback": false,
          "isPage": true,
          "ownMeta": {},
          "meta": {
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/landing/pricing",
          "id": "_landing_pricing",
          "component": () => import('../src/pages/landing/pricing.svelte').then(m => m.default)
        },
        {
          "isFile": true,
          "isDir": false,
          "file": "subdomain.svelte",
          "filepath": "/landing/subdomain.svelte",
          "name": "subdomain",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "/home/nirudhi/projects/svelte/svelte_dashboard/src/pages/landing/subdomain.svelte",
          "importPath": "../src/pages/landing/subdomain.svelte",
          "isLayout": false,
          "isReset": false,
          "isIndex": false,
          "isFallback": false,
          "isPage": true,
          "ownMeta": {},
          "meta": {
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/landing/subdomain",
          "id": "_landing_subdomain",
          "component": () => import('../src/pages/landing/subdomain.svelte').then(m => m.default)
        }
      ],
      "isLayout": true,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": false,
      "importPath": "../src/pages/landing/_layout.svelte",
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/landing",
      "id": "_landing__layout",
      "component": () => import('../src/pages/landing/_layout.svelte').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "login.svelte",
      "filepath": "/login.svelte",
      "name": "login",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "/home/nirudhi/projects/svelte/svelte_dashboard/src/pages/login.svelte",
      "importPath": "../src/pages/login.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/login",
      "id": "_login",
      "component": () => import('../src/pages/login.svelte').then(m => m.default)
    }
  ],
  "isLayout": true,
  "isReset": false,
  "isIndex": false,
  "isFallback": false,
  "isPage": false,
  "isFile": true,
  "file": "_layout.svelte",
  "ext": "svelte",
  "badExt": false,
  "importPath": "../src/pages/_layout.svelte",
  "meta": {
    "recursive": true,
    "preload": false,
    "prerender": true
  },
  "path": "/",
  "id": "__layout",
  "component": () => import('../src/pages/_layout.svelte').then(m => m.default)
}


export const {tree, routes} = buildClientTree(_tree)

