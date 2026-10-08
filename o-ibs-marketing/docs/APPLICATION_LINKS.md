# Marketing application access

Public signup and login remain disabled. Header/menu Get Started and every plan action lead to /early-access. Log In shows Coming soon without an actionable destination. Contact, Early Access and backend delivery remain unchanged.

Build configuration (public, never credentials):
- PUBLIC_APP_URL: https://app.o-ibs.co.za (production origin only; default)
- PUBLIC_LOGIN_READY: false by default
- PUBLIC_LOGIN_URL: exact approved application login URL, required when login is enabled
- PUBLIC_SIGNUP_READY: false by default
- PUBLIC_SIGNUP_URL: exact approved registration URL, required when signup is enabled

Enable only after product-owner launch approval and verifying the application implements the full registration/company setup/checkout/verified-payment/activation journey. No application route is assumed to exist. Example paths in tests are fixtures only. Plan links use an allowlisted plan query parameter (BASIC, BUSINESS, COMPLETE). Before activation, verify the application's actual parameter contract and supported routes; adjust the website adapter if needed. No Buyer price or plan is added. Login and signup approvals are independent. Staging, third-party origins, query strings, credentials and fragments are rejected. Build flags cannot implement authentication, registration, payment or activation. No settings changed during this preparation.
