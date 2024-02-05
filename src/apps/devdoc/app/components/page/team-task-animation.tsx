import { RefObject } from 'react';

const resetItem = (item: HTMLDivElement, orgLogo: string) => {
  item.style.position = 'relative';
  item.style.top = '0px';
  item.style.width = '100%';
  const logoItem = item.querySelector('.team-task-avatar')
    ?.firstChild as HTMLDivElement;
  logoItem.innerHTML = orgLogo;
  return item;
};

const isMobile = () => window.innerWidth < 768;

export const teamTaskAnimationV3 = ({
  listOneRef,
  listTwoRef,
  logoRef,
  orgLogo,
}: {
  listOneRef: RefObject<HTMLDivElement>;
  listTwoRef: RefObject<HTMLDivElement>;
  logoRef: string;
  orgLogo: string;
}) => {
  // listOneRef and listTwoRef might be null
  if (!listOneRef.current || !listTwoRef.current) {
    return null;
  }

  // execute move item in a interval
  const interval = setInterval(() => {
    if (document.hidden) {
      return null;
    }
    // get the first item to move from listOneRef to listTwoRef
    const firstElement = resetItem(
      listOneRef?.current?.firstElementChild as HTMLDivElement,
      orgLogo
    );

    // recheck if list's are not null cause it is inside interval
    if (!listOneRef.current || !listTwoRef.current) {
      return null;
    }

    // reset transition for list
    listOneRef.current.style.transition = 'none';
    listTwoRef.current.style.transition = 'none';

    // make sure firstelement of listOneRef is not null
    if (firstElement) {
      // get boundary parameters to calculate positon
      const rect1 = firstElement.getBoundingClientRect();
      const rect2 = listTwoRef.current?.getBoundingClientRect();
      const deltaX = rect2.left - rect1.left;
      const deltaY = rect2.top - rect1.top;

      const paddingDesk = 32;
      const paddingMobile = 12;

      // clone item for restoring later
      const clonedElement = resetItem(firstElement, orgLogo).cloneNode(
        true
      ) as HTMLDivElement;

      // get logo element for animation
      const logoItem = firstElement.querySelector('.team-task-avatar')
        ?.firstChild as HTMLDivElement;

      // make item absolute so that it is on top (z-index) of list containers
      firstElement.style.position = 'absolute';

      firstElement.style.zIndex = '22';
      // since position is absolute, manually need to set top and width of item
      if (isMobile()) {
        firstElement.style.setProperty(
          '--deltaYInitial',
          `${deltaY * -1 + paddingMobile}px`
        );
      } else {
        firstElement.style.setProperty(
          '--deltaYInitial',
          `${deltaY * -1 + paddingDesk}px`
        );
      }
      // for mobile screen
      if (isMobile()) {
        firstElement.style.width = `calc(100% - ${paddingMobile * 2}px)`;
      } else {
        firstElement.style.width = `calc(100% - ${paddingDesk * 2}px)`;
      }
      // just a ui touchup
      firstElement.classList.add('shadow-card');

      // imitate empty item for insert and remove animation for both list

      if (isMobile()) {
        listOneRef.current.style.paddingTop = `${rect1.height + paddingMobile
          }px`;
        listTwoRef.current.style.paddingTop = `${rect1.height + paddingMobile
          }px`;
      } else {
        listOneRef.current.style.paddingTop = `${rect1.height + paddingDesk}px`;
        listTwoRef.current.style.paddingTop = `${rect1.height + paddingDesk}px`;
      }
      listTwoRef.current.style.transition = 'padding 0.2s linear';

      // item animation propertys
      if (isMobile()) {
        firstElement.style.setProperty('--deltaX', `${deltaX}px`);
        firstElement.style.setProperty('--deltaY', `${paddingMobile}px`);
      } else {
        firstElement.style.setProperty('--deltaX', `${deltaX}px`);
        firstElement.style.setProperty('--deltaY', `${paddingDesk}px`);
      }
      // add animations classes for item and logo to start animation
      firstElement.classList.add('task-teams-card-rotate-animate');
      logoItem.classList.add('task-teams-logo-animate');

      // change the logo midway
      setTimeout(() => {
        logoItem.innerHTML = logoRef;
      }, 300);

      setTimeout(() => {
        if (listOneRef.current) {
          listOneRef.current.style.transition = 'padding 0.3s ease-in-out';
          listOneRef.current.style.paddingTop = '0px';
        }
      }, 200);

      // code to execute once the item animation is ended
      firstElement.onanimationend = (e) => {
        // make sure the lists are not null
        if (!listOneRef.current || !listTwoRef.current) {
          return;
        }

        // check if the ended animation is 'team-card-animate'
        if (e.animationName === 'team-card-animate') {
          listTwoRef.current.style.transition = 'none';
          // reset item properties as it has reached to listTwoRef
          firstElement.style.width = `100%`;
          firstElement.style.zIndex = '0';
          firstElement.style.position = 'relative';
          firstElement.style.top = '0';

          // append the item to listTwoRef at the top and this also removes item from listOneRef because of reference
          listTwoRef.current?.prepend(firstElement);

          // reset list properties
          listOneRef.current.style.transition = 'none';
          listTwoRef.current.style.paddingTop = '0px';
          listTwoRef.current.style.transition = 'none';
          firstElement.classList.remove('shadow-card');

          // for infinite animation append original item to end of listOneRef
          listOneRef.current.append(clonedElement);

          // add some delay and reset animation
          if (!listOneRef.current || !listTwoRef.current) {
            return;
          }
          logoItem.classList.remove('task-teams-logo-animate');
          clonedElement.classList.remove('task-teams-card-rotate-animate');
          clonedElement.style.setProperty('--deltaX', `0px`);
          clonedElement.style.setProperty('--deltaY', `0px`);
          firstElement.classList.remove('task-teams-card-rotate-animate');
          firstElement.style.setProperty('--deltaX', `0px`);
          firstElement.style.setProperty('--deltaY', `0px`);
          listOneRef.current.style.transition = 'padding 0.1s ease-in-out';
          listOneRef.current.style.paddingTop = '0px';

          // when second list is full, remove last element every time new element is added
          if (
            listTwoRef.current.scrollHeight - listTwoRef.current.clientHeight >=
            rect1.height
          ) {
            const { lastChild } = listTwoRef.current;
            if (lastChild) {
              listTwoRef.current.removeChild(lastChild);
            }
          }
        }
      };
    }
    return null;
  }, 1000);

  return interval;
};

