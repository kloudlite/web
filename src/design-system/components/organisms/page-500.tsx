import { Button } from '~/components/atoms/button';
import Error500Icon from '~/components/organisms/error-500';

interface IPage404 {
  heading?: string;
  content?: string;
  link?: string;
}

export const Page500 = ({
  heading = 'Internal server error',
  content = 'The server encountered an error and could not complete your requests.',
  link,
}: IPage404) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8xl">
      <Error500Icon />
      <div className="flex flex-col items-center justify-center gap-5xl max-w-md text-center">
        <div className="flex flex-col gap-3xl">
          <div className="heading3xl">{heading}</div>
          <div className="bodyMd text-text-soft w-[544px]">{content}</div>
        </div>
        <Button variant="basic" size="md" content="Go to homepage" to={link} />
      </div>
    </div>
  );
};
