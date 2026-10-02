"use client";
import {useState} from "react";
import "../login/login.css";
const hex=b=>Array.from(new Uint8Array(b)).map(x=>x.toString(16).padStart(2,"0")).join("");
export default function OwnerSetup(){
 const[username,setUsername]=useState("adam"),[password,setPassword]=useState(""),[confirm,setConfirm]=useState(""),[out,setOut]=useState(""),[err,setErr]=useState("");
 async function make(e){e.preventDefault();setErr("");setOut("");if(password.length<12){setErr("Use at least 12 characters.");return}if(password!==confirm){setErr("Passwords do not match.");return}
 const salt=crypto.getRandomValues(new Uint8Array(16));const key=await crypto.subtle.importKey("raw",new TextEncoder().encode(password),"PBKDF2",false,["deriveBits"]);const bits=await crypto.subtle.deriveBits({name:"PBKDF2",salt,iterations:310000,hash:"SHA-256"},key,256);
 const record={id:"owner-adam",name:"Adam",username:username.trim().toLowerCase(),role:"owner",passwordHash:"pbkdf2$310000$"+hex(salt)+"$"+hex(bits),active:true};
 setOut(JSON.stringify([record]));setPassword("");setConfirm("");
 }
 async function copy(){await navigator.clipboard.writeText(out)}
 return <main className="loginPage"><section className="loginCard"><div className="loginLogo"><span>◆</span><div><b>Courier<span>Hub</span></b><small>OWNER SETUP</small></div></div><p className="loginEyebrow">ONE-TIME SETUP</p><h1>Create Owner access</h1><p className="loginIntro">Your password is processed in this browser and is not sent to the server. Only the generated hash is used.</p><form onSubmit={make}><label>Owner username<input required autoCapitalize="none" value={username} onChange={e=>setUsername(e.target.value)}/></label><label>New password<input type="password" required minLength="12" value={password} onChange={e=>setPassword(e.target.value)}/></label><label>Confirm password<input type="password" required minLength="12" value={confirm} onChange={e=>setConfirm(e.target.value)}/></label><button>Generate Owner account</button>{err&&<p className="loginError">{err}</p>}</form>{out&&<div style={{marginTop:20}}><p><strong>DRIVER_ACCOUNTS value</strong></p><textarea readOnly value={out} style={{width:"100%",minHeight:145,padding:10}}/><button onClick={copy} style={{width:"100%",marginTop:10,height:46,border:0,borderRadius:10,background:"#087ed0",color:"#fff",fontWeight:800}}>Copy generated value</button><p className="loginNotice">Copy this value into Vercel. It contains a password hash, not your password. After access is working, this setup route will be removed.</p></div>}</section></main>
}