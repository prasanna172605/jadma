with open('.env', 'r') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if line.startswith('DATABASE_URL='):
        new_lines.append('DATABASE_URL=postgresql://postgres.kakomchteolqajcjjgtr:Jadmaa%402026@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true\n')
    elif line.startswith('DIRECT_URL='):
        new_lines.append('DIRECT_URL=postgresql://postgres.kakomchteolqajcjjgtr:Jadmaa%402026@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres\n')
    else:
        new_lines.append(line)

with open('.env', 'w') as f:
    f.writelines(new_lines)
