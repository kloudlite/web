# App Intercepts

Kloudlite provide a unique way for developers to shorten the development cycles. We can now intercept any running app in the environmnet with the workspace that is connected.

All the traffic to the application will be directed to the workspace.

With this feature we can now avoid building and deploying the applications into environments to test. You can intercept any application using following commands and start
debugging and testing.

```bash
kl intercept start -p <remote-port>:<local-port>
```

This command will prompt to choose the application from the list of available applications in the environment.

> Note: All apps in the environment & workspaces connected to the environment will route to the intercepting workspace when attempting to access the intercepted application.

You can remove intercept from the dashboard or the following command

```bash
kl intercept stop
```

![app-intercept](https://github.com/user-attachments/assets/c40ea345-a855-4b06-9383-67d52c25fcdb)

