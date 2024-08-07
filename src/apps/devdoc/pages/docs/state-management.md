# Workspace Management

Your workspace maintains its state based on the following factors:

1. Environment variables (envvars) and their values
2. Mounted config files and their contents
3. Installed packages
4. The environment workspace is connected to

## Environment Variables (Envvars)
You can load environment variables from the configs and secrets of the Kloudlite environment using the following commands:

```bash
kl add config
```

```bash
kl add secret
```

```bash
kl add res
```

These commands will prompt you to choose the config, secret, or resource and keys to be loaded, adding references to the `kl.yml` file. You can use these commands both inside and outside the development container. 

To update the environment variables you can also modify the `kl.yml` file and run `kl box reload`

## Config Files
You can create config files from the configs and secrets of the Kloudlite environment using the following command:

```bash
kl add config-mount <file-path>
```

This command will prompt you to choose the config and keys to be mounted, adding references and the mount filepath to the `kl.yml` file. You can use this command both inside and outside the development container.

You can also modify the `kl.yml` file and run `kl box reload`

## Packages
Add dependent packages with the following command, which will download the necessary Nix packages and update the PATH variable:

```bash
kl pkg add <packagename>
```

This command will prompt you to choose the package and version to be installed, adding the package reference to the `kl.yml` file. You can use this command only from inside the development container. 

To install packages you can also modify the `kl.yml` file and run `kl box reload`

## Kloudlite Environment
Switch between environments using the following command:

```bash
kl use env
```

This command will prompt you to choose the environment and update env-vars, config mounts, and network settings accordingly. Note that this command will not change the `kl.yml` file. It can only be used from inside the development container.

### State Reload
Reload the state after changing the `kl.yml` file and check for backend changes with the following command:

```bash
kl box reload
```

### Restart on State Change
When there is a change in the environment, your shell prompt will indicate that you need to restart the container to ensure all processes are in the same state. Use the following command to restart the container:

```bash
kl box restart
```
