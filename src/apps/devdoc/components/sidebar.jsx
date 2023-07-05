export const Sidebar = ()=>{
    return <div className={"overflow-scroll fixed bottom-0 top-docHeaderHeight w-docSidebarWidth left-[max(0px,calc(50%-40rem))]"}>
        <div>
            <div>Getting Started</div>
            <ul>
                <li>- Create Cluster</li>
                <li>- Setup Project</li>
                <li>- Create Database</li>
                <li>- Setup Application</li>
                <li>- Configs & Secrets</li>
            </ul>
        </div>
        <div>
            <div>Developer Inner Loop Management</div>
            <ul>
                <li>- VPN into the cluster</li>
                <li>- Sync Configs & Secrets</li>
                <li>- Local project Setup</li>
            </ul>
        </div>
        <div>
            <div>Platform Engineering</div>
            <ul>
                <li>Clusters</li>
                <li>Autoscaling</li>
                <li>Cost Optimisation</li>
                <li>
                    <div>Supported Providers</div>
                    <ul>
                        <li>AWS</li>
                        <li>GCP</li>
                        <li>Azure</li>
                        <li>Digital Ocean</li>
                        <li>Linode</li>
                        <li>Hetzner</li>
                    </ul>
                </li>
                <li>Self Managed Services</li>
            </ul>
        </div>
        <div>
            <div>Domain Management</div>
        </div>
        <div>
            <div>Storage</div>
        </div>
    </div>
}