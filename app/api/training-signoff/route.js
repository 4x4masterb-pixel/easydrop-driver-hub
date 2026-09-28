const checks=["Depot arrival & preparation","Locate all pallets/cages before scanning","Correct scanning process","Van loading & organisation","Delm8 setup and effective use","Route planning","Premium/ETA management","Delivery & proof process","Collections","Returns & unattempted procedure","Vehicle checks","Communication & escalation","End-of-day procedure"];
export async function POST(req){
 try{
  const b=await req.json();
  if(!b.trainer||!b.trainee||!b.outcome||!b.solo||!checks.every(c=>b.scores?.[c])) return Response.json({error:"Assessment is incomplete."},{status:400});
  const signedAt=new Date().toISOString();
  const record={...b,signedAt};
  const webhook=process.env.TRAINING_EMAIL_WEBHOOK;
  if(!webhook) return Response.json({error:"Training email destination is not connected yet.",record},{status:503});
  const res=await fetch(webhook,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({to:process.env.TRAINING_EMAIL,subject:`EasyDrop Training Sign-Off - ${b.trainee} - ${b.outcome}`,record})});
  if(!res.ok) return Response.json({error:"Assessment created but email delivery failed."},{status:502});
  return Response.json({ok:true,signedAt});
 }catch{return Response.json({error:"Unable to submit assessment."},{status:500})}
}