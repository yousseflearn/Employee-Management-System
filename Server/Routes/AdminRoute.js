import express from 'express';
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';
const router = express.Router();
import bcrypt from 'bcryptjs';
router.post('/admin_login', (req, res) => {
  const sql = 'SELECT * from admin Where email = ? and password = ?';
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: 'Query Error' });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: 'admin', email: email },
        'jwt_secret_key',
        { expiresIn: '1d' }
      );
      res.cookie('token', token);
      return res.json({ loginStatus: true });
    } else {
      return res.json({
        loginStatus: false,
        Error: 'Wrong Email or Password!',
      });
    }
  });
});

router.get('/category', (req, res) => {
  const sql = 'SELECT * FROM category';
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: 'Query Error' });
    return res.json({ Status: true, Result: result });
  });
});

router.post('/add_category', (req, res) => {
  const sql = 'INSERT INTO category (`name`) VALUES (?)';
  con.query(sql, [req.body.category], (err, result) => {
    if (err) return res.json({ Status: false, Error: 'query Error' });
    return res.json({ Status: true });
  });
});

router.post('/add_employee', (req, res) => {
  const sql =
    'INSERT INTO employee (firstName,lastName,email,password,salary,image,phone,address,category_id) VALUES (?)';

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      hash,
      req.body.salary,
      req.body.image,
      req.body.phone,
      req.body.address,
      req.body.category_id,
    ];

    con.query(sql, [values], (err, result) => {
      if (err) return res.json({ Status: false, Error: 'query Error' });
      return res.json({ Status: true });
    });
  });
});

export { router as adminRouter };
