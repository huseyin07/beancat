import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "豆 — The OG BeanCat on Arc";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{width:"100%",height:"100%",display:"flex",background:"#0d0f12",color:"#f2f1eb",fontFamily:"Arial, sans-serif",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 78% 18%, rgba(117,149,255,.22), transparent 34%)"}}/>
      <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"58px 66px",width:"62%",zIndex:2}}>
        <div style={{display:"flex",fontSize:18,letterSpacing:5,color:"#8faaff"}}>ARCHIVED 2015 / REVIVED ON-CHAIN</div>
        <div style={{display:"flex",flexDirection:"column"}}><div style={{fontSize:112,fontWeight:900,lineHeight:.86,letterSpacing:-7}}>THE OG<br/>BEANCAT</div><div style={{fontSize:112,fontWeight:900,lineHeight:.86,letterSpacing:-7,color:"#809cff"}}>ON ARC.</div></div>
        <div style={{display:"flex",gap:22,fontSize:20,letterSpacing:2,color:"rgba(242,241,235,.62)"}}><span>@arc</span><span>豆</span><span>PUBLIC RECEIPT</span></div>
      </div>
      <div style={{width:"38%",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2,paddingRight:50}}>
        <div style={{width:330,height:330,border:"1px solid rgba(242,241,235,.2)",background:"#11151b",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"18px 20px 0 rgba(117,149,255,.08)"}}><div style={{fontSize:190,fontWeight:900}}>豆</div></div>
      </div>
      <div style={{position:"absolute",right:55,top:45,border:"3px solid #b95042",color:"#d76d5e",padding:"12px 18px",fontSize:18,fontWeight:700,letterSpacing:3,transform:"rotate(3deg)"}}>ARCHIVED / 2015</div>
    </div>, size
  );
}
