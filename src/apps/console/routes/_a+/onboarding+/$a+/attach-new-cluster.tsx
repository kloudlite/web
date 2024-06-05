import { useNavigate, useParams } from '@remix-run/react';
import { toast } from '~/components/molecule/toast';
import useForm from '~/root/lib/client/hooks/use-form';
import Yup from '~/root/lib/server/helpers/yup';
import { handleError } from '~/root/lib/utils/common';
import { useConsoleApi } from '~/console/server/gql/api-provider';
import { NameIdView } from '~/console/components/name-id-view';
import MultiStepProgressWrapper from '~/console/components/multi-step-progress-wrapper';
import MultiStepProgress, {
  useMultiStepProgress,
} from '~/console/components/multi-step-progress';
import { BottomNavigation } from '~/console/components/commons';
import FillerCloudProvider from '~/console/assets/filler-cloud-provider';

const AttachNewCluster = () => {
  const { a: accountName } = useParams();
  const api = useConsoleApi();

  const navigate = useNavigate();
  const { values, errors, handleSubmit, handleChange, isLoading } = useForm({
    initialValues: {
      name: '',
      displayName: '',
      isNameError: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('id is required'),
      displayName: Yup.string().required('name is required'),
    }),
    onSubmit: async (val) => {
      try {
        const { errors: e } = await api.createBYOKCluster({
          cluster: {
            displayName: val.displayName,
            metadata: {
              name: val.name,
            },
          },
        });
        if (e) {
          throw e[0];
        }
        toast.success('Cluster attched successfully');
        navigate(
          `/onboarding/${accountName}/${values.name}/validate-attached-cluster`
        );
        // navigate(rootUrl);
      } catch (err) {
        handleError(err);
      }
    },
  });

  const { currentStep, jumpStep } = useMultiStepProgress({
    defaultStep: 2,
    totalSteps: 3,
  });

  return (
    <form onSubmit={handleSubmit}>
      <MultiStepProgressWrapper
        fillerImage={<FillerCloudProvider />}
        title="Setup your account!"
        subTitle="Simplify Collaboration and Enhance Productivity with Kloudlite
  teams"
      >
        <MultiStepProgress.Root
          currentStep={currentStep}
          editable={false}
          noJump={() => true}
          jumpStep={jumpStep}
        >
          <MultiStepProgress.Step
            step={1}
            label="Create team"
            className="py-3xl flex flex-col gap-3xl
            "
          />
          <MultiStepProgress.Step step={2} label="Attach Kubernetes Cluster">
            <div className="flex flex-col gap-3xl">
              <div className="flex flex-col">
                <NameIdView
                  resType="cluster"
                  displayName={values.displayName}
                  name={values.name}
                  label="Cluster name"
                  placeholder="Enter cluster name"
                  errors={errors.name}
                  handleChange={handleChange}
                  nameErrorLabel="isNameError"
                />
              </div>
              <BottomNavigation
                secondaryButton={{
                  variant: 'outline',
                  content: 'Skip',
                  prefix: undefined,
                  onClick: () => {
                    navigate(`/${accountName}/environments`);
                  },
                }}
                primaryButton={{
                  variant: 'primary',
                  content: 'Next',
                  loading: isLoading,
                  type: 'submit',
                }}
              />
            </div>
          </MultiStepProgress.Step>
          <MultiStepProgress.Step
            step={3}
            label="Verify Your Attached Kubernetes Cluster"
          />
          {/* <MultiStepProgress.Step step={3} label="Verify Cluster" /> */}
          {/* <MultiStepProgress.Step step={3} label="Validate cloud provider" /> */}
          {/* <MultiStepProgress.Step step={4} label="Setup first cluster" /> */}
        </MultiStepProgress.Root>
      </MultiStepProgressWrapper>
    </form>
  );
};

export default AttachNewCluster;
