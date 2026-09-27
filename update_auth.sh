sed -i -e "s/console.error('Auth check failed', err);/console.warn('Auth session expired or invalid', err.message);/g" src/context/AuthContext.tsx
