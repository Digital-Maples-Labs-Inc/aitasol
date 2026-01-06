```markdown
# Web Application Security Checklist (Netlify‑Hosted Apps)

> The real protection comes from platform security, HTTPS, auth, headers, and WAF rules; UI tricks like disabling right‑click only deter casual users and do **not** prevent cloning or serious attacks. [web:22][web:23][web:29]

Use this checklist periodically (e.g., before each production release) to reduce risk for apps hosted on Netlify.

---

## 1. Platform & Account Security

### 1.1 Netlify / Git Provider Accounts

- [ ] Netlify team and user accounts have **2FA enabled** (TOTP or hardware keys). [web:22][web:29]  
- [ ] GitHub/GitLab/Bitbucket accounts used for deploys have **2FA enabled**. [web:22]  
- [ ] Only required users are members of the Netlify team; access is removed for ex‑contractors/staff. [web:22]  
- [ ] Team roles follow **least privilege** (no unnecessary Owners/Admins). [web:23]  

### 1.2 Deploy Pipeline

- [ ] All secrets/API keys are stored as **environment variables** in Netlify, not committed to the repo. [web:22][web:26]  
- [ ] Build logs are reviewed for accidental secret leakage (tokens, passwords, private URLs). [web:22]  
- [ ] Deploy previews are restricted (password or SSO) if they show sensitive or unreleased features. [web:23]  

---

## 2. Network, TLS & WAF

### 2.1 TLS & HTTPS

- [ ] Site is only served over **HTTPS** using Netlify’s automatic TLS certificates. [web:22][web:25]  
- [ ] `http` to `https` redirects are enforced (e.g., in `_redirects` or `netlify.toml`). [web:22]  
- [ ] **HSTS** header (`Strict-Transport-Security`) is configured for production domains. [web:22][web:32]  

### 2.2 Firewall / WAF / Access Control

- [ ] Netlify **Advanced Web Security / firewall traffic rules** are configured for:  
  - [ ] Rate limiting suspicious paths (e.g., `/api`, `/login`). [web:22][web:29]  
  - [ ] Blocking abusive IPs or IP ranges. [web:22]  
  - [ ] Optional geo‑blocking for regions not served. [web:22]  
- [ ] Admin routes (e.g., `/admin`, `/dashboard`, `/internal`) require authentication and are not world‑readable. [web:23][web:32]  
- [ ] If using Cloudflare or similar in front of Netlify, WAF rules and bot protection are enabled and tested. [web:22][web:41]  

---

## 3. Application & API Security

### 3.1 Authentication & Authorization

- [ ] All sensitive endpoints require **authentication** (JWT/session/SSO) and are not callable anonymously. [web:26][web:32]  
- [ ] Authorization is enforced server‑side using **least privilege** (role/permission checks on each request). [web:26][web:32]  
- [ ] Access tokens and sessions have sensible expiry, refresh, and logout behavior. [web:26]  

### 3.2 Input Validation & Data Handling

- [ ] All user input is validated server‑side (type, length, whitelist/regex where appropriate). [web:26][web:32]  
- [ ] Output encoding is used to prevent XSS when rendering user data. [web:22][web:32]  
- [ ] APIs use parameterized queries or ORM protections to prevent injection attacks. [web:26]  

### 3.3 Dependencies & Secrets

- [ ] Dependencies are regularly updated; `npm audit`/`yarn audit` or similar is run as part of CI. [web:22][web:29]  
- [ ] Unused packages and plugins are removed. [web:22]  
- [ ] No secrets, private keys, or admin credentials exist in the client bundle or public repo. [web:22][web:26]  

### 3.4 Admin & Debug Interfaces

- [ ] Debug endpoints, test routes, and tools like `/__debug` are disabled in production. [web:22][web:32]  
- [ ] Third‑party admin dashboards (e.g., CMS, analytics) are protected with strong auth and, if possible, IP/SSO restrictions. [web:22][web:23]  

---

## 4. Security Headers (Netlify `_headers` or `netlify.toml`)

Confirm these are set for your production domain (values tailored to your app). [web:22][web:32]

- [ ] `Content-Security-Policy` (CSP) defined to limit allowed scripts, styles, frames, images, and connections.  
- [ ] `X-Frame-Options` set to `DENY` or `SAMEORIGIN` to mitigate clickjacking.  
- [ ] `X-Content-Type-Options: nosniff` to prevent MIME sniffing attacks.  
- [ ] `Referrer-Policy` set (e.g., `strict-origin-when-cross-origin`).  
- [ ] `Permissions-Policy` configured to limit APIs like camera, microphone, geolocation.  

Example `_headers` skeleton:

```text
/* 
  Content-Security-Policy: default-src 'self';
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), camera=(), microphone=()
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

---

## 5. UI‑Level Copy/Right‑Click Restrictions (Deterrent Only)

> These do **not** provide real security; they only discourage casual copying. Anyone can still view source, open DevTools, or scrape the bundle. [web:27][web:39]

### 5.1 Right‑Click & Key Combos

- [ ] (If desired) global script added:

```js
document.addEventListener('contextmenu', (e) => e.preventDefault());
```

- [ ] (Optional, with UX trade‑offs) listeners for key combos like `Ctrl+C`, `Ctrl+U`, `F12` added and tested, understanding that power users will bypass them. [web:27][web:30][web:39]  

### 5.2 Text Selection

- [ ] (Optional) `user-select: none` applied to specific elements (e.g., premium content) rather than the entire page to avoid harming accessibility. [web:30][web:33]  

---

## 6. Cloning, Phishing, and Brand Protection

> You cannot fully prevent someone from copying HTML/CSS/JS once rendered in the browser, but you can detect and respond. [web:31][web:34][web:37]

### 6.1 Make Cloning Less Effective

- [ ] Strong branding (logo, name, design language) is consistently used so users can identify the official site. [web:31][web:37]  
- [ ] Internal links, canonical URLs, and metadata clearly reference the legitimate domain. [web:31]  
- [ ] Analytics and logs are monitored for abnormal scraping patterns (many sequential page hits, unusual IPs, strange user agents). [web:31][web:37]  

### 6.2 Detection & Takedown

- [ ] Periodic checks (manual or via services) for spoofed domains or look‑alike sites are performed. [web:34][web:40]  
- [ ] When a clone is identified:  
  - [ ] Evidence (screenshots, HTML snippets, timestamps) is captured. [web:31]  
  - [ ] Takedown notices are sent to the host, registrar, and any relevant platforms (ad networks, payment processors), citing copyright/trademark. [web:31][web:37]  

### 6.3 Optional Extra Layers

- [ ] Cloudflare or similar sits in front of Netlify for: extra WAF rules, bot mitigation, IP/geo controls, and DDoS resistance. [web:22][web:41]  
- [ ] For high‑value targets, dedicated **cloning‑detection / anti‑phishing** tools are configured to alert on spoofed domains and cloned pages. [web:34][web:40]  

---

## 7. Operational Security

- [ ] Incident response plan exists (who does what when an incident is detected). [web:29][web:37]  
- [ ] Regular backups of critical data (DBs, environment configs, DNS settings) are in place and tested. [web:29]  
- [ ] Logs (Netlify, API gateway, auth provider) are retained long enough to investigate incidents. [web:22][web:29]  

---

### Usage Notes

- Keep this file (`SECURITY_CHECKLIST.md`) in the repo and review on each major release.  
- Adapt the CSP, WAF rules, and auth/permissions to each project’s specific stack and risk profile. [web:22][web:26][web:32]
```

[1](https://app.netlify.com/teams/support-fi0dalq/settings/access#firewall-traffic-rules)