import { CalendarBlank, Clock, GlobeSimple } from '@jengaicons/react';
import { Block } from '~/app/components/commons';
import { GraphItem } from '~/app/components/graph';
import ResponsiveContainer from '~/app/components/responsive-container';
import Profile from 'kl-design-system/molecule/profile';
import Button from '~/app/components/button';
import eventImage from '~/images/homeNew/events/events.jpg';
import eventImage2 from '~/images/homeNew/exploring/collaborative.jpeg';
import Slider from '../../slider';
import { useEffect, useRef, useState } from 'react';
import '@splidejs/react-splide/css/core';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import Radio from 'kl-design-system/atoms/radio';

const events = [
  {
    eventTitle:
      'Next-Gen Workflows Streamline Development with Workspaces & Environments',
    eventType: 'Online',
    eventDate: 'August 31, 2024',
    eventTime: '11:00 to 12:00 pm',
    eventAuthorName: 'Karthik Thriumalasetti',
    eventAuthorDetail: 'Founder & CEO, Kloudlite',
    eventImage: eventImage.src,
  },

  {
    eventTitle:
      'Next-Gen Workflows Streamline Development with Workspaces & Environments 2',
    eventType: 'Online',
    eventDate: 'August 31, 2024',
    eventTime: '11:00 to 12:00 pm',
    eventAuthorName: 'Karthik Thriumalasetti',
    eventAuthorDetail: 'Founder & CEO, Kloudlite',
    eventImage: eventImage2.src,
  },
];

const Events = () => {
  const sliderRef = useRef<Splide>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.go(active);
    }
  }, [sliderRef.current, active]);
  return (
    <Block
      title="Events"
      desc="Discover and join upcoming events and webinars tailored to your interests"
    >
      <GraphItem>
        <Splide
          ref={sliderRef}
          options={{
            autoplay: true,
            arrows: false,
            pagination: false,
            type: 'loop',
          }}
          onMove={(e) => setActive(e.index)}
          hasTrack={false}
        >
          <SplideTrack>
            {events.map((es) => {
              return (
                <SplideSlide key={es.eventTitle}>
                  <ResponsiveContainer className="wb-grid wb-grid-cols-[auto_608px] wb-bg-surface-basic-default ">
                    <img
                      src={es.eventImage}
                      alt={`event-${es.eventTitle}`}
                      className="wb-w-full wb-h-full wb-object-cover"
                    />
                    <div className="wb-bg-surface-basic-default wb-p-5xl wb-flex wb-flex-col wb-gap-5xl">
                      <div className="wb-flex wb-flex-row wb-items-center wb-gap-3xl wb-bodyXl wb-text-text-soft">
                        <div className="wb-flex wb-flex-row wb-items-center wb-gap-lg">
                          <span>
                            <CalendarBlank size={20} />
                          </span>
                          <span>{es.eventDate}</span>
                        </div>
                        <div className="wb-flex wb-flex-row wb-items-center wb-gap-lg">
                          <span>
                            <Clock size={20} />
                          </span>
                          <span>{es.eventTime}</span>
                        </div>
                        <div className="wb-flex wb-flex-row wb-items-center wb-gap-lg">
                          <span>
                            <GlobeSimple size={20} />
                          </span>
                          <span>{es.eventType}</span>
                        </div>
                      </div>
                      <div className="wb-heading3xl-marketing wb-text-text-default">
                        {es.eventTitle}
                      </div>
                      <div>
                        <Profile
                          size="lg"
                          title={es.eventAuthorName}
                          name={
                            <span className="wb-headingLg">
                              {es.eventAuthorName}
                            </span>
                          }
                          subtitle={
                            <span className="wb-bodyLg">
                              {es.eventAuthorDetail}
                            </span>
                          }
                        />
                      </div>
                      <div>
                        <Button
                          block
                          size="lg"
                          content="Register now"
                          variant="primary"
                        />
                      </div>
                    </div>
                  </ResponsiveContainer>
                </SplideSlide>
              );
            })}
          </SplideTrack>
        </Splide>
      </GraphItem>
      <div className="wb-h-[19px] md:wb-h-[31px] wb-bg-surface-basic-subdued wb-flex wb-flex-row wb-items-center wb-justify-center wb-z-10 wb-relative">
        <Radio.Root
          value={`${active}`}
          onChange={(e) => {
            if (sliderRef.current) {
              sliderRef.current.go(parseInt(e, 10) || 0);
            }
          }}
          className="!wb-flex-row wb-self-center"
        >
          {/* @ts-ignore */}
          {events.map((e, index) => {
            const i = index;
            // @ts-ignore
            return <Radio.Item key={i} value={`${i}`} />;
          })}
        </Radio.Root>
      </div>
    </Block>
  );
};

export default Events;
