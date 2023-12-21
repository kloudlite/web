import {
  AWSlogo,
  AzurelogoFill,
  Cpu,
  DigitalOceanlogoFill,
} from '@jengaicons/react';

const consts = {
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
        icon: Cpu,
        label: 'Infra as Code (IaC)',
      },
      {
        icon: Cpu,
        label: 'GPU ready',
      },
      {
        icon: Cpu,
        label: 'Liquid compute',
      },
      {
        icon: Cpu,
        label: 'Nodeless wonders',
      },
      {
        icon: Cpu,
        label: 'Cost monitoring',
      },
      {
        icon: Cpu,
        label: 'Spot management',
      },
      {
        icon: Cpu,
        label: 'Custom observability',
      },
      {
        icon: Cpu,
        label: 'Flexible nodepools',
      },
      {
        icon: Cpu,
        label: 'Cloud agnostic',
      },
      {
        icon: Cpu,
        label: 'VPN access',
      },
      {
        icon: Cpu,
        label: 'SSL-Enabled ingress',
      },
      {
        icon: Cpu,
        label: 'NoOps Kubernetes',
      },
    ],
  },
  devops: {
    advantages: [
      {
        label: 'Faster development',
        id: 'faster-dev',
        desc: 'Automation of environment setup ensures faster developer inner loops',
      },
      {
        label: 'Seamless environments',
        id: 'seamless-env',
        desc: 'Setup, configure, deploy, and observe environments with ease',
      },
      {
        label: 'Trouble-free maintenance',
        id: 'trouble-free',
        desc: 'Automated infrastructure management & analytics-driven maintenance',
      },
      {
        label: 'Embedded data security',
        id: 'embedded-data',
        desc: 'Out of the box SSL ensures encryption of your data at rest or in motion with ease',
      },
    ],
    features: [
      {
        icon: Cpu,
        label: 'Smart Observability',
      },
      {
        icon: Cpu,
        label: 'Flexible Autoscaling',
      },
      {
        icon: Cpu,
        label: 'VPN Connectivity',
      },
      {
        icon: Cpu,
        label: 'Ingress Routing',
      },
      {
        icon: Cpu,
        label: 'Ephemeral Workspaces',
      },
      {
        icon: Cpu,
        label: 'Multi-tenant Environments',
      },
      {
        icon: Cpu,
        label: 'Pre-deployment Testing',
      },
      {
        icon: Cpu,
        label: 'Start & Stop on-demand',
      },
      {
        icon: Cpu,
        label: 'Custom Env & Workspaces',
      },
      {
        icon: Cpu,
        label: 'Secure Config Management',
      },
      {
        icon: Cpu,
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
        icon: Cpu,
        label: 'Enhanced Security',
      },
      {
        icon: Cpu,
        label: 'Build Native System',
      },
      {
        icon: Cpu,
        label: 'Lazy Image Distribution',
      },
      {
        icon: Cpu,
        label: 'Container Registry Management',
      },
      {
        icon: Cpu,
        label: 'Source Integration',
      },
      {
        icon: Cpu,
        label: 'Automated Build Process',
      },
      {
        icon: Cpu,
        label: 'Image Deployment Automation',
      },
      {
        icon: Cpu,
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
