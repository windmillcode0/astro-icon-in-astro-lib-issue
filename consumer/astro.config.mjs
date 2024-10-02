import { defineConfig } from 'astro/config';
import starlightViewModes from 'starlight-view-modes';
import issueLib from 'issue-lib';
import starlight from '@astrojs/starlight';
import icon from "astro-icon";

import fs from "fs";
import path from "path";


const LOCAL_COMPONENT_DIR = "src/components";

function overrideIntegration() {
  return {
    name: "overrides",
    hooks: {
      "astro:config:setup"({ updateConfig, config }) {
        const components = fs.readdirSync("./" + LOCAL_COMPONENT_DIR).filter(x => x.endsWith(".astro"));

        updateConfig({
          vite: {
            plugins: [{
              enforce: "pre",
              name: "override",
              async resolveId(source, importer) {
                for (const component of components) {
                  if (source.endsWith(component) && !source.includes(LOCAL_COMPONENT_DIR) && !source.includes("node_modules")) {
                    if (importer.includes(LOCAL_COMPONENT_DIR)) {
                      return path.resolve("./node_modules/@astrojs/starlight/components/" + component);
                    } else {
                      return path.resolve("./" + LOCAL_COMPONENT_DIR + "/" + component);
                    }
                  }
                }
              }
            }]
          }
        })
      }
    }
  }
}


// https://astro.build/config
export default defineConfig({
  outDir: 'docs',
  integrations: [
    overrideIntegration(),
    icon({
      include:{
        mdi:["chevron-left","chevron-right","chevron-down"]
      }
    }),
    starlight({
      title: 'Starlight',
      favicon: '/favicon.svg',
      sidebar:[
        {
          label: 'Abc',
          items: [
            { label: "Index", link: "/index" },
            { label: "Donate", link: "/donate" },
          ]
        }
      ],
      plugins: [
        issueLib(),
        // starlightViewModes({
        //   presentationModeEnabled:false,
        //   presentationModeShowSwitchInHeader:false,
        //   // leftSidebarEnabled:true,
        //   // rightSidebarEnabled:true
        // })
      ]
    })
  ]
});
