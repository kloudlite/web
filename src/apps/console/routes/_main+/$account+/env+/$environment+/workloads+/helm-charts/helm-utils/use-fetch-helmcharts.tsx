import axios from 'axios';
import { useEffect, useState } from 'react';
import yaml from 'js-yaml';

type IHelmDoc = {
  apiVersion: string;
  entries: {
    [key: string]: { version: string }[];
  };
  generated: string;
};

const useFetchHelmCharts = ({ repoUrl }: { repoUrl?: string }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [helmCharts, setHelmCharts] = useState<
    Array<{ label: string; value: string; item: IHelmDoc['entries']['key'] }>
  >([]);

  const fetchHelmCharts = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await axios.get(`/helmchart-api?url=${repoUrl}`);
      const repos = yaml.load(res.data, { json: true }) as IHelmDoc;
      setHelmCharts(
        Object.entries(repos.entries).map(([key, value]) => ({
          label: key,
          value: key,
          item: value,
        })),
      );
    } catch (error) {
      setError(true);
      setHelmCharts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (repoUrl) {
      fetchHelmCharts();
      console.log('fetch repos', repoUrl);
    }
  }, [repoUrl]);

  return { loading, error, helmCharts };
};

export default useFetchHelmCharts;
