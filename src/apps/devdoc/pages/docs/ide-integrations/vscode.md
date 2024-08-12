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


