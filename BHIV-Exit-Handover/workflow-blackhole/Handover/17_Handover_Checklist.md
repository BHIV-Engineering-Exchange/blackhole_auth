# Handover Checklist — workflow-blackhole

---

## Documentation

- [ ] Read `Handover/01_README.md`
- [ ] Understand Infiverse BHL vs workflow-blackhole naming
- [ ] Review Tantra + SETU integration (`12_Known_Issues`)
- [ ] Review monitoring privacy notes (`11_Authentication`)

---

## Access

- [ ] GitHub repo
- [ ] MongoDB Atlas
- [ ] Render (`blackholeworkflow`)
- [ ] Vercel (`blackhole-workflow`)
- [ ] Cloudinary, AI keys, email SMTP
- [ ] Sampada SETU credentials (if used)

---

## Local verification

- [ ] Server starts with MongoDB
- [ ] `/api/ping` OK
- [ ] Client with `VITE_API_URL` port 5000
- [ ] Login/register works
- [ ] Socket connects
- [ ] One admin flow (users or attendance)
- [ ] `npm run build` succeeds

---

## Production verification

- [ ] Vercel URL loads
- [ ] API calls hit Render (not 5001/ wrong host)
- [ ] CORS clean in browser console
- [ ] JWT login on production
- [ ] **TODO: Verify** niyantran.blackholeinfiverse.com if still used

---

## Integration

- [ ] SETU env documented and tested or explicitly disabled
- [ ] Relationship to PARIKSHAN/Niyantran understood

---

## Security & compliance

- [ ] JWT_SECRET rotated if needed
- [ ] Monitoring consent process documented
- [ ] No secrets in git history (post a291ddf review)

---

## Sign-off

| Role | Name | Date |
|------|------|------|
| Outgoing | Nikhil Pawar | |
| Incoming | | |
| Product owner | **TODO: Verify** | |

---

## Post-handover priorities

1. `.env.example` files
2. Fix localhost port default in api.js
3. Externalize CORS
4. SETU dispatch observability
5. Automated tests for auth + tantra
