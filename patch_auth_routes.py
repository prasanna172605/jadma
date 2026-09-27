with open('server/modules/auth/auth.routes.ts', 'r') as f:
    content = f.read()

imports = """import { forgotPassword, resetPassword, changePassword } from './password.controller.js';
import { authenticate } from '../../middleware/auth.js';"""

content = content.replace("import { register, login, getMe, refresh, logout } from './auth.controller.js';",
"import { register, login, getMe, refresh, logout } from './auth.controller.js';\n" + imports)

routes = """
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/change-password', authenticate, changePassword);

module.exports = router;
"""

content = content.replace("export default router;", routes + "\nexport default router;")

with open('server/modules/auth/auth.routes.ts', 'w') as f:
    f.write(content)
