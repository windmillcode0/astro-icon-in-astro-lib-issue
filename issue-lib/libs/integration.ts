import type { AstroIntegration } from 'astro';

import { vitePluginIssueLibConfig } from './vite';

export function issueLibIntegration(
  config: any
): AstroIntegration {
  return {
    name: 'issue-lib-integration',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          vite: {
            plugins: [vitePluginIssueLibConfig(config)],
          },
        });
      },
    },
  };
}
