import { db } from "./db.js"

export const init=()=>{
    localStorage.setItem("goods",JSON.stringify(db()))
}