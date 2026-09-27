with open('prisma/schema.prisma', 'r') as f:
    content = f.read()

user_relations = """  certificates    Certificate[]
  
  passwordResetTokens PasswordResetToken[]
  passwordResetOtps   PasswordResetOtp[]
  refreshSessions     RefreshSession[]
"""
content = content.replace("  certificates    Certificate[]", user_relations)

models = """
model PasswordResetToken {
  id        String   @id @default(uuid())
  userId    String
  tokenHash String   @unique
  expiresAt DateTime
  usedAt    DateTime?
  createdAt DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([tokenHash])
  @@index([expiresAt])
}

model PasswordResetOtp {
  id          String   @id @default(uuid())
  userId      String
  phoneNumber String
  otpHash     String
  expiresAt   DateTime
  attempts    Int      @default(0)
  verifiedAt  DateTime?
  createdAt   DateTime @default(now())

  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([phoneNumber])
}

model RefreshSession {
  id         String    @id @default(uuid())
  userId     String
  tokenHash  String    @unique
  expiresAt  DateTime
  revokedAt  DateTime?
  createdAt  DateTime  @default(now())
  ipAddress  String?
  userAgent  String?

  user       User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([tokenHash])
}
"""

content = content + "\n" + models

with open('prisma/schema.prisma', 'w') as f:
    f.write(content)
