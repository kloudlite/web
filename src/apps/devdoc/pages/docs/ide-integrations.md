# IDE Integrations
Users can connect to their workspace using different IDEs. Below are the ways to connect those IDEs with their development container.

## SSH Access

When the workspace is running you will be able to get the information of running container using `kl box info` command.

You will be provided command to connect to ssh in info section.

You can also use `kl box ssh` command to directly access ssh.



https://github.com/user-attachments/assets/7d494354-8c27-4dc6-b80d-2deb8bbbfaf2






## Intellij
You can access workspace remotely by using remote development in intellij.

### Follw below steps to connect your workspace with intellij:

- Ensure workspace is running.
`kl box info` command will give output of running workspace in the working directory.
If not running use `kl box start` to start the workspace
- Get workspace info using `kl box info` command
- User host, username, ssh port from the info to create SSH connection in intellij
- Create intellij project under `/workspace` directory of the container.

https://github.com/user-attachments/assets/822b2f1f-86ac-4b73-8a37-989f1d3960d2


## VSCode
You can access workspace remotely by using remote ssh in vscode.

### Follw below steps to connect your workspace with vscode:

- Ensure workspace is running.
`kl box info` command will give output of running workspace in the working directory.
If not running use `kl box start` to start the workspace
- Get workspace info using `kl box info` command
- User host, username, ssh port from the info to create SSH connection in VSCode
- Open `/workspace` directory of the container.

Now you are good to open your workspace in vscode to start your development.

https://github.com/user-attachments/assets/c488a57d-be5a-4f0d-9dc9-1f2c716c872f


