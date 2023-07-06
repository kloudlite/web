const BaseSidebar = ({items})=>{
    return (
        items.map((item)=>{
            return (
                <div key={item.label}>{item.label}</div>
            )
        })
    )
}

export const Sidebar = ()=>{
    return <BaseSidebar items={[
        {
            label: "INTRODUCTION",
            items: [
                {
                    label: "What is Kloudlite?"
                },
                {
                    label: "How Kloudlite Works?"
                },
                {
                    label: "Basic Concepts"
                }
            ]
        },
    ]} />
}

const _AppSidebar = ()=>{
    return <div className={"overflow-scroll fixed bottom-0 top-docHeaderHeight w-docSidebarWidth left-[max(0px,calc(50%-40rem))]"}>
        <div>
            <div>INTRODUCTION</div>
            <div>What is Kloudlite?</div>
            <div>How Kloudlite Works?</div>
            <div>Basic Concepts</div>
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
            <div>What next?</div>
        </div>
        <div>
            <div>USAGE</div>
            <div>
                <div>INTERFACE</div>
                <div>web</div>
                <div>GitOps</div>
                <div>cli</div>
            </div>
            <div>For Developers</div>
            <ul>
                <li>- New Remote Local!</li>
                <li>- Sync Configs & Secrets</li>
                <li>- Local project Setup</li>
            </ul>
            <div>For Platform Engineers</div>
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
                <li>Domain Management</li>
                <li>Audit Logs</li>
            </ul>
        </div>
        <div>
            <div>SECURITY AND COMPLIANCE</div>
            <div>Backup & Restore</div>
            <div>SOC2</div>
            <div>GDPR</div>
            <div>Encryption</div>
        </div>
        <div>
            <div>USEFUL RESOURCES</div>
            <div>API</div>
            <div>FAQ</div>
            <div>Roadmap</div>
            <div>Github</div>
            <div>Help & Support</div>
        </div>
    </div>
}