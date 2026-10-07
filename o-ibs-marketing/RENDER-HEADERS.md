# Render Static Site security headers

The production build generates `render.yaml` (JSON syntax, valid YAML) and `qa/security-headers.json` from the same policy as the local preview `_headers`. Render Static Sites do not consume this project's `_headers` file. Supported deployment configuration is a Blueprint service's `headers` field, or the existing Static Site's separate **Headers** page (outside Settings → Networking).

The manifest defines only the existing `o-ibs-marketing` Static Site, preserving its repository, master branch, root, build and publish directory. It contains no environment values, domains, application/forms services, databases or secrets. Adding the file alone does not convert an existing manually configured service into a Blueprint-managed service. Do not create a duplicate site or sync unrelated resources. For this existing service, apply its six generated `/*` rules through the authenticated Headers page, then compare actual live responses to `qa/security-headers.json` after deployment.

Both forms remain disabled. CSP allows only the exact approved forms HTTPS origin in addition to self; all other directives and the structured-data hash remain. Production builds reject a different enabled forms origin. Future changes to inline structured data/policy must regenerate the manifest and update the existing service's header rules (or separately approve adoption into one Blueprint). The static tests prevent drift between the manifest, generated policy and preview headers.

After any header change/deployment, verify HTTPS, each expected response header on home/contact, browser console/CSP errors, assets, desktop/mobile layout and disabled forms. Do not call the forms live or send test mail during this security-only pass.
