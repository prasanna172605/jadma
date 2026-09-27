import { prisma } from '../db.js';

export const logAdminAction = async (
  actorUserId: string | null,
  action: string,
  entityType: string,
  entityId: string | null = null,
  metadata: any = null,
  req: any = null
) => {
  try {
    const ipAddress = req?.ip || req?.headers?.['x-forwarded-for'] || null;
    const userAgent = req?.headers?.['user-agent'] || null;
    
    await prisma.auditLog.create({
      data: {
        actorUserId,
        action,
        entityType,
        entityId,
        metadata: metadata ? JSON.stringify(metadata) : null,
        ipAddress,
        userAgent,
      }
    });
  } catch (error) {
    console.error('Failed to create audit log:', error);
  }
};