export const teamTaskAnimationV2 = ({
  listOneRef,
  listTwoRef,
  logoRef,
}: {
  listOneRef: RefObject<HTMLDivElement>;
  listTwoRef: RefObject<HTMLDivElement>;
  logoRef: RefObject<HTMLDivElement>;
}) => {
  const orginalLogo = (
    document.querySelector('.team-task-avatar')?.firstChild as HTMLDivElement
  )?.innerHTML;

  if (!listOneRef.current || !listTwoRef.current) {
    return null;
  }

  const interval = setInterval(() => {
    const firstElement = listOneRef?.current
      ?.firstElementChild as HTMLDivElement;
    if (!listOneRef.current || !listTwoRef.current) {
      return;
    }
    listOneRef.current.style.transition = 'none';
    if (firstElement) {
      const rect1 = firstElement.getBoundingClientRect();
      const rect0 = listOneRef.current.getBoundingClientRect();
      const rect2 = listTwoRef.current?.getBoundingClientRect();
      console.log(rect1.width, rect0.width);
      const deltaX = rect2.left - rect1.left;
      const deltaY = rect2.top - rect1.top;
      const logoItem = firstElement.querySelector('.team-task-avatar')
        ?.firstChild as HTMLDivElement;
      logoItem.innerHTML = orginalLogo;
      firstElement.style.position = 'absolute';
      firstElement.style.top = '32px';
      firstElement.style.width = `calc(100% - 64px)`;
      firstElement.classList.add('shadow-card');
      listOneRef.current.style.paddingTop = `${rect1.height + 32}px`;
      firstElement.style.transition = 'transform 0.5s ease-in-out';
      listTwoRef.current.style.paddingTop = `${rect1.height + 32}px`;
      listTwoRef.current.style.transition = 'padding 0.2s ease-in-out';
      firstElement.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

      logoItem.classList.add('task-teams-logo-animate');

      setTimeout(() => {
        logoItem.innerHTML = logoRef.current?.innerHTML || '';
      }, 250);
      firstElement.addEventListener('transitionend', () => {
        if (!listOneRef.current || !listTwoRef.current) {
          return;
        }

        firstElement.style.width = `100%`;
        firstElement.style.transform = 'none';

        firstElement.style.position = 'relative';
        firstElement.style.top = '0';
        listTwoRef.current?.prepend(firstElement);

        listOneRef.current.style.transition = 'none';

        firstElement.style.transition = 'none';
        listTwoRef.current.style.paddingTop = '0px';
        listTwoRef.current.style.transition = 'none';
        firstElement.classList.remove('shadow-card');
        const clonedElement = firstElement.cloneNode(true) as HTMLDivElement;
        (
          clonedElement?.querySelector('.team-task-avatar')
            ?.firstChild as HTMLDivElement
        ).innerHTML = orginalLogo;
        listOneRef.current.append(clonedElement);
        setTimeout(() => {
          if (!listOneRef.current || !listTwoRef.current) {
            return;
          }
          logoItem.classList.remove('task-teams-logo-animate');
          listOneRef.current.style.transition = 'padding 0.1s ease-in-out';
          listOneRef.current.style.paddingTop = '0px';
          if (
            listTwoRef.current.scrollHeight > listTwoRef.current.clientHeight
          ) {
            const { lastChild } = listTwoRef.current;
            if (lastChild) {
              listTwoRef.current.removeChild(lastChild);
            }
          }
        }, 0);
      });
    }
  }, 1200);

  return interval;
};

