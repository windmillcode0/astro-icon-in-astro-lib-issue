import { defineConfig } from 'astro/config';
import starlightViewModes from 'starlight-view-modes';
import issueLib from 'issue-lib';
import starlight from '@astrojs/starlight';
import icon from "astro-icon";




// https://astro.build/config
export default defineConfig({
  outDir: 'docs',
  integrations: [
    // check the library index.ts I am using it as part of a library
    // icon({
    //   include:{
    //     mdi:["chevron-left","chevron-right","chevron-down"]
    //   }
    // }),
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
