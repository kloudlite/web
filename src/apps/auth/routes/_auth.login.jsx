import classNames from 'classnames';
import { Button } from '~/components/atoms/button.jsx';
import {
  ArrowLeft,
  Envelope,
  EnvelopeFill,
  GithubLogoFill,
  GitlabLogoFill,
  GoogleLogo,
} from '@jengaicons/react';
import { useSearchParams, Link, useLoaderData } from '@remix-run/react';
import { PasswordInput, TextInput } from '~/components/atoms/input.jsx';
import { BrandLogo } from '~/components/branding/brand-logo.jsx';
import useForm from '~/root/lib/client/hooks/use-form';
import Yup from '~/root/lib/server/helpers/yup';
import logger from '~/root/lib/client/helpers/log';
import { assureNotLoggedIn } from '~/root/lib/server/helpers/minimal-auth';
import { toast } from '~/components/molecule/toast';
import { useReload } from '~/root/lib/client/helpers/reloader';
import { useAPIClient } from '../server/utils/api-provider';
import { GQLServerHandler } from '../server/gql/saved-queries';

const CustomGoogleIcon = (props) => {
  return <GoogleLogo {...props} weight={4} />;
};

const LoginWithEmail = () => {
  const api = useAPIClient();
  const reloadPage = useReload();
  const { values, errors, handleChange, handleSubmit, isLoading } = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      password: Yup.string().trim().required(),
    }),
    onSubmit: async (v) => {
      try {
        const { errors: _errors } = await api.login({
          email: v.email,
          password: v.password,
        });
        toast.success('logged in success fully');
        reloadPage();
      } catch (err) {
        toast.error(err.message);
        logger.error('error', err);
      }
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-stretch gap-3xl"
    >
      <TextInput
        values={values.email}
        error={errors.email}
        onChange={handleChange('email')}
        label="Email"
        placeholder="ex: john@company.com"
      />
      <PasswordInput
        values={values.password}
        error={errors.password}
        onChange={handleChange('password')}
        label="Password"
        placeholder="XXXXXX"
        extra={
          <Button
            size="medium"
            variant="primary-plain"
            content="Forgot password"
            href="/forgotpassword"
            LinkComponent={Link}
          />
        }
      />
      <Button
        loading={isLoading}
        size="large"
        variant="primary"
        content={<span className="bodyLg-medium">Continue with Email</span>}
        prefix={EnvelopeFill}
        block
        type="submit"
        className="!p-2xl"
      />
    </form>
  );
};

const Login = () => {
  const { githubLoginUrl, gitlabLoginUrl, googleLoginUrl } = useLoaderData();
  const [searchParams, _setSearchParams] = useSearchParams();

  return (
    <div
      className={classNames('flex flex-col items-center justify-center h-full')}
    >
      <div
        className={classNames(
          'flex flex-1 flex-col items-center self-stretch justify-center px-3xl py-5xl border-b border-border-default'
        )}
      >
        <div className="flex flex-col items-stretch justify-center gap-5xl md:w-[400px]">
          <BrandLogo darkBg={false} size={60} />
          <div className="flex flex-col items-stretch gap-5xl border-b pb-5xl border-border-default">
            <div className="flex flex-col gap-lg items-center md:px-7xl">
              <div
                className={classNames(
                  'text-text-strong heading3xl text-center'
                )}
              >
                Login to Kloudlite
              </div>
              <div className="text-text-soft bodySm text-center">
                To access your DevOps console, Please provide your login
                credentials.
              </div>
            </div>
            {searchParams.get('mode') === 'email' ? (
              <LoginWithEmail />
            ) : (
              <div className="flex flex-col items-stretch gap-3xl">
                <Button
                  size="large"
                  variant="tertiary"
                  content={
                    <span className="bodyLg-medium">Continue with GitHub</span>
                  }
                  prefix={GithubLogoFill}
                  href={githubLoginUrl}
                  disabled={!githubLoginUrl}
                  block
                  LinkComponent={Link}
                  className="!p-2xl"
                />
                <Button
                  size="large"
                  variant="purple"
                  content={
                    <span className="bodyLg-medium">Continue with GitLab</span>
                  }
                  prefix={GitlabLogoFill}
                  href={gitlabLoginUrl}
                  disabled={!gitlabLoginUrl}
                  block
                  LinkComponent={Link}
                  className="!p-2xl"
                />
                <Button
                  size="large"
                  variant="primary"
                  content={
                    <span className="bodyLg-medium">Continue with Google</span>
                  }
                  prefix={CustomGoogleIcon}
                  href={googleLoginUrl}
                  disabled={!googleLoginUrl}
                  block
                  LinkComponent={Link}
                  className="!p-2xl"
                />
              </div>
            )}
          </div>
          {searchParams.get('mode') === 'email' ? (
            <Button
              size="large"
              variant="outline"
              content={
                <span className="bodyLg-medium">Other Login options</span>
              }
              prefix={ArrowLeft}
              href="/login"
              block
              LinkComponent={Link}
              className="!p-2xl"
            />
          ) : (
            <Button
              size="large"
              variant="outline"
              content={<span className="bodyLg-medium">Login with Email</span>}
              prefix={Envelope}
              href="/login/?mode=email"
              block
              LinkComponent={Link}
              className="!p-2xl"
            />
          )}
        </div>
      </div>
      <div className="py-5xl px-3xl flex flex-row items-center justify-center self-stretch">
        <div className="bodyMd text-text-default">Don’t have an account?</div>
        <Button
          content="Signup"
          variant="primary-plain"
          size="medium"
          href="/signup"
          LinkComponent={Link}
        />
      </div>
    </div>
  );
};

const restActions = async (ctx) => {
  const { data, errors } = await GQLServerHandler({
    headers: ctx.request.headers,
  }).loginPageInitUrls();
  if (errors) {
    logger.error(errors);
  }

  const {
    githubLoginUrl = null,
    gitlabLoginUrl = null,
    googleLoginUrl = null,
  } = data || {};
  return {
    githubLoginUrl,
    gitlabLoginUrl,
    googleLoginUrl,
  };
};

export const loader = async (ctx) =>
  (await assureNotLoggedIn(ctx)) || restActions(ctx);

export default Login;