const teamTaskAnimation = ({
  listOneRef,
  listTwoRef,
  logoRef,
}: {
  listOneRef: RefObject<HTMLDivElement>;
  listTwoRef: RefObject<HTMLDivElement>;
  logoRef: RefObject<HTMLDivElement>;
}) => {
  const orginalLogo = (
    document.querySelector('.team-task-avatar')?.firstChild as HTMLDivElement
  )?.innerHTML;

  if (!listOneRef.current || !listTwoRef.current) {
    return null;
  }

  const interval = setInterval(() => {
    const firstElement = listOneRef?.current
      ?.firstElementChild as HTMLDivElement;
    const totalElements = listOneRef.current?.children.length;
    if (!listOneRef.current || !listTwoRef.current) {
      return;
    }
    listOneRef.current.style.transition = 'none';
    if (totalElements === 0 && !firstElement) {
      listOneRef.current.style.transform = 'translate(-100%, 0)';
      listTwoRef.current.style.transform = 'translate(100%, 0)';
      listTwoRef.current.style.transition = 'transform 0.1s ease-in-out';

      let called = false;

      listTwoRef.current.ontransitionend = (e) => {
        if (e.propertyName === 'transform' && !called) {
          if (!listOneRef.current || !listTwoRef.current) {
            return;
          }
          called = true;
          listTwoRef.current.style.transform = 'none';
          const clonedElement = listTwoRef.current.cloneNode(true);
          const firstElementCloned = clonedElement
            .childNodes[0] as HTMLDivElement;
          if (firstElementCloned) {
            const firstElementClonedFirstChild =
              firstElementCloned.querySelector('.team-task-avatar')
                ?.firstChild as HTMLDivElement;
            if (firstElementClonedFirstChild)
              firstElementClonedFirstChild.innerHTML = orginalLogo;
          }

          for (let i = 1; i < clonedElement.childNodes.length; i += 1) {
            const clonedChildElement = (
              clonedElement.childNodes[i] as HTMLDivElement
            ).querySelector('.team-task-avatar')?.firstChild as HTMLDivElement;
            if (clonedChildElement) {
              clonedChildElement.innerHTML = orginalLogo;
              clonedElement.insertBefore(
                clonedElement.childNodes[i],
                clonedElement.firstChild
              );
            }
          }
          listOneRef.current.style.transition = 'transform 0.1s ease-in-out';

          listOneRef.current.innerHTML = (
            clonedElement as HTMLDivElement
          ).innerHTML;
          listOneRef.current.style.transform = 'none';
          listTwoRef.current.innerHTML = '';
        }
      };
      return;
    }

    if (firstElement) {
      const rect1 = firstElement.getBoundingClientRect();
      const rect0 = listOneRef.current.getBoundingClientRect();
      const rect2 = listTwoRef.current?.getBoundingClientRect();
      console.log(rect1.width, rect0.width);
      const deltaX = rect2.left - rect1.left;
      const deltaY = rect2.top - rect1.top;
      const logoItem = firstElement.querySelector('.team-task-avatar')
        ?.firstChild as HTMLDivElement;
      logoItem.innerHTML = orginalLogo;
      firstElement.style.position = 'absolute';
      firstElement.style.top = '32px';
      firstElement.style.width = `calc(100% - 64px)`;
      firstElement.classList.add('shadow-card');
      listOneRef.current.style.paddingTop = `${rect1.height + 32}px`;
      firstElement.style.transition = 'transform 0.5s ease-in-out';
      listTwoRef.current.style.paddingTop = `${rect1.height + 32}px`;
      listTwoRef.current.style.transition = 'padding 0.2s ease-in-out';
      firstElement.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

      logoItem.classList.add('task-teams-logo-animate');

      setTimeout(() => {
        logoItem.innerHTML = logoRef.current?.innerHTML || '';
      }, 250);
      firstElement.addEventListener('transitionend', () => {
        if (!listOneRef.current || !listTwoRef.current) {
          return;
        }

        firstElement.style.width = `100%`;
        firstElement.style.transform = 'none';

        firstElement.style.position = 'relative';
        firstElement.style.top = '0';
        listTwoRef.current?.prepend(firstElement);
        listOneRef.current.style.transition = 'none';

        firstElement.style.transition = 'none';
        listTwoRef.current.style.paddingTop = '0px';
        listTwoRef.current.style.transition = 'none';
        firstElement.classList.remove('shadow-card');

        setTimeout(() => {
          if (!listOneRef.current || !listTwoRef.current) {
            return;
          }
          logoItem.classList.remove('task-teams-logo-animate');
          listOneRef.current.style.transition = 'padding 0.1s ease-in-out';
          listOneRef.current.style.paddingTop = '0px';
        }, 0);
      });
    }
  }, 1200);

  return interval;
};

export default teamTaskAnimation;
