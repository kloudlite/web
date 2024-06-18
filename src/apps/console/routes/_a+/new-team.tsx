import { useNavigate } from '@remix-run/react';
import { toast } from '~/components/molecule/toast';
import { useDataFromMatches } from '~/root/lib/client/hooks/use-custom-matches';
import useForm, { dummyEvent } from '~/root/lib/client/hooks/use-form';
import { UserMe } from '~/root/lib/server/gql/saved-queries';
import Yup from '~/root/lib/server/helpers/yup';
import { handleError } from '~/root/lib/utils/common';
import { useConsoleApi } from '~/console/server/gql/api-provider';
import { NameIdView } from '~/console/components/name-id-view';
import MultiStepProgressWrapper from '~/console/components/multi-step-progress-wrapper';
import MultiStepProgress, {
  useMultiStepProgress,
} from '~/console/components/multi-step-progress';
import { BottomNavigation } from '~/console/components/commons';
import FillerCreateTeam from '~/console/assets/filler-create-team';
import { SignOut } from '~/console/components/icons';
import { authBaseUrl } from '~/root/lib/configs/base-url.cjs';
import { useExternalRedirect } from '~/root/lib/client/helpers/use-redirect';
import { Button } from '~/components/atoms/button';
import useCustomSwr from '~/root/lib/client/hooks/use-custom-swr';
import Select from '~/components/atoms/select';

const NewAccount = () => {
  const api = useConsoleApi();
  const navigate = useNavigate();
  const user = useDataFromMatches<UserMe>('user', {});

  const { data: accountsData } = useCustomSwr('/list_accounts', async () => {
    return api.listAccounts({});
  });

  const regions = [
    {
      label: 'ap-south-1',
      value: 'ap-south-1',
      render: () => (
        <div className="flex flex-row gap-lg items-center">
          <div>ap-south-1</div>
        </div>
      ),
    },
    {
      label: 'eu-north-1',
      value: 'eu-north-1',
      render: () => (
        <div className="flex flex-row gap-lg items-center">
          <div>eu-north-1</div>
        </div>
      ),
    },
    {
      label: 'eu-west-3',
      value: 'eu-west-3',
      render: () => (
        <div className="flex flex-row gap-lg items-center">
          <div>eu-west-3</div>
        </div>
      ),
    },
    {
      label: 'eu-west-2',
      value: 'eu-west-2',
      render: () => (
        <div className="flex flex-row gap-lg items-center">
          <div>eu-west-2</div>
        </div>
      ),
    },
  ];

  const { values, handleChange, errors, isLoading, handleSubmit } = useForm({
    initialValues: {
      name: '',
      displayName: '',
      region: regions[0].value,
      isNameError: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      displayName: Yup.string().required(),
    }),
    onSubmit: async (v) => {
      try {
        const { errors: _errors } = await api.createAccount({
          account: {
            metadata: { name: v.name },
            displayName: v.displayName,
            contactEmail: user.email,
          },
        });
        if (_errors) {
          throw _errors[0];
        }
        toast.success('account created');
        navigate(`/onboarding/${v.name}/attach-new-cluster`);
      } catch (err) {
        handleError(err);
      }
    },
  });

  const { currentStep, jumpStep } = useMultiStepProgress({
    defaultStep: 1,
    totalSteps: 4,
  });
  const eNavigate = useExternalRedirect();

  return (
    <form onSubmit={handleSubmit}>
      <MultiStepProgressWrapper
        fillerImage={<FillerCreateTeam />}
        title="Setup your account!"
        action={
          accountsData?.length === 0 && (
            <Button
              variant="plain"
              suffix={<SignOut />}
              size="sm"
              content="Sign Out"
              onClick={() => {
                eNavigate(`${authBaseUrl}/logout`);
              }}
            />
          )
        }
        subTitle="Simplify Collaboration and Enhance Productivity with Kloudlite
  teams"
        {...(accountsData?.length === 0
          ? {}
          : {
              backButton: {
                content: 'Back to teams',
                to: `/teams`,
              },
            })}
      >
        <MultiStepProgress.Root
          currentStep={currentStep}
          editable={false}
          noJump={() => true}
          jumpStep={jumpStep}
        >
          <MultiStepProgress.Step step={1} label="Create team">
            <div className="flex flex-col gap-3xl">
              <NameIdView
                label="Name"
                resType="account"
                name={values.name}
                displayName={values.displayName}
                errors={errors.name}
                handleChange={handleChange}
                nameErrorLabel="isNameError"
              />
              {/* <Select
                error={!!errors.region}
                size="lg"
                message={errors.region}
                value={values.region}
                label="Region"
                placeholder="Select region"
                onChange={(_, value) => {
                  handleChange('region')(dummyEvent(value));
                }}
                options={async () => regions}
              /> */}
              <BottomNavigation
                primaryButton={{
                  variant: 'primary',
                  content: 'Next',
                  loading: isLoading,
                  type: 'submit',
                }}
              />
            </div>
          </MultiStepProgress.Step>
          {/* <MultiStepProgress.Step step={2} label="Add your cloud provider" /> */}
          {/* <MultiStepProgress.Step step={3} label="Validate cloud provider" />
          <MultiStepProgress.Step step={4} label="Setup first cluster" /> */}
          <MultiStepProgress.Step step={2} label="Attach Kubernetes Cluster" />
          <MultiStepProgress.Step
            step={3}
            label="Verify Your Attached Kubernetes Cluster"
          />
        </MultiStepProgress.Root>
      </MultiStepProgressWrapper>
    </form>
  );
};

export default NewAccount;
