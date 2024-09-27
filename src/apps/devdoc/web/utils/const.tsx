/** eslint-disable prettier/prettier */
import {
  ArrowLeftLg,
  Config,
  Money,
  OpenSource,
  PhoneCall,
  Question,
  Star,
  TwitterNewLogoFill,
} from '@jengaicons/react';

import Link from 'next/link';
import BlogCover from '~/public/blog/blog-cover.jpeg';

import profileAbdhesh from '~/images/about-us/abdhesh.jpeg';
import profileAditya from '~/images/about-us/aditya-sharma.png';
import profileAnshuman from '~/images/about-us/ansuman.jpg';
import profileBikash from '~/images/about-us/bikash.jpg';
import profileHarsh from '~/images/about-us/harsh.png';
import profileKarthik from '~/images/about-us/karthik-thirumalasetti.png';
import profileMohit from '~/images/about-us/mohit.jpg';
import profilePavani from '~/images/about-us/pavani.png';
import profilePiyush from '~/images/about-us/piyush.jpg';
import profileSrikanta from '~/images/about-us/s-srikanta.png';
import profileShweta from '~/images/about-us/shewta.png';

import collaborate1440 from '~/images/homeNew/collaborate1440.svg';
import connect1440 from '~/images/homeNew/connect1440.svg';
import integrate1440 from '~/images/homeNew/integrate1440.svg';
import nocommit1440 from '~/images/homeNew/nocommit1440.svg';

import collaborate1440Dark from '~/images/homeNew/collaborate1440-dark.svg';
import connect1440Dark from '~/images/homeNew/connect1440-dark.svg';
import integrate1440Dark from '~/images/homeNew/integrate1440-dark.svg';
import nocommit1440Dark from '~/images/homeNew/nocommit1440-dark.svg';

import collaborateMd from '~/images/homeNew/collaborateMd.svg';
import connectMd from '~/images/homeNew/connectMd.svg';
import integrateMd from '~/images/homeNew/integrateMd.svg';
import nocommitMd from '~/images/homeNew/nocommitMd.svg';

import collaborateMdDark from '~/images/homeNew/collaborateMd-dark.svg';
import connectMdDark from '~/images/homeNew/connectMd-dark.svg';
import integrateMdDark from '~/images/homeNew/integrateMd-dark.svg';
import nocommitMdDark from '~/images/homeNew/nocommitMd-dark.svg';

import collaborateMobileDark from '~/images/homeNew/collaborateMobile-dark.svg';
import connectMobileDark from '~/images/homeNew/connectMobile-dark.svg';
import integrateMobileDark from '~/images/homeNew/integrateMobile-dark.svg';
import nocommitMobileDark from '~/images/homeNew/nocommitMobile-dark.svg';

import collaborateMobile from '~/images/homeNew/collaborateMobile.svg';
import connectMobile from '~/images/homeNew/connectMobile.svg';
import integrateMobile from '~/images/homeNew/integrateMobile.svg';
import nocommitMobile from '~/images/homeNew/nocommitMobile.svg';

import explore from '~/images/explore.jpeg';

import {
  Agritech,
  AnscerRoboticsLogo,
  ArrowRight,
  BoltchemLogo,
  Code,
  DesktopTower,
  Developer,
  Flask,
  Infinity as InfinityIcon,
  Lightbulb,
  LockSimple,
  PlaxonicLogo,
  Robot,
  RocketLaunch,
  SelectionForeground,
  Users,
} from '~/app/icons/icons';
import Collarative from '~/images/homeNew/exploring/collaborative.jpeg';
import RemoteLocal from '~/images/homeNew/exploring/remote-local.jpeg';
import Workflow from '~/images/homeNew/exploring/workflow.jpeg';
import Button from '../components/button';
import JoinProvidersDialog from '../components/join-provider-dialog';
import AnserSvg from '../icons/AnserRobotics';
import BoltzmanSvg from '../icons/Boltzman';
import CrewScaleSvg from '../icons/CrewScale';
import FibrSvg from '../icons/Fibr';
import PlaxonicSvg from '../icons/Plaxonic';
import RedPlutoSvg from '../icons/RedPluto';
import TalescaleSvg from '../icons/Talescale';
import { webinarUrl } from './config';

export const linkedInPrefix = 'https://www.linkedin.com/in/';
export const githubPrefix = 'https://github.com/';
export const twitterPrefix = 'https://x.com/';

