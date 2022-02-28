import { defineStore } from "pinia";
import { stringToJSON } from "@/common/helpers/JSONHelper";

interface State {
  access_token: string | null;
  user: Record<string, string> | [] | null;
}

interface LoginPayload {
  data: {
    username: string;
    password: string;
  };
  onSuccess?: CallableFunction;
  onError?: CallableFunction;
  onDone?: CallableFunction;
}

export const _LSKEYS: { accessToken: string; user: string } = {
  accessToken: "access_token_",
  user: "user_",
};

let user = stringToJSON(localStorage.getItem(_LSKEYS.user), {});
user = Array.isArray(user) ? {} : user;
export const useAuthenticationStore = defineStore("auth", {
  /** STATE */
  state: (): State => ({
    access_token: localStorage.getItem(_LSKEYS.accessToken),
    user,
  }),

  /** GETTERS */
  getters: {
    getToken: (state: State): State["access_token"] => state.access_token,
    getUser: (state: State): State["user"] => state.user,
  },

  /** ACTIONS */
  actions: {
    /**
     * store action that calls the event login API
     * and store token to the localStorage and vuex
     */
    async login({ data, onSuccess, onError, onDone }: LoginPayload) {
      const { username, password } = data;
      if (username === "user" && password === "password") {
        this.access_token = "123032";
        onSuccess ? onSuccess() : null;
      } else {
        onError ? onError() : null;
      }
      onDone ? onDone() : null;
    },
    /**
     * store action that calls the event logout API
     * and remove  token from the localStorage and vuex
     */
    async logout({ onLogout }: { onLogout?: CallableFunction }) {
      this.access_token = null;
      this.user = null;
      onLogout ? onLogout() : null;
    },
  },
});
