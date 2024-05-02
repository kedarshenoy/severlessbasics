import { Hono } from 'hono'

const app = new Hono()

const auth= async (c:any,next:any)=>{
  if (c.req.header("Authorization")){

   await next();
  }else{
   return c.text("not authorized")
  }
}

app.get('/', (c) => {
  return c.text('Hello Hono!')
});



app.get('/try',auth, (c) => {
  return c.json({
    name:"Kedar",
    mail:"akedarshenoy@gmail.com"
  })
})

app.post('/trypost', async (c) => {
  const headers=c.req.header('Authorization');
  const body = await c.req.json();
  const parms= c.req.query("id")
  return c.json({
    name:"Kedar",
    header:headers,
    body:body,
    params:parms
  })
})

export default app
