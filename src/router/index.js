import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NewsletterHome from "../views/newsletter/Index.vue";
import EventHome from "../views/event/Index.vue";
import EventJoined from "../views/event/Joined.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/Sign-Up.vue";
import PageNotFound from "../views/404.vue";
import AdminMembers from "../views/admin/Members.vue";
import AdminEvents from "../views/admin/Events.vue";
import AdminNewsletter from "../views/admin/Newsletters.vue";
import NewNewsletter from "../views/newsletter/New.vue";
import NewEvent from "../views/event/New.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/event/joined",
    name: "eventjoined",
    component: EventJoined
  },
  {
    path: "/newsletter/new",
    name: "new-newsletter",
    component: NewNewsletter,
    beforeEnter(to, from, next) {
      if(localStorage.getItem("signed_in_status") === 'true'){
        next()
      }else{
        next('/404')
      }
    }
  },
  {
    path: "/event/new",
    name: "new-event",
    component: NewEvent,
    beforeEnter(to, from, next) {
      if(localStorage.getItem("signed_in_status") === 'true'){
        next()
      }else{
        next('/404')
      }
    }
  },
  {
    path: "/newsletter/:id",
    name: "newsletterDetails",
    component: () =>
      import(/* webpackChunkName: "newsletterDetails" */ "../views/newsletter/Details.vue")
  },
  {
    path: "/event/:id",
    name: "eventDetails",
    component: () =>
      import(/* webpackChunkName: "newsletterDetails" */ "../views/event/Details.vue")
  },
  {
    path: "/admin/members",
    name: "adminmembers",
    component: AdminMembers,
    beforeEnter(to, from, next) {
      if(localStorage.getItem("is_admin") === 'true'){
        next()
      }else{
        next('/404')
      }
    }
  },
  {
    path: "/admin/events",
    name: "adminevents",
    component: AdminEvents,
    beforeEnter(to, from, next) {
      if(localStorage.getItem("is_admin") === 'true'){
        next()
      }else{
        next('/404')
      }
    }
  },
  {
    path: "/admin/newsletters",
    name: "adminnewsletters",
    component: AdminNewsletter,
    beforeEnter(to, from, next) {
      if(localStorage.getItem("is_admin") === 'true'){
        next()
      }else{
        next('/404')
      }
    }
  },
  {
    path: "*",
    name: "404",
    component: PageNotFound
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/sign-up",
    name: "signup",
    component: SignUp
  },
  {
    path: "/newsletter",
    name: "newsletterhome",
    component: NewsletterHome
  },
  {
    path: "/event",
    name: "eventhome",
    component: EventHome
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
