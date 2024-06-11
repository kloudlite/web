import Error404Icon from '~/components/organisms/error-404';
import { Button } from '~/components/atoms/button';

interface IPage404 {
  heading?: string;
  content?: string;
  link?: string;
}

const Page404 = ({
  heading = 'Whoops (404)! Page not found',
  content = 'We’ll get to the bottom of it, no matter how many rabbit holes we must go down. In the meantime, feel free to browse other areas of our site.',
  link,
}: IPage404) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8xl">
      <Error404Icon />
      <div className="flex flex-col items-center justify-center gap-5xl max-w-md text-center">
        <div className="flex flex-col gap-3xl">
          <div className="heading3xl">{heading}</div>
          <div className="bodyMd text-text-soft md:w-[544px]">{content}</div>
        </div>
        <Button variant="basic" size="md" content="Go to homepage" to={link} />
      </div>
    </div>
  );
};

export default Page404;
