import re

with open('.env', 'r') as f:
    c = f.read()

c = c.replace('DATABASE_URL=postgresql', 'DATABASE_URL="postgresql')
c = c.replace('?pgbouncer=true', '?pgbouncer=true"')
c = c.replace('DIRECT_URL=postgresql', 'DIRECT_URL="postgresql')
c = c.replace('5432/postgres', '5432/postgres"')

with open('.env', 'w') as f:
    f.write(c)
print(".env fixed again")
