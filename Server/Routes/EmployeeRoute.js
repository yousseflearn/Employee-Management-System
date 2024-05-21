import express, { query } from 'express';
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';
const router = express.Router();
import bcrypt from 'bcryptjs';

router.post('/employee_login', (req, res) => {
  const sql = 'SELECT * from employee Where email = ? ';
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: 'Query Error' });
    if (result.length > 0) {
      bcrypt.compare(req.body.password, result[0].password, (err, response) => {
        if (err)
          return res.json({
            loginStatus: false,
            Error: 'Wrong Email or Password!',
          });
        if (response) {
          const email = result[0].email;
          const token = jwt.sign(
            { role: 'employee', email: email },
            'employee_secret_key',
            { expiresIn: '1d' }
          );
          res.cookie('token', token);
          return res.json({ loginStatus: true, id: result[0].id });
        }
      });
    } else {
      return res.json({
        loginStatus: false,
        Error: 'Wrong Email or Password!',
      });
    }
  });
});
export { router as employeeRouter };
