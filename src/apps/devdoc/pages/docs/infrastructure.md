# Infrastructure

You can add two kinds of infrastructures in Kloudlite: Clusters and Devices.

## Kubernetes Clusters
Kloudlite is compatible with all modern Kubernetes distributions, including Amazon's EKS, 
Google Cloud's GKE, and lightweight options like k3s, k3d, and kind. This flexibility allows 
developers to easily integrate Kloudlite with any Kubernetes platform.

Once a cluster is attached, Kloudlite agents will run to set up the network and environments. 
These agents are responsible for creating and updating resources and sending status updates to the
Kloudlite platform.

![area2](https://github.com/user-attachments/assets/0364a0ef-a4f0-4352-961d-3071f531b69e)

![highq](https://github.com/user-attachments/assets/4e3a8d91-d5d1-4ee3-8e60-413459c2c742)

## WireGuard Devices
Since the Kloudlite network is a WireGuard network, you can attach any device that is compatible with
WireGuard. This means you can connect a wide variety of devices, including mobiles, laptops, and any 
Linux-based systems.

Each device connected is discoverable by a unique name and assigned a unique IP address.

![add-wireguard](https://github.com/user-attachments/assets/b50848dc-3267-480d-9d07-9b235aee142c)


**Note:** You can attach multiple clusters under a team. All these clusters will be part of a WireGuard 
mesh, allowing any device under the Kloudlite team to access environment apps or integrated services from 
all clusters.

These infrastructure components of Kloudlite play a crucial role in the creation of Environments and Workspaces.
