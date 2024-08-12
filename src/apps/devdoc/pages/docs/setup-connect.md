# Setup & Connect


## Presequisits

You need to have docker up and running in your system to use kloudlite workspaces. Kloudlite workspace is easy to setup. 
You have to download cli using following commands.

#### Install cli tool
```shell
curl 'https://kl.kloudlite.io/kloudlite/kl!?select=kl' | bash
```

You need to login to connect to your teams.

## Workspace initilisation

You can initilise your kloudlite workspace inside your working directory.

```shell
kl init
```

This command will prompt you to choose your account and default environmnet.

It will create a kl.yml configuration file that contains necessary metadata to setup enviromnet.

## Access & Manage

Once the workspace is initilised you can start the container using following commands

```shell
kl box start
```

This will start the development container that is connected to your remote environment using wireguard. 

This container have a ssh server running and your current working directory mounted on `/workspace/`

```shell
kl box ssh
```

This will open an ssh connection to the development container.

> Note: This command will start the development container if not running.

```shell
kl box stop
```

This will stop the development container.

```shell
kl box restart
```

This command will restart the development container with the updated metadata of kl.yml configuration file.

```shell
kl box info
```

This command will provide information of running development container.

