'use client'
import {logOut} from "../utils/firebaseAuth"
export default function Home() {
  const test = () =>{
    logOut()
  }
  return (
    <div>
      <button onClick={test}>LogOut</button>
    </div>
  );
}
