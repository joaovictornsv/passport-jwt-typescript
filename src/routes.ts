import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
  res.send(`
  <h1>Login</h1>
  <form method="POST" action="/login">
    <label for="name" >Name</label><br/>
    <input id="name" type="text" /><br/>
    <label for="password" >Password</label><br/>
    <input id="password" type="text"/><br/>
    <button type="submit">Login</button><br/>
    No have an account?
    <a href="/register"><button type="button">Register</button></a>
  </form>`);
});

router.get('/register', (req, res) => {
  res.send(`
  <h1>Register</h1>
  <form method="POST" action="/register">
    <label for="name" >Name</label><br/>
    <input id="name" type="text" /><br/>
    <label for="password" >Password</label><br/>
    <input id="password" type="text"/><br/>
    <button type="submit">Login</button>
  </form>`);
});

export { router }