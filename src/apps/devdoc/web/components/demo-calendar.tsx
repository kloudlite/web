import { IButton } from 'kl-design-system/atoms/button';
import Button from './button';
import Link from 'next/link';
import { demoUrl } from '../utils/config';

const DemoCalendar = (props: IButton) => {
  return <Button {...props} linkComponent={Link} to={demoUrl} toLabel="href" />;
};
export default DemoCalendar;
