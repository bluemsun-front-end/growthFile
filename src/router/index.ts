import { createRouter, createWebHistory } from 'vue-router'
import isLogin from '@/api/isLogin';
//import StudentsFile from '@/views/StudentsFile.vue';
import index from '@/views/Login/index.vue';
import NewFile from '@/views/new-file.vue';
import StudentsFile from '@/views/StudentsFile.vue';
import { ElMessage } from 'element-plus';
import NotFound from '@/views/NotFound/index.vue'
//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: [
        // 个人成长档案
   
        {
            path: '/new-file',
            name: 'new-file',
            component: NewFile,
            meta: { role: ['资助对象']}
        },
       
        {
            path: '/studentFiles',
            name: 'studentFiles',
            component: import('@/views/Student/index.vue'),
            meta: { role: ['老师'] }
        },
        {
          path: '/:pathMatch(.*)*', // 捕捉所有不存在的路径
          component: NotFound, // 显示 404 页面
        },
    ]
})



router.beforeEach(async (to, from, next) => {
    try {
      // 获取 URL 参数
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      const role = urlParams.get('role');
  
      // 存储 token 和 role
      if (token) localStorage.setItem('token', token);
      if (role) localStorage.setItem('role', role);
  
      // 检查登录状态
      const isLoggedIn = await isLogin();
      if (!isLoggedIn && to.path !== '/') {
        const redirectUrl = `${window.location.origin}${to.fullPath}`;
        return (window.location.href = `http://106.54.24.243:5173/?redirect=${redirectUrl}`);
      }
  
      // 验证权限
      const storedRole = localStorage.getItem('role') || '';
      const requiredRoles = to.meta?.role as string[] | undefined; // 类型断言
      if (requiredRoles && !requiredRoles.includes(storedRole)) {
        ElMessage.error('无访问权限');
       window.location.href = `http://106.54.24.243:5173/framework`
      }
  
      next();
    } catch (error) {
      console.error('导航守卫出错:', error);
      window.location.href=' http://106.54.24.243:5173'
    }
  });
  
  router.afterEach((to, from) => {
    const query = { ...to.query };
    if ('token' in query) delete query.token;
    if ('role' in query) delete query.role;
  
    if (JSON.stringify(query) !== JSON.stringify(to.query)) {
      const newPath = to.path.replace(/\/+/g, '/');
      router.replace({ path: newPath, query });
    }
  });

//暴露出去router
export default router

