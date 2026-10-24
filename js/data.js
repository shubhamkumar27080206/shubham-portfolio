/* ------------------------------------------------------------------
   EDIT THIS FILE to update the whole portfolio.
   Everything on the page is rendered from this object.
   Content synced from: Shubham-10oct.pdf
------------------------------------------------------------------- */
window.PORTFOLIO = {
  name: "Shubham Kumar",
  title: "DevOps & Cloud Engineer",
  status: "DevOps & Cloud Engineer · Wipro",
  location: "Gurgaon, India",

  // Contact. Leave github empty to hide the button; set showPhone to true to display your number.
  email: "contact.shubham2702@gmail.com",
  phone: "+91 9709992708",
  showPhone: true,
  whatsapp: "918809783125",   // digits only, with country code (91 = India)
  whatsappText: "Hi Shubham, I found your portfolio and would like to connect.",
  // Extra social links: paste a full URL to show it (empty = hidden)
  social: { github: "", x: "", instagram: "", youtube: "", leetcode: "", medium: "" },
  linkedin: "https://www.linkedin.com/in/shubham-kumar0201199b9",
  github: "",
  resume: "assets/Shubham-Kumar-Resume.pdf",

  // Used to compute "years of experience" automatically (Wipro, Feb 2021 – Present).
  careerStart: "2021-02-01",

  roles: [
    "DevOps & Cloud Engineer",
    "Terraform Infrastructure as Code",
    "CI/CD on Amazon ECS & EKS",
    "Kubernetes, Docker & Helm",
    "Incident, Escalation & RCA (SRE)",
    "Cloud Cost & Capacity Optimization"
  ],

  lead:
    "DevOps and Cloud Operations engineer with 5+ years at Wipro: AWS infrastructure, Terraform IaC, CI/CD automation, Kubernetes, observability, cloud security and root cause analysis, keeping production highly available.",

  summary: [
    "DevOps and Cloud Operations professional with 5+ years of experience at Wipro supporting production workloads, managing incidents and escalations, and operating AWS infrastructure across EC2, ECS, EKS, RDS, Lambda, VPC, Route 53 and CloudWatch. Experienced in Terraform-based Infrastructure as Code, CI/CD automation, Kubernetes, containerized deployments, observability, cloud security and root cause analysis.",
    "I sustain 99.9% uptime for an e-commerce client, reduce MTTR by 30%+, cut deployment time by 40–50% and reduce manual provisioning by 60%+. I enjoy mentoring engineers, documenting runbooks, and communicating findings to business stakeholders. AWS Certified Solutions Architect – Associate, with additional exposure to Azure and GCP."
  ],

  terminal: [
    { cmd: "whoami", out: "shubham-kumar  # AWS Cloud Operations & Support SME" },
    { cmd: "cat focus.txt", out: "incident-mgmt · RCA · IaC · cost-optimisation" },
    { cmd: "uptime --client ecommerce", out: "99.9%  ·  24×7 on-call  ·  within SLA  ✓" },
    { cmd: "terraform plan", out: "Plan: manual provisioning  -60%+  ✓" },
    { cmd: "kubectl get nodes", out: "EKS · AKS · GKE   Ready" },
    { cmd: "aws sts get-caller-identity", out: "Solutions Architect – Associate  ✓" }
  ],

  impact: [
    { prefix: "", value: 99.9, dec: 1, suffix: "%", label: "Uptime sustained", detail: "24×7 production operations for an e-commerce client" },
    { prefix: "", value: 60, suffix: "%+", label: "Less manual provisioning", detail: "Terraform IaC across AWS, Azure & GCP" },
    { prefix: "15–", value: 25, suffix: "%", label: "Cloud spend reduced", detail: "Tagging, budgets, Compute Optimizer, right-sizing" },
    { prefix: "40–", value: 50, suffix: "%", label: "Faster deployments", detail: "Jenkins & GitHub Actions on EKS, EC2, ECS" },
    { prefix: "", value: 30, suffix: "%+", label: "Lower MTTR", detail: "Prometheus, Grafana, Datadog & CloudWatch alerting" }
  ],

  skills: [
    {
      name: "Support & Operations",
      items: ["Incident & Escalation Management", "SLA Adherence", "Root Cause Analysis (RCA)", "Trend Analysis", "24×7 On-Call", "Change Implementation Support", "Capacity & Cost Optimization", "SOPs & Knowledge Documentation", "Stakeholder Communication", "Mentoring", "SRE Practices"]
    },
    {
      name: "AWS Cloud",
      items: ["EC2", "VPC", "IAM", "ECS", "EKS", "ECR", "RDS", "S3", "Lambda", "ALB", "Route 53", "CloudWatch", "CloudTrail", "Auto Scaling", "Secrets Manager", "SNS", "EFS", "NAT Gateway", "Security Groups", "NACLs", "GuardDuty", "Security Hub"]
    },
    {
      name: "Infrastructure as Code",
      items: ["Terraform", "Reusable Modules", "AWS CloudFormation", "Azure ARM Templates", "YAML Automation"]
    },
    {
      name: "Containers & Orchestration",
      items: ["Docker", "Kubernetes", "Amazon EKS", "Amazon ECS", "Helm", "AKS", "GKE", "OpenShift", "Istio"]
    },
    {
      name: "CI/CD & DevOps",
      items: ["Jenkins", "GitHub Actions", "AWS CodePipeline", "GitLab CI/CD", "Azure DevOps", "Git", "GitFlow", "ArgoCD", "JFrog Artifactory"]
    },
    {
      name: "Monitoring & Observability",
      items: ["CloudWatch", "Prometheus", "Grafana", "Datadog", "Dynatrace", "ELK", "Azure Monitor"]
    },
    {
      name: "Networking & Security",
      items: ["VPC / VNet", "Subnets & Route Tables", "Load Balancers", "Route 53 / DNS", "VPN", "TCP/IP", "SSL/TLS", "IAM & RBAC", "Encryption at Rest / In Transit", "Vulnerability Scanning"]
    },
    {
      name: "Azure, GCP & Linux",
      items: ["Azure Landing Zone", "AKS", "ACR", "Key Vault", "GCP GKE", "Anthos", "Cloud SQL", "Pub/Sub", "Cloud Functions", "Linux / RHEL", "Bash", "Python", "PowerShell", "PostgreSQL", "MySQL"]
    }
  ],

  experience: [
    {
      role: "Senior Project Engineer – DevOps & Cloud",
      company: "Wipro Limited",
      place: "Gurgaon, India",
      period: "Feb 2021 – Present",
      current: true,
      bullets: [
        "Own resolution of escalated tickets and production incidents across multi-environment AWS and Terraform-managed infrastructure through 24×7 on-call operations, adhering to SLAs and quality norms and maintaining 99.9% uptime for an e-commerce client.",
        "Perform root cause analysis on incidents and recurring issues, review monitoring and incident trends, and drive corrective and preventive actions aligned with SRE practices.",
        "Design, operate, and troubleshoot AWS PaaS workloads across EC2, ECS, EKS, RDS, Lambda, VPC, IAM, Route 53, Auto Scaling, and CloudWatch, supporting high-availability applications.",
        "Design and maintain Infrastructure as Code with Terraform across AWS, Azure, and GCP, reducing manual provisioning effort by 60%+ and minimizing configuration drift.",
        "Review infrastructure change and deployment plans (Terraform plans and pipeline changes) before release to reduce human-error risk and improve release consistency.",
        "Implemented Prometheus, Grafana, Datadog, and CloudWatch monitoring with centralized logging and proactive alerting, reducing MTTR by more than 30%.",
        "Drove cloud cost and capacity optimization through tagging, budget alerts, AWS Compute Optimizer recommendations, and right-sizing, reducing cloud spend by 15–25% across key workloads.",
        "Built and maintained CI/CD pipelines (Jenkins, GitHub Actions, GitFlow) for containerized microservices on AWS EKS, EC2, and ECS, reducing deployment time by 40–50%.",
        "Implemented AWS security controls including IAM policies, RBAC, encryption at rest/in transit, vulnerability scanning, Security Groups, NACLs, CloudTrail, and Security Hub.",
        "Mentored junior engineers on IaC, CI/CD, and troubleshooting practices; created and maintained technical documentation and runbooks to support team knowledge sharing.",
        "Collaborated with application teams and client stakeholders to communicate incident status, findings, and resolution plans.",
        "Supported Azure migration and landing-zone activities (VNet design, hub-spoke networking, NSGs, AKS, ACR, Key Vault) and containerized and deployed a GenAI application on Amazon ECS through CI/CD."
      ],
      tags: ["AWS", "Incident Mgmt", "RCA", "Terraform", "EKS", "ECS", "CI/CD", "SRE"]
    },
    {
      role: "Summer Intern – IoT Engineering",
      company: "IIT Patna",
      place: "Patna, India",
      period: "Jun 2020 – Aug 2020",
      current: false,
      bullets: [
        "Designed and implemented an IoT-based distance-measuring device integrating sensors, microcontrollers, and cloud data transmission for real-time monitoring."
      ],
      tags: ["IoT", "Sensors", "Microcontrollers", "Cloud"]
    },
    {
      role: "CDAC Intern – Online Voting System",
      company: "CDAC",
      place: "Patna, India",
      period: "Jan 2020 – Mar 2020",
      current: false,
      bullets: [
        "Developed an online voting system for college elections, competitions and cultural events.",
        "Implemented secure, user-friendly features to enable seamless voting.",
        "Coordinated system functionality across multiple event categories and voter authentication."
      ],
      tags: ["Web App", "Authentication", "Security"]
    }
  ],

  /* ------------------------------------------------------------------
     CI/CD workflow section (animated). Edit stages, code and logs here.
     Illustrative reference workflow: repo, account and service names are placeholders.
  ------------------------------------------------------------------- */
  cicd: {
    ci: [
      {
        title: "Commit & Pull Request", tools: ["Git", "GitFlow", "GitHub"], dur: 6, file: "terminal",
        desc: "Work happens on GitFlow feature branches. A pull request triggers the pipeline, and branch protection requires a review and green checks before anything merges.",
        code: [
          "git checkout -b feature/orders-api develop",
          "git commit -am 'feat: add order retry'",
          "git push -u origin feature/orders-api",
          "# PR -> required review + status checks -> merge to develop"
        ],
        log: ["PR opened: feature/orders-api -> develop", "Branch protection: review + status checks required", "Workflow triggered on pull_request"]
      },
      {
        title: "Build & Test", tools: ["GitHub Actions", "Jenkins"], dur: 41, file: ".github/workflows/ci.yml",
        desc: "The runner checks out the commit, restores dependency caches, lints and runs the unit tests. Any failure stops the pipeline here, before an image is built.",
        code: [
          "jobs:",
          "  build-test:",
          "    runs-on: ubuntu-latest",
          "    steps:",
          "      - uses: actions/checkout@v4",
          "      - run: make lint test"
        ],
        log: ["Checkout commit 3f9c2ab", "Dependency cache restored", "Lint passed", "Unit tests passed"]
      },
      {
        title: "Docker Build", tools: ["Docker", "BuildKit"], dur: 58, file: ".github/workflows/ci.yml",
        desc: "A multi-stage Dockerfile produces a small runtime image, tagged with the immutable git SHA so every deployment is traceable and rollback is exact.",
        code: [
          "docker build \\",
          "  -t $ECR_REPO:$GITHUB_SHA .",
          "# multi-stage build, non-root user, pinned base image"
        ],
        log: ["Building image (multi-stage)", "Tagged api:3f9c2ab"]
      },
      {
        title: "Vulnerability Scan", tools: ["Trivy", "ECR scanning"], dur: 22, file: ".github/workflows/ci.yml",
        desc: "The image is scanned for OS and library vulnerabilities. HIGH and CRITICAL findings fail the build, so an unsafe image never reaches the registry or the cluster.",
        code: [
          "trivy image \\",
          "  --exit-code 1 \\",
          "  --severity HIGH,CRITICAL \\",
          "  $ECR_REPO:$GITHUB_SHA"
        ],
        log: ["Scanning OS packages and app dependencies", "No HIGH / CRITICAL findings", "Gate passed"]
      },
      {
        title: "Push to Amazon ECR", tools: ["ECR", "IAM OIDC"], dur: 14, file: ".github/workflows/ci.yml",
        desc: "The workflow assumes an IAM role through OIDC, so there are no long-lived AWS keys in the pipeline, then pushes the scanned image to a private ECR repository.",
        code: [
          "- uses: aws-actions/configure-aws-credentials@v4",
          "  with:",
          "    role-to-assume: ${{ vars.AWS_DEPLOY_ROLE }}",
          "    aws-region: ${{ vars.AWS_REGION }}",
          "- uses: aws-actions/amazon-ecr-login@v2",
          "- run: docker push $ECR_REPO:$GITHUB_SHA"
        ],
        log: ["Assumed deploy role via OIDC", "Logged in to ECR", "Pushed api:3f9c2ab"]
      }
    ],

    cd: {
      ecs: {
        label: "Amazon ECS",
        artifact: "<account>.dkr.ecr.<region>.amazonaws.com/api:3f9c2ab",
        stages: [
          {
            title: "Terraform Plan Review", tools: ["Terraform", "Approval gate"], dur: 35, file: "terminal",
            desc: "Infrastructure changes ship through Terraform. The plan is reviewed for drift and blast radius, and production applies only after an explicit approval.",
            code: [
              "terraform fmt -check && terraform validate",
              "terraform plan -out=tfplan",
              "# reviewer checks the plan -> manual approval for prod",
              "terraform apply tfplan"
            ],
            log: ["terraform plan: no unexpected destroys", "Approval gate: prod reviewer approved", "terraform apply: complete"]
          },
          {
            title: "Render Task Definition", tools: ["ECS", "Secrets Manager"], dur: 5, file: ".github/workflows/cd.yml",
            desc: "A new task definition revision is rendered with the fresh image tag. Secrets are referenced from AWS Secrets Manager, never baked into the image or the repo.",
            code: [
              "- uses: aws-actions/amazon-ecs-render-task-definition@v1",
              "  with:",
              "    task-definition: ecs/task-def.json",
              "    container-name: api",
              "    image: ${{ env.ECR_REPO }}:${{ github.sha }}",
              "# secrets injected at runtime via valueFrom"
            ],
            log: ["Rendered task definition api:42", "Secrets referenced from Secrets Manager"]
          },
          {
            title: "Deploy ECS Service", tools: ["ECS", "ALB", "CodeDeploy"], dur: 96, file: ".github/workflows/cd.yml",
            desc: "The service rolls to the new revision behind the ALB. New tasks must pass health checks before old ones drain, which keeps deployments zero-downtime. The circuit breaker rolls back automatically on failure.",
            code: [
              "- uses: aws-actions/amazon-ecs-deploy-task-definition@v2",
              "  with:",
              "    cluster: prod",
              "    service: api",
              "    wait-for-service-stability: true",
              "# minimumHealthyPercent: 100 + deployment circuit breaker"
            ],
            log: ["Service api updated to revision 42", "New tasks registered with ALB target group", "Old tasks draining"]
          },
          {
            title: "Verify Release", tools: ["ALB health", "Smoke test"], dur: 18, file: "terminal",
            desc: "The pipeline waits for the service to stabilise, checks target health on the load balancer and runs a smoke test against the live endpoint before declaring success.",
            code: [
              "aws ecs wait services-stable \\",
              "  --cluster prod --services api",
              "curl -fsS https://api.example.com/health"
            ],
            log: ["Service stable: running count = desired", "Target group: all targets healthy", "Smoke test passed"]
          },
          {
            title: "Observe & Roll Back", tools: ["CloudWatch", "Datadog", "SNS"], dur: 10, file: "terminal",
            desc: "CloudWatch alarms and Datadog watch 5xx rate, latency and unhealthy hosts, and page the on-call engineer through SNS. If it goes wrong, rolling back is one command to the previous revision.",
            code: [
              "# alarms: 5xx rate, p95 latency, unhealthy hosts -> SNS -> on-call",
              "aws ecs update-service --cluster prod --service api \\",
              "  --task-definition api:41   # rollback to previous revision"
            ],
            log: ["CloudWatch alarms: OK", "Datadog monitors: green", "Previous revision api:41 kept for instant rollback"]
          }
        ]
      },

      eks: {
        label: "Amazon EKS",
        artifact: "<account>.dkr.ecr.<region>.amazonaws.com/api:3f9c2ab",
        stages: [
          {
            title: "Terraform Plan Review", tools: ["Terraform", "Approval gate"], dur: 35, file: "terminal",
            desc: "Cluster, node group and networking changes ship through Terraform. The plan is reviewed for drift and blast radius, and production applies only after approval.",
            code: [
              "terraform fmt -check && terraform validate",
              "terraform plan -out=tfplan",
              "# reviewer checks the plan -> manual approval for prod",
              "terraform apply tfplan"
            ],
            log: ["terraform plan: no unexpected destroys", "Approval gate: prod reviewer approved", "terraform apply: complete"]
          },
          {
            title: "Bump Helm Release", tools: ["Helm", "GitOps repo"], dur: 7, file: "terminal",
            desc: "The new image tag is written into the environment's Helm values in the GitOps repository. Git becomes the audit trail for exactly what runs in the cluster.",
            code: [
              "yq -i '.image.tag = strenv(GITHUB_SHA)' envs/prod/values.yaml",
              "git commit -am 'deploy: api '$GITHUB_SHA",
              "git push"
            ],
            log: ["values.yaml: image.tag = 3f9c2ab", "Committed to GitOps repo"]
          },
          {
            title: "Sync with ArgoCD", tools: ["ArgoCD", "Helm"], dur: 84, file: "terminal",
            desc: "ArgoCD detects the change and syncs the cluster to match Git. A rolling update replaces pods gradually, and helm --atomic is the fallback for non-GitOps services.",
            code: [
              "argocd app sync api --prune",
              "# or, without GitOps:",
              "helm upgrade --install api ./chart \\",
              "  -f envs/prod/values.yaml --atomic --timeout 5m"
            ],
            log: ["ArgoCD: OutOfSync -> Syncing", "Rolling update: new pods starting", "Old ReplicaSet scaling down"]
          },
          {
            title: "Verify Rollout", tools: ["kubectl", "Probes", "HPA"], dur: 22, file: "terminal",
            desc: "Readiness and liveness probes gate traffic, so pods only receive requests once healthy. The pipeline waits on rollout status and the HPA keeps capacity matched to load.",
            code: [
              "kubectl rollout status deploy/api -n prod --timeout=180s",
              "kubectl get pods -n prod -l app=api",
              "# readiness/liveness probes gate traffic; HPA scales on load"
            ],
            log: ["deployment 'api' successfully rolled out", "All pods Ready", "Smoke test passed"]
          },
          {
            title: "Observe & Roll Back", tools: ["Prometheus", "Grafana", "Datadog"], dur: 10, file: "terminal",
            desc: "Prometheus alert rules and Datadog monitors feed on-call alerting, with Grafana dashboards for the full picture. A rollback is a single ArgoCD or Helm command away.",
            code: [
              "# Prometheus rules -> Alertmanager -> on-call; Grafana dashboards",
              "argocd app rollback api",
              "# or: helm rollback api"
            ],
            log: ["Prometheus alerts: none firing", "Grafana dashboards: healthy", "Previous release kept for instant rollback"]
          }
        ]
      }
    }
  },

  agent: {
    name: "Ops-Bot",
    tips: {
      home: "Hi, I'm Ops-Bot. Scroll and I'll tag along.",
      about: "Reading the on-call runbook…",
      toolkit: "Indexing the toolkit…",
      impact: "Checking the uptime graph: 99.9%",
      experience: "Replaying 5+ years of incidents…",
      cicd: "Shipping builds to ECS & EKS…",
      projects: "Reviewing the Terraform plan…",
      credentials: "Verifying certifications…",
      contact: "Ready to take your message."
    }
  },

  projects: [
    {
      title: "Multi-Cloud Infrastructure Automation",
      stack: ["Terraform", "AWS", "Azure", "GCP", "Bash", "Helm"],
      metric: "Days → < 30 min",
      metricLabel: "provisioning time",
      bullets: [
        "Built reusable Terraform modules for VPC/VNet, EKS/AKS clusters, and RDS, reducing provisioning time from days to under 30 minutes; applied IAM/RBAC controls and cost-control tagging.",
        "Implemented IAM/RBAC controls and standardized tagging for governance, compliance and resource visibility across clouds.",
        "Deployed Helm-based microservices and configured Istio service mesh for traffic management and observability."
      ]
    },
    {
      title: "Observability Stack Implementation",
      stack: ["Prometheus", "Grafana", "ELK", "Datadog", "EKS"],
      metric: "30%+",
      metricLabel: "Lower MTTR",
      bullets: [
        "Designed metrics, dashboards, log aggregation, and alerting for EKS microservices, enabling proactive incident response and reducing MTTR by more than 30%."
      ]
    },
    {
      title: "GenAI Application Deployment on AWS ECS",
      stack: ["Docker", "ECS", "ECR", "RDS", "GitHub Actions"],
      metric: "Zero-downtime",
      metricLabel: "deployments",
      bullets: [
        "Deployed and managed a production-grade GenAI application on Amazon ECS using Docker containers, integrated with Amazon RDS for persistent storage.",
        "Automated CI/CD with GitHub Actions and Amazon ECR, enabling container image vulnerability scanning, automated deployments and zero-downtime releases.",
        "Optimized compute, networking and container resource utilization to improve performance, scalability and operational efficiency."
      ]
    }
  ],

  certifications: [
    { name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", short: "SAA", featured: true },
    { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", short: "CLF" },
    { name: "Google Cloud Digital Leader", issuer: "Google Cloud", short: "GCP" },
    { name: "Microsoft Certified: Azure Fundamentals (AZ-900)", issuer: "Microsoft", short: "AZ" },
    { name: "GitHub Copilot Certification", issuer: "GitHub", short: "GH" },
    { name: "Jenkins, Kubernetes, and Docker", issuer: "Wipro (Internal)", short: "K8s" }
  ],

  education: [
    { degree: "MTech – Software Systems", school: "BITS Pilani", period: "2021 – 2024" },
    { degree: "BCA – Bachelor of Computer Applications", school: "L.N. Mishra College", period: "2017 – 2020" },
    { degree: "Intermediate (PCM)", school: "C.S. Janta College, Gaya", period: "2014 – 2016" },
    { degree: "Matriculation", school: "Ishan International School, Patna", period: "2014" }
  ],

  marquee: ["AWS", "Terraform", "Kubernetes", "EKS", "ECS", "Docker", "Jenkins", "GitHub Actions", "ArgoCD", "Helm", "Prometheus", "Grafana", "Datadog", "Azure", "GCP", "CloudWatch", "Linux"]
};
