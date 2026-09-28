const checks=["Depot arrival & preparation","Locate all pallets/cages before scanning","Correct scanning process","Van loading & organisation","Delm8 setup and effective use","Route planning","Premium/ETA management","Delivery & proof process","Collections","Returns & unattempted procedure","Vehicle checks","Communication & escalation","End-of-day procedure"];
function esc(v=""){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
export async function POST(req){
 try{
  const b=await req.json();
  if(!b.trainer||!b.trainee||!b.outcome||!b.solo||!checks.every(c=>b.scores?.[c])) return Response.json({error:"Assessment is incomplete."},{status:400});
  const to=process.env.TRAINING_EMAIL, key=process.env.RESEND_API_KEY;
  if(!to||!key) return Response.json({error:"Training email is not configured yet."},{status:503});
  const signedAt=new Date().toISOString();
  const rows=checks.map(c=>`<tr><td style="padding:8px;border-bottom:1px solid #ddd">${esc(c)}</td><td style="padding:8px;border-bottom:1px solid #ddd"><b>${esc(b.scores[c])}</b></td></tr>`).join("");
  const html=`<div style="font-family:Arial;max-width:720px;margin:auto"><div style="background:#07111e;color:white;padding:24px;border-bottom:4px solid #168cf0"><h1 style="margin:0">Easy<span style="color:#219cff">drop</span> Couriers</h1><p>TRAINING ASSESSMENT</p></div><div style="padding:24px"><h2>${esc(b.trainee)}</h2><p><b>Trainer:</b> ${esc(b.trainer)}<br><b>Signed:</b> ${new Date(signedAt).toLocaleString("en-GB",{timeZone:"Europe/London"})}<br><b>Overall:</b> ${esc(b.outcome)}<br><b>Ready for Solo Route:</b> ${esc(b.solo)}</p><table style="width:100%;border-collapse:collapse">${rows}</table><h3>Trainer notes</h3><p style="white-space:pre-wrap">${esc(b.notes||"No additional notes.")}</p><p style="margin-top:30px;color:#687785;font-size:12px">EasyDrop Couriers • Driver Training Record</p></div></div>`;
  const r=await fetch("https://api.resend.com/emails",{method:"POST",headers:{"Authorization":`Bearer ${key}`,"Content-Type":"application/json"},body:JSON.stringify({from:process.env.TRAINING_EMAIL_FROM||"EasyDrop Training <onboarding@resend.dev>",to:[to],subject:`EasyDrop Training Sign-Off - ${b.trainee} - ${b.outcome}`,html})});
  if(!r.ok){const detail=await r.text();console.error("Email delivery failed",detail);return Response.json({error:"Assessment completed but email delivery failed."},{status:502})}
  return Response.json({ok:true,signedAt});
 }catch(e){console.error(e);return Response.json({error:"Unable to submit assessment."},{status:500})}
}