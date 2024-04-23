import {
  AWSlogo,
  Autoscaling,
  AzurelogoFill,
  BackingServices,
  Binoculars,
  ChartBar,
  CloudAgnostics,
  Config,
  Container,
  CostMonitoring,
  Cpu,
  CustomEnv,
  DigitalOceanlogoFill,
  FlexibleNodepool,
  HelmLogo,
  HourglassSimpleHigh,
  InfraAsCode,
  LiquidCompute,
  LockKey,
  MultiTenant,
  NoOps,
  Nodeless,
  PlayPause,
  RocketLaunch,
  Search,
  SecureConfig,
  ShieldCheck,
  ShuffleAngular,
  SpotManagement,
  TreeStructure,
  TwitterNewLogo,
  Vpn,
  Infinity as InfinityIcon,
  AnscerRoboticsLogo,
  BoltchemLogo,
  PlaxonicLogo,
  Agritech,
  Robot,
  Flask,
  DesktopTower,
} from '@jengaicons/react';

import providersImageMobile from '~/images/infraops/providers/mobile.svg';
import providersImage768 from '~/images/infraops/providers/768.svg';
import providersImage1024 from '~/images/infraops/providers/1024.svg';
import providersImage1280 from '~/images/infraops/providers/1280.svg';
import providersImage1440 from '~/images/infraops/providers/1440.svg';
import providersImage1920 from '~/images/infraops/providers/1920.svg';

import clusterImageMobile from '~/images/infraops/clusters/mobile.svg';
import clusterImage768 from '~/images/infraops/clusters/768.svg';
import clusterImage1024 from '~/images/infraops/clusters/1024.svg';
import clusterImage1280 from '~/images/infraops/clusters/1280.svg';
import clusterImage1440 from '~/images/infraops/clusters/1440.svg';
import clusterImage1920 from '~/images/infraops/clusters/1920.svg';

import deployImageMobile from '~/images/infraops/deploy/mobile.svg';
import deployImage768 from '~/images/infraops/deploy/768.svg';
import deployImage1024 from '~/images/infraops/deploy/1024.svg';
import deployImage1280 from '~/images/infraops/deploy/1280.svg';
import deployImage1440 from '~/images/infraops/deploy/1440.svg';
import deployImage1920 from '~/images/infraops/deploy/1920.svg';

import repoImageMobile from '~/images/distribution/repo/mobile.svg';
import repoImage768 from '~/images/distribution/repo/768.svg';
import repoImage1024 from '~/images/distribution/repo/1024.svg';
import repoImage1280 from '~/images/distribution/repo/1280.svg';
import repoImage1440 from '~/images/distribution/repo/1440.svg';
import repoImage1920 from '~/images/distribution/repo/1920.svg';
import featuredImageMobile from '~/images/home/featured/mobile.svg';
import featuredImage768 from '~/images/home/featured/768.svg';
import featuredImage1024 from '~/images/home/featured/1024.svg';
import featuredImage1280 from '~/images/home/featured/1280.svg';
import featuredImage1440 from '~/images/home/featured/1440.svg';
import featuredImage1920 from '~/images/home/featured/1920.svg';
import RedPlutoIcon from '~/images/home/companies/red.svg';
import FibrIcon from '~/images/home/companies/fibr.svg';
import PlaxonicIcon from '~/images/home/companies/plaxonic.svg';
import CrewIcon from '~/images/home/companies/crew.svg';
import BoltzIcon from '~/images/home/companies/boltz.svg';
import TalescaleIcon from '~/images/home/companies/talescale.svg';
import distributionIcon from '~/images/home/distribution.svg';
import infraopsIcon from '~/images/home/infraops.svg';
import devopsIcon from '~/images/home/devops.svg';
import AnscerIcon from '~/images/home/companies/anser.svg';
import BlogCover from '~/images/blog/blog-cover.jpeg';

import CreateProject1920 from '~/images/devops/create_project/1980.svg';
import CreateProject1440 from '~/images/devops/create_project/1440.svg';
import CreateProject1280 from '~/images/devops/create_project/1280.svg';
import CreateProject1024 from '~/images/devops/create_project/1024.svg';
import CreateProject768 from '~/images/devops/create_project/768.svg';
import CreateProjectMobile from '~/images/devops/create_project/mobile.svg';

