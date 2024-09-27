import { Button } from '~/components/atoms/button';
import {
  Error500Icon,
  Error500IconDark,
} from '~/components/organisms/error-500';

interface IPage404 {
  heading?: string;
  content?: string;
  link?: string;
}

const Page500 = ({
  heading = 'Internal server error',
  content = 'The server encountered an error and could not complete your requests.',
  link,
}: IPage404) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8xl">
      <div className="dark-hidden">
        <Error500Icon />
      </div>
      <div className="hidden dark-block">
        <Error500IconDark />
      </div>
      <div className="flex flex-col items-center justify-center gap-5xl max-w-md text-center">
        <div className="flex flex-col gap-3xl">
          <div className="text-text-default heading3xl">{heading}</div>
          <div className="bodyMd text-text-soft md:w-[544px]">{content}</div>
        </div>
        <Button variant="basic" size="md" content="Go to homepage" to={link} />
      </div>
    </div>
  );
};

export default Page500;
