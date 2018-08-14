import Vue from 'vue'
import Router from 'vue-router'
import { getAccessToken } from '@/utils/authentication'

const HelloWorld = () => import('@/components/HelloWorld')
const LoggedOutLayout = () => import('@/components/layouts/logged-out')
const LoggedOutLayoutWithBG = () => import('@/components/layouts/logged-out-with-bg')
const LandingPage = () => import('@/components/views/landing-page')
const AboutPage = () => import('@/components/views/about-page')
const FaqsPage = () => import('@/components/views/faqs-page')
const UserSupportPage = () => import('@/components/views/user-support-page')
const BrandSolutionsPage = () => import('@/components/views/brand-solutions-page')
const RegisterPage = () => import('@/components/views/register-page')
const LoginPage = () => import('@/components/views/login-page')
const ForgotPasswordPage = () => import('@/components/views/forgot-password-page')
const ResetPasswordPage = () => import('@/components/views/reset-password-page')
const LoggedInLayout = () => import('@/components/layouts/logged-in')
const SearchPage = () => import('@/components/views/search-page')
const NewsFeedPage = () => import('@/components/views/news-feed-page')
const ProfilePage = () => import('@/components/views/profile-page')
const EditProfilePage = () => import('@/components/views/edit-profile-page')
const BugLifePage = () => import('@/components/views/bug-life-page')
const MyHivePage = () => import('@/components/views/my-hive-page')
const BugsPage = () => import('@/components/views/bugs-page')
const MaintenancePage = () => import('@/components/views/maintenance-page')
const SinglePostPage = () => import('@/components/views/single-post-page')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/a',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      component: LoggedOutLayoutWithBG,
      children: [
        {
          path: '',
          component: LandingPage,
          name: 'Landing Page'
        }
      ],
      beforeEnter: (to, from, next) => {
        if (getAccessToken()) {
          next({ name: 'News Feed Page' })
        } else {
          next()
        }
      }
    },
    {
      path: '/',
      component: LoggedOutLayout,
      children: [
        {
          path: 'sign-up',
          component: RegisterPage,
          name: 'Register Page'
        },
        {
          path: 'sign-in',
          component: LoginPage,
          name: 'Login Page'
        },
        {
          path: 'forgot-password',
          component: ForgotPasswordPage,
          name: 'Forgot Password Page'
        },
        {
          path: 'reset-password/:token',
          component: ResetPasswordPage,
          name: 'Reset password Page'
        }
      ],
      beforeEnter: (to, from, next) => {
        if (getAccessToken()) {
          next({ name: 'News Feed Page' })
        } else {
          next()
        }
      }
    },
    {
      path: '/',
      component: LoggedOutLayout,
      children: [
        {
          path: 'about',
          component: AboutPage,
          name: 'About'
        },
        {
          path: 'faqs',
          component: FaqsPage,
          name: 'Faqs'
        },
        {
          path: 'user-support',
          component: UserSupportPage,
          name: 'User Support'
        },
        {
          path: 'brand-solutions',
          component: BrandSolutionsPage,
          name: 'Brand Solutions'
        }
      ]
    },
    {
      path: '/',
      component: LoggedInLayout,
      children: [
        {
          path: 'feed',
          component: NewsFeedPage,
          name: 'News Feed Page'
        },
        {
          path: 'profile',
          component: ProfilePage,
          name: 'Profile Page',
          children: [
            {
              path: 'edit-profile',
              component: EditProfilePage,
              name: 'Edit Profile Page'
            }
          ]
        },
        {
          path: 'bug-life',
          component: BugLifePage,
          name: 'Bug Life Page'
        },
        {
          path: 'my-hive',
          component: MyHivePage,
          name: 'My Hive Page'
        },
        {
          path: 'bugs',
          component: BugsPage,
          name: 'Bugs Page'
        },
        {
          path: 'bug-brands',
          component: MaintenancePage,
          name: 'Bug Brands Page'
        },
        {
          path: 'brand-stops',
          component: MaintenancePage,
          name: 'Brand Stops Page'
        },
        {
          path: 'honeys',
          component: MaintenancePage,
          name: 'Honeys Page'
        },
        {
          path: 'search',
          component: SearchPage,
          name: 'Search Page'
        }
      ],
      beforeEnter: (to, from, next) => {
        if (getAccessToken()) {
          next()
        } else {
          next({ name: 'Login Page' })
        }
      }
    },
    {
      path: '/',
      component: LoggedInLayout,
      children: [
        {
          path: 'post/:id',
          component: SinglePostPage,
          name: 'Single Post Page'
        }
      ]
    }
  ]
})
