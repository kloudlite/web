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
} from '@jengaicons/react';
import devopsIcon from '../../images/home/devops.svg';
import infraopsIcon from '../../images/home/infraops.svg';
import distributionIcon from '../../images/home/distribution.svg';

const consts = {
  home: {
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
    tutorials: [
      {
        title: 'Get started with Kl-InfraOps',
      },
      {
        title: 'Keep building with Kl-DevOps',
      },
      {
        title: 'Explore further into Kl-Distribution',
      },
    ],
    suites: [
      {
        title: 'Kl-DevOps',
        desc: 'Environments crafted for development and production workloads',
        img: <img src={devopsIcon.src} className="" />,
        imgPad:
          'p-3xl md:!max-h-[200px] md:!min-h-[200px] lg:!min-h-[244px] lg:!max-h-[244px] 3xl:!min-h-[280px] lg:!py-5xl 3xl:!py-4xl box-border w-auto',
        to: 'devops',
      },
      {
        title: 'Kl-InfraOps',
        desc: 'Cloud agnostic & cost effective infrastructure management at your fingertips',
        imgPad:
          'p-3xl md:!max-h-[200px] md:!min-h-[200px] lg:!min-h-[244px] lg:!max-h-[244px] 3xl:!min-h-[280px] lg:!py-5xl 3xl:!py-4xl box-border w-auto',
        img: <img src={infraopsIcon.src} className="" />,
        to: 'infraops',
      },
      {
        title: 'Kl-Distribution',
        desc: 'Build system and package registries to build and ship your environments',
        imgPad:
          'p-3xl md:!max-h-[200px] md:!min-h-[200px] lg:!min-h-[244px] lg:!max-h-[244px] 3xl:!min-h-[280px] lg:!py-5xl 3xl:!py-4xl box-border w-auto',
        img: <img src={distributionIcon.src} className="" />,
        to: 'distribution',
      },
    ],
  },
  infraops: {
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
};

export default consts;
