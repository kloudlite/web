import { useAppState } from '~/console/page-components/app-states';
import useForm, { dummyEvent } from '~/root/lib/client/hooks/use-form';
import Yup from '~/root/lib/server/helpers/yup';
import { parseName } from '~/console/server/r-utils/common';
import { FadeIn } from '~/console/page-components/util';
import { NameIdView } from '~/console/components/name-id-view';
import { BottomNavigation, GitDetail } from '~/console/components/commons';
import { registryHost } from '~/lib/configs/base-url.cjs';
import { useOutletContext, useParams } from '@remix-run/react';
import RepoSelector from '~/console/page-components/app/components';
import AppBuildIntegration from '~/console/page-components/app/app-build-integration';
import { keyconstants } from '~/console/server/r-utils/key-constants';
import { IEnvironmentContext } from '~/console/routes/_main+/$account+/$project+/env+/$environment+/_layout';
import { TextInput } from '~/components/atoms/input';
import { useEffect, useState } from 'react';
import { useUnsavedChanges } from '~/root/lib/client/hooks/use-unsaved-changes';
import { IGIT_PROVIDERS } from '~/console/hooks/use-git';
import ExtendedFilledTab from '~/console/components/extended-filled-tab';

const AppGeneral = ({ mode = 'new' }: { mode: 'edit' | 'new' }) => {
  const {
    app,
    rootApp,
    setApp,
    setPage,
    setBuildData,
    buildData,
    resetBuildData,
    markPageAsCompleted,
    activeContIndex,
  } = useAppState();

  const { account } = useParams();
  const { project } = useOutletContext<IEnvironmentContext>();
  const { performAction } = useUnsavedChanges();

  // only for edit mode
  const [isEdited, setIsEdited] = useState(!app.ciBuildId);

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    isLoading,
    setValues,
    submit,
    resetValues,
  } = useForm({
    initialValues: {
      name: parseName(app),
      displayName: app.displayName,
      isNameError: false,
      imageMode:
        rootApp?.metadata?.annotations[keyconstants.appImageMode] || 'default',
      imageUrl: app.spec.containers[activeContIndex]?.image || '',
      manualRepo: '',
      source: {
        branch: app?.build?.source.branch,
        repository: app?.build?.source.repository,
        provider: app?.build?.source.provider,
      },
      advanceOptions: false,
      buildArgs: {},
      buildContexts: {},
      contextDir: '',
      dockerfilePath: '',
      dockerfileContent: '',
      isGitLoading: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      displayName: Yup.string().required(),
      imageUrl: Yup.string(),
      manualRepo: Yup.string().when(
        ['imageUrl', 'imageMode'],
        ([imageUrl, imageMode], schema) => {
          const regex = /^(\w+):(\w+)$/;
          if (imageMode === 'git') {
            return schema;
          }
          if (!imageUrl) {
            return schema.required().matches(regex, 'Invalid image format');
          }
          return schema;
        }
      ),
      imageMode: Yup.string().required(),
      source: Yup.object()
        .shape({})
        .test('is-empty', 'Branch is required.', (v, c) => {
          // @ts-ignoredfgdfg
          if (!v?.branch && c.parent.imageMode === 'git') {
            return false;
          }
          return true;
        }),
    }),

    onSubmit: async (val) => {
      // setBuildData(buildData);

      const formBuildData = () => {
        return {
          buildClusterName: project.clusterName || '',
          name: `app_build_${val.name}`,
          source: {
            branch: val.source.branch!,
            provider: (val.source.provider === 'github'
              ? 'github'
              : 'gitlab') as IGIT_PROVIDERS,
            repository: val.source.repository!,
          },
          spec: {
            ...{
              ...{
                ...(val.advanceOptions
                  ? {
                      buildOptions: {
                        buildArgs: val.buildArgs,
                        buildContexts: val.buildContexts,
                        contextDir: val.contextDir,
                        dockerfileContent: val.dockerfileContent,
                        dockerfilePath: val.dockerfilePath,
                        targetPlatforms: [],
                      },
                    }
                  : {
                      buildOptions: null,
                    }),
              },
            },
            registry: {
              repo: {
                name: `app_build_repo_${val.name}`,
                tags: ['latest'],
              },
            },
            resource: {
              cpu: 500,
              memoryInMb: 1000,
            },
          },
        };
      };

      setApp((a) => {
        return {
          ...a,
          metadata: {
            ...a.metadata,
            annotations: {
              ...(a.metadata?.annotations || {}),
              [keyconstants.appImageMode]: val.imageMode,
            },
            name: val.name,
          },
          displayName: val.displayName,
          spec: {
            ...a.spec,
            containers: [
              {
                ...a.spec.containers?.[0],
                image: val.imageUrl || val.manualRepo,
                name: 'container-0',
              },
            ],
          },
        };
      });

      if (val.imageMode === 'git') {
        if (!project.clusterName) {
          throw new Error('Cluster name is required');
        }
        if (
          !val.source.provider ||
          !val.source.branch ||
          !val.source.repository
        ) {
          throw new Error('Source is required');
        }
        if (isEdited) {
          // @ts-ignore
          setBuildData(formBuildData());
        } else {
          // @ts-ignore
          setBuildData(buildData);
        }
      }
      setPage(2);
      markPageAsCompleted(1);
    },
  });

  /** ---- Only for edit mode in settings ----* */
  useEffect(() => {
    if (mode === 'edit') {
      submit();
    }
    console.log(values);
  }, [values, mode]);

  useEffect(() => {
    if (performAction === 'discard-changes') {
      if (app.ciBuildId) {
        setIsEdited(false);
      }
      resetValues();
      // @ts-ignore
      setBuildData(rootApp?.build);
    } else if (performAction === 'init') {
      setIsEdited(false);
    }
  }, [performAction]);

  return (
    <FadeIn
      onSubmit={(e) => {
        if (!values.isNameError) {
          handleSubmit(e);
        } else {
          e.preventDefault();
        }
      }}
    >
      {mode === 'new' && (
        <div className="bodyMd text-text-soft">
          The application streamlines project management through intuitive task
          tracking and collaboration tools.
        </div>
      )}
      <div className="flex flex-col gap-5xl">
        {mode === 'new' ? (
          <NameIdView
            displayName={values.displayName}
            name={values.name}
            resType="app"
            errors={errors.name}
            label="Application name"
            placeholder="Enter application name"
            handleChange={handleChange}
            nameErrorLabel="isNameError"
          />
        ) : (
          <TextInput
            value={values.displayName}
            label="Name"
            size="lg"
            onChange={handleChange('displayName')}
          />
        )}
        <div className="flex flex-col gap-xl">
          <ExtendedFilledTab
            value={values.imageMode}
            onChange={(e) => {
              handleChange('imageMode')(dummyEvent(e));
              console.log(e);
              if (e === 'default') {
                // @ts-ignore
                // setBuildData(rootApp?.build);
              }
              // setIsEdited(false);

              if (!app.ciBuildId && e === 'git') {
                setIsEdited(true);
              }
            }}
            items={[
              { label: 'Container repo', value: 'default' },
              {
                label: 'Git repo',
                value: 'git',
              },
            ]}
            size="sm"
          />

          {values.imageMode === 'default' && (
            <RepoSelector
              tag={values.imageUrl.split(':')[1]}
              repo={
                values.imageUrl
                  .replace(`${registryHost}/${account}/`, '')
                  .split(':')[0]
              }
              onClear={() => {
                setValues((v) => {
                  return {
                    ...v,
                    imageUrl: '',
                    manualRepo: '',
                  };
                });
              }}
              textValue={values.manualRepo}
              onTextChanged={(e) => {
                handleChange('manualRepo')(e);
                handleChange('imageUrl')(dummyEvent(''));
              }}
              onValueChange={({ repo, tag }) => {
                handleChange('imageUrl')(
                  dummyEvent(`${registryHost}/${account}/${repo}:${tag}`)
                );
              }}
              error={errors.manualRepo}
            />
          )}
          {buildData?.name && values.imageMode === 'git' && !isEdited && (
            <GitDetail
              provider={buildData.source.provider}
              repository={buildData.source.repository}
              branch={buildData.source.branch}
              onEdit={() => {
                resetBuildData();
                setIsEdited(true);
              }}
            />
          )}
          {values.imageMode === 'git' && (isEdited || !buildData?.name) && (
            <AppBuildIntegration
              values={values}
              errors={errors}
              handleChange={handleChange}
            />
          )}

          {values.imageMode === 'git' && (isEdited || !buildData?.name) && (
            <div>
              create new build
              <div>or</div>
              use existing
            </div>
          )}
        </div>
      </div>
      {mode === 'new' && (
        <BottomNavigation
          primaryButton={{
            loading: isLoading,
            type: 'submit',
            content: 'Save & Continue',
            variant: 'primary',
          }}
        />
      )}
    </FadeIn>
  );
};

export default AppGeneral;