const partnersNew = [
  {
    icon: <PlaxonicSvg />,
    className: 'wb-w-[128px]',
    id: 'plaxonic',
  },
  {
    icon: <FibrSvg />,
    className: 'wb-w-[128px]',
    id: 'fibr',
  },
  {
    icon: <RedPlutoSvg />,
    className: 'wb-w-[160px]',
    id: 'redpluto',
  },
  {
    icon: <CrewScaleSvg />,
    className: 'wb-w-[128px]',
    id: 'crewscale',
  },
  {
    icon: <AnserSvg />,
    className: 'wb-w-[128px]',
    id: 'anser',
  },
  {
    icon: <BoltzmanSvg />,
    className: 'wb-w-[128px]',
    id: 'boltzman',
  },
  {
    icon: <TalescaleSvg />,
    className: 'wb-w-[128px]',
    id: 'talescale',
  },
];

const consts = {
  homeNew: {
    introVideo: [
      {
        src: '/intro.webm',
        type: 'video/webm',
      },
      {
        src: '/intro.mp4',
        type: 'video/mp4',
      },
    ],
    partners: partnersNew,
    messages: [
      {
        title: 'Raj Mohan',
        subtitle: 'Co-founder, Anscer Robotics',
        company: <TwitterNewLogoFill size={24} />,
        message:
          'Thanks to Kloudlite, Anscer Robotics streamlined deployment across edge devices, minimized downtime, and enhanced monitoring with Grafana integration. Remote config management simplified operations, boosting efficiency significantly. Kloudlite has been invaluable in optimizing our workflow.',
      },
      {
        title: 'Pritam Roy',
        subtitle: 'Co-founder, Fibr',
        company: <TwitterNewLogoFill size={24} />,
        message:
          'Kloudlite has revolutionized Fibr’s development process, cutting launch times and costs significantly. With seamless deployment, real-time monitoring via Grafana, and remote config management, we’ve streamlined workflows and ensured secure, reliable applications.',
      },
      {
        title: 'Sunny Khanna',
        subtitle: 'VP Engineering, Plaxonic',
        company: <TwitterNewLogoFill size={24} />,
        message:
          'Kloudlite transformed our processes at Plaxonic. It accelerated our development and deployment, minimizing downtime and optimizing efficiency. Highly recommend!',
      },
    ],
    exploring: [
      {
        img: Collarative.src,
        label: 'Collaborative development',
        desc: 'In a globalized landscape, collaborative development faces challenges but fuels innovation.',
        to: '/blog/collaborative-development',
      },
      {
        img: RemoteLocal.src,
        label: 'Remote local environments',
        desc: 'Discover how Kloudlite pioneers transformative remote local environments.',
        to: '/blog/remote-local-environments',
      },
      {
        img: Workflow.src,
        label: 'Development workflow',
        desc: 'Kloudlite revolutionizes software development with streamlined efficiency and productivity',
        to: '/blog/development-workflow',
      },
    ],
    howitworks: {
      images: {
        collaborate: {
          rmobile: collaborateMobile.src,
          rmobileDark: collaborateMobileDark.src,
          r1440: collaborate1440.src,
          r1440Dark: collaborate1440Dark.src,
          r768: collaborateMd.src,
          r768Dark: collaborateMdDark.src,
        },
        connect: {
          rmobile: connectMobile.src,
          rmobileDark: connectMobileDark.src,
          r768: connectMd.src,
          r768Dark: connectMdDark.src,
          r1440: connect1440.src,
          r1440Dark: connect1440Dark.src,
        },
        integrate: {
          rmobile: integrateMobile.src,
          rmobileDark: integrateMobileDark.src,
          r768: integrateMd.src,
          r768Dark: integrateMdDark.src,
          r1440: integrate1440.src,
          r1440Dark: integrate1440Dark.src,
        },
        nocommit: {
          rmobile: nocommitMobile.src,
          rmobileDark: nocommitMobileDark.src,
          r768: nocommitMd.src,
          r768Dark: nocommitMdDark.src,
          r1440: nocommit1440.src,
          r1440Dark: nocommit1440Dark.src,
        },
      },
      items: [
        {
          label: 'Shift Left with Confidence',
          id: 'collaborate',
          desc: 'Detecting issues early in the development cycle reduces late fixes, ensuring more reliable applications',
        },
        {
          label: 'Collaboration Effortlessly',
          id: 'nocommit',
          desc: 'Teams can collaborate in the same env to develop & test interdependent services together.',
        },
        {
          label: 'Shorten your Inner Loops',

          id: 'integrate',
          desc: 'Connect, code, and see changes in real-time - speed up your development and feedback loops',
        },
        {
          label: 'Use Existing Workflows',
          id: 'connect',
          desc: 'Integrate with your existing tools; continue using the workflows you’re familiar, with zero disruptions',
        },
      ],
    },
    kloudliteDevelopmentData: [
      {
        label: 'Open source',
        desc: 'No vendor lock-in, what so ever',
        icon: OpenSource,
      },
      {
        label: 'Integrated workspaces',
        desc: 'Develop in workspaces that are already connected to your application environments',
        icon: InfinityIcon,
      },
      {
        label: 'No Build No Deploy, Just Code',
        desc: 'Intercept the service to swap remote application with your workspace',
        icon: Code,
      },
      {
        label: '100% Dev-Prod Parity',
        desc: 'What you develop is what you deploy - no surprises',
        icon: Developer,
      },

      {
        label: 'Seamless Collaboration',
        desc: 'Switch into common environment to start collaboration',
        icon: Users,
      },
      {
        label: 'Cut the Config Clutter',
        desc: 'No more configs in your code',
        icon: SelectionForeground,
      },
      {
        label: 'Secure by Design',
        desc: 'Safeguard your development with built-in security at every layer',
        icon: LockSimple,
      },
      {
        label: 'More time to code',
        desc: 'Free your focus for creativity with streamlined workflows',
        icon: Lightbulb,
      },
    ],

    faqData: [
      {
        title: 'What are remote local environments?',
        desc: "Kloudlite Remote Local environments refer to a hybrid development setup where remote Kubernetes-based environments are seamlessly integrated with local development containers. These local containers run on the developer's machine and are connected to the remote environments via a secure WireGuard network, enabling access to remote services as if they were local. This setup ensures development-production parity by synchronizing configurations and secrets, allowing developers to use their local IDEs for coding while maintaining a consistent and secure environment.",
        classNames: 'wb-pb-2xl 3xl:wb-pb-xl',
      },
      {
        title: 'How does Kloudlite Development Environments work?',
        desc: `Kloudlite Development Environments work by linking your local machine to remote environment
         where your applications run. Configs and Secrets are kept in sync between your local machine and the remote environment. 
         Local containers will be in the same wireguard network as remote environment. 
         These  connect through a secure network, allowing you to access and work with all necessary services without installing them locally. 
         This setup enables developers to work efficiently, ensuring that what they build on their computers will function the same way when 
         deployed on the remote servers.`,
        classNames: 'wb-pb-lg 3xl:wb-pb-md',
      },
      {
        title: 'How to use Kloudlite?',
        desc: `To use Kloudlite, begin by attaching your cluster to the Kloudlite platform. 
        Once your cluster is connected, you can create your environment and deploy your applications effortlessly. 
        Use the \`kl\` CLI tool on your local machine to set up a local development container and connect it to your environment. 
        This allows you to start coding and testing your applications in local development containers seamlessly integrated with remote 
        environments.`,
        classNames: 'wb-pb-lg 3xl:wb-pb-md',
      },
      {
        title: 'How to collaborate?',
        desc: `
        To collaborate using Kloudlite, multiple developers can connect their local development containers to the same 
        remote environment via a secure WireGuard network. This setup allows them to work on different dependent services 
        within the same environment, sharing configurations and secrets seamlessly. By using the same Kubernetes namespace, 
        they ensure consistency and integration, facilitating real-time collaboration and testing without conflicts. 
        Developers can also access services running on each other’s machines as they are on the same network. 
        When a developer intercepts a service, all traffic to that service is rerouted to their local machine, enabling 
        efficient collaboration and development without lengthy deployment loops.`,
        classNames: 'wb-pb-xl 3xl:wb-pb-lg',
      },
      {
        title: 'How to testing is possible without building and deploying?',
        desc: 'Testing in Kloudlite is possible without building and deploying because it allows you to run your local application within the same WireGuard network as the remote environment. This setup lets you test your code changes directly by accessing all necessary remote services and configurations, ensuring a consistent and integrated environment. By avoiding the build and deploy cycle, you can start testing immediately, saving time and quickly identifying and addressing any issues.',
        classNames: 'wb-pb-xl 3xl:wb-pb-lg',
      },
      {
        title: 'Is Kloudlite secure?',
        desc: 'Yes, Kloudlite is secure. It uses WireGuard for creating a secure, encrypted network connection between your local machine and remote environments, ensuring that all data transmitted is protected. Additionally, it synchronizes configurations and secrets securely, maintaining strict control over access and permissions. This setup ensures that your development environment mirrors production security measures, providing a safe and reliable platform for development and testing.',
        classNames: 'wb-pb-xl 3xl:wb-pb-lg',
      },
      {
        title: 'How does Kloudlite help to reduce Development Inner loop?',
        desc: 'Kloudlite helps reduce the Development Inner Loop by allowing developers to instantly test code changes in a local development container that is connected to the remote environment via a secure WireGuard network. This setup eliminates the need for repeated building and deploying, as the local container can directly access remote services and configurations. By enabling real-time testing and debugging within the same environment where the application will run, Kloudlite significantly speeds up the development cycle and enhances productivity.',
        classNames: 'wb-pb-xl 3xl:wb-pb-lg',
      },
      {
        title: 'Can you use Kloudlite with any IDE and Git repository?',
        desc: "Yes, you can use Kloudlite with any IDE and Git repository. Kloudlite's development containers come with SSH servers, allowing seamless integration with your preferred IDE. This means you can connect your IDE directly to the container for real-time coding and testing. Additionally, since Kloudlite syncs your local workspace with the development container, you can use any Git repository to manage your code, ensuring smooth version control and collaboration across different development environments.",
        classNames: 'wb-pb-xl 3xl:wb-pb-lg',
      },
      {
        title: 'Can I self host Kloudlite?',
        desc: 'Yes, you can self-host Kloudlite on your own infrastructure, giving you full control over your development environments, security, and configurations, whether on-premises or in the cloud.',
        classNames: 'wb-pb-0',
      },
      {
        title: 'How to setup Kloudlite with my IDE?',
        desc: 'To set up Kloudlite with your IDE, install Kloudlite on your local machine and start your development container. Connect your IDE to this container via SSH using the provided server details. This allows your IDE to interact directly with the container, enabling real-time coding, testing, and debugging as if you were working in the remote environment, with seamless access to all necessary services and configurations.',
        classNames: 'wb-pb-lg 3xl:wb-pb-md',
      },
    ],

    recommendedTabs: [
      {
        title: 'InfraOps',
        desc: 'Dive in to set up your InfraOps effortlessly',
        content: 'Explore our knowledge bank',
        subContent:
          'Tap into our extensive collection of resources and guides tailored to help you navigate around platform',
        link: '/',
        id: 'infraops',
        image: explore.src,
      },
      {
        title: 'DevOps',
        desc: 'Explore the DevOps APIs to build your app',
        content: 'Explore our knowledge bank',
        subContent:
          'Tap into our extensive collection of resources and guides tailored to help you navigate around platform',
        link: '/',
        id: 'devops',
        image: explore.src,
      },
      {
        title: 'Distribution',
        desc: 'Access the resources to ensure a smooth build',
        content: 'Explore our knowledge bank',
        subContent:
          'Tap into our extensive collection of resources and guides tailored to help you navigate around platform',
        link: '/',
        id: 'distribution',
        image: explore.src,
      },
    ],
  },
  blog: {
    images: {
      cover: BlogCover.src,
    },
  },
  customerstories: {
    casestudies: [
      {
        title: 'Anscer robotics',
        content:
          'Anscer Robotics is an industrial robotics company that automates factories & warehouses using mobile robotics, IoT & warehouse software solutions.',
        icon: AnscerRoboticsLogo,
      },
      {
        title: 'Boltchem',
        content:
          'Boltzmann is an AI Drug Discovery platform that focuses on building AI powered data driven solutions to empower scientists and researchers.',
        icon: BoltchemLogo,
      },
      {
        title: 'Plaxonic',
        content:
          'Plaxonic is an IT service and product company, which provides advanced digital solutions & research to enterprises across the world.',
        icon: PlaxonicLogo,
      },
    ],
    industries: [
      {
        title: 'Agritech',
        content:
          'Advanced DevOps, InfraOps automation solutions, and data-driven farming for improved yield and efficiency',
        icon: Agritech,
      },
      {
        title: 'Robotics',
        content:
          'Advanced DevOps, InfraOps automation solutions, and data-driven farming for improved yield and efficiency',
        icon: Robot,
      },
      {
        title: 'Biotech',
        content:
          'Simple, cost-effective and cloud-agnostic automation solutions, facilitating innovative medical research',
        icon: Flask,
      },
      {
        title: 'IT & ITES',
        content:
          'Kloudlite with its advanced automation suite functions as an extended InfraOps & DevOps arm for the IT & ITES businesses',
        icon: DesktopTower,
      },
    ],
    clients: partnersNew,
  },
  pricing: {
    list: [
      {
        type: 'Essential',
        price: 'Free',
        id: '1',
        descriptionn: 'For small teams, individual, and personal projects',
        features: [
          'Unlimited environments',
          'Unlimited devices',
          'Unlimited clusters',
          'Unlimited members',
        ],
        action: <JoinProvidersDialog size="lg" />,
      },
      {
        type: 'Scale',
        id: '2',
        price: (
          <div className="wb-flex wb-flex-row wb-gap-lg wb-items-baseline">
            <span className="wb-heading4xl">$20</span>
            <span className="wb-bodyLg !wb-font-medium">/ user / month</span>
          </div>
        ),
        descriptionn: 'For growing teams that focused on collaboration',
        features: [
          'Role based access control',
          'AI assisted workflows (coming soon...)',
        ],
        featurePrecontent: (
          <div className="wb-flex wb-flex-row wb-items-center wb-gap-xl wb-text-text-default">
            <span>
              <ArrowLeftLg size={20} />
            </span>
            <span className="wb-headingMd">Everything of Free, plus...</span>
          </div>
        ),
        action: (
          <Button
            content="Contact sales"
            variant="basic"
            suffix={<ArrowRight />}
            block
            size="lg"
            linkComponent={Link}
            toLabel="href"
            to="/contact-us"
          />
        ),
        selected: false,
        fade: false,
        badge: false,
      },
      {
        type: 'Enterprise',
        id: '3',
        price: 'Custom',
        descriptionn: 'For teams with more security and performance needed',
        features: ['Dedicated support & SLAs', 'SSO/SAML', 'On Premise'],
        featurePrecontent: (
          <div className="wb-flex wb-flex-row wb-items-center wb-gap-xl wb-text-text-default">
            <span>
              <ArrowLeftLg size={20} />
            </span>
            <span className="wb-headingMd">Everything of Scale, plus...</span>
          </div>
        ),
        action: (
          <Button
            content="Contact sales"
            variant="basic"
            suffix={<ArrowRight />}
            block
            size="lg"
            linkComponent={Link}
            toLabel="href"
            to="/contact-us"
          />
        ),
      },
    ],
  },
  aboutus: {
    team: [
      {
        name: 'Karthik Thirumalasetti',
        role: 'Co-Founder & CEO',
        image: profileKarthik.src,
        linkedin: 'karthik1988',
        x: '',
        github: 'karthik1729',
      },
      {
        name: 'Aditya Sharma',
        role: 'Co-Founder & COO',
        image: profileAditya.src,
        linkedin: 'aditya2311',
        x: '',
        github: '',
      },
      {
        name: 'Pavani Katuboyina',
        role: 'Co-founder & CMO',
        image: profilePavani.src,
        linkedin: 'pavani-k-2a48a7a1',
        x: '',
        github: '',
      },
      {
        name: 'S Srikanth',
        role: 'VP - Engineering',
        image: profileSrikanta.src,
        linkedin: '',
        x: '',
        github: '',
      },
      {
        name: 'Anshuman Bhaskar',
        role: 'Principal Engineer',
        image: profileAnshuman.src,
        linkedin: 'nxtcoder17',
        x: '',
        github: 'nxtcoder17',
      },
      {
        name: 'Abdhesh Nayak',
        role: 'Principal Engineer',
        image: profileAbdhesh.src,
        linkedin: 'abdheshnayak',
        x: 'abdhesh_nayak',
        github: 'abdheshnayak',
        web: 'https://anayak.com.np/',
      },
      {
        name: 'Shweta Kaushal',
        role: 'Product Designer',
        image: profileShweta.src,
        linkedin: 'kaushalshweta',
        x: 'shweta__kaushal',
        github: '',
        web: 'https://shwetakaushal.com/',
      },
      {
        name: 'Piyush Kumar',
        role: 'SDE',
        image: profilePiyush.src,
        linkedin: 'nxtcoder19',
        x: '',
        github: 'nxtcoder19',
      },
      {
        name: 'Mohit Kumar',
        role: 'SDE',
        image: profileMohit.src,
        linkedin: 'mohit-kumar-3912ab17a',
        x: '',
        github: 'nxtcoder36',
      },
      {
        name: 'Bikash Ojha',
        role: 'Frontend Developer',
        image: profileBikash.src,
        linkedin: 'bikash-ojha',
        x: '',
        github: 'tulsiojha',
        web: 'https://ojhabikash.com.np',
      },
      {
        name: 'Harsh Malviya',
        role: 'Jr product designer',
        image: profileHarsh.src,
        imageClassName: '!wb-object-contain',
        linkedin: 'harsh-malviya-a232011a0',
        x: 'lucnerf_harsh',
        github: 'malviyaharsh',
      },
    ],
  },
  helpandsupport: {
    kloudliteOverviewFaqs: {
      general: {
        label: 'General Questions',
        icon: Question,
        to: '/docs/faq/general-questions',
        items: [
          {
            title: 'What is Kloudlite?',
            desc: 'Kloudlite is a platform that provides seamless and secure development environments for building distributed applications. It connects developer’s workspaces(local/remote) with remote Kubernetes environments using WireGuard, ensuring full development and production parity.',
          },
          {
            title: 'How does Kloudlite help developers?',
            desc: 'Kloudlite enhances productivity by enabling developers to work in environments that mirror production settings. It provides unified network interface eliminating the need for local setups. It supports collaborative coding and service interception for testing and debugging.',
          },
          {
            title: 'Who can benefit from using Kloudlite?',
            desc: 'Kloudlite is ideal for developers building distributed applications, teams needing consistent development environments, and organizations looking to streamline their development workflows and improve productivity.',
          },
        ],
      },
      setupConfiguration: {
        label: 'Setup & Configuration',
        icon: Config,
        to: '/docs/faq/setup-configuration',
        items: [
          {
            title: 'How do I setup Kloudlite?',
            desc: (
              <div className="wb-inline-block">
                <span>
                  Setting up Kloudlite involves creating a cluster reference on
                  the Kloudlite dashboard, attaching your cluster, and
                  configuring local development containers to connect to the
                  environment. you can follow these instructions
                </span>
                <Button
                  content="https://kloudlite.io/docs/getting-started."
                  to="https://kloudlite.io/docs/getting-started"
                  toLabel="href"
                  linkComponent={Link}
                  variant="primary-plain"
                  size="sm"
                  className="wb-align-middle !wb-inline"
                />
              </div>
            ),
          },
          {
            title: 'What are the requirements for using Kloudlite?',
            desc: (
              <div className="wb-inline-block">
                <span>
                  You need a Kubernetes cluster to run environments and local
                  container runtime to run your workspace. Detailed setup
                  instructions are provided in our documentation
                </span>
                <Button
                  content="https://kloudlite.io/docs/getting-started."
                  to="https://kloudlite.io/docs/getting-started"
                  toLabel="href"
                  linkComponent={Link}
                  variant="primary-plain"
                  size="sm"
                  className="wb-align-middle !wb-inline"
                />
              </div>
            ),
          },
          {
            title: 'Does Kloudlite provide us compute?',
            desc: "No, Kloudlite doesn't yet provide compute.",
          },
          {
            title: 'Does Kloudlite manage Kubernetes clusters?',
            desc: 'No, Kloudlite does not manage Kubernetes clusters. It runs environments within the clusters connected through WireGuard.',
          },
        ],
      },
      featureCapabilities: {
        label: 'Features & Capabilities',
        icon: Star,
        to: '/docs/faq/feature-capabilities',
        items: [
          {
            title: 'What are managed services in Kloudlite?',
            desc: 'Managed services are stateful backing services running on attached clusters. They allow you to create and use resources like databases within your development environments.',
          },
          {
            title: 'Can I collaborate with other developers using Kloudlite?',
            desc: 'Yes, Kloudlite supports collaborative coding by allowing multiple developers to work in the same environment simultaneously.',
          },
          {
            title:
              'How does Kloudlite ensure full development and production parity?',
            desc: 'Kloudlite aligns all external variables, such as network setups and environment configurations, to match production settings exactly. This ensures that your development environment mirrors the production environment.',
          },
        ],
      },
      plansPricing: {
        label: 'Plans & Pricing',
        icon: Money,
        to: '/docs/faq/plans-pricing',
        items: [
          {
            title: 'For Developers',
            desc: 'Kloudlite Free Plan is available to any developer, offering access to core features suitable for individuals or teams.',
          },
          {
            title: 'For Organizations',
            desc: 'The Scale Plan, is geared towards enterprise teams where governance and compliance are critical. This plan includes features like Role-Based Access Control (RBAC), audit logging, and prioritization in support, and is priced at $20 per user per month.',
          },
        ],
      },
      onboarding: {
        label: 'Onboarding',
        icon: RocketLaunch,
        to: '/docs/faq/ai-ml-workflows',
        items: [
          {
            title: 'How do i start using Kloudlite?',
            desc: 'You can sign up for a free Kloudlite account and start using the platform right away. Follow the Getting Started guide to begin your journey with Kloudlite.',
          },
          {
            title: 'Where will my environments run?',
            desc: 'kloudlite creates environments in your kubernetes cluster. You can choose to run your environments on a public or private cloud.',
          },
          {
            title: 'Can I host entire kloudlite platform?',
            desc: (
              <div className="wb-inline-block">
                <span>
                  You can host kloudlite on your own infrastructure, giving you
                  full control over the platform. Follow the setup instructions
                  from
                </span>
                <Button
                  content="this repo"
                  to="https://github.com/kloudlite/helm-charts"
                  toLabel="href"
                  linkComponent={Link}
                  variant="primary-plain"
                  size="sm"
                  className="wb-align-middle !wb-inline"
                />
                <span>to get started.</span>
              </div>
            ),
            // desc: 'You can host kloudlite on your own infrastructure, giving you full control over the platform. Follow the setup instructions from this repo to get started.',
          },
        ],
      },
      troubleshootingSupport: {
        label: 'Troubleshooting & Support',
        icon: PhoneCall,
        to: '/docs/faq/troubleshooting-support',
        items: [
          {
            title: 'Where can I find support for Kloudlite?',
            desc: 'You can access support through our dedicated support channels, available to all users. Users on the Scale Plan receive prioritization in support requests.',
          },
          {
            title: 'What should I do if I encounter issues during setup?',
            desc: 'If you encounter any issues during setup, refer to our detailed documentation or contact our support team for assistance.',
          },
        ],
      },
    },
  },
  searchSuggestions: [
    {
      title: 'Getting started',
      desc: 'Documentation',
      link: '/docs/getting-started',
    },
  ],
  docs: {
    basicConcepts: {
      gridLinks: [
        {
          title: 'Workspaces',
          to: '/docs/basic-concepts/workspaces',
        },
        {
          title: 'Environments',
          to: '/docs/basic-concepts/environments',
        },
        {
          title: 'Development Loop',
          to: '/docs/basic-concepts/development-loop',
        },
        {
          title: 'Remote Local',
          to: '/docs/basic-concepts/remote-local',
        },
      ],
    },
    ideIntegrate: {
      gridLinks: [
        {
          title: 'SSH Access',
          to: '/docs/ide-integrations/ssh-access',
        },
        {
          title: 'VSCode',
          to: '/docs/ide-integrations/vscode',
        },
        {
          title: 'Intellij',
          to: '/docs/ide-integrations/intellij',
        },
      ],
    },
    contribute: {
      gridLinks: [
        {
          title: 'Code of Conduct',
          to: '/docs/contributing/code-of-conduct',
        },
        {
          title: 'Feature Stages',
          to: '/docs/contributing/feature-stages',
        },
        {
          title: 'Documentation',
          to: '/docs/contributing/documentation',
        },
        {
          title: 'Security',
          to: '/docs/contributing/security',
        },
        {
          title: 'Frontend',
          to: '/docs/contributing/frontend',
        },
      ],
    },
  },
  eventBanner: {
    message: (
      <>
        <div className="xl:wb-block wb-hidden">
          Code Unbound: No Builds,No Deploys. The New Era of Development
        </div>
        <div className="xl:wb-hidden">
          Code Unbound:{' '}
          <span className="wb-block md:wb-inline">No Builds,No Deploys.</span>
        </div>
      </>
    ),
    time: '12:15-1:15 pm',
    date: 'Sep 21, 2024',
    enabled: false,
    linkContent: 'Register today',
    link: `${webinarUrl}/code-unbound-new-age-development-environments/join`,
  },
  contactUs: {
    cookies: {
      submitCookie: 'contact-form-submitted',
      cookieTime: 5,
    },
  },
};

export default consts;
