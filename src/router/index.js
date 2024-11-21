import { createRouter, createWebHistory } from 'vue-router'

//import StudentsFile from '@/views/StudentsFile.vue';
import index from '@/views/Login/index.vue';
import NewFile from '@/views/new-file.vue';
//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: [
        // 个人成长档案
        {
            path: '/',
            name: 'index',
            component: index,
        },
        // {
        //     name:'growthFile',
        //     path:'/growthfile',
        //     component:StudentsFile
        // },
        {
            path: '/new-file',
            name: 'new-file',
            component: NewFile,
        },
       
        {
            path: '/studentFiles',
            name: 'studentFiles',
            component: import('@/views/Student/index.vue')
        },
    ]
})



router.beforeEach((to, from, next) => {
    console.log("每次路由切换时执行的函数");

    next();
});




//暴露出去router
export default router

