import { defineStore, StoreState } from "pinia";
import axiosClient from "../axios";
import type User from "../types/user";

export const useUserStore = defineStore("user", {
    state: () => ({
        firstName: "",
        lastName: "",
        email: "",
        imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        title: "",
        sessionId: ""
    }),
    actions: {
        logout() {
            this.$reset();
        },
        async login(user: { email: string, password: string, remember: boolean }) {
            axiosClient.post('/api/login', user).
                then(({ data }) => {
                    console.log(data)
                    this.setUser(data)
                    return data;
                }).catch((error) => {
                    console.log("POST error: " + error);
                })
        },
        setUser(data: any) {
            this.sessionId = data.sessionId;
            this.firstName = data.user.firstName;
            this.lastName = data.user.lastName;
            this.email = data.user.email;
            this.imageUrl = data.user.imageUrl;
            this.title = data.user.title;
        },
    },
    persist: true,
})
