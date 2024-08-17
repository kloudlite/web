---
title: "Uninstalling Kloudlite: Step-by-Step Guide"
metaTitle: "Kloudlite Uninstallation Guide: Complete Removal Instructions"
description: "Learn how to properly uninstall Kloudlite from your system. This guide provides clear, step-by-step instructions to ensure a complete and clean removal of Kloudlite components"
---

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