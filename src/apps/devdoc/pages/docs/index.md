# What is kloudlite?

Kloudlite is a Development Environment As a Service (DEaaS) platform that provides seamless integration between developer's 
workspaces and remote development environments running in Kubernetes clusters.

### Why use kloudlite?
Modern applications have become increasingly distributed. This complexity has made development more challenging, with longer 
development loops and greater difficulty in managing these applications. 

Kloudlite reduces the need for lengthy build and deployment cycles, allowing developers to focus on coding and innovation, 
thereby improving productivity and efficiency.

### Key Features
- **No Build Or Deploy in Development Cycle:** Development workspaces are connected to running environments over the network, 
there is no need for building and deploying the application to start testing
- **Easy to switch environments:** Development workspaces can switch easily between connected environments. There is no need 
to change configs or any connection parameters
- **Ephemeral Environments:** Environments are stateless & ephemeral, allowing for easy cloning and independent work on features. 
Multiple developers can run their own environments simultaneously.
- **Integrated Services:** Supports creating stateful backing services on attached clusters. Allows importing these resources, 
like databases, into environments for use.
- **Dev Containers:** Containers with SSH servers run locally, enabling IDE attachment for development. Dependencies are managed 
using the Nix package manager.
- **Collaboration and Debugging:** Supports collaborative coding with multiple developers working on features across multiple 
services. Developers can intercept apps running inside the environment for testing and debugging.

Kloudlite is designed to optimise development workflows, enhance productivity, and provide a seamless, integrated development 
environment.
