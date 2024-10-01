import { IButton } from 'kl-design-system/atoms/button';
import { useEffect, useState } from 'react';
import Button from './button';
import { useTheme } from '../utils/useTheme';
import Popup from './popup';
import Cal, { getCalApi } from '@calcom/embed-react';
import { XFill } from '@jengaicons/react';
import Container from './container';
import Link from 'next/link';
import { demoUrl } from '../utils/config';

const DemoCalendar1 = (props: IButton) => {
  const { binaryTheme } = useTheme();
  const [show, setShow] = useState(false);
  return (
    <div>
      <Button {...props} onClick={() => setShow(true)} />
      <Popup.Root
        show={show}
        onOpenChange={(e) => setShow(e)}
        className="!wb-w-full !wb-bg-transparent !wb-border-0 !wb-shadow-none !wb-h-full"
      >
        <Popup.Content className="wb-min-h-[500px] !wb-w-full !wb-min-w-[100%] !wb-max-h-screen wb-h-full">
          <div className="wb-flex wb-flex-col wb-h-full wb-gap-5xl">
            <Container className="wb-max-h-2xl wb-flex-row wb-justify-end">
              <button
                onClick={() => setShow(false)}
                className="wb-text-text-on-primary hover:wb-opacity-60"
              >
                <XFill size={20} />
              </button>
            </Container>
            <div className="wb-min-h-[570px] wb-flex-1 wb-grid wb-items-center">
              <Cal
                calLink="kloudlite/45min"
                //@ts-ignore
                config={{ theme: binaryTheme, layout: 'month_view' }}
              ></Cal>
            </div>
          </div>
        </Popup.Content>
      </Popup.Root>
    </div>
  );
};

const DemoCalendar3 = () => {
  const { binaryTheme } = useTheme();
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: '45min' });
      console.log('hi');
      cal('ui', {
        //@ts-ignore
        theme: binaryTheme,
        styles: { branding: { brandColor: '#000000' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);
  return (
    <button
      data-cal-namespace="45min"
      data-cal-link="kloudlite/45min"
      data-cal-config={`{"layout":"month_view","theme":"dark"}`}
    >
      Click me
    </button>
  );
};

const DemoCalendar = (props: IButton) => {
  return <Button {...props} linkComponent={Link} to={demoUrl} toLabel="href" />;
};
export default DemoCalendar;
