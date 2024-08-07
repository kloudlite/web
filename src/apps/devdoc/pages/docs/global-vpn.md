# Global VPN
For each team created in Kloudlite, an associated WireGuard network is set up. This network allows all workloads within it to communicate seamlessly.

Any cluster or device connected to the Kloudlite team can access Kloudlite services (apps and integrated services) running on the clusters, regardless of cloud provider, region, or NAT configuration.

<!-- Image of different environments in differnet clusters, devices connected under same kloudlite environment -->

Services created under environments and integrated services are assigned unique IP addresses and can be discovered using unique domain names.

Each device connected to the Kloudlite team is also given a unique IP address and a discoverable name.

This seamless networking enables Kloudlite to create robust development environments that can operate anywhere and share workloads effectively.