import { useState } from "react"
import axios from "axios"
import { Pie } from "react-chartjs-2"
import {
Chart as ChartJS,
ArcElement,
Tooltip,
Legend
} from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function NewsDetector(){

const API="https://fake-news-detection-2-j5mr.onrender.com"

const [text,setText] = useState("")
const [url,setUrl] = useState("")
const [result,setResult] = useState(null)
const [loading,setLoading] = useState(false)
const [history,setHistory] = useState([])



/* NORMALIZE LABEL */

const normalize = (label)=>{

if(!label) return ""

const l = label.toLowerCase()

if(l.includes("real")) return "Real News"
if(l.includes("fake")) return "Fake News"

return label

}



/* TEXT DETECTION */

const detectText = async ()=>{

if(!text.trim()) return

setLoading(true)

try{

const res = await axios.post(`${API}/predict`,{
text:text
})

const fixedPrediction = normalize(res.data.prediction)

const newResult={
...res.data,
prediction:fixedPrediction
}

setResult(newResult)

setHistory(prev=>[
{text:text,result:fixedPrediction},
...prev
])

}catch(err){

console.log(err)

}

setLoading(false)

}



/* URL DETECTION */

const detectURL = async ()=>{

if(!url.trim()) return

setLoading(true)

try{

const res = await axios.post(`${API}/predict-url`,{
url:url
})

const fixedPrediction = normalize(res.data.prediction)

const newResult={
...res.data,
prediction:fixedPrediction
}

setResult(newResult)

setHistory(prev=>[
{text:url,result:fixedPrediction},
...prev
])

}catch(err){

console.log(err)

}

setLoading(false)

}



/* EXAMPLES */

const exampleReal = ()=>{

setText(
"Donald Trump sends his own plane to transport 200 stranded Marines."
)

}

const exampleFake = ()=>{

setText(
"The Indian government announced a new education policy aimed at improving rural school infrastructure and digital learning.")

}



/* CLEAR */

const clearAll = ()=>{
setText("")
setUrl("")
setResult(null)
}



/* CHART DATA */

const fakeCount = history.filter(h=>h.result==="Fake News").length
const realCount = history.filter(h=>h.result==="Real News").length

const chartData={

labels:["Fake News","Real News"],

datasets:[
{
data:[fakeCount,realCount],
backgroundColor:["#22c55e","#ef4444"]
}
]

}



return(

<div style={styles.page}>

<div style={styles.container}>

{/* LEFT PANEL */}

<div style={styles.left}>

<h1 style={styles.title}>AI Fake News Detector</h1>

<p style={styles.subtitle}>
Analyze news text or article links using machine learning
</p>

<hr/>

<h3>Check News Text</h3>

<textarea
value={text}
onChange={(e)=>setText(e.target.value)}
placeholder="Paste news headline or article..."
style={styles.textarea}
/>

<div style={styles.buttonRow}>

<button onClick={detectText} style={styles.detectBtn}>
Detect News
</button>

<button onClick={clearAll} style={styles.clearBtn}>
Clear
</button>

</div>



{/* EXAMPLE BUTTONS */}

<div style={styles.exampleRow}>

<button onClick={exampleReal} style={styles.realBtn}>
Example Fake News
</button>

<button onClick={exampleFake} style={styles.fakeBtn}>
Example Real News
</button>

</div>



<hr/>

<h3>Check News URL</h3>

<input
value={url}
onChange={(e)=>setUrl(e.target.value)}
placeholder="Paste article URL..."
style={styles.input}
/>

<button onClick={detectURL} style={styles.urlBtn}>
Detect URL
</button>



{/* RESULT */}

{loading && (
<div style={styles.loading}>
AI analyzing news...
</div>
)}

{result && (

<div style={styles.resultCard}>

<h2 style={{
color: result.prediction==="Real News"
? "#dc2626"
: "#16a34a"
}}>
{result.prediction}
</h2>

<p>Confidence: {result.confidence}%</p>

<div style={styles.barBg}>
<div
style={{
...styles.barFill,
width:`${result.confidence}%`,
background:
result.prediction==="Fake News"
? "#22c55e"
: "#ef4444"
}}
></div>
</div>

</div>

)}

<p style={styles.note}>
Note: This system predicts fake news based on writing patterns and may not verify factual correctness.
</p>

</div>



{/* RIGHT PANEL */}

<div style={styles.right}>

<h3>Prediction Analytics</h3>

<Pie data={chartData}/>

<hr/>

<h3>History</h3>

<div style={styles.historyBox}>

{history.length===0 && (
<p>No history yet</p>
)}

{history.map((h,i)=>(
<div key={i} style={styles.historyItem}>

<p style={{fontSize:"14px"}}>
{h.text.substring(0,80)}...
</p>

<span
style={{
color:h.result==="Real News"
? "#16a34a"
: "#dc2626" ,
fontWeight:"bold"
}}
>
{h.result}
</span>

</div>
))}

</div>

</div>

</div>

</div>

)

}



/* STYLES */

const styles={

page:{
background:"#f3f4f6",
minHeight:"100vh",
padding:"40px"
},

container:{
display:"grid",
gridTemplateColumns:"1fr 380px",
gap:"30px",
maxWidth:"1200px",
margin:"auto"
},

left:{
background:"white",
padding:"30px",
borderRadius:"10px",
boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
},

right:{
background:"white",
padding:"20px",
borderRadius:"10px",
boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
},

title:{
fontSize:"36px"
},

subtitle:{
color:"#555",
marginBottom:"20px"
},

textarea:{
width:"100%",
height:"110px",
padding:"10px",
borderRadius:"6px",
border:"1px solid #ccc"
},

input:{
width:"100%",
padding:"10px",
borderRadius:"6px",
border:"1px solid #ccc",
marginBottom:"10px"
},

buttonRow:{
display:"flex",
gap:"10px"
},

exampleRow:{
display:"flex",
gap:"10px",
marginTop:"10px"
},

detectBtn:{
background:"#2563eb",
color:"white",
padding:"10px 20px",
border:"none",
borderRadius:"6px"
},

clearBtn:{
background:"#6b7280",
color:"white",
padding:"10px 20px",
border:"none",
borderRadius:"6px"
},

urlBtn:{
background:"#16a34a",
color:"white",
padding:"10px 20px",
border:"none",
borderRadius:"6px"
},

realBtn:{
background:"#ef4444",
color:"white",
padding:"8px 14px",
border:"none",
borderRadius:"6px"
},

fakeBtn:{
background:"#22c55e",
color:"white",
padding:"8px 14px",
border:"none",
borderRadius:"6px"
},

resultCard:{
marginTop:"20px",
padding:"20px",
background:"#f9fafb",
borderRadius:"8px"
},

barBg:{
height:"10px",
background:"#e5e7eb",
borderRadius:"5px",
marginBottom:"10px"
},

barFill:{
height:"10px",
borderRadius:"5px"
},

loading:{
marginTop:"20px",
color:"#2563eb"
},

note:{
marginTop:"20px",
fontSize:"13px",
color:"#666"
},

historyBox:{
maxHeight:"300px",
overflow:"auto"
},

historyItem:{
borderBottom:"1px solid #eee",
padding:"10px 0"
}

}