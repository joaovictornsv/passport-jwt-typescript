import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();

const userController = new UserController();

// Login

router.get('/login', (req, res) => {
  res.send(`
  <h1>Login</h1>
  <form method="POST" action="/login">
    <label for="username" >Username</label><br/>
    <input required id="username" type="text" /><br/>
    <label for="password" >Password</label><br/>
    <input required id="password" type="text"/><br/>
    <button type="submit">Login</button><br/>
    No have an account?
    <a href="/register"><button type="button">Register</button></a>
  </form>
  `);
});

// Register

router.get('/register', (req, res) => {
  res.send(`
  <h1>Register</h1>
  <form method="POST" action="/register">
    <label for="name" >Name</label><br/>
    <input required id="name" name="name" type="text" /><br/>
    <label for="username" >Username</label><br/>
    <input required id="username" name="username" type="text" /><br/>
    <label for="password" >Password</label><br/>
    <input required id="password" name="password" type="text"/><br/>
    <input type="submit" value="Submit" />
  </form>`);
});

router.post('/register', userController.create);

export { router as userRouter };
