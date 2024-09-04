import axios from "axios";
import { atomFamily, selectorFamily } from "recoil";
import { BACKEND_URL } from "../../config";

export const blogAtomFamily = atomFamily({
    key: "blogAtomFamily",
    default: selectorFamily ({
        key: "blogSelectorFamily",
        get: (id: string) => async () => {
            const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            return res.data.blog;
        }
    })
})