export default async function (req: any, res: any) {
  try {
    const { default: app } = await import('../server/app.js');
    return app(req, res);
  } catch (err: any) {
    console.error('Fatal initialization error:', err);
    res.status(500).json({ error: 'Fatal init error', message: err.message, stack: err.stack });
  }
}
