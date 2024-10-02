import type {
  StarlightPlugin,
  StarlightUserConfig,
} from '@astrojs/starlight/types';


import icon from "astro-icon";

export default function issueLib(): StarlightPlugin {

  return {
    name: 'issue-lib',
    hooks: {
      setup({ addIntegration, config, logger, updateConfig }) {

        const updatedConfig: Partial<StarlightUserConfig> = {
          components: { ...config.components },

        };

        if (!updatedConfig.components) {
          updatedConfig.components = {};
        }

        updatedConfig.components.Sidebar ='issue-lib/overrides/Sidebar.astro';
        addIntegration(icon())
        updateConfig(updatedConfig);
      },
    },
  };
}