import SetupBackSVC1980 from '~/images/devops/setup_back_svc/1920.svg';
import SetupBackSVC1440 from '~/images/devops/setup_back_svc/1440.svg';
import SetupBackSVC1280 from '~/images/devops/setup_back_svc/1280.svg';
import SetupBackSVC1024 from '~/images/devops/setup_back_svc/1024.svg';
import SetupBackSVC768 from '~/images/devops/setup_back_svc/768.svg';
import SetupBackSVCMobile from '~/images/devops/setup_back_svc/mobile.svg';

import ConfigDevops from '~/images/devops/config-devops.svg';
import DeployDevops from '~/images/devops/deploy-devops.svg';

const partners = [
  {
    icon: PlaxonicIcon.src,
    className: 'w-[135px]',
  },
  {
    icon: FibrIcon.src,
    className: 'w-[102px]',
  },
  {
    icon: RedPlutoIcon.src,
    className: 'w-[202px]',
  },
  {
    icon: CrewIcon.src,
    className: 'w-[163px]',
  },
  {
    icon: AnscerIcon.src,
    className: 'w-[135px]',
  },
  {
    icon: BoltzIcon.src,
    className: 'w-[190px]',
  },
  {
    icon: TalescaleIcon.src,
    className: 'w-[186px]',
  },
];

