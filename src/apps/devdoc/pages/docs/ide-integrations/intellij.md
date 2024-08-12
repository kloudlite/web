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


