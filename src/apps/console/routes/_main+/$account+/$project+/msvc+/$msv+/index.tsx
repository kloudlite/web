import { redirect } from '@remix-run/node';

export const loader = async () => {
  // const { project, account, msv } = useParams();
  return redirect(
    // `/${account}/${project}/managed-services/${msv}/logs-n-metrics`
    `/logs-n-metrics`
  );
};