const consts = {
  blog: {
    images: {
      cover: BlogCover.src,
    },
  },
  home: {
    partners,
    teamTasks: [
      {
        title: 'Develop, Git Push',
        color: '#2563EB',
      },
      {
        title: 'CI/CD',
        color: '#D97706',
      },
      {
        title: 'DevOps',
        color: '#2563EB',
      },
      {
        title: 'Environments',
        color: '#16A34A',
      },
      {
        title: 'Run Local Env',
        color: '#16A34A',
      },
      {
        title: 'Backups & Rollbacks',
        color: '#2563EB',
      },
      {
        title: 'Configs & Secrets',
        color: '#2563EB',
      },
      {
        title: 'Global CDN',
        color: '#16A34A',
      },
      {
        title: 'Managed Services',
        color: '#2563EB',
      },
      {
        title: 'Domain management',
        color: '#16A34A',
      },
    ],
    messages: [
      {
        title: 'Astroman',
        subtitle: 'subtitle',
        company: <TwitterNewLogo size={24} />,
        message:
          'We use @Kloudlite on a daily basis for several internal processes, and I cannot rave enough about them. Incredible flexibility and features combined with super intuitive UI',
        time: '10:01 PM · Apr 7, 2022',
      },
      {
        title: 'Astroman 1',
        subtitle: 'subtitle',
        company: <TwitterNewLogo size={24} />,
        message:
          'We use @Kloudlite on a daily basis for several internal processes, and I cannot rave enough about them. Incredible flexibility and features combined with super intuitive UI',
        time: '10:01 PM · Apr 7, 2022',
      },
      {
        title: 'Astroman 2',
        subtitle: 'subtitle',
        company: <TwitterNewLogo size={24} />,
        message:
          'We use @Kloudlite on a daily basis for several internal processes, and I cannot rave enough about them. Incredible flexibility and features combined with super intuitive UI',
        time: '10:01 PM · Apr 7, 2022',
      },
    ],
    images: {
      featured: {
        rmobile: featuredImageMobile.src,
        r768: featuredImage768.src,
        r1024: featuredImage1024.src,
        r1280: featuredImage1280.src,
        r1440: featuredImage1440.src,
        r1920: featuredImage1920.src,
      },
    },
    tutorials: [
      {
        title: 'Keep building with DevOps',
        icon: InfinityIcon,
        to: '/devops',
        type: 'normal',
      },
      {
        title: 'Keep building with InfraOps',
        icon: CloudAgnostics,
        to: '/infraops',
        type: 'normal',
      },
      {
        title: 'Keep building with Distribution',
        icon: Container,
        to: '/distribution',
        type: 'normal',
      },
      {
        title: 'And more...',
        to: '/more',
        type: 'more',
      },
    ],
    suites: [
      {
        title: 'DevOps',
        desc: 'Environments crafted for development and production workloads',
        img: <img src={devopsIcon.src} className="" />,
        imgPad:
          'p-3xl md:!max-h-[200px] md:!min-h-[200px] lg:!min-h-[244px] lg:!max-h-[244px] 3xl:!min-h-[280px] lg:!py-5xl 3xl:!py-4xl box-border w-auto',
        to: 'devops',
      },
      {
        title: 'InfraOps',
        desc: 'Cloud agnostic & cost effective infrastructure management at your fingertips',
        imgPad:
          'p-3xl md:!max-h-[200px] md:!min-h-[200px] lg:!min-h-[244px] lg:!max-h-[244px] 3xl:!min-h-[280px] lg:!py-5xl 3xl:!py-4xl box-border w-auto',
        img: <img src={infraopsIcon.src} className="" />,
        to: 'infraops',
      },
      {
        title: 'Distribution',
        desc: 'Build system and package registries to build and ship your environments',
        imgPad:
          'p-3xl md:!max-h-[200px] md:!min-h-[200px] lg:!min-h-[244px] lg:!max-h-[244px] 3xl:!min-h-[280px] lg:!py-5xl 3xl:!py-4xl box-border w-auto',
        img: <img src={distributionIcon.src} className="" />,
        to: 'distribution',
      },
    ],
  },
  infraops: {
    getStartedImages: {
      createCluster: {
        rmobile: clusterImageMobile.src,
        r768: clusterImage768.src,
        r1024: clusterImage1024.src,
        r1280: clusterImage1280.src,
        r1440: clusterImage1440.src,
        r1920: clusterImage1920.src,
      },
      attachRepo: {
        rmobile: providersImageMobile.src,
        r768: providersImage768.src,
        r1024: providersImage1024.src,
        r1280: providersImage1280.src,
        r1440: providersImage1440.src,
        r1920: providersImage1920.src,
      },
      accessAndDeploy: {
        rmobile: deployImageMobile.src,
        r768: deployImage768.src,
        r1024: deployImage1024.src,
        r1280: deployImage1280.src,
        r1440: deployImage1440.src,
        r1920: deployImage1920.src,
      },
    },
    advantages: [
      {
        label: 'Simple to use',
        id: 'simple-to-use',
        desc: 'Code your cloud with ease or navigate smoothly through our user-centric dashboards.',
      },
      {
        label: 'Flexible',
        id: 'flexible',
        desc: 'Scale your infrastructure with our smart provisioning that fits your budget & performance requirements.',
      },
      {
        label: 'Cost effective',
        id: 'cost-effective',
        desc: 'Slash your cloud expenses by leveraging spot node pools and scaling precisely according to demand.',
      },
    ],
    getstarted: [
      {
        label: 'Attach your cloud provider',
        id: 'attach',
      },
      {
        label: 'Create cluster',
        id: 'create',
      },
      {
        label: 'Access & deploy',
        id: 'access',
      },
    ],
    providers: [
      {
        icon: DigitalOceanlogoFill,
        label: 'Digital Ocean',
      },
      {
        icon: AWSlogo,
        label: 'Amazon Web Services',
      },
      {
        icon: AzurelogoFill,
        label: 'Azure',
      },
    ],
    features: [
      {
        icon: InfraAsCode,
        label: 'Infra as Code (IaC)',
      },
      {
        icon: Cpu,
        label: 'GPU Ready',
      },
      {
        icon: LiquidCompute,
        label: 'Liquid Compute',
      },
      {
        icon: Nodeless,
        label: 'Nodeless Wonders',
      },
      {
        icon: CostMonitoring,
        label: 'Cost Monitoring',
      },
      {
        icon: SpotManagement,
        label: 'Spot Management',
      },
      {
        icon: ChartBar,
        label: 'Custom Observability',
      },
      {
        icon: FlexibleNodepool,
        label: 'Flexible Nodepools',
      },
      {
        icon: CloudAgnostics,
        label: 'Cloud Agnostic',
      },
      {
        icon: Vpn,
        label: 'VPN Access',
      },
      {
        icon: ShieldCheck,
        label: 'SSL-Enabled Ingress',
      },
      {
        icon: NoOps,
        label: 'NoOps Kubernetes',
      },
    ],
  },
  devops: {
    images: {
      getStartedImages: {
        setupBackingSvc: {
          rmobile: SetupBackSVCMobile.src,
          r768: SetupBackSVC768.src,
          r1024: SetupBackSVC1024.src,
          r1280: SetupBackSVC1280.src,
          r1440: SetupBackSVC1440.src,
          r1920: SetupBackSVC1980.src,
        },
        createProject: {
          rmobile: CreateProjectMobile.src,
          r768: CreateProject768.src,
          r1024: CreateProject1024.src,
          r1280: CreateProject1280.src,
          r1440: CreateProject1440.src,
          r1920: CreateProject1920.src,
        },
        configDevops: {
          rmobile: ConfigDevops.src,
          r768: ConfigDevops.src,
          r1024: ConfigDevops.src,
          r1280: ConfigDevops.src,
          r1440: ConfigDevops.src,
          r1920: ConfigDevops.src,
        },
        deployDevops: {
          rmobile: DeployDevops.src,
          r768: DeployDevops.src,
          r1024: DeployDevops.src,
          r1280: DeployDevops.src,
          r1440: DeployDevops.src,
          r1920: DeployDevops.src,
        },
      },
    },
    advantages: [
      {
        label: (
          <div>
            Faster
            <br />
            development
          </div>
        ),
        id: 'faster-dev',
        desc: 'Automation of environment setup ensures faster developer inner loops',
      },
      {
        label: (
          <div>
            Seamless
            <br /> environments
          </div>
        ),
        id: 'seamless-env',
        desc: 'Setup, configure, deploy, and observe environments with ease',
      },
      {
        label: (
          <div>
            Trouble-free
            <br /> maintenance
          </div>
        ),
        id: 'trouble-free',
        desc: 'Automated infrastructure management & analytics-driven maintenance',
      },
      {
        label: (
          <div>
            Embedded data
            <br /> security
          </div>
        ),
        id: 'embedded-data',
        desc: 'Out of the box SSL ensures encryption of your data at rest or in motion with ease',
      },
    ],
    features: [
      {
        icon: Binoculars,
        label: 'Smart Observability',
      },
      {
        icon: Autoscaling,
        label: 'Flexible Autoscaling',
      },
      {
        icon: Vpn,
        label: 'VPN Connectivity',
      },
      {
        icon: ShuffleAngular,
        label: 'Ingress Routing',
      },
      {
        icon: HourglassSimpleHigh,
        label: 'Ephemeral Workspaces',
      },
      {
        icon: MultiTenant,
        label: 'Multi-tenant Environments',
      },
      {
        icon: Search,
        label: 'Pre-deployment Testing',
      },
      {
        icon: PlayPause,
        label: 'Start & Stop on-demand',
      },
      {
        icon: CustomEnv,
        label: 'Custom Env & Workspaces',
      },
      {
        icon: SecureConfig,
        label: 'Secure Config Management',
      },
      {
        icon: BackingServices,
        label: 'Comprehensive Backing Services',
      },
    ],
    getstarted: [
      {
        label: 'Create project',
        id: 'create',
      },
      {
        label: 'Setup backing service',
        id: 'setup',
      },
      {
        label: 'Deploy application',
        id: 'deploy',
      },
      {
        label: 'Configure ingress & go-live',
        id: 'config',
      },
    ],
  },
  distribution: {
    getStartedImages: {
      repo: {
        rmobile: repoImageMobile.src,
        r768: repoImage768.src,
        r1024: repoImage1024.src,
        r1280: repoImage1280.src,
        r1440: repoImage1440.src,
        r1920: repoImage1920.src,
      },
    },
    features: [
      {
        icon: LockKey,
        label: 'Enhanced Security',
      },
      {
        icon: Config,
        label: 'Build Native System',
      },
      {
        icon: MultiTenant,
        label: 'Lazy Image Distribution',
      },
      {
        icon: Container,
        label: 'Container Registry Management',
      },
      {
        icon: TreeStructure,
        label: 'Source Integration',
      },
      {
        icon: NoOps,
        label: 'Automated Build Process',
      },
      {
        icon: RocketLaunch,
        label: 'Image Deployment Automation',
      },
      {
        icon: HelmLogo,
        label: 'Helm Charts Distribution',
      },
    ],
    getstarted: [
      {
        label: 'Create your repository',
        id: 'create',
      },
      {
        label: 'Push, build & deploy',
        id: 'push',
      },
      {
        label: 'Create & distribute Helm ',
        id: 'distribute',
      },
    ],
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
    clients: partners,
  },
};

export default consts;
