import axios from 'axios';
import yaml from 'js-yaml';
import { useEffect, useState } from 'react';

type IHelmDoc = {
  apiVersion: string;
  entries: {
    [key: string]: { version: string }[];
  };
  generated: string;
};

type IHelmChart = Array<{
  label: string;
  value: string;
  item: IHelmDoc['entries']['key'];
}>;

const useFetchHelmCharts = (
  { repoUrl }: { repoUrl?: string },
  onFetch?: (data: IHelmChart) => void,
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [helmCharts, setHelmCharts] = useState<IHelmChart>([]);

  const fetchHelmCharts = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await axios.get(`/helmchart-api?url=${repoUrl}`);
      const repos = yaml.load(res.data, { json: true }) as IHelmDoc;
      const d = Object.entries(repos.entries).map(([key, value]) => ({
        label: key,
        value: key,
        item: value,
      }));
      setHelmCharts(d);
      onFetch?.(d);
    } catch (error) {
      setError(true);
      setHelmCharts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('repoUrl', repoUrl);
    if (repoUrl) {
      fetchHelmCharts();
    }
  }, [repoUrl]);

  return { loading, error, helmCharts };
};

export default useFetchHelmCharts;
