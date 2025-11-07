import {create} from "zustand";
import {persist} from "zustand/middleware";

type User =  {
    _id: string;
    name: string;
    email: string;
}

type authState = {
    user : User | null;
    token : string | null;
    loading : boolean;

    //actions 

    setUser : (user : User) => void;
    setToken : (token : string) => void;
    setLoading : (loading : boolean) => void;
    logout : () => void;
}

export const useAuthStore = create<authState>()(
    persist(
        (set) => ({
            //initial state
            user : null,
            token : null,
            loading : false,

            //setter
            setUser : (user : User) => set({user}),
            setToken : (token : string) => set({token}),
            setLoading : (loading : boolean) => set({loading}),

            //logout
            logout : () => set({user : null, token : null})
        }),
        {
            name : "auth-storage",
            partialize: (state) => ({ token: state.token }),
        }
    )
)