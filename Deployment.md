# TradeXpress Deployment & Environment Configuration Guide

This document outlines the production server environment setups, SSH authentication protocols, and automation system overrides required to successfully run and deploy the **TradeXpress** suite.

---

## 🖥️ Server Environment Details
- **User Account:** `tx`
- **Host System:** Ubuntu Headless Production Server (`tx@tradexpress`)
- **Main App Directory:** `D:\tradexpress.co\tradexpress-app`
- **Primary Tech Stack:** Node.js / TypeScript / SQLite / React (Next.js)

---

## 🔒 1. Version Control & SSH Handshake Setup

To bypass standard credential restrictions on private GitHub organizations (`txchiefcybernetics-lang`), a verified OpenSSH public key signature must be bound directly to your profile.

### Verification of Existing Keys
Locate local security tokens via PowerShell:
```powershell
cat C:\Users\kenny\.ssh\id_rsa.pub
```

### Routing Target Adjustments
If the local git pathing resolves to an unauthenticated secondary platform (like Bitbucket), overwrite your tracking origin to point directly to the correct repository:
```bash
git remote set-url origin git@github.com:txchiefcybernetics-lang/tradexpress-app.git
```

### Standard Deployment Code Delivery Sync
Always clear upstream tracking updates before deploying workspace feature modifications:
```bash
git pull origin main --no-rebase
git push origin main
```

---

## 🛠️ 2. Linux Automation Overrides (Dpkg Lock Prevention)

By default, Ubuntu runs background package manager checks that dynamically invoke lock boundaries (`/var/lib/dpkg/lock`). To maintain unhindered manual terminal deployments, background system timers have been stripped out.

### Applied Configuration Overrides
Run these commands to permanently disable the automated update engines:
```bash
# Terminate and unbind the daily packages lookup routine
sudo systemctl disable --now apt-daily.timer

# Terminate and unbind the unattended software upgrades engine
sudo systemctl disable --now apt-daily-upgrade.timer
```

---

## 🌐 3. System Management Web Console (Cockpit Dashboard)

To visually monitor background system scripts, toggle localized server processes, and track hardware performance graphs without terminal constraints, the Cockpit Dashboard layer is initialized.

### Installation and Initialization
```bash
# Update local packages database and download console features
sudo apt update
sudo apt install cockpit -y

# Spin up and register the communication web socket
sudo systemctl enable --now cockpit.socket
```

### Access Metrics
- **Secure Web URL:** `http://localhost:9090` *(or server local network IP)*
- **Authentication Credentials:** Use server profile logins (`tx` / password)
- **Primary Dashboards Available:** Real-time hardware telemetry (CPU/RAM/Network) & System Services Registry panel.

### 🌐 Verified Network Infrastructure Telemetry
- **Local Host IP Resolution:** `192.168.100.11`
- **Network Interface URL:** `http://192.168.100.11:9090`
- **Infrastructure Target Node:** `linuxserver`

