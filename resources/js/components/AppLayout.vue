<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-gray-100">
    <body class="h-full">
    ```
  -->
  <div class="min-h-full">
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <AppLink v-for="item in navigation" :key="item.name" :to="item.to.name" active-class='bg-gray-900 text-white' inactive-class='text-gray-300 hover:bg-gray-700 hover:text-white' class='px-3 py-2 rounded-md text-sm font-medium' aria-current-value ="page">{{ item.name }}</AppLink>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <button type="button" class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span class="sr-only">View notifications</span>
                <BellIcon class="h-6 w-6" aria-hidden="true" />
              </button>

              <!-- Profile dropdown -->
              <Menu as="div" class="ml-3 relative">
                <div>
                  <MenuButton class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm">
                    <span class="sr-only">Open user menu</span>
                    <img class="h-8 w-8 rounded-full focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" :src="userStore.imageUrl" alt="" />
                    <span class="p-5 text-sm font-medium text-white">{{ userStore.firstName }} {{ userStore.lastName}}</span>
                  </MenuButton>

                </div>
                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                  <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem v-for="item in userNavigation" :key="item.name">
                      <AppLink :to="item.name" active-class='bg-gray-100' inactive-class='' class='block px-4 py-2 text-sm text-gray-700'>{{ item.name }}</AppLink>
                    </MenuItem>
                    <MenuItem key="Sign Out">
                      <a @click="logout" class='block px-4 py-2 text-sm text-gray-700 cursor-pointer'>Sign out</a>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <DisclosureButton v-for="item in navigation" :key="item.name" :as="AppLink" :to="item.to.name" active-class='bg-gray-900 text-white' inactive-class='text-gray-300 hover:bg-gray-700 hover:text-white' class="block px-3 py-2 rounded-md text-base font-medium" aria-current-value="page">{{ item.name }}</DisclosureButton>
        </div>
        <div class="pt-4 pb-3 border-t border-gray-700">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full" :src="userStore.imageUrl" alt="" />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium leading-none text-white">{{ userStore.firstName }} {{ userStore.lastName }}</div>
              <div class="text-sm font-medium leading-none text-gray-400">{{ userStore.email }}</div>
            </div>
            <button type="button" class="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-3 px-2 space-y-1">
            <DisclosureButton v-for="item in userNavigation" :key="item.name" :as="AppLink" :to="item.to.name" class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">{{ item.name }}</DisclosureButton>
            <DisclosureButton key="Sign Out" :as="a" @click="logout" class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 cursor-pointer">Sign Out</DisclosureButton>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
    <router-view></router-view>
  </div>
</template>

<script setup>
import AppLink from "../components/AppLink.vue";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline'
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const navigation = [
{ name: 'Dashboard', to: {name: 'Dashboard'} },
{ name: 'Patients', to: {name: 'Patients'} },
{ name: 'Calendar', to: {name: 'Calendar'} },
{ name: 'Statistics', to: {name: 'Statistics'} },
{ name: 'Accountancy', to: {name: 'Accountancy'} },
]
const userNavigation = [
{ name: 'Profile', to: {name: 'Profile'} },
{ name: 'Settings', to: {name: 'Settings'} },
]

const userStore = useUserStore();
const router = useRouter();

function logout() {
    console.log("Logout");
    userStore.logout();
    router.push({
        name: 'Login'
    })
}
</script>
