import gql from 'graphql-tag';
import { IExecutor } from '~/root/lib/server/helpers/execute-query-with-context';
import { NN } from '~/root/lib/types/common';
import {
  ConsoleGetMSvPluginQuery,
  ConsoleGetMSvPluginQueryVariables,
  ConsoleGetMSvTemplateQuery,
  ConsoleGetMSvTemplateQueryVariables,
  ConsoleListMSvPluginsQuery,
  ConsoleListMSvPluginsQueryVariables,
  ConsoleListMSvTemplatesQuery,
  ConsoleListMSvTemplatesQueryVariables,
} from '~/root/src/generated/gql/server';

export type IMSvTemplate = NN<
  ConsoleGetMSvTemplateQuery['infra_getManagedServiceTemplate']
>;
export type IMSvTemplates = NN<
  ConsoleListMSvTemplatesQuery['infra_listManagedServiceTemplates']
>;

export type IMSvPlugin = NN<
  ConsoleGetMSvPluginQuery['core_getManagedServicePlugin']
>;

export type IMsvPlugins = NN<
  ConsoleListMSvPluginsQuery['core_listManagedServicePlugins']
>;

export const managedTemplateQueries = (executor: IExecutor) => ({
  getMSvTemplate: executor(
    gql`
      query Infra_getManagedServiceTemplate(
        $category: String!
        $name: String!
      ) {
        infra_getManagedServiceTemplate(category: $category, name: $name) {
          active
          apiVersion
          description
          displayName
          fields {
            defaultValue
            inputType
            label
            max
            min
            name
            required
            unit
            displayUnit
            multiplier
          }
          kind
          logoUrl
          name
          outputs {
            description
            label
            name
          }
          resources {
            apiVersion
            description
            displayName
            kind
            name
            fields {
              defaultValue
              displayUnit
              inputType
              label
              max
              min
              multiplier
              name
              required
              unit
            }
          }
        }
      }
    `,
    {
      transformer(data: ConsoleGetMSvTemplateQuery) {
        return data.infra_getManagedServiceTemplate;
      },
      vars(_: ConsoleGetMSvTemplateQueryVariables) {},
    }
  ),
  listMSvTemplates: executor(
    gql`
      query Infra_listManagedServiceTemplates {
        infra_listManagedServiceTemplates {
          category
          displayName
          items {
            active
            apiVersion
            description
            displayName
            fields {
              defaultValue
              inputType
              label
              max
              min
              name
              required
              unit
              displayUnit
              multiplier
            }
            kind
            logoUrl
            name
            outputs {
              description
              label
              name
            }
            resources {
              apiVersion
              description
              displayName
              kind
              name
              fields {
                defaultValue
                displayUnit
                inputType
                label
                max
                min
                multiplier
                name
                required
                unit
              }
            }
          }
        }
      }
    `,
    {
      transformer: (data: ConsoleListMSvTemplatesQuery) =>
        data.infra_listManagedServiceTemplates,
      vars(_: ConsoleListMSvTemplatesQueryVariables) {},
    }
  ),
  getMSvPlugin: executor(
    gql`
      query Core_getManagedServicePlugin($category: String!, $name: String!) {
        core_getManagedServicePlugin(category: $category, name: $name) {
          meta {
            logo
          }
          plugin
          spec {
            apiVersion
            services {
              active
              description
              inputs {
                defaultValue
                displayUnit
                input
                label
                max
                min
                multiplier
                required
                type
                unit
              }
              kind
              resources {
                description
                kind
              }
            }
          }
        }
      }
    `,
    {
      transformer(data: ConsoleGetMSvPluginQuery) {
        return data.core_getManagedServicePlugin;
      },
      vars(_: ConsoleGetMSvPluginQueryVariables) {},
    }
  ),
  listMSvPlugins: executor(
    gql`
      query Core_listManagedServicePlugins {
        core_listManagedServicePlugins {
          category
          items {
            meta {
              logo
            }
            plugin
            spec {
              apiVersion
              services {
                active
                description
                inputs {
                  defaultValue
                  displayUnit
                  input
                  label
                  max
                  min
                  multiplier
                  required
                  type
                  unit
                }
                kind
                resources {
                  description
                  kind
                }
              }
            }
          }
        }
      }
    `,
    {
      transformer: (data: ConsoleListMSvPluginsQuery) =>
        data.core_listManagedServicePlugins,
      vars(_: ConsoleListMSvPluginsQueryVariables) {},
    }
  ),
});

// export type InputField = {
//   defaultValue: any; // Can be refined further based on actual data type
//   displayUnit: string | null;
//   input: string;
//   label: string;
//   max: number | null;
//   min: number | null;
//   multiplier: number | null;
//   required: boolean;
//   type: string;
//   unit: string | null;
// };

// export type Resource = {
//   description: string;
//   kind: string;
// };

// export type Service = {
//   active: boolean;
//   description: string;
//   inputs: InputField[];
//   kind: string;
//   resources: Resource[];
// };

// export type Spec = {
//   apiVersion: string;
//   services: Service[];
// };

// export type PluginItem = {
//   meta: {
//     logo: string;
//   };
//   plugin: string;
//   spec: Spec;
// };

// export type IMsvPlugin = {
//   // category: string;
//   items: PluginItem;
// };
