# Getting Started

This guide will help you get started with Kloudlite. 
It will show you how to attach your cluster, create an environment, 
set up your workspace to access and intercept services of the environment.

> **Note:** The quickest way to start using Kloudlite is to use our hosted solution. Login and set up your free account.

## Quick start

### Attach Your Cluster

To create development environments and run your workload you need to attach kubernetes cluster to kloudlite.
You can add and manage your cluster references from infrastructure section of kloudlite dashboard.

![attach-cluster](/docs/introduction/attach-cluster.gif)


Once added you can attach your cluster following the instructions provided

![attach-cluster-instructions](/docs/introduction/attach-cluster-instructions.gif)

After attaching the cluster it will take some time to come online. Once the cluster is online it is ready for your
workloads.

> **Important Note:** You need to have capability to run pods with [NetAdmin capililities](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/) for kloudlite to 
run wireguard and intercept services.


### Create and Setup an Environment

Create a new environment in Kloudlite by providing an environment name and the cluster 
reference.

![setup-env](/docs/introduction/setup-env.gif)


#### Once environment is created you can 
Create applications
![create-app](/docs/introduction/create-app.gif)

Manage Configs and Secrets
![manage-config](/docs/introduction/manage-config-secrets.gif)



### Install Kloudlite CLI
Kloudlite CLI is a command line tool that allows you to interact with Kloudlite. 
It provides a set of commands to manage workspaces and access environments.

> **Prerequisites:** kl will run docker containers. Make sure you have docker installed.

##### Install using curl
```bash
curl 'https://kl.kloudlite.io/kloudlite/kl!?select=kl' | bash
```

##### Login to Kloudlite
```bash
kl auth login
```

![kl login](/docs/introduction/setup-kl.gif)

For detailed guide you can refer to [kl repository](https://github.com/kloudlite/kl)

### Set Up Your Workspace

Once `kl` is installed and authenticated, you can set up your workspace to connect to the environment.

##### Choose your workspace directory and create a `kl.yaml` file with the following command:
```bash
mkdir kl-workspace
cd kl-workspace
kl init
```
![kl setup workspace](/docs/introduction/setup-workspace.gif)

You will be prompted to select kloudlite account and the default environment this workspace will connect to. Once selected, a `kl.yml` file with the environment details will be created.

> **Note:** Ensure that you have configs and secrets added to the environment before adding them to the local workspace.

##### You can now add necessary configs, secrets, from the environment to the local workspace with the following commands:

```bash
# Add config to your local workspace
kl add config
```

![kl add config](/docs/introduction/setup-workspace-add-config.gif)


```bash
# Add secret
kl add secret
```

![kl add secret](/docs/introduction/setup-workspace-add-secret.gif)


```bash
# Add configmount
kl add config-mount <file-path>
```
![kl add config-mount](/docs/introduction/setup-workspace-add-config-mount.gif)

### Access & Intercept Environment

As we have configured our workspace you can start and connect to your workspace

##### You can start and access workspace (development container) using the following command:
```bash
kl box ssh
```
![access-intercept-env](/docs/introduction/access-intercept-env.gif)


This command creates a development container and mounts your codebase to it. The container will include all necessary configs, secrets, resources, and packages. You can now start developing your application.

The container runs an SSH service. You can also attach your IDEs like VSCode or IntelliJ to the container and start developing your application.

> **Note:** The running container is already connected to the environment using wireguard. And also service disvovery is configured to resolve the domains of the services in the environment.

As you are in same network now you can access the apps running in the environment using their name.

##### Add necessary packages to the local container using `pkg` command

```bash
# inside development container
kl pkg add nvim

# restart the container to avail the installed package
kl box restart
```

![add-pkg](/docs/introduction/add-packages.gif)

> **Note:** You can search for available packages using `kl pkg search <package-name>` or from [nixhub.io](https://www.nixhub.io/)

##### Intercept the traffic of the apps running in the environment using the following command:
```bash
kl intercept start -p <remote-port>:<local-port>
```
You will be prompted to select the app you want to intercept.

![intercept-app](/docs/introduction/select-app.gif)



Now all the traffic to the remote application running in the environment will be 
intercepted and redirected to the local port. 

##### Use the following command to stop the interception:
```bash
kl intercept stop
```

**For more detailed explanation check reference guide [here](/reference-guide)**
