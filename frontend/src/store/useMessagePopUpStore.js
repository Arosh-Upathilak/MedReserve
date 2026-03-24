import { create } from "zustand";

export const useMessagePopUpStore = create((set) => ({
    isMassageBoxOpen: false,
    loading: false,
    message: null,
    callBackFunction: null,
    isConfirm:true,

    setLoading: (value) =>
        set({
            loading: value
        }),
    setMessage: (value) =>
        set({
            message: value
        }),
    setMessageBoxOpen: (callback,message,isConfirm) =>
        set({
            isMassageBoxOpen: true,
            callBackFunction: callback,
            message:message,
            isConfirm:isConfirm
        }),
    setMessageBoxClose: () =>
        set({
            isMassageBoxOpen: false,
            callBackFunction: null,
            loading: false
        }),
}));