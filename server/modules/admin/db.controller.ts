import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '../../db.js';

// In Prisma, dmmf contains the models
export const getTables = async (req: Request, res: Response) => {
  try {
    const models = Prisma.dmmf.datamodel.models.map(m => m.name);
    res.json({ success: true, data: models });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message } });
  }
};

export const getTableData = async (req: Request, res: Response) => {
  try {
    const { table } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const skip = (page - 1) * limit;

    const modelName = table.charAt(0).toLowerCase() + table.slice(1);
    const delegate = (prisma as any)[modelName];
    
    if (!delegate) return res.status(404).json({ success: false, error: { message: 'Table not found' }});

    const [items, total] = await Promise.all([
      delegate.findMany({ skip, take: limit }),
      delegate.count()
    ]);

    res.json({ success: true, data: { items, pagination: { page, limit, total, totalPages: Math.ceil(total/limit) } } });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message } });
  }
};

export const createTableRow = async (req: Request, res: Response) => {
  try {
    const { table } = req.params;
    const modelName = table.charAt(0).toLowerCase() + table.slice(1);
    const delegate = (prisma as any)[modelName];
    
    if (!delegate) return res.status(404).json({ success: false, error: { message: 'Table not found' }});

    const result = await delegate.create({ data: req.body });
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message } });
  }
};

export const updateTableRow = async (req: Request, res: Response) => {
  try {
    const { table, id } = req.params;
    const modelName = table.charAt(0).toLowerCase() + table.slice(1);
    const delegate = (prisma as any)[modelName];
    
    if (!delegate) return res.status(404).json({ success: false, error: { message: 'Table not found' }});

    const result = await delegate.update({
      where: { id },
      data: req.body
    });
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message } });
  }
};

export const deleteTableRow = async (req: Request, res: Response) => {
  try {
    const { table, id } = req.params;
    const modelName = table.charAt(0).toLowerCase() + table.slice(1);
    const delegate = (prisma as any)[modelName];
    
    if (!delegate) return res.status(404).json({ success: false, error: { message: 'Table not found' }});

    await delegate.delete({ where: { id } });
    res.json({ success: true, data: null });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message } });
  }
};
