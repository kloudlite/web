# Uninstall 

Follow below steps to uninstall kl:

```bash
# Stop all running workspaces
kl box stop-all

# find kl binary path
whereis kl

# Remove kl binary
rm -rf <kl_binary_path>

# Remove kl cache
rm -rf ~/.cache/kl

# Remove docker volumes
docker volume rm kl-home-cache kl-nix-store kl-nix-home-cache
```