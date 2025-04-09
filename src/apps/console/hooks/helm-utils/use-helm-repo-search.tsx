import { CircleWavyCheckFill } from '@jengaicons/react';
import { cn } from '@kloudlite/design-system/utils';
import axios from 'axios';
import { ReactNode, useEffect, useState } from 'react';
import Pulsable from '~/root/lib/client/components/pulsable';
import useDebounce from '~/root/lib/client/hooks/use-debounce';

const LOGO_URL = 'https://artifacthub.io/image/';

const useHelmRepoSearch = ({ searchText }: { searchText: string }) => {
  const [isRepoCreatable, setIsRepoCreatable] = useState(false);
  const [repos, setRepos] = useState<
    {
      label: string;
      value: string;
      repoUrl: string;
      render: () => ReactNode;
    }[]
  >([]);

  const [loading, setLoading] = useState(false);

  const searchRepos = async (text: string) => {
    if (text) {
      try {
        const r = await axios({
          method: 'get',
          url: '/artifacthub-api',
          params: {
            offset: 0,
            limit: 10,
            kind: 0,
            ts_query_web: text,
          },
        });

        setRepos(
          r.data.packages.map(
            (hc: {
              name: string;
              package_id: string;
              logo_image_id: string;
              repository: {
                url: string;
                name: string;
                verified_publisher: boolean;
                organization_display_name?: string;
                user_alias?: string;
              };
            }) => ({
              label: hc.name,
              value: hc.package_id,
              repoUrl: hc.repository.url,
              render: () => (
                <div className="flex flex-row gap-xl items-center">
                  <Pulsable isLoading={!hc.logo_image_id}>
                    <span className=" pulsable pulsable-img">
                      <img
                        className={cn({
                          'w-4xl aspect-square object-contain': true,
                        })}
                        src={`${LOGO_URL}${hc.logo_image_id}`}
                        alt={hc.name}
                      />
                    </span>
                  </Pulsable>
                  <div className="flex flex-col flex-1">
                    <div className="flex flex-row gap-lg items-center">
                      <div className="flex-1">{hc.name}</div>
                      <div className="text-icon-primary mt-sm">
                        {hc.repository.verified_publisher && (
                          <CircleWavyCheckFill size={12} />
                        )}
                      </div>
                    </div>
                    <div className="bodySm text-text-disabled flex flex-row gap-md lowercase">
                      <span>
                        {hc.repository.organization_display_name ? (
                          <span>
                            ORG:{' '}
                            <span className="bodySm-semibold">
                              {hc.repository.organization_display_name}
                            </span>
                          </span>
                        ) : (
                          <span>
                            USER:{' '}
                            <span className="bodySm-semibold">
                              {hc.repository.user_alias}
                            </span>
                          </span>
                        )}
                      </span>{' '}
                      |{' '}
                      <span>
                        REPO:{' '}
                        <span className="bodySm-semibold">
                          {hc.repository.name}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ),
            }),
          ),
        );
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useDebounce(
    async () => {
      if (!searchText.startsWith('https://')) {
        searchRepos(searchText);
        setIsRepoCreatable(false);
      } else {
        setIsRepoCreatable(true);
      }
    },
    200,
    [searchText],
  );

  useEffect(() => {
    if (!searchText.startsWith('https://')) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [searchText]);

  return { repos, isRepoCreatable, loading };
};

export default useHelmRepoSearch;
