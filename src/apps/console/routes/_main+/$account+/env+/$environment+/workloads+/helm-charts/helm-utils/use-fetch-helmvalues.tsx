import { toast } from '@kloudlite/design-system/molecule/toast';
import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetchHelmValue = ({
  packageId,
  version,
}: {
  packageId?: string;
  version?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [values, setValues] = useState('');

  const fetchValues = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const r = await axios({
        method: 'get',
        url: `/artifacthub-values-api`,
        params: {
          packageId,
          version,
        },
      });
      setValues(r.data);
    } catch (err) {
      toast.error('Error fetching chart values');
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (packageId && version) {
      fetchValues();
    }
  }, [packageId, version]);

  return { isLoading, error, values };
};

export default useFetchHelmValue;
